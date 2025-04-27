
import { useState, useEffect } from 'react';

export interface KpiData {
  id: string;
  title?: string;
  label?: string;
  value: number | string;
  unit?: string;
  icon?: string;
  change?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
  trend?: 'up' | 'down' | 'neutral';
  trendLabel?: string;
}

export interface NudgeData {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  readAt?: string;
}

export const useKpiTracking = () => {
  const [kpis, setKpis] = useState<KpiData[]>([]);
  const [nudges, setNudges] = useState<NudgeData[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Mock KPI data loading
  useEffect(() => {
    setTimeout(() => {
      setKpis([
        {
          id: "streak",
          title: "Streak Days",
          label: "Study Streak",
          value: 12,
          icon: "🔥",
          change: 2,
          changeType: "positive",
          trend: "up",
          trendLabel: "2% from last week"
        },
        {
          id: "concepts_mastered",
          title: "Concepts Mastered",
          label: "Concepts",
          value: 48,
          icon: "📚",
          change: 5,
          changeType: "positive",
          trend: "up",
          trendLabel: "5% from last week"
        },
        {
          id: "practice_tests",
          title: "Practice Tests",
          label: "Practice Tests",
          value: 24,
          icon: "✅",
          change: 3,
          changeType: "positive",
          trend: "up",
          trendLabel: "3% from last week"
        },
        {
          id: "study_time",
          title: "Study Time",
          label: "Study Time",
          value: 28,
          unit: "hours",
          icon: "⏱️",
          change: 4,
          changeType: "positive",
          trend: "up",
          trendLabel: "4% from last week"
        }
      ]);
      
      setNudges([
        {
          id: "1",
          title: "Complete Physics Quiz",
          description: "You have an incomplete quiz to finish",
          priority: "high",
          createdAt: new Date().toISOString()
        },
        {
          id: "2",
          title: "Review Flashcards",
          description: "10 flashcards due for review today",
          priority: "medium",
          createdAt: new Date().toISOString()
        }
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);
  
  const markNudgeAsRead = (id: string) => {
    setNudges(nudges.filter(nudge => nudge.id !== id));
  };
  
  return { kpis, nudges, markNudgeAsRead, loading };
};
