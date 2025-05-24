
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, BookOpen, Target, TrendingUp } from 'lucide-react';
import { UserProfileType } from "@/types/user/base";
import { KpiData } from "@/hooks/useKpiTracking";
import ExamReadinessScore from './ExamReadinessScore';
import SubjectBreakdownSection from './SubjectBreakdownSection';
import StudyProgress from './StudyProgress';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis
}) => {
  // Mock data for exam readiness
  const examReadinessData = {
    score: 78,
    previousScore: 72,
    weeklyTrends: [
      { week: 'Week 1', score: 65 },
      { week: 'Week 2', score: 68 },
      { week: 'Week 3', score: 72 },
      { week: 'Week 4', score: 78 }
    ],
    weakAreas: ['Thermodynamics', 'Organic Chemistry', 'Calculus'],
    strongAreas: ['Mechanics', 'Algebra', 'Atomic Structure']
  };

  // Mock subjects data
  const subjectsData = [
    {
      id: 'physics',
      subject: 'Physics',
      totalConcepts: 50,
      completedConcepts: 35,
      progress: 70,
      timeSpent: 48,
      lastActivity: '2 hours ago',
      streak: 5,
      averageScore: 85,
      conceptsThisWeek: 8,
      improvementRate: 12
    },
    {
      id: 'chemistry',
      subject: 'Chemistry',
      totalConcepts: 45,
      completedConcepts: 20,
      progress: 44,
      timeSpent: 32,
      lastActivity: '1 day ago',
      streak: 3,
      averageScore: 78,
      conceptsThisWeek: 5,
      improvementRate: 8
    },
    {
      id: 'mathematics',
      subject: 'Mathematics',
      totalConcepts: 60,
      completedConcepts: 42,
      progress: 70,
      timeSpent: 56,
      lastActivity: '3 hours ago',
      streak: 7,
      averageScore: 92,
      conceptsThisWeek: 10,
      improvementRate: 15
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">
            Welcome back, {userProfile.name}! 👋
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-100 mb-4">
            Ready to continue your journey towards {userProfile.examPreparation || 'exam success'}?
          </p>
          <div className="flex gap-4">
            <Button variant="secondary" size="sm">
              <CalendarDays className="mr-2 h-4 w-4" />
              Today's Plan
            </Button>
            <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/10">
              <BookOpen className="mr-2 h-4 w-4" />
              Continue Learning
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {kpi.title}
                  </p>
                  <p className="text-2xl font-bold">
                    {kpi.value}{kpi.unit && ` ${kpi.unit}`}
                  </p>
                  {kpi.change && (
                    <p className={`text-xs ${kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.changeType === 'positive' ? '+' : ''}{kpi.change} this week
                    </p>
                  )}
                </div>
                <div className="text-2xl">
                  {kpi.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Exam Readiness Score */}
        <ExamReadinessScore 
          score={examReadinessData.score}
          previousScore={examReadinessData.previousScore}
          weeklyTrends={examReadinessData.weeklyTrends}
          weakAreas={examReadinessData.weakAreas}
          strongAreas={examReadinessData.strongAreas}
        />

        {/* Subject Breakdown */}
        <SubjectBreakdownSection subjects={subjectsData} />
      </div>

      {/* Study Progress */}
      <StudyProgress subjects={subjectsData} />

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <BookOpen className="h-6 w-6 mb-2" />
              <span className="text-sm">Study Now</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <TrendingUp className="h-6 w-6 mb-2" />
              <span className="text-sm">Take Quiz</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <CalendarDays className="h-6 w-6 mb-2" />
              <span className="text-sm">View Schedule</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Target className="h-6 w-6 mb-2" />
              <span className="text-sm">Set Goal</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RedesignedDashboardOverview;
