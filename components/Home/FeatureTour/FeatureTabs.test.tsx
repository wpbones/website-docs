import { renderToString } from 'react-dom/server';
import { fireEvent, render, screen } from '@/test-utils';
import { FEATURES } from './features';
import { FeatureTabs, type TourFeature } from './FeatureTabs';

/** The tour's own data, with each file's code standing in for its highlighted HTML. */
const features: TourFeature[] = FEATURES.map((feature) => ({
  ...feature,
  files: feature.files.map((file) => ({ name: file.name, html: `<pre>${file.name}</pre>` })),
}));

describe('FeatureTabs', () => {
  it('serves every tab’s panel, so a crawler gets every snippet', () => {
    const html = renderToString(<FeatureTabs features={features} />);
    for (const feature of features) {
      expect(html).toContain(`<pre>${feature.files[0].name}</pre>`);
    }
  });

  it('opens a tab on click, and shows its command and its docs link', () => {
    render(<FeatureTabs features={features} />);
    const eloquent = FEATURES.find((f) => f.id === 'eloquent')!;
    fireEvent.click(screen.getByRole('tab', { name: eloquent.label }));
    expect(screen.getByRole('tab', { name: eloquent.label })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByRole('tabpanel')).toHaveTextContent(eloquent.command!);
    expect(screen.getByRole('link', { name: /Read the docs/ })).toHaveAttribute(
      'href',
      eloquent.href
    );
  });

  it('moves along the tabs with the arrow keys', () => {
    render(<FeatureTabs features={features} />);
    const first = screen.getByRole('tab', { name: FEATURES[0].label });
    fireEvent.keyDown(first, { key: 'ArrowRight' });
    expect(screen.getByRole('tab', { name: FEATURES[1].label })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    fireEvent.keyDown(screen.getByRole('tab', { name: FEATURES[1].label }), { key: 'End' });
    expect(screen.getByRole('tab', { name: FEATURES.at(-1)!.label })).toHaveFocus();
  });

  it('turns to the next tab when the mascot is clicked', () => {
    render(<FeatureTabs features={features} />);
    fireEvent.click(screen.getByRole('button', { name: `Next feature: ${FEATURES[1].label}` }));
    expect(screen.getByRole('tab', { name: FEATURES[1].label })).toHaveAttribute(
      'aria-selected',
      'true'
    );
  });

  it('names a docs page and a command, or says it has none, for every tab', () => {
    for (const feature of FEATURES) {
      expect(feature.href).toMatch(/^\/docs\//);
      expect(feature.files.length).toBeGreaterThan(0);
      if (feature.command) {
        expect(feature.command).toMatch(/^php bones (make|migrate):/);
      }
      // The mascot's tips are these lines: kept short enough for its bubble.
      expect(feature.blurb.length).toBeLessThanOrEqual(160);
    }
  });
});
