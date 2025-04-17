
import { ReactNode } from "react";

export interface NavigationRoute {
  name: string;
  path: string;
  icon: ReactNode;
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

export interface KpiData {
  id: string;
  label: string;
  value: number;
  unit: string;
  change: number; // percentage change
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}

export interface NudgeData {
  id: string;
  type: 'motivation' | 'reminder' | 'celebration' | 'suggestion' | 'warning';
  title: string;
  message: string;
  actionLabel?: string;
  actionUrl?: string;
  timestamp: string;
  read: boolean;
}

export interface FeatureData {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  url: string;
  enabled: boolean;
}
