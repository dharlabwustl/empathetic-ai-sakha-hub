
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Clock, 
  Play, 
  BookOpen, 
  Brain, 
  Target 
} from 'lucide-react';

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    type: 'concept' | 'flashcard' | 'practice-exam';
    duration: number;
    status: 'pending' | 'completed' | 'in-progress';
    subject: string;
    difficulty?: string;
    cardCount?: number;
    questionCount?: number;
  };
  onStart: (taskId: string) => void;
  onComplete: (taskId: string) => void;
  onTaskClick?: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onStart, 
  onComplete, 
  onTaskClick 
}) => {
  const isCompleted = task.status === 'completed';
  
  const getTaskIcon = () => {
    switch (task.type) {
      case 'concept': return <BookOpen className="h-5 w-5 text-blue-600" />;
      case 'flashcard': return <Brain className="h-5 w-5 text-purple-600" />;
      case 'practice-exam': return <Target className="h-5 w-5 text-green-600" />;
    }
  };

  const getTypeColor = () => {
    switch (task.type) {
      case 'concept': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'flashcard': return 'bg-purple-50 border-purple-200 text-purple-700';
      case 'practice-exam': return 'bg-green-50 border-green-200 text-green-700';
    }
  };

  return (
    <Card 
      className={`transition-all duration-300 hover:shadow-lg border-l-4 ${
        isCompleted 
          ? 'bg-green-50 dark:bg-green-900/20 border-l-green-500' 
          : 'bg-white dark:bg-gray-800 border-l-blue-500'
      }`}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <button
            onClick={() => onComplete(task.id)}
            className={`mt-1 transition-all duration-200 ${
              isCompleted 
                ? 'text-green-600 scale-110' 
                : 'text-gray-300 hover:text-blue-600 hover:scale-110'
            }`}
          >
            <CheckCircle2 className="h-7 w-7" />
          </button>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              {getTaskIcon()}
              <h3 
                className={`font-bold text-xl cursor-pointer hover:text-blue-600 transition-colors ${
                  isCompleted ? 'line-through text-gray-500' : 'text-gray-800 dark:text-white'
                }`}
                onClick={() => onTaskClick?.(task.id)}
              >
                {task.title}
              </h3>
            </div>
            
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge className={getTypeColor()}>
                {task.type.replace('-', ' ').toUpperCase()}
              </Badge>
              {task.difficulty && (
                <Badge variant="outline">
                  {task.difficulty}
                </Badge>
              )}
              <Badge variant="outline" className="bg-gray-50 text-gray-700">
                {task.subject}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">{task.duration} min</span>
                </div>
                {task.cardCount && (
                  <span>{task.cardCount} cards</span>
                )}
                {task.questionCount && (
                  <span>{task.questionCount} questions</span>
                )}
              </div>
              
              {!isCompleted && (
                <Button
                  onClick={() => onStart(task.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
