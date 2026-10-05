import { IconArrowRight, IconArrowUpRight, IconBrandGithub } from '@tabler/icons-react';
import pack from '../../package.json';
import { InstallLine } from './InstallLine';
import { PLAYGROUND_URL } from './links';
import { PluginStack } from './PluginStack';
import classes from './Hero.module.css';

/**
 * The hero: what WP Bones is in one line, what it brings in one paragraph,
 * the two ways in (the docs, or a WordPress running the boilerplate in the
 * browser), and the plugin drawn as the layers it is made of.
 *
 * `.wpb-home` marks the page as the home page for the stylesheets that need
 * to know (the navbar over the hero's wash, the footer's sponsor card), and
 * `data-guide-anchor` is what the mascot in the corner waits to see scrolled
 * past (Mascot/ScrollGuide).
 */
export function Hero() {
  return (
    <section className={`${classes.hero} wpb-home`} data-guide-anchor="">
      <div className={classes.copy}>
        <a className={classes.pill} href="/docs/release-notes">
          <span className={classes.pillTag}>v{pack.version}</span>
          What&apos;s new in WP Bones
          <IconArrowRight size={14} />
        </a>
        <h1 className={classes.title}>
          WordPress plugins with <span className={classes.accent}>Laravel‑like bones.</span>
        </h1>
        <p className={classes.lead}>
          WP Bones is a framework for WordPress plugins: service providers, Blade views, Eloquent
          models, migrations, and a <code className={classes.code}>bones</code> command line that
          scaffolds, renames and deploys. Your plugin gets the shape of a modern PHP application,
          and still runs on any WordPress.
        </p>
        <div className={classes.actions}>
          <a className={classes.primary} href="/docs/getting-started/installation">
            Get started
            <IconArrowRight size={18} />
          </a>
          <a
            className={classes.secondary}
            href={PLAYGROUND_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Try it in WordPress Playground
            <IconArrowUpRight size={16} />
          </a>
        </div>
        <InstallLine />
        <a
          className={classes.repo}
          href="https://github.com/wpbones/WPBones"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconBrandGithub size={16} />
          wpbones/WPBones on GitHub
        </a>
      </div>
      <div className={classes.visual}>
        <PluginStack />
      </div>
    </section>
  );
}
