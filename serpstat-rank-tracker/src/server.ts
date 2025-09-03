/**
 * Serpstat Rank Tracker MCP Server
 * ===================================
 *
 * This is the main MCP server implementation for the Serpstat Rank Tracker API.
 * It provides 6 tools for rank tracking, competitor analysis, and SERP history.
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-09-03
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { makeSerpstatRequest } from 'serpstat-shared';
import { API_METHODS } from './constants.js';
import {
  GetProjectsSchema,
  GetProjectStatusSchema,
  GetProjectRegionsSchema,
  GetKeywordsSerpResultsHistorySchema,
  GetUrlsSerpResultsHistorySchema,
  GetTopCompetitorsDomainsHistorySchema,
} from './utils/validation.js';

// Create MCP server instance
const server = new Server(
  {
    name: 'serpstat-rank-tracker',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool definitions
const TOOLS = [
  {
    name: 'getProjects',
    description: 'Get a list of your rank tracker projects with ID, name, domain, creation date, and status. Essential for project management and identifying available projects for analysis. (No API credits consumed)',
    inputSchema: {
      type: 'object',
      properties: {
        page: {
          type: 'number',
          description: 'Page number in response (Default: 1)'
        },
        pageSize: {
          type: 'number',
          enum: [20, 50, 100, 500],
          description: 'Number of results per page (Default: 100)'
        }
      },
      required: []
    },
  },
  {
    name: 'getProjectStatus',
    description: 'Get the current status of position update process (parsing) for a project and region. Check if data is ready before making other API calls to ensure accurate results. (No API credits consumed)',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'number',
          description: 'Project identifier in numeric representation'
        },
        regionId: {
          type: 'number',
          description: 'Search region ID'
        }
      },
      required: ['projectId', 'regionId']
    },
  },
  {
    name: 'getProjectRegions',
    description: 'Get the list of project regions and their status. Essential for understanding which regions are configured for tracking and their current settings. (No API credits consumed)',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'number',
          description: 'Project ID'
        }
      },
      required: ['projectId']
    },
  },
  {
    name: 'getKeywordsSerpResultsHistory',
    description: 'Get Google\'s top-100 search results for project keywords in a specific region. Perfect for analyzing keyword performance, ranking trends, and SERP positioning over time. (No API credits consumed)',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'number',
          description: 'Project ID'
        },
        projectRegionId: {
          type: 'number',
          description: 'Region ID'
        },
        page: {
          type: 'number',
          description: 'Page number (Default: 1)'
        },
        pageSize: {
          type: 'number',
          enum: [20, 50, 100, 200, 500],
          description: 'Number of results per page (Default: 100)'
        },
        dateFrom: {
          type: 'string',
          description: 'Start date for historical data (YYYY-MM-DD)'
        },
        dateTo: {
          type: 'string',
          description: 'End date for historical data (YYYY-MM-DD)'
        },
        sort: {
          type: 'string',
          enum: ['keyword', 'date'],
          description: 'Sorting by field (Default: keyword)'
        },
        order: {
          type: 'string',
          enum: ['asc', 'desc'],
          description: 'Sorting order (Default: desc)'
        },
        keywords: {
          type: 'array',
          items: {
            type: 'string'
          },
          description: 'Keywords for which pages and positions are required (max 1000)'
        },
        withTags: {
          type: 'boolean',
          description: 'Display tags for the keywords (Default: false)'
        }
      },
      required: ['projectId', 'projectRegionId', 'page']
    },
  },
  {
    name: 'getUrlsSerpResultsHistory',
    description: 'Get the ranking history of URLs for project keywords in a specific region. Ideal for tracking specific page performance, URL ranking changes, and competitor URL analysis. (No API credits consumed)',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'number',
          description: 'Project ID'
        },
        projectRegionId: {
          type: 'number',
          description: 'Region ID'
        },
        page: {
          type: 'number',
          description: 'Page number (Default: 1)'
        },
        pageSize: {
          type: 'number',
          enum: [20, 50, 100, 200, 500],
          description: 'Number of results per page (Default: 100)'
        },
        dateFrom: {
          type: 'string',
          description: 'Start date for historical data (YYYY-MM-DD)'
        },
        dateTo: {
          type: 'string',
          description: 'End date for historical data (YYYY-MM-DD)'
        },
        sort: {
          type: 'string',
          enum: ['keyword', 'date'],
          description: 'Sorting by field (Default: keyword)'
        },
        order: {
          type: 'string',
          enum: ['asc', 'desc'],
          description: 'Sorting order (Default: desc)'
        },
        keywords: {
          type: 'array',
          items: {
            type: 'string'
          },
          description: 'Keywords for which pages and positions are required (max 1000)'
        },
        withTags: {
          type: 'boolean',
          description: 'Display tags for the keywords (Default: false)'
        },
        domain: {
          type: 'string',
          description: 'Domain or page for which the data is required (format: domain.com or https://domain.com/)'
        }
      },
      required: ['projectId', 'projectRegionId', 'page']
    },
  },
  {
    name: 'getTopCompetitorsDomainsHistory',
    description: 'Get domains listed in top-20 for project keywords with historical data. Essential for competitive analysis, identifying new competitors, and tracking competitor ranking trends. (No API credits consumed)',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'number',
          description: 'Project ID'
        },
        projectRegionId: {
          type: 'number',
          description: 'Region ID'
        },
        page: {
          type: 'number',
          description: 'Page number'
        },
        pageSize: {
          type: 'number',
          minimum: 20,
          maximum: 500,
          description: 'Number of results per page (20-500, Default: 100)'
        },
        dateFrom: {
          type: 'string',
          description: 'Start date of the period for which the data is required (YYYY-MM-DD)'
        },
        dateTo: {
          type: 'string',
          description: 'Date of last withdrawal of positions (YYYY-MM-DD)'
        },
        sort: {
          type: 'string',
          enum: ['domain', 'sum_traffic', 'keywords_count', 'avg_position', 'position_ranges', 'ads_count'],
          description: 'Sorting by parameters (Default: sum_traffic)'
        },
        sortRange: {
          type: 'string',
          enum: ['top1', 'top2', 'top3', 'top5', 'top10', 'top20', 'top101', 'keywords_count_bottom', 'keywords_count_top', 'avg_position_top', 'avg_position_bottom'],
          description: 'Sort range for detailed sorting'
        },
        order: {
          type: 'string',
          enum: ['asc', 'desc'],
          description: 'Sorting order (Default: desc)'
        },
        domains: {
          type: 'array',
          items: {
            type: 'string'
          },
          description: 'All domains in top 20 for two project keywords'
        }
      },
      required: ['projectId', 'projectRegionId', 'page', 'pageSize', 'dateFrom', 'dateTo', 'domains']
    },
  },
];

// Tool handler functions
async function handleGetProjects(args: unknown) {
  const validatedArgs = GetProjectsSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getProjects, {
    ...(validatedArgs.page && validatedArgs.page !== 1 && { page: validatedArgs.page }),
    ...(validatedArgs.pageSize && validatedArgs.pageSize !== 100 && { pageSize: validatedArgs.pageSize }),
  });
}

async function handleGetProjectStatus(args: unknown) {
  const validatedArgs = GetProjectStatusSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getProjectStatus, {
    projectId: validatedArgs.projectId,
    regionId: validatedArgs.regionId,
  });
}

async function handleGetProjectRegions(args: unknown) {
  const validatedArgs = GetProjectRegionsSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getProjectRegions, {
    projectId: validatedArgs.projectId,
  });
}

async function handleGetKeywordsSerpResultsHistory(args: unknown) {
  const validatedArgs = GetKeywordsSerpResultsHistorySchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getKeywordsSerpResultsHistory, {
    projectId: validatedArgs.projectId,
    projectRegionId: validatedArgs.projectRegionId,
    page: validatedArgs.page,
    ...(validatedArgs.pageSize && validatedArgs.pageSize !== 100 && { pageSize: validatedArgs.pageSize }),
    ...(validatedArgs.dateFrom && { dateFrom: validatedArgs.dateFrom }),
    ...(validatedArgs.dateTo && { dateTo: validatedArgs.dateTo }),
    ...(validatedArgs.sort && validatedArgs.sort !== 'keyword' && { sort: validatedArgs.sort }),
    ...(validatedArgs.order && validatedArgs.order !== 'desc' && { order: validatedArgs.order }),
    ...(validatedArgs.keywords && validatedArgs.keywords.length > 0 && { keywords: validatedArgs.keywords }),
    ...(validatedArgs.withTags && validatedArgs.withTags !== false && { withTags: validatedArgs.withTags }),
  });
}

async function handleGetUrlsSerpResultsHistory(args: unknown) {
  const validatedArgs = GetUrlsSerpResultsHistorySchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getUrlsSerpResultsHistory, {
    projectId: validatedArgs.projectId,
    projectRegionId: validatedArgs.projectRegionId,
    page: validatedArgs.page,
    ...(validatedArgs.pageSize && validatedArgs.pageSize !== 100 && { pageSize: validatedArgs.pageSize }),
    ...(validatedArgs.dateFrom && { dateFrom: validatedArgs.dateFrom }),
    ...(validatedArgs.dateTo && { dateTo: validatedArgs.dateTo }),
    ...(validatedArgs.sort && validatedArgs.sort !== 'keyword' && { sort: validatedArgs.sort }),
    ...(validatedArgs.order && validatedArgs.order !== 'desc' && { order: validatedArgs.order }),
    ...(validatedArgs.keywords && validatedArgs.keywords.length > 0 && { keywords: validatedArgs.keywords }),
    ...(validatedArgs.withTags && validatedArgs.withTags !== false && { withTags: validatedArgs.withTags }),
    ...(validatedArgs.domain && { domain: validatedArgs.domain }),
  });
}

async function handleGetTopCompetitorsDomainsHistory(args: unknown) {
  const validatedArgs = GetTopCompetitorsDomainsHistorySchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getTopCompetitorsDomainsHistory, {
    projectId: validatedArgs.projectId,
    projectRegionId: validatedArgs.projectRegionId,
    page: validatedArgs.page,
    pageSize: validatedArgs.pageSize,
    dateFrom: validatedArgs.dateFrom,
    dateTo: validatedArgs.dateTo,
    ...(validatedArgs.sort && validatedArgs.sort !== 'sum_traffic' && { sort: validatedArgs.sort }),
    ...(validatedArgs.sortRange && { sortRange: validatedArgs.sortRange }),
    ...(validatedArgs.order && validatedArgs.order !== 'desc' && { order: validatedArgs.order }),
    domains: validatedArgs.domains,
  });
}

// List tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: TOOLS,
  };
});

// Call tool handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result;

    switch (name) {
      case 'getProjects':
        result = await handleGetProjects(args);
        break;
      case 'getProjectStatus':
        result = await handleGetProjectStatus(args);
        break;
      case 'getProjectRegions':
        result = await handleGetProjectRegions(args);
        break;
      case 'getKeywordsSerpResultsHistory':
        result = await handleGetKeywordsSerpResultsHistory(args);
        break;
      case 'getUrlsSerpResultsHistory':
        result = await handleGetUrlsSerpResultsHistory(args);
        break;
      case 'getTopCompetitorsDomainsHistory':
        result = await handleGetTopCompetitorsDomainsHistory(args);
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
    if (error instanceof z.ZodError) {
      throw new Error(
        `Invalid arguments for ${name}: ${error.errors
          .map((e) => `${e.path.join('.')}: ${e.message}`)
          .join(', ')}`
      );
    }
    throw error;
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Serpstat Rank Tracker MCP server started');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});

export { server };