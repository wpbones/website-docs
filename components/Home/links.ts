/**
 * The home page's outward links, in one place: the same URLs the footer and
 * the docs already use (components/Footer/resources.ts, Boilerplate/DemoButton).
 */

/** The base boilerplate running in WordPress Playground, from this site's own blueprint. */
export const PLAYGROUND_URL =
  'https://playground.wordpress.net/?blueprint-url=https://www.wpbones.com/wpkirk-boilerplate.json';

/** A boilerplate's blueprint in Playground; `base` is WPKirk-Boilerplate itself. */
export function playgroundFor(slug: string) {
  const json = slug === 'base' ? '' : `-${slug}`;
  return `https://playground.wordpress.net/?blueprint-url=https://www.wpbones.com/wpkirk${json}-boilerplate.json`;
}

/** WP Bones' own GitHub Sponsors profile, not the author's personal one. */
export const SPONSORS_URL = 'https://github.com/sponsors/wpbones';

/** The framework's repository, the one whose stars the hero counts. */
export const GITHUB_URL = 'https://github.com/wpbones/WPBones';

/**
 * WP Bones on Product Hunt, and the badge of its first launch (post 476081,
 * 2024-08-05), the one Product Hunt featured: the 2026-10-07 relaunch was not,
 * and its badge reads "Find us on" instead. The parameters are the ones
 * Product Hunt's embed code gives; the theme is light, as the site is.
 */
export const PRODUCT_HUNT_URL =
  'https://www.producthunt.com/products/wp-bones?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-wp-bones';
export const PRODUCT_HUNT_BADGE =
  'https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=476081&theme=light';
