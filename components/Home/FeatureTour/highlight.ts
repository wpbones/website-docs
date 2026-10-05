import { createHighlighter, type ThemeRegistration } from 'shiki';
import type { Lang } from './features';

/**
 * The feature tour's code, highlighted on the server at build time: the
 * browser gets coloured HTML and no highlighter. The theme is the site's
 * palette, every colour measured on the window's ivory (#fbf8f2) at 5.1:1
 * or more:
 *
 *   text      #0e293a ink        14.2
 *   keyword   #126a88 bones-7     5.8
 *   type      #0a556e bones-8     7.8
 *   variable  #6b3fa0 violet      7.0
 *   string    #a0570b amber deep  5.1
 *   comment   #5c6b76 gray-6      5.2
 */
const theme: ThemeRegistration = {
  name: 'wpbones-light',
  type: 'light',
  colors: {
    'editor.background': '#fbf8f2',
    'editor.foreground': '#0e293a',
  },
  settings: [
    { settings: { foreground: '#0e293a' } },
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#5c6b76', fontStyle: 'italic' },
    },
    {
      scope: [
        'keyword',
        'storage',
        'storage.type',
        'storage.modifier',
        'keyword.control',
        'keyword.operator.new',
        'keyword.other',
        'entity.name.tag',
        'constant.language',
        'support.type.primitive',
      ],
      settings: { foreground: '#126a88' },
    },
    {
      scope: [
        'entity.name.type',
        'entity.name.class',
        'entity.other.inherited-class',
        'support.class',
        'entity.name.namespace',
        'support.other.namespace',
        'entity.name.type.namespace',
      ],
      settings: { foreground: '#0a556e', fontStyle: 'bold' },
    },
    {
      scope: [
        'variable',
        'variable.other',
        'variable.parameter',
        'punctuation.definition.variable',
      ],
      settings: { foreground: '#6b3fa0' },
    },
    {
      scope: ['entity.name.function', 'support.function', 'meta.function-call'],
      settings: { foreground: '#0e293a' },
    },
    {
      scope: ['string', 'constant.numeric', 'string.quoted', 'entity.other.attribute-name'],
      settings: { foreground: '#a0570b' },
    },
    {
      scope: ['entity.other.attribute-name'],
      settings: { foreground: '#126a88', fontStyle: 'italic' },
    },
  ],
};

let highlighter: ReturnType<typeof createHighlighter> | undefined;

/** One highlighter for the build, loaded with the three languages the tour shows. */
function load() {
  highlighter ??= createHighlighter({ themes: [theme], langs: ['php', 'blade', 'tsx'] });
  return highlighter;
}

/**
 * A snippet as highlighted HTML. Shiki's `php` grammar is `source.php`, so a
 * fragment of a class with no `<?php` opener highlights as PHP too (checked).
 */
export async function highlight(code: string, lang: Lang) {
  const shiki = await load();
  return shiki.codeToHtml(code, { lang, theme: 'wpbones-light' });
}
