
import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { useTodaysPlan } from "@/hooks/useTodaysPlan";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import SmartSuggestionsSection from '../todays-plan/SmartSuggestionsSection';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import EnhancedTaskBreakdown from './EnhancedTaskBreakdown';
import TodaysPlanVoiceAssistant from '@/components/voice/TodaysPlanVoiceAssistant';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, Target, Clock, CheckCircle } from 'lucide-react';

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

  const handleConceptClick = (conceptId: string) => {
    console.log("Navigating to concept detail page:", conceptId);
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };

  const handleSuggestionAction = (action: string) => {
    switch (action) {
      case 'concepts':
        navigate('/dashboard/student/concepts');
        break;
      case 'flashcards':
        navigate('/dashboard/student/flashcards');
        break;
      case 'practice-exam':
        navigate('/dashboard/student/practice-exam');
        break;
      case 'break':
        console.log('Take a break suggestion clicked');
        break;
      case 'bonus':
        navigate('/dashboard/student/feel-good-corner');
        break;
      default:
        console.log('Suggestion action:', action);
    }
  };

  // Calculate progress data
  const totalTasks = 12;
  const completedTasks = 8;
  const progressPercentage = (completedTasks / totalTasks) * 100;

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
        {/* Progress meter at the top */}
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
              <Target className="h-5 w-5" />
              Today's Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Tasks Completed</span>
                <span className="text-sm text-gray-600">{completedTasks}/{totalTasks}</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <div className="grid grid-cols-3 gap-4 text-center">
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
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Smart suggestions section */}
        <SmartSuggestionsSection 
          planData={planData}
          onActionClick={handleSuggestionAction}
          isMobile={isMobile}
        />
        
        {/* Enhanced task breakdown */}
        <EnhancedTaskBreakdown 
          planData={planData}
          onConceptClick={handleConceptClick}
          isMobile={isMobile}
        />
        
        {/* Voice assistant for today's plan */}
        <TodaysPlanVoiceAssistant 
          planData={planData}
          userName={planData?.userName}
          isEnabled={true}
        />
      </div>
    </SharedPageLayout>
  );
};

export default EnhancedTodaysPlan;
