
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export interface SubjectProgress {
  id?: string;
  subject: string;
  progress: number;
  total: number;
}

export interface StudyProgressProps {
  subjectProgress?: SubjectProgress[];
}

const StudyProgress: React.FC<StudyProgressProps> = ({ subjectProgress = [] }) => {
  const defaultProgress: SubjectProgress[] = [
    { id: '1', subject: 'Physics', progress: 75, total: 100 },
    { id: '2', subject: 'Chemistry', progress: 60, total: 100 },
    { id: '3', subject: 'Mathematics', progress: 85, total: 100 },
    { id: '4', subject: 'Biology', progress: 70, total: 100 }
  ];

  const displayProgress = subjectProgress.length > 0 ? subjectProgress : defaultProgress;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayProgress.map((subject, index) => (
          <div key={subject.id || index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{subject.subject}</span>
              <span className="text-muted-foreground">
                {subject.progress}%
              </span>
            </div>
            <Progress value={subject.progress} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default StudyProgress;
