/**
 * Serpstat Rank Tracker MCP Server Entry Point
 * ==============================================
 *
 * This is the main entry point for the Serpstat Rank Tracker MCP server.
 * It imports and exports the server instance for MCP protocol communication.
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-09-03
 */

/**
 * Serpstat Rank Tracker MCP Server Entry Point
 * 
 * This file serves as the main entry point for the Rank Tracker MCP server.
 * It exports the server instance which handles MCP protocol communication
 * via stdio transport for rank tracking functionality.
 */

import { server } from './server.js';

// Export the server instance for MCP protocol communication
export { server };

// For direct execution (when run as a standalone script)
if (import.meta.url === `file://${process.argv[1]}`) {
  console.error('Serpstat Rank Tracker MCP server entry point loaded');
  
  // The actual server startup is handled in server.ts
  // This file exists primarily for module exports and build consistency
}