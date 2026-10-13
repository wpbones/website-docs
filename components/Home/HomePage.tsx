import { Boilerplates } from '@/components/Home/Boilerplates';
import { Console } from '@/components/Home/Console';
import { Ecosystem } from '@/components/Home/Ecosystem';
import { FeatureTour } from '@/components/Home/FeatureTour/FeatureTour';
import { FinalCta } from '@/components/Home/FinalCta';
import { Hero } from '@/components/Home/Hero';
import classes from './Home.module.css';
import { Showcase } from '@/components/Home/Showcase';
import { Statement } from '@/components/Home/Statement';
import { Toolbelt } from '@/components/Home/Toolbelt';
import { WhatsNew } from '@/components/Home/WhatsNew';
import { ScrollGuide } from '@/components/Mascot/ScrollGuide';
import { FEATURES } from '@/components/Home/FeatureTour/features';
import config from '@/config';
import pack from '../../package.json';

/**
 * What the home page is, for a search engine: the site (its name is what
 * Google shows above a result) and the framework as source code, with its
 * repository, language, licence and current version. Every value is one the
 * page or the repository already states.
 */
const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://wpbones.com/#website',
      url: 'https://wpbones.com/',
      name: 'WP Bones',
    },
    {
      '@type': 'SoftwareSourceCode',
      name: 'WP Bones',
      description: config.metadata.description,
      url: 'https://wpbones.com/',
      codeRepository: 'https://github.com/wpbones/WPBones',
      programmingLanguage: 'PHP',
      runtimePlatform: 'WordPress',
      license: 'https://spdx.org/licenses/LGPL-3.0-or-later.html',
      version: pack.version,
      author: { '@type': 'Person', name: config.legal.owner },
    },
  ],
};

/**
 * The home page, in the order it argues: what WP Bones is (the hero), what it
 * is made of (the tools), the claim (the statement), what its recent releases
 * brought and the tests behind them (what's new), the proof in code (the
 * feature tour), the command line that writes that code, where to start (the
 * boilerplates), what comes with it (the ecosystem), who ships with it (the
 * showcase), and the way in again. A server component: only the islands that
 * move or react are client code.
 */
export function HomePage() {
  return (
    <main className={classes.page}>
      <script
        type="application/ld+json"
        // `<` escaped, so no value can ever close the script element.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(STRUCTURED_DATA).replace(/</g, '\\u003c'),
        }}
      />
      <div className={classes.frame}>
        <Hero />
        <Toolbelt />
        <Statement />
        <div className={classes.rule} />
        <WhatsNew />
        <div className={classes.rule} />
        <FeatureTour />
        <div className={classes.rule} />
        <Console />
        <div className={classes.rule} />
        <Boilerplates />
        <div className={classes.rule} />
        <Ecosystem />
        <div className={classes.rule} />
        <Showcase />
        <div className={classes.rule} />
        <FinalCta />
      </div>
      {/* The tour's own lines, as the mascot's tips: no claim the page does not make. */}
      <ScrollGuide
        tips={FEATURES.map(({ label, blurb }) => ({ title: label, description: blurb }))}
      />
    </main>
  );
}
