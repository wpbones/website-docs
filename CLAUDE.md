# CLAUDE.md

Documentation site for the **WP Bones** WordPress framework, live at
https://wpbones.com/: Next.js 16 App Router, Nextra 4 (MDX in `content/`,
navigation in `_meta.ts`, served under `/docs`), Mantine 9, TypeScript 6.
Scripts are in `package.json`; `yarn test` is the full suite (typegen,
oxfmt check, lint, typecheck, jest).

- Yarn 4 only: never npm or pnpm. Node from `.nvmrc`.
- `next dev` rewrites `CLAUDE.md` and `next-env.d.ts`: restore both before
  committing.
- Light only, no dark/light switch: keep the forced light scheme in both
  Mantine and Nextra (`app/layout.tsx`).
- The home page is `app/page.ts`, never `.tsx`, and `app/_meta.tsx` has no
  `index` key: Nextra's page map imports every `page.tsx` it finds, which
  put the home's CSS on every docs page.
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

Home page, motion and mascot detail: `.claude/rules/home-and-motion.md`;
docs pages: `.claude/rules/docs-pages.md` (both load with matching files).
The 2026-10 redesign and SEO audit, with their measurements:
`.claude/reference/site-history.md`.
