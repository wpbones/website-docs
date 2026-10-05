import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs';
import { MascotNote } from '@/components/Mascot/MascotNote';

// MascotNote is available in every page without an import: the mascot's
// asides in the docs (components/Mascot/MascotNote.tsx).
const docsComponents = { ...getDocsMDXComponents(), MascotNote };

export const useMDXComponents = (components?: any): any => ({
  ...docsComponents,
  ...components,
});
