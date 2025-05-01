
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Calendar, Heart, GraduationCap, Brain } from 'lucide-react';
import AnimatedActionButton from './AnimatedActionButton';

export function QuickAccess() {
  const quickAccessItems = [
    {
      icon: <Sparkles className="h-5 w-5 text-blue-500" />,
      title: "24/7 AI Tutor",
      description: "Get help with any question",
      path: "/dashboard/student/tutor",
      isPrimary: true
    },
    {
      icon: <Calendar className="h-5 w-5 text-indigo-500" />,
      title: "Study Plan",
      description: "View your exam timeline",
      path: "/dashboard/student/study-plan",
    },
    {
      icon: <Brain className="h-5 w-5 text-purple-500" />,
      title: "Flashcards",
      description: "Practice with flashcards",
      path: "/dashboard/student/flashcards",
    },
    {
      icon: <GraduationCap className="h-5 w-5 text-blue-500" />,
      title: "Academic Advisor",
      description: "Get personalized guidance",
      path: "/dashboard/student/academic",
    },
    {
      icon: <Heart className="h-5 w-5 text-pink-500" />,
      title: "Feel Good Corner",
      description: "Manage stress and focus",
      path: "/dashboard/student/feel-good-corner",
    },
  ];

  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="font-medium mb-3">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickAccessItems.map((item) => (
            <AnimatedActionButton 
              key={item.title}
              icon={item.icon}
              label={item.title}
              description={item.description}
              path={item.path}
              isPrimary={item.isPrimary}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default QuickAccess;
