
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, AlertTriangle, CheckCircle, Target } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface WeightageAnalysisProps {
  subjects: StudyPlanSubject[];
}

const WeightageAnalysis: React.FC<WeightageAnalysisProps> = ({ subjects }) => {
  // Calculate overall weightage statistics
  const totalExamWeightage = subjects.reduce((sum, subject) => sum + (subject.totalWeightage || 0), 0);
  const completedWeightage = subjects.reduce((sum, subject) => sum + (subject.completedWeightage || 0), 0);
  const overallWeightageProgress = totalExamWeightage > 0 ? (completedWeightage / totalExamWeightage) * 100 : 0;

  // Identify critical areas (high weightage, low completion)
  const criticalAreas = subjects.filter(subject => {
    const subjectWeightage = subject.totalWeightage || 0;
    const subjectCompletion = subject.completedWeightage || 0;
    const completionRate = subjectWeightage > 0 ? (subjectCompletion / subjectWeightage) * 100 : 0;
    return subjectWeightage >= 20 && completionRate < 50; // High weightage, low completion
  });

  // Sort subjects by weightage importance
  const sortedByWeightage = [...subjects].sort((a, b) => (b.totalWeightage || 0) - (a.totalWeightage || 0));

  const getWeightageStatus = (subject: StudyPlanSubject) => {
    const weightage = subject.totalWeightage || 0;
    const completed = subject.completedWeightage || 0;
    const progress = weightage > 0 ? (completed / weightage) * 100 : 0;

    if (progress >= 80) return { status: 'excellent', color: 'bg-green-500', icon: CheckCircle };
    if (progress >= 60) return { status: 'good', color: 'bg-blue-500', icon: TrendingUp };
    if (progress >= 40) return { status: 'needs-attention', color: 'bg-amber-500', icon: Target };
    return { status: 'critical', color: 'bg-red-500', icon: AlertTriangle };
  };

  return (
    <div className="space-y-6">
      {/* Overall Weightage Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Exam Weightage Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Weightage Coverage</span>
              <span className="text-lg font-bold">{Math.round(overallWeightageProgress)}%</span>
            </div>
            <Progress value={overallWeightageProgress} className="h-3" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{Math.round(completedWeightage)}%</div>
                <div className="text-xs text-muted-foreground">Covered</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-600">{Math.round(totalExamWeightage - completedWeightage)}%</div>
                <div className="text-xs text-muted-foreground">Remaining</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{criticalAreas.length}</div>
                <div className="text-xs text-muted-foreground">Critical Areas</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Critical Areas Alert */}
      {criticalAreas.length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <AlertTriangle className="h-5 w-5" />
              Critical Areas Requiring Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {criticalAreas.map((subject) => {
                const progress = subject.totalWeightage > 0 ? 
                  ((subject.completedWeightage || 0) / subject.totalWeightage) * 100 : 0;
                return (
                  <div key={subject.id} className="flex items-center justify-between p-2 bg-white rounded border">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }}></div>
                      <span className="font-medium">{subject.name}</span>
                      <Badge variant="destructive" className="text-xs">
                        {subject.totalWeightage}% weightage
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-red-600">{Math.round(progress)}% covered</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Subject Weightage Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Subject Weightage Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedByWeightage.map((subject) => {
              const status = getWeightageStatus(subject);
              const StatusIcon = status.icon;
              const progress = subject.totalWeightage > 0 ? 
                ((subject.completedWeightage || 0) / subject.totalWeightage) * 100 : 0;

              return (
                <div key={subject.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }}></div>
                      <span className="font-medium">{subject.name}</span>
                      <Badge variant="outline">{subject.totalWeightage}% of exam</Badge>
                      <StatusIcon className={`h-4 w-4 text-white`} />
                    </div>
                    <span className="text-sm font-medium">{Math.round(progress)}% covered</span>
                  </div>
                  <div className="flex gap-2">
                    <Progress value={progress} className="flex-1 h-2" />
                    <div className="text-xs text-muted-foreground min-w-[60px] text-right">
                      {subject.completedWeightage || 0}/{subject.totalWeightage}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeightageAnalysis;
