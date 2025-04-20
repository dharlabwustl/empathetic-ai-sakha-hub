
export interface KpiData {
  id: string;
  title: string;
  value: string;
  changePercent: number;
  label: string;
  trend: 'up' | 'down' | 'neutral';
  unit: string;
  change: string;
  icon: string;
}

export interface NudgeData {
  id: string;
  title: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
  message: string;
  timestamp: string;
}
