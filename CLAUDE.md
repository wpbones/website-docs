# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Documentation website for the **WP Bones** WordPress framework, live at https://wpbones.com/. Built with Next.js 16, Nextra 4, Mantine 8, and TypeScript. Content is authored in MDX.

## Commands

```bash
yarn dev              # Dev server on localhost:3000
yarn build            # Production build + Pagefind search index
yarn test             # Full suite: typegen → prettier-check → lint → typecheck → jest
yarn jest             # Run Jest tests only
yarn jest:watch       # Jest in watch mode
yarn lint             # ESLint + Stylelint
yarn typecheck        # TypeScript type checking
yarn prettier:write   # Auto-format code
yarn storybook        # Storybook on port 6006
```

Package manager: **Yarn 4** (do not use npm). Node version: see `.nvmrc`.

## Architecture

- **`app/`** - Next.js App Router. Root layout (`layout.tsx`) wires up Nextra, MantineProvider, Google Tag Manager, and Vercel Analytics.
- **`content/`** - All documentation pages as MDX files, organized by topic (core-classes, getting-started, database-orm, etc.). Navigation structure defined via `_meta.ts` files.
- **`components/`** - React components used in both the site chrome (navbar, footer, welcome hero) and embedded in MDX docs.
- **`config/index.ts`** - Central configuration: metadata, GitHub API settings, Nextra layout options, Pagefind search config.
- **`theme.ts`** - Mantine theme customization.
- **`mdx-components.ts`** - MDX component overrides (extends nextra-theme-docs defaults).

### Key integration points

- **Nextra** handles doc routing, search, sidebar, and MDX rendering. Configured in `next.config.mjs` with `contentDirBasePath: '/docs'`.
- **Mantine** is the design system. CSS imports use `.layer.css` for proper cascade. PostCSS is configured with `postcss-preset-mantine`.
- **Pagefind** generates a static search index at build time (`yarn build:pagefind`), served from `public/_pagefind/`.
- Custom Mantine extensions: `@gfazioli/mantine-marquee`, `@gfazioli/mantine-parallax`, `@gfazioli/mantine-text-animate`.

## Conventions

- **Commit messages** use [gitmoji](https://gitmoji.dev/) style (e.g., `🚀 feat:`, `🔧 chore:`, `📦 update`).
- **Prettier** config: 100 char width (70 for `.mdx`), single quotes, trailing comma es5, with import sorting.
- **ESLint** extends Mantine config + TypeScript ESLint recommended.
- Path alias: `@/*` maps to project root (e.g., `@/components`, `@/config`).
