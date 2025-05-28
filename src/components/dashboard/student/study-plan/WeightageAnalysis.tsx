
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface WeightageAnalysisProps {
  subjects: StudyPlanSubject[];
}

export const WeightageAnalysis: React.FC<WeightageAnalysisProps> = ({ subjects }) => {
  // Calculate overall weightage statistics
  const totalExamWeightage = subjects.reduce((sum, subject) => sum + (subject.weightage || 0), 0);
  const completedWeightage = subjects.reduce((sum, subject) => {
    const subjectCompletedWeightage = subject.topics?.filter(topic => topic.completed)
      .reduce((topicSum, topic) => topicSum + (topic.weightage || 0), 0) || 0;
    return sum + subjectCompletedWeightage;
  }, 0);
  
  const weightageProgress = totalExamWeightage > 0 ? (completedWeightage / totalExamWeightage) * 100 : 0;
  
  // Identify critical areas (high weightage, low completion)
  const criticalAreas = subjects.filter(subject => {
    const subjectWeightage = subject.weightage || 0;
    const subjectProgress = subject.topics?.filter(topic => topic.completed).length || 0;
    const totalTopics = subject.topics?.length || 1;
    const completionRate = (subjectProgress / totalTopics) * 100;
    
    return subjectWeightage >= 20 && completionRate < 50; // High weightage, low completion
  });

  // Identify well-covered areas
  const wellCoveredAreas = subjects.filter(subject => {
    const subjectProgress = subject.topics?.filter(topic => topic.completed).length || 0;
    const totalTopics = subject.topics?.length || 1;
    const completionRate = (subjectProgress / totalTopics) * 100;
    
    return completionRate >= 80;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-primary" />
          Exam Weightage Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">Overall Weightage Coverage</span>
            <span className="text-lg font-bold text-primary">{Math.round(weightageProgress)}%</span>
          </div>
          <Progress value={weightageProgress} className="h-3" />
          <p className="text-sm text-muted-foreground">
            You've covered {Math.round(completedWeightage)}% out of {Math.round(totalExamWeightage)}% total exam weightage
          </p>
        </div>

        {/* Subject Weightage Breakdown */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Subject-wise Distribution</h4>
          {subjects.map(subject => {
            const subjectCompletedWeightage = subject.topics?.filter(topic => topic.completed)
              .reduce((sum, topic) => sum + (topic.weightage || 0), 0) || 0;
            const subjectTotalWeightage = subject.topics?.reduce((sum, topic) => sum + (topic.weightage || 0), 0) || 0;
            const subjectProgress = subjectTotalWeightage > 0 ? (subjectCompletedWeightage / subjectTotalWeightage) * 100 : 0;
            
            return (
              <div key={subject.id} className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: subject.color || '#8B5CF6' }}></div>
                    <span className="text-sm font-medium">{subject.name}</span>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {subject.weightage || 0}% of exam
                    </Badge>
                  </div>
                  <span className="text-sm">{Math.round(subjectProgress)}%</span>
                </div>
                <Progress value={subjectProgress} className="h-1" />
              </div>
            );
          })}
        </div>

        {/* Critical Areas Alert */}
        {criticalAreas.length > 0 && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
              <span className="font-medium text-red-800">Critical Areas Need Attention</span>
            </div>
            <div className="space-y-1">
              {criticalAreas.map(subject => (
                <div key={subject.id} className="text-sm text-red-700">
                  • {subject.name} ({subject.weightage}% weightage, low completion)
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Well Covered Areas */}
        {wellCoveredAreas.length > 0 && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center mb-2">
              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
              <span className="font-medium text-green-800">Well Covered Areas</span>
            </div>
            <div className="space-y-1">
              {wellCoveredAreas.map(subject => (
                <div key={subject.id} className="text-sm text-green-700">
                  • {subject.name} (80%+ topics completed)
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
