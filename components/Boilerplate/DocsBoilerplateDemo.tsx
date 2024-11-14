"use client";

import { Group } from "@mantine/core";
import { Boilerplate } from "./Boilerplate";
import { Demo } from "./Demo";

type DocsBoilerplateDemoProps = {
  slug: string;
};

export function DocsBoilerplateDemo({ slug }: DocsBoilerplateDemoProps) {
  return (
    <Group justify="space-between">
      <Boilerplate.Button slug={slug} />
      <Demo.Button slug={slug} />
    </Group>
  );
}
