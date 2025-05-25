
import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { useTodaysPlan } from "@/hooks/useTodaysPlan";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import TodaysPlanProgressMeter from '../todays-plan/TodaysPlanProgressMeter';
import SmartSuggestionsSection from '../todays-plan/SmartSuggestionsSection';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import EnhancedTaskBreakdown from './EnhancedTaskBreakdown';
import LearningPageVoiceAssistant from '@/components/voice/LearningPageVoiceAssistant';
import { useLanguage } from '@/hooks/useLanguage';

const EnhancedTodaysPlan: React.FC = () => {
  const { language, t } = useLanguage();
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
    return <LoadingState message={t('todaysPlan.loading') || "Loading your study plan..."} />;
  }
  
  if (error) {
    return (
      <ErrorState 
        title={t('todaysPlan.errorTitle') || "Could not load study plan"} 
        message={error} 
        action={
          <Button onClick={refreshData}>
            {t('todaysPlan.tryAgain') || "Try Again"}
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
        navigate('/dashboard/student/feel-good-corner');
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
      title={t('todaysPlan.title')}
      subtitle={t('todaysPlan.subtitle')}
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Helmet>
        <title>{t('todaysPlan.title')} - PREPZR</title>
      </Helmet>
      
      <div className={`space-y-8 ${isMobile ? 'px-0' : ''}`}>
        {/* Progress meter at the top */}
        <TodaysPlanProgressMeter planData={planData} isMobile={isMobile} />
        
        {/* Smart suggestions section - enhanced and moved below progress */}
        <SmartSuggestionsSection 
          planData={planData}
          onActionClick={handleSuggestionAction}
          isMobile={isMobile}
        />
        
        {/* Enhanced task breakdown with premium styling */}
        <EnhancedTaskBreakdown 
          planData={planData}
          onConceptClick={handleConceptClick}
          isMobile={isMobile}
        />
      </div>
      
      {/* Context-aware voice assistant for today's plan */}
      <LearningPageVoiceAssistant 
        userName={planData?.userName || userProfile?.name}
        pageType="today-plan"
      />
    </SharedPageLayout>
  );
};

export default EnhancedTodaysPlan;
