import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ARMS, FACE, HEIGHT, LEGS, LEGS_TOP, PALETTE, runs, WIDTH } from './sprite';

const every = [...FACE, ...ARMS.stand, ...ARMS.point, ...LEGS.stand, ...LEGS.stepA, ...LEGS.stepB];

/** The cells of `rows` holding one of `letters`, as "x,y". */
function cellsOf(rows: readonly string[], letters: string) {
  const found = new Set<string>();
  rows.forEach((row, y) =>
    [...row].forEach((c, x) => {
      if (letters.includes(c)) {
        found.add(`${x},${y}`);
      }
    })
  );
  return found;
}

describe('the mascot sprite', () => {
  it('is drawn on one grid, 24 by 13, the bone then the legs', () => {
    expect(every.every((row) => row.length === WIDTH)).toBe(true);
    expect(LEGS_TOP + LEGS.stand.length).toBe(HEIGHT);
    expect(ARMS.stand.length).toBeLessThanOrEqual(FACE.length);
    expect(ARMS.point.length).toBeLessThanOrEqual(FACE.length);
  });

  it('draws arms and legs only where the bone leaves room', () => {
    // An overlay painted over the outline would erase the bone's edge.
    const bone = cellsOf(FACE, 'NWSEP');
    const overlays = [
      ...[ARMS.stand, ARMS.point].map((rows) => cellsOf(rows, 'LT')),
      ...[LEGS.stand, LEGS.stepA, LEGS.stepB].map((rows) =>
        cellsOf(['', ...Array(LEGS_TOP - 1).fill(''), ...rows], 'L')
      ),
    ];
    for (const cells of overlays) {
      expect([...cells].filter((cell) => bone.has(cell))).toEqual([]);
    }
  });

  it('uses no colour the palette does not name', () => {
    const used = new Set(every.join('').replace(/\./g, ''));
    expect([...used].filter((c) => !(c in PALETTE))).toEqual([]);
  });

  it('is painted in the logo’s own colours, the site’s tokens', () => {
    // Hex in the sprite, since an SVG attribute cannot take var(); this is
    // what keeps the two from drifting apart.
    const css = readFileSync(join(__dirname, '../../theme/global.css'), 'utf8');
    // Stylelint writes white as #fff, so a three-digit hex is expanded first.
    const token = (name: string) => {
      const hex = css
        .match(new RegExp(`--wpb-${name}:\\s*#([0-9a-f]{3}|[0-9a-f]{6});`, 'i'))?.[1]
        ?.toLowerCase();
      return hex && `#${hex.length === 3 ? [...hex].map((c) => c + c).join('') : hex}`;
    };
    expect(PALETTE).toEqual({
      N: token('outline'),
      W: token('bone'),
      S: token('shade'),
      E: token('ink'),
      P: token('blush'),
      L: token('sky'),
      T: token('steel'),
    });
  });

  it('is symmetric, so standing it faces the reader', () => {
    for (const row of FACE) {
      expect(row).toBe([...row].reverse().join(''));
    }
    for (const row of [...ARMS.stand, ...LEGS.stand]) {
      expect(row).toBe([...row].reverse().join(''));
    }
  });

  it('points with an arm whose every step shares an edge with the last', () => {
    // A diagonal of single cells touches only at corners and reads as dots.
    // Walk the left arm from the hand along shared edges: it has to take
    // every cell of the arm with it and end beside the bone's outline.
    const arm = cellsOf(
      ARMS.point.map((row) => row.slice(0, 3)),
      'LT'
    );
    const [hand] = cellsOf(ARMS.point, 'T');
    const seen = new Set([hand]);
    const queue = [hand];
    while (queue.length) {
      const [x, y] = queue.shift()!.split(',').map(Number);
      for (const next of [`${x + 1},${y}`, `${x - 1},${y}`, `${x},${y + 1}`, `${x},${y - 1}`]) {
        if (arm.has(next) && !seen.has(next)) {
          seen.add(next);
          queue.push(next);
        }
      }
    }
    expect(seen).toEqual(arm);
    // The shoulder: right beside the outline (column 2) on row 6.
    expect(FACE[6][2]).toBe('N');
    expect(seen.has('1,6')).toBe(true);
    // And the hand is up, above the shoulder, where it points.
    expect(Number(hand.split(',')[1])).toBeLessThan(6);
  });

  it('walks by lifting one foot, then the other', () => {
    const grounded = (legs: readonly string[]) => cellsOf([legs[legs.length - 1]], 'L');
    expect(grounded(LEGS.stand).size).toBe(6);
    expect(grounded(LEGS.stepA).size).toBe(3);
    expect(grounded(LEGS.stepB).size).toBe(3);
    expect([...grounded(LEGS.stepA)].some((c) => grounded(LEGS.stepB).has(c))).toBe(false);
  });
});

describe('runs', () => {
  it('turns each run of one colour into one rectangle, rows down from `top`', () => {
    expect(runs(['.NNW', 'LL..'], 10)).toEqual([
      { x: 1, y: 10, width: 2, colour: 'N' },
      { x: 3, y: 10, width: 1, colour: 'W' },
      { x: 0, y: 11, width: 2, colour: 'L' },
    ]);
  });
});
