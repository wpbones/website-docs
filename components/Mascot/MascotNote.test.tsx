import { renderToString } from 'react-dom/server';
import { MascotNote } from './MascotNote';

/**
 * Rendered to a string, as the server sends it: what a crawler and a page
 * without JavaScript get is the point of a note that carries real text.
 */
describe('MascotNote', () => {
  it('serves its words as page text, and the drawing as decoration', () => {
    const html = renderToString(
      <MascotNote label="Welcome">
        <p>
          New here? <a href="/docs/getting-started">Getting Started</a>
        </p>
      </MascotNote>
    );
    expect(html).toContain('<aside');
    expect(html).toContain('aria-label="Welcome"');
    expect(html).toContain('New here? <a href="/docs/getting-started">Getting Started</a>');
    expect(html).toMatch(/<svg[^>]*aria-hidden="true"/);
  });

  it('stands on the side it is given, and points only when asked', () => {
    const right = renderToString(
      <MascotNote side="right" pointing>
        <p>Tip</p>
      </MascotNote>
    );
    const left = renderToString(
      <MascotNote>
        <p>Tip</p>
      </MascotNote>
    );
    expect(right).toContain('data-side="right"');
    expect(left).toContain('data-side="left"');
    // The raised arm's hand is the one steel cell drawn at the sprite's left edge, row 2.
    expect(right).toMatch(/<path d="M0 2h1v1h-1z[^"]*" fill="#4f93b0"/);
    expect(left).not.toMatch(/M0 2h1/);
  });
});
