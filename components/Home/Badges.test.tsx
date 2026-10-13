import { render, screen } from '@/test-utils';
import { StarsBadge } from './Badges';
import { GITHUB_URL } from './links';

describe('StarsBadge', () => {
  it('links to the repository and reads as one sentence, count included', () => {
    // The digits that roll are generated content: the link's text has to be
    // the count once, for a crawler and a screen reader, never "0123456789".
    render(<StarsBadge stars={1234} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', GITHUB_URL);
    expect(link.textContent).toBe('Star us on GitHub 1,234 stars');
  });

  it('is the same badge without a number when GitHub gave none', () => {
    render(<StarsBadge stars={null} />);
    const link = screen.getByRole('link');
    expect(link.textContent).toBe('Star us on GitHub');
    expect(link.querySelector('[style*="--d"]')).toBeNull();
  });
});
