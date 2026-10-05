import { IconArrowUpRight, IconBrandWordpress } from '@tabler/icons-react';
import { Button } from '@mantine/core';
import { boilerplateList } from './List';
import classes from './Buttons.module.css';

type DemoButtonProps = {
  slug: string;
  /** As wide as its column, for the rows of `Boilerplate.Rows`. */
  fullWidth?: boolean;
};

/** The boilerplate running in WordPress Playground, from this site's own blueprint. */
export function DemoButton({ slug, fullWidth = false }: DemoButtonProps) {
  const { title } = boilerplateList[slug];

  const json = slug === 'base' ? '' : `-${slug}`;

  const hrefPlayground = `https://playground.wordpress.net/?blueprint-url=https://www.wpbones.com/wpkirk${json}-boilerplate.json`;

  return (
    <Button
      component="a"
      href={hrefPlayground}
      target="_blank"
      rel="noopener noreferrer"
      variant="filled"
      color="bones"
      size="sm"
      radius="xl"
      fullWidth={fullWidth}
      justify={fullWidth ? 'flex-start' : undefined}
      className={classes.demo}
      data-full-width={fullWidth || undefined}
      leftSection={<IconBrandWordpress size={18} />}
      rightSection={<IconArrowUpRight size={16} />}
    >
      See {title} in action
    </Button>
  );
}
