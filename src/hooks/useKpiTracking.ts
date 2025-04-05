
import { useState, useEffect } from 'react';
import { UserRole } from '@/types/user';

export interface KpiData {
  id: string;
  label: string;
  value: number;
  unit: string;
  change: number; // percentage change
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}

export interface NudgeData {
  id: string;
  type: 'motivation' | 'reminder' | 'celebration' | 'suggestion' | 'warning';
  title: string;
  message: string;
  actionLabel?: string;
  actionUrl?: string;
  timestamp: string;
  read: boolean;
}

export function useKpiTracking(role: UserRole) {
  const [kpis, setKpis] = useState<KpiData[]>([]);
  const [nudges, setNudges] = useState<NudgeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch KPIs and nudges
    const fetchKpisAndNudges = () => {
      setLoading(true);
      
      setTimeout(() => {
        // Set role-specific KPIs
        const roleSpecificKpis = getRoleSpecificKpis(role);
        setKpis(roleSpecificKpis);
        
        // Set role-specific nudges
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
        nudge.id === nudgeId ? { ...nudge, read: true } : nudge
      )
    );
  };

  return { kpis, nudges, loading, markNudgeAsRead };
}

// Helper functions to get role-specific data
function getRoleSpecificKpis(role: UserRole): KpiData[] {
  switch (role) {
    case "Student":
      return [
        {
          id: "study-time",
          label: "Study Time Today",
          value: 2.5,
          unit: "hours",
          change: 25,
          trend: "up",
          icon: "Clock",
        },
        {
          id: "subjects-covered",
          label: "Subjects Covered",
          value: 3,
          unit: "subjects",
          change: 0,
          trend: "neutral",
          icon: "BookOpen",
        },
        {
          id: "quiz-performance",
          label: "Quiz Performance",
          value: 82,
          unit: "%",
          change: -3,
          trend: "down",
          icon: "Brain",
        },
        {
          id: "mood",
          label: "Mood Today",
          value: 4,
          unit: "",
          change: 1,
          trend: "up",
          icon: "Smile",
        },
      ];
    case "Employee":
      return [
        {
          id: "productivity-score",
          label: "Productivity Score",
          value: 85,
          unit: "%",
          change: 5,
          trend: "up",
          icon: "LineChart",
        },
        {
          id: "tasks-completed",
          label: "Tasks Completed",
          value: 6,
          unit: "tasks",
          change: 2,
          trend: "up",
          icon: "CheckSquare",
        },
        {
          id: "work-hours",
          label: "Work Hours Today",
          value: 7.5,
          unit: "hours",
          change: 0,
          trend: "neutral",
          icon: "Clock",
        },
        {
          id: "wellness-score",
          label: "Wellness Score",
          value: 75,
          unit: "%",
          change: -5,
          trend: "down",
          icon: "Heart",
        },
      ];
    case "Doctor":
      return [
        {
          id: "research-hours",
          label: "Research Hours Today",
          value: 6.5,
          unit: "hours",
          change: 10,
          trend: "up",
          icon: "Clock",
        },
        {
          id: "literature-reviewed",
          label: "Literature Reviewed",
          value: 23,
          unit: "papers",
          change: 15,
          trend: "up",
          icon: "FileText",
        },
        {
          id: "research-progress",
          label: "Research Progress",
          value: 65,
          unit: "%",
          change: 5,
          trend: "up",
          icon: "TrendingUp",
        },
        {
          id: "wellness-score",
          label: "Wellness Score",
          value: 65,
          unit: "%",
          change: -10,
          trend: "down",
          icon: "Heart",
        },
      ];
    case "Founder":
      return [
        {
          id: "mvp-completion",
          label: "MVP Completion",
          value: 75,
          unit: "%",
          change: 15,
          trend: "up",
          icon: "Code",
        },
        {
          id: "pitch-deck",
          label: "Pitch Deck Status",
          value: 90,
          unit: "%",
          change: 5,
          trend: "up",
          icon: "PieChart",
        },
        {
          id: "investor-meetings",
          label: "Investor Meetings",
          value: 8,
          unit: "",
          change: 3,
          trend: "up",
          icon: "Users",
        },
        {
          id: "burnout-risk",
          label: "Burnout Risk",
          value: 35,
          unit: "%",
          change: 10,
          trend: "down",
          icon: "Battery",
        },
      ];
    default:
      return [];
  }
}

function getRoleSpecificNudges(role: UserRole): NudgeData[] {
  const now = new Date().toISOString();
  
  switch (role) {
    case "Student":
      return [
        {
          id: "n1",
          type: "motivation",
          title: "Keep up the momentum!",
          message: "You've been consistent with your Physics studies. Great job maintaining your streak!",
          actionLabel: "Continue Learning",
          actionUrl: "/dashboard/student/tutor",
          timestamp: now,
          read: false,
        },
        {
          id: "n2",
          type: "reminder",
          title: "Chemistry quiz tomorrow",
          message: "Your scheduled Chemistry quiz on Organic Chemistry is tomorrow. Time to review!",
          actionLabel: "Start Review",
          actionUrl: "/dashboard/student/planner",
          timestamp: now,
          read: false,
        },
        {
          id: "n3",
          type: "celebration",
          title: "Achievement unlocked!",
          message: "You've completed 75% of your Physics syllabus. You're making excellent progress!",
          timestamp: now,
          read: true,
        },
        {
          id: "n4",
          type: "suggestion",
          title: "Study break recommended",
          message: "You've been studying for 2 hours straight. Consider taking a short break to refresh your mind.",
          actionLabel: "Start Break Timer",
          timestamp: now,
          read: false,
        },
      ];
    case "Employee":
      return [
        {
          id: "n1",
          type: "reminder",
          title: "Project deadline approaching",
          message: "Your Data Analytics project is due in 3 days. Make sure you're on track!",
          actionLabel: "View Project",
          timestamp: now,
          read: false,
        },
        {
          id: "n2",
          type: "suggestion",
          title: "Skill recommendation",
          message: "Based on your interests, you might enjoy our new Python for Data Analysis course.",
          actionLabel: "Explore Course",
          timestamp: now,
          read: false,
        },
        {
          id: "n3",
          type: "warning",
          title: "Burnout risk detected",
          message: "You've been working long hours for the past week. Consider scheduling some downtime.",
          actionLabel: "View Wellness Tips",
          timestamp: now,
          read: false,
        },
      ];
    case "Doctor":
      return [
        {
          id: "n1",
          type: "reminder",
          title: "Research checkpoint",
          message: "Your monthly research review is scheduled for tomorrow. Prepare your progress report.",
          actionLabel: "Prepare Report",
          timestamp: now,
          read: false,
        },
        {
          id: "n2",
          type: "suggestion",
          title: "New relevant research",
          message: "3 new papers related to your COVID-19 research were published this week.",
          actionLabel: "View Papers",
          timestamp: now,
          read: false,
        },
        {
          id: "n3",
          type: "warning",
          title: "Wellness check",
          message: "Your wellness score has been declining. Consider scheduling some self-care time.",
          actionLabel: "Wellness Tips",
          timestamp: now,
          read: false,
        },
      ];
    case "Founder":
      return [
        {
          id: "n1",
          type: "reminder",
          title: "Investor meeting tomorrow",
          message: "You have a meeting with Angel Investors at 2 PM tomorrow. Review your pitch deck.",
          actionLabel: "Review Pitch",
          timestamp: now,
          read: false,
        },
        {
          id: "n2",
          type: "celebration",
          title: "MVP milestone reached!",
          message: "Congratulations! Your MVP is 75% complete. Keep up the great work!",
          timestamp: now,
          read: false,
        },
        {
          id: "n3",
          type: "suggestion",
          title: "Team check-in recommended",
          message: "It's been a week since your last team sync. Consider scheduling a quick check-in.",
          actionLabel: "Schedule Meeting",
          timestamp: now,
          read: false,
        },
      ];
    default:
      return [];
  }
}
