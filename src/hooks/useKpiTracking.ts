import { useState, useEffect } from 'react';
import { UserRole } from '@/types/user';

export interface KpiData {
  id: string;
  title: string;
  value: number;
  previousValue?: number;
  change?: number;
  status?: 'increase' | 'decrease' | 'neutral';
  target?: number;
  unit?: string;
}

export interface NudgeData {
  id: string;
  title: string;
  message: string;
  type: 'tip' | 'alert' | 'suggestion';
  isRead: boolean;
  actionText?: string;
  actionUrl?: string;
  priority?: 'low' | 'medium' | 'high';
  description?: string;
  createdAt?: string;
}

export const useKpiTracking = (role: UserRole) => {
  const [kpis, setKpis] = useState<KpiData[]>([]);
  const [nudges, setNudges] = useState<NudgeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKpisAndNudges = () => {
      setLoading(true);
      
      setTimeout(() => {
        const roleSpecificKpis = getRoleSpecificKpis(role);
        setKpis(roleSpecificKpis);
        
        const roleSpecificNudges = getRoleSpecificNudges(role);
        setNudges(roleSpecificNudges);
        
        setLoading(false);
      }, 1000);
    };

    fetchKpisAndNudges();
  }, [role]);

  const markNudgeAsRead = (nudgeId: string) => {
    setNudges(prev => 
      prev.map(nudge => 
        nudge.id === nudgeId ? { ...nudge, isRead: true } : nudge
      )
    );
  };

  return { kpis, nudges, loading, markNudgeAsRead };
}

function getRoleSpecificKpis(role: UserRole): KpiData[] {
  switch (role) {
    case UserRole.Student:
      return [
        {
          id: "study-time",
          title: "Study Time Today",
          value: 2.5,
          unit: "hours",
          change: 25,
          status: "increase",
          target: 3,
          previousValue: 2,
        },
        {
          id: "subjects-covered",
          title: "Subjects Covered",
          value: 3,
          unit: "subjects",
          change: 0,
          status: "neutral",
          target: 4,
          previousValue: 2,
        },
        {
          id: "quiz-performance",
          title: "Quiz Performance",
          value: 82,
          unit: "%",
          change: -3,
          status: "decrease",
          target: 85,
          previousValue: 85,
        },
        {
          id: "mood",
          title: "Mood Today",
          value: 4,
          unit: "",
          change: 1,
          status: "increase",
          target: 5,
          previousValue: 3,
        },
      ];
    case UserRole.Employee:
      return [
        {
          id: "productivity-score",
          title: "Productivity Score",
          value: 85,
          unit: "%",
          change: 5,
          status: "increase",
          target: 90,
          previousValue: 80,
        },
        {
          id: "tasks-completed",
          title: "Tasks Completed",
          value: 6,
          unit: "tasks",
          change: 2,
          status: "increase",
          target: 8,
          previousValue: 6,
        },
        {
          id: "work-hours",
          title: "Work Hours Today",
          value: 7.5,
          unit: "hours",
          change: 0,
          status: "neutral",
          target: 8,
          previousValue: 7,
        },
        {
          id: "wellness-score",
          title: "Wellness Score",
          value: 75,
          unit: "%",
          change: -5,
          status: "decrease",
          target: 80,
          previousValue: 80,
        },
      ];
    case UserRole.Doctor:
      return [
        {
          id: "research-hours",
          title: "Research Hours Today",
          value: 6.5,
          unit: "hours",
          change: 10,
          status: "increase",
          target: 7,
          previousValue: 6,
        },
        {
          id: "literature-reviewed",
          title: "Literature Reviewed",
          value: 23,
          unit: "papers",
          change: 15,
          status: "increase",
          target: 25,
          previousValue: 20,
        },
        {
          id: "research-progress",
          title: "Research Progress",
          value: 65,
          unit: "%",
          change: 5,
          status: "increase",
          target: 70,
          previousValue: 60,
        },
        {
          id: "wellness-score",
          title: "Wellness Score",
          value: 65,
          unit: "%",
          change: -10,
          status: "decrease",
          target: 70,
          previousValue: 70,
        },
      ];
    case UserRole.Founder:
      return [
        {
          id: "mvp-completion",
          title: "MVP Completion",
          value: 75,
          unit: "%",
          change: 15,
          status: "increase",
          target: 80,
          previousValue: 70,
        },
        {
          id: "pitch-deck",
          title: "Pitch Deck Status",
          value: 90,
          unit: "%",
          change: 5,
          status: "increase",
          target: 95,
          previousValue: 85,
        },
        {
          id: "investor-meetings",
          title: "Investor Meetings",
          value: 8,
          unit: "",
          change: 3,
          status: "increase",
          target: 10,
          previousValue: 7,
        },
        {
          id: "burnout-risk",
          title: "Burnout Risk",
          value: 35,
          unit: "%",
          change: 10,
          status: "decrease",
          target: 40,
          previousValue: 45,
        },
      ];
    default:
      return [];
  }
}

function getRoleSpecificNudges(role: UserRole): NudgeData[] {
  const now = new Date().toISOString();
  
  switch (role) {
    case UserRole.Student:
      return [
        {
          id: "n1",
          title: "Keep up the momentum!",
          message: "You've been consistent with your Physics studies. Great job maintaining your streak!",
          type: "tip",
          isRead: false,
          actionText: "Continue Learning",
          actionUrl: "/dashboard/student/tutor",
          priority: "medium",
          description: "Your Physics studies are on track.",
          createdAt: now,
        },
        {
          id: "n2",
          title: "Chemistry quiz tomorrow",
          message: "Your scheduled Chemistry quiz on Organic Chemistry is tomorrow. Time to review!",
          type: "alert",
          isRead: false,
          actionText: "Start Review",
          actionUrl: "/dashboard/student/planner",
          priority: "high",
          description: "Review your Chemistry quiz materials.",
          createdAt: now,
        },
        {
          id: "n3",
          title: "Achievement unlocked!",
          message: "You've completed 75% of your Physics syllabus. You're making excellent progress!",
          type: "suggestion",
          isRead: true,
          priority: "low",
          description: "Keep up the momentum!",
          createdAt: now,
        },
        {
          id: "n4",
          title: "Study break recommended",
          message: "You've been studying for 2 hours straight. Consider taking a short break to refresh your mind.",
          type: "tip",
          isRead: false,
          actionText: "Start Break Timer",
          priority: "medium",
          description: "Take a short break to refresh your mind.",
          createdAt: now,
        },
      ];
    case UserRole.Employee:
      return [
        {
          id: "n1",
          title: "Project deadline approaching",
          message: "Your Data Analytics project is due in 3 days. Make sure you're on track!",
          type: "alert",
          isRead: false,
          actionText: "View Project",
          priority: "high",
          description: "Review your project progress.",
          createdAt: now,
        },
        {
          id: "n2",
          title: "Skill recommendation",
          message: "Based on your interests, you might enjoy our new Python for Data Analysis course.",
          type: "suggestion",
          isRead: false,
          actionText: "Explore Course",
          priority: "medium",
          description: "Explore the new Python for Data Analysis course.",
          createdAt: now,
        },
        {
          id: "n3",
          title: "Burnout risk detected",
          message: "You've been working long hours for the past week. Consider scheduling some downtime.",
          type: "tip",
          isRead: false,
          actionText: "View Wellness Tips",
          priority: "low",
          description: "Schedule some downtime to avoid burnout.",
          createdAt: now,
        },
      ];
    case UserRole.Doctor:
      return [
        {
          id: "n1",
          title: "Research checkpoint",
          message: "Your monthly research review is scheduled for tomorrow. Prepare your progress report.",
          type: "tip",
          isRead: false,
          actionText: "Prepare Report",
          priority: "medium",
          description: "Prepare your research progress report.",
          createdAt: now,
        },
        {
          id: "n2",
          title: "New relevant research",
          message: "3 new papers related to your COVID-19 research were published this week.",
          type: "alert",
          isRead: false,
          actionText: "View Papers",
          priority: "high",
          description: "Review the new COVID-19 research papers.",
          createdAt: now,
        },
        {
          id: "n3",
          title: "Wellness check",
          message: "Your wellness score has been declining. Consider scheduling some self-care time.",
          type: "tip",
          isRead: false,
          actionText: "Wellness Tips",
          priority: "low",
          description: "Schedule some self-care time to improve your wellness.",
          createdAt: now,
        },
      ];
    case UserRole.Founder:
      return [
        {
          id: "n1",
          title: "Investor meeting tomorrow",
          message: "You have a meeting with Angel Investors at 2 PM tomorrow. Review your pitch deck.",
          type: "alert",
          isRead: false,
          actionText: "Review Pitch",
          priority: "high",
          description: "Review your pitch deck.",
          createdAt: now,
        },
        {
          id: "n2",
          title: "MVP milestone reached!",
          message: "Congratulations! Your MVP is 75% complete. Keep up the great work!",
          type: "suggestion",
          isRead: false,
          actionText: "Celebrate",
          priority: "low",
          description: "Celebrate your MVP milestone.",
          createdAt: now,
        },
        {
          id: "n3",
          title: "Team check-in recommended",
          message: "It's been a week since your last team sync. Consider scheduling a quick check-in.",
          type: "tip",
          isRead: false,
          actionText: "Schedule Meeting",
          priority: "medium",
          description: "Schedule a quick team check-in.",
          createdAt: now,
        },
      ];
    default:
      return [];
  }
}
