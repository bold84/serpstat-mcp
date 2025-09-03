/**
 * Serpstat URL Analysis MCP Server
 * =================================
 *
 * Main server entry point that initializes and configures the MCP server
 * with all URL analysis tools and procedures.
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-09-03
 *
 * This module implements the core MCP server for Serpstat URL Analysis API integration.
 * It provides a comprehensive interface to 4 different URL analysis methods through
 * the Model Context Protocol (MCP) framework.
 *
 * The server initializes with MCP server capabilities and registers various tools for
 * URL analysis, including traffic statistics, competitor analysis, keyword rankings,
 * and missing keyword analysis. All API calls are routed through a shared
 * Serpstat API client with built-in error handling and retry logic.
 *
 * Key Features:
 * - 4 URL analysis tools with comprehensive validation
 * - Robust error handling with detailed error messages
 * - Automatic API client initialization with environment variable validation
 * - Comprehensive input validation using Zod schemas
 * - Support for multiple search engines and advanced filtering
 * - Pagination support for large datasets
 * - Credit-efficient API usage
 *
 * @module serpstat-url-analysis
 * @requires @modelcontextprotocol/sdk/server
 * @requires serpstat-shared
 * @requires ./utils/validation
 * @requires ./constants
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool
} from '@modelcontextprotocol/sdk/types.js';
import {
  makeSerpstatRequest
} from 'serpstat-shared';
import {
  GetSummaryTrafficSchema,
  GetUrlCompetitorsSchema,
  GetUrlKeywordsSchema,
  GetUrlMissingKeywordsSchema
} from './utils/validation.js';
import { API_METHODS } from './constants.js';
import { z } from 'zod';

// Initialize MCP Server
export const server: Server = new Server(
  {
    name: 'serpstat-url-analysis-server',
    version: '0.1.0',
    description: 'A comprehensive MCP server for Serpstat URL Analysis API',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// No global client needed - makeSerpstatRequest handles client initialization

/**
 * Tool definitions for MCP
 */
const TOOLS: Tool[] = [
  {
    name: 'getSummaryTraffic',
    description: 'Get traffic and keyword statistics for website pages that match a specific URL mask. Returns the number of URLs matching the given mask, organic traffic found by URL mask, and number of keywords found by URL mask. Costs 1000 credits per parameter in output_data.',
    inputSchema: {
      type: 'object',
      properties: {
        se: {
          type: 'string',
          description: 'Search engine code (e.g., "g_us" for Google US). Refer to full list of search engines.'
        },
        domain: {
          type: 'string',
          description: 'The domain for which to retrieve traffic and keyword data'
        },
        urlContains: {
          type: 'string',
          description: 'Searched part of URL'
        },
        output_data: {
          type: 'string',
          enum: ['traffic', 'keywords'],
          description: 'Output data value. Both options enabled by default, choose one to spend less credits'
        }
      },
      required: ['se', 'domain', 'urlContains']
    },
  },
  {
    name: 'getUrlCompetitors',
    description: 'Get the list of URL competitors to the queried URL. Returns competitor domains, URLs, and count information. Costs 1 credit per result obtained. Maximum 60,000 results per query.',
    inputSchema: {
      type: 'object',
      properties: {
        se: {
          type: 'string',
          description: 'Search engine code (e.g., "g_us" for Google US). Refer to full list of search engines.'
        },
        url: {
          type: 'string',
          description: 'URL for finding competing URLs'
        },
        sort: {
          type: 'object',
          description: 'Order of sorting the results in the format: {field: order}'
        },
        page: {
          type: 'number',
          description: 'Page number in response (Default: 1, Min: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page in response (Default: 100, Min: 1, Max: 1000)'
        }
      },
      required: ['se', 'url']
    },
  },
  {
    name: 'getUrlKeywords',
    description: 'Get a list of keywords for which the specified URL ranks in the top-100 Google and top-50 Bing search results. Provides insights into organic search performance with keyword data including position, volume, CPC, difficulty, and intent. Costs 1 credit per result obtained. Maximum 60,000 results per query.',
    inputSchema: {
      type: 'object',
      properties: {
        se: {
          type: 'string',
          description: 'Search engine code (e.g., "g_us" for Google US). Refer to full list of search engines.'
        },
        url: {
          type: 'string',
          description: 'Analyzed page URL'
        },
        withIntents: {
          type: 'boolean',
          description: 'Keyword intent'
        },
        sort: {
          type: 'object',
          description: 'Order of sorting the results in the format: {field: order}'
        },
        filters: {
          type: 'object',
          description: 'Filters for search. Fields are combined using AND logic. Numeric range fields (_from and _to) allow specifying minimum and maximum values.'
        },
        page: {
          type: 'number',
          description: 'Page number in response (Default: 1, Min: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page in response (Default: 100, Min: 1, Max: 1000)'
        }
      },
      required: ['se', 'url']
    },
  },
  {
    name: 'getUrlMissingKeywords',
    description: 'Get keywords that competitors are ranking for but the given URL isn\'t ranking for them. Essential for SEO gap analysis and content strategy optimization. Returns missing keywords with cost, concurrency, and weight data. Costs 1 credit per result obtained. Maximum 60,000 results per query.',
    inputSchema: {
      type: 'object',
      properties: {
        se: {
          type: 'string',
          description: 'Search engine code (e.g., "g_us" for Google US). Refer to full list of search engines.'
        },
        url: {
          type: 'string',
          description: 'Analyzed URL'
        },
        sort: {
          type: 'object',
          description: 'Order of sorting the results in the format: {field: order}'
        },
        filters: {
          type: 'object',
          description: 'Filters for search. Fields are combined using AND logic. Numeric range fields (_from and _to) allow specifying minimum and maximum values.'
        },
        page: {
          type: 'number',
          description: 'Page number in response (Default: 1, Min: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page in response (Default: 100, Min: 1, Max: 1000)'
        }
      },
      required: ['se', 'url']
    },
  },
];

/**
 * List available tools
 *
 * This handler returns the list of available tools to the MCP client.
 * It provides metadata about each tool including name, description,
 * and input schema.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: TOOLS };
});

/**
 * Handle tool calls
 *
 * This handler processes tool calls from the MCP client. It validates input
 * parameters, makes API requests to Serpstat, and returns formatted responses.
 * Each tool has its own validation schema and API method.
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result;

    switch (name) {
      case 'getSummaryTraffic':
        result = await handleGetSummaryTraffic(args);
        break;
      case 'getUrlCompetitors':
        result = await handleGetUrlCompetitors(args);
        break;
      case 'getUrlKeywords':
        result = await handleGetUrlKeywords(args);
        break;
      case 'getUrlMissingKeywords':
        result = await handleGetUrlMissingKeywords(args);
        break;
      default:
        throw new Error(`Unknown tool: ${name}`);
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({ error: errorMessage }, null, 2),
        },
      ],
      isError: true,
    };
  }
});

/**
 * Handle getSummaryTraffic tool call
 */
async function handleGetSummaryTraffic(args: unknown) {
  const validatedArgs = GetSummaryTrafficSchema.parse(args);
  
  const response = await makeSerpstatRequest(API_METHODS.getSummaryTraffic, {
    se: validatedArgs.se,
    domain: validatedArgs.domain,
    urlContains: validatedArgs.urlContains,
    ...(validatedArgs.output_data && { output_data: validatedArgs.output_data }),
  });

  return response;
}

/**
 * Handle getUrlCompetitors tool call
 */
async function handleGetUrlCompetitors(args: unknown) {
  const validatedArgs = GetUrlCompetitorsSchema.parse(args);
  
  const response = await makeSerpstatRequest(API_METHODS.getUrlCompetitors, {
    se: validatedArgs.se,
    url: validatedArgs.url,
    ...(validatedArgs.sort && { sort: validatedArgs.sort }),
    ...(validatedArgs.page && { page: validatedArgs.page }),
    ...(validatedArgs.size && { size: validatedArgs.size }),
  });

  return response;
}

/**
 * Handle getUrlKeywords tool call
 */
async function handleGetUrlKeywords(args: unknown) {
  const validatedArgs = GetUrlKeywordsSchema.parse(args);
  
  const response = await makeSerpstatRequest(API_METHODS.getUrlKeywords, {
    se: validatedArgs.se,
    url: validatedArgs.url,
    ...(validatedArgs.withIntents !== undefined && { withIntents: validatedArgs.withIntents }),
    ...(validatedArgs.sort && { sort: validatedArgs.sort }),
    ...(validatedArgs.filters && { filters: validatedArgs.filters }),
    ...(validatedArgs.page && { page: validatedArgs.page }),
    ...(validatedArgs.size && { size: validatedArgs.size }),
  });

  return response;
}

/**
 * Handle getUrlMissingKeywords tool call
 */
async function handleGetUrlMissingKeywords(args: unknown) {
  const validatedArgs = GetUrlMissingKeywordsSchema.parse(args);
  
  const response = await makeSerpstatRequest(API_METHODS.getUrlMissingKeywords, {
    se: validatedArgs.se,
    url: validatedArgs.url,
    ...(validatedArgs.sort && { sort: validatedArgs.sort }),
    ...(validatedArgs.filters && { filters: validatedArgs.filters }),
    ...(validatedArgs.page && { page: validatedArgs.page }),
    ...(validatedArgs.size && { size: validatedArgs.size }),
  });

  return response;
}

/**
 * Start the server
 *
 * This function initializes the server transport and starts listening for
 * MCP requests. It uses stdio transport for communication with the client.
 */
async function startServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Serpstat URL Analysis MCP server started');
}

// Start the server
startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});