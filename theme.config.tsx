import { Footer } from "@components/Footer";
import { useRouter } from "next/router";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  backgroundColor: {
    dark: "17,17,17",
    light: "255,255,255",
  },
  logo: (
    <span>
      <img
        width={128}
        src="https://github.com/wpbones/WPBones/assets/432181/13e0e825-9b0d-44c2-a77d-1baad88a1070"
        alt="WP Bones Logo"
      />
    </span>
  ),
  project: {
    link: "https://github.com/wpbones/website-docs",
  },
  head: function useHead() {
    const { title } = useConfig();
    const { route } = useRouter();

    const socialCard = route === "/" || !title ? "https://wpbones.com/image.jpeg" : `https://wpbones.com/image.jpeg`;
    return (
      <>
        <title>WP Bones</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="description"
          content="WP Bones allows for WordPress plugins with Laravel-like features. It streamlines and modernizes WordPress plugin development."
        />
        <meta
          property="og:description"
          content="WP Bones allows for WordPress plugins with Laravel-like features. It streamlines and modernizes WordPress plugin development."
        />

        <meta property="twitter:title" content="WP Bones" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={socialCard}></meta>
        <meta
          property="twitter:description"
          content="WP Bones allows for WordPress plugins with Laravel-like features. It streamlines and modernizes WordPress plugin development."
        />

        <meta property="og:title" content={title ? title + " - WP Bones" : "WP Bones"} />

        <meta property="og:url" content="https://wpbones.com/" />
        <meta property="og:site_name" content="WP Bones" />
        <meta property="og:image" content={socialCard} />
        <meta name="apple-mobile-web-app-title" content="WP Bones" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap" rel="stylesheet" />
        <style>
          {`
            body {
              font-family: 'Poppins', sans-serif;
            }
            code, pre, kbdm samp {
              font-family: 'Fira Code', Monaco, monospace !important;
              font-size: 14px !important;
            }
          `}
        </style>
      </>
    );
  },
  editLink: {
    component: null,
  },
  chat: {
    link: "https://discord.gg/5bdVyycU8F",
  },
  docsRepositoryBase: "https://github.com/wpbones/website-docs",
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  footer: {
    component: <Footer />,
  },
  banner: {
    key: "v1-6-5-released",
    content: <a href="/docs/release-notes">🎉 v1.6.5 Released →</a>,
  },
};

export default config;
