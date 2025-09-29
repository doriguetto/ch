/// <reference types="vitest" />
import { defineConfig, mergeConfig } from 'vite';
import path from 'path';
import { globSync } from 'glob';
import { PreRenderedAsset } from 'rollup';
import baseConfig from './vite.config';

const inputFiles = globSync('src/styles/*.scss');

const input = Object.fromEntries(
  inputFiles.map((filePath: string) => {
    const lastSlashIndex = filePath.lastIndexOf('/');
    const dotTsIndex = filePath.indexOf('.scss');
    const filename = filePath.substring(lastSlashIndex + 1, dotTsIndex);
    return [filename, path.resolve(__dirname, filePath)];
  }),
);

export default mergeConfig(baseConfig, defineConfig({
  build: {
    sourcemap: true,
    minify: true,
    cssMinify: true,
    rollupOptions: {
      input,
      preserveEntrySignatures: 'strict',
      output: [{
        assetFileNames: (assetInfo: PreRenderedAsset) => {
          if (assetInfo.originalFileNames.some((file) => /\.(scss)$/.test(file))) {
            return '[name].css';
          }
          if (assetInfo.originalFileNames.some((file) => /\.(woff?|ttf|eot)$/.test(file))) {
            return 'fonts/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        format: 'es',
        dir: 'styles',
      }],
    },
  },
}));
