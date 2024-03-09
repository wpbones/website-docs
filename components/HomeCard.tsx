import { Group, Paper, Text } from "@mantine/core";

interface HomeCardProps {
  title: string | React.ReactNode;
  icon?: React.ReactNode;
  description: string | React.ReactNode;
  children?: React.ReactNode;
}

export const HomeCard: React.FC<HomeCardProps> = ({ title, description, children, icon }) => {
  return (
    <Paper withBorder shadow="md" radius={"lg"} p={"md"}>
      <Group>
        {icon}
        <Text variant="gradient" fz={24} fw={700}>
          {title}
        </Text>
      </Group>
      <Text fz={16} fw={400}>
        {description}
      </Text>
      {children}
    </Paper>
  );
};
