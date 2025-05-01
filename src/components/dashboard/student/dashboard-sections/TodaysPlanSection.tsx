
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, BookOpen, Brain, FileText, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MoodType } from '@/types/user/base';

interface TodaysPlanSectionProps {
  studyPlan: {
    focusSubjects: string[];
    totalTasks: number;
    concepts: number;
    flashcards: number;
    exams: number;
    timeAllocated: number;
  };
  currentMood?: MoodType;
}

export default function TodaysPlanSection({ studyPlan, currentMood }: TodaysPlanSectionProps) {
  // Adjust plan based on user's mood
  const adjustedPlan = React.useMemo(() => {
    let adjustedStudyPlan = { ...studyPlan };
    
    if (currentMood === 'tired' || currentMood === 'stressed' || currentMood === 'sad') {
      // Reduce the study load for tired/stressed/sad moods
      adjustedStudyPlan = {
        ...studyPlan,
        totalTasks: Math.max(1, Math.floor(studyPlan.totalTasks * 0.7)),
        concepts: Math.max(1, Math.floor(studyPlan.concepts * 0.6)),
        exams: Math.max(0, Math.floor(studyPlan.exams * 0.5)),
        timeAllocated: Math.max(15, Math.floor(studyPlan.timeAllocated * 0.7)),
      };
    } else if (currentMood === 'motivated' || currentMood === 'focused' || currentMood === 'energetic') {
      // Increase the study load for motivated/focused/energetic moods
      adjustedStudyPlan = {
        ...studyPlan,
        totalTasks: Math.ceil(studyPlan.totalTasks * 1.2),
        concepts: Math.ceil(studyPlan.concepts * 1.2),
        exams: Math.ceil(studyPlan.exams * 1.3),
        timeAllocated: Math.ceil(studyPlan.timeAllocated * 1.2),
      };
    }
    
    return adjustedStudyPlan;
  }, [studyPlan, currentMood]);
  
  // Get mood-specific message
  const getMoodMessage = () => {
    if (!currentMood) return null;
    
    switch(currentMood) {
      case 'motivated':
      case 'energetic':
      case 'focused':
        return "You're feeling great! We've boosted your study plan to maximize productivity.";
      case 'tired':
      case 'stressed':
        return "We've adjusted your plan for a lighter study session. Take breaks as needed.";
      case 'sad':
      case 'overwhelmed':
      case 'anxious':
        return "We've simplified your plan today. Remember to be kind to yourself.";
      default:
        return null;
    }
  };
  
  const moodMessage = getMoodMessage();

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" />
          Today's Study Plan
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
              <div className="text-sm text-muted-foreground mb-1">Focus Subject</div>
              <div className="font-medium">{adjustedPlan.focusSubjects.join(', ')}</div>
            </div>
            
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30">
              <div className="text-sm text-muted-foreground mb-1">Total Time</div>
              <div className="font-medium flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" />
                {adjustedPlan.timeAllocated} min
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 justify-between">
            <Badge variant="outline" className="flex-1 justify-center py-1.5 bg-violet-50 text-violet-700 border-violet-200">
              <BookOpen className="h-3 w-3 mr-1" />
              {adjustedPlan.concepts} Concepts
            </Badge>
            
            <Badge variant="outline" className="flex-1 justify-center py-1.5 bg-green-50 text-green-700 border-green-200">
              <Brain className="h-3 w-3 mr-1" />
              {adjustedPlan.flashcards} Flashcards
            </Badge>
            
            <Badge variant="outline" className="flex-1 justify-center py-1.5 bg-blue-50 text-blue-700 border-blue-200">
              <FileText className="h-3 w-3 mr-1" />
              {adjustedPlan.exams} Exams
            </Badge>
          </div>
          
          {moodMessage && (
            <div className="text-xs p-2 rounded bg-muted/80 text-muted-foreground">
              {moodMessage}
            </div>
          )}
          
          <Link to="/dashboard/student/today">
            <Button className="w-full mt-2" variant="default">
              Start Today's Plan <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
