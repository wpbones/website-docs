import { Group } from '@mantine/core';
import { IconCoffee, IconHeartFilled } from '@tabler/icons-react';

export default {
  index: {
    display: 'hidden',
  },
  docs: {
    type: 'page',
    title: 'Documentation',
  },
  wpbones_ai: {
    type: 'page',
    title: 'WP Bones AI',
    href: 'https://wpbones.ownai.com/',
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
