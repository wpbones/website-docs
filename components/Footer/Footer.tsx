'use client';

import NextImage from 'next/image';
import {
  IconBrandDiscordFilled,
  IconBrandGithubFilled,
  IconBrandMantine,
  IconBrandNextjs,
  IconBrandVercel,
  IconBrandX,
  IconCoffee,
  IconHeartFilled,
  IconMailHeart,
  IconPlus,
} from '@tabler/icons-react';
import {
  ActionIcon,
  Anchor,
  Avatar,
  Button,
  Container,
  Grid,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import config from '@/config';
import { AnimateBadge } from '../AnimateBadge';
import wpBonesLogo from '../wpbones-logo.png';
import { ecosystem, highlights, resources, sponsors } from './links';
import NextraLogo from './nextra.svg';
import classes from './Footer.module.css';

type FooterProps = { year: number };

type VerticalLink = {
  key: string;
  title: string;
  href: string;
  newWindow?: boolean;
  new?: boolean;
};

/** WP Bones' own GitHub Sponsors profile: it is not the author's personal one. */
const SPONSORS_URL = 'https://github.com/sponsors/wpbones';

const VerticalLinks = ({ list }: { list: VerticalLink[] }) => {
  return (
    <>
      {list.map((item) => (
        <Group key={item.key} gap={8} wrap="nowrap">
          <Anchor
            className={classes.columnAnchor}
            href={item.href}
            target={item.newWindow ? '_blank' : undefined}
            rel={item.newWindow ? 'noopener noreferrer' : undefined}
          >
            {item.title}
          </Anchor>
          {item.new && <AnimateBadge />}
        </Group>
      ))}
    </>
  );
};

/*
 * Aligned with findergit.app's footer (2026-10-05, the user: "allinea anche
 * il footer"), which took it from netfox.app: no drawn rules anywhere. What
 * separates things is ground and objects -- the footer's own ground fading in
 * from the page, the sponsor block as a card with its own edges, and space.
 * The sponsor wall keeps its avatars and its "Your logo here" slot: WP Bones
 * has no sponsors yet, and its slot points at WP Bones' own profile.
 */
export const Footer: React.FC<FooterProps> = ({ year }) => {
  const { legal } = config;
  return (
    <footer className={classes.contentFooter}>
      <Container className={classes.footer} size="lg">
        <Grid grow>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Stack gap="sm">
              <NextImage src={wpBonesLogo} width={40} height={40} alt="WP Bones" />
              <Text fz={13} c="dimmed" maw={340} lh={1.6}>
                WP Bones is a lightweight framework that offers tools and guidelines to simplify
                WordPress plugin development, so you can write a plugin the way you write a Laravel
                application.
              </Text>
              <Group gap={4}>
                <ActionIcon
                  variant="subtle"
                  component="a"
                  href="https://twitter.com/wpbonesx"
                  aria-label="WP Bones on X"
                >
                  <IconBrandX size={20} />
                </ActionIcon>
                <ActionIcon
                  variant="subtle"
                  component="a"
                  href="https://github.com/wpbones/WPBones"
                  aria-label="WP Bones on GitHub"
                >
                  <IconBrandGithubFilled size={20} />
                </ActionIcon>
                <ActionIcon
                  variant="subtle"
                  component="a"
                  href="https://discord.gg/5bdVyycU8F"
                  aria-label="WP Bones on Discord"
                >
                  <IconBrandDiscordFilled size={20} />
                </ActionIcon>
                <ActionIcon
                  variant="subtle"
                  component="a"
                  href="https://wpbones.substack.com/"
                  aria-label="WP Bones News, the newsletter"
                >
                  <IconMailHeart size={20} />
                </ActionIcon>
              </Group>
            </Stack>
          </Grid.Col>
          <Grid.Col className={classes.column} span={{ base: 12, xs: 4, sm: 2 }}>
            <Stack gap={10}>
              <Text className={classes.title}>Highlights</Text>
              <VerticalLinks list={highlights} />
            </Stack>
          </Grid.Col>
          <Grid.Col className={classes.column} span={{ base: 12, xs: 4, sm: 2 }}>
            <Stack gap={10}>
              <Text className={classes.title}>Resources</Text>
              <VerticalLinks list={resources} />
            </Stack>
          </Grid.Col>
          <Grid.Col className={classes.column} span={{ base: 12, xs: 4, sm: 2 }}>
            <Stack gap={10}>
              <Text className={classes.title}>Ecosystem</Text>
              <VerticalLinks list={ecosystem} />
            </Stack>
          </Grid.Col>
        </Grid>

        {/* Sponsors: a card, so its own edges do the separating. */}
        <div id="sponsors" className={classes.sponsors}>
          <div className={classes.sponsorsCopy}>
            <Group gap={8} wrap="nowrap">
              <IconHeartFilled size={18} className={classes.heart} />
              <Text fw={700} fz="lg" c="var(--wpb-ink)">
                Support WP Bones
              </Text>
            </Group>
            <Text fz={14} c="dimmed" lh={1.6} mt={6}>
              WP Bones is free and open source. If it saves you time, consider sponsoring it.
              Sponsors get their name or logo featured here and across the WP Bones documentation
              sites.
            </Text>
          </div>

          <div className={classes.sponsorsActions}>
            <Group gap="lg" justify="center">
              {sponsors.map((sponsor) => (
                <Anchor
                  key={sponsor.key}
                  href={sponsor.href ?? `https://github.com/${sponsor.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="never"
                >
                  <Stack gap={4} align="center">
                    <Avatar
                      src={`https://github.com/${sponsor.github}.png`}
                      alt={sponsor.name}
                      size="md"
                      radius="xl"
                      imageProps={{ loading: 'lazy', decoding: 'async' }}
                    />
                    <Text fz={11} c="dimmed">
                      {sponsor.name}
                    </Text>
                  </Stack>
                </Anchor>
              ))}
              <Anchor
                href={SPONSORS_URL}
                target="_blank"
                rel="noopener noreferrer"
                underline="never"
              >
                <Stack gap={4} align="center">
                  <Avatar size="md" radius="xl" className={classes.sponsorSlot}>
                    <IconPlus size={18} />
                  </Avatar>
                  <Text fz={11} c="dimmed">
                    Your logo here
                  </Text>
                </Stack>
              </Anchor>
            </Group>
            <Group gap="sm" justify="center">
              <Button
                component="a"
                href={SPONSORS_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="gradient"
                // Shade 7, not Mantine's default 6: white on pink-6 is 3.7:1
                // and on grape-6 4.0:1; on these, 4.6:1 and 4.8:1.
                gradient={{ from: 'pink.7', to: 'grape.7' }}
                leftSection={<IconHeartFilled size={16} />}
                radius="xl"
              >
                Become a sponsor
              </Button>
              <Button
                component="a"
                href="https://donate.stripe.com/fZu4gy4Tn3b1dgudGx0co00"
                target="_blank"
                rel="noopener noreferrer"
                variant="filled"
                color="yellow"
                leftSection={<IconCoffee size={16} />}
                radius="xl"
                // Dark ink on the yellow, not white: white on yellow-6 measured
                // 1.9:1; this is about 8:1.
                styles={{
                  label: { color: '#3b2600' },
                  section: { color: '#3b2600' },
                }}
              >
                Buy me a coffee
              </Button>
            </Group>
          </div>
        </div>

        {/* Colophon and the publisher line, parted by middots, not rules. */}
        <div className={classes.colophon}>
          <Text fz={12} c="dimmed" className={classes.credits}>
            Made with ❤️ by{' '}
            <Anchor fz={12} href="https://gfazioli.github.io/">
              Undolog
            </Anchor>
            <span className={classes.dot} aria-hidden>
              ·
            </span>
            Hosted on{' '}
            <Anchor fz={12} href="https://vercel.com/" className={classes.brand}>
              <IconBrandVercel size={13} /> Vercel
            </Anchor>
            <span className={classes.dot} aria-hidden>
              ·
            </span>
            Built with{' '}
            <Anchor fz={12} href="https://vercel.com/frameworks/nextjs" className={classes.brand}>
              <IconBrandNextjs size={13} /> Next.js
            </Anchor>
            ,{' '}
            <Anchor fz={12} href="https://mantine.dev/" className={classes.brand}>
              <IconBrandMantine size={13} /> Mantine
            </Anchor>{' '}
            and{' '}
            <Anchor fz={12} href="https://nextra.site/" className={classes.brand}>
              <NextImage src={NextraLogo} width={13} height={13} alt="" /> Nextra
            </Anchor>
          </Text>

          {/*
            Who publishes the site, on every page: brand, owner and VAT number,
            with the legal notice and the privacy policy one click away (see
            `legal` in config/index.ts, the same values as the app sites). The
            year comes from the server layout, so the client cannot hydrate with
            a different one. Text pieces sit in template literals so no JSX
            whitespace rule can drop a space between them.
          */}
          <Text fz={12} c="dimmed" className={classes.legal}>
            {`© ${year} ${legal.brand} — ${legal.owner} · P.IVA ${legal.vatNumber} · `}
            <Anchor fz={12} href="/docs/legal">
              Legal
            </Anchor>
            {' · '}
            <Anchor fz={12} href="/docs/privacy">
              Privacy
            </Anchor>
          </Text>
        </div>
      </Container>
    </footer>
  );
};
