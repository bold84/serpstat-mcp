/**
 * Serpstat Team Management MCP Server Entry Point
 * ==============================================
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-08-31
 *
 * Main entry point that imports and starts the MCP server for Serpstat Team Management.
 * This module serves as the primary entry point for the Serpstat Team Management MCP server,
 * importing the server instance and exporting it for potential testing or extension.
 *
 * This module follows the established pattern of the serpstat-domain-analysis project,
 * providing a clean separation between the entry point and the server implementation.
 * The actual server initialization and startup logic is handled in the server.ts module.
 *
 * Key Features:
 * - Clean separation of concerns between entry point and server implementation
 * - Export of server instance for testing and extension purposes
 * - Consistent logging patterns across the serpstat MCP servers
 * - Integration with the shared serpstat library for team management functionality
 *
 * @module serpstat-team-management
 * @requires ./server
 */

import { server } from './server.js';

// Export server for potential testing or extension
export { server };

// The server will be started in server.ts
console.log('Serpstat Team Management MCP server entry point loaded');