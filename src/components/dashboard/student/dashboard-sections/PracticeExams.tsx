
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileCheck, Calendar, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const PracticeExams: React.FC = () => {
  const exams = [
    { name: 'Physics Mock Test', duration: '3 hours', difficulty: 'Medium', available: true },
    { name: 'Chemistry Practice', duration: '2 hours', difficulty: 'Hard', available: true },
    { name: 'Biology Assessment', duration: '1.5 hours', difficulty: 'Easy', available: false }
  ];

  return (
    <Card id="practice-exams">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-blue-600" />
          Practice Exams
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {exams.map((exam, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium text-sm">{exam.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="h-3 w-3 text-gray-500" />
                <span className="text-xs text-gray-500">{exam.duration}</span>
                <Badge variant="outline" className="text-xs ml-2">
                  {exam.difficulty}
                </Badge>
              </div>
            </div>
            <Button 
              size="sm" 
              disabled={!exam.available}
              variant={exam.available ? "default" : "secondary"}
            >
              {exam.available ? 'Take Exam' : 'Locked'}
            </Button>
          </div>
        ))}
        
        <Link to="/dashboard/student/practice-exam">
          <Button variant="outline" className="w-full">
            <Trophy className="h-4 w-4 mr-2" />
            View All Exams
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PracticeExams;
