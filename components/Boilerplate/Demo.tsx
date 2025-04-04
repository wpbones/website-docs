"use client";

import { Button, MantineColor } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import { boilerplateList } from "./List";

type DemoButtonProps = {
  slug: string;
  colorFrom?: MantineColor;
  colorTo?: MantineColor;
  layout?: "default" | "square";
  justify?: React.CSSProperties["justifyContent"];
};

function DemoButton({
  slug,
  colorFrom = "orange",
  colorTo = "violet",
  layout = "default",
  justify = "space-between",
}: DemoButtonProps) {
  const { name, icon, mostUsed, title, owner = "wpbones" } = boilerplateList[slug];

  const json = slug === "base" ? "" : `-${slug}`;

  const hrefPlayground = `https://playground.wordpress.net/?blueprint-url=https://www.wpbones.com/wpkirk${json}-boilerplate.json`;

  return (
    <Button
      color="blue"
      component="a"
      href={hrefPlayground}
      variant="gradient"
      size="sm"
      data-layout={layout}
      gradient={{ from: "blue", to: colorTo, deg: 45 }}
      rightSection={<IconExternalLink size={18} />}
      radius={"xl"}>
      See {title} in Action
    </Button>
  );
}

function DemoButtons({ column = 2 }) {
  return Object.keys(boilerplateList).map(slug => <DemoButton key={slug} slug={slug} />);
}

export const Demo = {
  Button: DemoButton,
  Buttons: DemoButtons,
};
