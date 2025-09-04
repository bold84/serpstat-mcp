import { build } from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';

build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  platform: 'node',
  outfile: './build/index.js',
  format: 'esm',
  sourcemap: true,
  plugins: [nodeExternalsPlugin()],
  banner: {
    js: '#!/usr/bin/env node',
  },
}).catch(() => process.exit(1));