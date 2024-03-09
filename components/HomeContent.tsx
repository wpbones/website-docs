import { Button, Container, Divider, Grid, Group, Image, SimpleGrid, Stack, Text } from "@mantine/core";
import {
  IconApi,
  IconBrandCakephp,
  IconBrandJavascript,
  IconBrandLaravel,
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
import phpBones from "./image.png";

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

        <SimpleGrid my={64} cols={{ base: 1, sm: 2, lg: 3 }}>
          <HomeCard
            title="Laravel-like"
            icon={<IconBrandLaravel />}
            description="A revolutionary framework that combines Composer, npm, Laravel coding style, and Gulp to bring modern development tools to the WordPress environment"
          />
          <HomeCard
            title="Console Commands"
            icon={<IconTerminal />}
            description="Bones command-line interface for developing WordPress plugins, providing helpful commands and customization options, while also simplifying the deployment process"
          />

          <HomeCard
            title="Menu"
            icon={<IconMenuDeep />}
            description="Offers a unique approach to menus routing, form method spoofing, and redirects in load, making it a powerful tool for building custom WordPress admin menu"
          />

          <HomeCard
            title="Composer Support"
            icon={<IconBrandCakephp />}
            description="WP Bones supports Composer for dependency management."
          />

          <HomeCard
            title="Options"
            icon={<IconSettings2 />}
            description="The plugin options system in WordPress is efficient and easy to use, allowing for easy storage and retrieval of plugin settings"
          />

          <HomeCard
            title="Pages"
            icon={<IconPaperclip />}
            description="Creating custom page routes and pages in Nextra is straightforward and flexible, allowing for easy navigation and page creation without menus"
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

        <Divider my="xs" label={<Text fz={24}>used by</Text>} labelPosition="center" />
      </Stack>
    </Container>
  );
}
