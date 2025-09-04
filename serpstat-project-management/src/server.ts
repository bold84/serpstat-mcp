/**
 * Serpstat Project Management MCP Server
 * ======================================
 *
 * This is the main MCP server implementation for the Serpstat Project Management API.
 * It provides 3 tools for project creation, deletion, and listing.
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
import { makeSerpstatRequest } from 'serpstat-shared';
import { API_METHODS } from './constants.js';
import {
  CreateProjectSchema,
  DeleteProjectSchema,
  GetProjectsSchema,
} from './utils/validation.js';

// Create MCP server instance
const server = new Server(
  {
    name: 'serpstat-project-management',
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
    name: 'createProject',
    description: 'Create a new Serpstat project for SEO analysis. Specify domain and project name, with optional group and type settings. (Consumes 1 project credit)',
    inputSchema: {
      type: 'object',
      properties: {
        domain: {
          type: 'string',
          description: 'Domain name for the project (without protocol, e.g., example.com)'
        },
        name: {
          type: 'string',
          description: 'Name for the project'
        },
        group: {
          type: 'string',
          description: 'Project group name (Default: "Default group")'
        },
        type: {
          type: 'string',
          enum: ['owner', 'reader'],
          description: 'Project type - "owner" for full access, "reader" for team projects (Default: "owner")'
        }
      },
      required: ['domain', 'name']
    },
  },
  {
    name: 'deleteProject',
    description: 'Delete an existing Serpstat project and all associated data including audit history, rank tracking, and configurations. This action cannot be undone. (Consumes 1 project credit)',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'number',
          description: 'ID of the project to delete (permanent action)'
        }
      },
      required: ['project_id']
    },
  },
  {
    name: 'getProjects',
    description: 'Retrieve a list of all your Serpstat projects with metadata including project ID, name, domain, creation date, group, and type. Perfect for project management and overview. (No API credits consumed)',
    inputSchema: {
      type: 'object',
      properties: {
        page: {
          type: 'number',
          description: 'Page number in the projects list (Default: 1)'
        },
        size: {
          type: 'number',
          enum: [20, 50, 100, 200, 500],
          description: 'Number of results per page (Default: 100)'
        }
      },
      required: []
    },
  },
];

// Tool handler functions
async function handleCreateProject(args: unknown) {
  const validatedArgs = CreateProjectSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.createProject, {
    domain: validatedArgs.domain,
    name: validatedArgs.name,
    ...(validatedArgs.group && validatedArgs.group !== 'Default group' && { group: validatedArgs.group }),
    ...(validatedArgs.type && validatedArgs.type !== 'owner' && { type: validatedArgs.type }),
  });
}

async function handleDeleteProject(args: unknown) {
  const validatedArgs = DeleteProjectSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.deleteProject, {
    project_id: validatedArgs.project_id,
  });
}

async function handleGetProjects(args: unknown) {
  const validatedArgs = GetProjectsSchema.parse(args);
  return await makeSerpstatRequest(API_METHODS.getProjects, {
    ...(validatedArgs.page && validatedArgs.page !== 1 && { page: validatedArgs.page }),
    ...(validatedArgs.size && validatedArgs.size !== 100 && { size: validatedArgs.size }),
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
      case 'createProject':
        result = await handleCreateProject(args);
        break;
      case 'deleteProject':
        result = await handleDeleteProject(args);
        break;
      case 'getProjects':
        result = await handleGetProjects(args);
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
  console.error('Serpstat Project Management MCP server started');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});

export { server };