'use client';

import { useState, type CSSProperties } from 'react';
import { IconArrowRight, IconBone, IconTerminal2 } from '@tabler/icons-react';
import { FloatingIndicator, Tabs } from '@mantine/core';
import { Mascot } from '@/components/Mascot/Mascot';
import { Reveal } from '@/components/Motion/Reveal';
import type { Feature } from './features';
import classes from './FeatureTabs.module.css';

export type TourFeature = Omit<Feature, 'files'> & {
  files: { name: string; html: string }[];
};

/**
 * The tabs and the code window of the feature tour (see `FeatureTour`), on
 * Mantine's `Tabs`, which brings the tablist semantics and the arrow keys,
 * and its `FloatingIndicator`, the pill that runs from the open tab to the one
 * picked (the user, 2026-10-05: "il pulsante si anima e corre verso l'item
 * selezionato"), on the site's snap spring.
 *
 * `keepMountedMode="display-none"`, not Mantine's default `activity`: an
 * inactive panel in a React <Activity> renders nothing on the server, and every
 * snippet would be missing from the served HTML (measured on findergit.app's
 * FAQ, the same Mantine 9 behaviour). With it every panel is served, hidden.
 *
 * The indicator's parent is the list, inside a track that scrolls when the
 * column is narrower than the tabs: Mantine places it by the difference of the
 * two boxes as drawn, so a scrolling parent would put it off its tab.
 *
 * The mascot stands on the window's top edge and says what the open tab is
 * about; a click on it opens the next. Nothing turns by itself: a reader
 * reading code should not have it taken away.
 */
export function FeatureTabs({ features }: { features: TourFeature[] }) {
  const [active, setActive] = useState(features[0].id);
  // One hop per tab change: the mascot and the typed command are keyed on it.
  const [hops, setHops] = useState(0);
  const [list, setList] = useState<HTMLDivElement | null>(null);
  // Mantine's own pattern for the indicator's targets: the record is mutated
  // as the tabs mount, and the indicator reads it on the next render.
  const [tabRefs, setTabRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const setTabRef = (value: string) => (node: HTMLButtonElement | null) => {
    tabRefs[value] = node;
    setTabRefs(tabRefs);
  };

  const index = features.findIndex((feature) => feature.id === active);
  const current = features[index];
  const next = features[(index + 1) % features.length];

  const open = (value: string) => {
    setActive(value);
    setHops((count) => count + 1);
    // A narrow track scrolls sideways: bring the tab picked into view.
    tabRefs[value]?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };

  return (
    <Tabs
      value={active}
      onChange={(value) => value && open(value)}
      variant="none"
      keepMountedMode="display-none"
      className={classes.tabs}
    >
      <Reveal variant="pop" className={classes.pillsWrap}>
        <div className={classes.track}>
          <Tabs.List ref={setList} className={classes.pills} aria-label="Framework features">
            {features.map((feature) => (
              <Tabs.Tab
                key={feature.id}
                value={feature.id}
                ref={setTabRef(feature.id)}
                className={classes.pill}
              >
                {feature.label}
              </Tabs.Tab>
            ))}
            <FloatingIndicator
              target={tabRefs[active]}
              parent={list}
              className={classes.indicator}
              transitionDuration="var(--wpb-spring-snap-duration)"
            />
          </Tabs.List>
        </div>
      </Reveal>

      <Reveal variant="morph" delay={120} radius={16} className={classes.windowWrap}>
        <div className={classes.window}>
          {/* The narrator, standing on the window's top edge. */}
          <div className={classes.guide} data-mascot-spot="">
            <div key={`say-${active}`} className={classes.bubble} aria-hidden="true">
              {current.say}
            </div>
            <button
              type="button"
              className={classes.walker}
              aria-label={`Next feature: ${next.label}`}
              onClick={() => open(next.id)}
            >
              <Mascot key={`hop-${hops}`} pointing />
            </button>
          </div>

          {features.map((feature) => (
            <Tabs.Panel key={feature.id} value={feature.id} className={classes.panel}>
              {/* The files of the tab, as tabs of their own. */}
              <Tabs
                defaultValue={feature.files[0].name}
                variant="none"
                keepMountedMode="display-none"
              >
                <Tabs.List className={classes.files} aria-label={`${feature.label} files`}>
                  {feature.files.map((file) => (
                    <Tabs.Tab
                      key={file.name}
                      value={file.name}
                      className={classes.file}
                      leftSection={<IconBone size={15} stroke={1.8} aria-hidden="true" />}
                    >
                      {file.name}
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
                {feature.files.map((file) => (
                  <Tabs.Panel key={file.name} value={file.name}>
                    <div
                      className={classes.code}
                      // Shiki's output, made at build time from the snippets in features.ts.
                      dangerouslySetInnerHTML={{ __html: file.html }}
                    />
                  </Tabs.Panel>
                ))}
              </Tabs>
              {feature.command && (
                <div className={classes.command}>
                  <span className={classes.hint}>
                    <IconTerminal2 size={14} stroke={1.8} aria-hidden="true" />
                    Scaffold {feature.scaffolds} with bones
                  </span>
                  <span className={classes.prompt} aria-hidden="true">
                    $
                  </span>
                  {/* Keyed on the change, so the command of the tab opened types itself in. */}
                  <code
                    key={feature.id === active ? `cmd-${hops}` : 'cmd'}
                    className={classes.typed}
                    style={{ '--chars': feature.command.length } as CSSProperties}
                  >
                    {feature.command}
                  </code>
                </div>
              )}
            </Tabs.Panel>
          ))}
        </div>
      </Reveal>

      <p className={classes.blurb} key={`blurb-${active}`}>
        {current.blurb}{' '}
        <a className={classes.more} href={current.href}>
          Read the docs<span className={classes.visuallyHidden}> on {current.label}</span>
          <IconArrowRight size={14} aria-hidden="true" />
        </a>
      </p>
    </Tabs>
  );
}
