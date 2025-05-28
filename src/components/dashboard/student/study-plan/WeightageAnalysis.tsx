
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PieChart, BarChart3, TrendingUp, Target } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface WeightageAnalysisProps {
  subjects: StudyPlanSubject[];
}

const WeightageAnalysis: React.FC<WeightageAnalysisProps> = ({ subjects }) => {
  const examWeightages = {
    'Physics': 35,
    'Chemistry': 30,
    'Mathematics': 35,
    'Biology': 25
  };

  const getSubjectWeightageData = () => {
    return subjects.map(subject => {
      const examWeight = examWeightages[subject.name as keyof typeof examWeightages] || 25;
      const topicsCompleted = subject.topics?.filter(t => t.completed).length || 0;
      const totalTopics = subject.topics?.length || 1;
      const completionRate = (topicsCompleted / totalTopics) * 100;
      const weightageProgress = (completionRate / 100) * examWeight;
      
      return {
        ...subject,
        examWeight,
        completionRate,
        weightageProgress,
        remainingWeight: examWeight - weightageProgress
      };
    });
  };

  const weightageData = getSubjectWeightageData();
  const totalCoveredWeight = weightageData.reduce((sum, subject) => sum + subject.weightageProgress, 0);
  const totalExamWeight = weightageData.reduce((sum, subject) => sum + subject.examWeight, 0);
  const overallWeightageProgress = (totalCoveredWeight / totalExamWeight) * 100;

  return (
    <div className="space-y-6">
      {/* Overall Weightage Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Overall Exam Weightage Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Total Coverage</span>
              <span className="text-2xl font-bold text-primary">{Math.round(overallWeightageProgress)}%</span>
            </div>
            <Progress value={overallWeightageProgress} className="h-3" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Covered Weight:</span>
                <span className="font-medium">{Math.round(totalCoveredWeight)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Remaining Weight:</span>
                <span className="font-medium">{Math.round(totalExamWeight - totalCoveredWeight)}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subject-wise Weightage Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Subject Weightage Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weightageData.map((subject) => (
              <div key={subject.id} className="space-y-3 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: subject.color }}></div>
                    <span className="font-medium text-lg">{subject.name}</span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {subject.examWeight}% exam weight
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Progress</div>
                    <div className="font-bold">{Math.round(subject.completionRate)}%</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Weightage Coverage</span>
                    <span>{Math.round(subject.weightageProgress)} / {subject.examWeight}%</span>
                  </div>
                  <Progress 
                    value={(subject.weightageProgress / subject.examWeight) * 100} 
                    className="h-2"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="font-medium text-green-700">{Math.round(subject.weightageProgress)}%</div>
                    <div className="text-green-600">Covered</div>
                  </div>
                  <div className="text-center p-2 bg-amber-50 rounded">
                    <div className="font-medium text-amber-700">{Math.round(subject.remainingWeight)}%</div>
                    <div className="text-amber-600">Remaining</div>
                  </div>
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <div className="font-medium text-blue-700">{subject.priority}</div>
                    <div className="text-blue-600">Priority</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weightage Distribution Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5 text-primary" />
            Exam Weightage Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {weightageData.map((subject, index) => {
                const rotationStart = weightageData.slice(0, index).reduce((sum, s) => sum + s.examWeight, 0) * 3.6;
                const rotationSize = subject.examWeight * 3.6;
                
                return (
                  <div key={subject.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div 
                      className="w-6 h-6 rounded-full border-2"
                      style={{ 
                        backgroundColor: subject.color,
                        borderColor: subject.color
                      }}
                    ></div>
                    <div className="flex-1">
                      <div className="font-medium">{subject.name}</div>
                      <div className="text-sm text-gray-600">{subject.examWeight}% of exam</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{Math.round(subject.completionRate)}%</div>
                      <div className="text-xs text-gray-500">complete</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeightageAnalysis;
