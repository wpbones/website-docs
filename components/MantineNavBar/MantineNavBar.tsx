'use client';

import { Navbar } from 'nextra-theme-docs';
import { ActionIcon, Group, Tooltip } from '@mantine/core';
import { IconCoffee, IconHeartFilled } from '@tabler/icons-react';
import { Logo } from '../Logo/Logo';

/**
 * Nextra's navbar with the WP Bones logo. No colour-scheme switch: the site
 * is light only (app/layout.tsx).
 */
export const MantineNavBar = () => {
  return (
    <Navbar
      logo={
        <Group align="center" gap={4}>
          <Logo />
        </Group>
      }
      chatLink="https://discord.gg/5bdVyycU8F"
      projectLink="https://github.com/wpbones/wpbones"
    >
      {/*
        One Group rather than a Fragment: Nextra's Navbar maps its children
        without keys, and fragmented siblings fire React 19's "unique key"
        warning (measured on findergit.app).
      */}
      <Group gap="sm" wrap="nowrap">
        {/* WP Bones' own GitHub Sponsors profile, not the author's personal one. */}
        <Tooltip label="Sponsor WP Bones" withArrow>
          <ActionIcon
            component="a"
            href="https://github.com/sponsors/wpbones"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            radius="xl"
            variant="gradient"
            // Shade 7: white on pink-6 is 3.7:1 and on grape-6 4.0:1.
            gradient={{ from: 'pink.7', to: 'grape.7' }}
            aria-label="Sponsor WP Bones"
          >
            <IconHeartFilled size={16} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Buy me a coffee" withArrow>
          <ActionIcon
            component="a"
            href="https://donate.stripe.com/fZu4gy4Tn3b1dgudGx0co00"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            radius="xl"
            variant="filled"
            color="yellow"
            aria-label="Buy me a coffee"
            // Dark ink on the yellow: white on yellow-6 is 1.9:1.
            styles={{ root: { color: '#3b2600' } }}
          >
            <IconCoffee size={16} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Navbar>
  );
};
