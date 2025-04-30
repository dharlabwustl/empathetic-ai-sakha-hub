
import React from 'react';
import { Progress } from '@/components/ui/progress';

const SubjectOverview: React.FC = () => {
  const subjects = [
    { name: 'Mathematics', progress: 78, color: 'bg-blue-500' },
    { name: 'Physics', progress: 65, color: 'bg-green-500' },
    { name: 'Chemistry', progress: 82, color: 'bg-purple-500' },
    { name: 'Biology', progress: 45, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Subject Mastery</h3>
      
      <div className="space-y-4">
        {subjects.map((subject, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{subject.name}</span>
              <span className="font-medium">{subject.progress}%</span>
            </div>
            <Progress value={subject.progress} className="h-2" />
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground">
        <p>Based on your recent assessments and activities</p>
      </div>
    </div>
  );
};

export default SubjectOverview;
