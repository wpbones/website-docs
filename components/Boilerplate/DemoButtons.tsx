import { DemoButton } from './DemoButton';
import { boilerplateList } from './List';

export function DemoButtons({ fullWidth = false }: { fullWidth?: boolean }) {
  return Object.keys(boilerplateList).map((slug) => (
    <DemoButton key={slug} slug={slug} fullWidth={fullWidth} />
  ));
}
