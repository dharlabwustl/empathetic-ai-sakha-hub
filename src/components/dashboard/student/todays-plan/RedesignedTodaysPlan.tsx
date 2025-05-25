
import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { useTodaysPlan } from "@/hooks/useTodaysPlan";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import SmartSuggestionsSection from './SmartSuggestionsSection';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import TodaysPlanVoiceAssistant from '@/components/voice/TodaysPlanVoiceAssistant';
import NewTodaysPlanView from '../today-plan/NewTodaysPlanView';

const RedesignedTodaysPlan: React.FC = () => {
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
        // Could implement a break timer or motivational message
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
        {/* Smart suggestions section */}
        <SmartSuggestionsSection 
          planData={planData}
          onActionClick={handleSuggestionAction}
          isMobile={isMobile}
        />
        
        {/* New enhanced today's plan view with progress meter and enhanced task breakdown */}
        <NewTodaysPlanView 
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

export default RedesignedTodaysPlan;
