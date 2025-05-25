
import React from 'react';
import { UserProfileBase } from "@/types/user/base";
import { KpiData } from "@/hooks/useKpiTracking";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ExamReadinessSection from './ExamReadinessSection';
import DashboardSmartSuggestions from './DashboardSmartSuggestions';
import TodayStudyPlan from './TodayStudyPlan';
import UpcomingMilestonesSection from './dashboard-sections/UpcomingMilestonesSection';
import { CalendarDays, BookOpen, Brain, Target, TrendingUp, Clock } from 'lucide-react';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  const navigate = useNavigate();

  // Mock data for components
  const weeklyTrendsData = [
    { week: '1', score: 30 },
    { week: '2', score: 35 },
    { week: '3', score: 40 },
    { week: '4', score: 38 },
    { week: '5', score: 45 },
    { week: '6', score: 52 },
    { week: '7', score: 58 }
  ];
  
  const weakAreas = ['Organic Chemistry', 'Thermodynamics', 'Vectors'];
  const strongAreas = ['Algebra', 'Mechanics', 'Biology'];

  const performance = {
    accuracy: 75,
    quizScores: 80,
    conceptProgress: 65,
    streak: 12
  };

  const todayTasks = [
    {
      id: 'physics-concepts',
      title: 'Physics Concepts Review',
      time: '2:00 PM - 3:00 PM',
      type: 'concept' as const,
      completed: false,
      route: '/dashboard/student/concepts'
    },
    {
      id: 'chemistry-quiz',
      title: 'Chemistry Practice Quiz',
      time: '4:00 PM - 5:00 PM',
      type: 'exam' as const,
      completed: false,
      route: '/dashboard/student/practice-exam'
    },
    {
      id: 'math-flashcards',
      title: 'Mathematics Flashcards',
      time: '6:00 PM - 6:30 PM',
      type: 'revision' as const,
      completed: true,
      route: '/dashboard/student/flashcards'
    }
  ];

  const upcomingMilestones = [
    {
      id: '1',
      title: 'Weekly Target Completion',
      description: 'Complete 20 practice questions',
      date: 'Dec 20, 2024',
      type: 'weekly-target',
      completed: false
    },
    {
      id: '2',
      title: 'Monthly Practice Exam',
      description: 'Full-length mock test',
      date: 'Dec 25, 2024',
      type: 'practice-exam',
      completed: false
    }
  ];

  const quickStats = [
    {
      icon: <BookOpen className="h-5 w-5 text-blue-500" />,
      label: 'Concepts Studied',
      value: '48',
      change: '+5',
      changeType: 'positive'
    },
    {
      icon: <Target className="h-5 w-5 text-green-500" />,
      label: 'Practice Tests',
      value: '12',
      change: '+3',
      changeType: 'positive'
    },
    {
      icon: <TrendingUp className="h-5 w-5 text-purple-500" />,
      label: 'Study Streak',
      value: '12 days',
      change: '+2',
      changeType: 'positive'
    },
    {
      icon: <Clock className="h-5 w-5 text-orange-500" />,
      label: 'Study Hours',
      value: '25h',
      change: '+4h',
      changeType: 'positive'
    }
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {userProfile.name}! 🚀
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Ready to continue your journey towards exam success? Let's make today count!
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                {stat.icon}
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-lg font-semibold">{stat.value}</p>
                <span className={`text-xs ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Exam Readiness Section */}
      <ExamReadinessSection 
        score={65}
        previousScore={58}
        weeklyTrends={weeklyTrendsData}
        weakAreas={weakAreas}
        strongAreas={strongAreas}
      />

      {/* Daily Smart Suggestions - positioned below exam readiness */}
      <DashboardSmartSuggestions performance={performance} />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Study Plan */}
        <TodayStudyPlan tasks={todayTasks} />

        {/* Upcoming Milestones */}
        <UpcomingMilestonesSection milestones={upcomingMilestones} />
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          variant="outline"
          className="h-20 flex flex-col gap-2"
          onClick={() => navigate('/dashboard/student/concepts')}
        >
          <Brain className="h-6 w-6" />
          <span>Study Concepts</span>
        </Button>
        
        <Button
          variant="outline"
          className="h-20 flex flex-col gap-2"
          onClick={() => navigate('/dashboard/student/practice-exam')}
        >
          <Target className="h-6 w-6" />
          <span>Take Quiz</span>
        </Button>
        
        <Button
          variant="outline"
          className="h-20 flex flex-col gap-2"
          onClick={() => navigate('/dashboard/student/flashcards')}
        >
          <BookOpen className="h-6 w-6" />
          <span>Flashcards</span>
        </Button>
        
        <Button
          variant="outline"
          className="h-20 flex flex-col gap-2"
          onClick={() => navigate('/dashboard/student/today')}
        >
          <CalendarDays className="h-6 w-6" />
          <span>Today's Plan</span>
        </Button>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
