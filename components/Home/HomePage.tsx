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
