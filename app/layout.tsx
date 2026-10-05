import '@mantine/core/styles.css';
// !! The order of these imports is important !!
import '@gfazioli/mantine-marquee/styles.css';
import '@gfazioli/mantine-parallax/styles.css';
import '@gfazioli/mantine-text-animate/styles.css';
// Mantine theme overrides (palette tokens, springs, body background, etc.)
import '@/theme/global.css';

import { Analytics } from '@vercel/analytics/react';
import { Fira_Code, Poppins } from 'next/font/google';
import { Layout } from 'nextra-theme-docs';
import { Banner, Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
// !! End of important imports !!

import { ChatLauncher, Footer, MantineNavBar } from '@/components';
import config from '@/config';
import pack from '../package.json';
import { theme } from '../theme';

import './global.css';

export const metadata = config.metadata;

// Served from this site: next/font downloads the files at build time, so a
// visitor's browser never asks Google for them. Poppins in four weights: the
// page's headings are set at 600 and its labels at 500, and with only the
// regular cut loaded the browser drew both as a synthesised bold.
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});
const firaCode = Fira_Code({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pageMap = await getPageMap();

  const { nextraLayout, head } = config;

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
      {/*
        Nextra's primary colour, which its links, active sidebar row and table
        of contents are all cut from: bones-6 (#1c7ea1, the logo's sky taken
        down until white on it reads 4.62:1) as HSL, at the lightness its
        links are drawn with. The background is --wpb-page, given here as well
        because Nextra also writes it into the theme-color meta, which tints
        the browser's own chrome on a phone.
      */}
      <Head
        color={{ hue: 196, saturation: 70, lightness: 34 }}
        backgroundColor={{ dark: '#ffffff', light: '#ffffff' }}
      >
        {/*
          Forced, not defaulted: the site is light, with no switch
          (theme/global.css). `forceColorScheme` makes the pre-hydration
          script write `light` whatever is in local storage, so a visitor who
          chose dark with the old switch is not left on a scheme nothing here
          is drawn for any more.
        */}
        <ColorSchemeScript nonce={head.mantine.nonce} forceColorScheme="light" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <body>
        <MantineProvider theme={theme} forceColorScheme="light">
          <Layout
            banner={
              <Banner storageKey={`release-notes-${pack.version}`}>
                <span>
                  WP Bones v{pack.version} is out!{' '}
                  <a href="/docs/release-notes">Check the Release Notes →</a>
                </span>
              </Banner>
            }
            navbar={<MantineNavBar />}
            pageMap={pageMap}
            docsRepositoryBase={nextraLayout.docsRepositoryBase}
            footer={<Footer year={new Date().getFullYear()} />}
            sidebar={nextraLayout.sidebar}
            editLink={null}
            /*
              Nextra's LIGHT theme, forced, with no switch in its sidebar: the
              same scheme as Mantine above, so its tables, callouts and code
              blocks are drawn for the ground they sit on.
            */
            darkMode={false}
            nextThemes={{ defaultTheme: 'light', forcedTheme: 'light' }}
          >
            {children}
          </Layout>
          <ChatLauncher />
          <Analytics />
        </MantineProvider>
      </body>
    </html>
  );
}
