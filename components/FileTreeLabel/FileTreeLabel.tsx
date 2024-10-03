import { Anchor, Code, Group } from "@mantine/core";
import { IconCornerRightDown } from "@tabler/icons-react";
import React from "react";

import "@mantine/core/styles.css";

type FileTreeLabelProps = {
  name: string;
  type: "folder" | "file";
  children: React.ReactNode;
  color: string;
  href: string;
  target: string;
};

export function FileTreeLabel({
  name,
  type = "folder",
  children,
  color = "green",
  href,
  target = "_self",
}: FileTreeLabelProps) {
  return (
    <Group align="left">
      {href ? (
        <Anchor href={href} target={target} color="blue">
          {name}
        </Anchor>
      ) : (
        name
      )}
      {type === "folder" && <IconCornerRightDown size={20} color="grey" />}
      {children && (
        <Code fz={12} color={color} px={8}>
          {children}
        </Code>
      )}
    </Group>
  );
}
