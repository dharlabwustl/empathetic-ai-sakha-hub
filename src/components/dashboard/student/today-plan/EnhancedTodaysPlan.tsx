
import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { useTodaysPlan } from "@/hooks/useTodaysPlan";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import TodaysPlanProgressMeter from '../todays-plan/TodaysPlanProgressMeter';
import EnhancedTaskBreakdown from './EnhancedTaskBreakdown';
import TodaysPlanVoiceAssistant from '@/components/voice/TodaysPlanVoiceAssistant';
import DailySmartSuggestions from '../DailySmartSuggestions';

const EnhancedTodaysPlan: React.FC = () => {
  const { userProfile } = useUserProfile(UserRole.Student);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const goalTitle = userProfile?.goals?.[0]?.title || "NEET";
  
  // Get today's plan data
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

  // Handle concept click to navigate to concept study page
  const handleConceptClick = (conceptId: string) => {
    console.log("Navigating to concept detail page:", conceptId);
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };

  // Handle smart suggestion actions
  const handleSuggestionAction = (suggestion: any) => {
    switch (suggestion.category) {
      case 'study':
        navigate('/dashboard/student/concepts');
        break;
      case 'review':
        navigate('/dashboard/student/flashcards');
        break;
      case 'exam':
        navigate('/dashboard/student/practice-exam');
        break;
      case 'break':
        navigate('/dashboard/student/feel-good-corner');
        break;
      default:
        console.log('Suggestion action:', suggestion);
    }
  };

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
        <TodaysPlanProgressMeter planData={planData} isMobile={isMobile} />
        
        {/* Enhanced task breakdown with premium styling */}
        <EnhancedTaskBreakdown 
          planData={planData}
          onConceptClick={handleConceptClick}
          isMobile={isMobile}
        />
        
        {/* Smart suggestions section for task completion and backlog management */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Smart Suggestions</h3>
          <DailySmartSuggestions 
            suggestions={[
              {
                id: '1',
                title: 'Complete Pending Physics Concepts',
                description: 'You have 2 physics concepts pending from yesterday',
                priority: 'high',
                category: 'study',
                estimatedTime: '25 min',
                action: 'Start Now'
              },
              {
                id: '2',
                title: 'Review Chemistry Flashcards',
                description: 'Quick review before moving to new topics',
                priority: 'medium',
                category: 'review',
                estimatedTime: '15 min',
                action: 'Review'
              },
              {
                id: '3',
                title: 'Clear Backlog Tasks',
                description: 'You have 3 overdue tasks in your backlog',
                priority: 'high',
                category: 'study',
                estimatedTime: '45 min',
                action: 'Clear Backlog'
              }
            ]}
            onSuggestionClick={handleSuggestionAction}
          />
        </div>
        
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
