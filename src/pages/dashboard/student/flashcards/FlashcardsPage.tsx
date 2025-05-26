
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import FlashcardsSection from '@/components/dashboard/student/flashcards/FlashcardsSection';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { Helmet } from 'react-helmet';
import LoadingState from '@/components/common/LoadingState';
import InteractiveVoiceAssistant from '@/components/voice/InteractiveVoiceAssistant';
import { useNavigate } from 'react-router-dom';
import NEETOverviewSection from '@/components/dashboard/student/NEETOverviewSection';

const FlashcardsPage: React.FC = () => {
  const { userProfile, loading } = useUserProfile(UserRole.Student);
  const navigate = useNavigate();

  // Mock data for NEET flashcards overview
  const neetFlashcardsOverview = {
    subjects: [
      { name: 'Physics' as const, completed: 45, total: 60, progress: 75, efficiency: 88, studyTime: 180 },
      { name: 'Chemistry' as const, completed: 32, total: 55, progress: 58, efficiency: 82, studyTime: 150 },
      { name: 'Biology' as const, completed: 38, total: 40, progress: 95, efficiency: 94, studyTime: 135 }
    ],
    totalStudyTime: 465,
    overallProgress: 76,
    suggestions: [
      'Biology flashcards are almost complete! Great work! 🌟',
      'Physics formulas need more repetition. Schedule daily reviews ⚡',
      'Chemistry reactions are improving. Focus on organic chemistry next 🧪',
      'Use spaced repetition for better retention in all subjects 🧠'
    ]
  };

  if (loading) {
    return <LoadingState message="Loading flashcards..." />;
  }

  return (
    <SharedPageLayout
      title="Smart Flashcards"
      subtitle="Spaced repetition system powered by AI"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Helmet>
        <title>Smart Flashcards - PREPZR</title>
      </Helmet>
      
      <div className="space-y-8">
        {/* NEET Overview Section */}
        <NEETOverviewSection 
          title="Flashcards Progress"
          subjects={neetFlashcardsOverview.subjects}
          totalStudyTime={neetFlashcardsOverview.totalStudyTime}
          overallProgress={neetFlashcardsOverview.overallProgress}
          suggestions={neetFlashcardsOverview.suggestions}
          userName={userProfile?.name || 'Student'}
          pageContext="flashcards"
        />

        {/* Flashcards Section */}
        <FlashcardsSection />
      </div>

      {/* Voice Assistant */}
      <InteractiveVoiceAssistant 
        userName={userProfile?.name || 'Student'}
        language="en-US"
        onNavigationCommand={(route) => navigate(route)}
        position="bottom-right"
      />
    </SharedPageLayout>
  );
};

export default FlashcardsPage;
