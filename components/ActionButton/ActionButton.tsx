"use client";

import { Button, MantineColor } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import classes from "./ActionButton.module.css";

type AvailableDemos =
  | "demo"
  | "api-boilerplate"
  | "boilerplate"
  | "cron-boilerplate"
  | "cpt-boilerplate"
  | "database-boilerplate"
  | "hooks-boilerplate"
  | "internationalization-boilerplate"
  | "mantine-boilerplate"
  | "reactjs-boilerplate"
  | "routes-boilerplate"
  | "typescript-boilerplate";

interface ActionButtonProps {
  demo?: AvailableDemos;
  colorFrom?: MantineColor;
  colorTo?: MantineColor;
  layout?: "default" | "square";
  title?: string;
}

export function ActionButton({
  demo = "demo",
  colorFrom = "orange",
  colorTo = "violet",
  layout = "default",
  title,
}: ActionButtonProps) {
  const sanitizeDemo = demo.charAt(0).toUpperCase() + demo.replace("-boilerplate", "").slice(1);

  const titleText = title || `See WP Bones Plugin ${sanitizeDemo} in action`;

  return (
    <Button
      color="orange"
      component="a"
      href={`https://playground.wordpress.net/?blueprint-url=https://www.wpbones.com/wpkirk-${demo}.json`}
      variant="gradient"
      size="xl"
      data-layout={layout}
      gradient={{ from: colorFrom, to: colorTo, deg: 45 }}
      className={classes.buttonAction}
      rightSection={<IconExternalLink />}
      radius={"xl"}>
      {titleText}
    </Button>
  );
}
