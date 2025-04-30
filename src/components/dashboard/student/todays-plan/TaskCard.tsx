
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { CheckCircle, Circle, Clock, BookOpen, Brain, FileText } from 'lucide-react';
import { TaskItem } from '@/pages/dashboard/student/dashboard/TodaysPlanView';

interface TaskCardProps {
  task: TaskItem;
  onComplete: () => void;
}

const TaskCard = ({ task, onComplete }: TaskCardProps) => {
  // Get the appropriate route based on task type
  const getTaskRoute = () => {
    switch (task.type) {
      case 'concept':
        return `/dashboard/student/concepts/study/${task.id}`;
      case 'flashcard':
        return `/dashboard/student/flashcards/practice/${task.id}`;
      case 'exam':
        return `/dashboard/student/exams/start/${task.id}`;
      default:
        return '#';
    }
  };

  // Get appropriate button text based on task status and type
  const getButtonText = () => {
    if (task.completed) {
      return "Review Again";
    }
    
    switch (task.type) {
      case 'concept':
        return "Start Learning";
      case 'flashcard':
        return "Practice Now";
      case 'exam':
        return "Start Exam";
      default:
        return "Begin";
    }
  };

  // Get button variant and color based on task type
  const getButtonStyle = () => {
    if (task.completed) {
      return { variant: "outline" as const, className: "" };
    }
    
    switch (task.type) {
      case 'concept':
        return { variant: "default" as const, className: "bg-blue-600 hover:bg-blue-700" };
      case 'flashcard':
        return { variant: "default" as const, className: "bg-amber-600 hover:bg-amber-700" };
      case 'exam':
        return { variant: "default" as const, className: "bg-violet-600 hover:bg-violet-700" };
      default:
        return { variant: "default" as const, className: "" };
    }
  };

  const { variant, className } = getButtonStyle();

  return (
    <div className="flex items-start gap-3 p-3 rounded-md bg-white dark:bg-gray-800 border shadow-sm hover:shadow-md transition-shadow">
      <div className="mt-1 text-lg">
        {task.completed ? (
          <CheckCircle className="text-green-500" />
        ) : (
          <Circle className="text-gray-300" />
        )}
      </div>
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{task.title}</h3>
              {task.type === 'concept' && <BookOpen size={16} className="text-blue-500" />}
              {task.type === 'flashcard' && <Brain size={16} className="text-amber-500" />}
              {task.type === 'exam' && <FileText size={16} className="text-violet-500" />}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="outline" className="bg-gray-50 dark:bg-gray-700">
                {task.subject}
              </Badge>
              <span>•</span>
              <span>{task.chapter}</span>
              <span>•</span>
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                <span>{task.estimatedTime} min</span>
              </div>
              <Badge variant={task.difficulty === "Easy" ? "outline" : 
                     task.difficulty === "Medium" ? "secondary" : "destructive"}
                     className="ml-2">
                {task.difficulty}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <Link to={getTaskRoute()}>
              <Button size="sm" variant={variant} className={className}>
                {getButtonText()}
              </Button>
            </Link>
            {!task.completed && (
              <Button size="sm" variant="ghost" onClick={onComplete}>
                Mark Complete
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
