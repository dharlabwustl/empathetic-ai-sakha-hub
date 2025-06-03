
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, TrendingUp, Target } from 'lucide-react';

export const PerformanceTrackerSection = () => {
  const subjects = [
    { name: 'Physics', current: 78, target: 85, trend: '+5%' },
    { name: 'Chemistry', current: 72, target: 80, trend: '+3%' },
    { name: 'Biology', current: 85, target: 90, trend: '+7%' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Performance Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {subjects.map((subject, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{subject.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-green-600">{subject.trend}</span>
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Current: {subject.current}%</span>
                  <span>Target: {subject.target}%</span>
                </div>
                <Progress value={subject.current} className="h-2" />
                <div className="text-xs text-gray-500">
                  {subject.current >= subject.target ? 'Target achieved!' : `${subject.target - subject.current}% to target`}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
