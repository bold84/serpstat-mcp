/**
 * Serpstat Domain Analysis MCP Server
 * ===================================
 *
 * Main server entry point that initializes and configures the MCP server
 * with all domain analysis tools and procedures.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool
} from '@modelcontextprotocol/sdk/types.js';
import { createSerpstatClient } from './utils/api-client.js';
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
import { API_METHODS, SEARCH_ENGINES } from './constants.js';
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
let serpstatClient: ReturnType<typeof createSerpstatClient> | null = null;

/**
 * Initialize the Serpstat API client
 */
function initializeSerpstatClient() {
  const apiKey = process.env.SERPSTAT_API_KEY;
  if (!apiKey) {
    throw new Error('SERPSTAT_API_KEY environment variable is required');
  }
  serpstatClient = createSerpstatClient(apiKey);
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
    name: 'getCompetitors',
    description: '⚠️ DEPRECATED - Returns the list of domain competitors in top 20 Google search results. Similar to the Competitors report of the domain. Note: This method is deprecated from 2023-03-01.',
    inputSchema: {
      type: 'object',
      properties: {
        domain: {
          type: 'string',
          description: 'Domain name to get competitors for'
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
          description: 'Optional. With this sorting options, you can sort by one of response parameters. Default sorting is "relevance":"desc"'
        },
        size: {
          type: 'number',
          description: 'Size of report, by default - 100, you can specify lower value - 5 (Min: 1, Max: 1000)'
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
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: TOOLS,
  };
});

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

      case 'getCompetitors': {
        const validatedArgs = GetCompetitorsSchema.parse(args);
        result = await getCompetitors(validatedArgs);
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
 * Tool implementations (to be implemented in separate files)
 */
async function getDomainsInfo(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await serpstatClient.callMethod(API_METHODS.getDomainsInfo, args);
  return response;
}

async function getDomainKeywords(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await serpstatClient.callMethod(API_METHODS.getDomainKeywords, args);
  return response;
}

async function getAdKeywords(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await serpstatClient.callMethod(API_METHODS.getAdKeywords, args);
  return response;
}

async function getCompetitors(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await serpstatClient.callMethod(API_METHODS.getCompetitors, args);
  return response;
}

async function getAdsCompetitors(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await serpstatClient.callMethod(API_METHODS.getAdsCompetitors, args);
  return response;
}

async function getOrganicCompetitorsPage(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await serpstatClient.callMethod(API_METHODS.getOrganicCompetitorsPage, args);
  return response;
}

async function getTopUrls(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await serpstatClient.callMethod(API_METHODS.getTopUrls, args);
  return response;
}

async function getDomainUrls(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await serpstatClient.callMethod(API_METHODS.getDomainUrls, args);
  return response;
}

async function getDomainsHistory(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await serpstatClient.callMethod(API_METHODS.getDomainsHistory, args);
  return response;
}

async function getDomainsIntersection(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await serpstatClient.callMethod(API_METHODS.getDomainsIntersection, args);
  return response;
}

async function getDomainsUniqKeywords(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await serpstatClient.callMethod(API_METHODS.getDomainsUniqKeywords, args);
  return response;
}

async function getAllRegionsTraffic(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await serpstatClient.callMethod(API_METHODS.getAllRegionsTraffic, args);
  return response;
}

async function getRegionsCount(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await serpstatClient.callMethod(API_METHODS.getRegionsCount, args);
  return response;
}

async function exportPositions(args: any): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await serpstatClient.callMethod(API_METHODS.exportPositions, args);
  return response;
}

/**
 * Start the server
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