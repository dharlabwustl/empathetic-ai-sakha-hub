
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { TodaysPlanData } from '@/types/student/todaysPlan';
import { MoodType } from '@/types/user/base';

interface TodaysPlanCompactProps {
  planData?: TodaysPlanData;
  isLoading?: boolean;
  currentMood?: MoodType;
  onViewAll: () => void;
}

const TodaysPlanCompact = ({ planData, isLoading, currentMood, onViewAll }: TodaysPlanCompactProps) => {
  // Mock data if needed
  const defaultPlanData = {
    date: new Date().toISOString(),
    progress: {
      plannedHours: 5,
      completedHours: 2.5,
      completedTasks: 4,
      totalTasks: 8
    },
    currentBlock: {
      id: '123',
      title: 'Physics: Wave Mechanics',
      duration: 45,
      startTime: `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, '0')}`,
      endTime: `${new Date().getHours() + 1}:${String(new Date().getMinutes()).padStart(2, '0')}`,
      completed: false,
      type: 'concept',
      subject: 'Physics'
    },
    upcomingBlocks: [
      {
        id: '124',
        title: 'Organic Chemistry Flashcards',
        duration: 30,
        startTime: `${new Date().getHours() + 1}:${String(new Date().getMinutes()).padStart(2, '0')}`,
        endTime: `${new Date().getHours() + 1}:${String(new Date().getMinutes() + 30).padStart(2, '0')}`,
        completed: false,
        type: 'flashcard',
        subject: 'Chemistry'
      },
      {
        id: '125',
        title: 'Short Break',
        duration: 15,
        startTime: `${new Date().getHours() + 1}:${String(new Date().getMinutes() + 30).padStart(2, '0')}`,
        endTime: `${new Date().getHours() + 1}:${String(new Date().getMinutes() + 45).padStart(2, '0')}`,
        completed: false,
        type: 'break'
      }
    ]
  };

  const data = planData || defaultPlanData;
  const progressPercentage = data.progress 
    ? Math.floor((data.progress.completedTasks / data.progress.totalTasks) * 100) 
    : 50;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-purple-500" />
          Today's Study Plan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Progress indicator */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Daily Progress</span>
              <span>{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{data.progress.completedTasks} of {data.progress.totalTasks} tasks completed</span>
              <span>{data.progress.completedHours} of {data.progress.plannedHours} hours</span>
            </div>
          </div>
          
          {/* Current task */}
          {data.currentBlock && (
            <div className="border rounded-lg p-4">
              <div className="mb-2 flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Currently Studying</span>
                <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs px-2 py-1 rounded-full">
                  In Progress
                </span>
              </div>
              <h3 className="font-semibold">{data.currentBlock.title}</h3>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{data.currentBlock.startTime} - {data.currentBlock.endTime}</span>
              </div>

              <Button className="w-full mt-3" size="sm">
                Continue Studying
              </Button>
            </div>
          )}
          
          {/* Upcoming tasks */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Up Next</h4>
            {data.upcomingBlocks?.slice(0, 2).map(block => (
              <div key={block.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <div className="font-medium">{block.title}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> 
                    {block.startTime}
                    {block.duration && ` · ${block.duration} min`}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-2 flex items-center justify-center"
            onClick={onViewAll}
          >
            View Full Plan <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaysPlanCompact;
