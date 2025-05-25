
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, TrendingUp, Target } from 'lucide-react';

interface SubjectProgress {
  subject: string;
  progress: number;
  topics: number;
  completed: number;
}

const StudyProgress = () => {
  const subjectProgress: SubjectProgress[] = [
    { subject: 'Physics', progress: 75, topics: 20, completed: 15 },
    { subject: 'Chemistry', progress: 60, topics: 18, completed: 11 },
    { subject: 'Biology', progress: 85, topics: 22, completed: 19 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600" />
          Study Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {subjectProgress.map((subject, index) => (
            <div key={subject.subject} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{subject.subject}</span>
                <span className="text-sm text-gray-600">
                  {subject.completed}/{subject.topics} topics
                </span>
              </div>
              <Progress value={subject.progress} className="h-2" />
              <div className="text-xs text-gray-500">
                {subject.progress}% complete
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyProgress;
