
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LayoutDashboard, FileCheck, BookOpen, Clock } from 'lucide-react';

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
  
  // Map task types to routes if not provided
  const getDefaultRoute = (task: Task) => {
    if (task.route) return task.route;
    
    switch (task.type) {
      case 'exam':
        return '/dashboard/student/practice-exam';
      case 'concept':
        // Direct link to concept card detail page using task id
        return `/dashboard/student/concepts/card/${task.id}`;
      case 'revision':
        return '/dashboard/student/flashcards/landing';
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
    console.log("Navigating to concept route:", route);
    navigate(route);
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Today's Plan</CardTitle>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => navigate('/dashboard/student/today')}>
          <LayoutDashboard className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">No tasks for today</p>
              <Button variant="outline" size="sm" className="mt-2">
                Create Study Plan
              </Button>
            </div>
          ) : (
            tasks.map((task) => (
              <div 
                key={task.id}
                onClick={() => handleTaskClick(task)}
                className="flex items-center cursor-pointer hover:bg-gray-50 rounded-md p-2 transition-colors"
              >
                <div className={`p-2 mr-4 rounded-full ${
                  task.type === 'exam' ? 'bg-blue-100' : 
                  task.type === 'concept' ? 'bg-green-100' : 'bg-purple-100'
                }`}>
                  {getTaskIcon(task.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-sm truncate">{task.title}</p>
                    <Badge variant={task.completed ? "outline" : "secondary"} className="ml-2 text-xs">
                      {task.time}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground capitalize mt-1">
                    {task.type} {task.completed && " • Completed"}
                  </p>
                </div>
              </div>
            ))
          )}
          
          {tasks.length > 0 && (
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/dashboard/student/today')}>
                View Full Schedule
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodayStudyPlan;
