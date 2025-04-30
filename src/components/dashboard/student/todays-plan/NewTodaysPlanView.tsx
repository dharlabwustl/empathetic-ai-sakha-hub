
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { TodaysPlanData, TaskType } from '@/types/student/todaysPlan';
import { useToast } from '@/hooks/use-toast';
import DailyPlanBreakdown from './DailyPlanBreakdown';
import TimeAllocationWidget from './TimeAllocationWidget';
import { MoodType } from '@/types/user/base';
import QuickAccessPanel from './QuickAccessPanel';

interface NewTodaysPlanViewProps {
  planData: TodaysPlanData;
  isLoading: boolean;
  currentMood?: MoodType;
}

const NewTodaysPlanView: React.FC<NewTodaysPlanViewProps> = ({ 
  planData, 
  isLoading,
  currentMood 
}) => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Calculate completion statistics
  const totalTasks = [...(planData.currentBlock?.tasks || []), 
    ...planData.upcomingBlocks.flatMap(block => block.tasks || [])].length;
  
  const completedTasks = planData.completedBlocks.flatMap(block => 
    block.tasks.filter(task => task.status === 'completed')).length;
  
  // Calculate total study time
  const getTotalStudyHours = () => {
    const allBlocks = [
      ...(planData.currentBlock ? [planData.currentBlock] : []),
      ...planData.completedBlocks,
      ...planData.upcomingBlocks
    ];
    
    let totalMinutes = 0;
    
    allBlocks.forEach(block => {
      block.tasks.forEach(task => {
        // Extract minutes from the timeEstimate (assuming format like "30 min" or "1 hr 30 min")
        const timeString = task.timeEstimate;
        const hourMatch = timeString.match(/(\d+)\s*hr/);
        const minMatch = timeString.match(/(\d+)\s*min/);
        
        if (hourMatch) totalMinutes += parseInt(hourMatch[1]) * 60;
        if (minMatch) totalMinutes += parseInt(minMatch[1]);
      });
    });
    
    return (totalMinutes / 60).toFixed(1);
  };
  
  const handleMarkCompleted = (id: string, type: TaskType | "practice-exam") => {
    toast({
      title: 'Task Completed',
      description: 'Your progress has been updated',
    });
    // In a real app, would make API call to update task status
  };
  
  const handleBookmark = (title: string, type: TaskType | "exam") => {
    toast({
      title: 'Item Bookmarked',
      description: `${title} added to your bookmarks`,
    });
    // In a real app, would make API call to save the bookmark
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Today's Study Plan</h2>
          <p className="text-muted-foreground">{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2" />
            Change Date
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <div className="p-6 flex items-center space-x-4">
            <Clock className="h-10 w-10 text-blue-500" />
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-400">Total Study Time</p>
              <p className="text-2xl font-bold">{getTotalStudyHours()} hours</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
          <div className="p-6 flex items-center space-x-4">
            <CheckCircle className="h-10 w-10 text-green-500" />
            <div>
              <p className="text-sm text-green-600 dark:text-green-400">Tasks Completed</p>
              <p className="text-2xl font-bold">{completedTasks} of {totalTasks}</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
          <div className="p-6 flex items-center space-x-4">
            <AlertCircle className="h-10 w-10 text-amber-500" />
            <div>
              <p className="text-sm text-amber-600 dark:text-amber-400">Priority Tasks</p>
              <p className="text-2xl font-bold">{planData.backlog.length}</p>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <DailyPlanBreakdown
            currentBlock={planData.currentBlock}
            completedBlocks={planData.completedBlocks}
            upcomingBlocks={planData.upcomingBlocks}
            onMarkCompleted={handleMarkCompleted}
            onBookmark={handleBookmark}
            currentMood={currentMood}
          />
        </div>
        
        <div className="space-y-6">
          <TimeAllocationWidget allocations={planData.timeAllocations} />
          <QuickAccessPanel />
        </div>
      </div>
    </div>
  );
};

export default NewTodaysPlanView;
