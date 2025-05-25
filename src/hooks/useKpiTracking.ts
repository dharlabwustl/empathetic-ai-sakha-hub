import { useState, useEffect } from 'react';

export interface KpiData {
  id: string;
  title: string;
  value: number;
  unit: string;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
  color?: string;
}

export interface NudgeData {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  read: boolean;
}

export const useKpiTracking = () => {
  const [kpis, setKpis] = useState<KpiData[]>([
    { id: '1', title: 'Study Streak', value: 7, unit: 'days', trend: 'up', change: '+2' },
    { id: '2', title: 'Concepts Learned', value: 245, unit: '', trend: 'up', change: '+15' },
    { id: '3', title: 'Quiz Accuracy', value: 78, unit: '%', trend: 'stable' },
    { id: '4', title: 'Hours Studied', value: 42, unit: 'hrs', trend: 'up', change: '+5' }
  ]);

  const [nudges, setNudges] = useState<NudgeData[]>([]);

  const markNudgeAsRead = (id: string) => {
    setNudges(prev => prev.map(nudge => 
      nudge.id === id ? { ...nudge, read: true } : nudge
    ));
  };

  return {
    kpis,
    nudges,
    markNudgeAsRead
  };
};
