import { Marquee } from '@gfazioli/mantine-marquee';
import { DemoButtons } from './DemoButtons';

export function DemoMarquee() {
  return (
    <Marquee my={24} fadeEdges pauseOnHover duration={80}>
      <DemoButtons />
    </Marquee>
  );
}
