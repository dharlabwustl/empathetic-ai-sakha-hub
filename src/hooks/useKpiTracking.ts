
import { useState, useEffect } from 'react';

export interface KpiData {
  id: string;
  title: string;
  value: number | null;
  unit: string;
  change: number | null;
  label: string;
  trend: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  description?: string;
  color?: string;
  secondaryValue?: string;
  secondaryLabel?: string;
}

export interface NudgeData {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: "low" | "medium" | "high";
  type: "reminder" | "achievement" | "suggestion" | "alert";
  action?: string;
  url?: string;
}

export const useKpiTracking = () => {
  const [kpis, setKpis] = useState<KpiData[]>([]);
  const [nudges, setNudges] = useState<NudgeData[]>([]);
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    // For demo purposes, we're using mock data
    
    // Mock KPIs
    const mockKpis: KpiData[] = [
      {
        id: 'study_time',
        title: 'Study Time',
        value: 12.5,
        unit: 'hours',
        change: 3.2,
        label: 'this week',
        trend: 'up',
        description: 'Total time spent studying'
      },
      {
        id: 'completion',
        title: 'Completion Rate',
        value: 78,
        unit: '%',
        change: 5,
        label: 'this month',
        trend: 'up',
        description: 'Assigned lessons completed'
      },
      {
        id: 'accuracy',
        title: 'Quiz Accuracy',
        value: 86,
        unit: '%',
        change: -2,
        label: 'last 7 days',
        trend: 'down',
        description: 'Average score on quizzes'
      },
      {
        id: 'focus_score',
        title: 'Focus Score',
        value: 92,
        unit: '%',
        change: 8,
        label: 'improvement',
        trend: 'up',
        description: 'Based on session analysis'
      }
    ];
    
    // Mock nudges
    const mockNudges: NudgeData[] = [
      {
        id: 'nudge1',
        title: 'Physics Quiz Due',
        message: 'You have a physics quiz due tomorrow on Newton\'s Laws',
        timestamp: new Date().toISOString(),
        read: false,
        priority: 'high',
        type: 'reminder',
        action: 'Review Quiz',
        url: '/study/quiz/physics-101'
      },
      {
        id: 'nudge2',
        title: 'Streak Achievement',
        message: 'Congrats! You\'ve maintained a 7-day study streak!',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        read: true,
        priority: 'medium',
        type: 'achievement'
      },
      {
        id: 'nudge3',
        title: 'Study Suggestion',
        message: 'Based on your progress, we recommend focusing on Organic Chemistry concepts',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        read: false,
        priority: 'low',
        type: 'suggestion',
        action: 'View Concepts',
        url: '/study/concept-cards/chemistry'
      }
    ];
    
    setKpis(mockKpis);
    setNudges(mockNudges);
  }, []);
  
  // Function to mark a nudge as read
  const markNudgeAsRead = (nudgeId: string) => {
    setNudges(prevNudges => 
      prevNudges.map(nudge => 
        nudge.id === nudgeId ? { ...nudge, read: true } : nudge
      )
    );
  };
  
  return { kpis, nudges, markNudgeAsRead };
};
