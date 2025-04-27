
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { UserProfileType } from '@/types/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SubjectProgress {
  name: string;
  conceptCompletion: number;
  flashcardAccuracy: number;
  examScore: number;
  overallReadiness: number;
  trend: 'up' | 'down' | 'stable';
}

interface ExamReadinessMeterProps {
  userProfile: UserProfileType;
}

const ExamReadinessMeter: React.FC<ExamReadinessMeterProps> = ({ userProfile }) => {
  // In a real app, this data would come from the API
  const subjects: SubjectProgress[] = [
    {
      name: "Physics",
      conceptCompletion: 78,
      flashcardAccuracy: 85,
      examScore: 72,
      overallReadiness: 78,
      trend: 'up'
    },
    {
      name: "Chemistry",
      conceptCompletion: 65,
      flashcardAccuracy: 70,
      examScore: 68,
      overallReadiness: 68,
      trend: 'up'
    },
    {
      name: "Mathematics",
      conceptCompletion: 50,
      flashcardAccuracy: 65,
      examScore: 58,
      overallReadiness: 58,
      trend: 'down'
    }
  ];

  // Calculate overall readiness
  const overallReadiness = Math.round(
    subjects.reduce((sum, subject) => sum + subject.overallReadiness, 0) / subjects.length
  );

  // Determine readiness status and color
  const getReadinessStatus = (readiness: number) => {
    if (readiness >= 80) return { status: "Excellent", color: "bg-green-500" };
    if (readiness >= 65) return { status: "Good", color: "bg-emerald-500" };
    if (readiness >= 50) return { status: "Average", color: "bg-amber-500" };
    return { status: "Needs Work", color: "bg-red-500" };
  };

  const readinessStatus = getReadinessStatus(overallReadiness);

  // Trend indicator for overall readiness
  const overallTrend = subjects.filter(s => s.trend === 'up').length > 
                        subjects.filter(s => s.trend === 'down').length ? 'up' : 'down';

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center justify-between">
          <span>Exam Readiness Meter</span>
          <span className={`text-sm px-3 py-1 rounded-full ${
            readinessStatus.color.replace('bg-', 'bg-opacity-20 text-')
          }`}>
            {readinessStatus.status}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <div className="mr-4 relative">
            <Avatar className="w-16 h-16 border-4 border-white shadow-md">
              <AvatarImage src={userProfile.avatar || ""} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {userProfile.name ? userProfile.name.substring(0, 2).toUpperCase() : "ST"}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
              <Trophy className="h-5 w-5 text-amber-500" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-lg">Overall Readiness</span>
              <div className="flex items-center">
                <span className="font-bold mr-2">{overallReadiness}%</span>
                {overallTrend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </div>
            </div>
            <Progress 
              value={overallReadiness} 
              className="h-2.5" 
              indicatorClassName={readinessStatus.color}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Needs improvement</span>
              <span>Ready</span>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4 mt-2">
          <h4 className="text-sm font-medium mb-3">Subject Breakdown</h4>
          <div className="space-y-3">
            {subjects.map((subject, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{subject.name}</span>
                  <div className="flex items-center">
                    <span className="text-sm mr-1">{subject.overallReadiness}%</span>
                    {subject.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : subject.trend === 'down' ? (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    ) : (
                      <AlertCircle className="h-3 w-3 text-amber-500" />
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1/3">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500" 
                        style={{ width: `${subject.conceptCompletion}%` }}
                      ></div>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Concepts</p>
                  </div>
                  <div className="w-1/3">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500" 
                        style={{ width: `${subject.flashcardAccuracy}%` }}
                      ></div>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Flashcards</p>
                  </div>
                  <div className="w-1/3">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500" 
                        style={{ width: `${subject.examScore}%` }}
                      ></div>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Exams</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamReadinessMeter;
