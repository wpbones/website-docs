"use client";

import { ActionIcon, Anchor, Container, Divider, Grid, Group, Image, Stack, Text, Title } from "@mantine/core";
import {
  IconBrandDiscordFilled,
  IconBrandGithubFilled,
  IconBrandNextjs,
  IconBrandVercel,
  IconBrandX,
  IconMailHeart,
} from "@tabler/icons-react";

import NextImage from "next/image";
import { AnimateBadge } from "../AnimateBadge";
import wpBonesLogo from "../wpbones-logo.png";
import classes from "./Footer.module.css";
import { ecosystem, highlights, resources } from "./links";

type FooterProps = {};

type VerticalLink = {
  key: string;
  title: string;
  href: string;
  newWindow?: boolean;
  new?: boolean;
};

const VerticalLinks = ({ list }: { list: VerticalLink[] }) => {
  return (
    <>
      {list.map(item => (
        <Group key={item.key}>
          <Anchor className={classes.columnAnchor} href={item.href} target={item.newWindow ? "_blank" : ""}>
            {item.title}
          </Anchor>
          {item.new && <AnimateBadge />}
        </Group>
      ))}
    </>
  );
};

export const Footer: React.FC<FooterProps> = () => {
  return (
    <div className={classes.contentFooter}>
      <Container className={classes.footer} size="lg">
        <Grid grow>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Stack gap="xs">
              <Image component={NextImage} w={32} h={32} fit="contain" src={wpBonesLogo} alt="WP Bones" />
              <Text fz={12} mr={64}>
                WP Bones is a little Framework providing a set of tools and rules to facilitate the WordPress plugin.
                The aim of Bones is to be able to write a Plugin such as Laravel Framework application.
              </Text>
              <Group>
                <ActionIcon variant="subtle" component="a" href="https://twitter.com/wpbonesx">
                  <IconBrandX size={24} />
                </ActionIcon>
                <ActionIcon variant="subtle" component="a" href="https://github.com/wpbones/WPBones">
                  <IconBrandGithubFilled size={24} />
                </ActionIcon>
                <ActionIcon variant="subtle" component="a" href="https://discord.gg/5bdVyycU8Fv">
                  <IconBrandDiscordFilled size={24} />
                </ActionIcon>
                <ActionIcon variant="subtle" component="a" href="https://wpbones.substack.com/">
                  <IconMailHeart size={24} />
                </ActionIcon>
              </Group>
            </Stack>
          </Grid.Col>
          <Grid.Col className={classes.column} span={2}>
            <Stack gap="xs">
              <Title className={classes.title} order={6}>
                HIGHLIGHTS
              </Title>
              <VerticalLinks list={highlights} />
            </Stack>
          </Grid.Col>
          <Grid.Col className={classes.column} span={2}>
            <Stack gap="xs">
              <Title className={classes.title} order={6}>
                RESOURCES
              </Title>
              <VerticalLinks list={resources} />
            </Stack>
          </Grid.Col>
          <Grid.Col className={classes.column} span={2}>
            <Stack gap="xs">
              <Title className={classes.title} order={6}>
                ECOSYSTEM
              </Title>
              <VerticalLinks list={ecosystem} />
            </Stack>
          </Grid.Col>
        </Grid>
        <Divider
          my={16}
          className={classes.lastDivider}
        />
        <Group justify="right">
          <Text fz={12} inline>
            Made with ❤️ by{" "}
            <Anchor fz={13} href="https://undolog.substack.com/">
              Undolog
            </Anchor>
          </Text>
          <Divider orientation="vertical" />
          <Text fz={12} inline>
            <Group gap={4} component={"span"}>
              Hosted on{" "}
              <Anchor fz={13} href="https://vercel.com/">
                <Group gap={0} component={"span"}>
                  <IconBrandVercel size={16} /> Vercel
                </Group>
              </Anchor>
            </Group>
          </Text>
          <Divider orientation="vertical" />
          <Text fz={12} inline>
            <Group gap={4} component={"span"}>
              Built with{" "}
              <Anchor fz={13} href="https://vercel.com/frameworks/nextjs">
                <Group gap={0} component={"span"}>
                  <IconBrandNextjs size={16} /> Next.js
                </Group>
              </Anchor>
              and
              <Anchor fz={13} href="https://nextra.site/">
                <Group gap={0} component={"span"}>
                  <img
                    src="https://github.com/shuding/nextra/blob/main/docs/public/favicon-dark.png?raw=true"
                    width={16}
                  />{" "}
                  Nextra
                </Group>
              </Anchor>
            </Group>
          </Text>
        </Group>
      </Container>
    </div>
  );
};
