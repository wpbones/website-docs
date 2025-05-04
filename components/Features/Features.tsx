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
} from '@tabler/icons-react';
import { Flex, SimpleGrid, Text } from '@mantine/core';
import { HomeCard } from '../HomeCard';
import ajaxImage from './ajax.png';
import apiImage from './api.png';
import consoleImage from './console.png';
import controllerImage from './controller.png';
import cptImage from './cpt.png';
import dbImage from './db.png';
import logsImage from './logs.png';
import menuImage from './menu.png';
import migrationImage from './migration.png';
import optionsImage from './option.png';
import pageImage from './page.png';
import reactImage from './react-js.png';

const features = [
  {
    title: 'Laravel-like',
    image: controllerImage,
    icon: <IconBrandLaravel />,
    href: '/docs/CoreConcepts/architecture-foundations',
    description: (
      <Text c="dimmed" fz={16} fw={400} mx={8}>
        A revolutionary framework that combines Composer, npm, Laravel coding style,{' '}
        <strong>Blade templates</strong> and Gulp to bring modern development tools to the WordPress
        environment.
      </Text>
    ),
  },
  {
    title: 'Console Commands',
    href: '/docs/BonesConsole/bones-console',
    icon: <IconTerminal />,
    image: consoleImage,
    description:
      'Bones command-line interface for developing WordPress plugins provides helpful commands and customization options, while also simplifying the deployment process. Automatic creation of controllers, models, and views, as well as the ability to run migrations and seeders.',
  },
  {
    title: 'ReactJS',
    href: '/docs/GettingStarted/assets',
    icon: <IconBrandReact />,
    image: reactImage,
    description:
      'WP Bones provides a simple and efficient way to integrate ReactJS into your WordPress plugin, allowing for easy creation of custom components and pages. Supports JavaScript and TypeScript. Styles are handled by Less and Sass.',
  },
  {
    title: 'ORM',
    href: '/docs/DatabaseORM/query-builder',
    icon: <IconDatabase />,
    image: dbImage,
    description:
      'Integrate Illuminate Eloquent ORM into WP Bones, allowing for easy database querying and model creation.',
  },
  {
    title: 'Migration and seeding',
    href: '/docs/DatabaseORM/migrations',
    icon: <IconDatabase />,
    image: migrationImage,
    description:
      'Supports database migration and seeding, allowing for easy database management and version control. You can create and run migrations and seeders with ease.',
  },
  {
    title: 'Menu',
    href: '/docs/CoreConcepts/menus',
    icon: <IconMenuDeep />,
    image: menuImage,
    description:
      'Offers a unique approach to menus routing, form method spoofing, and redirects in load, making it a powerful tool for building custom WordPress admin menu.',
  },
  {
    title: 'Pages',
    href: '/docs/CoreConcepts/pages-routing',
    icon: <IconPaperclip />,
    image: pageImage,
    description:
      'Creating custom page routes and pages is straightforward and flexible, allowing for easy navigation and page creation without menus.',
  },
  {
    title: 'Logging',
    href: '/docs/CoreConcepts/logging',
    icon: <IconPaperclip />,
    image: logsImage,
    description:
      'WP Bones makes it easy and beautiful to log messages in your WordPress plugin with its configuration options and helper functions.',
  },
  {
    title: 'Ajax Calls',
    href: '/docs/ServicesProvider/ajax',
    icon: <IconBrandJavascript />,
    image: ajaxImage,
    description:
      'Add support for Ajax calls in WordPress with three different access levels: for logged-in users, not logged-in users, and everyone.',
  },
  {
    title: 'Custom Post and Taxonomy',
    href: '/docs/ServicesProvider/custom-post-types',
    icon: <IconBrandWordpress />,
    image: cptImage,
    description: 'You can easily create a custom post type and custom taxonomy service provider.',
  },
  {
    title: 'Rest API',
    href: '/docs/ServicesProvider/rest-api',
    icon: <IconApi />,
    image: apiImage,
    description:
      'Provides a simple and efficient way to handle the WordPress REST API, including authentication and customizable routes.',
  },
  {
    title: 'Options',
    href: '/docs/CoreConcepts/options',
    icon: <IconSettings2 />,
    image: optionsImage,
    description:
      'The plugin options system in WordPress is efficient and easy to use, allowing for easy storage and retrieval of plugin settings.',
  },
  {
    title: 'Shortcodes',
    href: '/docs/ServicesProvider/shortcodes',
    icon: <IconCode />,
    description:
      'A powerful and easy way to add custom functionality to WordPress. Simply add your shortcode classes to the config file and let the magic begin!',
  },
  {
    title: 'Widgets',
    href: '/docs/ServicesProvider/widgets',
    icon: <IconRectangle />,
    description:
      'Widgets are a powerful way to add custom functionality to WordPress. Simply add your widget classes to the config file and let the magic begin!',
  },
  {
    title: 'And more...',
    href: '/docs',
    icon: <IconEyeStar />,
    description:
      'Supports Composer for dependency management, easy plugin activation and deactivation, an awesome options system, custom post types, REST API, and shortcodes.',
  },
];

export function Features() {
  return (
    <SimpleGrid mt={64} mb={24} cols={{ base: 1, sm: 2, lg: 3 }}>
      {features.map((feature, index) => (
        <Flex key={index}>
          <HomeCard
            title={feature.title}
            image={feature.image}
            icon={feature.icon}
            href={feature.href}
            description={feature.description}
          />
        </Flex>
      ))}
    </SimpleGrid>
  );
}
