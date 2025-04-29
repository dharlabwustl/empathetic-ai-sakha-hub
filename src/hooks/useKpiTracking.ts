
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

export interface NudgeData {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  read: boolean;
}

export const useKpiTracking = (userRole: string) => {
  // Sample data for demonstration
  const kpis: KpiData[] = [
    {
      id: "study-time",
      value: 24,
      label: "Study Hours",
      trend: { value: 8, direction: "up" },
      trendLabel: "vs last week"
    },
    {
      id: "completion",
      value: "67%",
      label: "Task Completion",
      trend: { value: 5, direction: "up" },
      trendLabel: "vs last week"
    },
    {
      id: "practice",
      value: 32,
      label: "Practice Tests",
      trend: { value: 2, direction: "down" },
      trendLabel: "vs last week"
    }
  ];

  const nudges: NudgeData[] = [
    {
      id: "1",
      title: "Study Reminder",
      description: "Time to review your Physics concepts",
      type: "info",
      timestamp: new Date().toISOString(),
      read: false
    },
    {
      id: "2",
      title: "Congratulations!",
      description: "You've completed all your tasks for today",
      type: "success",
      timestamp: new Date().toISOString(),
      read: false
    }
  ];

  const markNudgeAsRead = (id: string) => {
    // In a real application, this would update state or call an API
    console.log(`Marking nudge ${id} as read`);
  };

  return {
    kpis,
    nudges,
    markNudgeAsRead
  };
};
