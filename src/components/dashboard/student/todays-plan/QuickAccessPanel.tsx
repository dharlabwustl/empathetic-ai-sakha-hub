
import React from 'react';
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Calendar, LineChart, Video } from "lucide-react";
import { Link } from "react-router-dom";

const QuickAccessPanel = () => {
  const quickLinks = [
    { icon: <BookOpen className="w-5 h-5" />, label: "Study Plan", path: "/dashboard/student/study-plan" },
    { icon: <Brain className="w-5 h-5" />, label: "Concepts", path: "/dashboard/student/concepts" },
    { icon: <Calendar className="w-5 h-5" />, label: "Flashcards", path: "/dashboard/student/flashcards" },
    { icon: <LineChart className="w-5 h-5" />, label: "Practice Exam", path: "/dashboard/student/practice-exam" },
    { icon: <Video className="w-5 h-5" />, label: "Video Library", path: "/dashboard/student/videos" },
  ];

  return (
    <div className="flex items-center justify-between flex-wrap gap-2">
      {quickLinks.map((link, index) => (
        <Button 
          key={index} 
          variant="outline" 
          asChild
          className="flex gap-2 items-center"
        >
          <Link to={link.path}>
            {link.icon}
            <span>{link.label}</span>
          </Link>
        </Button>
      ))}
    </div>
  );
};

export default QuickAccessPanel;
