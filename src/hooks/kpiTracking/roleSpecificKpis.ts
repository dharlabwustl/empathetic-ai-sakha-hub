
import { UserRole } from '@/types/user/base';
import { KpiData } from './types';

export function getRoleSpecificKpis(role: UserRole): KpiData[] {
  switch (role) {
    case UserRole.Student:
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
    case UserRole.Employee:
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
    case UserRole.Doctor:
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
    case UserRole.Founder:
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
