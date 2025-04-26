
import React, { useState } from 'react';
import { Calendar, BookOpen, ArrowRight, Circle, LockIcon } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TomorrowPreviewProps {
  allTasksCompleted?: boolean;
  tomorrowPlan?: {
    subject: string;
    count: number;
    type: string;
  }[];
}

export default function TomorrowPreview({ 
  allTasksCompleted = false,
  tomorrowPlan = [
    { subject: 'Physics', count: 3, type: 'Kinematics Advanced Concepts' },
    { subject: 'Chemistry', count: 2, type: 'Periodic Table Relations' },
    { subject: 'Math', count: 2, type: 'Integration Techniques' }
  ]
}: TomorrowPreviewProps) {
  const [showPreview, setShowPreview] = useState(false);
  
  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="p-0 pb-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium flex items-center gap-2">
            <Calendar className="text-blue-500" />
            Tomorrow's Preview
          </h3>
          <Button
            variant="outline"
            size="sm"
            disabled={!allTasksCompleted}
            onClick={() => setShowPreview(!showPreview)}
          >
            {allTasksCompleted ? 'Show Preview' : 'Complete today first'}
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {showPreview ? (
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm mb-2">Here's what you'll be learning tomorrow:</p>
            <ul className="space-y-2">
              {tomorrowPlan.map((item, index) => (
                <li key={index} className="text-sm flex items-center gap-2">
                  <Circle className="h-3 w-3 text-blue-500" />
                  {item.subject}: {item.type} ({item.count} cards)
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="p-6 bg-gray-50 rounded-lg text-center">
            {allTasksCompleted ? (
              <div className="flex flex-col items-center">
                <ArrowRight className="h-8 w-8 text-blue-500 mb-2" />
                <p>Click 'Show Preview' to see tomorrow's plan</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <LockIcon className="h-8 w-8 text-gray-400 mb-2" />
                <p>Complete today's tasks to unlock tomorrow's preview</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
