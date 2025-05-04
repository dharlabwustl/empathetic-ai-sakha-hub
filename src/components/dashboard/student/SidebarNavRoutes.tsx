import React from 'react';
import { 
  Home, 
  Calendar, 
  BookOpen, 
  FileText, 
  Headphones, 
  MessageSquare, 
  User, 
  Settings, 
  HelpCircle, 
  Bell,
  Users,
  Trophy,
  Flame
} from 'lucide-react';

// Different route configurations per user type
export interface RouteItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  isNew?: boolean;
  isExternal?: boolean;
  badge?: string;
  badgeColor?: string;
}

export interface RouteSection {
  title?: string;
  routes: RouteItem[];
}

export const StudentRoutes: RouteSection[] = [
  {
    title: "Main",
    routes: [
      {
        title: "Dashboard",
        href: "/dashboard/student/overview",
        icon: <Home className="h-5 w-5" />,
      },
      {
        title: "Today's Plan",
        href: "/dashboard/student/today",
        icon: <Calendar className="h-5 w-5" />,
      },
      {
        title: "Concepts",
        href: "/dashboard/student/concepts",
        icon: <BookOpen className="h-5 w-5" />,
      },
      {
        title: "Flashcards",
        href: "/dashboard/student/flashcards",
        icon: <FileText className="h-5 w-5" />,
      },
      {
        title: "Practice Tests",
        href: "/dashboard/student/practice-exam",
        icon: <FileText className="h-5 w-5" />,
      },
      {
        title: "Daily Challenges",
        href: "/dashboard/student/challenges",
        icon: <Trophy className="h-5 w-5" />,
        isNew: true,
      },
    ],
  },
  {
    title: "Learning",
    routes: [
      {
        title: "AI Tutor",
        href: "/dashboard/student/tutor",
        icon: <Headphones className="h-5 w-5" />,
      },
      {
        title: "Academic Advisor",
        href: "/dashboard/student/academic",
        icon: <MessageSquare className="h-5 w-5" />,
      },
      {
        title: "Study Groups",
        href: "/dashboard/student/study-groups",
        icon: <Users className="h-5 w-5" />,
        isNew: true,
      },
      {
        title: "Feel Good Corner",
        href: "/dashboard/student/feel-good-corner",
        icon: <Flame className="h-5 w-5" />,
      },
    ],
  },
  {
    title: "Account",
    routes: [
      {
        title: "Notifications",
        href: "/dashboard/student/notifications",
        icon: <Bell className="h-5 w-5" />,
        badge: "3",
        badgeColor: "red",
      },
      {
        title: "Profile",
        href: "/dashboard/student/profile",
        icon: <User className="h-5 w-5" />,
      },
      {
        title: "Settings",
        href: "/dashboard/student/settings",
        icon: <Settings className="h-5 w-5" />,
      },
      {
        title: "Help",
        href: "/dashboard/student/help",
        icon: <HelpCircle className="h-5 w-5" />,
      },
    ],
  },
];
