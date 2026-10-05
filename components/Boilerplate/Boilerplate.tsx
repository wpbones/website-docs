// 'use client';

import { IconBrandGithub } from '@tabler/icons-react';
import { Cards } from 'nextra/components';
import { Badge, Button, Group } from '@mantine/core';
import { AnimateBadge } from '@/components';
import { DemoButton } from './DemoButton';
import { boilerplateList, BoilerplateSlugs } from './List';
import classes from './Buttons.module.css';

type BoilerplateButtonProps = {
  slug: string;
  /** As wide as its column, for the rows of `Boilerplate.Rows`. */
  fullWidth?: boolean;
};

/** A new repository from the boilerplate's GitHub template. */
function BoilerplateButton({ slug, fullWidth = false }: BoilerplateButtonProps) {
  const { name, mostUsed, title, owner = 'wpbones' } = boilerplateList[slug];

  const hrefGitHub = `https://github.com/new?template_name=${name}&template_owner=${owner}`;

  return (
    <Button
      component="a"
      href={hrefGitHub}
      variant="default"
      size="sm"
      radius="xl"
      fullWidth={fullWidth}
      justify={fullWidth ? 'flex-start' : undefined}
      className={classes.github}
      data-full-width={fullWidth || undefined}
      leftSection={<IconBrandGithub size={18} />}
      rightSection={
        mostUsed ? (
          <Badge color="bones" variant="light" size="sm">
            Most used
          </Badge>
        ) : undefined
      }
    >
      {title} on GitHub
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
          <BoilerplateCard key={key} slug={key} {...value} />
        ))}
    </Cards>
  );
}

function BoilerplateButtons({ display = [] }: BoilerplateCardsProps) {
  return Object.keys(boilerplateList)
    .filter((key) => display.length === 0 || display.includes(key as BoilerplateSlugs))
    .map((key) => <BoilerplateButton key={key} slug={key} />);
}

/**
 * Every boilerplate on a row of its own: its GitHub template on the left, its
 * demo on the right, both as wide as their column, so the two columns line up
 * whatever the length of each name (two separate stacks of buttons sized to
 * their labels came out ragged on both sides).
 */
function BoilerplateRows({ display = [] }: BoilerplateCardsProps) {
  return (
    <div className={classes.rows}>
      {Object.keys(boilerplateList)
        .filter((key) => display.length === 0 || display.includes(key as BoilerplateSlugs))
        .flatMap((key) => [
          <BoilerplateButton key={`${key}-github`} slug={key} fullWidth />,
          <DemoButton key={`${key}-demo`} slug={key} fullWidth />,
        ])}
    </div>
  );
}

export const Boilerplate = {
  Card: BoilerplateCard,
  Cards: BoilerplateCards,
  Button: BoilerplateButton,
  Buttons: BoilerplateButtons,
  Rows: BoilerplateRows,
} as const;
