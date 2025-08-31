/**
 * Serpstat Domain Analysis MCP Server Entry Point
 * ==============================================
 *
 * Main entry point that imports and starts the MCP server.
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-08-31
 *
 * This file serves as the primary entry point for the Serpstat Domain Analysis MCP server.
 * It imports the server instance from server.ts and exports it for potential testing
 * or extension purposes. The server initialization and connection to the transport
 * layer is handled in server.ts.
 *
 * The server provides access to 14 different domain analysis methods through the
 * Model Context Protocol (MCP) framework, including domain information retrieval,
 * keyword analysis, competitor analysis, and data export capabilities.
 *
 * @module serpstat-domain-analysis
 * @requires ./server
 */

import { server } from './server.js';

// Export server for potential testing or extension
export { server };

// The server will be started in server.ts
console.log('Serpstat Domain Analysis MCP server entry point loaded');