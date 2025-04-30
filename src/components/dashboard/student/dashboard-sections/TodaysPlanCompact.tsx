
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { CalendarDays, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';
import { MoodType } from '@/types/user/base';
import { getMoodTheme } from '../mood-tracking/moodThemes';
import { getMoodBasedTasks } from '../mood-tracking/moodUtils';

interface TodaysPlanCompactProps {
  planData?: TodaysPlanData;
  isLoading?: boolean;
  currentMood?: MoodType;
  onViewAll: () => void;
}

export default function TodaysPlanCompact({ 
  planData, 
  isLoading = false,
  currentMood,
  onViewAll
}: TodaysPlanCompactProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-8 w-3/4" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // If no plan data, show empty state
  if (!planData) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-blue-500" />
            Today's Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CalendarDays className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No study plan available yet</p>
            <Button variant="outline" className="mt-4" onClick={onViewAll}>
              Create Study Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Get appropriate tasks based on current mood
  const allTasks = planData.studyBlocks || [];
  
  // Filter tasks based on mood if available
  const visibleTasks = currentMood 
    ? getMoodBasedTasks(currentMood, allTasks).slice(0, 3)
    : allTasks.slice(0, 3);
    
  // If there are no visible tasks, show an empty state
  if (visibleTasks.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-blue-500" />
            Today's Plan - {planData.date}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <p>Great job! All your tasks are complete for today.</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onViewAll} className="w-full">
            View Plan Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Show mood context if available
  const moodTheme = currentMood ? getMoodTheme(currentMood) : null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-blue-500" />
            Today's Plan
          </div>
          {moodTheme && (
            <div className={`text-sm px-2 py-1 rounded-full ${moodTheme.colors.background} ${moodTheme.colors.text} flex items-center gap-1`}>
              <span>{moodTheme.emoji}</span>
              <span className="text-xs">{moodTheme.label}</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {visibleTasks.map((task, index) => (
            <div 
              key={task.id || index}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
            >
              <div>
                <p className="font-medium">{task.title}</p>
                <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  <Clock className="h-3 w-3" />
                  <span>{task.duration} mins</span>
                  {task.subject && (
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full">
                      {task.subject}
                    </span>
                  )}
                </div>
              </div>
              <Button size="sm" variant="outline" className="h-8">
                Start
              </Button>
            </div>
          ))}
        </div>
        
        {currentMood && (
          <div className="mt-4 text-sm text-muted-foreground">
            <p className="italic">
              {visibleTasks.length} tasks selected based on your current mood.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={onViewAll} className="w-full">
          View Full Study Plan
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
