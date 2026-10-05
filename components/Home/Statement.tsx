import { Mascot } from '@/components/Mascot/Mascot';
import { revealItem } from '@/components/Motion/reveal-props';
import { RevealScope } from '@/components/Motion/RevealScope';
import home from './Home.module.css';
import classes from './Statement.module.css';

/**
 * The page's one line in large type, after Laravel's "Ship web apps with the
 * AI-enabled [switch] framework": where Laravel sets a switch in the line,
 * this sets the mascot, waving from inside the sentence.
 */
export function Statement() {
  return (
    <RevealScope as="section" className={`${home.section} ${home.center} ${classes.statement}`}>
      <h2 {...revealItem('rise', 0, classes.line)}>
        Every plugin deserves
        <br />a good{' '}
        <span className={classes.chip} aria-hidden="true" data-mascot-spot="">
          <Mascot pointing />
        </span>{' '}
        skeleton.
      </h2>
      <p {...revealItem('rise', 140, home.lead)}>
        WordPress gives a plugin hooks and a folder. WP Bones gives it a structure: the same tree in
        every plugin, from the boilerplate you start from to the build you deploy.
      </p>
    </RevealScope>
  );
}
