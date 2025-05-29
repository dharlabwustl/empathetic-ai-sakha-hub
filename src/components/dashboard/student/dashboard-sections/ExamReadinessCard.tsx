
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExamReadinessCard: React.FC = () => {
  return (
    <Card id="exam-readiness-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-green-600" />
          Exam Readiness
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Readiness</span>
            <span className="font-semibold">78%</span>
          </div>
          <Progress value={78} className="h-3" />
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="text-center">
            <p className="font-medium">Physics</p>
            <p className="text-green-600">82%</p>
          </div>
          <div className="text-center">
            <p className="font-medium">Chemistry</p>
            <p className="text-orange-600">75%</p>
          </div>
          <div className="text-center">
            <p className="font-medium">Biology</p>
            <p className="text-blue-600">77%</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="h-4 w-4" />
          <span>Next assessment: Tomorrow</span>
        </div>
        
        <Link to="/dashboard/student/exam-readiness">
          <Button className="w-full">
            <TrendingUp className="h-4 w-4 mr-2" />
            Check Readiness
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ExamReadinessCard;
