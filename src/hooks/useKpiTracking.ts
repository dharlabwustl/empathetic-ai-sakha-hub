import { LucideIcon } from 'lucide-react';

export interface KpiData {
  id: string;
  value: number | string;
  label: string;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  trendLabel?: string;
  icon?: LucideIcon;
}
