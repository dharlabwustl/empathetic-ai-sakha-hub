
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Calendar, BookOpen, Heart, GraduationCap } from 'lucide-react';

interface QuickAccessItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  path: string;
  isPremium?: boolean;
}

const QuickAccessItem: React.FC<QuickAccessItemProps> = ({ icon, title, description, path, isPremium }) => {
  return (
    <Link to={path} className="block">
      <div className="group flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        <div className="mt-1 flex-shrink-0 w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400">
          {icon}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            {isPremium && (
              <span className="text-xs font-medium bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                PREMIUM
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export function QuickAccess() {
  const quickAccessItems: QuickAccessItemProps[] = [
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "24/7 AI Tutor",
      description: "Get instant help with any question",
      path: "/dashboard/student/ai-tutor",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      title: "Study Plan",
      description: "View your complete exam preparation timeline",
      path: "/dashboard/student/study-plan",
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Concept Cards",
      description: "Master key concepts with interactive cards",
      path: "/dashboard/student/concepts",
    },
    {
      icon: <GraduationCap className="h-5 w-5" />,
      title: "Academic Advisor",
      description: "Create personalized study plans for your exams",
      path: "/dashboard/student/academic-advisor",
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: "Feel Good Corner",
      description: "Tools to manage stress and stay focused",
      path: "/dashboard/student/feel-good-corner",
    },
  ];

  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="font-medium mb-2">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-1">
          {quickAccessItems.map((item) => (
            <QuickAccessItem key={item.title} {...item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
