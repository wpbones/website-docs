'use client';

import { useState } from 'react';
import { IconMessageCircle } from '@tabler/icons-react';
import { ActionIcon, Tooltip } from '@mantine/core';
import classes from './ChatLauncher.module.css';

/** The OpenWidget organisation this site's chat belongs to. */
const ORGANIZATION_ID = '3ab47060-f156-47ce-8ebb-750902b310c2';

type OpenWidgetApi = {
  on: (event: 'ready', handler: () => void) => void;
  call: (method: 'maximize') => void;
};

declare global {
  interface Window {
    __ow?: Record<string, unknown>;
    OpenWidget?: OpenWidgetApi;
  }
}

/**
 * OpenWidget's own loader, as its embed snippet writes it (the snippet that sat
 * in the Tag Manager container): a stub that queues calls until the script
 * arrives and replays them through `_h`. The script needs the stub to exist
 * before it runs; without it the widget draws but `window.OpenWidget` never
 * appears, so nothing can open it (measured).
 */
function loadOpenWidget() {
  window.__ow = {
    ...window.__ow,
    organizationId: ORGANIZATION_ID,
    integration_name: 'manual_settings',
    product_name: 'openwidget',
  };
  if (window.OpenWidget) {
    return;
  }
  type Stub = {
    _q: unknown[][];
    _h: ((...args: unknown[]) => unknown) | null;
    _v: string;
  } & Record<string, unknown>;
  const stub: Stub = { _q: [], _h: null, _v: '2.0' };
  const dispatch = (args: unknown[]) => (stub._h ? stub._h(...args) : stub._q.push(args));
  for (const method of ['on', 'once', 'off', 'call']) {
    stub[method] = (...args: unknown[]) => dispatch([method, args]);
  }
  stub.get = () => {
    if (!stub._h) {
      throw new Error("[OpenWidget] You can't use getters before load.");
    }
  };
  window.OpenWidget = stub as unknown as OpenWidgetApi;
  const script = document.createElement('script');
  script.async = true;
  script.type = 'text/javascript';
  script.src = 'https://cdn.openwidget.com/openwidget.js';
  document.head.appendChild(script);
}

/**
 * The chat, loaded only when someone asks for it.
 *
 * The widget used to arrive with every page through Google Tag Manager, and the
 * moment it loaded its provider set cookies that identify the browser for 13
 * months, before anyone had touched it. Cookies a visitor did not ask for need
 * consent first (Garante, 10 June 2021); cookies the visitor needs for a service
 * they just asked for do not. So the page carries only this button, and the
 * widget's script is injected on the click, then opened at once: the click is
 * the request.
 *
 * Once the widget is on the page it draws its own launcher, so this button
 * steps aside.
 */
export function ChatLauncher() {
  const [state, setState] = useState<'idle' | 'loading' | 'loaded'>('idle');

  if (state === 'loaded') {
    return null;
  }

  const open = () => {
    if (state !== 'idle') {
      return;
    }
    setState('loading');
    loadOpenWidget();
    window.OpenWidget?.on('ready', () => {
      window.OpenWidget?.call('maximize');
      setState('loaded');
    });
  };

  return (
    <Tooltip label="Chat with us (loads the chat service)" position="left" withArrow>
      <ActionIcon
        className={classes.launcher}
        size={56}
        radius="xl"
        variant="filled"
        aria-label="Open the chat"
        loading={state === 'loading'}
        onClick={open}
      >
        <IconMessageCircle size={28} stroke={1.6} />
      </ActionIcon>
    </Tooltip>
  );
}
