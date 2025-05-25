
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Target, TrendingUp, AlertCircle } from 'lucide-react';
import { UserProfileType } from '@/types/user/base';

interface ExamReadinessSectionProps {
  userProfile: UserProfileType;
}

const ExamReadinessSection: React.FC<ExamReadinessSectionProps> = ({ userProfile }) => {
  const examReadinessScore = 72;
  const examName = userProfile?.goals?.[0]?.title || "NEET";
  
  const subjectReadiness = [
    { subject: 'Physics', score: 68, trend: 'up' },
    { subject: 'Chemistry', score: 75, trend: 'up' },
    { subject: 'Biology', score: 74, trend: 'neutral' }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg">Exam Readiness - {examName}</CardTitle>
          </div>
          <Badge variant="outline" className={getScoreBadgeColor(examReadinessScore)}>
            {examReadinessScore}% Ready
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Overall Progress */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">Overall Readiness</span>
              <span className={`font-semibold ${getScoreColor(examReadinessScore)}`}>
                {examReadinessScore}%
              </span>
            </div>
            <Progress value={examReadinessScore} className="h-3" />
          </div>

          {/* Subject-wise breakdown */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground">Subject-wise Progress</h4>
            {subjectReadiness.map((subject) => (
              <div key={subject.subject} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{subject.subject}</span>
                  {subject.trend === 'up' && <TrendingUp className="h-3 w-3 text-green-500" />}
                  {subject.trend === 'neutral' && <AlertCircle className="h-3 w-3 text-yellow-500" />}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20">
                    <Progress value={subject.score} className="h-2" />
                  </div>
                  <span className={`text-sm font-medium ${getScoreColor(subject.score)}`}>
                    {subject.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamReadinessSection;
