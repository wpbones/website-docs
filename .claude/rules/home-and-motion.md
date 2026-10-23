---
paths:
  - "app/page.ts"
  - "app/layout.tsx"
  - "components/Home/**"
  - "components/Motion/**"
  - "components/Mascot/**"
  - "components/Footer/**"
  - "theme.ts"
  - "theme/**"
  - "next.config.mjs"
  - "scripts/shot.mjs"
---

# Home page, look and motion

- Palette from `components/wpbones-logo.png`: sky `#5bb6dc`, steel
  `#4f93b0`, white. `theme.ts` has the `bones` ladder (4 is the sky; filled
  buttons 6, white on it 4.62:1; links 7) and greys from the logo's navy
  (`dimmed` 5.50:1). Page tokens are `--wpb-*` on `:root` in
  `theme/global.css`; Nextra's primary is set once, as HSL, on its `Head`.
- The home page is server components (`components/Home/`) with client
  islands only where something moves or reacts (`RevealScope`/`Reveal`,
  `ScrollNumber`, `FeatureTabs`, `InstallLine`, `ScrollGuide`).
  `components/Motion/reveal-props.ts` must stay without `'use client'`: a
  client module's function reaches a server component as an uncallable
  reference. `revealItem(variant, delay, className)` merges the class,
  since a spread's `className` replaces the element's own.
- Feature tour snippets (`FeatureTour/features.ts`) are real: copied from
  the boilerplates or docs, trimmed only by removing lines (`// ...`), with
  source and line numbers and the `php bones` command that scaffolds one of
  the files. shiki highlights them at build time (`highlight.ts`); every
  panel is in the served HTML (inactive ones `hidden`).
- `PluginStack` is a CSS scroll-driven animation (`animation-timeline:
  scroll(root)`), no script; unsupported or under Reduce Motion the layers
  stand apart. Two elements per layer: the scroll moves `.layer`, the
  entrance drops `.slab`.
- Motion is findergit.app's: never hand-edit the springs between
  `springs:begin`/`springs:end` in `theme/global.css`; `springs.test.ts`
  holds them equal to `springs.ts`.
- The mascot's grids in `components/Mascot/sprite.ts` are the drawing
  (`sprite.test.ts` holds its colours to the tokens). It appears on the
  hero's stack, in the statement, on the feature tour's window (names the
  open tab; a click opens the next), over the closing call, and in the docs
  as `<MascotNote>`. `ScrollGuide` rides in the corner once the hero is
  behind, never while another `data-mascot-spot` drawing is on screen; its
  tips are the tour's own lines, and on the footer's `#sponsors` card it
  says that card's first sentence (`Footer.test.tsx`).
- Hero badges (`components/Home/Badges.tsx`): stars fetched on the server
  (`github-stars.ts`), so the home is ISR (`revalidate = 86400`; the build
  log shows `/` with `1d`). Build locally with `GITHUB_TOKEN=$(gh auth
  token)` or the anonymous rate limit decides. The Product Hunt badge is
  the featured 2024 launch's (post 476081), not the 2026 relaunch's.
- `WhatsNew.tsx` figures are measured and labelled with their tag. A
  release that changes the test suite or adds a card-worthy feature updates
  `RELEASES`, `TESTS`, `ASSERTIONS`, `GROWTH` and the cards in the same docs
  cascade.
- Home code is compacted to one-letter classes (`highlight.ts`) and the
  sprite is one path per colour (`sprite.ts` `paths`): both are served
  twice, in the HTML and the RSC payload.
- Moving Mantine to `styles.layer.css` would make chunk order irrelevant,
  but would put Nextra's preflight above Mantine: settle that first.
- `scripts/shot.mjs` films a page through Chrome DevTools: `--at`
  fractions, `--frames N --every MS`, `--eval`, `--no-wake` (without it the
  page scrolls once first, firing every one-shot reveal). It stores `dark`
  and emulates a dark OS on purpose, the worst case.
- Two React "unique key" warnings from Nextra's `ConfigProvider` in
  `next dev` are upstream, present on `main` too.
