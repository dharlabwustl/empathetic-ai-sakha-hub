
import { useState, useEffect } from 'react';

export interface KpiData {
  id: string;
  name: string;
  value: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  label: string;
  icon?: React.ReactNode;
}

export interface NudgeData {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  read: boolean;
  action?: {
    label: string;
    url: string;
  };
}

export const useKpiTracking = () => {
  const [kpis, setKpis] = useState<KpiData[]>([]);
  const [nudges, setNudges] = useState<NudgeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchKpis = async () => {
      // Mock KPI data
      const mockKpis: KpiData[] = [
        {
          id: '1',
          name: 'Study Time',
          value: 4.5,
          unit: 'hours',
          change: 0.5,
          trend: 'up',
          label: 'Today',
          icon: null
        },
        {
          id: '2',
          name: 'Completion',
          value: 68,
          unit: '%',
          change: 5,
          trend: 'up',
          label: 'This week',
          icon: null
        },
        {
          id: '3',
          name: 'Questions',
          value: 42,
          unit: '',
          change: -3,
          trend: 'down',
          label: 'This week',
          icon: null
        },
        {
          id: '4',
          name: 'Accuracy',
          value: 81,
          unit: '%',
          change: 2,
          trend: 'up',
          label: 'Last 30 days',
          icon: null
        },
      ];

      // Mock nudges
      const mockNudges: NudgeData[] = [
        {
          id: 'n1',
          title: 'Study reminder',
          description: "You haven't studied Physics in 3 days. Would you like to continue where you left off?",
          type: 'info',
          timestamp: new Date().toISOString(),
          read: false,
          action: {
            label: 'Continue studying',
            url: '/dashboard/student/study/physics',
          },
        },
        {
          id: 'n2',
          title: 'Practice exam available',
          description: "A new practice exam for Chemistry has been prepared based on your study progress.",
          type: 'success',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          read: false,
          action: {
            label: 'Take practice exam',
            url: '/dashboard/student/practice-exams',
          },
        },
        {
          id: 'n3',
          title: 'Deadline approaching',
          description: "Your assignment 'Quantum Mechanics Essay' is due in 2 days.",
          type: 'warning',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          read: true,
        },
      ];

      setKpis(mockKpis);
      setNudges(mockNudges);
      setLoading(false);
    };

    fetchKpis();
  }, []);

  const markNudgeAsRead = (nudgeId: string) => {
    setNudges((prevNudges) =>
      prevNudges.map((nudge) =>
        nudge.id === nudgeId ? { ...nudge, read: true } : nudge
      )
    );
  };

  return {
    kpis,
    nudges,
    loading,
    markNudgeAsRead,
  };
};
