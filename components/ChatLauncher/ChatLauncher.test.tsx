import { render, screen, userEvent } from '@/test-utils';
import { ChatLauncher } from './ChatLauncher';

/**
 * The point of the component is what does NOT happen: no chat script on the
 * page until the visitor asks for it, because the widget sets cookies as soon
 * as it loads.
 */
describe('ChatLauncher', () => {
  const chatScripts = () =>
    [...document.querySelectorAll('script')].filter((s) => s.src.includes('openwidget'));

  afterEach(() => {
    chatScripts().forEach((s) => s.remove());
    delete window.__ow;
    delete window.OpenWidget;
  });

  it('loads nothing until it is clicked', () => {
    render(<ChatLauncher />);
    expect(screen.getByRole('button', { name: 'Open the chat' })).toBeInTheDocument();
    expect(chatScripts()).toHaveLength(0);
    expect(window.__ow).toBeUndefined();
  });

  it('injects the chat script once, on the first click', async () => {
    render(<ChatLauncher />);
    const button = screen.getByRole('button', { name: 'Open the chat' });
    await userEvent.click(button);
    await userEvent.click(button);
    expect(chatScripts()).toHaveLength(1);
    expect(window.__ow?.organizationId).toBe('3ab47060-f156-47ce-8ebb-750902b310c2');
  });
});
