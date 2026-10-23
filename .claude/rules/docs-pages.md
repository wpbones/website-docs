---
paths:
  - "content/**/*.mdx"
  - "app/sitemap.ts"
---

# Docs pages

- The frontmatter `description` says what the page covers, with its
  concrete names; without one a page falls back to the shared
  `config.metadata.description`. A page that exports `metadata`
  (`release-notes.mdx`) puts `description` inside that object: Nextra
  refuses frontmatter and `export const metadata` in one file.
- The single `#` heading is the page's `<h1>` and, without a frontmatter
  `title`, its `<title>`. A Mantine `<Title order={1}>` in MDX is an `<h1>`
  too.
- `app/sitemap.ts` lists `/` and every docs route from the same Nextra
  helper as the docs page, so a new page needs no sitemap edit.
- `<MascotNote>` is registered in `mdx-components.ts`.
