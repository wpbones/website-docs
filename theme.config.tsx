import { Footer } from "@components/Footer";
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
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
    link: "https://github.com/wpbones/WPBones",
  },
  head: () => (
    <>
      <title>WPBones</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="WPBones" />
      <meta
        property="og:description"
        content="WPBones allows for WordPress plugins with Laravel-like features. Streamlines and modernizes WordPress plugin development."
      />
    </>
  ),
  editLink: {
    component: null,
  },
  chat: {
    link: "https://discord.gg/5bdVyycU8F",
  },
  docsRepositoryBase: "https://github.com/wpbones/WPBones",
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  footer: {
    component: <Footer />,
  },
  banner: {
    key: "1.3.4-release",
    text: (
      <a href="/docs/Views/react-app" target="_blank">
        🎉 v1.4.0 Released. Introducing ReactJS Applications. Read more →
      </a>
    ),
  },
};

export default config;
