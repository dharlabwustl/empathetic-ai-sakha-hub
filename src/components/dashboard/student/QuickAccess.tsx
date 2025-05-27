
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Brain, 
  CalendarDays, 
  FileText, 
  GraduationCap,
  MessageSquare,
  Smile
} from 'lucide-react';

interface QuickAccessProps {
  className?: string;
}

export const QuickAccess: React.FC<QuickAccessProps> = ({ className }) => {
  const navigate = useNavigate();

  const quickAccessItems = [
    {
      icon: MessageSquare,
      label: '24/7 AI Tutor',
      path: '/dashboard/student/tutor',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      priority: 1,
      highlight: true
    },
    {
      icon: Smile,
      label: 'Feel Good Corner',
      path: '/dashboard/student/feel-good-corner',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      priority: 2,
      highlight: true
    },
    {
      icon: CalendarDays,
      label: "Today's Plan",
      path: '/dashboard/student/today',
      color: 'text-violet-600 dark:text-violet-400',
      bgColor: 'bg-violet-100 dark:bg-violet-900/30',
      priority: 3
    },
    {
      icon: BookOpen,
      label: 'Concepts',
      path: '/dashboard/student/concepts',
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-100 dark:bg-amber-900/30',
      priority: 4
    },
    {
      icon: Brain,
      label: 'Flashcards',
      path: '/dashboard/student/flashcards/1/interactive',
      color: 'text-pink-600 dark:text-pink-400',
      bgColor: 'bg-pink-100 dark:bg-pink-900/30',
      priority: 5
    },
    {
      icon: FileText,
      label: 'Practice Exams',
      path: '/dashboard/student/practice-exam',
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
      priority: 6
    }
  ];

  // Sort by priority
  const sortedItems = [...quickAccessItems].sort((a, b) => a.priority - b.priority);

  return (
    <div className={`grid grid-cols-3 md:grid-cols-6 gap-2 mb-6 ${className}`}>
      {sortedItems.map((item) => (
        <Button
          key={item.label}
          variant="ghost"
          className={`h-auto flex flex-col items-center justify-center py-3 px-2 ${
            item.highlight ? 'border-2 border-violet-200 dark:border-violet-800' : ''
          }`}
          onClick={() => navigate(item.path)}
        >
          <div className={`${item.bgColor} p-2 rounded-full mb-2`}>
            <item.icon className={`h-5 w-5 ${item.color}`} />
          </div>
          <span className="text-xs text-center">{item.label}</span>
        </Button>
      ))}
    </div>
  );
};
