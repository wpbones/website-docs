'use client';

import { Navbar } from 'nextra-theme-docs';
import { Button, Group } from '@mantine/core';
import { IconHeartFilled } from '@tabler/icons-react';
import { ColorSchemeControl } from '../ColorSchemeControl/ColorSchemeControl';
import { Logo } from '../Logo/Logo';
import { MantineNextraThemeObserver } from '../MantineNextraThemeObserver/MantineNextraThemeObserver';

/**
 * You can customize the Nextra NavBar component.
 * Don't forget to use the MantineProvider and MantineNextraThemeObserver components.
 *
 * @since 1.0.0
 *
 */
export const MantineNavBar = () => {
  return (
    <>
      <MantineNextraThemeObserver />
      <Navbar
        logo={
          <Group align="center" gap={4}>
            <Logo />
          </Group>
        }
        // Mantine discord server
        chatLink="https://discord.gg/5bdVyycU8F"
        projectLink="https://github.com/wpbones/wpbones"
      >
        <>
          <ColorSchemeControl />
          <Button
            component="a"
            href="#sponsors"
            size="sm"
            radius="xl"
            variant="gradient"
            gradient={{ from: 'pink', to: 'grape' }}
            leftSection={<IconHeartFilled size={14} />}
          >
            Sponsor
          </Button>
        </>
      </Navbar>
    </>
  );
};
