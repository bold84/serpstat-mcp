/**
 * Serpstat Domain Analysis MCP Server Entry Point
 * ==============================================
 *
 * Main entry point that imports and starts the MCP server.
 */

import { server } from './server.js';

// Export server for potential testing or extension
export { server };

// The server will be started in server.ts
console.log('Serpstat Domain Analysis MCP server entry point loaded');