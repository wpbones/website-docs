import NextImage from 'next/image';
import { IconArrowUpRight, IconCheck, IconPackage } from '@tabler/icons-react';
import { revealItem } from '@/components/Motion/reveal-props';
import { RevealScope } from '@/components/Motion/RevealScope';
import raycast from '@/components/Raycast/raycast.png';
import home from './Home.module.css';
import classes from './Ecosystem.module.css';

/**
 * The official packages, each in the docs' own words
 * (content/official-packages/<slug>.mdx), installed with `php bones require`.
 */
const PACKAGES = [
  {
    name: 'Actions and Filters JS',
    href: '/docs/official-packages/actions-and-filters-js',
    what: 'The actions and filters of WordPress PHP, in JavaScript.',
  },
  {
    name: 'Flags',
    href: '/docs/official-packages/flags',
    what: 'Turn plugin features on and off from YAML files.',
  },
  {
    name: 'Geolocalizer',
    href: '/docs/official-packages/geolocalizer',
    what: 'Utilities to manage geolocation.',
  },
  {
    name: 'Morris PHP',
    href: '/docs/official-packages/morris-php',
    what: 'MorrisJS charts in your plugin.',
  },
  {
    name: 'Pure CSS Switch',
    href: '/docs/official-packages/pure-css-switch',
    what: 'A switch button in pure CSS.',
  },
  {
    name: 'Pure CSS Tabs',
    href: '/docs/official-packages/pure-css-tabs',
    what: 'Tabs in pure CSS.',
  },
  {
    name: 'User Agent',
    href: '/docs/official-packages/useragent',
    what: 'Detect the user agent.',
  },
  {
    name: 'WP Tables',
    href: '/docs/official-packages/wp-tables',
    what: 'A fluent WP List Table.',
  },
];

/** What the Raycast extension does, as the old home page's card listed it. */
const RAYCAST = [
  'Search the documentation and open it in the browser',
  'Search the boilerplates and start a plugin from one',
  'See the latest version from the menu bar',
  'Links to issues, FAQs and more',
];

export function Ecosystem() {
  return (
    <section className={home.section} id="ecosystem">
      <RevealScope className={home.center}>
        <span {...revealItem('rise', 0, home.eyebrow)}>Ecosystem</span>
        <h2 {...revealItem('rise', 60, home.h2)}>Packages and tools around the framework</h2>
      </RevealScope>
      <RevealScope className={`${home.cells} ${classes.cells}`}>
        <div {...revealItem('morph', 0, home.cell)}>
          <h3 className={home.h3}>Official packages</h3>
          <p className={home.body}>
            Each one installs with <code className={home.code}>php bones require</code>, which also
            moves it under your plugin&apos;s namespace.
          </p>
          <ul className={classes.packages}>
            {PACKAGES.map((pkg) => (
              <li key={pkg.name}>
                <a href={pkg.href}>
                  <IconPackage size={16} aria-hidden="true" />
                  <span className={classes.pkgName}>{pkg.name}</span>
                  <span className={classes.pkgWhat}>{pkg.what}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div {...revealItem('morph', 120, home.cell)}>
          <div className={classes.raycastHead}>
            <NextImage
              src={raycast}
              alt=""
              width={48}
              height={48}
              className={classes.raycastIcon}
            />
            <h3 className={home.h3}>WP Bones for Raycast</h3>
          </div>
          <p className={home.body}>
            The documentation and the boilerplates one keystroke away, on the Mac.
          </p>
          <ul className={home.checks}>
            {RAYCAST.map((line) => (
              <li key={line}>
                <IconCheck size={18} stroke={2.4} aria-hidden="true" />
                {line}
              </li>
            ))}
          </ul>
          <a
            className={home.ghost}
            href="https://www.raycast.com/Undolog/wp-bones"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get the extension
            <IconArrowUpRight size={16} />
          </a>
        </div>
      </RevealScope>
    </section>
  );
}
