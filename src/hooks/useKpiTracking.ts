import { useState, useEffect } from "react";
import { UserRole } from "@/types/user";

export interface KpiData {
  id: string;
  title: string;
  value: number | string;
  change?: number;
  goal?: number;
  unit?: string;
  icon?: React.ReactNode;
  color?: string;
  sparklineData?: number[];
}

export interface NudgeData {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'warning' | 'success' | 'danger';
  isRead: boolean;
  date: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const useKpiTracking = (role: UserRole) => {
  const [kpis, setKpis] = useState<KpiData[]>([]);
  const [nudges, setNudges] = useState<NudgeData[]>([]);

  const markNudgeAsRead = (nudgeId: string) => {
    setNudges(prev =>
      prev.map(nudge =>
        nudge.id === nudgeId ? { ...nudge, isRead: true } : nudge
      )
    );
  };

  useEffect(() => {
    const fetchKpisAndNudges = () => {
      setTimeout(() => {
        let roleSpecificKpis: KpiData[] = [];
        let roleSpecificNudges: NudgeData[] = [];

        if (role === "student" || role === "Student") {
          roleSpecificKpis = [
            {
              id: 'study-time',
              title: 'Study Time',
              value: 12.5,
              change: 2.3,
              unit: 'hours',
              sparklineData: [3, 4, 6, 5, 7, 9, 8]
            },
            {
              id: 'focus-score',
              title: 'Focus Score',
              value: 84,
              change: -2,
              unit: '%',
              sparklineData: [89, 86, 90, 85, 82, 84, 84]
            },
            {
              id: 'topics-mastered',
              title: 'Topics Mastered',
              value: 12,
              change: 4,
              sparklineData: [4, 5, 6, 7, 8, 10, 12]
            },
            {
              id: 'quiz-score',
              title: 'Avg. Quiz Score',
              value: 76,
              change: 8,
              unit: '%',
              sparklineData: [65, 68, 70, 72, 75, 74, 76]
            }
          ];

          roleSpecificNudges = [
            {
              id: 'exam-reminder',
              title: 'Chemistry Test Tomorrow',
              description: 'Don\'t forget to review your notes for the upcoming test',
              type: 'warning',
              isRead: false,
              date: '2025-05-15T10:00:00'
            },
            {
              id: 'achievement',
              title: 'Achievement Unlocked',
              description: 'You\'ve mastered "Periodic Table" - great job!',
              type: 'success',
              isRead: false,
              date: '2025-05-14T14:30:00'
            },
            {
              id: 'new-content',
              title: 'New Study Materials',
              description: 'Check out newly added Physics formula sheets',
              type: 'info',
              isRead: false,
              date: '2025-05-14T09:15:00',
              action: {
                label: 'View',
                onClick: () => console.log('Navigate to materials')
              }
            }
          ];
        } else if (role === "employee" || role === "Employee") {
          roleSpecificKpis = [
            {
              id: 'learning-time',
              title: 'Learning Time',
              value: 8.5,
              change: 1.5,
              unit: 'hours',
              sparklineData: [5, 6, 7, 7, 8, 8.5, 8.5]
            },
            {
              id: 'skills-acquired',
              title: 'Skills Acquired',
              value: 7,
              change: 2,
              sparklineData: [3, 4, 4, 5, 5, 6, 7]
            },
            {
              id: 'courses-completed',
              title: 'Courses Completed',
              value: 3,
              change: 1,
              sparklineData: [0, 1, 1, 2, 2, 2, 3]
            },
            {
              id: 'productivity-score',
              title: 'Productivity Score',
              value: 82,
              change: 4,
              unit: '%',
              sparklineData: [72, 75, 76, 78, 80, 81, 82]
            }
          ];
        } else if (role === "doctor" || role === "Doctor") {
          roleSpecificKpis = [
            {
              id: 'cme-credits',
              title: 'CME Credits',
              value: 24,
              change: 8,
              sparklineData: [10, 12, 14, 16, 18, 20, 24]
            },
            {
              id: 'research-papers',
              title: 'Research Papers',
              value: 4,
              change: 1,
              sparklineData: [1, 2, 2, 3, 3, 3, 4]
            },
            {
              id: 'cases-reviewed',
              title: 'Cases Reviewed',
              value: 127,
              change: 23,
              sparklineData: [60, 75, 90, 100, 110, 120, 127]
            },
            {
              id: 'knowledge-score',
              title: 'Knowledge Score',
              value: 91,
              change: 3,
              unit: '%',
              sparklineData: [82, 84, 86, 88, 89, 90, 91]
            }
          ];
        } else if (role === "founder" || role === "Founder") {
          roleSpecificKpis = [
            {
              id: 'market-research',
              title: 'Market Research',
              value: 14,
              change: 2,
              unit: 'hours',
              sparklineData: [8, 9, 10, 11, 12, 13, 14]
            },
            {
              id: 'investor-meetings',
              title: 'Investor Meetings',
              value: 8,
              change: 3,
              sparklineData: [2, 3, 4, 5, 6, 7, 8]
            },
            {
              id: 'revenue-growth',
              title: 'Revenue Growth',
              value: 34,
              change: 12,
              unit: '%',
              sparklineData: [10, 15, 18, 22, 26, 30, 34]
            },
            {
              id: 'team-growth',
              title: 'Team Growth',
              value: 6,
              change: 2,
              unit: 'people',
              sparklineData: [2, 3, 3, 4, 4, 5, 6]
            }
          ];
        }

        setKpis(roleSpecificKpis);
        setNudges(roleSpecificNudges);
      }, 500);
    };

    fetchKpisAndNudges();
  }, [role]);

  useEffect(() => {
    const checkNotificationUpdates = () => {
      if (role === "student" || role === "Student") {
        const intervalId = setInterval(() => {
          if (Math.random() < 0.2) {
            const newNudge: NudgeData = {
              id: `nudge-${Date.now()}`,
              title: 'Study Reminder',
              description: 'Time for your scheduled Physics review session',
              type: 'info',
              isRead: false,
              date: new Date().toISOString()
            };
            
            setNudges(prev => [newNudge, ...prev]);
          }
        }, 30000);
        
        return () => clearInterval(intervalId);
      } else if (role === "employee" || role === "Employee") {
        const intervalId = setInterval(() => {
          if (Math.random() < 0.15) {
            const newNudge: NudgeData = {
              id: `nudge-${Date.now()}`,
              title: 'Skill Development',
              description: 'New course available in your learning path',
              type: 'info',
              isRead: false,
              date: new Date().toISOString()
            };
            
            setNudges(prev => [newNudge, ...prev]);
          }
        }, 40000);
        
        return () => clearInterval(intervalId);
      } else if (role === "doctor" || role === "Doctor") {
        const intervalId = setInterval(() => {
          if (Math.random() < 0.1) {
            const newNudge: NudgeData = {
              id: `nudge-${Date.now()}`,
              title: 'Medical Journal',
              description: 'New research published in your field',
              type: 'info',
              isRead: false,
              date: new Date().toISOString()
            };
            
            setNudges(prev => [newNudge, ...prev]);
          }
        }, 50000);
        
        return () => clearInterval(intervalId);
      } else if (role === "founder" || role === "Founder") {
        const intervalId = setInterval(() => {
          if (Math.random() < 0.12) {
            const newNudge: NudgeData = {
              id: `nudge-${Date.now()}`,
              title: 'Market Update',
              description: 'New trend identified in your industry',
              type: 'info',
              isRead: false,
              date: new Date().toISOString()
            };
            
            setNudges(prev => [newNudge, ...prev]);
          }
        }, 45000);
        
        return () => clearInterval(intervalId);
      }
    };
    
    checkNotificationUpdates();
  }, [role]);
  
  return { kpis, nudges, markNudgeAsRead };
};
