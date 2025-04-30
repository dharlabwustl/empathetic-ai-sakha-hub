
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Subject {
  name: string;
  completion: number;
  color: string;
}

interface SubjectBreakdownSectionProps {
  subjects?: Subject[];
}

const SubjectBreakdownSection = ({ subjects }: SubjectBreakdownSectionProps) => {
  // Default data if none provided
  const defaultSubjects: Subject[] = [
    { name: 'Physics', completion: 68, color: 'bg-blue-500' },
    { name: 'Chemistry', completion: 45, color: 'bg-green-500' },
    { name: 'Mathematics', completion: 75, color: 'bg-purple-500' },
    { name: 'Biology', completion: 32, color: 'bg-amber-500' },
  ];

  const displaySubjects = subjects || defaultSubjects;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-green-500" />
          Subject Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displaySubjects.map((subject, index) => (
            <div key={subject.name}>
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{subject.name}</span>
                <span className="text-sm">{subject.completion}%</span>
              </div>
              <Progress 
                value={subject.completion} 
                className="h-2" 
                indicatorClassName={subject.color} 
              />
            </div>
          ))}

          <div className="flex justify-center pt-2">
            <Button variant="ghost" size="sm" className="text-primary flex items-center">
              View All Subjects <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectBreakdownSection;
