import { Marquee } from '@gfazioli/mantine-marquee';
import { Anchor } from 'nextra/components';
import { Button, Stack, Title } from '@mantine/core';

export const Content = () => {
  return (
    <Stack align="center" my={32}>
      <Title>You may use third-party components in your project</Title>

      <Anchor href="https://mantine-extensions.vercel.app/">
        Visit the Mantine Extension Hub for more components
      </Anchor>

      <Marquee fadeEdges pauseOnHover>
        <Button
          size="xl"
          component="a"
          href="https://gfazioli.github.io/mantine-marquee/"
          target="_blank"
        >
          Mantine Marquee
        </Button>
        <Button
          size="xl"
          component="a"
          href="https://gfazioli.github.io/mantine-reflection/"
          target="_blank"
        >
          Mantine Reflection
        </Button>
        <Button
          size="xl"
          component="a"
          href="https://gfazioli.github.io/mantine-split-pane/"
          target="_blank"
        >
          Mantine Split Pane
        </Button>
        <Button
          size="xl"
          component="a"
          href="https://gfazioli.github.io/mantine-spinner/"
          target="_blank"
        >
          Mantine Spinner
        </Button>
        <Button
          size="xl"
          component="a"
          href="https://gfazioli.github.io/mantine-parallax/"
          target="_blank"
        >
          Mantine Parallax
        </Button>
      </Marquee>
    </Stack>
  );
};
