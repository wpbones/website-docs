import '@gfazioli/mantine-marquee/styles.layer.css';
import '@gfazioli/mantine-parallax/styles.layer.css';
import '@gfazioli/mantine-text-animate/styles.layer.css';
import '@mantine/core/styles.layer.css';

import { GoogleTagManager } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { Layout } from 'nextra-theme-docs';
import { Banner, Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { Footer, MantineNavBar } from '@/components';
import config from '@/config';
import { theme } from '../theme';

import './global.css';

export const metadata = config.metadata;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pageMap = await getPageMap();

  const { nextraLayout, head } = config;

  return (
    <html lang="en" dir="ltr" {...mantineHtmlProps}>
      <Head>
        <ColorSchemeScript
          nonce={head.mantine.nonce}
          defaultColorScheme={head.mantine.defaultColorScheme}
        />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </Head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme={head.mantine.defaultColorScheme}>
          <Layout
            banner={
              <Banner storageKey="release-195">
                ✨ WP Bones 1.9.5 is out!{' '}
                <a href="/docs/release-notes">Check the Release Notes →</a>
              </Banner>
            }
            navbar={<MantineNavBar />}
            pageMap={pageMap}
            docsRepositoryBase={nextraLayout.docsRepositoryBase}
            footer={<Footer />}
            sidebar={nextraLayout.sidebar}
            editLink={null}
          >
            {children}
          </Layout>
          <GoogleTagManager gtmId={process.env.GTM as string} />
          <Analytics />
        </MantineProvider>
      </body>
    </html>
  );
}
