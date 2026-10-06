import type { CSSProperties } from 'react';
import {
  IconArrowUpRight,
  IconStack2,
  IconDatabase,
  IconPackageExport,
  IconShieldCheck,
  IconTerminal2,
  IconTestPipe,
} from '@tabler/icons-react';
import { Badge } from '@mantine/core';
import { revealItem } from '@/components/Motion/reveal-props';
import { RevealScope } from '@/components/Motion/RevealScope';
import { ScrollNumber } from '@/components/Motion/ScrollNumber';
import home from './Home.module.css';
import classes from './WhatsNew.module.css';

/**
 * What WP Bones 2 brought, release by release (the user, 2026-10-05: "metti
 * l'accento sulle nuove feature che abbiamo introdotto nelle ultime versioni
 * -- scava a fondo -- tipo ad esempio i test"). Every line is the release
 * notes' or the docs' own (github.com/wpbones/WPBones/releases, v2.0.0 to
 * v2.1.1) and every figure was measured, not read off a note: the test counts
 * by running PHPUnit at each tag (`--list-tests`) and at v2.1.1 in full
 * ("OK (175 tests, 472 assertions)": 85 unit, 90 console), as on CI. They are
 * figures AT v2.1.1, said so on the page, so a later release does not make
 * them false.
 */
const RELEASE = (tag: string) => `https://github.com/wpbones/WPBones/releases/tag/${tag}`;

/** v2.0.0 to v2.1.1, as `gh release list -R wpbones/WPBones` lists them. */
const RELEASES = 15;

/**
 * The suite at the four tags that grew it most, by `phpunit --list-tests` on the tag's tree. The
 * chart is laid out for four bars (`.bars`); v2.1.1 added one test, and shows in TESTS.
 */
const GROWTH: [string, number][] = [
  ['v2.0.4', 67],
  ['v2.0.6', 89],
  ['v2.0.10', 148],
  ['v2.1.0', 174],
];
const TESTS = 175;
const ASSERTIONS = 472;
/** .github/workflows/tests.yml's matrix. */
const PHP = ['8.1', '8.2', '8.3', '8.4'];

const CARDS = [
  {
    icon: IconStack2,
    title: 'A modern build',
    tags: ['v2.0.0'],
    body: (
      <>
        One webpack config on <code className={home.code}>@wordpress/scripts</code> finds every app,
        script and stylesheet in <code className={home.code}>resources/assets</code>. TypeScript and
        LESS work out of the box, and a v1 plugin moves over with{' '}
        <code className={home.code}>php bones migrate:to-v2</code>.
      </>
    ),
    href: '/docs/migrating-to-v2',
  },
  {
    icon: IconShieldCheck,
    title: 'A CLI that guards your files',
    tags: ['v2.0.10', 'v2.1.0'],
    body: (
      <>
        <code className={home.code}>deploy</code> checks where it is going before it builds
        anything, generators never overwrite your files, and every failure exits non-zero. Since
        2.1.0 bones runs from any folder and <code className={home.code}>rename</code> touches only
        what changes.
      </>
    ),
    href: '/docs/bones-console/bones-console#where-the-deploy-goes',
  },
  {
    icon: IconPackageExport,
    title: 'Packages ready for WordPress.org',
    tags: ['v2.0.6', 'v2.0.7'],
    body: 'A broken build stops the deploy. What git ignores and Composer’s dev packages stay out of the package, and your working copy is never touched.',
    href: '/docs/bones-console/bones-console#what-the-deploy-leaves-out',
  },
  {
    icon: IconDatabase,
    title: 'Eloquent wherever WordPress runs',
    tags: ['v2.0.11', 'v2.0.12'],
    body: 'On SQLite, in Playground or Studio, Eloquent opens the same file WordPress uses. On MySQL it uses WordPress’s charset, so emoji survive the round trip.',
    href: '/docs/database-orm/eloquent-orm#mysql-and-sqlite',
  },
  {
    icon: IconTerminal2,
    title: 'Commands that reach your plugin',
    tags: ['v2.0.8'],
    body: (
      <>
        A custom bones command can load WordPress, and its{' '}
        <code className={home.code}>$this-&gt;plugin</code> is the same instance WordPress runs.
      </>
    ),
    href: '/docs/bones-console/writing-commands#using-wordpress-in-a-command',
  },
];

function Tags({ tags }: { tags: string[] }) {
  return (
    <span className={classes.tags}>
      {tags.map((tag) => (
        <Badge
          key={tag}
          component="a"
          href={RELEASE(tag)}
          target="_blank"
          rel="noopener noreferrer"
          variant="light"
          color="bones"
          radius="sm"
          className={classes.tag}
          aria-label={`Release notes of WP Bones ${tag}`}
        >
          {tag}
        </Badge>
      ))}
    </span>
  );
}

export function WhatsNew() {
  return (
    <section className={home.section} id="whats-new">
      <RevealScope className={home.center}>
        <span {...revealItem('rise', 0, home.eyebrow)}>New in WP Bones 2</span>
        <h2 {...revealItem('rise', 60, home.h2)}>
          <ScrollNumber value={RELEASES} /> releases, and <ScrollNumber value={TESTS} /> tests
          behind them
        </h2>
        <p {...revealItem('rise', 120, home.lead)}>
          From the webpack build of 2.0.0 to the CLI of 2.1.0: what changed, and the release that
          brought it.
        </p>
      </RevealScope>

      <RevealScope className={classes.bento}>
        {/* The test suite, the largest cell. */}
        <article {...revealItem('morph', 0, `${classes.card} ${classes.tested}`)}>
          <div className={classes.head}>
            <span className={classes.icon}>
              <IconTestPipe size={22} stroke={1.7} aria-hidden="true" />
            </span>
            <Tags tags={['v2.0.4', 'v2.1.0']} />
          </div>
          <h3 className={home.h3}>Tested on every pull request</h3>
          <p className={home.body}>
            85 unit tests check the SQL the framework builds, with no WordPress and no database. 90
            more run the real <code className={home.code}>bones</code> file against throwaway
            plugins. Every pull request and every push to master runs them on PHP 8.1 to 8.4, and a
            deprecation fails the build.
          </p>

          <dl className={classes.stats}>
            <div>
              <dt>tests at v2.1.1</dt>
              <dd>
                <ScrollNumber value={TESTS} />
              </dd>
            </div>
            <div>
              <dt>assertions</dt>
              <dd>
                <ScrollNumber value={ASSERTIONS} />
              </dd>
            </div>
            <div>
              <dt>PHP versions in CI</dt>
              <dd>
                <ScrollNumber value={PHP.length} />
              </dd>
            </div>
          </dl>

          {/* How the suite grew, tag by tag. */}
          <figure className={classes.chart}>
            <div className={classes.bars}>
              {GROWTH.map(([tag, count], i) => {
                const item = revealItem('rise', 200 + i * 110, classes.barCol);
                return (
                  <div
                    key={tag}
                    {...item}
                    // Merged, not replaced: the item's own style carries its
                    // --reveal-delay, the stagger (Codex on #75). --p is the
                    // count's share of the largest, so a bar is to scale.
                    style={{ ...item.style, '--p': (count / TESTS).toFixed(4) } as CSSProperties}
                  >
                    <span className={classes.count}>{count}</span>
                    <span className={classes.bar} />
                    <span className={classes.at}>{tag}</span>
                  </div>
                );
              })}
            </div>
            <figcaption className={classes.caption}>
              The suite at each release that grew it.{' '}
              <a
                href="https://github.com/wpbones/WPBones/blob/master/.github/workflows/tests.yml"
                target="_blank"
                rel="noopener noreferrer"
              >
                The CI workflow
                <IconArrowUpRight size={12} aria-hidden="true" />
              </a>
            </figcaption>
          </figure>

          <a className={classes.more} href="/docs/contributing#run-the-test-suite">
            Run the test suite<span className={classes.hidden}> of WP Bones</span>
            <IconArrowUpRight size={14} aria-hidden="true" />
          </a>
        </article>

        {CARDS.map(({ icon: Icon, title, tags, body, href }, i) => (
          <article key={title} {...revealItem('morph', 90 + i * 80, classes.card)}>
            <div className={classes.head}>
              <span className={classes.icon}>
                <Icon size={22} stroke={1.7} aria-hidden="true" />
              </span>
              <Tags tags={tags} />
            </div>
            <h3 className={home.h3}>{title}</h3>
            <p className={home.body}>{body}</p>
            <a className={classes.more} href={href}>
              Read the docs<span className={classes.hidden}> on {title.toLowerCase()}</span>
              <IconArrowUpRight size={14} aria-hidden="true" />
            </a>
          </article>
        ))}
      </RevealScope>

      <div className={classes.footer}>
        <a className={home.ghost} href="/docs/release-notes">
          All the release notes
          <IconArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
