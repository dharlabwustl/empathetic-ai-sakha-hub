
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PieChart, Target, TrendingUp } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

interface WeightageAnalysisProps {
  subjects: StudyPlanSubject[];
  examName: string;
}

const WeightageAnalysis: React.FC<WeightageAnalysisProps> = ({ subjects, examName }) => {
  // Calculate subject weightages (this would come from exam syllabus data)
  const getSubjectWeightage = (subjectName: string): number => {
    const weightageMap: Record<string, number> = {
      'Physics': 35,
      'Chemistry': 30,
      'Mathematics': 35,
      'Biology': 50, // for NEET
      'English': 15,
      'General Knowledge': 10
    };
    return weightageMap[subjectName] || 20;
  };

  const getTotalExamWeightage = () => {
    return subjects.reduce((total, subject) => total + getSubjectWeightage(subject.name), 0);
  };

  const getWeightageCoverage = (subject: StudyPlanSubject): number => {
    if (!subject.topics || subject.topics.length === 0) return 0;
    
    const completedTopics = subject.topics.filter(t => t.completed).length;
    return (completedTopics / subject.topics.length) * 100;
  };

  const getOverallWeightageCoverage = (): number => {
    const totalPossibleWeightage = getTotalExamWeightage();
    const coveredWeightage = subjects.reduce((total, subject) => {
      const subjectWeightage = getSubjectWeightage(subject.name);
      const coverage = getWeightageCoverage(subject);
      return total + (subjectWeightage * coverage / 100);
    }, 0);
    
    return totalPossibleWeightage > 0 ? (coveredWeightage / totalPossibleWeightage) * 100 : 0;
  };

  const getPerformanceInsight = (coverage: number): { status: string; color: string; message: string } => {
    if (coverage >= 80) {
      return {
        status: 'Excellent',
        color: 'bg-green-100 text-green-700 border-green-200',
        message: 'You\'re well-prepared for this subject area!'
      };
    } else if (coverage >= 60) {
      return {
        status: 'Good',
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        message: 'Solid progress, keep maintaining the momentum.'
      };
    } else if (coverage >= 40) {
      return {
        status: 'Needs Focus',
        color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        message: 'Increase study time for better coverage.'
      };
    } else {
      return {
        status: 'Critical',
        color: 'bg-red-100 text-red-700 border-red-200',
        message: 'Immediate attention required!'
      };
    }
  };

  const overallCoverage = getOverallWeightageCoverage();
  const overallInsight = getPerformanceInsight(overallCoverage);

  return (
    <div className="space-y-6">
      {/* Overall Weightage Coverage */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChart className="h-5 w-5 text-primary" />
            <span>Overall Exam Weightage Coverage</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                {Math.round(overallCoverage)}%
              </div>
              <Badge variant="outline" className={overallInsight.color}>
                {overallInsight.status}
              </Badge>
            </div>
            
            <Progress value={overallCoverage} className="h-3" />
            
            <p className="text-sm text-center text-muted-foreground">
              {overallInsight.message}
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-lg font-semibold">{getTotalExamWeightage()}%</div>
                <div className="text-xs text-muted-foreground">Total Syllabus</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-green-600">
                  {Math.round(overallCoverage * getTotalExamWeightage() / 100)}%
                </div>
                <div className="text-xs text-muted-foreground">Covered</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subject-wise Weightage Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-orange-500" />
            <span>Subject-wise Weightage Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subjects.map((subject) => {
              const subjectWeightage = getSubjectWeightage(subject.name);
              const coverage = getWeightageCoverage(subject);
              const insight = getPerformanceInsight(coverage);
              
              return (
                <div key={subject.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: subject.color || '#8B5CF6' }}
                      />
                      <span className="font-medium">{subject.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {subjectWeightage}% weightage
                      </Badge>
                    </div>
                    <Badge variant="outline" className={`${insight.color} text-xs`}>
                      {insight.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Coverage Progress</span>
                      <span className="font-medium">{Math.round(coverage)}%</span>
                    </div>
                    <Progress value={coverage} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center p-2 bg-muted/30 rounded">
                      <div className="font-medium">{subject.topics?.length || 0}</div>
                      <div className="text-muted-foreground">Topics</div>
                    </div>
                    <div className="text-center p-2 bg-muted/30 rounded">
                      <div className="font-medium">{subject.topics?.filter(t => t.completed).length || 0}</div>
                      <div className="text-muted-foreground">Completed</div>
                    </div>
                    <div className="text-center p-2 bg-muted/30 rounded">
                      <div className="font-medium">{Math.round(subjectWeightage * coverage / 100)}%</div>
                      <div className="text-muted-foreground">Weightage Done</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Weightage Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            <span>{examName} Weightage Distribution</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {subjects.map((subject) => {
              const weightage = getSubjectWeightage(subject.name);
              const totalWeightage = getTotalExamWeightage();
              const percentage = (weightage / totalWeightage) * 100;
              
              return (
                <div key={subject.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 flex-1">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: subject.color || '#8B5CF6' }}
                    />
                    <span className="text-sm font-medium">{subject.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20">
                      <Progress value={percentage} className="h-1.5" />
                    </div>
                    <span className="text-sm font-medium w-12 text-right">{weightage}%</span>
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
