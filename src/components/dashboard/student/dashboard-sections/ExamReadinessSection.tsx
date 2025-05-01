
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FileText, Calendar, Trophy, TrendingUp, AlertTriangle } from 'lucide-react';

interface SubjectReadiness {
  subject: string;
  readiness: number;
  trend: 'up' | 'down' | 'stable';
  areasToImprove: string[];
}

interface ExamReadinessSectionProps {
  examGoal: string;
  daysLeft: number;
  overallReadiness: number;
  subjectReadiness: SubjectReadiness[];
}

export default function ExamReadinessSection({
  examGoal,
  daysLeft,
  overallReadiness,
  subjectReadiness
}: ExamReadinessSectionProps) {
  // Get readiness level text
  const getReadinessLevelText = (readiness: number): string => {
    if (readiness >= 80) return "Excellent";
    if (readiness >= 65) return "Good";
    if (readiness >= 50) return "Fair";
    if (readiness >= 30) return "Needs Improvement";
    return "Critical";
  };
  
  // Get readiness level color
  const getReadinessColor = (readiness: number): string => {
    if (readiness >= 80) return "bg-emerald-500";
    if (readiness >= 65) return "bg-green-500";
    if (readiness >= 50) return "bg-yellow-500";
    if (readiness >= 30) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <Card className="border-t-4 border-t-purple-500">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5 text-purple-500" />
          {examGoal} Exam Readiness
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="text-sm text-muted-foreground">Days left: <span className="font-medium text-foreground">{daysLeft}</span></span>
            </div>
            
            <div className="flex items-center">
              <Trophy className="h-4 w-4 text-amber-500 mr-2" />
              <span className="text-sm">Overall Readiness: <span className="font-medium">{getReadinessLevelText(overallReadiness)}</span></span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>{getReadinessLevelText(overallReadiness)}</span>
              <span>{overallReadiness}%</span>
            </div>
            <Progress value={overallReadiness} className={`h-2.5 ${getReadinessColor(overallReadiness)}`} />
          </div>
          
          <div className="space-y-3 mt-4">
            <h4 className="text-sm font-medium">Subject-wise Readiness</h4>
            
            {subjectReadiness.map((subject) => (
              <div key={subject.subject} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{subject.subject}</span>
                  <div className="flex items-center">
                    {subject.trend === 'up' && <TrendingUp className="h-3.5 w-3.5 text-emerald-500 mr-1" />}
                    {subject.trend === 'down' && <AlertTriangle className="h-3.5 w-3.5 text-red-500 mr-1" />}
                    <span className="text-xs font-medium">{subject.readiness}%</span>
                  </div>
                </div>
                
                <Progress value={subject.readiness} className={`h-2 ${getReadinessColor(subject.readiness)}`} />
                
                {subject.readiness < 65 && (
                  <div className="mt-1 text-xs text-muted-foreground">
                    <span className="font-medium">Focus areas:</span> {subject.areasToImprove.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
