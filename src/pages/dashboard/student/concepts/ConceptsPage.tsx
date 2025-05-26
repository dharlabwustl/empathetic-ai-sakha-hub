
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
      { name: 'Physics', completed: 35, total: 50, progress: 70, efficiency: 85, studyTime: 180 },
      { name: 'Chemistry', completed: 28, total: 45, progress: 62, efficiency: 78, studyTime: 150 },
      { name: 'Biology', completed: 42, total: 48, progress: 88, efficiency: 92, studyTime: 165 }
    ],
    totalStudyTime: 495,
    overallProgress: 73,
    suggestions: [
      'Biology concepts are going strong! You\'re mastering them efficiently 🌟',
      'Physics mechanics needs more attention. Focus on numerical problems ⚡',
      'Chemistry organic reactions are improving. Keep practicing daily 🧪',
      'Try the Formula Lab for better concept retention 📝',
      'Your overall progress is excellent. Maintain this momentum! 🚀'
    ]
  };

  if (loading) {
    return <LoadingState message="Loading concepts..." />;
  }

  return (
    <SharedPageLayout
      title="Concept Mastery"
      subtitle="Master key concepts and fundamentals with AI-powered learning"
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
