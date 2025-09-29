/// <reference types="vitest" />
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  test: {
    globals: true, // allows the use of global test functions like `describe`, `it`, etc.
    environment: 'jsdom', // emulates the browser for React testing
    setupFiles: './setupTests.ts', // optional for global test setup
    coverage: {
      thresholds: {
        lines: 80,
      },
      reporter: ['text', 'html', 'lcov'], // You can specify other formats like 'json' or 'clover' if needed.
      include: ['src/**/*.{ts,js}'], // Include the source files for coverage.
      exclude: ['src/**/*.test.{ts,js}', 'setupTests.ts'], // Exclude test files or setup files from coverage.
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
