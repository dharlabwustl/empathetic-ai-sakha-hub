
export interface NavigationRoute {
  name: string;
  path: string;
  icon: React.ReactNode;
}

export interface UserRouteMap {
  [key: string]: NavigationRoute[];
}
