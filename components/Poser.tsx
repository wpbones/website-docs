import { Group, Stack } from "@mantine/core";
import "@mantine/core/styles.css";

type PoserProps = {
  name: string;
  contributors?: boolean;
};

export function Poser({ name, contributors = false }: PoserProps) {
  return (
    <Stack gap={16} my={16}>
      <Group justify="center">
        <a href={`https://packagist.org/packages/${name}`}>
          <img src={`https://poser.pugx.org/${name}/v/stable?style=for-the-badge`} alt="Latest Stable Version" />
        </a>

        <a href={`https://packagist.org/packages/${name}`}>
          <img src={`https://poser.pugx.org/${name}/v/unstable?style=for-the-badge`} alt="Latest Unstable Version" />
        </a>

        <a href={`https://packagist.org/packages/${name}`}>
          <img src={`https://poser.pugx.org/${name}/downloads?style=for-the-badge`} alt="Total Downloads" />
        </a>

        <a href={`https://packagist.org/packages/${name}`}>
          <img src={`https://poser.pugx.org/${name}/license?style=for-the-badge`} alt="License" />
        </a>

        <a href={`https://packagist.org/packages/${name}`}>
          <img src={`https://poser.pugx.org/${name}/d/monthly?style=for-the-badge`} alt="Monthly Downloads" />
        </a>

        <a href={`https://github.com/${name}`}>
          <img src="https://img.shields.io/badge/GitHub-grey?style=for-the-badge&logo=github" alt="GitHub" />
        </a>

        <a href={`https://github.com/${name}/blob/main/CHANGELOG.md`}>
          <img
            src="https://img.shields.io/badge/CHANGELOG-brightgreen?style=for-the-badge&logo=github"
            alt="CHANGELOG"
          />
        </a>
      </Group>
      {contributors && (
        <Group justify="center">
          <a href={`https://github.com/${name}/graphs/contributors`}>
            <img width={96} src={`https://contrib.rocks/image?repo=${name}`} />
          </a>
        </Group>
      )}
    </Stack>
  );
}
