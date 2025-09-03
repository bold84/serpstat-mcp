import { build } from 'esbuild';
import { copyFileSync, chmodSync } from 'fs';

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  outfile: 'build/index.js',
  format: 'esm',
  sourcemap: true,
  external: [
    'axios',
    'zod',
    'serpstat-shared',
    '@modelcontextprotocol/sdk'
  ],
  banner: {
    js: `
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
`
  }
}).then(() => {
  // Make the output file executable
  chmodSync('build/index.js', '755');
  console.log('Build completed successfully');
}).catch((error) => {
  console.error('Build failed:', error);
  process.exit(1);
});