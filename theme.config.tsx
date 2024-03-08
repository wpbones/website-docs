import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>WPBones</span>,
  project: {
    link: 'https://github.com/wpbones/WPBones',
  },
  chat: {
    link: 'https://discord.com',
  },
  docsRepositoryBase: 'https://github.com/wpbones/WPBones',
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  footer: {
    text: 'WPBones Docs',
  },
}

export default config
