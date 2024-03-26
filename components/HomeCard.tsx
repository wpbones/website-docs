"use client";

import { Group, Image, Paper, Text } from "@mantine/core";
import NextImage from "next/image";
import classes from "./HomeCard.module.css";
interface HomeCardProps {
  title: string | React.ReactNode;
  icon?: React.ReactNode;
  description: string | React.ReactNode;
  children?: React.ReactNode;
  image?: any;
  href?: string;
}

/**
 * HomeCard component props.
 *
 * @param title - The title of the card.
 * @param description - The description text in the card.
 * @param children - Any additional content inside the card.
 * @param icon - An optional icon to display in the card header.
 * @param image - An optional image to display in the card.
 * @param href - An optional href if the card should link somewhere.
 */
export const HomeCard: React.FC<HomeCardProps> = ({ title, description, children, icon, image, href }) => {
  return (
    <Paper component="a" href={href} withBorder shadow="md" radius={"lg"} p={"md"} className={classes.card}>
      <Group>
        {icon}
        <Text fz={24} fw={700}>
          {title}
        </Text>
      </Group>
      {image && <Image component={NextImage} radius="md" w="100%" fit="contain" src={image} alt="PHP Bones" />}
      <Text c="dimmed" fz={16} fw={400}>
        {description}
      </Text>

      {children}
    </Paper>
  );
};
