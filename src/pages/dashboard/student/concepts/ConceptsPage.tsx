
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import ConceptsSection from '@/components/dashboard/student/concepts/ConceptsSection';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { Helmet } from 'react-helmet';
import LoadingState from '@/components/common/LoadingState';
import InteractiveVoiceAssistant from '@/components/voice/InteractiveVoiceAssistant';
import { useNavigate } from 'react-router-dom';
import OverviewSection from '@/components/dashboard/student/OverviewSection';

const ConceptsPage: React.FC = () => {
  const { userProfile, loading } = useUserProfile(UserRole.Student);
  const navigate = useNavigate();

  // Mock data for concepts overview for NEET
  const conceptsOverview = {
    subjects: [
      { name: 'Physics', completed: 24, total: 35, progress: 69, efficiency: 85, studyTime: 320 },
      { name: 'Chemistry', completed: 18, total: 28, progress: 64, efficiency: 78, studyTime: 280 },
      { name: 'Biology', completed: 31, total: 42, progress: 74, efficiency: 92, studyTime: 360 }
    ],
    totalStudyTime: 960,
    overallProgress: 69,
    suggestions: [
      'Physics mechanics concepts are well understood! Move to thermodynamics 🌡️',
      'Chemistry organic reactions need more practice. Try interactive models 🧪',
      'Biology cell biology is your strongest area. Use it to boost confidence! 🔬',
      'Review Physics numerical problems daily for better retention ⚡',
      'Create concept maps to connect Chemistry topics better 🗺️'
    ]
  };

  if (loading) {
    return <LoadingState message="Loading concepts..." />;
  }

  return (
    <SharedPageLayout
      title="Concept Mastery"
      subtitle="Master fundamental concepts with AI-powered explanations"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Helmet>
        <title>Concepts - PREPZR</title>
      </Helmet>
      
      <div className="space-y-8">
        {/* Overview Section */}
        <OverviewSection 
          title="NEET Concepts Progress"
          subjects={conceptsOverview.subjects}
          totalStudyTime={conceptsOverview.totalStudyTime}
          overallProgress={conceptsOverview.overallProgress}
          suggestions={conceptsOverview.suggestions}
          userName={userProfile?.name || 'Student'}
          pageContext="concepts"
        />

        {/* Concepts Section */}
        <ConceptsSection />
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

export default ConceptsPage;
