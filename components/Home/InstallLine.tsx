'use client';

import { IconCheck, IconCopy } from '@tabler/icons-react';
import { CopyButton } from '@mantine/core';
import classes from './InstallLine.module.css';

/**
 * The first command, as the installation guide gives it
 * (content/getting-started/installation.mdx, "Clone from GitHub"): the base
 * boilerplate cloned into a folder of your own. A copy button beside it.
 */
export const INSTALL_COMMAND =
  'git clone -b main https://github.com/wpbones/WPKirk-Boilerplate.git my-plugin';

export function InstallLine() {
  return (
    <div className={classes.line}>
      <span className={classes.prompt} aria-hidden="true">
        $
      </span>
      <code className={classes.command}>{INSTALL_COMMAND}</code>
      <CopyButton value={INSTALL_COMMAND} timeout={1600}>
        {({ copied, copy }) => (
          <button
            type="button"
            className={classes.copy}
            onClick={copy}
            aria-label={copied ? 'Copied' : 'Copy the command'}
            data-copied={copied || undefined}
          >
            {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
          </button>
        )}
      </CopyButton>
    </div>
  );
}
