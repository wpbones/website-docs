"use client";

import { Group, Image, Paper, Text } from "@mantine/core";
import NextImage from "next/image";
import { forwardRef } from "react";
import classes from "./HomeCard.module.css";

interface HomeCardProps {
  title: string | React.ReactNode;
  icon?: React.ReactNode;
  description: string | React.ReactNode;
  children?: React.ReactNode;
  image?: string;
  href?: string;
}

/**
 * HomeCard component forwardRef.
 *
 * @param props - The props for the HomeCard component.
 * @param ref - The ref for forwarding.
 */
export const HomeCard = forwardRef<HTMLAnchorElement, HomeCardProps>(
  ({ title, description, children, icon, image, href, ...others }, ref) => {
    return (
      <Paper
        component="a"
        href={href}
        ref={ref}
        withBorder
        shadow="md"
        radius={"lg"}
        p={"md"}
        className={classes.card}
        {...others}>
        <Group>
          {icon}
          <Text fz={24} fw={700}>
            {title}
          </Text>
        </Group>
        {image && <Image component={NextImage} radius="md" w="100%" fit="contain" src={image} alt="Card image" />}
        <Text c="dimmed" fz={16} fw={400}>
          {description}
        </Text>

        {children}
      </Paper>
    );
  },
);
