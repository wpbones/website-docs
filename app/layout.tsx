import '@mantine/core/styles.css';
// !! The order of these imports is important !!
import '@gfazioli/mantine-marquee/styles.css';
import '@gfazioli/mantine-parallax/styles.css';
import '@gfazioli/mantine-text-animate/styles.css';
// Mantine theme overrides (body background, marquee fade edges, etc.)
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
// visitor's browser never asks Google for them. The weights are the ones the
// Google Fonts links asked for (Poppins regular only, Fira Code 400 and 700).
const poppins = Poppins({
  weight: '400',
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
    <html
      lang="en"
      dir="ltr"
      className={`${poppins.variable} ${firaCode.variable}`}
      {...mantineHtmlProps}
    >
      <Head>
        <ColorSchemeScript
          nonce={head.mantine.nonce}
          defaultColorScheme={head.mantine.defaultColorScheme}
        />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </Head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme={head.mantine.defaultColorScheme}>
          <Layout
            banner={
              <Banner storageKey={`release-notes-${pack.version}`}>
                ✨ WP Bones v{pack.version} is out!{' '}
                <a href="/docs/release-notes">Check the Release Notes →</a>
              </Banner>
            }
            navbar={<MantineNavBar />}
            pageMap={pageMap}
            docsRepositoryBase={nextraLayout.docsRepositoryBase}
            footer={<Footer year={new Date().getFullYear()} />}
            sidebar={nextraLayout.sidebar}
            editLink={null}
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
