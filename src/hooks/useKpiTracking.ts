
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface KpiData {
  id: string;
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  since?: string;
  // Adding properties needed for dashboard
  title?: string;
  icon?: React.ComponentType<any>;
  unit?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

export interface NudgeData {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  actionLabel?: string;
  actionUrl?: string;
  isRead: boolean;
  timestamp: Date;
  // Adding fields for consistency with other types
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  createdAt?: Date;
}

export const useKpiTracking = (userId?: string) => {
  const [kpis, setKpis] = useState<KpiData[]>([
    {
      id: uuidv4(),
      label: 'Study Hours',
      value: '12',
      change: '+2.5',
      trend: 'up',
      since: 'last week',
      title: 'Study Hours',
      unit: 'hrs',
      changeType: 'positive'
    },
    {
      id: uuidv4(),
      label: 'Practice Tests',
      value: '8',
      change: '+3',
      trend: 'up',
      since: 'last week',
      title: 'Practice Tests',
      unit: '',
      changeType: 'positive'
    },
    {
      id: uuidv4(),
      label: 'Concept Mastery',
      value: '68%',
      change: '+5%',
      trend: 'up',
      since: 'last month',
      title: 'Concept Mastery',
      unit: '%',
      changeType: 'positive'
    },
    {
      id: uuidv4(),
      label: 'Study Streak',
      value: '5',
      change: '-1',
      trend: 'down',
      since: 'days',
      title: 'Study Streak',
      unit: 'days',
      changeType: 'negative'
    }
  ]);
  
  const [nudges, setNudges] = useState<NudgeData[]>([
    {
      id: uuidv4(),
      title: 'Complete your profile',
      message: 'Add your exam date and preferred study times to get a personalized study plan.',
      type: 'info',
      actionLabel: 'Complete Profile',
      actionUrl: '/dashboard/student/profile',
      isRead: false,
      timestamp: new Date(),
      priority: 'medium',
      createdAt: new Date(),
      description: 'Complete your profile to get personalized recommendations'
    },
    {
      id: uuidv4(),
      title: 'Take concept test',
      message: 'Test your understanding of key concepts to improve your study plan.',
      type: 'info',
      actionLabel: 'Take Test',
      actionUrl: '/dashboard/student/tests',
      isRead: false,
      timestamp: new Date(),
      priority: 'low',
      createdAt: new Date(),
      description: 'Take a quick test to assess your current knowledge'
    }
  ]);
  
  // In a real app, you would fetch KPIs and nudges from an API based on the userId
  useEffect(() => {
    if (userId) {
      // Fetch KPIs and nudges from API
      // For now, we'll just use the mock data
    }
  }, [userId]);
  
  const markNudgeAsRead = (nudgeId: string) => {
    setNudges(prev => 
      prev.map(nudge => 
        nudge.id === nudgeId ? { ...nudge, isRead: true } : nudge
      )
    );
  };
  
  const updateKpiValue = (kpiId: string, value: string | number, change?: string, trend?: 'up' | 'down' | 'neutral') => {
    setKpis(prev => 
      prev.map(kpi => 
        kpi.id === kpiId ? { ...kpi, value, change, trend } : kpi
      )
    );
  };
  
  const addNudge = (nudge: Omit<NudgeData, 'id' | 'timestamp'>) => {
    const newNudge: NudgeData = {
      ...nudge,
      id: uuidv4(),
      timestamp: new Date(),
    };
    
    setNudges(prev => [newNudge, ...prev]);
  };
  
  return {
    kpis,
    nudges,
    markNudgeAsRead,
    updateKpiValue,
    addNudge
  };
};

export default useKpiTracking;
