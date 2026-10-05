'use client';

import { IconArrowUpRight, IconBrandWordpress } from '@tabler/icons-react';
import { Button } from '@mantine/core';
import classes from './ActionButton.module.css';

type AvailableDemos =
  | 'demo'
  | 'api-boilerplate'
  | 'boilerplate'
  | 'blade-boilerplate'
  | 'cron-boilerplate'
  | 'cpt-boilerplate'
  | 'database-boilerplate'
  | 'hooks-boilerplate'
  | 'internationalization-boilerplate'
  | 'mantine-boilerplate'
  | 'options-boilerplate'
  | 'packages-boilerplate'
  | 'reactjs-boilerplate'
  | 'routes-boilerplate'
  | 'typescript-boilerplate';

interface ActionButtonProps {
  demo?: AvailableDemos;
  title?: string;
}

/**
 * A demo in WordPress Playground, as a large button: the same filled bones
 * blue as the boilerplate demo buttons (Boilerplate/DemoButton), where it was
 * an orange-to-violet gradient with a red glow.
 */
export function ActionButton({ demo = 'demo', title }: ActionButtonProps) {
  const sanitizeDemo = demo.charAt(0).toUpperCase() + demo.replace('-boilerplate', '').slice(1);

  const titleText = title || `See WP Bones Plugin ${sanitizeDemo} in action`;

  return (
    <Button
      component="a"
      href={`https://playground.wordpress.net/?blueprint-url=https://www.wpbones.com/wpkirk-${demo}.json`}
      target="_blank"
      rel="noopener noreferrer"
      variant="filled"
      color="bones"
      size="lg"
      radius="xl"
      className={classes.buttonAction}
      leftSection={<IconBrandWordpress size={20} />}
      rightSection={<IconArrowUpRight size={18} />}
    >
      {titleText}
    </Button>
  );
}
