
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, CheckCircle, AlertCircle, BookOpen } from 'lucide-react';

export const AdaptivePlanTable = () => {
  const [selectedWeek, setSelectedWeek] = useState(1);

  const weeklyPlan = [
    {
      week: 1,
      days: [
        { day: 'Monday', subject: 'Physics', topic: 'Mechanics - Laws of Motion', hours: 3, status: 'completed' },
        { day: 'Tuesday', subject: 'Chemistry', topic: 'Atomic Structure', hours: 3, status: 'completed' },
        { day: 'Wednesday', subject: 'Biology', topic: 'Cell Structure', hours: 3, status: 'in-progress' },
        { day: 'Thursday', subject: 'Physics', topic: 'Work Energy Power', hours: 3, status: 'pending' },
        { day: 'Friday', subject: 'Chemistry', topic: 'Chemical Bonding', hours: 3, status: 'pending' },
        { day: 'Saturday', subject: 'Biology', topic: 'Biomolecules', hours: 3, status: 'pending' }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      'completed': 'default',
      'in-progress': 'secondary',
      'pending': 'outline'
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Adaptive Weekly Study Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4].map((week) => (
                <Button
                  key={week}
                  variant={selectedWeek === week ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedWeek(week)}
                >
                  Week {week}
                </Button>
              ))}
            </div>

            <div className="space-y-3">
              {weeklyPlan[0].days.map((day, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(day.status)}
                        <div>
                          <div className="font-medium">{day.day}</div>
                          <div className="text-sm text-gray-600">{day.subject} - {day.topic}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="h-3 w-3" />
                          {day.hours}h
                        </div>
                        {getStatusBadge(day.status)}
                      </div>
                    </div>
                    {day.status === 'in-progress' && (
                      <div className="mt-3">
                        <Progress value={60} className="h-2" />
                        <div className="text-xs text-gray-600 mt-1">60% completed</div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
