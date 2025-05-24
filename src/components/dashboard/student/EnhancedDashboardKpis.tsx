
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Clock, 
  Brain, 
  Target, 
  BookOpen,
  FileText,
  Award,
  Heart,
  ExternalLink
} from 'lucide-react';
import { enhancedKpiService } from '@/services/enhancedKpiService';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface StudentKpiData {
  id: string;
  title: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  description: string;
  target?: number;
  pageLink?: string;
  color: string;
}

const EnhancedDashboardKpis: React.FC = () => {
  const navigate = useNavigate();
  const [studentKpis, setStudentKpis] = useState<StudentKpiData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentKpis = async () => {
      try {
        // Get student-specific KPIs
        const kpis: StudentKpiData[] = [
          {
            id: 'study-streak',
            title: 'Study Streak',
            value: 12,
            unit: 'days',
            icon: <Target className="h-5 w-5" />,
            change: 20,
            changeType: 'increase',
            description: 'Consecutive days of study',
            target: 30,
            pageLink: '/dashboard/student',
            color: 'text-blue-600'
          },
          {
            id: 'concepts-mastered',
            title: 'Concepts Mastered',
            value: 156,
            unit: 'concepts',
            icon: <Brain className="h-5 w-5" />,
            change: 15.3,
            changeType: 'increase',
            description: 'Total concepts you\'ve mastered',
            target: 200,
            pageLink: '/dashboard/student/concepts',
            color: 'text-purple-600'
          },
          {
            id: 'study-time-today',
            title: 'Study Time Today',
            value: '4.5',
            unit: 'hours',
            icon: <Clock className="h-5 w-5" />,
            change: 12.5,
            changeType: 'increase',
            description: 'Time spent studying today',
            target: 6,
            pageLink: '/dashboard/student/today',
            color: 'text-green-600'
          },
          {
            id: 'exam-readiness',
            title: 'Exam Readiness',
            value: 78,
            unit: '%',
            icon: <Award className="h-5 w-5" />,
            change: 8.7,
            changeType: 'increase',
            description: 'Your overall exam readiness',
            target: 90,
            pageLink: '/dashboard/student/practice-exam',
            color: 'text-orange-600'
          },
          {
            id: 'flashcards-reviewed',
            title: 'Flashcards Today',
            value: 24,
            unit: 'cards',
            icon: <FileText className="h-5 w-5" />,
            change: 33.3,
            changeType: 'increase',
            description: 'Flashcards reviewed today',
            target: 50,
            pageLink: '/dashboard/student/flashcards',
            color: 'text-indigo-600'
          },
          {
            id: 'mood-score',
            title: 'Mood Score',
            value: 4.2,
            unit: '/5',
            icon: <Heart className="h-5 w-5" />,
            change: 5.0,
            changeType: 'increase',
            description: 'Your current mood rating',
            target: 5,
            pageLink: '/dashboard/student/feel-good-corner',
            color: 'text-pink-600'
          }
        ];
        
        setStudentKpis(kpis);
      } catch (error) {
        console.error('Error fetching student KPIs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentKpis();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Your Study Metrics</h2>
          <p className="text-sm text-muted-foreground">Track your progress and achievements</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
          <TrendingUp className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {studentKpis.map((kpi) => {
          const progressValue = kpi.target 
            ? Math.min(100, (Number(kpi.value.toString().replace(/[^0-9.]/g, '')) / kpi.target) * 100)
            : 0;

          return (
            <Card 
              key={kpi.id}
              className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-l-4"
              style={{ borderLeftColor: kpi.color.replace('text-', '#') }}
              onClick={() => kpi.pageLink && navigate(kpi.pageLink)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {kpi.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <div className={cn("p-1.5 rounded-full bg-gray-100 dark:bg-gray-800", kpi.color)}>
                      {kpi.icon}
                    </div>
                    {kpi.pageLink && <ExternalLink className="h-3 w-3 text-muted-foreground" />}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-baseline mb-2">
                  <span className="text-2xl font-bold">{kpi.value}</span>
                  {kpi.unit && <span className="ml-1 text-sm text-muted-foreground">{kpi.unit}</span>}
                </div>

                <div className="flex items-center text-xs font-medium mb-3">
                  <TrendingUp className={cn(
                    "h-3 w-3 mr-1",
                    kpi.changeType === 'increase' ? "text-green-600" : "text-red-600"
                  )} />
                  <span className={cn(
                    kpi.changeType === 'increase' ? "text-green-600" : "text-red-600"
                  )}>
                    +{kpi.change}%
                  </span>
                  <span className="ml-1 text-muted-foreground">vs last week</span>
                </div>

                {kpi.target && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Goal Progress</span>
                      <span>{Math.round(progressValue)}%</span>
                    </div>
                    <Progress value={progressValue} className="h-2" />
                  </div>
                )}

                <p className="text-xs text-muted-foreground mt-2">{kpi.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default EnhancedDashboardKpis;
