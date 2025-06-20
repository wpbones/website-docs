'use client';

import { Navbar } from 'nextra-theme-docs';
import { Group } from '@mantine/core';
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
          <iframe
            src="https://github.com/sponsors/wpbones/button"
            title="Sponsor WP Bones"
            height="32"
            width="114"
            style={{ border: 0, borderRadius: '6px' }}
          />
        </>
      </Navbar>
    </>
  );
};
