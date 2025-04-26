
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquare, Brain, BookOpen, CalendarDays } from "lucide-react";

export function QuickAccessButtons() {
  const buttons = [
    {
      name: "24/7 AI Tutor",
      icon: <MessageSquare className="h-4 w-4 mr-1" />,
      path: "/dashboard/student/tutor",
      className: "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
    },
    {
      name: "Academic Advisor",
      icon: <Brain className="h-4 w-4 mr-1" />,
      path: "/dashboard/student/academic",
      className: "bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white"
    },
    {
      name: "Feel Good Corner",
      icon: <BookOpen className="h-4 w-4 mr-1" />,
      path: "/dashboard/student/feel-good",
      className: "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white"
    },
    {
      name: "View Study Plan",
      icon: <CalendarDays className="h-4 w-4 mr-1" />,
      path: "/dashboard/student/study-plan",
      className: "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
    }
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 p-4 mb-4 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
      {buttons.map((button) => (
        <Link key={button.name} to={button.path}>
          <Button 
            variant="default"
            size="sm"
            className={`flex items-center ${button.className}`}
          >
            {button.icon}
            {button.name}
          </Button>
        </Link>
      ))}
    </div>
  );
}
