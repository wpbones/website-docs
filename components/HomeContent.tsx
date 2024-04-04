"use client";

import { Button, Container, Grid, Group, Image, SimpleGrid, Stack, Text } from "@mantine/core";
import {
  IconApi,
  IconBrandJavascript,
  IconBrandLaravel,
  IconBrandReact,
  IconBrandWordpress,
  IconCode,
  IconDatabase,
  IconEyeStar,
  IconMenuDeep,
  IconPaperclip,
  IconRectangle,
  IconSettings2,
  IconTerminal,
} from "@tabler/icons-react";
import NextImage from "next/image";
import { HomeCard } from "./HomeCard";
import ajaxImage from "./ajax.png";
import apiImage from "./api.png";
import consoleImage from "./console.png";
import controllerImage from "./controller.png";
import cptImage from "./cpt.png";
import dbImage from "./db.png";
import phpBones from "./image.png";
import logsImage from "./logs.png";
import menuImage from "./menu.png";
import migrationImage from "./migration.png";
import optionsImage from "./option.png";
import pageImage from "./page.png";
import reactImage from "./react-js.png";

export default function HomeContent() {
  const claims = [
    "WP Bones allows for WordPress plugins with Laravel-like features",
    "WP Bones makes WordPress plugin development more efficient and modern",
  ];

  return (
    <Container size="xl">
      <Stack m="xl">
        <Grid>
          <Grid.Col span={8}>
            <Text lh={1} fz={84} fw={900} variant="gradient" gradient={{ from: "blue", to: "violet", deg: 90 }}>
              WP Bones allows for WordPress plugins with Laravel-like features
            </Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Image component={NextImage} radius="md" h={500} w="auto" fit="contain" src={phpBones} alt="PHP Bones" />
          </Grid.Col>
        </Grid>

        <Text fz={24}>Streamlines and modernizes WordPress plugin development.</Text>

        <Group>
          <Button component="a" href="/docs" variant="filled" size="xl" radius={"xl"}>
            Get started →
          </Button>
        </Group>

        <SimpleGrid
          my={64}
          cols={{ base: 1, sm: 2, lg: 3 }}
          style={{
            position: "relative",
            perspective: "1000px",
            transformStyle: "preserve-3d",
            perspectiveOrigin: "center center",
          }}>
          <HomeCard
            title="Laravel-like"
            image={controllerImage}
            icon={<IconBrandLaravel />}
            href="/docs/CoreConcepts/architecture-foundations"
            description={
              <span>
                A revolutionary framework that combines Composer, npm, Laravel coding style,{" "}
                <strong>Blade templates</strong> and Gulp to bring modern development tools to the WordPress
                environment.
              </span>
            }
          />
          <HomeCard
            title="Console Commands"
            href="/docs/BonesConsole/bones-console"
            icon={<IconTerminal />}
            image={consoleImage}
            description="Bones command-line interface for developing WordPress plugins, providing helpful commands and customization options, while also simplifying the deployment process.
            Automatic creation of controllers, models, and views, as well as the ability to run migrations and seeders."
          />
          <HomeCard
            title="ReactJS"
            href="/docs/GettingStarted/assets"
            icon={<IconBrandReact />}
            image={reactImage}
            description="WP Bones provides a simple and efficient way to integrate ReactJS into your WordPress plugin, allowing for easy creation of custom components and pages. Supports JavaScript and TypeScript. Styles are handled by Less and Sass."
          />

          <HomeCard
            title="ORM"
            href="/docs/DatabaseORM/query-builder"
            icon={<IconDatabase />}
            image={dbImage}
            description="Integrate Illuminate Eloquent ORM into WP Bones, allowing for easy database querying and model creation."
          />

          <HomeCard
            title="Migration and seeding"
            href="/docs/DatabaseORM/migrations"
            icon={<IconDatabase />}
            image={migrationImage}
            description="Supports database migration and seeding, allowing for easy database management and version control. You can create and run migrations and seeders with ease."
          />

          <HomeCard
            title="Menu"
            href="/docs/CoreConcepts/menus"
            icon={<IconMenuDeep />}
            image={menuImage}
            description="Offers a unique approach to menus routing, form method spoofing, and redirects in load, making it a powerful tool for building custom WordPress admin menu."
          />

          <HomeCard
            title="Pages"
            href="/docs/CoreConcepts/pages-routing"
            icon={<IconPaperclip />}
            image={pageImage}
            description="Creating custom page routes and pages is straightforward and flexible, allowing for easy navigation and page creation without menus."
          />
          <HomeCard
            title="Logging"
            href="/docs/CoreConcepts/logging"
            icon={<IconPaperclip />}
            image={logsImage}
            description="WPBones makes it easy and beautiful to log messages in your WordPress plugin with its configuration options and helper functions"
          />

          <HomeCard
            title="Ajax Calls"
            href="/docs/ServicesProvider/ajax"
            icon={<IconBrandJavascript />}
            image={ajaxImage}
            description="Add support for Ajax calls in WordPress with three different access levels: for logged-in users, not-logged-in users, and everyone"
          />

          <HomeCard
            title="Custom Post and Taxonomy"
            href="/docs/ServicesProvider/custom-post-types"
            icon={<IconBrandWordpress />}
            image={cptImage}
            description="You can easily create a custom post type and custom taxonomy service provider"
          />

          <HomeCard
            title="Rest API"
            href="/docs/ServicesProvider/rest-api"
            icon={<IconApi />}
            image={apiImage}
            description="Provides a simple and efficient way to handle the WordPress REST API, including authentication and customizable routes"
          />

          <HomeCard
            title="Options"
            href="/docs/CoreConcepts/options"
            icon={<IconSettings2 />}
            image={optionsImage}
            description="The plugin options system in WordPress is efficient and easy to use, allowing for easy storage and retrieval of plugin settings"
          />

          <HomeCard
            title="Shortcodes"
            href="/docs/ServicesProvider/shortcodes"
            icon={<IconCode />}
            description="A powerful and easy way to add custom functionality to WordPress. Simply add your shortcode classes to the config file and let the magic begin!"
          />

          <HomeCard
            title="Widgets"
            href="/docs/ServicesProvider/widgets"
            icon={<IconRectangle />}
            description="Widgets are a powerful way to add custom functionality to WordPress. Simply add your widget classes to the config file and let the magic begin!"
          />

          <HomeCard
            title="And more..."
            href="/docs"
            icon={<IconEyeStar />}
            description="Supports Composer for dependency management, easy plugin activation and deactivation, awesome options system, custom post types, REST API, and shortcodes."
          />
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
