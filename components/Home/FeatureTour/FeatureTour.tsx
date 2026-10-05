import { IconArrowUpRight, IconCheck } from '@tabler/icons-react';
import { revealItem } from '@/components/Motion/reveal-props';
import { RevealScope } from '@/components/Motion/RevealScope';
import home from '../Home.module.css';
import { FEATURES } from './features';
import { FeatureTabs, type TourFeature } from './FeatureTabs';
import { highlight } from './highlight';
import classes from './FeatureTour.module.css';

/**
 * The feature tour, after Laravel's "A framework for developers and agents"
 * (the user, 2026-10-05: take that section and make it different). The same
 * two columns -- the case on the left, tabs over a code window on the right --
 * and three things of its own: every tab's window ends in the `php bones`
 * command that scaffolds its first file; the copy under the window follows
 * the tab, with the docs page for it; and the mascot stands on the window and
 * says what the tab is about (`FeatureTabs`).
 *
 * A server component: the code is highlighted here, at build time, and the
 * client gets the HTML.
 */
export async function FeatureTour() {
  const features: TourFeature[] = await Promise.all(
    FEATURES.map(async (feature) => ({
      ...feature,
      files: await Promise.all(
        feature.files.map(async (file) => ({
          name: file.name,
          html: await highlight(file.code, file.lang),
        }))
      ),
    }))
  );

  return (
    <section className={`${home.section} ${classes.tour}`} id="features">
      <RevealScope className={classes.case}>
        <span {...revealItem('rise', 0, home.eyebrow)}>The framework</span>
        <h2 {...revealItem('rise', 60, home.h2)}>Laravel&apos;s habits, inside WordPress</h2>
        <p {...revealItem('rise', 120, home.lead)}>
          WP Bones has opinions about where things go: menus in config, logic in controllers, markup
          in Blade views, data in models and migrations. A plugin you open after six months reads
          like the one you wrote yesterday, and so does somebody else&apos;s.
        </p>
        <ul className={home.checks}>
          {[
            'A command line that scaffolds controllers, models, providers and apps',
            'Eloquent and migrations on the WordPress database',
            'React and TypeScript admin apps, built with @wordpress/scripts',
            '14 boilerplates to start from, each a working plugin',
          ].map((line, i) => (
            <li key={line} {...revealItem('rise', 180 + i * 70)}>
              <IconCheck size={18} stroke={2.4} aria-hidden="true" />
              {line}
            </li>
          ))}
        </ul>
        {/* Wrapped: the button lifts on hover, and two transforms on one element fight. */}
        <div {...revealItem('rise', 480)}>
          <a href="/docs" className={home.ghost}>
            Explore the documentation
            <IconArrowUpRight size={16} />
          </a>
        </div>
      </RevealScope>
      <FeatureTabs features={features} />
    </section>
  );
}
