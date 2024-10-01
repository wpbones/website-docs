"use client";

import { Button } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import classes from "./HomeContent.module.css";

export function ActionButton() {
  return (
    <Button
      color="orange"
      component="a"
      href="https://playground.wordpress.net/?blueprint-url=https://wpbones.com/wpkirk-demo.json"
      variant="gradient"
      size="xl"
      gradient={{ from: "orange", to: "violet", deg: 45 }}
      className={classes.buttonAction}
      radius={"xl"}>
      See WP Bones Plugin demo in action <IconExternalLink style={{ marginLeft: 10 }} />
    </Button>
  );
}
