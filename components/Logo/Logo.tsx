/**
 * The WP Bones wordmark in the navbar: served by this site (public/
 * wpbones-wordmark.png, 320x108, through ImageOptim) rather than hotlinked
 * from a GitHub attachment, so every page's first paint does not wait on a
 * cross-origin redirect. Width and height given, so it takes its place
 * before it loads.
 */
export function Logo() {
  return <img width={128} height={43} src="/wpbones-wordmark.png" alt="WP Bones" />;
}
