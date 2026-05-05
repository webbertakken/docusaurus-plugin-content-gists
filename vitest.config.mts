import { defineConfig } from 'vitest/config'

// Pure-JS unit tests for the helper functions in `src/core/utils/`. The
// docusaurus theme components are not unit-tested here because they require
// the docusaurus runtime; their build is exercised by `yarn build` in CI.
export default defineConfig({
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/core/utils/**/*.ts'],
      exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    },
  },
})
