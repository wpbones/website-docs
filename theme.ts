'use client';

import { createTheme } from '@mantine/core';

/*
 * The site is light only (app/layout.tsx), and its colours are the logo's:
 * the disc's sky (#5bb6dc), the shadow's steel (#4f93b0) and the bone's
 * white, sampled from components/wpbones-logo.png. Everything else is cut on
 * the sky's hue in OKLCH, so nothing on the page reads as another product.
 */
export const theme = createTheme({
  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
  fontFamilyMonospace: "var(--font-fira-code), 'Fira Code', Monaco, monospace",
  primaryColor: 'bones',
  /*
   * Shade 6 in both schemes, although only light is ever shown: it is the
   * first step of the ladder white measures 4.5:1 or more on (4.62:1), so a
   * filled button keeps white text.
   */
  primaryShade: { light: 6, dark: 6 },
  /* Dark ink where white would not reach 4.5:1: the coffee button's yellow. */
  autoContrast: true,
  black: '#0e293a',
  colors: {
    /*
     * Shade 4 IS the logo's sky; 0-3 lighten it and 5-9 darken it on the same
     * hue (OKLCH 227.9 degrees). White on each, from 5 up: 3.28, 4.62, 6.10,
     * 8.28, 11.56 to 1.
     */
    bones: [
      '#ebf7fd',
      '#d1edfb',
      '#a8daf0',
      '#7ec6e6',
      '#5bb6dc',
      '#3798be',
      '#1c7ea1',
      '#126a88',
      '#0a556e',
      '#073e51',
    ],
    /*
     * Greys are the logo's navy diluted rather than Mantine's neutral grey,
     * which beside the sky reads as a different product. `c="dimmed"` is
     * gray-6: 5.50:1 on white (Mantine's own is 4.6:1).
     */
    gray: [
      '#f8fafc',
      '#ecf1f4',
      '#dbe2e7',
      '#c9d2d9',
      '#9ba7af',
      '#75828c',
      '#5c6b76',
      '#495862',
      '#313f49',
      '#1b2831',
    ],
  },
  headings: {
    fontFamily: 'var(--font-poppins), Poppins, sans-serif',
    fontWeight: '600',
  },
  defaultRadius: 'md',
});
