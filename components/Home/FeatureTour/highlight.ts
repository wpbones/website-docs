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
 * Shiki writes every token's colour as an inline style, and the page carries
 * each snippet twice (the HTML and the RSC payload): 555 style attributes and
 * 200 KB of the home page's HTML (measured on the first build). Each of the
 * theme's styles becomes a one-letter class instead, coloured in
 * FeatureTabs.module.css, and the default ink becomes no attribute at all, as
 * the window sets it. A style not in this map is left inline, so a new scope
 * still shows, only heavier.
 */
const CLASSES: Record<string, string> = {
  'color:#0E293A': '',
  'color:#126A88': 'k',
  'color:#0A556E;font-weight:bold': 't',
  'color:#6B3FA0': 'v',
  'color:#A0570B': 's',
  'color:#5C6B76;font-style:italic': 'c',
  'color:#126A88;font-style:italic': 'a',
};

function compact(html: string) {
  return html
    .replace(/ style="background-color:#fbf8f2;color:#0e293a"/, '')
    .replace(/<span style="([^"]*)">/g, (whole, style: string) => {
      const name = CLASSES[style];
      if (name === undefined) {
        return whole;
      }
      return name ? `<span class="${name}">` : '<span>';
    });
}

/**
 * A snippet as highlighted HTML. Shiki's `php` grammar is `source.php`, so a
 * fragment of a class with no `<?php` opener highlights as PHP too (checked).
 */
export async function highlight(code: string, lang: Lang) {
  const shiki = await load();
  return compact(shiki.codeToHtml(code, { lang, theme: 'wpbones-light' }));
}
