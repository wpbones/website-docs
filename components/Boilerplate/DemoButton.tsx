import { IconExternalLink } from '@tabler/icons-react';
import { Button, MantineColor } from '@mantine/core';
import { boilerplateList } from './List';

type DemoButtonProps = {
  slug: string;
  colorFrom?: MantineColor;
  colorTo?: MantineColor;
  layout?: 'default' | 'square';
  justify?: React.CSSProperties['justifyContent'];
};

export function DemoButton({
  slug,
  colorFrom = 'blue.9',
  colorTo = 'blue.6',
  layout = 'default',
}: DemoButtonProps) {
  const { title } = boilerplateList[slug];

  const json = slug === 'base' ? '' : `-${slug}`;

  const hrefPlayground = `https://playground.wordpress.net/?blueprint-url=https://www.wpbones.com/wpkirk${json}-boilerplate.json`;

  return (
    <Button
      color="blue"
      component="a"
      href={hrefPlayground}
      variant="gradient"
      size="sm"
      data-layout={layout}
      gradient={{ from: colorFrom, to: colorTo, deg: 45 }}
      rightSection={<IconExternalLink size={18} />}
      radius="xl"
    >
      See {title} in Action
    </Button>
  );
}
