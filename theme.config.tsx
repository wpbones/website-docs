import { IconBrandSlack } from "@tabler/icons-react";
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
    icon: <IconBrandSlack />,
    link: "https://wpbones.slack.com/",
  },
  docsRepositoryBase: "https://github.com/wpbones/WPBones",
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  footer: {
    text: "WPBones Docs",
  },
};

export default config;
