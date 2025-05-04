import { DemoButton } from './DemoButton';
import { boilerplateList } from './List';

export function DemoButtons() {
  return Object.keys(boilerplateList).map((slug) => <DemoButton key={slug} slug={slug} />);
}
