import '@mantine/core/styles.css';
// !! The order of these imports is important !!
import '@mantine/code-highlight/styles.css';
import '@mantine/spotlight/styles.css';
import '@gfazioli/mantine-parallax/styles.css';
import '@gfazioli/mantine-text-animate/styles.css';
// Mantine theme overrides (palette tokens, springs, body background, etc.)
import '@/theme/global.css';

import { Analytics } from '@vercel/analytics/react';
import type { Viewport } from 'next';
import { Fira_Code, Poppins } from 'next/font/google';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
// !! End of important imports !!

import { ChatLauncher, Footer } from '@/components';
import { Link } from '@/components/Link/Link';
import { Banner } from '@/components/shell/Banner/Banner';
import { DocsSearch } from '@/components/shell/DocsSearch/DocsSearch';
import { SiteShell } from '@/components/shell/SiteShell/SiteShell';
import config from '@/config';
import { getDocs } from '@/lib/docs/content';
import { SIDEBAR_COLLAPSED_SCRIPT } from '@/lib/docs/sidebar';
import { getTopNav } from '@/lib/docs/top-nav';
import pack from '../package.json';
import { theme } from '../theme';

import './global.css';

export const metadata = config.metadata;

// The browser's own chrome on a phone takes the page's white.
export const viewport: Viewport = { themeColor: '#ffffff' };

// Served from this site: next/font downloads the files at build time, so a
// visitor's browser never asks Google for them. Poppins in three weights: the
// page's headings are set at 600 and its labels at 500, and with only the
// regular cut loaded the browser drew both as a synthesised bold. No 700:
// each weight is one more file preloaded before the first paint, and a 700
// is matched to the 600 cut.
const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});
// Fira Code as its variable font, one file for every weight, and not
// preloaded: the code type is never what the first paint waits for, and a
// preloaded font competes with the stylesheet for the first bytes. Measured
// on 2026-10-05 with five font files preloaded: the first paint came 0.5 s
// later than main's, on the docs as well as the home page.
const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
  preload: false,
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { tree } = await getDocs();
  const { head } = config;
  // One footer for every page, docs included, as on the Nextra site.
  const footer = <Footer year={new Date().getFullYear()} />;

  return (
    // `data-scroll-behavior`: app/global.css makes <html> scroll smoothly (for
    // the page's own anchors), and without this attribute Next 16 keeps that
    // on a route change too. The scroll reveals read the scroll at mount, so a
    // way home that mounts the page near its bottom and then scrolls it to the
    // top would fire every one-shot reveal out of sight on the way up
    // (measured on lancetta.app). With it, Next jumps before any effect reads
    // the scroll.
    <html
      lang="en"
      dir="ltr"
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${firaCode.variable}`}
      {...mantineHtmlProps}
    >
      <head>
        {/*
          Forced, not defaulted: the site is light, with no switch
          (theme/global.css). `forceColorScheme` makes the pre-hydration
          script write `light` whatever is in local storage, so a visitor who
          chose dark with the old switch is not left on a scheme nothing here
          is drawn for any more.
        */}
        <ColorSchemeScript nonce={head.mantine.nonce} forceColorScheme="light" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <script dangerouslySetInnerHTML={{ __html: SIDEBAR_COLLAPSED_SCRIPT }} />
      </head>
      <body>
        <MantineProvider theme={theme} forceColorScheme="light">
          <SiteShell
            tree={tree}
            nav={getTopNav()}
            docsFooter={footer}
            siteFooter={footer}
            banner={
              <Banner storageKey={`release-notes-${pack.version}`}>
                <span>
                  WP Bones v{pack.version} is out!{' '}
                  <Link href="/docs/release-notes">Check the Release Notes →</Link>
                </span>
              </Banner>
            }
          >
            {children}
          </SiteShell>
          <DocsSearch />
          <ChatLauncher />
          <Analytics />
        </MantineProvider>
      </body>
    </html>
  );
}
