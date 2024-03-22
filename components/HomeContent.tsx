"use client";

import { Button, Container, Grid, Group, Image, SimpleGrid, Stack, Text } from "@mantine/core";
import {
  IconApi,
  IconBrandCakephp,
  IconBrandJavascript,
  IconBrandLaravel,
  IconBrandReact,
  IconBrandWordpress,
  IconCode,
  IconDatabase,
  IconMenuDeep,
  IconPaperclip,
  IconSettings2,
  IconTerminal,
} from "@tabler/icons-react";
import NextImage from "next/image";
import { HomeCard } from "./HomeCard";
import consoleImage from "./console.png";
import controllerImage from "./controller.png";
import phpBones from "./image.png";
import menuImage from "./menu.png";
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
            description="A revolutionary framework that combines Composer, npm, Laravel coding style, and Gulp to bring modern development tools to the WordPress environment."
          />
          <HomeCard
            title="Console Commands"
            icon={<IconTerminal />}
            image={consoleImage}
            description="Bones command-line interface for developing WordPress plugins, providing helpful commands and customization options, while also simplifying the deployment process.
            Automatic creation of controllers, models, and views, as well as the ability to run migrations and seeders."
          />
          <HomeCard
            title="ReactJS"
            icon={<IconBrandReact />}
            image={reactImage}
            description="WP Bones provides a simple and efficient way to integrate ReactJS into your WordPress plugin, allowing for easy creation of custom components and pages. Supports JavaScript and TypeScript. Styles are handled by Less and Sass."
          />

          <HomeCard
            title="Menu"
            icon={<IconMenuDeep />}
            image={menuImage}
            href="/docs/CoreConcepts/menus"
            description="Offers a unique approach to menus routing, form method spoofing, and redirects in load, making it a powerful tool for building custom WordPress admin menu."
          />

          <HomeCard
            title="Pages"
            icon={<IconPaperclip />}
            image={pageImage}
            description="Creating custom page routes and pages is straightforward and flexible, allowing for easy navigation and page creation without menus."
          />

          <HomeCard
            title="Composer Support"
            icon={<IconBrandCakephp />}
            description="WP Bones supports Composer for dependency management."
          />

          <HomeCard
            title="Options"
            icon={<IconSettings2 />}
            image={optionsImage}
            description="The plugin options system in WordPress is efficient and easy to use, allowing for easy storage and retrieval of plugin settings"
          />

          <HomeCard
            title="Logging"
            icon={<IconPaperclip />}
            description="WPBones makes it easy and beautiful to log messages in your WordPress plugin with its configuration options and helper functions"
          />
          <HomeCard
            title="Custom Post"
            icon={<IconBrandWordpress />}
            description="You can easily create a custom post type and custom taxonomy service provider"
          />
          <HomeCard
            title="Rest API"
            icon={<IconApi />}
            description="Provides a simple and efficient way to handle the WordPress REST API, including authentication and customizable routes"
          />
          <HomeCard
            title="Shortcodes"
            icon={<IconCode />}
            description="A powerful and easy way to add custom functionality to WordPress. Simply add your shortcode classes to the config file and let the magic begin!"
          />
          <HomeCard
            title="Ajax Calls"
            icon={<IconBrandJavascript />}
            description="Add support for Ajax calls in WordPress with three different access levels: for logged-in users, not-logged-in users, and everyone"
          />
          <HomeCard
            title="ORM"
            icon={<IconDatabase />}
            description="Integrate Illuminate Eloquent ORM into WP Bones, allowing for easy database querying and model creation"
          />
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
