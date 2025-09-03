/**
 * Serpstat Site Audit MCP Server Entry Point
 * ==========================================
 *
 * Main entry point that imports and starts the MCP server.
 *
 * Author: Benjamin Oldenburg
 * Date: 2025-09-03
 *
 * This file serves as the primary entry point for the Serpstat Site Audit MCP server.
 * It imports the server instance from server.ts and exports it for potential testing
 * or extension purposes. The server initialization and connection to the transport
 * layer is handled in server.ts.
 *
 * The server provides access to 15 different site audit methods through the
 * Model Context Protocol (MCP) framework, including automated website scanning,
 * technical SEO error detection, audit configuration, reporting, and export capabilities.
 *
 * @module serpstat-audit
 * @requires ./server
 */

import { server } from './server.js';

// Export server for potential testing or extension
export { server };

// The server will be started in server.ts
console.log('Serpstat Site Audit MCP server entry point loaded');