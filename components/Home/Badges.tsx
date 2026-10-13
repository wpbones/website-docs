import { IconBrandGithubFilled, IconStarFilled } from '@tabler/icons-react';
import { ScrollNumber } from '@/components/Motion/ScrollNumber';
import { fetchStars, formatStars } from './github-stars';
import { GITHUB_URL, PRODUCT_HUNT_BADGE, PRODUCT_HUNT_URL } from './links';
import classes from './Badges.module.css';

/**
 * The hero's two badges, side by side and the same height: the framework's
 * GitHub stars and its Product Hunt launch.
 *
 * The stars are counted on the server (github-stars.ts), so the number is in
 * the served HTML, for a crawler too, and rolls up as the hero lands
 * (ScrollNumber), after the headline's entrance. Product Hunt's badge is
 * Product Hunt's own image, as its embed code gives it, so its upvotes are
 * always current; it is the 2024 launch's, the one Product Hunt featured
 * (#30 of the day), as the home page had it before the 2026-10-05 redesign.
 */
export async function Badges() {
  return (
    <div className={classes.badges}>
      <StarsBadge stars={await fetchStars()} />
      <ProductHuntBadge />
    </div>
  );
}

/**
 * A badge drawn after Product Hunt's, so the two read as a pair: the mark, a
 * small line over the name, and the count on the right under its symbol.
 * With no count (GitHub did not answer) it is the same badge without one.
 */
export function StarsBadge({ stars }: { stars: number | null }) {
  return (
    <a className={classes.stars} href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
      <IconBrandGithubFilled className={classes.mark} size={32} aria-hidden="true" />
      {/* The spaces are text, not layout (a flex row drops them): the link reads
          "Star us on GitHub 171 stars", not "Star us onGitHub171". */}
      <span className={classes.label}>
        <span className={classes.kicker}>Star us on</span>{' '}
        <span className={classes.name}>GitHub</span>
      </span>
      {stars !== null && ' '}
      {stars !== null && (
        <span className={classes.count}>
          <IconStarFilled size={13} aria-hidden="true" />
          <ScrollNumber value={formatStars(stars)} delay={700} />
          <span className={classes.srOnly}> stars</span>
        </span>
      )}
    </a>
  );
}

function ProductHuntBadge() {
  return (
    <a className={classes.ph} href={PRODUCT_HUNT_URL} target="_blank" rel="noopener noreferrer">
      {/* Product Hunt's image, not a copy: it carries the live upvote count. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={PRODUCT_HUNT_BADGE}
        alt="WP Bones - Featured on Product Hunt"
        width={250}
        height={54}
        decoding="async"
      />
    </a>
  );
}
