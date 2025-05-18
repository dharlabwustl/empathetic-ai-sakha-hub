
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LayoutDashboard, FileCheck, BookOpen, Clock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Task {
  id: string;
  title: string;
  time: string;
  type: 'exam' | 'task' | 'revision' | 'concept';
  completed?: boolean;
  route?: string; // Added route property for navigation
}

interface TodayStudyPlanProps {
  tasks: Task[];
}

const TodayStudyPlan: React.FC<TodayStudyPlanProps> = ({ tasks }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Map task types to routes if not provided
  const getDefaultRoute = (task: Task) => {
    if (task.route) return task.route;
    
    switch (task.type) {
      case 'exam':
        return '/dashboard/student/practice-exam';
      case 'concept':
        // Always use direct linking to concept detail pages
        return `/dashboard/student/concepts/${task.id}`;
      case 'revision':
        return '/dashboard/student/flashcards';
      default:
        return '/dashboard/student/today';
    }
  };

  // Get appropriate icon for each task type
  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'exam':
        return <FileCheck className="h-4 w-4" />;
      case 'concept':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };
  
  // Handle task click navigation
  const handleTaskClick = (task: Task) => {
    const route = getDefaultRoute(task);
    console.log("TodayStudyPlan - Navigating to task route:", route);
    navigate(route);
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className={`${isMobile ? "text-sm" : "text-base"} font-medium`}>Today's Plan</CardTitle>
        <Button 
          variant="ghost" 
          size={isMobile ? "sm" : "default"}
          className={isMobile ? "h-7 w-7 p-0" : "h-8 w-8 p-0"} 
          onClick={() => navigate('/dashboard/student/today')}
        >
          <LayoutDashboard className={`h-${isMobile ? "3" : "4"} w-${isMobile ? "3" : "4"}`} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        {tasks.length === 0 ? (
          <div className="text-center py-2">
            <p className={`text-gray-500 ${isMobile ? "text-xs" : "text-sm"}`}>No tasks scheduled for today</p>
          </div>
        ) : (
          tasks.map((task, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
              onClick={() => handleTaskClick(task)}
            >
              <div className="flex items-center gap-2">
                <div className={`p-1 rounded-full bg-${task.completed ? 'gray' : 'blue'}-100 dark:bg-${task.completed ? 'gray' : 'blue'}-900/30`}>
                  {getTaskIcon(task.type)}
                </div>
                <div>
                  <h4 className={`font-medium ${isMobile ? "text-xs" : "text-sm"} line-clamp-1`}>
                    {task.title}
                  </h4>
                  <p className={`text-gray-500 ${isMobile ? "text-xs" : "text-sm"}`}>{task.time}</p>
                </div>
              </div>
              <Badge variant={task.completed ? 'outline' : 'default'} className={isMobile ? "text-xs px-1 py-0" : ""}>
                {task.completed ? 'Done' : task.type.charAt(0).toUpperCase() + task.type.slice(1)}
              </Badge>
            </div>
          ))
        )}

        <div className="pt-2 text-center">
          <Button 
            variant="link" 
            size={isMobile ? "sm" : "default"}
            onClick={() => navigate('/dashboard/student/today')}
            className={`px-0 ${isMobile ? "text-xs" : "text-sm"}`}
          >
            View All Tasks
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodayStudyPlan;
