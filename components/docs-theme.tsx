import { Button, DEFAULT_THEME } from '@mantine/core';
import classes from './docs-theme.module.css';

export const docsTheme = {
  fontFamily: 'Poppins, sans-serif',
  fontFamilyMonospace: 'Fira Code, Monaco, Courier, monospace',
  headings: {
    // Use default theme if you want to provide default Mantine fonts as a fallback
    fontFamily: `Poppins, ${DEFAULT_THEME.fontFamily}`,
  },
  components: {
    Button: Button.extend({ classNames: classes }),
  },
};
