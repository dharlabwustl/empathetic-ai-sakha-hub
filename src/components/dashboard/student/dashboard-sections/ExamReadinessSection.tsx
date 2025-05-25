
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, TrendingUp, BookOpen } from 'lucide-react';

const ExamReadinessSection: React.FC = () => {
  const examReadiness = {
    overallScore: 78,
    subjects: [
      { name: 'Physics', score: 85, status: 'strong' },
      { name: 'Chemistry', score: 72, status: 'moderate' },
      { name: 'Mathematics', score: 80, status: 'strong' },
      { name: 'Biology', score: 65, status: 'needs-work' }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'strong': return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'needs-work': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-600" />
          Exam Readiness Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="text-3xl font-bold text-blue-600 mb-1">{examReadiness.overallScore}%</div>
          <p className="text-sm text-gray-600">Overall Readiness</p>
          <Progress value={examReadiness.overallScore} className="mt-2 h-2" />
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700 flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            Subject-wise Analysis
          </h4>
          {examReadiness.subjects.map((subject, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{subject.name}</span>
                <Badge variant="outline" className={getStatusColor(subject.status)}>
                  {subject.status.replace('-', ' ')}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{subject.score}%</span>
                <div className="w-16">
                  <Progress value={subject.score} className="h-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t">
          <Button variant="outline" size="sm" className="w-full">
            <TrendingUp className="h-4 w-4 mr-2" />
            View Detailed Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamReadinessSection;
