import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, BookOpen, Brain, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { TaskType, TaskStatus } from "@/types/student/todaysPlan";

interface DailyPlanBreakdownProps {
  subject: string;
  concepts: { id: string; title: string; status: string; timeEstimate: number }[];
  flashcards: { id: string; title: string; status: string; timeEstimate: number }[];
  practiceExams: { id: string; title: string; status: string; timeEstimate: number }[];
  onTaskComplete: (subject: string, taskId: string, taskType: TaskType) => void;
}

export function DailyPlanBreakdown({
  subject,
  concepts,
  flashcards,
  practiceExams,
  onTaskComplete
}: DailyPlanBreakdownProps) {
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      const totalMinutes = concepts.reduce((total, task) => total + task.timeEstimate, 0) +
        flashcards.reduce((total, task) => total + task.timeEstimate, 0) +
        practiceExams.reduce((total, task) => total + task.timeEstimate, 0);

      setTotalMinutes(totalMinutes);

      const completed = concepts.filter(task => task.status === '✅ completed').length +
        flashcards.filter(task => task.status === '✅ completed').length +
        practiceExams.filter(task => task.status === '✅ completed').length;

      setCompletedTasks(completed);
    }, 100);
  }, [concepts, flashcards, practiceExams]);

  const totalTasks = concepts.length + flashcards.length + practiceExams.length;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const handleTaskComplete = (taskId: string, taskType: TaskType) => {
    onTaskComplete(subject, taskId, taskType);
  };

  const getTaskIcon = (type: TaskType) => {
    switch (type) {
      case 'concept':
        return <BookOpen className="h-4 w-4 mr-2 text-blue-500" />;
      case 'flashcard':
        return <Brain className="h-4 w-4 mr-2 text-violet-500" />;
      case 'practice-exam':
        return <FileText className="h-4 w-4 mr-2 text-emerald-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{subject}</CardTitle>
          <Badge variant="secondary">{totalTasks} tasks</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Progress</p>
            <p className="text-sm text-muted-foreground">{completedTasks} / {totalTasks}</p>
          </div>
          <Progress value={progress} />
        </div>

        <div className="text-sm text-muted-foreground flex items-center justify-between">
          <Clock className="h-4 w-4 mr-1" />
          <span>{totalMinutes} minutes</span>
          <span>{progress}% completed</span>
        </div>

        <div className="space-y-3">
          {concepts.length > 0 && (
            <div className="space-y-1">
              <h4 className="text-sm font-semibold flex items-center">
                {getTaskIcon('concept')}
                Concepts
              </h4>
              {concepts.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-2 rounded-lg border hover:bg-accent transition-colors">
                  <span className="text-sm">{task.title}</span>
                  {task.status === '✅ completed' ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <button onClick={() => handleTaskComplete(task.id, 'concept')} className="text-blue-500 hover:underline">
                      Mark Complete
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {flashcards.length > 0 && (
            <div className="space-y-1">
              <h4 className="text-sm font-semibold flex items-center">
                {getTaskIcon('flashcard')}
                Flashcards
              </h4>
              {flashcards.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-2 rounded-lg border hover:bg-accent transition-colors">
                  <span className="text-sm">{task.title}</span>
                  {task.status === '✅ completed' ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <button onClick={() => handleTaskComplete(task.id, 'flashcard')} className="text-blue-500 hover:underline">
                      Mark Complete
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {practiceExams.length > 0 && (
            <div className="space-y-1">
              <h4 className="text-sm font-semibold flex items-center">
                {getTaskIcon('practice-exam')}
                Practice Exams
              </h4>
              {practiceExams.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-2 rounded-lg border hover:bg-accent transition-colors">
                  <span className="text-sm">{task.title}</span>
                  {task.status === '✅ completed' ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <button onClick={() => handleTaskComplete(task.id, 'practice-exam')} className="text-blue-500 hover:underline">
                      Mark Complete
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
