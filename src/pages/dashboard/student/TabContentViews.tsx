
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Book, Filter, CheckCircle, Circle, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/card";
import { format, isToday, parseISO } from 'date-fns';
import { DailyTaskItem } from '@/types/user/study';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

// Mock data for today's tasks - In a real app, this would come from an API
const mockTodayTasks: DailyTaskItem[] = [
  {
    id: "task-1",
    type: "concept",
    title: "Newton's Laws of Motion",
    subject: "Physics",
    chapter: "Laws of Motion",
    difficulty: "Medium",
    completed: false,
    dueDate: new Date().toISOString(),
    description: "Understanding the fundamental laws of motion"
  },
  {
    id: "task-2",
    type: "flashcard",
    title: "Physics Formulas",
    subject: "Physics",
    completed: false,
    dueDate: new Date().toISOString(),
    description: "Review key physics formulas"
  },
  {
    id: "task-3",
    type: "practice-exam",
    title: "Motion and Forces Quiz",
    subject: "Physics",
    completed: false,
    dueDate: new Date().toISOString(),
    description: "Test your understanding of motion concepts"
  }
];

export const TodayPlanView = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = React.useState(mockTodayTasks);
  const [selectedDate, setSelectedDate] = React.useState<string>(new Date().toISOString());
  const [viewMode, setViewMode] = React.useState<'current' | 'history'>('current');

  const completionRate = Math.round(
    (tasks.filter(task => task.completed).length / tasks.length) * 100
  );

  const handleTaskCompletion = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: true, completedAt: new Date().toISOString() } 
          : task
      )
    );

    toast({
      title: "Task completed!",
      description: "Your progress has been updated.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Today's Learning Plan</h2>
          <p className="text-gray-500">
            Track your daily progress and stay on schedule
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === 'current' ? 'history' : 'current')}>
            {viewMode === 'current' ? (
              <>
                <Calendar className="h-4 w-4 mr-1" />
                View History
              </>
            ) : (
              <>
                <Clock className="h-4 w-4 mr-1" />
                Current Tasks
              </>
            )}
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
        </div>
      </div>

      {/* Progress section */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Daily Progress</span>
          <span className="text-sm text-gray-500">{completionRate}% Complete</span>
        </div>
        <Progress value={completionRate} className="h-2" />
      </div>

      {/* Tasks list */}
      <div className="grid gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-4 transition-all"
          >
            <div className="flex items-start gap-3">
              <Button
                variant="ghost"
                className="mt-1"
                onClick={() => !task.completed && handleTaskCompletion(task.id)}
                disabled={task.completed}
              >
                {task.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-300" />
                )}
              </Button>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                  </div>
                  {!task.completed && <ArrowRight className="h-5 w-5 text-gray-400" />}
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100">
                    {task.subject}
                  </Badge>
                  {task.chapter && (
                    <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-100">
                      {task.chapter}
                    </Badge>
                  )}
                  <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-100">
                    {task.type === 'concept' ? 'Concept Card' : 
                     task.type === 'flashcard' ? 'Flashcard Set' : 
                     'Practice Exam'}
                  </Badge>
                  {task.difficulty && (
                    <Badge variant="outline" className={`
                      ${task.difficulty === 'Easy' && 'bg-green-50 text-green-600 border-green-100'}
                      ${task.difficulty === 'Medium' && 'bg-yellow-50 text-yellow-600 border-yellow-100'}
                      ${task.difficulty === 'Hard' && 'bg-red-50 text-red-600 border-red-100'}
                    `}>
                      {task.difficulty}
                    </Badge>
                  )}
                </div>
                
                {task.completed && task.completedAt && (
                  <p className="text-sm text-green-600 mt-2">
                    Completed {format(parseISO(task.completedAt), 'MMM d, yyyy h:mm a')}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const FlashcardsView = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Flashcards</h2>
      <p className="text-gray-600 mb-4">
        Study and memorize key concepts with interactive flashcards.
      </p>
      
      {/* Flashcards content would go here */}
      <div className="p-8 text-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">Select a flashcard deck to begin studying.</p>
      </div>
    </div>
  );
};

export const PracticeExamsView = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Practice Exams</h2>
      <p className="text-gray-600 mb-4">
        Test your knowledge with practice exams and quizzes.
      </p>
      
      {/* Practice exams content would go here */}
      <div className="p-8 text-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">Select a practice exam to begin testing.</p>
      </div>
    </div>
  );
};
