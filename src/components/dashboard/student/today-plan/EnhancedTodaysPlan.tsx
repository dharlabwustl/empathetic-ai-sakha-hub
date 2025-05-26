
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
import FloatingVoiceButton from '@/components/voice/FloatingVoiceButton';
import NewTodaysPlanHeader from './NewTodaysPlanHeader';
import OverviewSection from '../OverviewSection';
import ModernTodaysPlanLayout from './ModernTodaysPlanLayout';

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

  // Mock overview data for today's plan
  const todaysOverview = {
    subjects: [
      { name: 'Physics', completed: 2, total: 4, progress: 50, efficiency: 85, studyTime: 90 },
      { name: 'Chemistry', completed: 1, total: 3, progress: 33, efficiency: 70, studyTime: 60 },
      { name: 'Biology', completed: 3, total: 3, progress: 100, efficiency: 95, studyTime: 75 },
      { name: 'Mathematics', completed: 1, total: 2, progress: 50, efficiency: 80, studyTime: 45 }
    ],
    totalStudyTime: 270,
    overallProgress: 58,
    suggestions: [
      'You\'re doing great with Biology today! 🎉',
      'Focus on Chemistry next - only 2 tasks remaining',
      'Take a 10-minute break before Physics numericals',
      'Your morning session efficiency is above 80% ⚡'
    ]
  };
  
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
      title=""
      subtitle=""
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Helmet>
        <title>Today's Plan - PREPZR</title>
      </Helmet>
      
      <div className={`space-y-8 ${isMobile ? 'px-0' : ''}`}>
        {/* Premium Header */}
        <NewTodaysPlanHeader 
          userName={planData?.userName || userProfile?.name}
          isMobile={isMobile}
        />

        {/* Today's Overview Section */}
        <OverviewSection 
          title="Today's Progress"
          subjects={todaysOverview.subjects}
          totalStudyTime={todaysOverview.totalStudyTime}
          overallProgress={todaysOverview.overallProgress}
          suggestions={todaysOverview.suggestions}
          userName={userProfile?.name}
          pageContext="concepts"
        />
        
        {/* Modern Today's Plan Layout */}
        <ModernTodaysPlanLayout 
          planData={planData}
          onConceptClick={handleConceptClick}
          onTaskComplete={markTaskCompleted}
          isMobile={isMobile}
        />
        
        {/* Smart suggestions section */}
        <SmartSuggestionsSection 
          planData={planData}
          onActionClick={handleSuggestionAction}
          isMobile={isMobile}
        />
      </div>
      
      {/* Voice assistant for learning support */}
      <FloatingVoiceButton 
        userName={planData?.userName || userProfile?.name}
        language="en-US"
      />
    </SharedPageLayout>
  );
};

export default EnhancedTodaysPlan;
