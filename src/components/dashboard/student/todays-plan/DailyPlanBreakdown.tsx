
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";

const DailyPlanBreakdown = () => {
  // Mock data for daily plan tasks
  const tasks = [
    { id: '1', title: 'Physics: Laws of Motion', time: '9:00 AM - 10:30 AM', completed: true },
    { id: '2', title: 'Chemistry: Periodic Table', time: '11:00 AM - 12:30 PM', completed: true },
    { id: '3', title: 'Math: Calculus Practice', time: '2:00 PM - 3:30 PM', completed: false },
    { id: '4', title: 'Biology: Cell Structure', time: '4:00 PM - 5:30 PM', completed: false },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Today's Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task.id} className="flex items-start gap-3">
              {task.completed ? (
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-gray-300 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>{task.title}</h3>
                <p className="text-sm text-muted-foreground">{task.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyPlanBreakdown;
