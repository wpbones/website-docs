"use client";

import { AnimateBadge } from "@components";
import { Group } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { Cards } from "nextra/components";
import ReactElement from "react";
import { boilerplateList, BoilerplateSlugs } from "./List";

type BoilerplateProps = {
  column?: number;
  display?: BoilerplateSlugs[];
  title?: Record<string, string | JSX.Element>;
};

export function Boilerplate({ column = 2, display = [], title: overrideTitle }: BoilerplateProps) {
  return (
    <Cards num={column}>
      {Object.entries(boilerplateList)
        .filter(([key]) => display.length === 0 || display.includes(key as BoilerplateSlugs))
        .map(([key, value]) => {
          const { icon = <IconBrandGithub />, title, highlight, name, owner = "wpbones" } = value;

          function Title() {
            if (overrideTitle && overrideTitle[key]) {
              return overrideTitle[key];
            }

            if (highlight) {
              return (
                <Group>
                  <AnimateBadge />
                  {title}
                </Group>
              );
            }
            return title;
          }

          const href = `https://github.com/new?template_name=${value.name}&template_owner=${owner}`;

          return <Cards.Card key={key} arrow icon={icon} title={(<Title />) as ReactElement} href={href} />;
        })}
    </Cards>
  );
}
