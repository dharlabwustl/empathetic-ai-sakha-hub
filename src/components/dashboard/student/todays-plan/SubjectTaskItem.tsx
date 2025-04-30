
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ConceptTask, FlashcardTask, PracticeExamTask } from "@/types/student/todaysPlan";
import { BookOpen, FileText, Clock, Bookmark, CheckCircle, AlertCircle, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: ConceptTask | FlashcardTask | PracticeExamTask;
  onComplete: (taskId: string, taskType: 'concept' | 'flashcard' | 'practice-exam') => void;
  onBookmark: (taskId: string) => void;
  className?: string;
}

export function TaskItem({ task, onComplete, onBookmark, className }: TaskItemProps) {
  const getIcon = () => {
    switch(task.type) {
      case 'concept': return <BookOpen className="h-4 w-4 text-blue-500" />;
      case 'flashcard': return <FileText className="h-4 w-4 text-amber-500" />;
      case 'practice-exam': return <AlertCircle className="h-4 w-4 text-violet-500" />;
    }
  };
  
  const getStatusClass = () => {
    switch(task.status) {
      case '✅ completed': return "border-l-green-500";
      case '🔄 in-progress': return "border-l-blue-500";
      case '🕒 viewed': return "border-l-gray-400";
      case '🔴 pending': return "border-l-red-500";
      default: return "";
    }
  };
  
  const getPriorityClass = () => {
    switch(task.priority) {
      case 'high': return "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400";
      case 'medium': return "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400";
      case 'low': return "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400";
    }
  };
  
  // Additional details based on task type
  const renderTaskDetails = () => {
    if (task.type === 'flashcard') {
      return (
        <div className="flex items-center text-sm text-muted-foreground">
          <span className="mr-2">{task.cardCount} cards</span>
          {task.recallAccuracy !== undefined && (
            <Badge variant="outline" className="bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400">
              {task.recallAccuracy}% recall
            </Badge>
          )}
        </div>
      );
    } else if (task.type === 'practice-exam') {
      return (
        <div className="flex items-center text-sm text-muted-foreground">
          <span className="mr-2">{task.questionCount} Qs</span>
          <Clock className="h-3 w-3 mr-1" />
          <span>{task.timeLimit} mins</span>
          {task.lastScore !== undefined && (
            <Badge variant="outline" className="ml-2 bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
              Score: {task.lastScore}%
            </Badge>
          )}
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card 
      className={cn(
        "border-l-4 mb-2 hover:shadow-md transition-shadow duration-200", 
        getStatusClass(),
        className
      )}
    >
      <CardContent className="p-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {getIcon()}
              <span className="ml-2 font-medium">{task.title}</span>
              {task.chapter && (
                <Badge variant="outline" className="ml-2 text-xs">
                  {task.chapter}
                </Badge>
              )}
            </div>
            <Badge className={cn("text-xs", getPriorityClass())}>
              {task.priority}
            </Badge>
          </div>
          
          {renderTaskDetails()}
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex-1 mr-4">
              <Progress 
                value={task.completionPercent} 
                className="h-2" 
                indicatorClassName={task.status === '✅ completed' ? 'bg-green-500' : undefined}
              />
            </div>
            
            <div className="flex items-center gap-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 px-2"
                onClick={() => onBookmark(task.id)}
              >
                <Bookmark className="h-3 w-3" />
              </Button>
              
              {task.status !== '✅ completed' ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 px-2"
                  onClick={() => onComplete(task.id, task.type)}
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  <span className="text-xs">Complete</span>
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 px-2 bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                >
                  <MessageSquare className="h-3 w-3 mr-1" />
                  <span className="text-xs">Revisit</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
