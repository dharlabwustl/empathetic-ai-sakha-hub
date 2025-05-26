
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import EnhancedConceptLandingPage from '@/components/dashboard/student/concepts/EnhancedConceptLandingPage';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { Helmet } from 'react-helmet';
import LoadingState from '@/components/common/LoadingState';
import InteractiveVoiceAssistant from '@/components/voice/InteractiveVoiceAssistant';
import { useNavigate } from 'react-router-dom';
import NEETOverviewSection from '@/components/dashboard/student/NEETOverviewSection';

const ConceptsLandingPage: React.FC = () => {
  const { userProfile, loading } = useUserProfile(UserRole.Student);
  const navigate = useNavigate();

  // Mock data for NEET concepts overview
  const neetConceptsOverview = {
    subjects: [
      { name: 'Physics' as const, completed: 15, total: 25, progress: 60, efficiency: 85, studyTime: 120 },
      { name: 'Chemistry' as const, completed: 8, total: 20, progress: 40, efficiency: 78, studyTime: 90 },
      { name: 'Biology' as const, completed: 18, total: 22, progress: 82, efficiency: 92, studyTime: 105 }
    ],
    totalStudyTime: 315,
    overallProgress: 61,
    suggestions: [
      'Focus on Chemistry - you have great potential to improve quickly! 🧪',
      'Your Biology concepts are strong. Consider advanced topics next 🔬',
      'Physics numericals need practice. Try 15 min daily sessions ⚡',
      'Master atomic structure in Chemistry for better organic understanding 🧪'
    ]
  };

  if (loading) {
    return <LoadingState message="Loading concepts..." />;
  }

  return (
    <SharedPageLayout
      title="Concept Cards"
      subtitle="Master concepts with AI-powered explanations and visuals"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Helmet>
        <title>Concept Cards - PREPZR</title>
      </Helmet>
      
      <div className="space-y-8">
        {/* NEET Overview Section */}
        <NEETOverviewSection 
          title="Concepts Progress"
          subjects={neetConceptsOverview.subjects}
          totalStudyTime={neetConceptsOverview.totalStudyTime}
          overallProgress={neetConceptsOverview.overallProgress}
          suggestions={neetConceptsOverview.suggestions}
          userName={userProfile?.name || 'Student'}
          pageContext="concepts"
        />

        {/* Enhanced Concept Landing Page */}
        <EnhancedConceptLandingPage />
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

export default ConceptsLandingPage;
