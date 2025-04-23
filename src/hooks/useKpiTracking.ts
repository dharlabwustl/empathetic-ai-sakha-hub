
import { useState, useEffect } from 'react';
import { UserRole } from '@/types/user/base';

export interface KpiData {
  id: string;
  title: string;
  value: string | number;
  trend?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
  };
  previousValue?: string | number;
  changePercentage?: number;
  changeDirection?: 'up' | 'down' | 'neutral';
  target?: string | number;
  chartData?: { date: string; value: number }[];
  icon?: React.ReactNode; // Added to fix build error
  label?: string; // Added to fix build error
  unit?: string; // Added to fix build error
  change?: number; // Added to fix build error
}

export interface NudgeData {
  id: string;
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  timestamp?: string;
  isRead?: boolean;
  read?: boolean; // Added to fix build error
  type?: string; // Added to fix build error
  actionLabel?: string; // Added to fix build error
  actionUrl?: string; // Added to fix build error
}

export const useKpiTracking = (userRole: UserRole) => {
  const [kpis, setKpis] = useState<KpiData[]>([]);
  const [nudges, setNudges] = useState<NudgeData[]>([]);

  useEffect(() => {
    // Mock data for demonstration purposes
    // In a real app, this would fetch data from an API
    if (userRole === UserRole.Student) {
      setKpis([
        {
          id: '1',
          title: 'Study Hours',
          value: '24h',
          trend: { value: 10, trend: 'up' },
          changePercentage: 10,
          changeDirection: 'up',
          label: 'Hours',
          unit: 'h',
          change: 10
        },
        {
          id: '2',
          title: 'Concepts Mastered',
          value: '35',
          trend: { value: 5, trend: 'up' },
          changePercentage: 5,
          changeDirection: 'up',
          label: 'Concepts',
          unit: '',
          change: 5
        },
        {
          id: '3',
          title: 'Test Scores',
          value: '85%',
          trend: { value: 2, trend: 'up' },
          changePercentage: 2,
          changeDirection: 'up',
          label: 'Score',
          unit: '%',
          change: 2
        }
      ]);
      
      setNudges([
        {
          id: '1',
          title: 'Complete Your Profile',
          message: 'Add your educational background to get more personalized recommendations.',
          priority: 'medium',
          timestamp: new Date().toISOString(),
          isRead: false,
          read: false,
          type: 'profile',
          actionLabel: 'Complete Profile',
          actionUrl: '/dashboard/student/profile'
        },
        {
          id: '2',
          title: 'Practice Test Available',
          message: 'A new practice test for your upcoming exam is now available.',
          priority: 'high',
          timestamp: new Date().toISOString(),
          isRead: false,
          read: false,
          type: 'quiz',
          actionLabel: 'Take Test',
          actionUrl: '/dashboard/student/quizzes'
        }
      ]);
    }
  }, [userRole]);

  const markNudgeAsRead = (id: string) => {
    setNudges((prevNudges) =>
      prevNudges.map((nudge) =>
        nudge.id === id ? { ...nudge, isRead: true, read: true } : nudge
      )
    );
  };

  return { kpis, nudges, markNudgeAsRead };
};
