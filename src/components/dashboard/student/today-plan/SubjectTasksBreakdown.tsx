
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Book, Brain, FileText } from 'lucide-react';

const SubjectTasksBreakdown: React.FC = () => {
  // Mock data for subject breakdown
  const subjects = [
    {
      name: 'Physics',
      color: 'bg-blue-500',
      concepts: 2,
      flashcards: 1,
      practiceExams: 1,
      completed: 1,
      total: 4
    },
    {
      name: 'Chemistry', 
      color: 'bg-green-500',
      concepts: 1,
      flashcards: 1,
      practiceExams: 1,
      completed: 1,
      total: 3
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Subject Breakdown</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjects.map((subject) => (
          <Card key={subject.name} className="border-l-4" style={{ borderLeftColor: subject.color.replace('bg-', '#') }}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg">
                {subject.name}
                <Badge variant="outline">
                  {subject.completed}/{subject.total}
                </Badge>
              </CardTitle>
              <Progress value={(subject.completed / subject.total) * 100} className="h-2" />
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Book className="h-4 w-4 text-blue-500" />
                  <span>Concepts</span>
                </div>
                <span className="font-medium">{subject.concepts}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-purple-500" />
                  <span>Flashcards</span>
                </div>
                <span className="font-medium">{subject.flashcards}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-orange-500" />
                  <span>Practice Exams</span>
                </div>
                <span className="font-medium">{subject.practiceExams}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubjectTasksBreakdown;
