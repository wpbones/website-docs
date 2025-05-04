'use client';

import { useEffect, useState } from 'react';
import { Flex, Skeleton, useMantineColorScheme } from '@mantine/core';

interface ProductHuntBadgeProps {
  mode?: 'light' | 'neutral' | 'dark';
}

export const ProductHuntBadge: React.FC<ProductHuntBadgeProps> = ({ mode: _mode }) => {
  const { colorScheme } = useMantineColorScheme();
  const mode = _mode || colorScheme;

  const [modeString, setModeString] = useState<string | null>();

  useEffect(() => {
    if (mode === 'light') {
      setModeString('light');
    } else if (mode === 'dark') {
      setModeString('dark');
    } else {
      setModeString('neutral');
    }
  }, [mode]);

  if (!modeString) {
    return <Skeleton my={24} height={54} width={250} />;
  }

  return (
    <Flex my={24} justify="center">
      <a
        href="https://www.producthunt.com/posts/wp-bones?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-wp&#0045;bones"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=476081&theme=${modeString}`}
          alt="WP Bones - Allows for WordPress plugins with Laravel-like features | Product Hunt"
          style={{ width: '250px', height: '54px' }}
          width="250"
          height="54"
        />
      </a>
    </Flex>
  );
};
