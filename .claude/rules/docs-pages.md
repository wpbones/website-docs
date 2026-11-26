---
paths:
  - "content/**/*.mdx"
  - "app/sitemap.ts"
---

# Docs pages

- The frontmatter `description` says what the page covers, with its
  concrete names; without one a page falls back to the shared
  `config.metadata.description`. A page that exports `metadata`
  (`release-notes.mdx`) puts `description` inside that object: the engine
  takes `metadata.description` first, the frontmatter's second.
- The single `#` heading is the page's `<h1>` and, without a frontmatter
  `title`, its `<title>`. A Mantine `<Title order={1}>` in MDX is an `<h1>`
  too.
- `app/sitemap.ts` lists `/` and every docs route from the same `getDocs()`
  as the docs page, so a new page needs no sitemap edit.
- `<MascotNote>` is imported in the page that uses it
  (`import { MascotNote } from '@/components/Mascot/MascotNote'`):
  `mdx-components.tsx` is the engine's and stays byte for byte the template's.
- Docs components come from `@/components/docs` (`Callout`, `Cards`, `FileTree`,
  `Steps`, `Tabs`, `ImageZoom`), with Nextra's props. An image next to the page
  (`![alt](./photo.png)`) is imported and served by `next/image`; text gets
  curly quotes (`remark-smartypants`), code never.
