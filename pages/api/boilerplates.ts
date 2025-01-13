import { NextApiRequest, NextApiResponse } from "next";

interface Boilerplate {
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  icon: string | { source: string; tintColor: string };
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
      icon: { source: "Heart", tintColor: "white" },
      shortcut: { modifiers: ["cmd", "shift"], key: "b" },
      keywords: ["starter", "routes"],
    },
    {
      slug: "blade",
      name: "WPKirk-Blade-Boilerplate",
      title: "Blade",
      subtitle: "How to use Blade with WP Bones",
      icon: { source: "CodeBlock", tintColor: "white" },
      keywords: ["blade", "template", "templates", "view", "views"],
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
      icon: { source: "Clock", tintColor: "white" },
      keywords: ["cron", "schedule", "schedules", "task", "tasks"],
    },
    {
      slug: "cpt",
      name: "WPKirk-CPT-Boilerplate",
      title: "Custom Post Type",
      subtitle: "How to create a Custom Post Type and taxonomy for WP Bones",
      icon: { source: "Document", tintColor: "white" },
      keywords: [
        "cpt",
        "post",
        "custom",
        "taxonomy",
        "type",
        "types",
        "taxonomies",
        "posttype",
        "posttypes",
        "post-type",
        "post-types",
      ],
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
      icon: { source: "Code", tintColor: "white" },
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
      icon: { source: "CheckList", tintColor: "white" },
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
      icon: { source: "Code", tintColor: "white" },
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
