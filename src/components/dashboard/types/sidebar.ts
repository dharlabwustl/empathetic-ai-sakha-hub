

export interface NavigationRoute {
  name: string;
  path: string;
  icon: React.ReactNode;
}

export interface UserRouteMap {
  student: NavigationRoute[];
  employee: NavigationRoute[];
  doctor: NavigationRoute[];
  founder: NavigationRoute[];
  [key: string]: NavigationRoute[];
}

export interface SidebarNavProps {
  userType: string;
  userName?: string;
}

