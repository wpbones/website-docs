import type { CSSProperties } from 'react';
import {
  IconBolt,
  IconDatabase,
  IconLayoutDashboard,
  IconPackage,
  IconSettings,
} from '@tabler/icons-react';
import { Mascot } from '@/components/Mascot/Mascot';
import { TiltStage } from './TiltStage';
import classes from './PluginStack.module.css';

/**
 * A WP Bones plugin, drawn as the layers it is made of, from the framework at
 * the bottom to the views on top: the folders a boilerplate ships with
 * (WPKirk-Boilerplate's tree) and what each holds. The mascot stands on the
 * top layer.
 *
 * Seen from above at an angle, the layers sit close; as the reader scrolls
 * past the hero they move apart, the plugin opening up into its parts. That
 * spread is a CSS scroll-driven animation, so it costs no script and no frame
 * that is not scrolling; where the browser has none, or the reader asked for
 * reduced motion, the layers simply stand apart (PluginStack.module.css).
 *
 * On hover the layers lift further apart, the whole stack leans toward the
 * pointer (`TiltStage`) and the mascot hops.
 *
 * Decoration: the hero's copy says all of it in words, so the drawing is
 * `aria-hidden` (on the stage).
 */
const LAYERS = [
  { folder: 'vendor/wpbones', role: 'The framework', icon: IconPackage, tone: 'steel' },
  { folder: 'config/', role: 'Menus, routes, options', icon: IconSettings, tone: 'sky' },
  { folder: 'plugin/', role: 'Controllers, models, providers', icon: IconBolt, tone: 'deep' },
  { folder: 'database/', role: 'Migrations and seeders', icon: IconDatabase, tone: 'sky' },
  {
    folder: 'resources/',
    role: 'Blade views, React apps',
    icon: IconLayoutDashboard,
    tone: 'amber',
  },
] as const;

export function PluginStack() {
  return (
    <TiltStage className={classes.stage}>
      <div className={classes.iso}>
        <div className={classes.ground} />
        {LAYERS.map(({ folder, role, icon: Icon, tone }, i) => (
          <div
            key={folder}
            className={classes.layer}
            style={{ '--i': i } as CSSProperties}
            data-tone={tone}
          >
            {/* Lifted apart on hover; the layer itself is the scroll's. */}
            <div className={classes.lift}>
              <div className={classes.slab}>
                <span className={classes.badge}>
                  <Icon size={22} stroke={1.8} />
                </span>
                {/* The folder last: on the front edge, the band the layer above leaves in view. */}
                <span className={classes.text}>
                  <span className={classes.role}>{role}</span>
                  <span className={classes.folder}>{folder}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className={classes.layer} style={{ '--i': LAYERS.length } as CSSProperties}>
          <div className={classes.lift}>
            <div className={classes.rider} data-mascot-spot="">
              <Mascot />
            </div>
          </div>
        </div>
      </div>
    </TiltStage>
  );
}
