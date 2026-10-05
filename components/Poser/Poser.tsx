import { Group, Stack } from '@mantine/core';

import '@mantine/core/styles.css';

type PoserProps = {
  name: string;
  contributors?: boolean;
};

/**
 * Packagist and GitHub badges. Each is drawn 28 px tall (shields'
 * `for-the-badge`), so it takes its height before it loads, and the row keeps
 * room for the two lines the seven badges wrap to on a docs page: without
 * either, the badges arriving pushed everything under them down, the largest
 * layout shift of the docs' first page (CLS 0.18 on wpbones.com, 2026-10-05).
 */
export function Poser({ name, contributors = false }: PoserProps) {
  return (
    <Stack gap={16} my={16}>
      <Group justify="center" mih={{ base: 0, sm: 72 }}>
        <a href={`https://packagist.org/packages/${name}`}>
          <img
            src={`https://poser.pugx.org/${name}/v/stable?style=for-the-badge`}
            alt="Latest Stable Version"
            height={28}
          />
        </a>

        <a href={`https://packagist.org/packages/${name}`}>
          <img
            src={`https://poser.pugx.org/${name}/v/unstable?style=for-the-badge`}
            alt="Latest Unstable Version"
            height={28}
          />
        </a>

        <a href={`https://packagist.org/packages/${name}`}>
          <img
            src={`https://poser.pugx.org/${name}/downloads?style=for-the-badge`}
            alt="Total Downloads"
            height={28}
          />
        </a>

        <a href={`https://packagist.org/packages/${name}`}>
          <img
            src={`https://poser.pugx.org/${name}/license?style=for-the-badge`}
            alt="License"
            height={28}
          />
        </a>

        <a href={`https://packagist.org/packages/${name}`}>
          <img
            src={`https://poser.pugx.org/${name}/d/monthly?style=for-the-badge`}
            alt="Monthly Downloads"
            height={28}
          />
        </a>

        <a href={`https://github.com/${name}`}>
          <img
            src="https://img.shields.io/badge/GitHub-grey?style=for-the-badge&logo=github"
            alt="GitHub"
            height={28}
          />
        </a>

        <a href={`https://github.com/${name}/blob/main/CHANGELOG.md`}>
          <img
            src="https://img.shields.io/badge/CHANGELOG-brightgreen?style=for-the-badge&logo=github"
            alt="CHANGELOG"
            height={28}
          />
        </a>
      </Group>
      {contributors && (
        <Group justify="center">
          <a href={`https://github.com/${name}/graphs/contributors`}>
            <img width={96} src={`https://contrib.rocks/image?repo=${name}`} alt="Contributors" />
          </a>
        </Group>
      )}
    </Stack>
  );
}
