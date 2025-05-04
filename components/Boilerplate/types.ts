import { ReactElement, ReactNode } from 'react';

export type BoilerplateType = {
  title: ReactNode;
  name: string;
  icon?: ReactElement;
  owner?: string;
  highlight?: boolean;
  mostUsed?: boolean;
};
