import { Box } from '@mantine/core';
import classes from './Background.module.css';

export function Background() {
  return (
    <Box className={classes.background} h={600}>
      <svg
        className={classes.waves}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="1440"
        height="560"
        preserveAspectRatio="none"
        viewBox="0 0 1440 560"
      >
        <g mask='url("#wpbones-mask")' fill="none">
          <rect width="100%" height="300" x="0" y="0" fill="var(--mantine-color-violet-9)" />
          <path
            d="M 0,37 C 72,79.4 216,235.8 360,249 C 504,262.2 576,103 720,103 C 864,103 936,244.6 1080,249 C 1224,253.4 1368,149.8 1440,125L1440 560L0 560z"
            fill="var(--mantine-color-violet-3)"
          />
          <path
            d="M 0,356 C 144,384.4 432,513 720,498 C 1008,483 1296,324.4 1440,281L1440 560L0 560z"
            fill="var(--mantine-color-body)"
          />
        </g>
        <defs>
          <mask id="wpbones-mask">
            <rect width="1440" height="560" fill="var(--mantine-color-white)" />
          </mask>
        </defs>
      </svg>
    </Box>
  );
}
