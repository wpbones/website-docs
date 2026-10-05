import { createElement } from 'react';
import { HomePage } from '@/components/Home/HomePage';

/**
 * The home page. A `.ts` file, not `.tsx`, on purpose: Nextra's page map,
 * which the root layout reads on every page, imports each app page it finds
 * as a namespace to read its metadata, and its glob is
 * `page.{js,jsx,jsx,tsx,md,mdx}` (nextra/dist/server/page-map/
 * find-meta-and-page-file-paths.js, 4.6.1). Found, this file put every
 * stylesheet of the home page into the layout's CSS, so every docs page
 * blocked its first paint on the hero's, the feature tour's and the mascot's
 * styles (measured 2026-10-05; a dynamic import did not help). If a Nextra
 * upgrade adds `ts` to that glob, nothing breaks: the docs pages just load
 * the home page's CSS again, which a look at their <link> tags shows.
 */
export default function Page() {
  return createElement(HomePage);
}
