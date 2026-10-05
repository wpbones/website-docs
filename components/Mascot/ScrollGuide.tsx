'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { IconX } from '@tabler/icons-react';
import { useReducedMotion } from '@mantine/hooks';
import { dismissGuide, guideMemory, onGuideDismissed, sayNext } from './guide';
import { Mascot } from './Mascot';
import classes from './ScrollGuide.module.css';

/** Where the mascot is: nowhere, in the corner of the window, or on the Sponsors card. */
export type Place = 'none' | 'corner' | 'card';
type Phase = 'hidden' | 'arriving' | 'here' | 'leaving';

/** Matches `corner-in` in the stylesheet. */
export const CORNER_IN_MS = 900;
/** Matches `card-in`. */
export const CARD_IN_MS = 420;
/** Matches the fade on the way out. */
export const LEAVE_MS = 260;
/** A beat after the page mounts before it may come, so it never lands with the page. */
export const READY_MS = 1200;
/** After the last scroll event, before its legs stop. */
export const STILL_MS = 160;
/**
 * How much of the Sponsors card has to be on screen for the mascot to go to
 * it. It leaves once none of it is, so a card half in view does not send it
 * back and forth.
 */
export const CARD_RATIO = 0.3;

/** What it says on the Sponsors card: the card's own sentence, so no new claim. */
export const SPONSOR_LINE =
  'WP Bones is free and open source. If it saves you time, consider sponsoring it.';

/** A tip: one of the home page's own features, as the tour words it. */
export interface Tip {
  title: string;
  description: string;
}

/** What the page has said about where the mascot belongs. */
export interface Seen {
  /** A beat has passed since the page mounted. */
  ready: boolean;
  /** The hero has been scrolled past. */
  reached: boolean;
  /** How many of the page's other mascots are on screen now. */
  others: number;
  /** Enough of the Sponsors card is on screen. */
  card: boolean;
}

/**
 * Where the mascot belongs, from what the page last said. One character at a
 * time: never in the corner while another of its drawings (the hero's, the
 * statement's, the tour's, the closing call's) is on screen.
 */
export function placeFor(page: Seen, dismissed = guideMemory.dismissed): Place {
  if (dismissed || !page.ready) {
    return 'none';
  }
  if (page.card) {
    return 'card';
  }
  if (!page.reached || page.others > 0) {
    return 'none';
  }
  return 'corner';
}

/** How long what the reader asked for stays in the announcer before it is cleared. */
const SPOKEN_MS = 1500;

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * The mascot that follows the reader down the home page, ported from
 * findergit.app's (`ScrollGuide`), which took it from netfox.app's fox. Past
 * the hero it rides in the corner of the window, walking while the page
 * scrolls and standing when it stops; a click gives a tip, one of the feature
 * tour's own lines (`tips`, so it makes no claim the page does not), and Next
 * gives the next. At the footer it goes to the Sponsors card and says the
 * card's own sentence.
 *
 * The page has other drawings of it -- on the hero's stack, in the
 * statement, on the tour's window, over the closing call -- each marked
 * `data-mascot-spot`; while any is on screen the corner is empty.
 *
 * Dismissed here or on the card, it goes from both for the life of the page
 * (`guide.ts`). Nothing it says on its own is announced; what the reader asks
 * for is, from a live region that comes with it.
 */
export function ScrollGuide({ tips }: { tips: Tip[] }) {
  const reduced = useReducedMotion();
  const reducedNow = useRef(reduced);
  const [at, setAt] = useState<Place>('none');
  const [phase, setPhase] = useState<Phase>('hidden');
  const now = useRef<{ at: Place; phase: Phase }>({ at: 'none', phase: 'hidden' });
  const go = useCallback((nextAt: Place, nextPhase: Phase) => {
    now.current = { at: nextAt, phase: nextPhase };
    setAt(nextAt);
    setPhase(nextPhase);
  }, []);
  const [open, setOpenState] = useState(false);
  const openNow = useRef(false);
  const setOpen = useCallback((next: boolean) => {
    openNow.current = next;
    setOpenState(next);
  }, []);
  const [tip, setTip] = useState(0);
  const [spoken, setSpoken] = useState('');
  const hush = useRef<number | undefined>(undefined);
  const [hops, setHops] = useState(0);
  const [moving, setMoving] = useState(false);
  const movingNow = useRef(false);
  const [card, setCard] = useState<HTMLElement | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const openedAt = useRef(0);
  const seen = useRef<Seen>({ ready: false, reached: false, others: 0, card: false });
  const timers = useRef(new Set<number>());

  const later = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(() => {
      timers.current.delete(id);
      fn();
    }, ms);
    timers.current.add(id);
  }, []);

  const cancelTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current.clear();
  }, []);

  /**
   * The keyboard was on the mascot, which is about to go: hand the focus to a
   * control on screen rather than let it drop, without scrolling (findergit's,
   * from Codex on netfox.app's #83).
   */
  const handFocusBack = useCallback(() => {
    const el = box.current;
    if (!el?.contains(document.activeElement)) {
      return;
    }
    const others = [...document.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
      (other) => !el.contains(other) && other.getClientRects().length > 0
    );
    const before = others.filter(
      (other) => el.compareDocumentPosition(other) & Node.DOCUMENT_POSITION_PRECEDING
    );
    const inView = (other: HTMLElement) => {
      const { top, bottom, left, right } = other.getBoundingClientRect();
      return bottom > 0 && top < window.innerHeight && right > 0 && left < window.innerWidth;
    };
    const target = before.filter(inView).at(-1) ?? others.find(inView) ?? before.at(-1);
    target?.focus({ preventScroll: true });
  }, []);

  /** Moves the mascot to where it belongs: out of where it is first, then in. */
  const sync = useCallback(
    function syncPlace() {
      const want = placeFor(seen.current);
      const { at: here, phase: doing } = now.current;
      if (doing === 'leaving' || here === want) {
        return;
      }
      if (here !== 'none') {
        handFocusBack();
        cancelTimers();
        movingNow.current = false;
        setMoving(false);
        setOpen(false);
        go(here, 'leaving');
        later(
          () => {
            go('none', 'hidden');
            syncPlace();
          },
          reducedNow.current ? 0 : LEAVE_MS
        );
        return;
      }
      if (reducedNow.current) {
        go(want, 'here');
        setHops((count) => count + 1);
        return;
      }
      go(want, 'arriving');
      later(
        () => {
          if (now.current.at === want && now.current.phase === 'arriving') {
            go(want, 'here');
            setHops((count) => count + 1);
          }
        },
        want === 'corner' ? CORNER_IN_MS : CARD_IN_MS
      );
    },
    [cancelTimers, go, handFocusBack, later, setOpen]
  );

  // Ready a beat after the page mounts.
  useEffect(() => {
    const id = window.setTimeout(() => {
      seen.current.ready = true;
      sync();
    }, READY_MS);
    return () => {
      window.clearTimeout(id);
      cancelTimers();
    };
  }, [sync, cancelTimers]);

  // The hero: once its bottom edge is above the window, the reader has passed it.
  useEffect(() => {
    const hero = document.querySelector('[data-guide-anchor]');
    if (!hero || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }
    const page = seen.current;
    const saw = (bottom: number, visible: boolean) => {
      const reached = !visible && bottom <= 0;
      if (reached !== page.reached) {
        page.reached = reached;
        sync();
      }
    };
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[entries.length - 1];
      saw(entry.boundingClientRect.bottom, entry.isIntersecting);
    });
    observer.observe(hero);
    // An observer reports a CHANGE in what is visible, and a jump straight
    // past the hero is none if it was already off screen: measured once the
    // scroll settles, as findergit.app's does for its carousel.
    let settle: number | undefined;
    const scrolled = () => {
      window.clearTimeout(settle);
      settle = window.setTimeout(() => {
        const { top, bottom } = hero.getBoundingClientRect();
        saw(bottom, bottom > 0 && top < window.innerHeight);
      }, STILL_MS);
    };
    window.addEventListener('scroll', scrolled, { passive: true });
    return () => {
      observer.disconnect();
      window.clearTimeout(settle);
      window.removeEventListener('scroll', scrolled);
    };
  }, [sync]);

  // The page's other drawings of the mascot: while one is on screen, the corner is empty.
  useEffect(() => {
    const spots = document.querySelectorAll('[data-mascot-spot]');
    if (spots.length === 0 || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          visible.add(entry.target);
        } else {
          visible.delete(entry.target);
        }
      }
      if (visible.size !== seen.current.others) {
        seen.current.others = visible.size;
        sync();
      }
    });
    spots.forEach((spot) => observer.observe(spot));
    return () => observer.disconnect();
  }, [sync]);

  // The footer's Sponsors card.
  useEffect(() => {
    const el = document.getElementById('sponsors');
    if (!el || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }
    setCard(el);
    const page = seen.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        const was = page.card;
        if (entry.isIntersecting && entry.intersectionRatio >= CARD_RATIO) {
          page.card = true;
        } else if (!entry.isIntersecting) {
          page.card = false;
        }
        if (page.card !== was) {
          sync();
        }
      },
      { threshold: [0, CARD_RATIO] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [sync]);

  // Its legs go while the page scrolls, and a tip the reader opened folds once
  // they have scrolled half a window on.
  useEffect(() => {
    let still: number | undefined;
    const scrolled = () => {
      if (now.current.at === 'corner' && now.current.phase === 'here' && !reducedNow.current) {
        if (!movingNow.current) {
          movingNow.current = true;
          setMoving(true);
        }
        window.clearTimeout(still);
        still = window.setTimeout(() => {
          movingNow.current = false;
          setMoving(false);
        }, STILL_MS);
      }
      if (openNow.current && Math.abs(window.scrollY - openedAt.current) > window.innerHeight / 2) {
        setOpen(false);
      }
    };
    window.addEventListener('scroll', scrolled, { passive: true });
    return () => {
      window.clearTimeout(still);
      window.removeEventListener('scroll', scrolled);
    };
  }, [setOpen]);

  // Dismissed anywhere: it goes from everywhere.
  useEffect(() => onGuideDismissed(sync), [sync]);

  // Reduce Motion switched on mid-way: arrive now, and stand still.
  useEffect(() => {
    reducedNow.current = reduced;
    if (!reduced) {
      return;
    }
    movingNow.current = false;
    setMoving(false);
    if (now.current.phase === 'arriving') {
      cancelTimers();
      go(now.current.at, 'here');
    }
  }, [reduced, cancelTimers, go]);

  useEffect(() => () => window.clearTimeout(hush.current), []);

  /** Says something the reader asked for, and clears it a moment later. */
  const say = (words: string) => {
    setSpoken(words);
    window.clearTimeout(hush.current);
    hush.current = window.setTimeout(() => setSpoken(''), SPOKEN_MS);
  };

  /** The reader asked, on the mascot or on Next: the next tip, in a bubble that is theirs. */
  const ask = () => {
    if (tips.length === 0) {
      return;
    }
    const next = sayNext(tips.length);
    setTip(next);
    setHops((count) => count + 1);
    say(`${tips[next].title}: ${tips[next].description}`);
    if (!openNow.current) {
      openedAt.current = window.scrollY;
      setOpen(true);
    }
  };

  /** The mascot itself: lands it if it is on its way in, then tells. */
  const fromMascot = () => {
    const { at: here, phase: doing } = now.current;
    if (here !== 'corner' || doing === 'leaving' || doing === 'hidden') {
      return;
    }
    if (doing === 'arriving') {
      cancelTimers();
      go('corner', 'here');
    }
    ask();
  };

  const dismiss = (
    <button type="button" className={classes.dismiss} aria-label="Dismiss" onClick={dismissGuide}>
      <IconX size={12} stroke={2.2} />
    </button>
  );

  const shownTip = tips[tip];
  const inCorner = at === 'corner' && (
    <div
      ref={box}
      className={classes.corner}
      data-phase={phase}
      data-moving={moving ? '' : undefined}
      inert={phase === 'leaving'}
    >
      <button
        type="button"
        className={classes.walker}
        aria-label={open ? 'Show another tip' : 'Show a tip'}
        onClick={fromMascot}
      >
        {/* Keyed on the hop, so every new tip replays it. */}
        <Mascot key={`hop-${hops}`} walking={phase === 'arriving' || moving} pointing={open} />
      </button>
      {/* Mounted with the mascot, before anything is said: a live region has
          to be there before its words change to be heard (CodeRabbit on
          netfox.app's #82). */}
      <div className={classes.announcer} aria-live="polite" aria-atomic="true">
        {spoken}
      </div>
      {open && phase === 'here' && shownTip && (
        <div className={classes.cornerBubble}>
          <div className={classes.cornerSay}>
            <span key={`tip-${tip}`} className={classes.caption}>
              <strong className={classes.tipTitle}>{shownTip.title}</strong> {shownTip.description}
            </span>
            <button
              type="button"
              className={classes.nextButton}
              aria-label="Next tip"
              onClick={ask}
            >
              Next →
            </button>
          </div>
          {dismiss}
        </div>
      )}
    </div>
  );

  const onCard =
    at === 'card' &&
    card &&
    createPortal(
      <div ref={box} className={classes.card} data-phase={phase} inert={phase === 'leaving'}>
        <span className={classes.sitter}>
          <Mascot key={`hop-${hops}`} pointing />
        </span>
        <div className={classes.cardBubble}>
          <p className={classes.cardLine}>{SPONSOR_LINE}</p>
          {dismiss}
        </div>
      </div>,
      card
    );

  return (
    <>
      {inCorner}
      {onCard}
    </>
  );
}
