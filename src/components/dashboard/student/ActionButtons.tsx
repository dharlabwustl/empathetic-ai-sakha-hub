
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BookOpen, 
  Book, 
  FileText, 
  Brain,
  Clock,
  ArrowRight 
} from "lucide-react";

interface ActionButtonsProps {
  className?: string;
  currentExam?: string;
  nextExamDate?: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  className = "",
  currentExam = "IIT-JEE",
  nextExamDate = "April 30, 2025"
}) => {
  const navigate = useNavigate();
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  
  return (
    <Card className={`overflow-hidden border-purple-100 ${className}`}>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button 
            variant="default" 
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white flex items-center justify-between h-auto py-3 px-4"
            onClick={() => handleNavigation("/dashboard/student/concept/next")}
          >
            <span className="flex items-center">
              <Brain className="mr-2 h-5 w-5" />
              <span className="text-left">
                <span className="block font-medium">Continue Learning</span>
                <span className="text-xs text-indigo-100">Pick up where you left off</span>
              </span>
            </span>
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          
          <Button 
            variant="outline"
            className="bg-gradient-to-r from-sky-50 to-blue-50 hover:from-sky-100 hover:to-blue-100 text-blue-700 border-blue-200 flex items-center justify-between h-auto py-3 px-4"
            onClick={() => handleNavigation("/dashboard/student/flashcards")}
          >
            <span className="flex items-center">
              <Book className="mr-2 h-5 w-5" />
              <span className="text-left">
                <span className="block font-medium">Let's Revise</span>
                <span className="text-xs text-blue-600">Review key concepts</span>
              </span>
            </span>
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          
          <Button 
            variant="outline"
            className="bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-amber-700 border-amber-200 flex items-center justify-between h-auto py-3 px-4"
            onClick={() => handleNavigation("/dashboard/student/exams")}
          >
            <span className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              <span className="text-left">
                <span className="block font-medium">Practice Exam</span>
                <span className="text-xs text-amber-600">Be prepared for {currentExam}</span>
              </span>
            </span>
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          
          <Button 
            variant="outline"
            className="bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 text-emerald-700 border-emerald-200 flex items-center justify-between h-auto py-3 px-4"
            onClick={() => handleNavigation("/dashboard/student/study-plan")}
          >
            <span className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              <span className="text-left">
                <span className="block font-medium">Today's Study Plan</span>
                <span className="text-xs text-emerald-600">{nextExamDate} countdown</span>
              </span>
            </span>
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionButtons;
