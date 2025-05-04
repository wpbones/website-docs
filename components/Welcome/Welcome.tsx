import { TextAnimate } from '@gfazioli/mantine-text-animate';
import { Button, Center, Flex, Group, Stack, Text } from '@mantine/core';
import { Demo } from '../Boilerplate/Demo';
import { Features } from '../Features/Features';
import { PHPBonesCommand } from '../PHPBonesCommand';
import { ProductHuntBadge } from '../ProductHuntBadge/ProductHuntBadge';
import { RaycastExtension } from '../Raycast/RaycastExtension';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <Stack justify="center">
      <Text
        maw="80vw"
        component="span"
        mx="auto"
        className={classes.title}
        ta="center"
        mt={100}
        lh={1}
        fz={{ base: 48, md: 64, lg: 92 }}
        fw={900}
        variant="gradient"
        gradient={{ from: 'blue', to: 'violet', deg: 90 }}
      >
        WP Bones allows for WordPress plugins with{' '}
        <TextAnimate
          animate="in"
          by="character"
          inherit
          variant="gradient"
          component="span"
          segmentDelay={0.2}
          duration={2}
          animation="scale"
          animateProps={{
            scaleAmount: 3,
          }}
          gradient={{ from: 'pink', to: 'yellow' }}
        >
          Laravel-like features
        </TextAnimate>
      </Text>

      <Group justify="center">
        <ProductHuntBadge mode="neutral" />
      </Group>

      <Center w={{ base: 400, sm: 600, lg: 800 }} mx="auto" my={24}>
        <PHPBonesCommand initialRotationX={16} />
      </Center>

      <Demo.Marquee />

      <Text my="xl" ta="center" fz={24}>
        Streamlines and modernizes WordPress plugin development.
      </Text>

      <Group justify="space-evenly">
        <Flex>
          <Button
            component="a"
            href="/docs"
            size="xl"
            radius="xl"
            variant="gradient"
            className={classes.buttonDocs}
            gradient={{ from: 'blue', to: 'violet', deg: 45 }}
          >
            Get started with the Docs →
          </Button>
        </Flex>
        <Flex>
          <Button
            component="a"
            href="https://wpbones.ownai.com/"
            size="xl"
            radius="xl"
            variant="gradient"
            className={classes.buttonChat}
            gradient={{ from: 'teal', to: 'lime', deg: 45 }}
          >
            Chat with WP Bones AI →
          </Button>
        </Flex>
      </Group>

      <Features />

      <RaycastExtension />
    </Stack>
  );
}
