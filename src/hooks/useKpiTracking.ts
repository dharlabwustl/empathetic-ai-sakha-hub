
import { useState, useEffect } from "react";

export interface KpiData {
  id: string;
  title: string;
  value: number;
  unit?: string;
  icon?: string; // Added icon property
  change?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
  label?: string; // Added label property
  trend?: number[]; // Added trend property
}

export interface NudgeData {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
  readAt?: string;
}

export function useKpiTracking() {
  const [kpis, setKpis] = useState<KpiData[]>([]);
  const [nudges, setNudges] = useState<NudgeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call to fetch KPIs
    const fetchKpis = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        setTimeout(() => {
          setKpis([
            {
              id: "1",
              title: "Study Streak",
              value: 7,
              unit: "days",
              icon: "🔥",
              change: 2,
              changeType: "positive",
              label: "Current streak",
              trend: [2, 3, 5, 4, 6, 7, 7]
            },
            {
              id: "2",
              title: "Concepts Mastered",
              value: 42,
              icon: "📚",
              change: 5,
              changeType: "positive",
              label: "Out of 100",
              trend: [20, 24, 28, 30, 35, 38, 42]
            },
            {
              id: "3",
              title: "Quiz Accuracy",
              value: 78,
              unit: "%",
              icon: "✅",
              change: 3,
              changeType: "positive",
              label: "Last 7 days",
              trend: [65, 68, 70, 72, 74, 76, 78]
            },
            {
              id: "4",
              title: "Study Time",
              value: 24,
              unit: "hours",
              icon: "⏱️",
              change: 4,
              changeType: "positive",
              label: "Last 7 days",
              trend: [12, 15, 16, 18, 20, 22, 24]
            }
          ]);
          
          setNudges([
            {
              id: "1",
              title: "Complete your daily flashcards",
              description: "You have 15 flashcards due for review today",
              priority: "high",
              createdAt: new Date().toISOString()
            },
            {
              id: "2",
              title: "Physics quiz available",
              description: "A new quiz on Wave Mechanics is now available",
              priority: "medium",
              createdAt: new Date().toISOString()
            },
            {
              id: "3",
              title: "Update your study plan",
              description: "Your study plan needs updating based on recent progress",
              priority: "low",
              createdAt: new Date().toISOString()
            }
          ]);
          
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to fetch KPIs");
        setLoading(false);
      }
    };

    fetchKpis();
  }, []);

  const markNudgeAsRead = (id: string) => {
    setNudges(prevNudges =>
      prevNudges.map(nudge =>
        nudge.id === id
          ? { ...nudge, readAt: new Date().toISOString() }
          : nudge
      )
    );
  };

  return { kpis, nudges, loading, error, markNudgeAsRead };
}
