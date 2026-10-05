import type { CSSProperties } from 'react';
import classes from './Motion.module.css';

/*
 * The props that make an element a scope or an item, in a module of their own
 * WITHOUT `'use client'`: the home page's sections are server components, and
 * a function exported from a client module reaches the server only as a
 * reference it cannot call. `Reveal` and `RevealScope` (client) use them too.
 */

/**
 * How an item arrives. See Motion.module.css for each starting pose. `left`
 * and `right` are for a screenshot, in from the side of the row it sits on.
 */
export type RevealVariant = 'morph' | 'rise' | 'pop' | 'left' | 'right';

/**
 * Props that make an element a scope: the thing the observer watches. Pass it
 * what `useReveal` returned; see there for what armed and revealed mean.
 */
export function revealScope({ armed, revealed }: { armed: boolean; revealed: boolean }) {
  return {
    className: classes.scope,
    'data-armed': armed ? '' : undefined,
    'data-revealed': revealed ? '' : undefined,
  };
}

/**
 * Props that make an element an item: the thing that moves, `delay` ms after
 * its scope. Spread them AFTER nothing that sets a class: `className` is
 * merged here, since a spread's `className` replaces the element's own.
 */
export function revealItem(variant: RevealVariant, delay = 0, className?: string) {
  return {
    className: className ? `${classes.item} ${className}` : classes.item,
    'data-reveal': variant,
    style: { '--reveal-delay': `${delay}ms` } as CSSProperties,
  };
}
