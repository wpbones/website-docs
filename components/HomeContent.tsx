import { Button, Container, Group, Image, Stack, Text } from "@mantine/core";
import NextImage from "next/image";
import phpBones from "./image.png";

export default function HomeContent() {
  const claims = [
    "WP Bones allows for WordPress plugins with Laravel-like features.",
    "WP Bones makes WordPress plugin development more efficient and modern",
  ];

  return (
    <Container size="xl">
      <Stack m="xl">
        <Group justify="space-between" align="center">
          <Text maw="60%" lh={1} fz={84} fw={900} variant="gradient" gradient={{ from: "blue", to: "violet", deg: 90 }}>
            WP Bones makes WordPress plugin development more efficient and modern
          </Text>
          <Image component={NextImage} radius="md" h={500} w="auto" fit="contain" src={phpBones} alt="PHP Bones" />
        </Group>

        <Text fz={24}>Streamlines and modernizes WordPress plugin development.</Text>

        <Group>
          <Button component="a" href="/docs" variant="filled" size="xl">
            Get started →
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
