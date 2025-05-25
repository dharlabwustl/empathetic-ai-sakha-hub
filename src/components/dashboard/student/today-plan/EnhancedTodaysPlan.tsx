
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
import SmartSuggestionsSection from '../todays-plan/SmartSuggestionsSection';
import PageVoiceAssistant from '@/components/voice/PageVoiceAssistant';

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
        
        {/* Enhanced task breakdown */}
        <EnhancedTaskBreakdown 
          planData={planData}
          onConceptClick={handleConceptClick}
          isMobile={isMobile}
        />
        
        {/* Smart suggestions for task completion and backlog management */}
        <SmartSuggestionsSection 
          planData={planData}
          onActionClick={handleSuggestionAction}
          isMobile={isMobile}
        />
      </div>
      
      {/* Page-specific voice assistant */}
      <PageVoiceAssistant 
        userName={userProfile?.name}
        pageContext="today-plan"
        isEnabled={true}
      />
    </SharedPageLayout>
  );
};

export default EnhancedTodaysPlan;
