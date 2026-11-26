'use client';

import useSWR from 'swr';
import config from '@/config';

export type GitHubRelease = {
  id: number;
  name: string | null;
  tag_name: string;
  html_url: string;
  published_at: string;
  prerelease: boolean;
  body: string | null;
};

const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === '1';

/**
 * Releases data source:
 * - server deployments: the bundled /api/github-releases proxy
 *   (optional GITHUB_TOKEN, bot filtering, 1h cache)
 * - static export (GitHub Pages): direct browser fetch to the GitHub API
 *   (CORS-enabled; 60 unauthenticated requests/hour per visitor IP)
 */
const endpoint = isStaticExport
  ? `${config.gitHub.releasesUrl}?per_page=${config.releaseNotes.maxReleases}`
  : '/api/github-releases';

async function fetcher(url: string): Promise<GitHubRelease[]> {
  const response = await fetch(
    url,
    isStaticExport ? { headers: { Accept: 'application/vnd.github+json' } } : undefined
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch releases (${response.status})`);
  }
  const data = await response.json();
  // The /api/github-releases proxy answers `{ releases, status }`; GitHub itself, the array.
  const releases = Array.isArray(data) ? data : data?.releases;
  if (!Array.isArray(releases)) {
    throw new Error('Unexpected response from the releases endpoint');
  }
  return releases as GitHubRelease[];
}

export function useReleaseNotes() {
  const { data, error, isLoading } = useSWR(endpoint, fetcher, {
    revalidateOnFocus: false,
  });

  return { releases: data ?? [], error, isLoading };
}
