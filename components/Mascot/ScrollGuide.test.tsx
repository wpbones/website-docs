import { act, fireEvent, render, screen } from '@/test-utils';
import { guideMemory } from './guide';
import {
  CARD_IN_MS,
  CORNER_IN_MS,
  LEAVE_MS,
  placeFor,
  READY_MS,
  ScrollGuide,
  SPONSOR_LINE,
  type Seen,
  type Tip,
} from './ScrollGuide';

const TIPS: Tip[] = [
  { title: 'Routing', description: 'Admin menus route to controllers.' },
  { title: 'Blade', description: 'Views are Blade templates.' },
];

describe('placeFor', () => {
  const at = (seen: Partial<Seen>, dismissed = false) =>
    placeFor({ ready: true, reached: true, others: 0, card: false, ...seen }, dismissed);

  it('is nowhere before the page is ready, or once dismissed', () => {
    expect(at({ ready: false })).toBe('none');
    expect(at({}, true)).toBe('none');
    expect(at({ card: true }, true)).toBe('none');
  });

  it('waits for the hero to be scrolled past', () => {
    expect(at({ reached: false })).toBe('none');
    expect(at({})).toBe('corner');
  });

  it('leaves the corner empty while another drawing of it is on screen', () => {
    expect(at({ others: 1 })).toBe('none');
  });

  it('goes to the Sponsors card whenever the card is in view', () => {
    expect(at({ card: true, others: 2, reached: false })).toBe('card');
  });
});

describe('ScrollGuide', () => {
  // jsdom has no IntersectionObserver. This one records what each observer
  // watches, so a test can say what came into view and what left it.
  let watches: { callback: IntersectionObserverCallback; targets: Element[] }[];

  beforeEach(() => {
    guideMemory.dismissed = false;
    guideMemory.said = -1;
    watches = [];
    globalThis.IntersectionObserver = class {
      callback: IntersectionObserverCallback;
      targets: Element[] = [];
      constructor(callback: IntersectionObserverCallback) {
        this.callback = callback;
        watches.push(this);
      }
      observe(target: Element) {
        this.targets.push(target);
      }
      disconnect() {
        this.targets = [];
      }
    } as unknown as typeof IntersectionObserver;
    jest.spyOn(window, 'matchMedia').mockImplementation(
      (query: string) =>
        ({
          matches: false,
          media: query,
          addEventListener: () => undefined,
          removeEventListener: () => undefined,
        }) as unknown as MediaQueryList
    );
    jest.spyOn(Element.prototype, 'getClientRects').mockReturnValue([{}] as unknown as DOMRectList);
    jest.useFakeTimers();
  });

  afterEach(() => {
    delete (globalThis as { IntersectionObserver?: unknown }).IntersectionObserver;
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  const wait = (ms: number) => act(() => jest.advanceTimersByTime(ms));

  function Page() {
    return (
      <div>
        <section data-guide-anchor="">Hero</section>
        <span data-mascot-spot="">Another drawing</span>
        <ScrollGuide tips={TIPS} />
        <footer>
          <div id="sponsors">
            <a href="https://github.com/sponsors/wpbones">Become a sponsor</a>
          </div>
        </footer>
      </div>
    );
  }

  /** Tells the observer watching `selector` what it sees now. */
  function see(selector: string, entry: Partial<IntersectionObserverEntry>) {
    const target = document.querySelector(selector)!;
    const watch = watches.find((w) => w.targets.includes(target))!;
    act(() =>
      watch.callback(
        [
          {
            target,
            isIntersecting: false,
            intersectionRatio: 0,
            boundingClientRect: { top: 0, bottom: 0 } as DOMRect,
            ...entry,
          } as IntersectionObserverEntry,
        ],
        watch as unknown as IntersectionObserver
      )
    );
  }

  const pastHero = () =>
    see('[data-guide-anchor]', {
      isIntersecting: false,
      boundingClientRect: { top: -900, bottom: -100 } as DOMRect,
    });

  it('comes to the corner once the hero is behind the reader, and gives tips', () => {
    render(<Page />);
    wait(READY_MS);
    expect(screen.queryByRole('button', { name: 'Show a tip' })).toBeNull();

    pastHero();
    wait(CORNER_IN_MS);
    fireEvent.click(screen.getByRole('button', { name: 'Show a tip' }));
    expect(screen.getByText(TIPS[0].description)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Next tip' }));
    expect(screen.getByText(TIPS[1].description)).toBeInTheDocument();
  });

  it('steps out of the corner while another drawing of it is on screen', () => {
    render(<Page />);
    wait(READY_MS);
    pastHero();
    wait(CORNER_IN_MS);
    expect(screen.getByRole('button', { name: 'Show a tip' })).toBeInTheDocument();

    see('[data-mascot-spot]', { isIntersecting: true });
    wait(LEAVE_MS);
    expect(screen.queryByRole('button', { name: 'Show a tip' })).toBeNull();

    see('[data-mascot-spot]', { isIntersecting: false });
    wait(CORNER_IN_MS);
    expect(screen.getByRole('button', { name: 'Show a tip' })).toBeInTheDocument();
  });

  it('stands on the Sponsors card and says the card’s own words', () => {
    render(<Page />);
    wait(READY_MS);
    see('#sponsors', { isIntersecting: true, intersectionRatio: 0.5 });
    wait(CARD_IN_MS);
    const card = document.getElementById('sponsors')!;
    expect(card).toHaveTextContent(SPONSOR_LINE);
  });

  it('goes from everywhere for good once dismissed', () => {
    render(<Page />);
    wait(READY_MS);
    see('#sponsors', { isIntersecting: true, intersectionRatio: 0.5 });
    wait(CARD_IN_MS);
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    wait(LEAVE_MS);
    expect(document.getElementById('sponsors')).not.toHaveTextContent(SPONSOR_LINE);

    see('#sponsors', { isIntersecting: false });
    pastHero();
    wait(CORNER_IN_MS);
    expect(screen.queryByRole('button', { name: 'Show a tip' })).toBeNull();
  });
});
