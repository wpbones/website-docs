"use client";

import { Button, MantineColor } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import classes from "./ActionButton.module.css";

type AvailableDemos =
  | "demo"
  | "boilerplate"
  | "api-boilerplate"
  | "mantine-boilerplate"
  | "reactjs-boilerplate"
  | "routes-boilerplate"
  | "database-boilerplate"
  | "internationalization-boilerplate";

interface ActionButtonProps {
  demo?: AvailableDemos;
  colorFrom?: MantineColor;
  colorTo?: MantineColor;
  layout?: "default" | "square";
}

export function ActionButton({
  demo = "demo",
  colorFrom = "orange",
  colorTo = "violet",
  layout = "default",
}: ActionButtonProps) {
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
      See WP Bones Plugin {demo} in action
    </Button>
  );
}
