export default {
  /**
   * Nextra metadata configuration
   * @see https://nextra.vercel.app/docs/metadata
   */
  metadata: {
    title: {
      default: 'WP Bones',
      template: '%s | WP Bones',
    },
    description: 'WP Bones is a WordPress framework for building modern plugins.',
    metadataBase: new URL('https://wpbones.com/'),
    keywords: [
      'WP Bones',
      'WordPress',
      'WordPress framework',
      'WordPress plugin',
      'WordPress development',
      'WordPress theme',
      'WordPress site',
      'WordPress website',
      'WordPress tools',
      'WordPress plugins',
      'Mantine',
      'Nextra',
      'Next.js',
      'React',
      'JavaScript',
      'MDX',
      'Markdown',
      'Static Site Generator',
    ],
    generator: 'Next.js',
    applicationName: 'WP Bones',
    appleWebApp: {
      title: 'WP Bones',
    },
    openGraph: {
      // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
      url: './',
      siteName: 'WP Bones',
      locale: 'en_US',
      type: 'website',
    },
    other: {
      'msapplication-TileColor': '#fff',
    },
    // The social preview image is app/opengraph-image.jpg (+ .alt.txt): Next.js turns it into
    // og:image for every route and copies it to twitter:image.
    twitter: {
      card: 'summary_large_image',
      site: '@wpbonesx',
    },
    alternates: {
      // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
      canonical: './',
    },
  },
  /**
   * Nextra Layout component configuration
   */
  nextraLayout: {
    docsRepositoryBase: 'https://github.com/wpbones/website-docs',
    sidebar: {
      defaultMenuCollapseLevel: 1,
    },
  },
  /**
   * Main Layout head configuration
   */
  head: {
    mantine: {
      defaultColorScheme: 'dark',
      nonce: '8IBTHwOdqNKAWeKl7plt8g==',
    },
  },
  /**
   * GitHub API configuration
   * @see https://docs.github.com/en/rest/reference/repos#releases
   *
   * The GitHub API token is optional for rate limiting.
   * If you want to use it, create a personal access token with the `repo` scope.
   *
   * This information is used to fetch the releases from the GitHub API.
   */
  gitHub: {
    repo: 'wpbones/wpbones',
    apiUrl: 'https://api.github.com',
    releasesUrl: 'https://api.github.com/repos/wpbones/wpbones/releases',
    apiToken: '', //process.env.GITHUB_TOKEN,
  },

  /**
   * Release notes configuration
   * This is used to link the release notes in the app.
   */
  releaseNotes: {
    url: 'https://github.com/wpbones/WPBones/releases',
    maxReleases: 10,
  },

  /**
   * Search configuration (for pagefind)
   * This is used to configure the search engine API.
   * @see /app/api/search/route.ts
   */
  search: {
    queryKeyword: 'q',
    minQueryLength: 3,
    limitKeyword: 'limit',
    defaultMaxResults: 5,
    excerptLengthKeyword: 'excerptLength',
    defaultExcerptLength: 30,
    defaultLanguage: 'en',
  },
  // Who publishes the site, as Italian law asks every VAT-registered owner to
  // say: the VAT number on the home page (art. 35 DPR 633/72), and name,
  // contact and VAT number reachable from every page (art. 7 D.Lgs. 70/2003).
  // The footer's last line reads these, and so do /docs/legal and
  // /docs/privacy. The contact address (hello@undolog.com) is written in
  // those two pages as a plain markdown link, which is what gets the docs'
  // link style (a JSX <a> in MDX gets none), so it is not kept here. The same
  // values on every Undolog site.
  legal: {
    brand: 'Undolog',
    owner: 'Giovambattista Fazioli',
    vatNumber: '12343751009',
  },
} as const;
