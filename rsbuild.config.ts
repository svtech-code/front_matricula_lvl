import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact()],

  source: {
    entry: {
      index: './src/app/main.tsx',
    },
  },

  resolve: {
    alias: { '@': './src', '@/public': './public' },
    extensions: ['.js', '.ts', '.tsx', '.css', '.html'],
  },

  html: { template: './static/index.html' },

  output: {
    filenameHash: true,
    minify: {
      js: true,
      css: true,
    },
    sourceMap: {
      js: 'source-map',
      css: true,
    },
  },

  performance: {
    chunkSplit: {
      strategy: 'split-by-module',
    },
  },
});
