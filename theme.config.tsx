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
      <meta property="og:description" content="WPBones" />
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
    text: "WPBones Docs",
  },
  banner: {
    key: "1.3.2-release",
    text: (
      <a href="/docs/Views/blade-template" target="_blank">
        🎉 v1.3.2 Released. Introducing Blade template. Read more →
      </a>
    ),
  },
};

export default config;
