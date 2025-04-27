
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Book, BookOpen, FileText, Clock, Brain, MessageSquare, Calendar } from "lucide-react";

const QuickAccessPanel: React.FC = () => {
  const navigate = useNavigate();
  
  const quickLinks = [
    { icon: <Book className="mr-2 h-4 w-4" />, text: "All Concepts", path: "/dashboard/student/concepts/all" },
    { icon: <BookOpen className="mr-2 h-4 w-4" />, text: "All Flashcards", path: "/dashboard/student/flashcards" },
    { icon: <FileText className="mr-2 h-4 w-4" />, text: "All Practice Tests", path: "/dashboard/student/practice-exam" },
    { icon: <Clock className="mr-2 h-4 w-4" />, text: "My Backlogs", path: "/dashboard/student/today?view=backlog" },
    { icon: <Brain className="mr-2 h-4 w-4" />, text: "Academic Advisor", path: "/dashboard/student/academic" },
    { icon: <MessageSquare className="mr-2 h-4 w-4" />, text: "24/7 AI Tutor", path: "/dashboard/student/tutor" },
    { icon: <Calendar className="mr-2 h-4 w-4" />, text: "Study Plan", path: "/dashboard/student/today" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Quick Access</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {quickLinks.map((link, index) => (
          <Button 
            key={index} 
            variant="outline" 
            size="sm" 
            className="justify-start"
            onClick={() => navigate(link.path)}
          >
            {link.icon}
            {link.text}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickAccessPanel;
