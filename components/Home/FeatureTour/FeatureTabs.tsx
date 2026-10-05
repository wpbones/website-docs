'use client';

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { IconArrowRight, IconBone, IconTerminal2 } from '@tabler/icons-react';
import { Mascot } from '@/components/Mascot/Mascot';
import { Reveal } from '@/components/Motion/Reveal';
import type { Feature } from './features';
import classes from './FeatureTabs.module.css';

export type TourFeature = Omit<Feature, 'files'> & {
  files: { name: string; html: string }[];
};

/**
 * The tabs and the code window of the feature tour (see `FeatureTour`).
 *
 * Every tab's panel is in the served HTML, the inactive ones `hidden`: a
 * crawler and a reader without scripts get every snippet, and switching tabs
 * costs no request. Inside a panel, the files are tabs of their own.
 *
 * The mascot stands on the window's top edge and says what the open tab is
 * about; a click on it, or on its Next, opens the next tab. Nothing turns by
 * itself: a reader reading code should not have it taken away.
 */
export function FeatureTabs({ features }: { features: TourFeature[] }) {
  const [active, setActive] = useState(0);
  const [file, setFile] = useState(0);
  // One hop per tab change: the mascot is keyed on it.
  const [hops, setHops] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const open = (index: number, focus = false) => {
    const next = (index + features.length) % features.length;
    setActive(next);
    setFile(0);
    setHops((count) => count + 1);
    if (focus) {
      tabs.current[next]?.focus();
    }
  };

  /** Arrow keys move along the tabs, as a tablist's do (WAI-ARIA APG). */
  const onKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: features.length - 1,
    };
    if (event.key in moves) {
      event.preventDefault();
      open(moves[event.key], true);
    }
  };

  const current = features[active];

  return (
    <div className={classes.tabs}>
      <Reveal variant="pop" className={classes.pillsWrap}>
        <div className={classes.pills} role="tablist" aria-label="Framework features">
          {features.map((feature, i) => (
            <button
              key={feature.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${feature.id}`}
              aria-selected={i === active}
              aria-controls={`${id}-panel-${feature.id}`}
              tabIndex={i === active ? 0 : -1}
              className={classes.pill}
              onClick={() => open(i)}
              onKeyDown={onKey}
            >
              {feature.label}
            </button>
          ))}
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
              aria-label={`Next feature: ${features[(active + 1) % features.length].label}`}
              onClick={() => open(active + 1)}
            >
              <Mascot key={`hop-${hops}`} pointing />
            </button>
          </div>

          {features.map((feature, i) => (
            <div
              key={feature.id}
              role="tabpanel"
              id={`${id}-panel-${feature.id}`}
              aria-labelledby={`${id}-tab-${feature.id}`}
              hidden={i !== active}
              className={classes.panel}
            >
              <div className={classes.files}>
                {feature.files.map((f, j) => {
                  const shown = i === active ? j === file : j === 0;
                  return (
                    <button
                      key={f.name}
                      type="button"
                      className={classes.file}
                      data-active={shown || undefined}
                      aria-pressed={shown}
                      onClick={() => setFile(j)}
                    >
                      <IconBone size={15} stroke={1.8} aria-hidden="true" />
                      {f.name}
                    </button>
                  );
                })}
              </div>
              {feature.files.map((f, j) => {
                const shown = i === active ? j === file : j === 0;
                return (
                  <div
                    key={f.name}
                    className={classes.code}
                    hidden={!shown}
                    // Shiki's output, made at build time from the snippets in features.ts.
                    dangerouslySetInnerHTML={{ __html: f.html }}
                  />
                );
              })}
              {feature.command && (
                <div className={classes.command}>
                  <span className={classes.hint}>
                    <IconTerminal2 size={14} stroke={1.8} aria-hidden="true" />
                    Scaffold {feature.scaffolds} with bones
                  </span>
                  <span className={classes.prompt} aria-hidden="true">
                    $
                  </span>
                  {/* Keyed on the tab, so each command types itself in again. */}
                  <code
                    key={`cmd-${active}`}
                    className={classes.typed}
                    style={{ '--chars': feature.command.length } as CSSProperties}
                  >
                    {feature.command}
                  </code>
                </div>
              )}
            </div>
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
    </div>
  );
}
