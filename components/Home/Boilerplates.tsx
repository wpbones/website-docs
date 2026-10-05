import { IconArrowUpRight, IconBrandGithub, IconBrandWordpress } from '@tabler/icons-react';
import { boilerplateList } from '@/components/Boilerplate/List';
import { revealItem } from '@/components/Motion/reveal-props';
import { RevealScope } from '@/components/Motion/RevealScope';
import { ScrollNumber } from '@/components/Motion/ScrollNumber';
import home from './Home.module.css';
import { playgroundFor } from './links';
import classes from './Boilerplates.module.css';

/**
 * The boilerplates, every one a plugin that installs and runs: each opens in
 * WordPress Playground from this site's own blueprint (public/<slug>.json,
 * the ZIP the release cascade refreshes) and on GitHub. The list is the docs'
 * own (`Boilerplate/List.tsx`), so a boilerplate added there shows here.
 */
export function Boilerplates() {
  const slugs = Object.keys(boilerplateList);
  return (
    <section className={home.section} id="boilerplates">
      <RevealScope className={home.center}>
        <span {...revealItem('rise', 0, home.eyebrow)}>Boilerplates</span>
        <h2 {...revealItem('rise', 60, home.h2)}>
          Start from <ScrollNumber value={slugs.length} /> working plugins
        </h2>
        <p {...revealItem('rise', 120, home.lead)}>
          One boilerplate per part of the framework, each a plugin you can open in your browser
          before you clone it. Pick the one closest to what you are building.
        </p>
      </RevealScope>

      <RevealScope as="ul" className={classes.grid}>
        {slugs.map((slug, i) => {
          const { title, name, mostUsed } = boilerplateList[slug];
          return (
            <li key={slug} {...revealItem('morph', (i % 4) * 70 + Math.floor(i / 4) * 40)}>
              <div className={classes.card} data-featured={mostUsed || undefined}>
                <div className={classes.head}>
                  <span className={classes.title}>{title}</span>
                  {mostUsed && <span className={classes.tag}>Start here</span>}
                </div>
                <span className={classes.repo}>{name}</span>
                <div className={classes.links}>
                  <a
                    className={classes.play}
                    href={playgroundFor(slug)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconBrandWordpress size={15} aria-hidden="true" />
                    Try it<span className={classes.hidden}> ({name} in WordPress Playground)</span>
                    <IconArrowUpRight size={13} aria-hidden="true" />
                  </a>
                  <a
                    className={classes.git}
                    href={`https://github.com/wpbones/${name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconBrandGithub size={15} aria-hidden="true" />
                    Code<span className={classes.hidden}> of {name} on GitHub</span>
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </RevealScope>
    </section>
  );
}
