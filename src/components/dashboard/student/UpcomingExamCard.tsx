
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/dateUtils";

interface UpcomingExamCardProps {
  examName: string;
  examDate: string;
  daysLeft: number;
  preparationLevel: number;
  isReady?: boolean;
  className?: string;
  onStartPractice?: () => void;
  onReviewExam?: () => void;
  completed?: boolean;
}

const UpcomingExamCard: React.FC<UpcomingExamCardProps> = ({
  examName,
  examDate,
  daysLeft,
  preparationLevel,
  isReady = false,
  className = "",
  onStartPractice,
  onReviewExam,
  completed = false
}) => {
  // Format the date
  const formattedDate = formatDate(new Date(examDate));
  
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">
            {completed ? "Completed Exam" : "Upcoming Exam"}
          </CardTitle>
          {!completed && (
            <Badge 
              variant="outline" 
              className={`${
                daysLeft < 7 ? 'bg-red-50 text-red-700 border-red-200' : 
                daysLeft < 30 ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                'bg-green-50 text-green-700 border-green-200'
              }`}
            >
              {daysLeft} days left
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-bold">{examName}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
            </div>
            
            {completed ? (
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Completed
              </Badge>
            ) : (
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4" />
                  <span><strong>{daysLeft}</strong> days remaining</span>
                </div>
              </div>
            )}
          </div>
          
          {!completed && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Preparation level</span>
                <span className="font-medium">{preparationLevel}%</span>
              </div>
              <Progress 
                value={preparationLevel} 
                className="h-2"
              />
            </div>
          )}
          
          <div className="pt-2">
            {completed ? (
              <Button 
                onClick={onReviewExam} 
                className="w-full bg-indigo-500 hover:bg-indigo-600"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Review Exam Results
              </Button>
            ) : (
              <Button 
                onClick={onStartPractice} 
                className={`w-full ${
                  isReady 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                }`}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                {isReady ? 'Start Practice Test' : 'Continue Preparation'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingExamCard;
