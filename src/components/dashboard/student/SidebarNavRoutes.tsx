
import React from 'react';
import { BookOpen, GraduationCap, ListChecks, Brain, Lightbulb, Smile, Bell, Sparkles, BookOpenCheck } from 'lucide-react';

// Define the route item type
interface RouteItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  value: string;
  isBeta?: boolean;
}

// The routes for student dashboard
const studentRoutes: RouteItem[] = [
  {
    id: 'overview',
    title: 'Dashboard',
    icon: <Sparkles className="h-5 w-5" />,
    value: 'overview'
  },
  {
    id: 'today',
    title: "Today's Plan",
    icon: <ListChecks className="h-5 w-5" />,
    value: 'today'
  },
  {
    id: 'academic',
    title: 'Academic Advisor',
    icon: <GraduationCap className="h-5 w-5" />,
    value: 'academic'
  },
  {
    id: 'tutor',
    title: '24/7 AI Tutor',
    icon: <Brain className="h-5 w-5" />,
    value: 'tutor'
  },
  {
    id: 'concepts',
    title: 'Concept Cards',
    icon: <BookOpen className="h-5 w-5" />,
    value: 'concepts'
  },
  {
    id: 'flashcards',
    title: 'Flashcards',
    icon: <BookOpenCheck className="h-5 w-5" />,
    value: 'flashcards'
  },
  {
    id: 'practice-exam',
    title: 'Practice Exams',
    icon: <Lightbulb className="h-5 w-5" />,
    value: 'practice-exam'
  },
  {
    id: 'feel-good-corner',
    title: 'Feel Good Corner',
    icon: <Smile className="h-5 w-5" />,
    value: 'feel-good-corner',
    isBeta: true
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: <Bell className="h-5 w-5" />,
    value: 'notifications',
  }
];

// Export the routes
export default studentRoutes;
