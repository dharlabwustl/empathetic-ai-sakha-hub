
import React from 'react';
import { Clock, Check, Circle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface StudyTimelineProps {
  timeline?: {
    subject: string;
    tasks: {
      id: string;
      title: string;
      type: 'concept' | 'flashcard' | 'practice';
      completed: boolean;
      timeEstimate: number;
    }[];
  }[];
}

export default function StudyTimeline({ timeline = [] }: StudyTimelineProps) {
  // If timeline is empty, show a placeholder
  if (timeline.length === 0) {
    return (
      <div className="py-4 text-center text-gray-500">
        <p>Your study timeline will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {timeline.map((subject, index) => (
        <div key={index} className="space-y-3">
          <h4 className="font-medium">{subject.subject}</h4>
          <div className="space-y-2">
            {subject.tasks.map((task) => (
              <div 
                key={task.id}
                className="flex items-center gap-3 p-2 bg-gray-50 rounded-md"
              >
                <span className={task.completed ? "text-green-500" : "text-gray-300"}>
                  {task.completed ? <Check className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{task.title}</p>
                  <div className="flex items-center gap-2">
                    <Progress value={task.completed ? 100 : 0} className="h-1.5 w-16" />
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {task.timeEstimate} min
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
