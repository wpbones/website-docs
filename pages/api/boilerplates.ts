import { NextApiRequest, NextApiResponse } from "next";

interface Boilerplate {
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  icon: string | { source: string };
  shortcut?: { modifiers: string[]; key: string };
  keywords: string[];
}

export default async (req: NextApiRequest, res: NextApiResponse<Boilerplate[]>) => {
  res.status(200).json([
    {
      slug: "base",
      name: "WPKirk-Boilerplate",
      title: "Starter Boilerplate",
      subtitle: "The most used starting point for WP Bones plugins",
      icon: "star.svg",
      shortcut: { modifiers: ["cmd", "shift"], key: "b" },
      keywords: ["starter", "routes"],
    },
    {
      slug: "api",
      name: "WPKirk-API-Boilerplate",
      title: "API",
      subtitle: "How to create a REST API for WP Bones",
      icon: "api.svg",
      keywords: ["api", "rest", "json", "endpoint", "endpoints"],
    },
    {
      slug: "cron",
      name: "WPKirk-Cron-Boilerplate",
      title: "Cron",
      subtitle: "How to create a Cron Schedule for WP Bones",
      icon: { source: "Clock" },
      keywords: ["cron", "schedule", "schedules", "task", "tasks"],
    },
    {
      slug: "database",
      name: "WPKirk-Database-Boilerplate",
      title: "Database",
      subtitle: "How to manage database in WP Bones",
      icon: "database-cog.svg",
      keywords: [
        "db",
        "database",
        "sql",
        "mysql",
        "mariadb",
        "model",
        "models",
        "table",
        "tables",
        "illuminate",
        "eloquent",
        "query",
        "queries",
        "orm",
        "migration",
        "migrations",
        "seed",
        "seeds",
      ],
    },
    {
      slug: "hooks",
      name: "WPKirk-Hooks-Boilerplate",
      title: "Hooks",
      subtitle: "How to use Hooks and Modules for WP Bones",
      icon: { source: "Code" },
      keywords: ["hooks", "actions", "filters", "modules"],
    },
    {
      slug: "internationalization",
      name: "WPKirk-Internationalization-Boilerplate",
      title: "Internationalization",
      subtitle: "How to localize your WP Bones plugin",
      icon: "language.svg",
      keywords: ["internationalization", "localize", "localization", "languages"],
    },
    {
      slug: "mantine",
      name: "WPKirk-Mantine-Boilerplate",
      title: "Mantine UI",
      subtitle: "How to use Mantine UI with WP Bones",
      icon: "brand-mantine.svg",
      keywords: ["reactjs", "react", "javascript", "jsx", "components", "mantine", "ui"],
    },
    {
      slug: "options",
      name: "WPKirk-Options-Boilerplate",
      title: "Options",
      subtitle: "How to use Options with WP Bones",
      icon: { source: "Code" },
      keywords: ["options", "form", "controller", "resource", "post"],
    },
    {
      slug: "reactjs",
      name: "WPKirk-ReactJS-Boilerplate",
      title: "ReactJS",
      subtitle: "How to use ReactJS with WP Bones",
      icon: "brand-react.svg",
      keywords: ["reactjs", "react", "javascript", "jsx", "components"],
    },
    {
      slug: "routes",
      name: "WPKirk-Routes-Boilerplate",
      title: "Routes",
      subtitle: "How to handle routes for WP Bones",
      icon: "arrow-guide.svg",
      keywords: ["starter", "routes"],
    },
    {
      slug: "typescript",
      name: "WPKirk-Typescript-Boilerplate",
      title: "Typescript",
      subtitle: "How to create a Typescript application for WP Bones",
      icon: { source: "Code" },
      keywords: ["typescript", "js", "javascript", "ts", "types"],
    },
    {
      slug: "deprecated",
      name: "WPKirk",
      title: "Complete Demo",
      subtitle: "The complete demo for WP Bones",
      icon: "box.svg",
      keywords: ["demo", "routes"],
    },
  ]);
};