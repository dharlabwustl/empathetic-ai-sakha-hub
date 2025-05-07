
import { ReactNode } from 'react';

export interface NavigationRoute {
  name: string;
  path: string;
  icon: ReactNode;
}

export interface UserRouteMap {
  [key: string]: NavigationRoute[];
}
