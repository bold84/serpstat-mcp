/**
 * Serpstat Keyword Analysis MCP Server
 * ====================================
 *
 * Main server entry point that initializes and configures the MCP server
 * with all keyword analysis tools and procedures.
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-09-03
 *
 * This module implements the core MCP server for Serpstat Keyword Analysis API integration.
 * It provides a comprehensive interface to 12 different keyword analysis methods through
 * the Model Context Protocol (MCP) framework.
 *
 * The server initializes with MCP server capabilities and registers various tools for
 * keyword analysis, including keyword research, suggestions, competitor analysis,
 * and data export functionality. All API calls are routed through a shared
 * Serpstat API client with built-in error handling and retry logic.
 *
 * Key Features:
 * - 12 keyword analysis tools with comprehensive validation
 * - Robust error handling with detailed error messages
 * - Automatic API client initialization with environment variable validation
 * - Comprehensive input validation using Zod schemas
 * - Support for multiple search engines and advanced filtering
 * - Pagination support for large datasets
 * - Keyword intent analysis for US and Ukraine databases
 * - Cost-effective at 1 credit per result row
 *
 * @module serpstat-keyword-analysis
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
  GetKeywordsSchema,
  GetSuggestionsSchema,
  GetKeywordsInfoSchema,
  GetRelatedKeywordsSchema,
  GetTopUrlsSchema,
  GetCompetitorsSchema,
  GetAdKeywordsSchema,
  GetAdsCompetitorsSchema,
  GetKeywordTopSchema,
  GetKeywordFullTopSchema,
  ExportKeywordsPhraseSchema,
  ExportSuggestionsSchema
} from './utils/validation.js';
import { API_METHODS } from './constants.js';
import { z } from 'zod';

// Initialize MCP Server
export const server: Server = new Server(
  {
    name: 'serpstat-keyword-analysis-server',
    version: '0.1.0',
    description: 'A comprehensive MCP server for Serpstat Keyword Analysis API',
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
    name: 'getKeywords',
    description: 'Get keywords related to a specific keyword with volume, CPC, competition, and difficulty data. Returns organic keywords that domains are ranking for in Google top-100 results. Essential for keyword research and content optimization.',
    inputSchema: {
      type: 'object',
      properties: {
        keyword: {
          type: 'string',
          description: 'Keyword to search for'
        },
        se: {
          type: 'string',
          description: 'Search engine code (e.g., "g_us" for Google US). Refer to full list of search engines.'
        },
        minusKeywords: {
          type: 'array',
          items: {
            type: 'string'
          },
          description: 'List of keywords to exclude from the search'
        },
        withIntents: {
          type: 'boolean',
          description: 'Keyword intent. This parameter works for g_ua and g_us database only'
        },
        filters: {
          type: 'object',
          description: 'Filters for search. Fields are combined using AND logic. Numeric range fields (_from and _to) allow specifying minimum and maximum values.'
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
      required: ['keyword', 'se']
    },
  },
  {
    name: 'getSuggestions',
    description: 'Get search suggestions for a keyword using full-text search. Returns keyword suggestions that can help expand your keyword research and discover new content opportunities.',
    inputSchema: {
      type: 'object',
      properties: {
        keyword: {
          type: 'string',
          description: 'Keyword to get suggestions for'
        },
        se: {
          type: 'string',
          description: 'Search engine code (e.g., "g_us" for Google US). Refer to full list of search engines.'
        },
        filters: {
          type: 'object',
          description: 'Filter conditions including minus_keywords to exclude specific terms'
        },
        page: {
          type: 'number',
          description: 'Page number in response (Default: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page in response (Default: 100)'
        }
      },
      required: ['keyword', 'se']
    },
  },
  {
    name: 'getKeywordsInfo',
    description: 'Get detailed information about specific keywords including volume, CPC, competition, difficulty, and intent analysis. Perfect for analyzing existing keywords and understanding their potential value.',
    inputSchema: {
      type: 'object',
      properties: {
        keywords: {
          type: 'array',
          items: {
            type: 'string'
          },
          description: 'Array with keywords to search for (Maximum: 1000 keywords)'
        },
        se: {
          type: 'string',
          description: 'Search engine code (e.g., "g_us" for Google US). Refer to full list of search engines.'
        },
        withIntents: {
          type: 'boolean',
          description: 'Keyword intent. This parameter works for g_ua and g_us database only'
        },
        filters: {
          type: 'object',
          description: 'Filters for search. Fields are combined using AND logic with support for cost, competition, and result count ranges.'
        },
        sort: {
          type: 'object',
          description: 'Order of sorting the results in the format: {field: order}'
        }
      },
      required: ['keywords', 'se']
    },
  },
  {
    name: 'getRelatedKeywords',
    description: 'Get related keywords for semantic analysis and content expansion. Discover semantically related terms to enhance your content strategy and improve topical authority.',
    inputSchema: {
      type: 'object',
      properties: {
        keyword: {
          type: 'string',
          description: 'Keyword to find related keywords for'
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
          description: 'Page number in response (Default: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page in response (Default: 100, Max: 1000)'
        }
      },
      required: ['keyword', 'se']
    },
  },
  {
    name: 'getTopUrls',
    description: 'Get top URLs ranking for keyword variations. Returns website pages that rank for the largest amount of analyzed keyword variations and have the highest traffic potential.',
    inputSchema: {
      type: 'object',
      properties: {
        keyword: {
          type: 'string',
          description: 'Keyword to analyze top URLs for'
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
          description: 'Page number (Default: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page (Default: 100, Max: 1000)'
        }
      },
      required: ['keyword', 'se']
    },
  },
  {
    name: 'getCompetitors',
    description: 'Get competitors for specific keywords. Identify domains competing for your target keywords and analyze their performance metrics.',
    inputSchema: {
      type: 'object',
      properties: {
        keyword: {
          type: 'string',
          description: 'Keyword to find competitors for'
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
          description: 'Page number in response (Default: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page in response (Default: 100, Max: 1000)'
        }
      },
      required: ['keyword', 'se']
    },
  },
  {
    name: 'getAdKeywords',
    description: 'Get ad keywords for specific keywords. Analyze paid search competition and identify advertising opportunities for your target keywords.',
    inputSchema: {
      type: 'object',
      properties: {
        keyword: {
          type: 'string',
          description: 'Keyword to find ad keywords for'
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
          description: 'Page number in response (Default: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page in response (Default: 100, Max: 1000)'
        }
      },
      required: ['keyword', 'se']
    },
  },
  {
    name: 'getAdsCompetitors',
    description: 'Get ads competitors for specific keywords. Identify domains running paid ads for your target keywords and analyze their advertising strategies.',
    inputSchema: {
      type: 'object',
      properties: {
        keyword: {
          type: 'string',
          description: 'Keyword to find ad competitors for'
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
          description: 'Page number in response (Default: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page in response (Default: 100, Max: 1000)'
        }
      },
      required: ['keyword', 'se']
    },
  },
  {
    name: 'getKeywordTop',
    description: 'Get keyword performance in top positions. Analyze ranking distribution and performance metrics for keywords in top search results.',
    inputSchema: {
      type: 'object',
      properties: {
        keyword: {
          type: 'string',
          description: 'Keyword to analyze top performance for'
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
          description: 'Page number in response (Default: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page in response (Default: 100, Max: 1000)'
        }
      },
      required: ['keyword', 'se']
    },
  },
  {
    name: 'getKeywordFullTop',
    description: 'Get full keyword performance data. Comprehensive analysis of keyword performance across all ranking positions with detailed metrics.',
    inputSchema: {
      type: 'object',
      properties: {
        keyword: {
          type: 'string',
          description: 'Keyword to analyze full performance for'
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
          description: 'Page number in response (Default: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page in response (Default: 100, Max: 1000)'
        }
      },
      required: ['keyword', 'se']
    },
  },
  {
    name: 'exportKeywordsPhrase',
    description: 'Export keywords data in various formats. Ideal for large-scale analysis and data processing workflows.',
    inputSchema: {
      type: 'object',
      properties: {
        keyword: {
          type: 'string',
          description: 'Keyword to export data for'
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
          description: 'Page number in response (Min: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page in response (Default: 100, Max: 60000)'
        }
      },
      required: ['keyword', 'se']
    },
  },
  {
    name: 'exportSuggestions',
    description: 'Export suggestions data in various formats. Perfect for bulk keyword suggestion analysis and content planning.',
    inputSchema: {
      type: 'object',
      properties: {
        keyword: {
          type: 'string',
          description: 'Keyword to export suggestions for'
        },
        se: {
          type: 'string',
          description: 'Search engine code (e.g., "g_us" for Google US). Refer to full list of search engines.'
        },
        filters: {
          type: 'object',
          description: 'Filter conditions including minus_keywords to exclude specific terms'
        },
        page: {
          type: 'number',
          description: 'Page number in response (Default: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page in response (Default: 100)'
        }
      },
      required: ['keyword', 'se']
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
 * Serpstat Keyword Analysis MCP server. It processes incoming tool requests,
 * validates arguments against Zod schemas, routes to the appropriate tool
 * implementation, and returns formatted responses with proper error handling.
 *
 * The handler supports all 12 keyword analysis tools with the following workflow:
 * 1. Initialize Serpstat API client if not already initialized
 * 2. Validate that tool arguments are provided
 * 3. Route to the appropriate tool implementation based on tool name
 * 4. Validate arguments against the corresponding Zod schema
 * 5. Execute the tool via the shared library
 * 6. Format and return the response
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
      case 'getKeywords': {
        const validatedArgs = GetKeywordsSchema.parse(args);
        result = await getKeywords(validatedArgs);
        break;
      }

      case 'getSuggestions': {
        const validatedArgs = GetSuggestionsSchema.parse(args);
        result = await getSuggestions(validatedArgs);
        break;
      }

      case 'getKeywordsInfo': {
        const validatedArgs = GetKeywordsInfoSchema.parse(args);
        result = await getKeywordsInfo(validatedArgs);
        break;
      }

      case 'getRelatedKeywords': {
        const validatedArgs = GetRelatedKeywordsSchema.parse(args);
        result = await getRelatedKeywords(validatedArgs);
        break;
      }

      case 'getTopUrls': {
        const validatedArgs = GetTopUrlsSchema.parse(args);
        result = await getTopUrls(validatedArgs);
        break;
      }

      case 'getCompetitors': {
        const validatedArgs = GetCompetitorsSchema.parse(args);
        result = await getCompetitors(validatedArgs);
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

      case 'getKeywordTop': {
        const validatedArgs = GetKeywordTopSchema.parse(args);
        result = await getKeywordTop(validatedArgs);
        break;
      }

      case 'getKeywordFullTop': {
        const validatedArgs = GetKeywordFullTopSchema.parse(args);
        result = await getKeywordFullTop(validatedArgs);
        break;
      }

      case 'exportKeywordsPhrase': {
        const validatedArgs = ExportKeywordsPhraseSchema.parse(args);
        result = await exportKeywordsPhrase(validatedArgs);
        break;
      }

      case 'exportSuggestions': {
        const validatedArgs = ExportSuggestionsSchema.parse(args);
        result = await exportSuggestions(validatedArgs);
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
 * This section contains the implementation functions for all 12 keyword analysis tools.
 * Each function follows a consistent pattern:
 * 1. Check if the Serpstat API client is initialized
 * 2. Call the shared makeSerpstatRequest function with the appropriate method and arguments
 * 3. Return the response from the API
 *
 * These functions serve as thin wrappers around the shared library, providing type safety
 * and consistent error handling across all tools. The actual API communication logic
 * is handled by the shared serpstat-shared library.
 *
 * @module serpstat-keyword-analysis
 * @requires serpstat-shared
 */
async function getKeywords(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(API_METHODS.getKeywords, args);
  return response;
}

async function getSuggestions(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(API_METHODS.getSuggestions, args);
  return response;
}

async function getKeywordsInfo(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(API_METHODS.getKeywordsInfo, args);
  return response;
}

async function getRelatedKeywords(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(API_METHODS.getRelatedKeywords, args);
  return response;
}

async function getTopUrls(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(API_METHODS.getTopUrls, args);
  return response;
}

async function getCompetitors(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(API_METHODS.getCompetitors, args);
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

async function getKeywordTop(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(API_METHODS.getKeywordTop, args);
  return response;
}

async function getKeywordFullTop(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(API_METHODS.getKeywordFullTop, args);
  return response;
}

async function exportKeywordsPhrase(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(API_METHODS.exportKeywordsPhrase, args);
  return response;
}

async function exportSuggestions(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(API_METHODS.exportSuggestions, args);
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
  console.error('Serpstat Keyword Analysis MCP server started');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});