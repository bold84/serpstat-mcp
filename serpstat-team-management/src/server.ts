/**
 * Serpstat Team Management MCP Server
 * ===================================
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-08-31
 *
 * This module implements the core MCP server for Serpstat Team Management API integration.
 * It provides a comprehensive interface to 5 different team management methods through
 * the Model Context Protocol (MCP) framework.
 *
 * The server initializes with MCP server capabilities and registers various tools for
 * team management, including user invitation, user listing, user activation/deactivation,
 * and user removal. All API calls are routed through a shared Serpstat API client
 * with built-in error handling and retry logic.
 *
 * Key Features:
 * - 5 team management tools with comprehensive validation
 * - Robust error handling with detailed error messages
 * - Automatic API client initialization with environment variable validation
 * - Comprehensive input validation using Zod schemas
 * - Support for team member search and pagination
 * - Project management integration for user removal
 *
 * Available Tools:
 * - addUser: Invite a new user to join your team by email address
 * - getList: Get a list of all users in your team with optional search and pagination
 * - activateUser: Activate an inactive user in your team
 * - deactivateUser: Deactivate an active user in your team
 * - removeUser: Remove a user from your team (optionally merge their projects)
 *
 * @module serpstat-team-management
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
  makeSerpstatRequest,
  API_CONFIG
} from 'serpstat-shared';
import {
  AddUserRequestSchema,
  GetListRequestSchema,
  ActivateUserRequestSchema,
  DeactivateUserRequestSchema,
  RemoveUserRequestSchema
} from './utils/validation.js';
import { API_METHODS } from './constants.js';
import { z } from 'zod';

// Initialize MCP Server
export const server: Server = new Server(
  {
    name: 'serpstat-team-management-server',
    version: '0.2.0',
    description: 'A comprehensive MCP server for Serpstat Team Management API',
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
 *
 * This array defines all the tools available through the Serpstat Team Management MCP server.
 * Each tool is configured with a name, description, and input schema that defines the expected
 * parameters and their validation rules. The tools provide a comprehensive interface to the
 * Serpstat Team Management API functionality.
 *
 * Available tools:
 * - addUser: Invite new users via email with validation
 * - getList: Retrieve team member lists with search and pagination
 * - activateUser: Activate inactive team members
 * - deactivateUser: Deactivate active team members
 * - removeUser: Remove team members with project management options
 *
 * @type {Tool[]}
 */
const TOOLS: Tool[] = [
  {
    name: 'add_user',
    description: 'Invite a new user to join your team by email address',
    inputSchema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: 'User\'s email address to invite'
        }
      },
      required: ['email']
    },
  },
  {
    name: 'get_list',
    description: 'Get a list of all users in your team with optional search and pagination',
    inputSchema: {
      type: 'object',
      properties: {
        search: {
          type: 'string',
          description: 'Search term to filter by email (default: "")'
        },
        page: {
          type: 'number',
          description: 'Page number for pagination (default: 1)'
        },
        size: {
          type: 'number',
          description: 'Number of results per page (1-1000, default: 100)'
        }
      },
      required: []
    },
  },
  {
    name: 'activate_user',
    description: 'Activate an inactive user in your team',
    inputSchema: {
      type: 'object',
      properties: {
        user_id: {
          type: 'number',
          description: 'User\'s identifier at Serpstat (obtained from get_list)'
        }
      },
      required: ['user_id']
    },
  },
  {
    name: 'deactivate_user',
    description: 'Deactivate an active user in your team',
    inputSchema: {
      type: 'object',
      properties: {
        user_id: {
          type: 'number',
          description: 'User\'s identifier at Serpstat (obtained from get_list)'
        }
      },
      required: ['user_id']
    },
  },
  {
    name: 'remove_user',
    description: 'Remove a user from your team (optionally merge their projects)',
    inputSchema: {
      type: 'object',
      properties: {
        user_id: {
          type: 'number',
          description: 'User\'s identifier at Serpstat (obtained from get_list)'
        },
        merge_projects: {
          type: 'boolean',
          description: 'Transfer user\'s projects to team owner if true, delete if false (default: true)'
        }
      },
      required: ['user_id']
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
 * Serpstat Team Management MCP server. It processes incoming tool requests,
 * validates arguments against Zod schemas, routes to the appropriate tool
 * implementation, and returns formatted responses with proper error handling.
 *
 * The handler supports all 5 team management tools with the following workflow:
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
      case 'add_user': {
        const validatedArgs = AddUserRequestSchema.parse(args);
        result = await addUser(validatedArgs);
        break;
      }

      case 'get_list': {
        const validatedArgs = GetListRequestSchema.parse(args);
        result = await getList(validatedArgs);
        break;
      }

      case 'activate_user': {
        const validatedArgs = ActivateUserRequestSchema.parse(args);
        result = await activateUser(validatedArgs);
        break;
      }

      case 'deactivate_user': {
        const validatedArgs = DeactivateUserRequestSchema.parse(args);
        result = await deactivateUser(validatedArgs);
        break;
      }

      case 'remove_user': {
        const validatedArgs = RemoveUserRequestSchema.parse(args);
        result = await removeUser(validatedArgs);
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
 * This section contains the implementation functions for all 5 team management tools.
 * Each function follows a consistent pattern:
 * 1. Check if the Serpstat API client is initialized
 * 2. Call the shared makeSerpstatRequest function with the appropriate method and arguments
 * 3. Return the response from the API
 *
 * These functions serve as thin wrappers around the shared library, providing type safety
 * and consistent error handling across all tools. The actual API communication logic
 * is handled by the shared serpstat-shared library.
 *
 * @module serpstat-team-management
 * @requires serpstat-shared
 */
async function addUser(args: { email: string }): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(
    API_METHODS.addUser,
    { email: args.email }
  );
  return response;
}

async function getList(args: { search: string; page: number; size: number }): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(
    API_METHODS.getList,
    {
      search: args.search,
      page: args.page,
      size: args.size,
    }
  );
  return response;
}

async function activateUser(args: { user_id: number }): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(
    API_METHODS.activateUser,
    { user_id: args.user_id }
  );
  return response;
}

async function deactivateUser(args: { user_id: number }): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(
    API_METHODS.deactivateUser,
    { user_id: args.user_id }
  );
  return response;
}

async function removeUser(args: { user_id: number; merge_projects: boolean }): Promise<any> {
  if (!serpstatClient) throw new Error('Serpstat client not initialized');
  
  const response = await makeSerpstatRequest(
    API_METHODS.removeUser,
    {
      user_id: args.user_id,
      merge_projects: args.merge_projects,
    }
  );
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
  console.error('Serpstat Team Management MCP server started');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});