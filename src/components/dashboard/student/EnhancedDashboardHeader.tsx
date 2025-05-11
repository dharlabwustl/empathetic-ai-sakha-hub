import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserProfileType, MoodType } from '@/types/user/base';
import MoodLogButton from './MoodLogButton';
import { CalendarCheck, Clock, TrendingUp, Award, ChartBar, PlusCircle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UpcomingEvent {
  title: string;
  time: string;
  type: 'exam' | 'task' | 'meeting' | 'concept' | 'practice';
  url?: string;
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
  currentMood,
  onMoodChange,
  upcomingEvents = []
}) => {
  // Add streak and exam readiness to the user profile type
  const streak = userProfile?.streak || { current: 12, longest: 24, lastStudyDate: new Date() };
  const examReadiness = userProfile?.examReadiness || { percentage: 72, lastUpdated: new Date() };
  const navigate = useNavigate();

  // Define default upcoming events if none provided
  const defaultEvents: UpcomingEvent[] = [
    { 
      title: "Physics: Kinematics", 
      time: "Today, 4:00 PM", 
      type: "concept",
      url: "/dashboard/student/concepts/card/physics-kinematics"
    },
    { 
      title: "Chemistry Practice Quiz", 
      time: "Today, 6:00 PM", 
      type: "practice",
      url: "/dashboard/student/practice-exam/chemistry"
    },
    { 
      title: "Mathematics: Calculus", 
      time: "Tomorrow, 10:00 AM", 
      type: "concept",
      url: "/dashboard/student/concepts/card/mathematics-calculus"
    }
  ];

  // Use provided events or fall back to defaults
  const displayEvents = upcomingEvents.length > 0 ? upcomingEvents : defaultEvents;

  // Get the first event for the Next Session card
  const nextSessionEvent = displayEvents.length > 0 ? displayEvents[0] : null;

  // Navigate to create new study plan
  const handleCreateNewPlan = () => {
    navigate('/dashboard/student/academic');
  };

  // Navigate to switch exam
  const handleSwitchExam = () => {
    navigate('/dashboard/student/academic');
  };
  
  // Function to get the correct URL based on event type
  const getEventUrl = (event: UpcomingEvent) => {
    // If event has a specific URL defined, use it
    if (event.url) {
      return event.url;
    }
    
    // Otherwise generate URL based on type
    switch(event.type) {
      case 'concept':
        return `/dashboard/student/concepts/card/${event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      case 'practice':
        return `/dashboard/student/practice-exam/${event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      case 'exam':
        return `/dashboard/student/practice-exam/${event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      case 'meeting':
        return `/dashboard/student/tutor`;
      default:
        return `/dashboard/student/today`;
    }
  };

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
          {/* Study plan button removed as requested */}
        </div>
      </div>

      {/* Main Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Exam Goal Card with new options */}
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
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline" className="w-1/2 flex items-center gap-1" onClick={handleSwitchExam}>
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Switch Exam</span>
              </Button>
              <Button size="sm" variant="outline" className="w-1/2 flex items-center gap-1" onClick={handleCreateNewPlan}>
                <PlusCircle className="h-3.5 w-3.5" />
                <span>New Plan</span>
              </Button>
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

        {/* Next Study Session Card - Updated with direct links to specific tasks */}
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-12 w-12 bg-violet-100 dark:bg-violet-900/30 text-violet-600 flex items-center justify-center rounded-full">
              <Clock className="h-6 w-6" />
            </div>
            <div className="w-full">
              <h3 className="text-sm text-muted-foreground">Next Session</h3>
              {nextSessionEvent ? (
                <div className="flex flex-col">
                  <a 
                    href={getEventUrl(nextSessionEvent)} 
                    className="text-lg font-bold hover:text-primary transition-colors"
                  >
                    {nextSessionEvent.title}
                  </a>
                  <span className="text-xs text-muted-foreground">{nextSessionEvent.time}</span>
                </div>
              ) : (
                <div className="flex flex-col">
                  <a 
                    href="/dashboard/student/today" 
                    className="text-lg font-bold hover:text-primary transition-colors"
                  >
                    No upcoming sessions
                  </a>
                  <span className="text-xs text-muted-foreground">Check your study plan</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPI Statistics removed as requested */}
    </div>
  );
};

export default EnhancedDashboardHeader;
