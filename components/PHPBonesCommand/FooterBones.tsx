import NextImage from 'next/image';
import { Flex, Image } from '@mantine/core';
import footer from './footer-removebg.png';

export function FooterBones() {
  return (
    <Flex
      component="a"
      href="/docs"
      justify="center"
      style={{
        overflow: 'hidden',
        height: '300px',
      }}
    >
      <Flex>
        <Image
          component={NextImage}
          mx="auto"
          maw="1272px"
          fit="fill"
          src={footer}
          alt="PHP Bones"
        />
      </Flex>
    </Flex>
  );
}
