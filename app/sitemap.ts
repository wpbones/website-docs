import type { MetadataRoute } from 'next';
import config from '@/config';
import { getDocs } from '@/lib/docs/content';

/**
 * /sitemap.xml: the home page and every docs page, as the build serves them.
 *
 * The docs routes are the ones the docs page itself is generated for
 * (app/docs/[[...slug]]/page.tsx, through the same `getDocs`), so the sitemap
 * cannot list a page that is not built or miss one that is. Pages hidden from
 * the sidebar (legal, privacy) are still pages, and are listed.
 *
 * No `lastModified`: on Vercel every file's mtime is the moment the build
 * cloned the repository, so each deploy would date every page "now", a signal
 * crawlers learn to ignore (findergit-website's 2026-09-29 audit).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { pages } = await getDocs();
  const docs = pages.map((page) => page.route).sort();

  return ['/', ...docs].map((route) => ({
    url: new URL(route, config.metadata.metadataBase).href,
  }));
}
