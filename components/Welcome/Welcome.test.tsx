import { render, screen } from '@/test-utils';
import { Welcome } from './Welcome';

describe('Welcome component', () => {
  it('check card page', () => {
    render(<Welcome />);
    expect(screen.getByText('Pages')).toBeInTheDocument();
  });
});
