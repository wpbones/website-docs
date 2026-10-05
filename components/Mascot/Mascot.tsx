import { ARMS, FACE, HEIGHT, LEGS, LEGS_TOP, PALETTE, paths, runs, WIDTH } from './sprite';
import classes from './Sprite.module.css';

/** Pixels per cell. Whole pixels, so `crispEdges` lands every edge on the grid. */
const SCALE = 4;

// The drawing never changes, so it is turned into paths once, one per colour.
const face = paths(runs(FACE));
const arms = { stand: paths(runs(ARMS.stand)), point: paths(runs(ARMS.point)) };
const legs = {
  stand: paths(runs(LEGS.stand, LEGS_TOP)),
  stepA: paths(runs(LEGS.stepA, LEGS_TOP)),
  stepB: paths(runs(LEGS.stepB, LEGS_TOP)),
};

function Cells({ cells }: { cells: ReturnType<typeof paths> }) {
  return (
    <>
      {cells.map(({ colour, d }) => (
        <path key={colour} d={d} fill={PALETTE[colour]} />
      ))}
    </>
  );
}

/**
 * The sprite (see `sprite.ts` for the drawing and why it is ours). Walking,
 * both leg frames are drawn and the stylesheet shows one at a time; pointing,
 * the left arm is up.
 */
export function Mascot({ walking = false, pointing = false }) {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      width={WIDTH * SCALE}
      height={HEIGHT * SCALE}
      shapeRendering="crispEdges"
      aria-hidden
      focusable="false"
      className={classes.sprite}
    >
      <Cells cells={face} />
      <Cells cells={pointing ? arms.point : arms.stand} />
      {walking ? (
        <>
          <g className={classes.stepA}>
            <Cells cells={legs.stepA} />
          </g>
          <g className={classes.stepB}>
            <Cells cells={legs.stepB} />
          </g>
        </>
      ) : (
        <Cells cells={legs.stand} />
      )}
    </svg>
  );
}
