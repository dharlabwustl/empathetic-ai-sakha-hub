
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StudyBlock, Task, TaskType, MoodType } from '@/types/student/todaysPlan';

interface TodaysPlanCompactProps {
  currentTasks: Task[];
  completedCount: number;
  totalCount: number;
  currentMood?: MoodType;
}

const TodaysPlanCompact = ({ 
  currentTasks, 
  completedCount, 
  totalCount,
  currentMood
}: TodaysPlanCompactProps) => {
  const navigate = useNavigate();

  // Find top priority tasks
  const topPriorityTasks = currentTasks
    .filter(task => task.status !== 'completed')
    .sort((a, b) => {
      // Sort by priority first
      if (a.priority === 'high' && b.priority !== 'high') return -1;
      if (a.priority !== 'high' && b.priority === 'high') return 1;
      
      // Then by type (concepts and flashcards first)
      const typeOrder = { 
        [TaskType.Concept]: 1, 
        [TaskType.Flashcard]: 2, 
        [TaskType.Practice]: 3,
        [TaskType.PracticeExam]: 4,
        [TaskType.Test]: 5,
        [TaskType.Revision]: 6,
        [TaskType.Break]: 7
      };
      
      return (typeOrder[a.type] || 99) - (typeOrder[b.type] || 99);
    })
    .slice(0, 3); // Just top 3

  // Suggestions based on mood
  const getMoodBasedSuggestion = (mood?: MoodType) => {
    if (!mood) return null;
    
    switch(mood) {
      case MoodType.Anxious:
      case MoodType.Stressed:
      case MoodType.Overwhelmed:
        return "Focus on a single, small task to build momentum";
      case MoodType.Tired:
        return "Try a quick revision session or some flashcards";
      case MoodType.Happy:
      case MoodType.Motivated:
      case MoodType.Focused:
        return "Great time to tackle challenging concepts";
      case MoodType.Confused:
        return "Review foundational concepts before moving forward";
      default:
        return "Follow your personalized study plan for today";
    }
  };

  const getTaskTypeIcon = (type: TaskType) => {
    switch (type) {
      case TaskType.Concept:
        return <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-full"><Check className="h-3 w-3 text-blue-600 dark:text-blue-400" /></div>;
      case TaskType.Flashcard:
        return <div className="p-1 bg-purple-100 dark:bg-purple-900/30 rounded-full"><Check className="h-3 w-3 text-purple-600 dark:text-purple-400" /></div>;
      case TaskType.Practice:
      case TaskType.PracticeExam:
        return <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded-full"><Check className="h-3 w-3 text-green-600 dark:text-green-400" /></div>;
      default:
        return <div className="p-1 bg-gray-100 dark:bg-gray-800 rounded-full"><Check className="h-3 w-3 text-gray-600 dark:text-gray-400" /></div>;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          <div className="flex items-center">
            <CalendarDays className="h-5 w-5 mr-2 text-blue-500" />
            Today's Focus
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs"
            onClick={() => navigate('/dashboard/student/today')}
          >
            View Full Plan
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress:</span>
            <span className="font-medium">{completedCount}/{totalCount} tasks completed</span>
          </div>
          
          {currentMood && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-2.5 rounded-md text-xs text-blue-800 dark:text-blue-300">
              <p>{getMoodBasedSuggestion(currentMood)}</p>
            </div>
          )}
          
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase text-muted-foreground">Priority Tasks</p>
            {topPriorityTasks.length > 0 ? (
              topPriorityTasks.map(task => (
                <div key={task.id} className="flex items-center justify-between py-1.5 border-b border-dashed last:border-0">
                  <div className="flex items-center">
                    {getTaskTypeIcon(task.type)}
                    <div className="ml-2">
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground">{task.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{task.timeEstimate || task.duration} min</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-center py-2 text-muted-foreground">All tasks completed!</p>
            )}
          </div>
          
          <Button 
            className="w-full mt-2" 
            size="sm"
            onClick={() => navigate('/dashboard/student/today')}
          >
            Start Studying <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaysPlanCompact;
