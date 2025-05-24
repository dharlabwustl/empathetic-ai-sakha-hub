
import React from 'react';
import { UserProfileBase } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import ExamReadinessSection from './ExamReadinessSection';
import SmartSuggestionsCenter from './dashboard-sections/SmartSuggestionsCenter';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import DailyChallenges from '@/components/shared/DailyChallenges';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Target, BookOpen, Brain, Award, TrendingUp, Clock, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({ 
  userProfile, 
  kpis 
}) => {
  const navigate = useNavigate();

  // Example weekly trends data for exam readiness
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

  // Performance data for smart suggestions
  const performanceData = {
    accuracy: 75,
    quizScores: 82,
    conceptProgress: 68,
    streak: 4
  };

  return (
    <div className="space-y-6 p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {userProfile.name}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Ready to continue your learning journey? Let's make today productive!
        </p>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Exam Readiness Section */}
          <ExamReadinessSection 
            score={65}
            previousScore={58}
            weeklyTrends={weeklyTrendsData}
            weakAreas={weakAreas}
            strongAreas={strongAreas}
          />

          {/* Smart Suggestions Section - Moved here from tips */}
          <SmartSuggestionsCenter performance={performanceData} />

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {kpis.filter(kpi => 
              !['Weekly Study Time', 'Practice Questions', 'Target Exams Covered', 'Users Log Weekly Moods'].includes(kpi.title)
            ).slice(0, 4).map(kpi => (
              <Card key={kpi.id} className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl">{kpi.icon}</div>
                    {kpi.change && (
                      <Badge variant={kpi.changeType === 'positive' ? 'default' : 'secondary'} className="text-xs">
                        {kpi.changeType === 'positive' ? '+' : ''}{kpi.change}%
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-medium text-sm text-gray-600 dark:text-gray-300">{kpi.title}</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {kpi.value} {kpi.unit}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Today's Plan Section */}
          <TodaysPlanSection />

          {/* Daily Challenges */}
          <DailyChallenges variant="compact" maxItems={2} />
        </div>

        {/* Right Column - Progress Meter and Actions */}
        <div className="space-y-6">
          {/* Progress Meter */}
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Weekly Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Study Goals</span>
                  <span>78%</span>
                </div>
                <Progress value={78} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Practice Tests</span>
                  <span>65%</span>
                </div>
                <Progress value={65} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Concept Mastery</span>
                  <span>82%</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>
              
              <div className="pt-3 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">Weekly Streak</span>
                  </div>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    5 days
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Switch Exam and New Plan Buttons - Moved here */}
          <div className="space-y-3">
            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() => navigate('/dashboard/student/practice-exam')}
            >
              <Target className="h-4 w-4 mr-2" />
              Switch Exam Focus
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full border-purple-200 hover:bg-purple-50"
              onClick={() => navigate('/dashboard/student/today')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Generate New Plan
            </Button>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/dashboard/student/concepts')}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Study Concepts
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/dashboard/student/flashcards')}
              >
                <Brain className="h-4 w-4 mr-2" />
                Review Flashcards
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('/dashboard/student/practice-exam')}
              >
                <Target className="h-4 w-4 mr-2" />
                Take Practice Test
              </Button>
            </CardContent>
          </Card>

          {/* Study Stats */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Today's Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Study Time</span>
                <span className="font-medium">2h 15m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Concepts Learned</span>
                <span className="font-medium">4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Quiz Score</span>
                <span className="font-medium">85%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Global Rank</span>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-green-600" />
                  <span className="font-medium">#142</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
