
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StudyPlan } from '@/types/student/dashboard';
import { AlertCircle, BookOpen, Calendar, Check, Clock, FileText } from 'lucide-react';

interface TodaysPlanSectionProps {
  studyPlan: StudyPlan;
}

const TodaysPlanSection: React.FC<TodaysPlanSectionProps> = ({ studyPlan }) => {
  return (
    <Card className="h-full border-t-4 border-t-violet-500">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-violet-600" />
          Today's Study Plan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Today's Focus:</span>
            <Badge variant="outline" className="bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300">
              {studyPlan.todaysFocus.subject}
            </Badge>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3 space-y-3">
            <div>
              <p className="text-sm font-medium mb-1 flex items-center">
                <BookOpen className="h-4 w-4 mr-1 text-blue-500" /> 
                Concepts
              </p>
              <div className="flex flex-wrap gap-1">
                {studyPlan.todaysFocus.concepts.map((concept, i) => (
                  <Badge key={i} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700">
                    {concept}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-1 text-amber-500" />
                <p className="text-sm font-medium">Flashcards:</p>
              </div>
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-700">
                {studyPlan.todaysFocus.flashcardsCount}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 mr-1 text-purple-500" />
                <p className="text-sm font-medium">Practice Exam:</p>
              </div>
              <Badge variant="outline" className={`${studyPlan.todaysFocus.hasPracticeExam 
                ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-700"
                : "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"}`}>
                {studyPlan.todaysFocus.hasPracticeExam ? "Yes" : "No"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-indigo-500" />
                <p className="text-sm font-medium">Estimated Time:</p>
              </div>
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-700">
                {Math.floor(studyPlan.todaysFocus.estimatedTime / 60)}h {studyPlan.todaysFocus.estimatedTime % 60}m
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        <Button variant="default" className="w-full sm:w-auto bg-gradient-to-r from-violet-500 to-purple-600">
          <Check className="h-4 w-4 mr-1" /> Start Study
        </Button>
        <Button variant="outline" className="w-full sm:w-auto">
          <FileText className="h-4 w-4 mr-1" /> Review Past Tasks
        </Button>
        <Button variant="outline" className="w-full sm:w-auto">
          <Calendar className="h-4 w-4 mr-1" /> Preview Tomorrow
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TodaysPlanSection;
