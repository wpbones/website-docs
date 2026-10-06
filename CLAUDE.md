# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Documentation website for the **WP Bones** WordPress framework, live at https://wpbones.com/. Built with Next.js 16, Nextra 4, Mantine 9, and TypeScript 6. Content is authored in MDX.

## Commands

```bash
yarn dev              # Dev server on localhost:3000
yarn build            # Production build + Pagefind search index
yarn test             # Full suite: typegen → oxfmt-check → lint → typecheck → jest
yarn jest             # Run Jest tests only
yarn jest:watch       # Jest in watch mode
yarn lint             # oxlint + Stylelint
yarn typecheck        # TypeScript type checking
yarn format:write     # Auto-format code (oxfmt)
yarn format:test      # Check formatting (oxfmt)
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

## The home page and the site's look (2026-10-05 redesign)

Asked for on 2026-10-05: no dark/light switch, light only with a palette of its own (as findergit.app
dropped its switch, there for dark); a home page laid out after laravel.com without copying it, the
tabbed "framework" section above all; findergit.app's animated mascot and scroll morphs; its footer,
keeping the sponsor avatars (WP Bones has no sponsors yet, and its profile is `github.com/sponsors/wpbones`,
not the author's personal one).

- **Light only, forced in both libraries.** `ColorSchemeScript` and `MantineProvider` take
  `forceColorScheme="light"`; Nextra's `Layout` takes `darkMode={false}` and
  `nextThemes={{ defaultTheme: 'light', forcedTheme: 'light' }}`. A visitor with `dark` stored from the
  old switch still gets light (`scripts/shot.mjs` writes `dark` to storage and emulates a dark OS on
  purpose, so every capture is that worst case).
- **The palette is the logo's**, sampled from `components/wpbones-logo.png`: sky `#5bb6dc`, steel
  `#4f93b0`, white. `theme.ts` has the `bones` ladder (shade 4 is the sky; filled buttons use 6, white on
  it 4.62:1; links use 7) and greys cut from the logo's navy (`dimmed` 5.50:1). The page tokens are
  `--wpb-*` on `:root` in `theme/global.css`; Nextra's primary is set once, as HSL, on its `Head`.
- **The home page is server components** (`components/Home/`), with client islands only where something
  moves or reacts: `RevealScope`/`Reveal`, `ScrollNumber`, `FeatureTabs`, `InstallLine`, `ScrollGuide`.
  `revealItem`/`revealScope` live in `components/Motion/reveal-props.ts`, a module WITHOUT `'use client'`:
  a function exported from a client module reaches a server component as a reference it cannot call.
  `revealItem(variant, delay, className)` merges the class, because a spread's `className` replaces the
  element's own.
- **The feature tour's snippets are real** (`components/Home/FeatureTour/features.ts`): copied from the
  boilerplates or the docs, trimmed only by removing lines (`// ...`), source and line numbers beside
  each, with the `php bones` command that scaffolds one of the files (CLI line cited). Code is
  highlighted at build time by shiki with a theme in the site's palette (`highlight.ts`); the client gets
  HTML. Every panel is in the served HTML (inactive ones `hidden`), so a crawler gets every snippet.
- **The hero's plugin stack opens as the page scrolls** (`PluginStack`): a CSS scroll-driven animation
  (`animation-timeline: scroll(root)`), no script; where unsupported or under Reduce Motion the layers
  simply stand apart. Two elements per layer, because the scroll moves `.layer` and the entrance drops
  `.slab`.
- **Motion is findergit.app's** (`components/Motion`, its springs generated into `theme/global.css`
  between `springs:begin`/`springs:end`, `springs.test.ts` holds them equal). A card that lifts on hover
  is wrapped in its reveal item, never given the props: two transforms on one element fight.
- **The mascot is the logo's bone come alive** (`components/Mascot/sprite.ts`, the grids ARE the
  drawing; `sprite.test.ts` holds its colours to the tokens). It appears on the hero's stack, in the
  statement, on the feature tour's window (it names the open tab; a click opens the next), over the
  closing call, and in the docs (`<MascotNote>`, registered in `mdx-components.ts`, used on four pages).
  `ScrollGuide` rides in the corner once the hero is behind the reader, but never while another drawing
  marked `data-mascot-spot` is on screen; it gives the tour's own lines as tips and stands on the footer's
  `#sponsors` card saying the card's own first sentence (`Footer.test.tsx` holds the two equal).
- **An infinite animation moves only `transform` and `opacity`**: the NEW badge's pulse animated
  `box-shadow` and repainted forever; its ring is a pseudo-element now.
- **To see it**: `scripts/shot.mjs` (from findergit-website) films a page through Chrome's DevTools:
  `--at` fractions, `--frames N --every MS`, `--eval`, `--no-wake` (without it the page is scrolled once
  first, which fires every one-shot reveal before the first frame). A `next dev` rewrites `CLAUDE.md` and
  `next-env.d.ts`: restore them before committing.
- **"New in WP Bones 2" (`components/Home/WhatsNew.tsx`) carries measured figures, each labelled with
  its tag**: 14 releases (v2.0.0 to v2.1.0), 174 tests and 470 assertions at v2.1.0 (PHPUnit run at the
  tag and on CI, all four PHP jobs), the growth 67 → 89 → 148 → 174 by `phpunit --list-tests` at v2.0.4,
  v2.0.6, v2.0.10, v2.1.0. A release that changes the suite or adds a feature worth a card updates
  `RELEASES`, `TESTS`, `ASSERTIONS`, `GROWTH` and the cards in the same docs cascade. Never on it: coverage
  (CI runs with `coverage: none`), "tested on WordPress" (no integration suite exists), "audited/secure".
- **The home page is `app/page.ts`, not `.tsx`, and that is load-bearing.** Nextra's page map, which the
  root layout reads on every page, imports every app page it finds as a namespace (for its metadata),
  and its glob is `page.{js,jsx,jsx,tsx,md,mdx}`. Found, the home page put all its stylesheets into the
  layout's CSS and every docs page blocked its first paint on them (measured: docs LCP 2.0 s on `main`,
  2.2 s with the home's CSS, 2.0 s again without). A dynamic `import()` did not help. Hence also no
  `index` key in `app/_meta.tsx`: it refers to a page the map no longer sees, and fails the build.
  The default CSS chunking still merges the home's CSS into the shared chunks, so the docs load it.
- **Never `cssChunking: 'graph'` while Mantine's CSS is unlayered.** It kept the home's CSS off the docs,
  and it shipped (#75), but it ORDERS the chunks by its own cost model: Mantine's core stylesheet came
  after the component modules, and every module rule that overrides a Mantine component at the same
  specificity lost. In production the chat launcher was `position: relative` at the foot of the page,
  20 px off its left edge, instead of fixed bottom right, and the docs' GitHub buttons had Mantine's
  border, not ours (measured with `getComputedStyle` on wpbones.com, then reverted). Moving Mantine to
  `styles.layer.css` would make the order irrelevant, but the layer order would then put Nextra's
  preflight above Mantine: settle that first, and check `getComputedStyle` of the launcher, a tab pill
  and a GitHub button on a production build, not in `next dev`, which does not chunk.
- **Measured before/after (2026-10-05, local `next start`, Lighthouse mobile, 4 passes home, 2 docs)**:
  home perf 95–96 → 92–93, LCP 1.73–2.04 → 2.11–2.15 s, TBT ~160 → ~225 ms, CLS 0.041 → 0.002, 1271 →
  965 KiB; docs LCP 2.0 → 2.0 s with `graph` (2.2 s without it, the home's CSS on the docs again, ~9 KB
  gzip: the price of the revert above); at rest 716 → 80 ms of main-thread work and 601 → 54 style recalcs.
  The home's code is compacted to one-letter classes (`highlight.ts`) and the sprite is one path per
  colour (`sprite.ts`, `paths`), because both are served twice, in the HTML and the RSC payload.
- **Not ours, measured on `main` too**: two React "unique key" warnings from Nextra's `ConfigProvider`
  in `next dev`, with or without banner, navbar and footer.

## Tooling

- **Formatter**: oxfmt (`.oxfmtrc.json`) — 100 char width, single quotes, trailing comma es5, with import sorting.
- **Linter**: oxlint + stylelint
- **TypeScript**: 6.x
- **Package Manager**: Yarn 4 (Berry). Do not use npm or pnpm.
- Path alias: `@/*` maps to project root (e.g., `@/components`, `@/config`).
