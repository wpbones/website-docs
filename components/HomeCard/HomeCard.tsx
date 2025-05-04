import { forwardRef } from 'react';
import NextImage from 'next/image';
import { Parallax } from '@gfazioli/mantine-parallax';
import { Group, Image, Paper, Text } from '@mantine/core';
import classes from './HomeCard.module.css';

interface HomeCardProps {
  title: string | React.ReactNode;
  icon?: React.ReactNode;
  description: string | React.ReactNode;
  children?: React.ReactNode;
  image?: any;
  href?: string;
  mx?: string;
}

/**
 * HomeCard component forwardRef.
 *
 * @param props - The props for the HomeCard component.
 * @param ref - The ref for forwarding.
 */
export const HomeCard = forwardRef<HTMLAnchorElement, HomeCardProps>(
  ({ title, description, children, icon, image, href, mx, ...others }, ref) => {
    return (
      <Parallax
        mx={mx}
        threshold={15}
        styles={{
          root: {
            display: 'flex',
            height: '100%',
          },
          content: {
            display: 'flex',
          },
        }}
      >
        <Paper
          className={classes.card}
          component="a"
          href={href}
          ref={ref}
          withBorder
          shadow="md"
          radius="lg"
          p="md"
          {...others}
        >
          <Group>
            {icon}
            <Text fz={24} fw={700}>
              {title}
            </Text>
          </Group>
          {image && (
            <Image
              component={NextImage}
              radius="md"
              w="100%"
              fit="contain"
              src={image}
              alt="Card image"
            />
          )}
          {typeof description === 'string' ? (
            <Text c="dimmed" fz={16} fw={400} mx={8}>
              {description}
            </Text>
          ) : (
            description
          )}
          {children}
        </Paper>
      </Parallax>
    );
  }
);
