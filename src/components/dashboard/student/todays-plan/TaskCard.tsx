
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, FileText, Circle, CheckCircle } from 'lucide-react';
import { TaskItem } from '@/pages/dashboard/student/TodaysPlanPage';

interface TaskCardProps {
  task: TaskItem;
  onComplete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete }) => {
  return (
    <div className="flex items-start gap-3 p-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
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
              <span>{task.subject}</span>
              <span>•</span>
              <span>{task.chapter}</span>
              <span>•</span>
              <span>{task.estimatedTime} min</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                task.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                task.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
                'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
              }`}>
                {task.difficulty}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {task.type === 'concept' && (
              <Link to={`/dashboard/student/concepts/study/${task.id}`}>
                <Button size="sm" variant={task.completed ? "outline" : "default"}>
                  {task.completed ? "Review Again" : "Start Learning"}
                </Button>
              </Link>
            )}
            {task.type === 'flashcard' && (
              <Link to={`/dashboard/student/flashcards/practice/${task.id}`}>
                <Button size="sm" variant={task.completed ? "outline" : "default"} 
                  className={task.completed ? "" : "bg-amber-600 hover:bg-amber-700"}>
                  {task.completed ? "Review Again" : "Practice Now"}
                </Button>
              </Link>
            )}
            {task.type === 'exam' && (
              <Link to={`/dashboard/student/exams/start/${task.id}`}>
                <Button size="sm" variant={task.completed ? "outline" : "default"}
                  className={task.completed ? "" : "bg-violet-600 hover:bg-violet-700"}>
                  {task.completed ? "Review Results" : "Start Exam"}
                </Button>
              </Link>
            )}
            {!task.completed && (
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={onComplete} 
                className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
              >
                <CheckCircle size={16} className="mr-1" />
                Mark Complete
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
