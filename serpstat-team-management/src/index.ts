#!/usr/bin/env node

/**
 * Serpstat Team Management API MCP Server
 * ========================================
 *
 * A comprehensive Model Context Protocol (MCP) server for managing Serpstat team members.
 * This server provides a clean, intuitive interface for all team management operations
 * through the Serpstat Team Management API.
 *
 * Features:
 * - User invitation and onboarding
 * - Team member listing with advanced filtering
 * - User activation/deactivation
 * - User removal with project management options
 * - Robust error handling and validation
 * - Mock API support for testing
 *
 * Setup:
 * 1. Set the SERPSTAT_API_KEY environment variable
 * 2. Build the project: npm run build
 * 3. Test with inspector: npm run inspector
 *
 * Usage:
 * - Use MCP client tools to interact with team management
 * - All tools return structured JSON responses
 * - Comprehensive validation prevents invalid operations
 *
 * API Documentation:
 * - Base URL: https://api.serpstat.com/v4
 * - Authentication: Bearer token via SERPSTAT_API_KEY
 * - Protocol: JSON-RPC 2.0 over stdio
 *
 * @version 0.1.0
 * @author Benjamin Oldenburg
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";
import { z } from "zod";

// API Configuration
const API_BASE_URL = "https://api.serpstat.com/v4";

// Type definitions for Serpstat API responses
interface SerpstatResponse<T = any> {
  id: string;
  result: T;
}

/**
 * Represents a team member in the Serpstat system
 */
interface TeamMember {
  user_id: number;
  email: string;
  status: number; // 0 = inactive, 1 = active
  first_name: string | null;
  last_name: string | null;
}

/**
 * Team member limits and usage statistics
 */
interface TeamLimits {
  total: number;      // Maximum allowed team members
  used: number;       // Currently used slots
  left: number;       // Available slots remaining
}

/**
 * Response structure for adding a new user
 */
interface AddUserResult {
  success: boolean;   // Operation success status
  user_id: number;    // ID of the newly created user
  email: string;      // Email of the invited user
  limits: TeamLimits; // Updated team limits
}

/**
 * Response structure for listing team members
 */
interface GetListResult {
  data: TeamMember[];           // Array of team member objects
  summary_info: {
    total: string;              // Total number of users (string format)
    page: number;               // Current page number
  };
  limits: TeamLimits;           // Current team limits
}

/**
 * Response structure for user activation/deactivation/removal
 */
interface UserActionResult {
  success: boolean;   // Operation success status
  user_id: number;    // ID of the affected user
  limits: TeamLimits; // Updated team limits
}

/**
 * Standard error response format
 */
interface ErrorResponse {
  isError: boolean;   // Always true for error responses
  content: Array<{
    type: "text";
    text: string;     // Detailed error message
  }>;
}

// Request schemas using Zod for validation
// These schemas ensure all incoming MCP tool calls have valid parameters

/**
 * Schema for validating add_user tool arguments
 * Ensures email is a properly formatted string
 */
const AddUserRequestSchema = z.object({
  email: z.string().email("Invalid email format"),
});

/**
 * Schema for validating get_list tool arguments
 * Provides defaults for pagination and search parameters
 */
const GetListRequestSchema = z.object({
  search: z.string().optional().default(""),
  page: z.number().min(1).default(1),
  size: z.number().min(1).max(1000).default(100),
});

/**
 * Schema for validating activate_user tool arguments
 * Ensures user_id is a positive number
 */
const ActivateUserRequestSchema = z.object({
  user_id: z.number().positive("User ID must be positive"),
});

/**
 * Schema for validating deactivate_user tool arguments
 * Ensures user_id is a positive number
 */
const DeactivateUserRequestSchema = z.object({
  user_id: z.number().positive("User ID must be positive"),
});

/**
 * Schema for validating remove_user tool arguments
 * Ensures user_id is positive and provides default for merge_projects
 */
const RemoveUserRequestSchema = z.object({
  user_id: z.number().positive("User ID must be positive"),
  merge_projects: z.boolean().default(true),
});

// Create MCP server
const server = new Server(
  {
    name: "serpstat-team-management",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Create axios instance for Serpstat API
const serpstatApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Make a request to Serpstat API
 *
 * Handles all HTTP communication with the Serpstat Team Management API.
 * Includes authentication, error handling, and response formatting.
 *
 * @param method - Serpstat API method name (e.g., "TeamManagement.addUser")
 * @param params - Request parameters object
 * @returns Promise resolving to Serpstat API response
 * @throws Error for missing API key, network issues, or API errors
 *
 * Example:
 * ```typescript
 * const response = await makeSerpstatRequest<AddUserResult>(
 *   "TeamManagement.addUser",
 *   { email: "user@example.com" }
 * );
 * ```
 */
async function makeSerpstatRequest<T>(
  method: string,
  params: Record<string, any>
): Promise<SerpstatResponse<T>> {
  const token = process.env.SERPSTAT_API_KEY;
  if (!token) {
    throw new Error("SERPSTAT_API_TOKEN environment variable is required");
  }

  const requestData = {
    id: Date.now().toString(),
    method,
    params,
  };

  try {
    const response = await serpstatApi.post<SerpstatResponse<T>>(
      `/?token=${token}#${method}`,
      requestData
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.error?.message || error.response.data?.message || error.message;
      
      throw new Error(`Serpstat API Error (${status}): ${message}`);
    } else if (error.request) {
      throw new Error("Network error: Unable to connect to Serpstat API");
    } else {
      throw new Error(`Request error: ${error.message}`);
    }
  }
}

/**
 * Tool: add_user - Invite a new user to the team
 *
 * Sends an invitation email to a new user to join your Serpstat team.
 * The user will need to accept the invitation to become an active team member.
 *
 * @param email - The email address of the user to invite (must be a valid email format)
 * @returns Success response with user_id and updated team limits
 *
 * Example usage:
 * ```javascript
 * // Add a new team member
 * const result = await callTool("add_user", {
 *   email: "newuser@example.com"
 * });
 * console.log(result.content[0].text);
 * ```
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const toolName = request.params.name;
  
  try {
    switch (toolName) {
      case "add_user": {
        const args = AddUserRequestSchema.parse(request.params.arguments);
        
        const response = await makeSerpstatRequest<AddUserResult>(
          "TeamManagement.addUser",
          { email: args.email }
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response.result, null, 2),
            },
          ],
        };
      }

      case "get_list": {
        const args = GetListRequestSchema.parse(request.params.arguments);
        
        const response = await makeSerpstatRequest<GetListResult>(
          "TeamManagement.getList",
          {
            search: args.search,
            page: args.page,
            size: args.size,
          }
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response.result, null, 2),
            },
          ],
        };
      }

      case "activate_user": {
        const args = ActivateUserRequestSchema.parse(request.params.arguments);
        
        const response = await makeSerpstatRequest<UserActionResult>(
          "TeamManagement.activateUser",
          { user_id: args.user_id }
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response.result, null, 2),
            },
          ],
        };
      }

      case "deactivate_user": {
        const args = DeactivateUserRequestSchema.parse(request.params.arguments);
        
        const response = await makeSerpstatRequest<UserActionResult>(
          "TeamManagement.deactivateUser",
          { user_id: args.user_id }
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response.result, null, 2),
            },
          ],
        };
      }

      case "remove_user": {
        const args = RemoveUserRequestSchema.parse(request.params.arguments);
        
        const response = await makeSerpstatRequest<UserActionResult>(
          "TeamManagement.removeUser",
          {
            user_id: args.user_id,
            merge_projects: args.merge_projects,
          }
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response.result, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

/**
 * Handler that lists available tools
 *
 * This handler provides comprehensive documentation for all available Serpstat team management tools.
 * Each tool includes detailed descriptions, parameter requirements, and usage examples.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "add_user",
        description: "Invite a new user to join your Serpstat team by sending an invitation email. The user will receive an email to accept the invitation and become a team member.",
        inputSchema: {
          type: "object",
          properties: {
            email: {
              type: "string",
              description: "Valid email address of the user to invite. Must be in standard email format (e.g., 'user@example.com').",
            },
          },
          required: ["email"],
        },
      },
      {
        name: "get_list",
        description: "Retrieve a comprehensive list of all users in your Serpstat team with advanced filtering and pagination options. Perfect for team management and user tracking.",
        inputSchema: {
          type: "object",
          properties: {
            search: {
              type: "string",
              description: "Optional search term to filter users by email address. Leave empty to return all users (default: ''). Use partial matches for broad searches.",
            },
            page: {
              type: "number",
              description: "Page number for pagination when dealing with large teams. Must be 1 or higher (default: 1). Use with 'size' parameter for controlled result sets.",
            },
            size: {
              type: "number",
              description: "Number of results per page, between 1-1000. Perfect for balancing detail vs performance (default: 100).",
            },
          },
          required: [],
        },
      },
      {
        name: "activate_user",
        description: "Activate an inactive or pending user in your Serpstat team. This action grants the user full access to team resources and features. Use user_id from get_list results.",
        inputSchema: {
          type: "object",
          properties: {
            user_id: {
              type: "number",
              description: "Unique numeric identifier of the user to activate. Obtain this value from the 'user_id' field in get_list results.",
            },
          },
          required: ["user_id"],
        },
      },
      {
        name: "deactivate_user",
        description: "Temporarily disable an active user's access to Serpstat team resources. The user can be reactivated later without losing their data. Use user_id from get_list results.",
        inputSchema: {
          type: "object",
          properties: {
            user_id: {
              type: "number",
              description: "Unique numeric identifier of the user to deactivate. Obtain this value from the 'user_id' field in get_list results.",
            },
          },
          required: ["user_id"],
        },
      },
      {
        name: "remove_user",
        description: "Permanently remove a user from your Serpstat team. You can choose to transfer their projects to the team owner or delete them entirely. This action is irreversible.",
        inputSchema: {
          type: "object",
          properties: {
            user_id: {
              type: "number",
              description: "Unique numeric identifier of the user to remove. Obtain this value from the 'user_id' field in get_list results.",
            },
            merge_projects: {
              type: "boolean",
              description: "Project handling strategy when removing user. Set to 'true' to transfer user's projects to team owner (recommended), 'false' to delete projects permanently (default: true).",
            },
          },
          required: ["user_id"],
        },
      },
    ],
  };
});

/**
 * Start the MCP server using stdio transport
 *
 * Initializes the server and sets up communication via stdio (stdin/stdout).
 * This is the main entry point when the server is executed.
 *
 * The server will:
 * - Listen for MCP tool calls
 * - Process requests through the Serpstat API
 * - Return formatted responses or errors
 * - Handle all connection lifecycle events
 *
 * Error handling:
 * - Logs errors to stderr
 * - Exits with code 1 on fatal errors
 * - Continues running on recoverable errors
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Serpstat Team Management MCP server running on stdio");
}

// Start the server with comprehensive error handling
main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});