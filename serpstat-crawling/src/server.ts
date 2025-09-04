/**
 * Serpstat SERP Crawling MCP Server
 * ==================================
 *
 * This is the main MCP server implementation for the Serpstat SERP Crawling API.
 * It provides 6 tools for SERP crawling, task management, and balance checking.
 * This API uses separate billing and a different endpoint (v2).
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-09-04
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { createSerpstatClient } from 'serpstat-shared';
import { API_METHODS, API_CONFIG, CREDIT_INFO } from './constants.js';
import {
  AddTaskSchema,
  AddKeywordListSchema,
  GetListSchema,
  GetParsingBalanceSchema,
  GetTaskResultSchema,
  GetKeywordSerpSchema,
} from './utils/validation.js';

// Create MCP server instance
const server = new Server(
  {
    name: 'serpstat-crawling',
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
    name: 'addTask',
    description: 'Add a single keyword task for SERP crawling. Specify keywords (comma-separated), search engine, country, and optional region/language/device settings. (Consumes separate crawling credits)',
    inputSchema: {
      type: 'object',
      properties: {
        keywords: {
          type: 'string',
          description: 'Keywords for parsing divided by commas (e.g., "iphone, samsung, best phone")'
        },
        seId: {
          type: 'number',
          description: 'Search engine identifier (1=Google, 2=Bing, 3=Yandex)'
        },
        countryId: {
          type: 'number',
          description: 'Country identifier (1-247, e.g., 23=United States)'
        },
        regionId: {
          type: 'number',
          description: 'Region or city identifier (optional, e.g., 21176=New York)'
        },
        langId: {
          type: 'number',
          description: 'Language identifier (1-48, default: 1=English)'
        },
        typeId: {
          type: 'number',
          description: 'Device type identifier (1=Desktop, 2=Mobile, default: 1)'
        },
        type: {
          type: 'string',
          enum: ['regular', 'local', 'regular_aio'],
          description: 'Type of Google results (default: "regular", "regular_aio" includes AI Overview)'
        }
      },
      required: ['keywords', 'seId', 'countryId']
    },
  },
  {
    name: 'addKeywordList',
    description: 'Add multiple keywords as an array for SERP crawling. Each array item can contain comma-separated keywords. (Consumes separate crawling credits)',
    inputSchema: {
      type: 'object',
      properties: {
        keywords: {
          type: 'array',
          items: {
            type: 'string'
          },
          description: 'Array of keyword strings with commas (e.g., ["iphone, samsung", "nike, adidas"])'
        },
        seId: {
          type: 'number',
          description: 'Search engine identifier (1=Google, 2=Bing, 3=Yandex)'
        },
        countryId: {
          type: 'number',
          description: 'Country identifier (1-247, e.g., 23=United States)'
        },
        regionId: {
          type: 'number',
          description: 'Region or city identifier (optional, e.g., 21176=New York)'
        },
        langId: {
          type: 'number',
          description: 'Language identifier (1-48, default: 1=English)'
        },
        typeId: {
          type: 'number',
          description: 'Device type identifier (1=Desktop, 2=Mobile, default: 1)'
        },
        type: {
          type: 'string',
          enum: ['regular', 'local', 'regular_aio'],
          description: 'Type of Google results (default: "regular", "regular_aio" includes AI Overview)'
        }
      },
      required: ['keywords', 'seId', 'countryId']
    },
  },
  {
    name: 'getList',
    description: 'Get a list of crawling tasks for the last 7 days with status information. Includes task progress, creation time, and completion status. (No API credits consumed)',
    inputSchema: {
      type: 'object',
      properties: {
        page: {
          type: 'number',
          description: 'Page number (default: 1)'
        },
        pageSize: {
          type: 'number',
          description: 'Number of results per page (100-1000, default: 100)'
        }
      },
      required: []
    },
  },
  {
    name: 'getParsingBalance',
    description: 'Get account balance for SERP and volume parsing services. Shows available balance and cost per keyword for different parsing services. (No API credits consumed)',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    },
  },
  {
    name: 'getTaskResult',
    description: 'Get SERP crawling results using task ID. Returns comprehensive SERP data including organic results, ads, local packs, AI overview, and other SERP features. (No API credits consumed)',
    inputSchema: {
      type: 'object',
      properties: {
        taskId: {
          type: 'number',
          description: 'Crawling task identifier (returned by addTask/addKeywordList)'
        },
        page: {
          type: 'number',
          description: 'Page number for pagination (default: 1)'
        }
      },
      required: ['taskId']
    },
  },
  {
    name: 'getKeywordSerp',
    description: 'Get raw HTML SERP for a specific keyword within a task. Returns the complete HTML structure of the search engine results page. (No API credits consumed)',
    inputSchema: {
      type: 'object',
      properties: {
        taskId: {
          type: 'number',
          description: 'Crawling task identifier'
        },
        keywordId: {
          type: 'number',
          description: 'Keyword identifier (obtained from getTaskResult response)'
        }
      },
      required: ['taskId', 'keywordId']
    },
  },
];

// Tool handler functions
async function handleAddTask(args: unknown) {
  const validatedArgs = AddTaskSchema.parse(args);
  const token = process.env.SERPSTAT_API_KEY;
  if (!token) {
    throw new Error("SERPSTAT_API_KEY environment variable is required for SERP Crawling API");
  }
  
  const client = createSerpstatClient(token, API_CONFIG.BASE_URL);
  const response = await client.callMethod(API_METHODS.addTask, {
    keywords: validatedArgs.keywords,
    seId: validatedArgs.seId,
    countryId: validatedArgs.countryId,
    ...(validatedArgs.regionId && { regionId: validatedArgs.regionId }),
    ...(validatedArgs.langId && { langId: validatedArgs.langId }),
    ...(validatedArgs.typeId && validatedArgs.typeId !== 1 && { typeId: validatedArgs.typeId }),
    ...(validatedArgs.type && validatedArgs.type !== 'regular' && { type: validatedArgs.type }),
  });
  
  if (!response.success) {
    throw new Error(`API Error: ${response.error?.message || 'Unknown error'}`);
  }
  
  return response.data;
}

async function handleAddKeywordList(args: unknown) {
  const validatedArgs = AddKeywordListSchema.parse(args);
  const token = process.env.SERPSTAT_API_KEY;
  if (!token) {
    throw new Error("SERPSTAT_API_KEY environment variable is required for SERP Crawling API");
  }
  
  const client = createSerpstatClient(token, API_CONFIG.BASE_URL);
  const response = await client.callMethod(API_METHODS.addKeywordList, {
    keywords: validatedArgs.keywords,
    seId: validatedArgs.seId,
    countryId: validatedArgs.countryId,
    ...(validatedArgs.regionId && { regionId: validatedArgs.regionId }),
    ...(validatedArgs.langId && { langId: validatedArgs.langId }),
    ...(validatedArgs.typeId && validatedArgs.typeId !== 1 && { typeId: validatedArgs.typeId }),
    ...(validatedArgs.type && validatedArgs.type !== 'regular' && { type: validatedArgs.type }),
  });
  
  if (!response.success) {
    throw new Error(`API Error: ${response.error?.message || 'Unknown error'}`);
  }
  
  return response.data;
}

async function handleGetList(args: unknown) {
  const validatedArgs = GetListSchema.parse(args);
  const token = process.env.SERPSTAT_API_KEY;
  if (!token) {
    throw new Error("SERPSTAT_API_KEY environment variable is required for SERP Crawling API");
  }
  
  const client = createSerpstatClient(token, API_CONFIG.BASE_URL);
  const response = await client.callMethod(API_METHODS.getList, {
    ...(validatedArgs.page && validatedArgs.page !== 1 && { page: validatedArgs.page }),
    ...(validatedArgs.pageSize && { pageSize: validatedArgs.pageSize }),
  });
  
  if (!response.success) {
    throw new Error(`API Error: ${response.error?.message || 'Unknown error'}`);
  }
  
  return response.data;
}

async function handleGetParsingBalance(args: unknown) {
  const validatedArgs = GetParsingBalanceSchema.parse(args);
  const token = process.env.SERPSTAT_API_KEY;
  if (!token) {
    throw new Error("SERPSTAT_API_KEY environment variable is required for SERP Crawling API");
  }
  
  const client = createSerpstatClient(token, API_CONFIG.BASE_URL);
  const response = await client.callMethod(API_METHODS.getParsingBalance, {});
  
  if (!response.success) {
    throw new Error(`API Error: ${response.error?.message || 'Unknown error'}`);
  }
  
  return response.data;
}

async function handleGetTaskResult(args: unknown) {
  const validatedArgs = GetTaskResultSchema.parse(args);
  const token = process.env.SERPSTAT_API_KEY;
  if (!token) {
    throw new Error("SERPSTAT_API_KEY environment variable is required for SERP Crawling API");
  }
  
  const client = createSerpstatClient(token, API_CONFIG.BASE_URL);
  const response = await client.callMethod(API_METHODS.getTaskResult, {
    taskId: validatedArgs.taskId,
    ...(validatedArgs.page && validatedArgs.page !== 1 && { page: validatedArgs.page }),
  });
  
  if (!response.success) {
    throw new Error(`API Error: ${response.error?.message || 'Unknown error'}`);
  }
  
  return response.data;
}

async function handleGetKeywordSerp(args: unknown) {
  const validatedArgs = GetKeywordSerpSchema.parse(args);
  const token = process.env.SERPSTAT_API_KEY;
  if (!token) {
    throw new Error("SERPSTAT_API_KEY environment variable is required for SERP Crawling API");
  }
  
  const client = createSerpstatClient(token, API_CONFIG.BASE_URL);
  const response = await client.callMethod(API_METHODS.getKeywordSerp, {
    taskId: validatedArgs.taskId,
    keywordId: validatedArgs.keywordId,
  });
  
  if (!response.success) {
    throw new Error(`API Error: ${response.error?.message || 'Unknown error'}`);
  }
  
  return response.data;
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
      case 'addTask':
        result = await handleAddTask(args);
        break;
      case 'addKeywordList':
        result = await handleAddKeywordList(args);
        break;
      case 'getList':
        result = await handleGetList(args);
        break;
      case 'getParsingBalance':
        result = await handleGetParsingBalance(args);
        break;
      case 'getTaskResult':
        result = await handleGetTaskResult(args);
        break;
      case 'getKeywordSerp':
        result = await handleGetKeywordSerp(args);
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
  console.error('Serpstat SERP Crawling MCP server started');
  console.error(`Note: ${CREDIT_INFO.SEPARATE_BILLING_NOTICE}`);
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});

export { server };