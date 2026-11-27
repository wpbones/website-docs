import { IconArrowUpRight, IconBrandWordpress } from '@tabler/icons-react';
import { revealItem } from '@/components/Motion/reveal-props';
import { RevealScope } from '@/components/Motion/RevealScope';
import home from './Home.module.css';
import classes from './Showcase.module.css';

/**
 * Plugins on WordPress.org built with WP Bones, by its author. Each line is
 * the plugin's own short description from its readme.txt, and every link
 * answered 200 when this was written. The first two have a website of their
 * own and get a card; the rest are listed below them.
 */
const PLUGINS = [
  {
    name: 'Scotty',
    what: 'Your WordPress engineer for superior site maintenance, optimization, and control.',
    detail: 'A React dashboard for cleaning, optimizing and securing a site.',
    wporg: 'https://wordpress.org/plugins/scotty/',
    site: 'https://scotty-plugin.vercel.app',
  },
  {
    name: 'WP Bannerize Pro',
    what: 'Bannerize simplifies banner creation and management. Track views and clicks to gauge campaign success.',
    detail: 'Image, HTML and text banners in campaigns, with built-in analytics.',
    wporg: 'https://wordpress.org/plugins/wp-bannerize-pro/',
    site: 'https://bannerize.vercel.app',
  },
];

const MORE_PLUGINS = [
  {
    name: 'Add Browser Search',
    what: 'Publish your site’s search as an OpenSearch description, so browsers offer to add it as a search engine and can search your site from the address bar.',
    wporg: 'https://wordpress.org/plugins/add-browser-search/',
    source: 'https://github.com/wpbones/add-browser-search',
  },
  {
    name: 'Feed Scroll Reader',
    what: 'A horizontal scrolling ticker of the latest items of one or more RSS/Atom feeds. Plain HTML and CSS, no Flash.',
    wporg: 'https://wordpress.org/plugins/flash-feed-scroll-reader/',
    source: 'https://github.com/wpbones/flash-feed-scroll-reader',
  },
  {
    name: 'WP Choose Your Theme',
    what: 'Let your visitors choose which of your installed themes they see the site with: a dropdown, a list or a single “next theme” link.',
    wporg: 'https://wordpress.org/plugins/wp-chooseyourtheme/',
    source: 'https://github.com/wpbones/wp-chooseyourtheme',
  },
];

export function Showcase() {
  return (
    <section className={home.section} id="showcase">
      <RevealScope className={classes.layout}>
        <div>
          <span {...revealItem('rise', 0, home.eyebrow)}>In production</span>
          <h2 {...revealItem('rise', 60, home.h2)}>Shipping on WordPress.org today</h2>
          <p {...revealItem('rise', 120, home.lead)}>
            The framework this site documents is the one behind these five plugins, all published in
            the WordPress.org directory: Scotty and Bannerize on WP Bones 2, the other three on WP
            Bones 3.
          </p>
        </div>
        <div className={classes.cards}>
          {PLUGINS.map((plugin, i) => (
            <article key={plugin.name} {...revealItem('morph', 120 + i * 120, classes.card)}>
              <div className={classes.head}>
                <IconBrandWordpress size={22} aria-hidden="true" />
                <h3 className={home.h3}>{plugin.name}</h3>
              </div>
              <p className={classes.quote}>{plugin.what}</p>
              <p className={home.body}>{plugin.detail}</p>
              <div className={classes.links}>
                <a href={plugin.wporg} target="_blank" rel="noopener noreferrer">
                  WordPress.org<span className={classes.hidden}> page of {plugin.name}</span>
                  <IconArrowUpRight size={13} aria-hidden="true" />
                </a>
                <a href={plugin.site} target="_blank" rel="noopener noreferrer">
                  Website<span className={classes.hidden}> of {plugin.name}</span>
                  <IconArrowUpRight size={13} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
          <ul
            {...revealItem('rise', 360, classes.more)}
            aria-label="More plugins built with WP Bones"
          >
            {MORE_PLUGINS.map((plugin) => (
              <li key={plugin.name} className={classes.row}>
                <div>
                  <h3 className={classes.name}>{plugin.name}</h3>
                  <p className={classes.what}>{plugin.what}</p>
                </div>
                <div className={classes.links}>
                  <a href={plugin.wporg} target="_blank" rel="noopener noreferrer">
                    WordPress.org<span className={classes.hidden}> page of {plugin.name}</span>
                    <IconArrowUpRight size={13} aria-hidden="true" />
                  </a>
                  <a href={plugin.source} target="_blank" rel="noopener noreferrer">
                    GitHub<span className={classes.hidden}> repository of {plugin.name}</span>
                    <IconArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </RevealScope>
    </section>
  );
}
