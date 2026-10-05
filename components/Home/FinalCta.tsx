import { IconArrowRight, IconBrandDiscord } from '@tabler/icons-react';
import { Mascot } from '@/components/Mascot/Mascot';
import { revealItem } from '@/components/Motion/reveal-props';
import { RevealScope } from '@/components/Motion/RevealScope';
import home from './Home.module.css';
import { InstallLine } from './InstallLine';
import classes from './FinalCta.module.css';

/**
 * The last word, after Laravel's "What will you ship?": the page's ground
 * becomes graph paper, the mascot waves from the top of it, and the two ways
 * in come back with the first command.
 */
export function FinalCta() {
  return (
    <section className={`${home.section} ${classes.cta}`}>
      <RevealScope className={classes.inner}>
        <div {...revealItem('pop', 0, classes.mascot)} aria-hidden="true" data-mascot-spot="">
          <Mascot pointing />
        </div>
        <h2 {...revealItem('rise', 80, classes.title)}>Ready to give your plugin some bones?</h2>
        <p {...revealItem('rise', 160, home.lead)}>
          Clone a boilerplate, run <code className={home.code}>php bones install</code>, and open
          the docs beside it.
        </p>
        <div {...revealItem('rise', 240, classes.actions)}>
          <a className={classes.primary} href="/docs/getting-started/installation">
            Get started
            <IconArrowRight size={18} />
          </a>
          <a
            className={classes.secondary}
            href="https://discord.gg/5bdVyycU8F"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandDiscord size={18} />
            Join the Discord
          </a>
        </div>
        <div {...revealItem('rise', 320, classes.install)}>
          <InstallLine />
        </div>
      </RevealScope>
    </section>
  );
}
