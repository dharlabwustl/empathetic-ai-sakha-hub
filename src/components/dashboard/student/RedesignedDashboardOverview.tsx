
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { UserProfileType, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { BarChart, Brain, Calendar, Clock, Target, TrendingUp, Zap, BookOpen, FileText, Award, Flame } from 'lucide-react';
import SmartDailySuggestions from './SmartDailySuggestions';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import UpcomingMilestonesSection from './dashboard-sections/UpcomingMilestonesSection';
import QuickActionsSection from './dashboard-sections/QuickActionsSection';
import StudyStreakSection from './dashboard-sections/StudyStreakSection';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
  currentMood?: MoodType;
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({ 
  userProfile, 
  kpis,
  currentMood 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get user's current mood from local storage
  const [userMood, setUserMood] = useState<MoodType | undefined>(currentMood);

  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      try {
        const parsedData = JSON.parse(savedUserData);
        if (parsedData.mood) {
          setUserMood(parsedData.mood);
        }
      } catch (err) {
        console.error("Error parsing user data from localStorage:", err);
      }
    }
  }, [currentMood]);

  // Mock data for overview stats
  const overviewStats = {
    todayProgress: 68,
    weeklyGoal: 85,
    studyStreak: 5,
    conceptsLearned: 23,
    practiceTests: 8,
    totalStudyTime: "4h 32m"
  };

  // Mock performance data
  const subjectPerformance = [
    { subject: 'Physics', score: 85, improvement: +12, color: 'bg-blue-500' },
    { subject: 'Chemistry', score: 78, improvement: +8, color: 'bg-green-500' },
    { subject: 'Biology', score: 92, improvement: +5, color: 'bg-purple-500' },
    { subject: 'Mathematics', score: 76, improvement: +15, color: 'bg-orange-500' }
  ];

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'concept':
        navigate('/dashboard/student/concepts');
        break;
      case 'flashcard':
        navigate('/dashboard/student/flashcards');
        break;
      case 'practice':
        navigate('/dashboard/student/practice-exam');
        break;
      case 'analytics':
        navigate('/dashboard/student/analytics');
        break;
      default:
        toast({
          title: "Feature coming soon!",
          description: "This feature will be available in the next update.",
        });
    }
  };

  return (
    <div className="space-y-6">
      {/* Smart Daily Suggestions - Now positioned below header */}
      <SmartDailySuggestions userMood={userMood} userName={userProfile.name} />

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-full">
                <Target className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Today's Progress</p>
                <p className="text-2xl font-bold text-blue-800">{overviewStats.todayProgress}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-full">
                <Flame className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Study Streak</p>
                <p className="text-2xl font-bold text-green-800">{overviewStats.studyStreak} days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 rounded-full">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium">Concepts</p>
                <p className="text-2xl font-bold text-purple-800">{overviewStats.conceptsLearned}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-full">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-orange-600 font-medium">Study Time</p>
                <p className="text-2xl font-bold text-orange-800">{overviewStats.totalStudyTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Performance Overview */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-blue-600" />
            Subject Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subjectPerformance.map((subject) => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{subject.subject}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      +{subject.improvement}%
                    </Badge>
                    <span className="text-sm text-muted-foreground">{subject.score}%</span>
                  </div>
                </div>
                <Progress value={subject.score} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grid Layout for Additional Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Plan Section */}
        <TodaysPlanSection currentMood={userMood} />

        {/* Study Streak Section */}
        <StudyStreakSection />
      </div>

      {/* Additional Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Milestones */}
        <UpcomingMilestonesSection />

        {/* Quick Actions */}
        <QuickActionsSection onAction={handleQuickAction} />
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
