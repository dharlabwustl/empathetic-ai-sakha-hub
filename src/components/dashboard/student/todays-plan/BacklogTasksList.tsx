
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TodaysPlanData } from "@/types/student/todaysPlan";
import { Link } from 'react-router-dom';
import { Clock } from "lucide-react";

interface BacklogTasksListProps {
  planData: TodaysPlanData | null;
  isLoading: boolean;
}

export function BacklogTasksList({ planData, isLoading }: BacklogTasksListProps) {
  if (isLoading || !planData) return null;

  // Collect all pending tasks
  const pendingTasks = Object.entries(planData.subjectBreakdown).flatMap(([subject, tasks]) => {
    const concepts = tasks.concepts
      .filter(t => t.status === '🔴 pending')
      .map(t => ({ ...t, subject, type: 'concept' as const }));
      
    const flashcards = tasks.flashcards
      .filter(t => t.status === '🔴 pending')
      .map(t => ({ ...t, subject, type: 'flashcard' as const }));
      
    const practiceExams = tasks.practiceExams
      .filter(t => t.status === '🔴 pending')
      .map(t => ({ ...t, subject, type: 'practice-exam' as const }));
      
    return [...concepts, ...flashcards, ...practiceExams];
  });

  if (pendingTasks.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Pending Tasks</CardTitle>
          <Badge variant="destructive">{pendingTasks.length} tasks</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {pendingTasks.map((task) => (
            <Link
              key={task.id}
              to={`/dashboard/student/${task.type}s/${encodeURIComponent(task.title)}`}
              className="block"
            >
              <div className="flex items-center justify-between p-2 rounded-lg border hover:bg-accent transition-colors">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    {task.subject}
                  </Badge>
                  <span className="text-sm">{task.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {task.timeEstimate}m
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
