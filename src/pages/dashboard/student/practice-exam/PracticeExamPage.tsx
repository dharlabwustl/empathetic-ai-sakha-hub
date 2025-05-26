
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import PracticeExamsSection from '@/components/dashboard/student/exams/PracticeExamsSection';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { Helmet } from 'react-helmet';
import LoadingState from '@/components/common/LoadingState';
import InteractiveVoiceAssistant from '@/components/voice/InteractiveVoiceAssistant';
import { useNavigate } from 'react-router-dom';
import NEETOverviewSection from '@/components/dashboard/student/NEETOverviewSection';

const PracticeExamPage: React.FC = () => {
  const { userProfile, loading } = useUserProfile(UserRole.Student);
  const navigate = useNavigate();

  // Mock data for NEET practice exams overview
  const neetPracticeExamsOverview = {
    subjects: [
      { name: 'Physics' as const, completed: 12, total: 20, progress: 60, efficiency: 75, studyTime: 240 },
      { name: 'Chemistry' as const, completed: 8, total: 15, progress: 53, efficiency: 68, studyTime: 180 },
      { name: 'Biology' as const, completed: 14, total: 18, progress: 78, efficiency: 85, studyTime: 210 }
    ],
    totalStudyTime: 630,
    overallProgress: 64,
    suggestions: [
      'Your Biology exam scores are consistently high! Keep it up! 🏆',
      'Physics needs more practice. Focus on numerical problems ⚡',
      'Chemistry organic reactions need attention. Take targeted tests 🧪',
      'Speed can improve. Try timed mini-tests daily ⏱️',
      'Overall performance is good. Aim for 80%+ in weak areas 🎯'
    ]
  };

  if (loading) {
    return <LoadingState message="Loading practice exams..." />;
  }

  return (
    <SharedPageLayout
      title="Practice Exams"
      subtitle="AI-generated tests that mirror real exam patterns"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Helmet>
        <title>Practice Exams - PREPZR</title>
      </Helmet>
      
      <div className="space-y-8">
        {/* NEET Overview Section */}
        <NEETOverviewSection 
          title="Practice Exams Progress"
          subjects={neetPracticeExamsOverview.subjects}
          totalStudyTime={neetPracticeExamsOverview.totalStudyTime}
          overallProgress={neetPracticeExamsOverview.overallProgress}
          suggestions={neetPracticeExamsOverview.suggestions}
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
