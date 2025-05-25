
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UserProfileType } from "@/types/user/base";
import { Target, TrendingUp, Calendar, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ExamReadinessCardProps {
  userProfile: UserProfileType;
}

const ExamReadinessCard: React.FC<ExamReadinessCardProps> = ({ userProfile }) => {
  const navigate = useNavigate();
  
  const examReadiness = userProfile.examReadiness?.percentage || 72;
  const goalTitle = userProfile.goals?.[0]?.title || "NEET";

  const getReadinessColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-blue-600";
    if (percentage >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getReadinessStatus = (percentage: number) => {
    if (percentage >= 80) return "Excellent";
    if (percentage >= 60) return "Good";
    if (percentage >= 40) return "Fair";
    return "Needs Improvement";
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
            <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          {goalTitle} Exam Readiness
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-3xl font-bold ${getReadinessColor(examReadiness)}`}>
              {examReadiness}%
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {getReadinessStatus(examReadiness)}
            </p>
          </div>
          <div className="flex items-center gap-2 text-green-600">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">+5% this week</span>
          </div>
        </div>

        <Progress value={examReadiness} className="h-3" />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Concepts: 85%</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-blue-600" />
            <span>Practice: 70%</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1"
            onClick={() => navigate('/dashboard/student/analytics')}
          >
            View Details
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate('/dashboard/student/today')}
          >
            Study Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamReadinessCard;
