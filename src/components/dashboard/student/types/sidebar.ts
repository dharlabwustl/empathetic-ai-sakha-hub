
import { ReactElement } from 'react';

export interface NavigationRoute {
  name: string;
  path: string;
  icon: ReactElement | React.FC<any>;
  isPremium?: boolean;
}

export type UserRouteMap = {
  [key: string]: NavigationRoute[];
};
