
// Define KpiData and NudgeData types for consistent use across components
export interface KpiData {
  id: string;
  title: string;
  value: string | number;
  changePercent: number;
  label: string;
  trend: 'up' | 'down' | 'neutral';
  unit: string;
  change: string;
  icon: string;
}

export type NudgeType = 'info' | 'warning' | 'success' | 'error' | 'motivation' | 'reminder' | 'celebration' | 'suggestion';

export interface NudgeData {
  id: string;
  title: string;
  read: boolean;
  type: NudgeType;
  message: string;
  timestamp: string;
}

// Mock function to export
export const useKpiTracking = () => {
  // This would normally contain actual functionality
  return {
    kpis: [] as KpiData[],
    nudges: [] as NudgeData[],
    markNudgeAsRead: (id: string) => {}
  };
};
