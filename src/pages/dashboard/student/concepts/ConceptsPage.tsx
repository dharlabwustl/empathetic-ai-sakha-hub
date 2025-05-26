
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
      { name: 'Physics', completed: 28, total: 45, progress: 62, efficiency: 85, studyTime: 240 },
      { name: 'Chemistry', completed: 22, total: 40, progress: 55, efficiency: 78, studyTime: 180 },
      { name: 'Biology', completed: 35, total: 38, progress: 92, efficiency: 95, studyTime: 200 }
    ],
    totalStudyTime: 620,
    overallProgress: 70,
    suggestions: [
      'Biology concepts are almost mastered! Focus on plant physiology 🌱',
      'Physics mechanics need more attention. Review Newton\'s laws ⚛️',
      'Chemistry organic reactions require daily practice 🧪',
      'Use voice notes to explain concepts in your own words 🎤'
    ]
  };

  if (loading) {
    return <LoadingState message="Loading concepts..." />;
  }

  return (
    <SharedPageLayout
      title="Smart Concept Cards"
      subtitle="Master NEET concepts with AI-powered learning"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Helmet>
        <title>Concepts - PREPZR</title>
      </Helmet>
      
      <div className="space-y-8">
        {/* Overview Section for Concepts */}
        <OverviewSection 
          title="Concepts Progress"
          subjects={conceptsOverview.subjects}
          totalStudyTime={conceptsOverview.totalStudyTime}
          overallProgress={conceptsOverview.overallProgress}
          suggestions={conceptsOverview.suggestions}
          userName={userProfile?.name}
          pageContext="concepts"
        />
        
        {/* Concepts Section */}
        <ConceptsSection />
      </div>
      
      {/* Interactive Voice Assistant */}
      <InteractiveVoiceAssistant 
        userName={userProfile?.name || "Student"}
        language="en-US"
        onNavigationCommand={(route) => navigate(route)}
        position="bottom-right"
      />
    </SharedPageLayout>
  );
};

export default ConceptsPage;
