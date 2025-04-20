
export interface KpiData {
  id: string;
  title: string;
  value: string;
  changePercent?: number;
  label?: string;
  unit?: string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}

export interface NudgeData {
  id: string;
  title: string;
  read?: boolean;
  type?: 'info' | 'warning' | 'success' | 'error';
  message?: string;
  timestamp?: string;
}
