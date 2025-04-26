
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock, AlertTriangle } from "lucide-react";

interface PendingTask {
  id: string;
  title: string;
  type: 'concept' | 'flashcard' | 'exam';
  date: string;
  timeEstimate: number;
  path: string;
}

export const HistoryAndBacklog = () => {
  const pendingTasks: PendingTask[] = [
    {
      id: '1',
      title: 'Rise of Delhi Sultanate',
      type: 'concept',
      date: '2024-04-25',
      timeEstimate: 30,
      path: '/dashboard/student/concepts/delhi-sultanate'
    },
    // ... Add more pending tasks
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <span>Pending Tasks & History</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {pendingTasks.map(task => (
          <Link key={task.id} to={task.path}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{task.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline">
                        {task.type === 'concept' && 'Concept Card'}
                        {task.type === 'flashcard' && 'Flashcard'}
                        {task.type === 'exam' && 'Practice Exam'}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        Due: {new Date(task.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Button variant="default" size="sm" className="ml-4">
                    Complete Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};
