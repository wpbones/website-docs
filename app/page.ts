import type { Metadata } from 'next';
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
/**
 * Rendered again at most once a day, for the hero's GitHub stars
 * (components/Home/github-stars.ts, STARS_REVALIDATE). A literal, because Next
 * reads it without running the module; github-stars.test.ts holds the two
 * equal.
 */
export const revalidate = 86400;

/**
 * The home page's own title and description: without them it took the
 * site-wide defaults, "WP Bones" and the one sentence every docs page also
 * fell back to. The title is absolute, past the "%s | WP Bones" template, and
 * the description is the hero's lead in under 160 characters. Open Graph and
 * Twitter take both from here.
 */
export const metadata: Metadata = {
  title: { absolute: 'WP Bones: WordPress plugins with Laravel-like bones' },
  description:
    'WP Bones is a framework for WordPress plugins: service providers, Blade views, Eloquent models, migrations, and a bones CLI that scaffolds and deploys.',
};

export default function Page() {
  return createElement(HomePage);
}
