
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  RefreshCw,
  BookOpen,
  Brain,
  Target,
  Clock,
  Zap,
  Star
} from 'lucide-react';
import { UserProfileBase } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';

interface StudentKPIProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

interface StudentMetric {
  id: string;
  title: string;
  value: string | number;
  unit?: string;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  description: string;
  targetRoute?: string;
  progress?: number;
}

const StudentKPIDashboard: React.FC<StudentKPIProps> = ({ userProfile, kpis }) => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<StudentMetric[]>([]);

  useEffect(() => {
    // Generate student-specific metrics
    const studentMetrics: StudentMetric[] = [
      {
        id: 'study-streak',
        title: 'Study Streak',
        value: userProfile.studyStreak || 12,
        unit: 'days',
        change: 2,
        changeType: 'positive',
        icon: <Zap className="h-5 w-5 text-orange-500" />,
        description: 'Consecutive days of study',
        progress: 80
      },
      {
        id: 'concepts-mastered',
        title: 'Concepts Mastered',
        value: 68,
        unit: '/100',
        change: 5,
        changeType: 'positive',
        icon: <Brain className="h-5 w-5 text-purple-500" />,
        description: 'Topics you\'ve completed',
        targetRoute: '/dashboard/student/concepts',
        progress: 68
      },
      {
        id: 'exam-readiness',
        title: 'Exam Readiness',
        value: 78,
        unit: '%',
        change: 8,
        changeType: 'positive',
        icon: <Target className="h-5 w-5 text-green-500" />,
        description: 'Overall preparation level',
        progress: 78
      },
      {
        id: 'study-time-today',
        title: 'Study Time Today',
        value: 3.5,
        unit: 'hours',
        change: 15,
        changeType: 'positive',
        icon: <Clock className="h-5 w-5 text-blue-500" />,
        description: 'Time spent studying today',
        progress: 70
      },
      {
        id: 'practice-tests',
        title: 'Practice Tests',
        value: 8,
        unit: 'completed',
        change: 3,
        changeType: 'positive',
        icon: <BookOpen className="h-5 w-5 text-indigo-500" />,
        description: 'Tests completed this week',
        targetRoute: '/dashboard/student/practice-exam'
      },
      {
        id: 'performance-score',
        title: 'Performance Score',
        value: 85,
        unit: '/100',
        change: 6,
        changeType: 'positive',
        icon: <Star className="h-5 w-5 text-yellow-500" />,
        description: 'Overall academic performance',
        progress: 85
      }
    ];

    setMetrics(studentMetrics);
  }, [userProfile]);

  const handleMetricClick = (metric: StudentMetric) => {
    if (metric.targetRoute) {
      navigate(metric.targetRoute);
    }
  };

  const renderMetricCard = (metric: StudentMetric) => (
    <Card 
      key={metric.id}
      className={`hover:shadow-lg transition-all ${metric.targetRoute ? 'cursor-pointer hover:bg-gray-50' : ''}`}
      onClick={() => handleMetricClick(metric)}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
        {metric.icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">
          {metric.value}{metric.unit && <span className="text-sm ml-1">{metric.unit}</span>}
        </div>
        
        {metric.progress && (
          <div className="mb-2">
            <Progress value={metric.progress} className="h-2" />
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{metric.description}</p>
          <div className={`flex items-center gap-1 text-xs ${
            metric.changeType === 'positive' ? 'text-green-600' : 
            metric.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
          }`}>
            {metric.changeType === 'positive' ? (
              <TrendingUp className="h-3 w-3" />
            ) : metric.changeType === 'negative' ? (
              <TrendingDown className="h-3 w-3" />
            ) : null}
            {metric.change > 0 ? '+' : ''}{metric.change}%
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Your Progress Overview</h3>
          <p className="text-sm text-muted-foreground">Track your academic journey</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map(renderMetricCard)}
      </div>
    </div>
  );
};

export default StudentKPIDashboard;
