"use client";

import { IconBrandGithub } from "@tabler/icons-react";
import { BoilerplateType } from "./types";

export const boilerplateList: Record<string, BoilerplateType> = {
  api: {
    title: "API Boilerplate",
    name: "WPKirk-API-Boilerplate",
    icon: <IconBrandGithub />,
  },
  base: {
    title: "Base Boilerplate",
    name: "WPKirk-Boilerplate",
    icon: <IconBrandGithub />,
    mostUsed: true,
  },
  cron: {
    title: "Cron Schedule Boilerplate",
    name: "WPKirk-Cron-Boilerplate",
    icon: <IconBrandGithub />,
    highlight: true,
  },
  database: {
    title: "Database Boilerplate",
    name: "WPKirk-Database-Boilerplate",
    icon: <IconBrandGithub />,
  },
  hooks: {
    title: "Hooks & Modules Boilerplate",
    name: "WPKirk-Hooks-Boilerplate",
    icon: <IconBrandGithub />,
    highlight: true,
  },
  internationalization: {
    title: "Internationalization Boilerplate",
    name: "WPKirk-Internationalization-Boilerplate",
    icon: <IconBrandGithub />,
  },
  mantine: {
    title: "Mantine UI Boilerplate",
    name: "WPKirk-Mantine-Boilerplate",
    icon: <IconBrandGithub />,
  },
  reactjs: {
    title: "ReactJS Boilerplate",
    name: "WPKirk-Reactjs-Boilerplate",
    icon: <IconBrandGithub />,
  },
  routes: {
    title: "Routes Boilerplate",
    name: "WPKirk-Routes-Boilerplate",
    icon: <IconBrandGithub />,
  },
  typescript: {
    title: "Typescript Boilerplate",
    name: "WPKirk-Typescript-Boilerplate",
    icon: <IconBrandGithub />,
  },
};

export type BoilerplateSlugs = keyof typeof boilerplateList;
