/**
 * Serpstat Domain Analysis MCP Server
 * ===================================
 *
 * Main server entry point that initializes and configures the MCP server
 * with all domain analysis tools and procedures.
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-08-31
 *
 * This module implements the core MCP server for Serpstat Domain Analysis API integration.
 * It provides a comprehensive interface to 14 different domain analysis methods through
 * the Model Context Protocol (MCP) framework.
 *
 * The server initializes with MCP server capabilities and registers various tools for
 * domain analysis, including domain information retrieval, keyword analysis, competitor
 * analysis, and data export functionality. All API calls are routed through a shared
 * Serpstat API client with built-in error handling and retry logic.
 *
 * Key Features:
 * - 14 domain analysis tools with comprehensive validation
 * - Robust error handling with detailed error messages
 * - Automatic API client initialization with environment variable validation
 * - Comprehensive input validation using Zod schemas
 * - Support for multiple search engines and advanced filtering
 * - Pagination support for large datasets
 * - CSV export capabilities for position data
 *
 * @module serpstat-domain-analysis
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
  SerpstatApiClient,
  makeSerpstatRequest
} from 'serpstat-shared';
import {
  GetDomainsInfoSchema,
  GetDomainKeywordsSchema,
  GetAdKeywordsSchema,
  GetCompetitorsSchema,
  GetAdsCompetitorsSchema,
  GetOrganicCompetitorsPageSchema,
  GetTopUrlsSchema,
  GetDomainUrlsSchema,
  GetDomainsHistorySchema,
  GetDomainsIntersectionSchema,
  GetDomainsUniqKeywordsSchema,
  GetAllRegionsTrafficSchema,
  GetRegionsCountSchema,
  ExportPositionsSchema
} from './utils/validation.js';
import { API_METHODS } from './constants.js';
import { z } from 'zod';

// Initialize MCP Server
export const server: Server = new Server(
  {
    name: 'serpstat-domain-analysis-server',
    version: '0.1.0',
    description: 'A comprehensive MCP server for Serpstat Domain Analysis API',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Global variables
let serpstatClient: SerpstatApiClient | null = null;

/**
 * Initialize the Serpstat API client
 *
 * This function initializes the Serpstat API client using the API key from
 * environment variables. It validates that the API key is present and
 * creates a new API client instance with default configuration.
 *
 * @throws {Error} If SERPSTAT_API_KEY environment variable is not set
 * @returns {void}
 */
function initializeSerpstatClient(): void {
  const apiKey = process.env.SERPSTAT_API_KEY;
  if (!apiKey) {
    throw new Error('SERPSTAT_API_KEY environment variable is required');
  }
  serpstatClient = new SerpstatApiClient({ apiKey });
}

/**
 * Tool definitions for MCP
 */
const TOOLS: Tool[] = [
  {
    name: 'getDomainsInfo',
    description: 'Provides summary SEO information for an array of domains for a specified search engine database. Returns detailed metrics including visibility, keyword count, traffic, and dynamic changes for each domain.',
    inputSchema: {
      type: 'object',
      properties: {
        domains: {
          type: 'array',
          items: {
            type: 'string'
          },
          description: 'List of domains you want to get data for. 5 API credits are spent per each domain in response.'
        },
        se: {
          type: 'string',
          description: 'Search engine code (e.g., "g_us" for Google US). Refer to full list of search engines.'
        }
      },
      required: ['domains', 'se']
    },
  },
  {
    name: 'getDomainKeywords',
    description: 'Returns keywords which the analyzed domain ranks for in Google top-100 search results. Similar to Domain analysis — SEO research — Keywords report. Supports SERP special elements filtering, keyword intents, and can return up to 60,000 results.',
    inputSchema: {
      type: 'object',
      properties: {
        domain: {
          type: 'string',
          description: 'Domain name to get keywords for'
        },
        se: {
          type: 'string',
          description: 'Search engine code (e.g., "g_us" for Google US). Refer to full list of search engines.'
        },
        withSubdomains: {
          type: 'boolean',
          description: 'Search type: with/without subdomains'
        },
        withIntents: {
          type: 'boolean',
          description: 'Keyword intent. This parameter works for g_ua and g_us database only'
        },
        url: {
          type: 'string',
          description: 'Link to refine your search'
        },
        keywords: {
          type: 'array',
          items: {
            type: 'string'
          },
          description: 'Array of keywords to search for'
        },
        minusKeywords: {
          type: 'array',
          items: {
            type: 'string'
          },
          description: 'List of keywords to exclude from the search'
        },
        filters: {
          type: 'object',
          description: 'Filter parameters (expandable). Supports SERP special elements filtering using types_contain and types_not_contain filters.'
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
      required: ['domain', 'se']
    },
  },
  {
    name: 'getAdKeywords',
    description: 'Searches for keywords in paid search results and advertising listings for a specific domain. Returns detailed information about ad keywords including cost, position, and performance metrics.',
    inputSchema: {
      type: 'object',
      properties: {
        domain: {
          type: 'string',
          description: 'Domain name to search for ad keywords'
        },
        se: {
          type: 'string',
          description: 'Search engine code (e.g., "g_us" for Google US). Refer to full list of search engines.'
        },
        url: {
          type: 'string',
          description: 'Link to refine your search'
        },
        keywords: {
          type: 'array',
          items: {
            type: 'string'
          },
          description: 'Array of keywords to search for'
        },
        minusKeywords: {
          type: 'array',
          items: {
            type: 'string'
          },
          description: 'List of keywords to exclude from the search'
        },
        filters: {
          type: 'object',
          description: 'Filters for search. Fields are combined using AND logic. Numeric range fields (_from and _to) allow specifying minimum and maximum values. List fields (_contain and _not_contain) specify inclusion or exclusion criteria.'
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
      required: ['domain', 'se']
    },
  },
  {
    name: 'getAdsCompetitors',
    description: 'Returns a list of competing domains in paid search results. Similar to the "Competitors" report in domain PPC analysis in Serpstat UI. Provides information about ad keywords, intersections, and missing keywords.',
    inputSchema: {
      type: 'object',
      properties: {
        domain: {
          type: 'string',
          description: 'Domain name to get ad competitors for'
        },
        se: {
          type: 'string',
          description: 'Search engine code (e.g., "g_us" for Google US). Refer to full list of search engines.'
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
          description: 'Number of results per page in response (Default: 100, Min: 50, Max: 100)'
        }
      },
      required: ['domain', 'se']
    },
  },
  {
    name: 'getOrganicCompetitorsPage',
    description: 'Brings in the list of domain competitors in top 20 Google search results. The data set is similar to the Competitors report of the domain. Provides detailed metrics about common keywords, visibility, and relevance scores.',
    inputSchema: {
      type: 'object',
      properties: {
        domain: {
          type: 'string',
          description: 'Domain name to get organic competitors for'
        },
        se: {
          type: 'string',
          description: 'Search engine code (e.g., "g_us" for Google US). Refer to full list of search engines.'
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
          description: 'Number of results per page in response (Default: 100, Min: 10, Max: 500)'
        }
      },
      required: ['domain', 'se']
    },
  },
  {
    name: 'getTopUrls',
    description: 'Returns website pages that rank for the largest amount of the analyzed keyword variations and have the highest traffic. Similar to the Top pages report of the Keyword Analysis. Provides metrics including organic keywords, Facebook shares, and potential traffic.',
    inputSchema: {
      type: 'object',
      properties: {
        domain: {
          type: 'string',
          description: 'Domain name to get top URLs for'
        },
        se: {
          type: 'string',
          description: 'Search engine code (e.g., "g_us" for Google US). Refer to full list of search engines.'
        },
        filters: {
          type: 'object',
          description: 'Filters for search. Fields are combined using AND logic.'
        },
        sort: {
          type: 'object',
          description: 'Order of sorting the results in the format: {field: order}'
        },
        page: {
          type: 'number',
          description: 'Page number (Default: 1, Min: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page (Default: 100, Min: 1)'
        }
      },
      required: ['domain', 'se']
    },
  },
  {
    name: 'getDomainUrls',
    description: 'Returns the list of URLs within the analyzed domain and the number of keywords for each URL. Provides insights into which pages are driving the most organic search traffic for the domain.',
    inputSchema: {
      type: 'object',
      properties: {
        domain: {
          type: 'string',
          description: 'Domain name to get URLs for'
        },
        se: {
          type: 'string',
          description: 'Search engine code (e.g., "g_us" for Google US). Refer to full list of search engines.'
        },
        filters: {
          type: 'object',
          description: 'Filters for search. Fields are combined using AND logic. Numeric range fields (_from and _to) allow specifying minimum and maximum values. List fields (_contain and _not_contain) specify inclusion or exclusion criteria.'
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
      required: ['domain', 'se']
    },
  },
  {
    name: 'getDomainsHistory',
    description: 'Provides historical data on a domain\'s number of keywords and visibility over time. Returns 2-4 week data points showing trends in keyword count, traffic, visibility, and other metrics for performance tracking.',
    inputSchema: {
      type: 'object',
      properties: {
        domain: {
          type: 'string',
          description: 'Domain name to get historical data for'
        },
        se: {
          type: 'string',
          description: 'Search engine code (e.g., "g_us" for Google US). Refer to full list of search engines.'
        },
        during_all_time: {
          type: 'boolean',
          description: 'History period: if true - get information on All time, false - get information on year to date'
        },
        filters: {
          type: 'object',
          description: 'Basic filters with date. Optional combinations of filters applied to your request. In most cases one filter is enough. Filter combinations have AND logic.'
        },
        sort: {
          type: 'object',
          description: 'Order of sorting the results in the format: {field: order}'
        },
        size: {
          type: 'number',
          description: 'Number of results per page in response (Default: 100, Min: 1, Max: 1000)'
        }
      },
      required: ['domain', 'se']
    },
  },
  {
    name: 'getDomainsIntersection',
    description: 'Returns common keywords of up to 3 domains. The data set is similar to the Domain vs domain report. Shows which keywords multiple domains rank for, along with their positions, costs, and performance metrics.',
    inputSchema: {
      type: 'object',
      properties: {
        se: {
          type: 'string',
          description: 'Search engine code (e.g., "g_us" for Google US). Refer to full list of search engines.'
        },
        domains: {
          type: 'array',
          items: {
            type: 'string'
          },
          description: 'Array of domain names to compare (Minimum: 2, Maximum: 3)'
        },
        filters: {
          type: 'object',
          description: 'Filters for search. Fields are combined using AND logic. Numeric range fields (_from and _to) allow specifying minimum and maximum values. List fields (_contain and _not_contain) specify inclusion or exclusion criteria.'
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
      required: ['se', 'domains']
    },
  },
  {
    name: 'getDomainsUniqKeywords',
    description: 'Returns unique keywords of two domains that the third domain does not rank for. The data set is similar to the Domain vs domain report. Useful for identifying keyword opportunities and competitive gaps.',
    inputSchema: {
      type: 'object',
      properties: {
        se: {
          type: 'string',
          description: 'Search engine code (e.g., "g_us" for Google US). Refer to full list of search engines.'
        },
        domains: {
          type: 'array',
          items: {
            type: 'string'
          },
          description: 'Array of domains to include in analysis (Minimum: 1, Maximum: 2)'
        },
        minusDomain: {
          type: 'string',
          description: 'Domain with keywords which must not intersect domains parameters. Example: puma.com'
        },
        filters: {
          type: 'object',
          description: 'Filters for search. Fields are combined using AND logic. Numeric range fields (_from and _to) allow specifying minimum and maximum values. List fields (_contain and _not_contain) specify inclusion or exclusion criteria.'
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
      required: ['se', 'domains', 'minusDomain']
    },
  },
  {
    name: 'getAllRegionsTraffic',
    description: 'Returns an array with information about the amount of traffic by domain in Serpstat databases. Databases with a number of keywords equal to zero are not shown in the response. Shows regional traffic distribution and performance metrics.',
    inputSchema: {
      type: 'object',
      properties: {
        domain: {
          type: 'string',
          description: 'Domain name to get traffic data for'
        },
        sort: {
          type: 'string',
          enum: ['traff', 'region', 'country_name_en', 'google_domain'],
          description: 'Field for sorting results (Default: traff)'
        },
        order: {
          type: 'string',
          enum: ['asc', 'desc'],
          description: 'Sort order (asc or desc) (Default: asc)'
        }
      },
      required: ['domain']
    },
  },
  {
    name: 'getRegionsCount',
    description: 'Returns an array with information about the number of keys per domain in Serpstat databases. Shows database/region statistics with keyword counts and helps identify which regions have the most comprehensive data for a domain.',
    inputSchema: {
      type: 'object',
      properties: {
        domain: {
          type: 'string',
          description: 'Domain name to get region statistics for'
        },
        sort: {
          type: 'string',
          enum: ['keywords_count', 'db_name', 'country_name_en', 'google_domain'],
          description: 'Field for sorting results (Default: keywords_count)'
        },
        order: {
          type: 'string',
          enum: ['asc', 'desc'],
          description: 'Sort order (asc or desc) (Default: desc)'
        }
      },
      required: ['domain']
    },
  },
  {
    name: 'exportPositions',
    description: 'Export a complete report of a domain\'s keyword positions in the search results. Returns data in CSV format with columns: Domain, Keyword, Position, Position dynamic, Keyword volume, CPC, Competition in PPC, Keyword length, URL, Snippets, Results found, Approximate traffic. Ideal for large-scale analysis.',
    inputSchema: {
      type: 'object',
      properties: {
        domain: {
          type: 'string',
          description: 'Domain name to export position data for'
        },
        se: {
          type: 'string',
          description: 'Search engine code (e.g., "g_us" for Google US). Refer to full list of search engines.'
        },
        filters: {
          type: 'object',
          description: 'Filters for search. Fields are combined using AND logic. Numeric range fields (_from and _to) allow specifying minimum and maximum values. List fields (_contain and _not_contain) specify inclusion or exclusion criteria.'
        },
        sort: {
          type: 'object',
          description: 'Order of sorting the results in the format: {field: order}'
        },
        page: {
          type: 'number',
          description: 'Page number in response (Min: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page in response (Default: 100, Min: 1, Max: 60000)'
        }
      },
      required: ['domain', 'se']
    },
  },
];

/**
 * Handle tool requests
 *
 * This function handles MCP tool requests by registering two main request handlers:
 * 1. ListToolsRequestSchema - Returns the list of available tools
 * 2. CallToolRequestSchema - Executes the requested tool with given arguments
 *
 * The handlers provide comprehensive error handling, argument validation using Zod schemas,
 * and proper response formatting. Each tool call is validated against its corresponding
 * schema before execution, and errors are formatted with detailed error messages.
 *
 * @param {ListToolsRequestSchema} request - The list tools request
 * @returns {Promise<{tools: Tool[]}>} - Promise resolving to available tools
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: TOOLS,
  };
});

/**
 * Handle MCP tool calls with comprehensive error handling and validation
 *
 * This function serves as the central dispatcher for all tool requests in the
 * Serpstat Domain Analysis MCP server. It processes incoming tool requests,
 * validates arguments against Zod schemas, routes to the appropriate tool
 * implementation, and returns formatted responses with proper error handling.
 *
 * The handler supports all 14 domain analysis tools with the following workflow:
 * 1. Initialize Serpstat API client if not already initialized
 * 2. Validate that tool arguments are provided
 * 3. Route to the appropriate tool implementation based on tool name
 * 4. Validate arguments against the corresponding Zod schema
 * 5. Execute the tool via the shared library
 * 6. Format and return the response
 * 7. Handle CSV response format specifically for exportPositions
 *
 * Error handling includes:
 * - Missing API client initialization
 * - Missing tool arguments
 * - Unknown tool names
 * - Zod validation errors with detailed error messages
 * - API execution errors with proper logging
 *
 * @param {CallToolRequestSchema} request - The MCP tool request containing tool name and arguments
 * @returns {Promise<{content: Array<{type: string, text: string}>, isError?: boolean}>} - Formatted response tool call results or error information
 * @throws {Error} - If tool arguments are missing or tool execution fails
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    // Initialize client if not already done
    if (!serpstatClient) {
      initializeSerpstatClient();
    }

    // Validate arguments
    if (!args) {
      throw new Error('Tool arguments are required');
    }

    let result;

    switch (name) {
      case 'getDomainsInfo': {
        const validatedArgs = GetDomainsInfoSchema.parse(args);
        result = await getDomainsInfo(validatedArgs);
        break;
      }

      case 'getDomainKeywords': {
        const validatedArgs = GetDomainKeywordsSchema.parse(args);
        result = await getDomainKeywords(validatedArgs);
        break;
      }

      case 'getAdKeywords': {
        const validatedArgs = GetAdKeywordsSchema.parse(args);
        result = await getAdKeywords(validatedArgs);
        break;
      }


      case 'getAdsCompetitors': {
        const validatedArgs = GetAdsCompetitorsSchema.parse(args);
        result = await getAdsCompetitors(validatedArgs);
        break;
      }

      case 'getOrganicCompetitorsPage': {
        const validatedArgs = GetOrganicCompetitorsPageSchema.parse(args);
        result = await getOrganicCompetitorsPage(validatedArgs);
        break;
      }

      case 'getTopUrls': {
        const validatedArgs = GetTopUrlsSchema.parse(args);
        result = await getTopUrls(validatedArgs);
        break;
      }

      case 'getDomainUrls': {
        const validatedArgs = GetDomainUrlsSchema.parse(args);
        result = await getDomainUrls(validatedArgs);
        break;
      }

      case 'getDomainsHistory': {
        const validatedArgs = GetDomainsHistorySchema.parse(args);
        result = await getDomainsHistory(validatedArgs);
        break;
      }

      case 'getDomainsIntersection': {
        const validatedArgs = GetDomainsIntersectionSchema.parse(args);
        result = await getDomainsIntersection(validatedArgs);
        break;
      }

      case 'getDomainsUniqKeywords': {
        const validatedArgs = GetDomainsUniqKeywordsSchema.parse(args);
        result = await getDomainsUniqKeywords(validatedArgs);
        break;
      }

      case 'getAllRegionsTraffic': {
        const validatedArgs = GetAllRegionsTrafficSchema.parse(args);
        result = await getAllRegionsTraffic(validatedArgs);
        break;
      }

      case 'getRegionsCount': {
        const validatedArgs = GetRegionsCountSchema.parse(args);
        result = await getRegionsCount(validatedArgs);
        break;
      }

      case 'exportPositions': {
        const validatedArgs = ExportPositionsSchema.parse(args);
        result = await exportPositions(validatedArgs);
        // Handle CSV response format for exportPositions
        if (result && result.success && typeof result.data === 'string') {
          result.data = result.data; // CSV data remains as string
        }
        break;
      }

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
    console.error(`Error executing tool ${name}:`, error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: false,
            error: {
              code: 'TOOL_EXECUTION_ERROR',
              message: errorMessage,
            },
          }, null, 2),
        },
      ],
      isError: true,
    };
  }
});

/**
 * Tool implementations using shared library
 *
 * This section contains the implementation functions for all 14 domain analysis tools.
 * Each function follows a consistent pattern:
 * 1. Check if the Serpstat API client is initialized
 * 2. Call the shared makeSerpstatRequest function with the appropriate method and arguments
 * 3. Return the response from the API
 *
 * These functions serve as thin wrappers around the shared library, providing type safety
 * and consistent error handling across all tools. The actual API communication logic
 * is handled by the shared serpstat-shared library.
 *
 * @module serpstat-domain-analysis
 * @requires serpstat-shared
 */
async function getDomainsInfo(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(API_METHODS.getDomainsInfo, args);
  return response;
}

async function getDomainKeywords(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(API_METHODS.getDomainKeywords, args);
  return response;
}

async function getAdKeywords(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(API_METHODS.getAdKeywords, args);
  return response;
}


async function getAdsCompetitors(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(API_METHODS.getAdsCompetitors, args);
  return response;
}

async function getOrganicCompetitorsPage(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(API_METHODS.getOrganicCompetitorsPage, args);
  return response;
}

async function getTopUrls(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(API_METHODS.getTopUrls, args);
  return response;
}

async function getDomainUrls(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(API_METHODS.getDomainUrls, args);
  return response;
}

async function getDomainsHistory(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(API_METHODS.getDomainsHistory, args);
  return response;
}

async function getDomainsIntersection(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(API_METHODS.getDomainsIntersection, args);
  return response;
}

async function getDomainsUniqKeywords(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(API_METHODS.getDomainsUniqKeywords, args);
  return response;
}

async function getAllRegionsTraffic(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(API_METHODS.getAllRegionsTraffic, args);
  return response;
}

async function getRegionsCount(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(API_METHODS.getRegionsCount, args);
  return response;
}

async function exportPositions(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(API_METHODS.exportPositions, args);
  return response;
}

/**
 * Start the server
 *
 * This function initializes and starts the MCP server using stdio transport.
 * It creates a new StdioServerTransport for communication via standard input/output
 * and connects the server to the transport. The server then begins listening
 * for MCP requests on the stdio interface.
 *
 * The function uses console.error for logging to ensure compatibility with
 * MCP stdio communication patterns, where console.error is used for
 * server-level logging that won't interfere with the JSON-RPC protocol.
 *
 * @returns {Promise<void>} - Promise that resolves when the server is started
 * @throws {Error} - If server connection fails
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Serpstat Domain Analysis MCP server started');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});