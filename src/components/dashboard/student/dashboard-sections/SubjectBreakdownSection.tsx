
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen } from 'lucide-react';

interface Subject {
  name: string;
  progress: number;
  color: string;
}

interface SubjectBreakdownSectionProps {
  subjects?: Subject[];
}

const SubjectBreakdownSection = ({ subjects }: SubjectBreakdownSectionProps) => {
  const defaultSubjects: Subject[] = [
    { name: 'Mathematics', progress: 78, color: 'bg-blue-500' },
    { name: 'Physics', progress: 65, color: 'bg-purple-500' },
    { name: 'Chemistry', progress: 42, color: 'bg-green-500' },
    { name: 'Biology', progress: 90, color: 'bg-amber-500' },
  ];

  const displaySubjects = subjects || defaultSubjects;

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-indigo-500" />
          Subject Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displaySubjects.map((subject) => (
            <div key={subject.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{subject.name}</span>
                <span>{subject.progress}%</span>
              </div>
              <Progress 
                value={subject.progress} 
                className={`h-2 ${subject.color}`} 
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectBreakdownSection;
