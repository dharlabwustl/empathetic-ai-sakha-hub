
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface GradesOverviewProps {
  studentId: string;
}

export const GradesOverview: React.FC<GradesOverviewProps> = ({ studentId }) => {
  // This would fetch grades data based on studentId in a real app
  const mockGrades = [
    { subject: 'Mathematics', grade: 'A', percentage: 92 },
    { subject: 'Physics', grade: 'B+', percentage: 87 },
    { subject: 'Chemistry', grade: 'A-', percentage: 89 },
    { subject: 'Biology', grade: 'B', percentage: 85 },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Grades Overview</h3>
      
      <div className="space-y-3">
        {mockGrades.map((grade, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="font-medium">{grade.subject}</span>
            <div className="flex items-center gap-3">
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${grade.percentage}%` }}
                />
              </div>
              <span className="text-sm font-semibold">{grade.grade}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground">
        <p>Last updated: 2 weeks ago</p>
      </div>
    </div>
  );
};
