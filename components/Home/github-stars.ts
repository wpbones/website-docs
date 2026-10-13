import config from '@/config';

/**
 * How often the home page asks GitHub again, in seconds: once a day. The page
 * is rendered once and served from Vercel's cache; this is its `revalidate`
 * (app/page.ts), so a star shows up within a day, and each regeneration is
 * one page write, not one per visit.
 */
export const STARS_REVALIDATE = 86400;

type Fetch = (
  input: string,
  init?: RequestInit & { next?: { revalidate?: number } }
) => Promise<Response>;

/**
 * The framework repository's stars, as GitHub's API counts them, or null when
 * GitHub does not answer with a count: the badge then shows no number rather
 * than a made-up one.
 *
 * With `GITHUB_TOKEN` set, the request is authenticated (5,000 an hour instead
 * of 60 for the build machine's address); a token GitHub refuses (401, or 403
 * by an organisation's policy) falls back to an anonymous request, as
 * app/api/github-releases does, since the count is public.
 */
export async function fetchStars(
  fetcher: Fetch = fetch,
  token: string | undefined = process.env.GITHUB_TOKEN
): Promise<number | null> {
  const url = `${config.gitHub.apiUrl}/repos/${config.gitHub.repo}`;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'wpbones-docs-site',
  };
  const init = { next: { revalidate: STARS_REVALIDATE } };

  try {
    let response = token
      ? await fetcher(url, { ...init, headers: { ...headers, Authorization: `Bearer ${token}` } })
      : null;
    if (!response || response.status === 401 || response.status === 403) {
      response = await fetcher(url, { ...init, headers });
    }
    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.warn(`[github-stars] GitHub answered ${response.status}: the badge shows no count`);
      return null;
    }
    const { stargazers_count: stars } = (await response.json()) as { stargazers_count?: unknown };
    return typeof stars === 'number' && Number.isInteger(stars) && stars >= 0 ? stars : null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('[github-stars] GitHub did not answer: the badge shows no count', error);
    return null;
  }
}

/** A count as the page prints it: "171", "1,234". */
export function formatStars(stars: number) {
  return new Intl.NumberFormat('en-US').format(stars);
}
