import {
  IconBrandLaravel,
  IconBrandMantine,
  IconBrandNpm,
  IconBrandPhp,
  IconBrandReact,
  IconBrandSass,
  IconBrandTypescript,
  IconBrandWordpress,
} from '@tabler/icons-react';
import { revealItem } from '@/components/Motion/reveal-props';
import { RevealScope } from '@/components/Motion/RevealScope';
import classes from './Toolbelt.module.css';

/**
 * Where Laravel's home page names the companies it powers, this names the
 * tools a WP Bones plugin is written with: each one is in the framework or a
 * boilerplate: Eloquent and Blade in `WPBones/src`; React, TypeScript and
 * Mantine in their boilerplates; Less (less-loader) and Sass (@wordpress/
 * scripts' own sass-loader) in every boilerplate's build.
 */
const TOOLS = [
  { name: 'WordPress', icon: IconBrandWordpress },
  { name: 'PHP & Composer', icon: IconBrandPhp },
  { name: 'Eloquent', icon: IconBrandLaravel },
  { name: 'React', icon: IconBrandReact },
  { name: 'TypeScript', icon: IconBrandTypescript },
  { name: 'Mantine', icon: IconBrandMantine },
  { name: 'Sass & Less', icon: IconBrandSass },
  { name: 'npm & Yarn', icon: IconBrandNpm },
];

export function Toolbelt() {
  return (
    <RevealScope className={classes.belt}>
      <p className={classes.label}>
        Built with tools
        <br />
        you already know
      </p>
      <ul className={classes.tools}>
        {TOOLS.map(({ name, icon: Icon }, i) => (
          <li key={name} {...revealItem('pop', 60 * i)}>
            <Icon size={22} stroke={1.6} aria-hidden="true" />
            {name}
          </li>
        ))}
      </ul>
    </RevealScope>
  );
}
