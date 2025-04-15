import { useState, useEffect } from 'react';

export interface KpiData {
  id: string;
  label: string;
  value: string | number;
  icon: string;
  change: number;
  trend?: 'up' | 'down' | 'flat';
  unit?: string;
}

export interface NudgeData {
  id: string;
  title: string;
  message: string;
  type: 'motivation' | 'reminder' | 'celebration' | 'suggestion' | 'warning';
  createdAt: string;
  read: boolean;
  actionLabel?: string;
  actionUrl?: string;
  priority?: 'high' | 'medium' | 'low';
}

export function useKpiTracking(userType: string) {
  const [kpis, setKpis] = useState<KpiData[]>([]);
  const [nudges, setNudges] = useState<NudgeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKpis = async () => {
      setLoading(true);

      // Simulate API call
      setTimeout(() => {
        // Generate mock KPIs based on user type
        if (userType === 'student') {
          setKpis([
            {
              id: 'study-time',
              label: 'Study Time Today',
              value: '2.5',
              icon: 'Clock',
              change: 15,
              trend: 'up',
              unit: 'hrs'
            },
            {
              id: 'progress',
              label: 'Overall Progress',
              value: '68',
              icon: 'LineChart',
              change: 5,
              trend: 'up',
              unit: '%'
            },
            {
              id: 'streak',
              label: 'Study Streak',
              value: '5',
              icon: 'Flame',
              change: 0,
              trend: 'flat',
              unit: 'days'
            },
            {
              id: 'mood',
              label: 'Focus Level',
              value: '85',
              icon: 'Brain',
              change: 10,
              trend: 'up',
              unit: '%'
            }
          ]);
          
          setNudges([
            {
              id: 'n1',
              title: 'Physics Quiz Due',
              message: 'Your physics quiz on Thermodynamics is due tomorrow.',
              type: 'reminder',
              createdAt: new Date().toISOString(),
              read: false,
              actionLabel: 'Start Quiz',
              actionUrl: '/quiz/physics-thermo'
            },
            {
              id: 'n2',
              title: 'Study Streak Milestone!',
              message: "You've maintained your study streak for 5 days. Keep it up!",
              type: 'celebration',
              createdAt: new Date().toISOString(),
              read: false
            },
            {
              id: 'n3',
              title: 'New Chemistry Resources',
              message: 'Check out the new resources for Organic Chemistry.',
              type: 'suggestion',
              createdAt: new Date(Date.now() - 86400000).toISOString(),
              read: true,
              actionLabel: 'View Resources',
              actionUrl: '/resources/chemistry'
            }
          ]);
        } else {
          setKpis([
            {
              id: 'activity',
              label: 'Activity Score',
              value: '82',
              icon: 'LineChart',
              change: 8,
              trend: 'up',
              unit: '%'
            },
            {
              id: 'goals-progress',
              label: 'Goals Progress',
              value: '3/5',
              icon: 'CheckSquare',
              change: 20,
              trend: 'up',
              unit: ''
            },
            {
              id: 'engagement',
              label: 'Weekly Engagement',
              value: '4.2',
              icon: 'TrendingUp',
              change: 5,
              trend: 'flat',
              unit: 'hrs'
            },
            {
              id: 'wellness',
              label: 'Wellness Score',
              value: '75',
              icon: 'Heart',
              change: 0,
              trend: 'flat',
              unit: '%'
            }
          ]);
          
          setNudges([
            {
              id: 'n1',
              title: 'Complete Your Profile',
              message: 'Add more details to your profile to get personalized recommendations.',
              type: 'suggestion',
              createdAt: new Date().toISOString(),
              read: false,
              actionLabel: 'Update Profile',
              actionUrl: '/profile'
            },
            {
              id: 'n2',
              title: 'Upcoming Goal Deadline',
              message: 'Your goal "Complete Project Plan" is due in 3 days.',
              type: 'reminder',
              createdAt: new Date().toISOString(),
              read: false,
              actionLabel: 'View Goal',
              actionUrl: '/goals'
            }
          ]);
        }
        
        setLoading(false);
      }, 800);
    };

    fetchKpis();
  }, [userType]);

  const markNudgeAsRead = (id: string) => {
    setNudges(nudges.map(nudge => 
      nudge.id === id ? { ...nudge, read: true } : nudge
    ));
  };

  return { kpis, nudges, loading, markNudgeAsRead };
}
