
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, AlertCircle } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface WeightageAnalysisProps {
  subjects: StudyPlanSubject[];
  examName: string;
}

const WeightageAnalysis: React.FC<WeightageAnalysisProps> = ({ subjects, examName }) => {
  // Mock weightage data - in real app this would come from exam configuration
  const subjectWeightage = {
    Physics: { marks: 180, percentage: 36, critical: true },
    Chemistry: { marks: 180, percentage: 36, critical: true },
    Mathematics: { marks: 140, percentage: 28, critical: false },
    Biology: { marks: 180, percentage: 36, critical: true }
  };

  const totalMarks = Object.values(subjectWeightage).reduce((sum, sub) => sum + sub.marks, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Exam Weightage Analysis
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {examName} - Total: {totalMarks} marks
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {subjects.map((subject) => {
          const weightage = subjectWeightage[subject.name as keyof typeof subjectWeightage];
          if (!weightage) return null;

          const topicsCompleted = subject.topics?.filter(t => t.completed).length || 0;
          const totalTopics = subject.topics?.length || 0;
          const coveragePercentage = totalTopics > 0 ? (topicsCompleted / totalTopics) * 100 : 0;
          const weightageProgress = (coveragePercentage / 100) * weightage.percentage;

          return (
            <div key={subject.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: subject.color }}
                  />
                  <span className="font-medium">{subject.name}</span>
                  {weightage.critical && (
                    <Badge variant="destructive" className="text-xs">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Critical
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {weightage.marks} marks ({weightage.percentage}%)
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Topic Coverage</span>
                  <span>{Math.round(coveragePercentage)}%</span>
                </div>
                <Progress value={coveragePercentage} className="h-2" />
                
                <div className="flex justify-between text-xs">
                  <span>Weightage Progress</span>
                  <span>{Math.round(weightageProgress)}% of {weightage.percentage}%</span>
                </div>
                <Progress value={weightageProgress / weightage.percentage * 100} className="h-2" />
              </div>
            </div>
          );
        })}
        
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Overall Exam Coverage
            </span>
            <span className="font-bold text-lg">
              {Math.round(
                subjects.reduce((acc, subject) => {
                  const weightage = subjectWeightage[subject.name as keyof typeof subjectWeightage];
                  if (!weightage) return acc;
                  const coverage = ((subject.topics?.filter(t => t.completed).length || 0) / (subject.topics?.length || 1)) * 100;
                  return acc + (coverage * weightage.percentage / 100);
                }, 0)
              )}%
            </span>
          </div>
          <Progress 
            value={subjects.reduce((acc, subject) => {
              const weightage = subjectWeightage[subject.name as keyof typeof subjectWeightage];
              if (!weightage) return acc;
              const coverage = ((subject.topics?.filter(t => t.completed).length || 0) / (subject.topics?.length || 1)) * 100;
              return acc + (coverage * weightage.percentage / 100);
            }, 0)} 
            className="h-3 mt-2" 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default WeightageAnalysis;
