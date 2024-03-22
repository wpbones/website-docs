"use client";

import { Group, Image, Paper, Text } from "@mantine/core";
import NextImage from "next/image";

interface HomeCardProps {
  title: string | React.ReactNode;
  icon?: React.ReactNode;
  description: string | React.ReactNode;
  children?: React.ReactNode;
  image?: any;
}

export const HomeCard: React.FC<HomeCardProps> = ({ title, description, children, icon, image }) => {
  return (
    <Paper withBorder shadow="md" radius={"lg"} p={"md"}>
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
