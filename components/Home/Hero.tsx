import { Fragment, type CSSProperties } from 'react';
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
/**
 * A line of the headline, one span per word, each with its place in the
 * sentence (`--w`) for the stagger of the entrance (Hero.module.css). The
 * words stay text with spaces between them, so the heading reads, copies and
 * is crawled as the sentence it is.
 */
function Words({ text, from, className }: { text: string; from: number; className?: string }) {
  const words = text.split(' ');
  return words.map((word, i) => (
    <Fragment key={word}>
      <span
        className={[classes.word, className].filter(Boolean).join(' ')}
        style={{ '--w': from + i } as CSSProperties}
      >
        {word}
      </span>
      {i < words.length - 1 && ' '}
    </Fragment>
  ));
}

export function Hero() {
  return (
    <section className={`${classes.hero} wpb-home`} data-guide-anchor="">
      <div className={classes.copy}>
        <a className={classes.pill} href="#whats-new">
          <span className={classes.pillTag}>v{pack.version}</span>
          What&apos;s new in WP Bones
          <IconArrowRight size={14} />
        </a>
        <h1 className={classes.title}>
          <Words text="WordPress plugins with" from={0} />{' '}
          <Words text="Laravel‑like bones." from={3} className={classes.accent} />
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
