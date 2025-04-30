import { useState, useEffect } from 'react';

export interface KpiData {
  id: string;
  value: number;
  unit: string;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  title: string;
  icon?: React.ReactNode;
}

export interface NudgeData {
  id: string;
  title: string;
  description: string;
  type: 'alert' | 'reminder' | 'info' | 'success';
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
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
          value: 4.5,
          unit: 'hours',
          change: 0.5,
          changeType: 'increase',
          title: 'Study Time',
          icon: null
        },
        {
          id: '2',
          value: 68,
          unit: '%',
          change: 5,
          changeType: 'increase',
          title: 'Completion',
          icon: null
        },
        {
          id: '3',
          value: 42,
          unit: '',
          change: -3,
          changeType: 'decrease',
          title: 'Questions',
          icon: null
        },
        {
          id: '4',
          value: 81,
          unit: '%',
          change: 2,
          changeType: 'increase',
          title: 'Accuracy',
          icon: null
        },
      ];

      // Mock nudges
      const mockNudges: NudgeData[] = [
        {
          id: 'n1',
          title: 'Study reminder',
          description: "You haven't studied Physics in 3 days. Would you like to continue where you left off?",
          type: 'alert',
          read: false,
          priority: 'high',
          createdAt: new Date().toISOString(),
          action: {
            label: 'Continue studying',
            url: '/dashboard/student/study/physics',
          },
        },
        {
          id: 'n2',
          title: 'Practice exam available',
          description: "A new practice exam for Chemistry has been prepared based on your study progress.",
          type: 'reminder',
          read: false,
          priority: 'medium',
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          action: {
            label: 'Take practice exam',
            url: '/dashboard/student/practice-exams',
          },
        },
        {
          id: 'n3',
          title: 'Deadline approaching',
          description: "Your assignment 'Quantum Mechanics Essay' is due in 2 days.",
          type: 'info',
          read: true,
          priority: 'low',
          createdAt: new Date(Date.now() - 7200000).toISOString(),
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
