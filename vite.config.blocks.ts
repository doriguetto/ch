/// <reference types="vitest" />
import { defineConfig, mergeConfig } from 'vite';
import path from 'path';
import { globSync } from 'glob';
import { fileURLToPath } from 'url';
import { PreRenderedAsset } from 'rollup';
import baseConfig from './vite.config';
import svgr from "vite-plugin-svgr";

const inputFiles = globSync('src/**/*.{ts,js,tsx}', {
  ignore: ['src/**/*.test.ts'],
});

const edsFileDependencies = globSync('scripts/*.js')
  .map((filePath: string) => fileURLToPath(
    new URL(
      filePath,
      import.meta.url,
    ),
  ));

const input = Object.fromEntries(
  inputFiles.map((filePath: string) => {
    const lastSlashIndex = filePath.lastIndexOf('/');
    const dotTsIndex = filePath.indexOf('.ts');
    const filename = filePath.substring(lastSlashIndex + 1, dotTsIndex);
    return [filename, path.resolve(__dirname, filePath)];
  }),
);

export default mergeConfig(baseConfig, defineConfig({
    plugins: [
        svgr(),
    ],
    base: "/blocks/", // 👈 ensures both dev + prod URLs start with /blocks/
    build: {
    sourcemap: !process.env.BUILD_PRODUCTION,
    minify: !!process.env.BUILD_PRODUCTION,
    cssMinify: !!process.env.BUILD_PRODUCTION,
    rollupOptions: {
      input,
      external: edsFileDependencies,
      preserveEntrySignatures: 'strict',
      output: [{
        entryFileNames: '[name]/[name].js',
        assetFileNames: (assetInfo: PreRenderedAsset) => {
          if (/\.(css)$/.test(assetInfo.names.pop() ?? '')) {
            return '[name]/[name].css';
          }
          if (/\.(woff2?|ttf|otf|eot|svg)$/.test(assetInfo.names.pop() ?? '')) {
            return '../fonts/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        chunkFileNames: '__chunks__/[name].[hash].js',
        format: 'es',
        dir: 'blocks',
      }],
    },
  },
}));
