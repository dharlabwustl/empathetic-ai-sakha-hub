
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
