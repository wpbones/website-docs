"use client";

import { Badge, Button, Group, MantineColor } from "@mantine/core";
import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react";
import { boilerplateList } from "./List";

type BoilerplateDemoButtonProps = {
  slug: string;
  colorFrom?: MantineColor;
  colorTo?: MantineColor;
  layout?: "default" | "square";
  justify?: React.CSSProperties["justifyContent"];
};

export function BoilerplateDemoButton({
  slug,
  colorFrom = "orange",
  colorTo = "violet",
  layout = "default",
  justify = "space-between",
}: BoilerplateDemoButtonProps) {
  const { name, icon, mostUsed, title, owner = "wpbones" } = boilerplateList[slug];

  const hrefGitHub = `https://github.com/new?template_name=${name}&template_owner=${owner}`;

  const hrefPlayground = `https://playground.wordpress.net/?blueprint-url=https://www.wpbones.com/wpkirk-${slug}-boilerplate.json`;

  return (
    <Group my="md" justify={justify}>
      <Button
        color="orange"
        component="a"
        href={hrefGitHub}
        variant="gradient"
        size="sm"
        data-layout={layout}
        gradient={{ from: "dark", to: colorTo, deg: 45 }}
        leftSection={<IconBrandGithub size={18} />}
        radius={"xl"}>
        {mostUsed ? (
          <Group gap={4}>
            <Badge color="lime" fz={10} size="xs">
              Most used
            </Badge>
            {title}
          </Group>
        ) : (
          `${title} on GitHub`
        )}
      </Button>
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
    </Group>
  );
}

function AllBoilerplateDemoButton() {
  return (
    <>
      {Object.keys(boilerplateList).map(slug => (
        <BoilerplateDemoButton key={slug} slug={slug} />
      ))}
    </>
  );
}

BoilerplateDemoButton.All = AllBoilerplateDemoButton;
