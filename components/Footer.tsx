"use client";

import { AnimateBadge } from "@components/AnimateBadge";
import { ActionIcon, Anchor, Container, Grid, Group, Image, Stack, Text, Title } from "@mantine/core";
import { IconBrandDiscordFilled, IconBrandGithubFilled, IconBrandX, IconMailHeart } from "@tabler/icons-react";
import NextImage from "next/image";
import classes from "./Footer.module.css";
import wpBonesLogo from "./wpbones-logo.png";

type FooterProps = {};

type VerticalLink = {
  key: string;
  title: string;
  href: string;
  newWindow?: boolean;
  new?: boolean;
};

const wpBonesHighlights = [
  {
    key: "release-notes",
    title: "Release Notes",
    href: "/docs/release-notes",
  },
  {
    key: "getting-started",
    title: "Getting Started",
    href: "/docs/GettingStarted/requirements",
  },
  {
    key: "internationalization",
    title: "Internationalization",
    href: "/docs/Internationalization/overview",
    new: true,
  },
  {
    key: "core-classes",
    title: "Core Classes",
    href: "/docs/CoreClasses/overview",
    new: true,
  },
  {
    key: "core-plugin-files",
    title: "Core Plugin Files",
    href: "/docs/CorePluginFiles/overview",
    new: true,
  },
  {
    key: "faqs",
    title: "FAQs",
    href: "/docs/faqs",
    new: true,
  },
  {
    key: "routing",
    title: "Routing",
    href: "/docs/CoreConcepts/menus-routing",
  },
  {
    key: "blade-templates",
    title: "Blade Templates",
    href: "/docs/Views/blade-template",
  },
  {
    key: "bones-console",
    title: "Bones Console",
    href: "/docs/BonesConsole/bones-console",
  },
  {
    key: "database",
    title: "Database",
    href: "/docs/DatabaseORM/query-builder",
  },
  {
    key: "eloquent-orm",
    title: "Eloquent ORM",
    href: "/docs/DatabaseORM/eloquent-orm",
  },
];

const wpBonesResources = [
  {
    key: "demo",
    title: "WP Bones Demo in action",
    href: "https://playground.wordpress.net/?blueprint-url=https://www.wpbones.com/wpkirk-demo.json",
    new: true,
  },
  {
    key: "forum",
    title: "Forum",
    href: "https://discord.gg/5bdVyycU8Fv",
  },
  {
    key: "wpbones-news",
    title: "WP Bones News",
    href: "https://wpbones.substack.com/",
  },
  {
    key: "wpbones-ai",
    title: "WP Bones AI",
    href: "https://wpbones.ownai.com/",
  },
  {
    key: "wordpress-developer-resources",
    title: "WordPress Developer Resources",
    href: "https://developer.wordpress.org/",
  },
  {
    key: "reactjs-mantine-ui-extensions",
    title: "ReactJS Mantine UI Extensions",
    href: "https://mantine-extensions.vercel.app/projects",
  },
];

const wpBonesEcoSystem = [
  {
    key: "wp-bones-repository",
    title: "WP Bones Repository",
    href: "https://github.com/wpbones/WPBones",
    newWindow: true,
  },
  {
    key: "wp-kirk-demo",
    title: "WP Bones Demo",
    href: "https://github.com/wpbones/WPKirk",
    newWindow: true,
  },
  {
    key: "wp-bones-plugin-boilerplate",
    title: "WP Bones Plugin Boilerplate",
    href: "https://github.com/wpbones/WPKirk-Boilerplate",
    newWindow: true,
  },
  {
    key: "wp-bones-website-docs",
    title: "WP Bones Website Docs",
    href: "https://github.com/wpbones/website-docs",
    newWindow: true,
  },
  {
    key: "action-and-filters",
    title: "Actions & Filters for Javascript",
    href: "/docs/Packages/actions-and-filters-js",
  },
  {
    key: "flags",
    title: "Flags",
    href: "/docs/Packages/flags",
    new: true,
  },
  {
    key: "geolocalizer",
    title: "Geolocalizer",
    href: "/docs/Packages/geolocalizer",
  },
  {
    key: "Morris php",
    title: "Morris PHP",
    href: "/docs/Packages/morris-php",
  },
  {
    key: "Pure CSS Tabs",
    title: "Pure CSS Tabs",
    href: "/docs/Packages/pure-css-tabs",
  },
  {
    key: "Pure CSS Switch",
    title: "Pure CSS Switch",
    href: "/docs/Packages/pure-css-switch",
  },
  {
    key: "User Agent",
    title: "User Agent",
    href: "/docs/Packages/useragent",
  },
  {
    key: "WP Tables",
    title: "WP Tables",
    href: "/docs/Packages/wp-tables",
  },
];

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
              <VerticalLinks list={wpBonesHighlights} />
            </Stack>
          </Grid.Col>
          <Grid.Col className={classes.column} span={2}>
            <Stack gap="xs">
              <Title className={classes.title} order={6}>
                RESOURCES
              </Title>
              <VerticalLinks list={wpBonesResources} />
            </Stack>
          </Grid.Col>
          <Grid.Col className={classes.column} span={2}>
            <Stack gap="xs">
              <Title className={classes.title} order={6}>
                ECOSYSTEM
              </Title>
              <VerticalLinks list={wpBonesEcoSystem} />
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};
