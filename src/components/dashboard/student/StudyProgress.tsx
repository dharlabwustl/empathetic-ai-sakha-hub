
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Target } from 'lucide-react';

interface SubjectProgress {
  name: string;
  completed: number;
  total: number;
  progress: number;
  efficiency: number;
  studyTime: number;
}

interface StudyProgressProps {
  subjects: SubjectProgress[];
}

const StudyProgress: React.FC<StudyProgressProps> = ({ subjects }) => {
  return (
    <div className="space-y-4">
      {subjects.map((subject, index) => (
        <Card key={`${subject.name}-${index}`} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{subject.name}</CardTitle>
              <Badge variant="outline">{subject.progress}% Complete</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={subject.progress} className="h-2" />
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="font-medium">{subject.completed}/{subject.total}</p>
                    <p className="text-gray-600">Completed</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="font-medium">{subject.efficiency}%</p>
                    <p className="text-gray-600">Efficiency</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-600" />
                  <div>
                    <p className="font-medium">{subject.studyTime}h</p>
                    <p className="text-gray-600">Study Time</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StudyProgress;
