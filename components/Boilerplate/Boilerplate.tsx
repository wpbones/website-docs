// 'use client';

import { IconBrandGithub } from '@tabler/icons-react';
import { Cards } from 'nextra/components';
import { Badge, Button, Group, MantineColor } from '@mantine/core';
import { AnimateBadge } from '@/components';
import { boilerplateList, BoilerplateSlugs } from './List';

type BoilerplateButtonProps = {
  slug: string;
  colorFrom?: MantineColor;
  colorTo?: MantineColor;
  layout?: 'default' | 'square';
  justify?: React.CSSProperties['justifyContent'];
};

function BoilerplateButton({
  slug,
  colorFrom = 'dark.9',
  colorTo = 'dark.8',
  layout = 'default',
}: BoilerplateButtonProps) {
  const { name, mostUsed, title, owner = 'wpbones' } = boilerplateList[slug];

  const hrefGitHub = `https://github.com/new?template_name=${name}&template_owner=${owner}`;

  return (
    <Button
      color="orange"
      component="a"
      href={hrefGitHub}
      variant="gradient"
      size="sm"
      data-layout={layout}
      gradient={{ from: colorFrom, to: colorTo, deg: 45 }}
      leftSection={<IconBrandGithub size={18} />}
      radius="xl"
    >
      {mostUsed ? (
        <Group gap={4}>
          <Badge color="lime" fz={10} size="xs">
            Most used
          </Badge>
          {title}
        </Group>
      ) : (
        `${title} on GitHub`
      )}
    </Button>
  );
}

type BoilerplateCardProps = {
  slug: string;
  overrideTitle?: string;
  highlight?: boolean;
};

function BoilerplateCard({ slug, overrideTitle, highlight }: BoilerplateCardProps) {
  const { name, icon = <IconBrandGithub />, title, owner = 'wpbones' } = boilerplateList[slug];

  function Title() {
    if (overrideTitle) {
      return overrideTitle;
    }

    if (highlight) {
      return (
        <Group>
          <AnimateBadge />
          {title}
        </Group>
      );
    }
    return title;
  }

  const href = `https://github.com/new?template_name=${name}&template_owner=${owner}`;

  return <Cards.Card key={slug} arrow icon={icon} title={(<Title />) as any} href={href} />;
}

type BoilerplateCardsProps = {
  column?: number;
  display?: BoilerplateSlugs[];
  title?: Record<string, string>;
};

function BoilerplateCards({ column = 2, display = [] }: BoilerplateCardsProps) {
  return (
    <Cards num={column}>
      {Object.entries(boilerplateList)
        .filter(([key]) => display.length === 0 || display.includes(key as BoilerplateSlugs))
        .map(([key, value]) => (
          <BoilerplateCard slug={key} {...value} />
        ))}
    </Cards>
  );
}

function BoilerplateButtons({ display = [] }: BoilerplateCardsProps) {
  return Object.entries(boilerplateList)
    .filter(([key]) => display.length === 0 || display.includes(key as BoilerplateSlugs))
    .map(([key, value]) => <BoilerplateButton slug={key} {...value} />);
}

export const Boilerplate = {
  Card: BoilerplateCard,
  Cards: BoilerplateCards,
  Button: BoilerplateButton,
  Buttons: BoilerplateButtons,
} as const;
