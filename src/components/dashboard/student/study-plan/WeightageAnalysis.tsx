
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PieChart, BarChart3, TrendingUp } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface WeightageAnalysisProps {
  subjects: StudyPlanSubject[];
}

interface WeightageData {
  subject: string;
  totalWeightage: number;
  completedWeightage: number;
  priority: 'high' | 'medium' | 'low';
  examImportance: number;
  color: string;
}

const mockWeightageData: WeightageData[] = [
  {
    subject: 'Physics',
    totalWeightage: 35,
    completedWeightage: 8,
    priority: 'high',
    examImportance: 90,
    color: '#8B5CF6'
  },
  {
    subject: 'Chemistry',
    totalWeightage: 35,
    completedWeightage: 12,
    priority: 'high',
    examImportance: 85,
    color: '#10B981'
  },
  {
    subject: 'Mathematics',
    totalWeightage: 30,
    completedWeightage: 25,
    priority: 'medium',
    examImportance: 80,
    color: '#F59E0B'
  }
];

export const WeightageAnalysis: React.FC<WeightageAnalysisProps> = ({ subjects }) => {
  const totalExamWeightage = mockWeightageData.reduce((sum, data) => sum + data.totalWeightage, 0);
  const totalCompletedWeightage = mockWeightageData.reduce((sum, data) => sum + data.completedWeightage, 0);
  const overallProgress = (totalCompletedWeightage / totalExamWeightage) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="h-5 w-5 text-primary" />
          Weightage Analysis & Exam Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Overall Exam Coverage</h3>
            <span className="text-lg font-bold text-primary">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
          <p className="text-xs text-muted-foreground">
            {totalCompletedWeightage}% of {totalExamWeightage}% total exam weightage covered
          </p>
        </div>

        {/* Subject-wise Breakdown */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Subject-wise Weightage Distribution
          </h3>
          
          {mockWeightageData.map((data) => {
            const completionPercentage = (data.completedWeightage / data.totalWeightage) * 100;
            
            return (
              <div key={data.subject} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }}></div>
                    <span className="font-medium">{data.subject}</span>
                    <Badge variant="outline" className={
                      data.priority === 'high' ? 'bg-red-50 text-red-700 border-red-200' :
                      data.priority === 'medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                      'bg-green-50 text-green-700 border-green-200'
                    }>
                      {data.priority} priority
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{data.totalWeightage}%</div>
                    <div className="text-xs text-muted-foreground">of exam</div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Progress value={completionPercentage} className="h-2" />
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">
                      {data.completedWeightage}% / {data.totalWeightage}% completed
                    </span>
                    <span className={
                      completionPercentage >= 80 ? 'text-green-600' :
                      completionPercentage >= 50 ? 'text-yellow-600' :
                      'text-red-600'
                    }>
                      {Math.round(completionPercentage)}% done
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>Exam importance: {data.examImportance}%</span>
                  </div>
                  <span>•</span>
                  <span>
                    {data.totalWeightage - data.completedWeightage}% remaining
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recommendations */}
        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Strategic Recommendations</h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Focus on Physics (35% weightage, only 23% completed)</li>
            <li>• Complete Chemistry organic topics (high exam frequency)</li>
            <li>• Mathematics is well-progressed, maintain momentum</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
