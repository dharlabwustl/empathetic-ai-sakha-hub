
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, Brain, FileText, Star, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

interface Task {
  id: string;
  title: string;
  subject: string;
  type: 'concept' | 'flashcard' | 'exam';
  timeEstimate: number;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  isNew?: boolean;
}

interface UpcomingTasksProps {
  tasks: Task[];
}

const UpcomingTasks: React.FC<UpcomingTasksProps> = ({ tasks }) => {
  const navigate = useNavigate();
  
  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept':
        return <BookOpen className="h-5 w-5 text-blue-500" />;
      case 'flashcard':
        return <Brain className="h-5 w-5 text-violet-500" />;
      case 'exam':
        return <FileText className="h-5 w-5 text-emerald-500" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  const getTaskRoute = (task: Task) => {
    switch (task.type) {
      case 'concept':
        // Update route to use the enhanced concept detail page
        return `/dashboard/student/concepts/${task.id}`;
      case 'flashcard':
        return `/dashboard/student/flashcards`;
      case 'exam':
        return `/dashboard/student/practice-exam`;
      default:
        return `/dashboard/student`;
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-l-red-500';
      case 'medium':
        return 'border-l-4 border-l-yellow-500';
      case 'low':
        return 'border-l-4 border-l-blue-500';
      default:
        return '';
    }
  };

  return (
    <Card className="shadow-md border-gray-200 dark:border-gray-800">
      <CardHeader className="pb-0">
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-500" />
            <span>Upcoming Tasks</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {tasks.length} pending
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 pt-3">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <div 
                className={cn("border rounded-lg p-3 hover:shadow-sm transition-shadow cursor-pointer group", 
                  getPriorityClass(task.priority),
                  task.isNew ? "bg-blue-50 dark:bg-blue-950/30" : ""
                )}
                onClick={() => navigate(getTaskRoute(task))}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    {getTaskIcon(task.type)}
                    <div>
                      <h3 className="font-medium group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                        {task.title}
                        {task.isNew && (
                          <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-[10px]">
                            NEW
                          </Badge>
                        )}
                      </h3>
                      <p className="text-sm text-gray-500">{task.subject}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant="outline" className="bg-opacity-60">
                      {task.type}
                    </Badge>
                    {task.priority === 'high' && (
                      <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-none">
                        Priority
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{task.timeEstimate} min</span>
                  <div className="ml-auto text-xs flex items-center gap-1">
                    Due: {task.dueDate}
                    {task.priority === 'high' && <Flag className="h-3 w-3 text-red-500" />}
                  </div>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <Button 
                    className="flex-1 text-sm py-1 h-auto"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(getTaskRoute(task));
                    }}
                  >
                    Start Now
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="sm" 
                    className="text-sm py-1 h-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add to today functionality would go here
                    }}
                  >
                    Schedule Later
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
          
          {tasks.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
              <p>No upcoming tasks</p>
              <p className="text-sm">Great job! You're all caught up.</p>
            </div>
          )}
          
          {tasks.length > 0 && (
            <div className="text-center mt-4">
              <Button 
                variant="link" 
                size="sm" 
                onClick={() => navigate('/dashboard/student/tasks')}
                className="text-sm text-muted-foreground"
              >
                View all tasks
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingTasks;
