'use client';

import NextImage from 'next/image';
import { Center, Group, Image, List } from '@mantine/core';
import { HomeCard } from '../HomeCard';
import raycast from './raycast.png';

export function RaycastExtension() {
  return (
    <Center my={64}>
      <HomeCard
        title="If you love ❤️ Raycast, you will love the WP Bones extension too!"
        href="https://www.raycast.com/Undolog/wp-bones"
        icon={
          <Image
            component={NextImage}
            mx="auto"
            w="64px"
            fit="fill"
            src={raycast}
            alt="PHP Bones"
          />
        }
        description={
          <Group justify="space-between" align="center" mx={12}>
            <List mt={16} icon="✨">
              <List.Item>Search in documentation</List.Item>
              <List.Item>Read the abstract and Open in the browser</List.Item>
              <List.Item>Search plugin template</List.Item>
            </List>
            <List mt={16} icon="✨">
              <List.Item>Direct link to create a WP Bones Plugin</List.Item>
              <List.Item>Menu Bar to check the latest version</List.Item>
              <List.Item>Useful Links to Issue, FAQs and more</List.Item>
            </List>
          </Group>
        }
      />
    </Center>
  );
}
