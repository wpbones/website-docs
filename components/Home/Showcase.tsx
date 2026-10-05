import { IconArrowUpRight, IconBrandWordpress } from '@tabler/icons-react';
import { revealItem } from '@/components/Motion/reveal-props';
import { RevealScope } from '@/components/Motion/RevealScope';
import home from './Home.module.css';
import classes from './Showcase.module.css';

/**
 * Plugins on WordPress.org built with WP Bones, by its author. Each line is
 * the plugin's own short description from its readme.txt, and both links
 * answered 200 when this was written.
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

export function Showcase() {
  return (
    <section className={home.section} id="showcase">
      <RevealScope className={classes.layout}>
        <div>
          <span {...revealItem('rise', 0, home.eyebrow)}>In production</span>
          <h2 {...revealItem('rise', 60, home.h2)}>Shipping on WordPress.org today</h2>
          <p {...revealItem('rise', 120, home.lead)}>
            The framework this site documents is the one behind these two plugins, both published in
            the WordPress.org directory and both running on WP Bones 2.
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
        </div>
      </RevealScope>
    </section>
  );
}
