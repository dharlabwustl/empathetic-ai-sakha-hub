
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import PracticeExamsSection from '@/components/dashboard/student/exams/PracticeExamsSection';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { Helmet } from 'react-helmet';
import LoadingState from '@/components/common/LoadingState';
import InteractiveVoiceAssistant from '@/components/voice/InteractiveVoiceAssistant';
import { useNavigate } from 'react-router-dom';
import EnhancedOverviewSection from '@/components/dashboard/student/EnhancedOverviewSection';

const PracticeExamPage: React.FC = () => {
  const { userProfile, loading } = useUserProfile(UserRole.Student);
  const navigate = useNavigate();

  // Mock data for practice exams overview for NEET
  const practiceExamsOverview = {
    subjects: [
      { name: 'Physics', completed: 12, total: 20, progress: 60, efficiency: 75, studyTime: 240 },
      { name: 'Chemistry', completed: 8, total: 15, progress: 53, efficiency: 68, studyTime: 180 },
      { name: 'Biology', completed: 14, total: 18, progress: 78, efficiency: 85, studyTime: 210 }
    ],
    totalStudyTime: 630,
    overallProgress: 64,
    suggestions: [
      'Your Biology exam scores are consistently high! Keep it up! 🏆',
      'Physics needs more practice. Focus on numerical problems ⚡',
      'Chemistry organic reactions need attention. Take targeted tests 🧪',
      'Try timed mini-tests to improve your speed and accuracy ⏱️',
      'Overall performance is good. Aim for 80%+ in weak areas 🎯'
    ]
  };

  if (loading) {
    return <LoadingState message="Loading practice exams..." />;
  }

  return (
    <SharedPageLayout
      title="Practice Exams"
      subtitle="AI-generated tests that mirror real NEET exam patterns"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Helmet>
        <title>Practice Exams - PREPZR</title>
      </Helmet>
      
      <div className="space-y-8">
        {/* Enhanced Overview Section */}
        <EnhancedOverviewSection 
          title="NEET Practice Exams Progress"
          subjects={practiceExamsOverview.subjects}
          totalStudyTime={practiceExamsOverview.totalStudyTime}
          overallProgress={practiceExamsOverview.overallProgress}
          suggestions={practiceExamsOverview.suggestions}
          userName={userProfile?.name || 'Student'}
          pageContext="practice-exam"
        />

        {/* Practice Exams Section */}
        <PracticeExamsSection />
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

export default PracticeExamPage;
