
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AlertTriangle, CalendarDays } from 'lucide-react';

export const HistoryAndBacklog: React.FC = () => {
  // This is a placeholder component that would be replaced with actual implementation
  const pendingTasks = [
    { id: 'p1', subject: 'History', title: 'Rise of Delhi Sultanate', type: 'concept' },
    { id: 'p2', subject: 'History', title: 'Bhakti Movement', type: 'concept' },
    { id: 'p3', subject: 'Math', title: 'Linear Equations 2', type: 'concept' }
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Pending Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {pendingTasks.map(task => (
              <div key={task.id} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                <div className="flex-1">
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-muted-foreground">{task.subject} · {task.type}</p>
                </div>
                <Link to={`/dashboard/student/${task.type}s/${task.id}`}>
                  <Button size="sm" variant="outline">
                    Complete {task.type === 'concept' ? 'Concept' : task.type === 'flashcard' ? 'Flashcard' : 'Test'}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CalendarDays className="h-5 w-5 text-green-500" />
            Tomorrow's Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-3">Coming up tomorrow:</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p>Concepts</p>
              <span className="font-medium">3</span>
            </div>
            <div className="flex justify-between items-center">
              <p>Flashcards</p>
              <span className="font-medium">15</span>
            </div>
            <div className="flex justify-between items-center">
              <p>Practice Tests</p>
              <span className="font-medium">1</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
