/**
 * WP Bones' mascot: the logo's bone come alive. The bone is the logo's own --
 * white, its four round knobs and the shaft between them -- drawn with an
 * outline in the logo's sky taken down to bones-8, because a white bone on a
 * white page has no edge of its own. On the shaft: two dot eyes, blush cheeks
 * and a small smile. Its arms and legs are the logo's disc, the sky; its hands
 * are the disc's shadow, the steel. The underside of the shaft and of the two
 * lower knobs is shaded, as the light falls in the logo. Drawn for this site
 * from our own logo, as findergit.app's and lancetta.app's are from theirs: a
 * vendor's character inviting clicks would read as an endorsement it never
 * gave (user, 2026-09-23, on Lancetta).
 *
 * The grids ARE the drawing: `Mascot.tsx` turns each run of one letter into a
 * rectangle, so what is below is what the page draws, cell for cell. 24 cells
 * wide, 13 tall, at 4 px a cell. One letter per colour (`PALETTE`), `.` empty.
 *
 * Walking, the legs alternate (`LEGS.stepA`, `LEGS.stepB`); pointing, the left
 * arm climbs up from the shoulder, a staircase whose every step shares an EDGE
 * with the last -- a diagonal of single cells touches only at corners, and at
 * this size reads as a row of dots, not as an arm (measured on lancetta.app's).
 */

/**
 * The logo's colours, the same values as the `--wpb-*` tokens in
 * theme/global.css (`sprite.test.ts` holds them to it). Hex rather than
 * `var()`: an SVG presentation attribute is not a CSS declaration.
 */
export const PALETTE = {
  /** --wpb-outline: the bone's edge, the sky taken down to bones-8. */
  N: '#0a556e',
  /** --wpb-bone: the bone. */
  W: '#ffffff',
  /** --wpb-shade: the underside of the shaft and of the lower knobs. */
  S: '#dcf0fa',
  /** --wpb-ink: the eyes and the smile. */
  E: '#0e293a',
  /** --wpb-blush: the cheeks. */
  P: '#f08a8a',
  /** --wpb-sky: the arms and legs, the logo's disc. */
  L: '#5bb6dc',
  /** --wpb-steel: the hands, the disc's shadow. */
  T: '#4f93b0',
} as const;

export type Colour = keyof typeof PALETTE;

export const WIDTH = 24;
export const HEIGHT = 13;

/** The bone, rows 0-11: four knobs, the shaft, and the face on it. */
export const FACE = [
  '..NNNN............NNNN..',
  '.NWWWWN..........NWWWWN.',
  '.NWWWWWNNNNNNNNNNWWWWWN.',
  '.NWWWWWWWWWWWWWWWWWWWWN.',
  '.NWWWWWWWEWWWWEWWWWWWWN.',
  '..NWWWWPWWWWWWWWPWWWWN..',
  '..NWWWWWWWEWWEWWWWWWWN..',
  '.NWWWWWWWWWEEWWWWWWWWWN.',
  '.NSSSSSSSSSSSSSSSSSSSSN.',
  '.NWWWWWNNNNNNNNNNWWWWWN.',
  '.NSSSSN..........NSSSSN.',
  '..NNNN............NNNN..',
];

/**
 * The arms, over the bone's rows, out of the notch between its knobs.
 * Standing, both reach out and down; pointing, the left one is up.
 */
export const ARMS = {
  stand: [
    '........................',
    '........................',
    '........................',
    '........................',
    '........................',
    '........................',
    'LL....................LL',
    'T......................T',
  ],
  point: [
    '........................',
    '........................',
    'T.......................',
    'L.......................',
    'L.......................',
    'LL......................',
    '.L....................LL',
    '.......................T',
  ],
} as const;

/**
 * The legs, rows 10-12, from under the shaft between the lower knobs. A foot
 * on the ground is on the last row; a lifted one is a row up.
 */
export const LEGS = {
  stand: ['.........LL..LL.........', '.........LL..LL.........', '........LLL..LLL........'],
  stepA: ['.........LL..LL.........', '.........LL..LLL........', '........LLL.............'],
  stepB: ['.........LL..LL.........', '........LLL..LL.........', '.............LLL........'],
} as const;

/** The legs start on the bone's second-last row, under the shaft. */
export const LEGS_TOP = 10;

export interface Cell {
  x: number;
  y: number;
  width: number;
  colour: Colour;
}

/** Each horizontal run of one colour in `rows`, as one rectangle, `top` rows down. */
export function runs(rows: readonly string[], top = 0): Cell[] {
  const cells: Cell[] = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const colour = row[x];
      if (colour === '.') {
        x += 1;
        continue;
      }
      let width = 1;
      while (row[x + width] === colour) {
        width += 1;
      }
      cells.push({ x, y: y + top, width, colour: colour as Colour });
      x += width;
    }
  });
  return cells;
}
