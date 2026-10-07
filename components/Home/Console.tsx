import { IconArrowUpRight } from '@tabler/icons-react';
import { revealItem } from '@/components/Motion/reveal-props';
import { RevealScope } from '@/components/Motion/RevealScope';
import { ScrollNumber } from '@/components/Motion/ScrollNumber';
import home from './Home.module.css';
import classes from './Console.module.css';

/**
 * `php bones` as it answers with no arguments: the command list, word for
 * word, from the CLI's own help (WPBones/src/Console/bin/bones, lines
 * 1838-1870, at v3.1.0). Grouped as the CLI groups them.
 */
const GROUPS: { name: string | null; commands: [string, string][] }[] = [
  {
    name: null,
    commands: [
      ['deploy', 'Create a deploy version'],
      ['install', 'Install a new WP Bones plugin'],
      ['optimize', 'Run composer dump-autoload with -o option'],
      ['plugin', 'Perform plugin operations'],
      ['rename', 'Rename the plugin name and the namespace'],
      ['require', 'Install a WP Bones package'],
      ['tinker', 'Interact with your application'],
      ['update', 'Update the Framework'],
      ['version', 'Update the Plugin version'],
    ],
  },
  {
    name: 'migrate',
    commands: [
      ['migrate', 'Run the migrations that have not run on this site'],
      ['migrate:create', 'Create a new Migration'],
      ['migrate:status', 'List the migrations and whether each one ran'],
      ['migrate:to-v2', 'Migrate gulp-based plugin to v2 webpack infrastructure'],
      ['migrate:to-v3', 'Convert a 2.x plugin to the breaking changes of WP Bones 3'],
    ],
  },
  {
    name: 'make',
    commands: [
      ['make:ajax', 'Create a new Ajax service provider class'],
      ['make:api', 'Create a new API controller class'],
      ['make:app', 'Create a new React/TS app in resources/assets/apps'],
      ['make:console', 'Create a new Bones command'],
      ['make:controller', 'Create a new controller class'],
      ['make:cpt', 'Create a new Custom Post Type service provider class'],
      ['make:ctt', 'Create a new Custom Taxonomy Type service provider class'],
      ['make:eloquent-model', 'Create a new Eloquent database model class'],
      ['make:model', 'Create a new database model class'],
      ['make:schedule', 'Create a new schedule (cron) service provider class'],
      ['make:shortcode', 'Create a new Shortcode service provider class'],
      ['make:provider', 'Create a new service provider class'],
      ['make:widget', 'Create a new Widget service provider class'],
    ],
  },
  {
    name: 'stub',
    commands: [['stub:publish', 'Copy the stubs into stubs/, where make:* reads them first']],
  },
];

const COMMAND_COUNT = GROUPS.reduce((sum, group) => sum + group.commands.length, 0);
const MAKE_COUNT = GROUPS.find((group) => group.name === 'make')!.commands.length;

/**
 * What the command line does, in four cells: each claim is the docs' own
 * (content/bones-console/bones-console.mdx, the section beside each).
 */
const CELLS = [
  {
    title: 'Scaffold, never overwrite',
    // "Creators", and the help's own last line
    body: `${MAKE_COUNT} make: commands write controllers, models, providers and React apps into the right folder. None of them overwrites a file you already have, unless you pass --force.`,
    command: 'php bones make:controller Dashboard/DashboardController',
    href: '/docs/bones-console/bones-console#creators',
  },
  {
    title: 'Rename once, run beside any plugin',
    // `rename`, and Naming your Plugin
    // The framework lives under the plugin's namespace (`WPKirk\WPBones\...`), so the
    // rename moves it too.
    body: 'One command gives the boilerplate your plugin’s name, namespace, slug and main file. The framework’s own classes live under that namespace, so two plugins built on WP Bones never share a class on one site.',
    command: 'php bones rename "My First WP Bones Plugin"',
    href: '/docs/getting-started/naming-your-plugin',
  },
  {
    title: 'Deploy only what ships',
    // `deploy`: what it leaves out, Composer dev packages, `--wp`
    body: 'The deploy builds the assets and stops if the build fails, leaves out what git ignores and Composer’s dev packages, and with --wp prepares the folder for WordPress.org.',
    command: 'php bones deploy ../my-plugin-release --wp',
    href: '/docs/bones-console/bones-console#deploy',
  },
  {
    title: 'A shell with WordPress loaded',
    // `tinker`
    body: 'Tinker runs any PHP and any WordPress function against your site, keeps variables for the session, and shows an error without closing.',
    command: 'php bones tinker',
    href: '/docs/bones-console/bones-console#tinker',
  },
];

export function Console() {
  return (
    <section className={home.section} id="console">
      <div className={classes.split}>
        <RevealScope>
          <span {...revealItem('rise', 0, home.eyebrow)}>The bones command line</span>
          <h2 {...revealItem('rise', 60, home.h2)}>
            <ScrollNumber value={COMMAND_COUNT} /> commands, one{' '}
            <code className={classes.inline}>php bones</code> away
          </h2>
          <p {...revealItem('rise', 120, home.lead)}>
            Every plugin carries its own copy of the CLI. It scaffolds the files, renames the
            plugin, bumps the version everywhere it is declared, and packages the release.
          </p>
          <div {...revealItem('rise', 180)}>
            <a className={home.ghost} href="/docs/bones-console/bones-console">
              Read about the console
              <IconArrowUpRight size={16} />
            </a>
          </div>
        </RevealScope>
        <RevealScope>
          <div {...revealItem('morph', 100, classes.terminal)}>
            <div className={classes.bar} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <pre className={classes.help}>
              <span className={classes.prompt}>$ </span>
              php bones
              {'\n\n'}
              <span className={classes.group}>Available commands:</span>
              {GROUPS.map((group) => (
                <span key={group.name ?? 'general'}>
                  {group.name && (
                    <>
                      {'\n'}
                      <span className={classes.group}>{group.name}</span>
                    </>
                  )}
                  {group.commands.map(([name, what]) => (
                    <span key={name}>
                      {'\n '}
                      <span className={classes.name}>{name.padEnd(24)}</span>
                      {what}
                    </span>
                  ))}
                </span>
              ))}
            </pre>
          </div>
        </RevealScope>
      </div>

      <RevealScope className={home.cells}>
        {CELLS.map((cell, i) => (
          <div key={cell.title} {...revealItem('morph', i * 90, home.cell)}>
            <h3 className={home.h3}>{cell.title}</h3>
            <p className={home.body}>{cell.body}</p>
            <code className={classes.line}>
              <span className={classes.prompt}>$ </span>
              {cell.command}
            </code>
            <a className={classes.more} href={cell.href}>
              Learn more<span className={classes.hidden}> about {cell.title.toLowerCase()}</span>
              <IconArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        ))}
      </RevealScope>
    </section>
  );
}
