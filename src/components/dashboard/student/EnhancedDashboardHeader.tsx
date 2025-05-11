
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserProfileType, MoodType } from '@/types/user/base';
import MoodLogButton from './MoodLogButton';
import { CalendarCheck, Clock, TrendingUp, Award, Users, ChartBar } from 'lucide-react';

interface UpcomingEvent {
  title: string;
  time: string;
  type: 'exam' | 'task' | 'meeting';
}

interface EnhancedDashboardHeaderProps {
  userProfile: UserProfileType;
  formattedTime: string;
  formattedDate: string;
  onViewStudyPlan?: () => void;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  upcomingEvents?: UpcomingEvent[];
}

const EnhancedDashboardHeader: React.FC<EnhancedDashboardHeaderProps> = ({
  userProfile,
  formattedTime,
  formattedDate,
  onViewStudyPlan,
  currentMood,
  onMoodChange,
  upcomingEvents = []
}) => {
  // Add streak and exam readiness to the user profile type
  const streak = userProfile?.streak || { current: 12, longest: 24, lastStudyDate: new Date() };
  const examReadiness = userProfile?.examReadiness || { percentage: 72, lastUpdated: new Date() };
  
  // KPIs for hero section
  const kpis = [
    {
      title: "Total Students",
      value: "37,583+",
      change: "+12% this month",
      icon: <Users className="h-4 w-4" />
    },
    {
      title: "Success Rate",
      value: "94.2%",
      change: "+3.4% this year",
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      title: "Study Plans",
      value: "108,735",
      change: "Delivered to students",
      icon: <CalendarCheck className="h-4 w-4" />
    },
    {
      title: "Stress Reduced",
      value: "62%",
      change: "Reported by users",
      icon: <ChartBar className="h-4 w-4" />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Section with Greeting and Mood Tracking */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Hello, {userProfile?.name?.split(' ')[0] || 'Student'}
          </h1>
          <p className="text-muted-foreground">
            {formattedDate} • {formattedTime}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <MoodLogButton 
            currentMood={currentMood} 
            onMoodChange={onMoodChange}
          />
          {onViewStudyPlan && (
            <Button onClick={onViewStudyPlan} size="sm">
              View Study Plan
            </Button>
          )}
        </div>
      </div>

      {/* Main Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Exam Goal Card */}
        <Card className="overflow-hidden border-blue-200 dark:border-blue-800">
          <div className="bg-gradient-to-r from-blue-500 to-violet-500 p-3">
            <h3 className="font-medium text-white">Exam Goal</h3>
          </div>
          <CardContent className="p-4">
            <h2 className="text-2xl font-bold">{userProfile?.goals?.[0]?.title || 'NEET'}</h2>
            <div className="flex justify-between items-center mt-2">
              <div className="text-sm text-muted-foreground">Target Date</div>
              <div className="text-sm font-medium">
                {userProfile?.goals?.[0]?.targetDate 
                  ? new Date(userProfile.goals[0].targetDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
                  : 'May 15, 2025'}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Study Streak Card */}
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-12 w-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center rounded-full">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm text-muted-foreground">Study Streak</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{streak.current} days</span>
                <span className="text-xs text-muted-foreground">(Longest: {streak.longest})</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exam Readiness Card */}
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center rounded-full">
              <ChartBar className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm text-muted-foreground">Exam Readiness</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{examReadiness.percentage}%</span>
                <span className="text-xs text-emerald-600">+5% this week</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Study Session Card */}
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-12 w-12 bg-violet-100 dark:bg-violet-900/30 text-violet-600 flex items-center justify-center rounded-full">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm text-muted-foreground">Next Session</h3>
              <div className="flex flex-col">
                <span className="text-lg font-bold">Physics</span>
                <span className="text-xs text-muted-foreground">Today, 4:00 PM</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPI Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                {kpi.icon}
                <h3 className="text-sm font-medium">{kpi.title}</h3>
              </div>
              <p className="text-2xl font-bold">{kpi.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EnhancedDashboardHeader;
