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
