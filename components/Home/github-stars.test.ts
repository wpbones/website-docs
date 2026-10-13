/**
 * @jest-environment node
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fetchStars, formatStars, STARS_REVALIDATE } from './github-stars';

const answer = (status: number, body: unknown = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const authorization = (init?: RequestInit) =>
  (init?.headers as Record<string, string> | undefined)?.Authorization;

describe('fetchStars', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('reads the count from the repository, with the token when there is one', async () => {
    const fetcher = jest.fn(async () => answer(200, { stargazers_count: 171 }));
    await expect(fetchStars(fetcher, 'secret')).resolves.toBe(171);
    expect(fetcher).toHaveBeenCalledTimes(1);
    const [url, init] = fetcher.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://api.github.com/repos/wpbones/wpbones');
    expect(authorization(init)).toBe('Bearer secret');
  });

  it('asks again anonymously when GitHub refuses the token', async () => {
    for (const refused of [401, 403]) {
      const fetcher = jest
        .fn()
        .mockResolvedValueOnce(answer(refused))
        .mockResolvedValueOnce(answer(200, { stargazers_count: 5 }));
      await expect(fetchStars(fetcher, 'expired')).resolves.toBe(5);
      expect(authorization(fetcher.mock.calls[1][1])).toBeUndefined();
    }
  });

  it('caches the answer for as long as the page', async () => {
    // The fetch's own revalidate, and the page's: a shorter one on either
    // would render the whole home page again more often than once a day.
    const fetcher = jest.fn(async () => answer(200, { stargazers_count: 1 }));
    await fetchStars(fetcher, undefined);
    expect(fetcher.mock.calls[0]).toEqual([
      expect.any(String),
      expect.objectContaining({ next: { revalidate: STARS_REVALIDATE } }),
    ]);
    const page = readFileSync(join(__dirname, '../../app/page.ts'), 'utf8');
    expect(page).toContain(`export const revalidate = ${STARS_REVALIDATE};`);
  });

  it('gives no count, never a made-up one, when GitHub does not give one', async () => {
    const limited = jest.fn(async () => answer(403, { message: 'API rate limit exceeded' }));
    await expect(fetchStars(limited, undefined)).resolves.toBeNull();

    const down = jest.fn(async () => {
      throw new TypeError('fetch failed');
    });
    await expect(fetchStars(down, undefined)).resolves.toBeNull();

    for (const body of [{}, { stargazers_count: '171' }, { stargazers_count: -1 }]) {
      const odd = jest.fn(async () => answer(200, body));
      await expect(fetchStars(odd, undefined)).resolves.toBeNull();
    }
  });
});

describe('formatStars', () => {
  it('groups thousands as the page is written, in English', () => {
    expect(formatStars(171)).toBe('171');
    expect(formatStars(1234)).toBe('1,234');
  });
});
