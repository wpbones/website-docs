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
      <title>WP Bones</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        property="description"
        content="WP Bones allows for WordPress plugins with Laravel-like features. It streamlines and modernizes WordPress plugin development."
      />

      <meta
        property="twitter:description"
        content="WP Bones allows for WordPress plugins with Laravel-like features. It streamlines and modernizes WordPress plugin development."
      />
      <meta property="twitter:title" content="WP Bones" />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:image" content="https://wpbones.vercel.app/image.jpeg"></meta>

      <meta property="og:title" content="WP Bones" />
      <meta
        property="og:description"
        content="WP Bones allows for WordPress plugins with Laravel-like features. It streamlines and modernizes WordPress plugin development."
      />
      <meta property="og:url" content="https://wpbones.vercel.app/" />
      <meta property="og:site_name" content="WP Bones" />
      <meta property="og:image" content="https://wpbones.vercel.app/image.jpeg" />
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
    key: "ownai-chatgpt",
    text: (
      <a href="https://wpbones.ownai.com/" target="_blank">
        🎉 Try the WP Bones chatGPT →
      </a>
    ),
  },
};

export default config;
