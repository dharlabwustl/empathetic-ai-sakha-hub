
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PieChart, BarChart3, TrendingUp, Target } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface WeightageAnalysisProps {
  subjects: StudyPlanSubject[];
  examName: string;
}

const WeightageAnalysis: React.FC<WeightageAnalysisProps> = ({ subjects, examName }) => {
  // Calculate overall weightage metrics
  const totalExamWeightage = subjects.reduce((sum, subject) => sum + (subject.totalWeightage || 0), 0);
  const completedWeightage = subjects.reduce((sum, subject) => sum + (subject.completedWeightage || 0), 0);
  const weightageProgress = totalExamWeightage > 0 ? (completedWeightage / totalExamWeightage) * 100 : 0;

  // Get subject weightage distribution
  const subjectWeightages = subjects.map(subject => ({
    name: subject.name,
    color: subject.color,
    totalWeightage: subject.totalWeightage || 0,
    completedWeightage: subject.completedWeightage || 0,
    progress: subject.totalWeightage ? ((subject.completedWeightage || 0) / subject.totalWeightage) * 100 : 0
  }));

  // Sort by weightage importance
  const sortedByWeightage = [...subjectWeightages].sort((a, b) => b.totalWeightage - a.totalWeightage);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="h-5 w-5 text-blue-600" />
          Weightage Analysis - {examName}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-medium">Overall Exam Coverage</span>
            <span className="font-bold text-blue-600">{weightageProgress.toFixed(1)}%</span>
          </div>
          <Progress value={weightageProgress} className="h-3" />
          <div className="text-sm text-gray-600">
            {completedWeightage.toFixed(1)}% out of {totalExamWeightage}% total syllabus covered
          </div>
        </div>

        {/* Subject-wise Weightage Distribution */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="h-4 w-4 text-purple-600" />
            <span className="font-medium">Subject Weightage Breakdown</span>
          </div>
          
          {sortedByWeightage.map((subject) => (
            <div key={subject.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }}></div>
                  <span className="font-medium">{subject.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {subject.totalWeightage}% weightage
                  </Badge>
                </div>
                <span className="text-sm font-medium">
                  {subject.completedWeightage.toFixed(1)}%/{subject.totalWeightage}%
                </span>
              </div>
              
              <div className="relative">
                <Progress value={subject.progress} className="h-2" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-700">
                    {subject.progress.toFixed(0)}%
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>
                  {subject.progress >= 80 ? '🎯 On Track' : 
                   subject.progress >= 50 ? '⚠️ Needs Focus' : '🚨 Critical'}
                </span>
                <span>
                  {(subject.totalWeightage - subject.completedWeightage).toFixed(1)}% remaining
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Critical Areas */}
        <div className="space-y-3 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-red-600" />
            <span className="font-medium">Critical Areas</span>
          </div>
          
          {sortedByWeightage
            .filter(subject => subject.progress < 50 && subject.totalWeightage > 15)
            .slice(0, 3)
            .map(subject => (
              <div key={subject.name} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-red-800">{subject.name}</span>
                  <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                    High Impact
                  </Badge>
                </div>
                <div className="text-sm text-red-600 mt-1">
                  Only {subject.progress.toFixed(0)}% covered • {subject.totalWeightage}% exam weightage
                </div>
              </div>
            ))}
        </div>

        {/* Performance Insights */}
        <div className="space-y-2 pt-4 border-t">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="font-medium">Performance Insights</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-2 bg-blue-50 rounded">
              <div className="font-medium text-blue-800">Strong Areas</div>
              <div className="text-blue-600">
                {sortedByWeightage.filter(s => s.progress >= 80).length} subjects
              </div>
            </div>
            <div className="p-2 bg-yellow-50 rounded">
              <div className="font-medium text-yellow-800">Needs Work</div>
              <div className="text-yellow-600">
                {sortedByWeightage.filter(s => s.progress < 50).length} subjects
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeightageAnalysis;
