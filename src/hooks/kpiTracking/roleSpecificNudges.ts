
import { UserRole } from '@/types/user/base';
import { NudgeData } from './types';

export function getRoleSpecificNudges(role: UserRole): NudgeData[] {
  const now = new Date().toISOString();
  
  switch (role) {
    case UserRole.Student:
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
    case UserRole.Employee:
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
    case UserRole.Doctor:
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
    case UserRole.Founder:
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
