
import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTodaysPlan } from "@/hooks/useTodaysPlan";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import EnhancedTaskBreakdown from './EnhancedTaskBreakdown';
import TodaysPlanVoiceAssistant from '@/components/voice/TodaysPlanVoiceAssistant';
import { Calendar, Target, Clock, CheckCircle, Brain, Zap } from 'lucide-react';

const EnhancedTodaysPlan: React.FC = () => {
  const { userProfile } = useUserProfile(UserRole.Student);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const goalTitle = userProfile?.goals?.[0]?.title || "NEET";
  
  const {
    loading,
    error,
    planData,
    refreshData,
    markTaskCompleted,
    addBookmark,
    addNote
  } = useTodaysPlan(goalTitle, userProfile?.name || "Student");
  
  if (loading) {
    return <LoadingState message="Loading your study plan..." />;
  }
  
  if (error) {
    return (
      <ErrorState 
        title="Could not load study plan" 
        message={error} 
        action={
          <Button onClick={refreshData}>
            Try Again
          </Button>
        }
      />
    );
  }

  // Calculate progress data
  const totalTasks = 12;
  const completedTasks = 8;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  // Smart suggestions for task completion
  const getSmartSuggestions = () => {
    return [
      {
        icon: <Brain className="h-4 w-4 text-blue-600" />,
        title: "Focus Time Recommended",
        text: "Best learning hours are 9-11 AM. Schedule complex topics now.",
        action: () => navigate('/dashboard/student/concepts')
      },
      {
        icon: <Zap className="h-4 w-4 text-yellow-600" />,
        title: "Quick Win Available",
        text: "Complete 2 pending flashcard reviews to boost momentum.",
        action: () => navigate('/dashboard/student/flashcards')
      },
      {
        icon: <Target className="h-4 w-4 text-green-600" />,
        title: "Achievement Unlock",
        text: "Finish 1 more task to complete today's study goal!",
        action: () => {}
      }
    ];
  };

  const smartSuggestions = getSmartSuggestions();

  return (
    <SharedPageLayout
      title="Today's Study Plan"
      subtitle="Your personalized daily study schedule"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Helmet>
        <title>Today's Plan - PREPZR</title>
      </Helmet>
      
      <div className={`space-y-6 ${isMobile ? 'px-0' : ''}`}>
        {/* Progress Meter at the Top */}
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
              <Target className="h-5 w-5" />
              Today's Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Tasks Completed</span>
                <span className="text-sm text-gray-600">{completedTasks}/{totalTasks}</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <Calendar className="h-4 w-4 text-blue-600 mb-1" />
                  <span className="text-xs text-gray-600">Today</span>
                  <span className="text-sm font-medium">{completedTasks}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Clock className="h-4 w-4 text-orange-600 mb-1" />
                  <span className="text-xs text-gray-600">Remaining</span>
                  <span className="text-sm font-medium">{totalTasks - completedTasks}</span>
                </div>
                <div className="flex flex-col items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mb-1" />
                  <span className="text-xs text-gray-600">Progress</span>
                  <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="flex flex-col items-center">
                  <Brain className="h-4 w-4 text-purple-600 mb-1" />
                  <span className="text-xs text-gray-600">Streak</span>
                  <span className="text-sm font-medium">7 days</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Enhanced task breakdown */}
          <div className="lg:col-span-3">
            <EnhancedTaskBreakdown 
              planData={planData}
              onConceptClick={(id) => navigate(`/dashboard/student/concepts/${id}`)}
              isMobile={isMobile}
            />
          </div>
          
          {/* Smart Suggestions for Task Completion */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Smart Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {smartSuggestions.map((suggestion, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" onClick={suggestion.action}>
                    <div className="flex items-start gap-2 mb-2">
                      {suggestion.icon}
                      <div>
                        <h4 className="font-medium text-sm">{suggestion.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{suggestion.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <TodaysPlanVoiceAssistant 
              planData={planData}
              userName={planData?.userName}
              isEnabled={true}
            />
          </div>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default EnhancedTodaysPlan;
