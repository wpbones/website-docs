import { Group } from '@mantine/core';
import { IconCoffee, IconHeartFilled } from '@tabler/icons-react';

// No `index` key: the home page is app/page.ts, which Nextra's page map does
// not see (see there), so there is no entry to hide and a key for it fails the
// build ("refers to a page that cannot be found").
export default {
  docs: {
    type: 'page',
    title: 'Documentation',
  },
  community: {
    title: 'Community',
    type: 'menu',
    items: {
      blog: {
        title: 'Blog',
        href: 'https://wpbones.substack.com/',
      },
      medium: {
        title: 'Discord',
        href: 'https://discord.gg/5bdVyycU8F',
      },
    },
  },
  about: {
    type: 'page',
    title: 'About',
    href: 'https://gfazioli.github.io/',
  },
  support: {
    title: 'Support',
    type: 'menu',
    items: {
      // Scrolls to the on-page Sponsors section (footer) — internal anchor,
      // so Nextra shows no external arrow.
      sponsor: {
        title: (
          <Group component="span" gap={8} wrap="nowrap" align="center">
            <IconHeartFilled size={16} />
            Sponsor
          </Group>
        ),
        href: '#sponsors',
      },
      // External donation link — Nextra keeps the ↗ external indicator.
      coffee: {
        title: (
          <Group component="span" gap={8} wrap="nowrap" align="center">
            <IconCoffee size={16} />
            Buy me a coffee
          </Group>
        ),
        href: 'https://donate.stripe.com/fZu4gy4Tn3b1dgudGx0co00',
      },
    },
  },
};
