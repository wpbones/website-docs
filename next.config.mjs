import bundleAnalyzer from '@next/bundle-analyzer';
import nextra from 'nextra';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: false
  },
  contentDirBasePath: '/docs',
})

export default withNextra(
  withBundleAnalyzer({
    reactStrictMode: false,
    cleanDistDir: true,
    experimental: {
      optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
      // Turbopack's default chunking merged the home page's CSS into the
      // chunks every docs page loads; the graph strategy keeps it on the home
      // page (measured 2026-10-05: the docs went from 3 files with the home's
      // styles to 4 without). Graph is Turbopack-only and Next rejects it
      // where TURBOPACK is unset -- Jest's next/jest, `next typegen` -- so it
      // is set only where Turbopack is the bundler.
      ...(process.env.TURBOPACK ? { cssChunking: 'graph' } : {}),
    },
    turbopack: {
      rules: {
        '*.svg': {
          loaders: ['turbopack-inline-svg-loader'],
          condition: {
            content: /^[\s\S]{0,4000}$/, // <-- Inline SVGs smaller than ~4Kb (since Next.js v16)
          },
          as: '*.js',
        },
      },
    },
  }));
