/**
 * Esbuild Configuration for Serpstat Domain Analysis MCP Server
 * ===========================================================
 *
 * Build configuration using esbuild for fast TypeScript compilation
 * and bundling of the MCP server.
 */

import { build } from 'esbuild';
import { resolve } from 'path';

const isProduction = process.argv.includes('--production');

const buildOptions = {
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'esm',
  sourcemap: isProduction ? false : 'inline',
  minify: isProduction,
  external: ['@modelcontextprotocol/sdk', 'axios'],
  define: {
    'process.env.NODE_ENV': isProduction ? '"production"' : '"development"'
  },
  banner: {
    js: '#!/usr/bin/env node\n'
  }
};

// Build main server
build({
  ...buildOptions,
  entryPoints: [resolve('src/index.ts')],
  outfile: 'build/index.js'
}).catch(() => process.exit(1));

// Build API client and utils
build({
  ...buildOptions,
  entryPoints: [resolve('src/utils/api-client.ts')],
  outfile: 'build/utils/api-client.js'
}).catch(() => process.exit(1));

build({
  ...buildOptions,
  entryPoints: [resolve('src/utils/validation.ts')],
  outfile: 'build/utils/validation.js'
}).catch(() => process.exit(1));

build({
  ...buildOptions,
  entryPoints: [resolve('src/constants.ts')],
  outfile: 'build/utils/constants.js'
}).catch(() => process.exit(1));