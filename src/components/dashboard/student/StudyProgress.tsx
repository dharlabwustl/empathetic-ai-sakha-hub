
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Book, Clock, Target, TrendingUp } from 'lucide-react';

interface SubjectProgress {
  subject: string;
  progress: number;
  hours: number;
  totalHours: number;
  status: 'on-track' | 'behind' | 'ahead';
}

interface StudyProgressProps {
  subjectProgress: SubjectProgress[];
  overallProgress: number;
  totalStudyTime: number;
  weeklyGoal: number;
}

const StudyProgress: React.FC<StudyProgressProps> = ({
  subjectProgress,
  overallProgress,
  totalStudyTime,
  weeklyGoal
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ahead': return 'bg-green-100 text-green-800';
      case 'on-track': return 'bg-blue-100 text-blue-800';
      case 'behind': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Study Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{overallProgress}%</div>
              <div className="text-sm text-gray-500">Overall Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{totalStudyTime}h</div>
              <div className="text-sm text-gray-500">Total Study Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{weeklyGoal}h</div>
              <div className="text-sm text-gray-500">Weekly Goal</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Subject Progress</h3>
            {subjectProgress.map((subject, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Book className="h-4 w-4" />
                    <span className="font-medium">{subject.subject}</span>
                    <Badge className={getStatusColor(subject.status)}>
                      {subject.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    {subject.hours}h / {subject.totalHours}h
                  </div>
                </div>
                <Progress value={subject.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyProgress;
