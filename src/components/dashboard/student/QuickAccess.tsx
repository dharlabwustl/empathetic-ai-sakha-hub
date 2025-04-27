
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquare, Calendar, Brain, Users, Heart } from 'lucide-react';

export function QuickAccess() {
  const navigate = useNavigate();

  const quickItems = [
    { icon: <MessageSquare className="h-4 w-4" />, text: "24/7 AI Tutor", path: "/dashboard/student/tutor" },
    { icon: <Calendar className="h-4 w-4" />, text: "Academic Advisor", path: "/dashboard/student/academic" },
    { icon: <Brain className="h-4 w-4" />, text: "Study Plan", path: "/dashboard/student/study-plan" },
    { icon: <Users className="h-4 w-4" />, text: "Study Groups", path: "/dashboard/student/study-groups" },
    { icon: <Heart className="h-4 w-4" />, text: "Feel Good Corner", path: "/dashboard/student/wellness" },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4">
      {quickItems.map((item, index) => (
        <Button 
          key={index} 
          variant="outline" 
          size="sm" 
          className="whitespace-nowrap flex items-center gap-2 shadow-sm"
          onClick={() => navigate(item.path)}
        >
          {item.icon}
          <span>{item.text}</span>
        </Button>
      ))}
    </div>
  );
}
