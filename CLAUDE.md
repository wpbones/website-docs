# CLAUDE.md

Documentation site for the **WP Bones** WordPress framework, live at
https://wpbones.com/: Next.js 16 App Router, MDX in `content/` compiled by
`@next/mdx` on the docs engine of `next-app-mantine-docs-template` (no Nextra
since 2026-11-26), navigation in `_meta` files, served under `/docs`,
Mantine 9, TypeScript 6. Scripts are in `package.json`; `yarn test` is the
full suite (typegen, oxfmt check, lint, typecheck, jest).

- Yarn 4 only: never npm or pnpm. Node from `.nvmrc`.
- Light only, no dark/light switch: keep `forceColorScheme="light"` on
  `MantineProvider` and `ColorSchemeScript` (`app/layout.tsx`) and
  `docs.colorSchemeControl: false` in `config/index.ts`.
- The home page is `app/page.tsx` (ISR, `revalidate = 86400`).
- Never set `cssChunking: 'graph'` while Mantine's CSS is unlayered: in
  production it ordered Mantine's core stylesheet after the component
  modules. Check CSS order with `getComputedStyle` (chat launcher, a tab
  pill, a GitHub button) on a production build, never `next dev`.
- Infinite animations move only `transform` and `opacity`. A card that
  lifts on hover is wrapped in its reveal item, never given its props.
- No made-up figures: without a GitHub star count the hero shows no badge.
  "New in WP Bones 2" never claims coverage, "tested on WordPress" or
  "audited/secure".
- Each docs page has its own frontmatter `description` (110–155 chars) and
  exactly one `#` heading.

## The docs engine

Since 2026-11-26 the site runs on the docs engine of
`next-app-mantine-docs-template` (the sibling in the Mantine Extensions
workspace, v1.0.6 plus its PR gfazioli/next-app-mantine-docs-template#9 until
that is merged), copied in, not installed: removing `nextra` and
`nextra-theme-docs` also removed `zod`. The same engine runs the Mantine
Extensions Hub and Amiga Assembly Library; the template's `CLAUDE.md`
describes how it works.

- **Copied from the template, kept byte for byte** (check with `diff -r`
  against the template): `lib/docs/`, `lib/mdx/`, `components/shell/` (all
  but `DocsFooter`), `components/docs/{Callout,Cards,CodeBlock,FileTree,
  ImageZoom,MdxElements,Steps,Tabs}` and `components/docs/index.ts`,
  `components/ColorSchemeControl/`, `components/Link/`, `mdx-components.tsx`,
  `app/docs/[[...slug]]/page.tsx`, `app/not-found.tsx`,
  `app/api/search/` (`route.server.ts`, `page-url.ts`), `scripts/pagefind-site.mjs`,
  `next.config.mjs`, `jest.config.cjs`, `jest.setup.cjs`. A fix there belongs
  in the template first; then copy it here, and into the Hub and Amiga, in the
  same work. Never edit them for this site alone.
- **The site's own**: `config/index.ts` (`docs.sidebar.toggle: 'sidebar'`,
  `docs.colorSchemeControl: false`, `docs.editUrlBase: ''`: no "edit this page"
  link, as on Nextra; `links.github` is the framework's repository, the Discord
  link and the sponsors profile), `components/MantineNavBar/` (the template's
  header with the WP Bones logo, the sponsor and coffee buttons, no scheme
  switch), `components/Footer/` (one footer for every page, docs included, as
  on Nextra: `app/layout.tsx` hands it to the shell as both `docsFooter` and
  `siteFooter`), `components/ReleaseNotes/` (the template's, plus the "full
  changelog" button), `app/layout.tsx` (forced light, the release banner,
  `--site-banner-background: bones-8` in `app/global.css`), `app/page.tsx`,
  `app/sitemap.ts`, `app/api/{boilerplates,github-releases,version}/`, `theme.ts`,
  `theme/global.css`, the home page and the mascot.
- **Pages import** `Callout`, `Cards`, `FileTree`, `Steps`, `Tabs`,
  `ImageZoom` from `@/components/docs`, with Nextra's props, and
  `MascotNote` from `@/components/Mascot/MascotNote` (the engine's
  `mdx-components.tsx` knows no site component). A Markdown image next to the
  page (`![](./photo.png)`) is imported by the engine; text gets curly quotes.
- **No `<main>` in a page**: the shell's `AppShell.Main` is the page's `main`.
- **Sidebar, `_meta` files**: in Nextra's format, read by `lib/docs/content.ts`;
  `legal` and `privacy` are `display: 'hidden'`, served and in the sitemap, out
  of the sidebar.
- **Release notes** (`/docs/release-notes`): the page fetches
  `/api/github-releases` in the browser; its table of contents is built from
  the fetched releases (`data-toc-entry`), not by a build-time fetch.
- **`next dev`** no longer rewrites `CLAUDE.md` (`agentRules: false` in the
  engine's `next.config.mjs`); it still rewrites `next-env.d.ts`: restore it.

Home page, motion and mascot detail: `.claude/rules/home-and-motion.md`;
docs pages: `.claude/rules/docs-pages.md` (both load with matching files).
The 2026-10 redesign and SEO audit, with their measurements, and the
2026-11-26 move off Nextra: `.claude/reference/site-history.md`.
