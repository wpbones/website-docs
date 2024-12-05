"use client";

import { Parallax, ParallaxProps } from "@gfazioli/mantine-parallax";
import { Box, Flex, Image, MantineColor, useMantineTheme } from "@mantine/core";
import NextImage from "next/image";
import phpBonesCommands from "./php-bones-commands.png";
import phpBonesTitle from "./php-bones-title.png";

function WindowButton({ color = "red" }: { color?: MantineColor }) {
  const theme = useMantineTheme();
  return (
    <Box
      style={{
        background: theme.colors[color][6],
        width: "12px",
        height: "12px",
        borderRadius: 256,
      }}
    />
  );
}

export function PHPBonesCommand(props: ParallaxProps) {
  return (
    <Parallax
      contentParallax
      threshold={20}
      contentParallaxDistance={0.5}
      p={16}
      pt={32}
      style={{
        background: "rgba(0, 0, 0, 1)",
        borderRadius: "8px",
        boxShadow: "0 0 20px rgba(255, 255, 255, 0.1), 0 0 10px rgba(255, 0, 255, 0.1)",
      }}
      {...props}>
      <Box
        style={{
          position: "absolute",
          top: -20,
        }}>
        <Flex gap={8}>
          <WindowButton />
          <WindowButton color="yellow" />
          <WindowButton color="green" />
        </Flex>
      </Box>
      <Image component={NextImage} mx="auto" maw="1024px" fit="fill" src={phpBonesTitle} alt="PHP Bones" />
      <Image component={NextImage} mx="auto" maw="1024px" fit="fill" src={phpBonesCommands} alt="PHP Bones" />
    </Parallax>
  );
}
