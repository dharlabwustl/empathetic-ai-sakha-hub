
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import PracticeExamsSection from '@/components/dashboard/student/exams/PracticeExamsSection';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';
import { Helmet } from 'react-helmet';
import LoadingState from '@/components/common/LoadingState';
import InteractiveVoiceAssistant from '@/components/voice/InteractiveVoiceAssistant';
import { useNavigate } from 'react-router-dom';
import OverviewSection from '@/components/dashboard/student/OverviewSection';

const PracticeExamPage: React.FC = () => {
  const { userProfile, loading } = useUserProfile(UserRole.Student);
  const navigate = useNavigate();

  // Mock data for practice exams overview for NEET
  const practiceExamsOverview = {
    subjects: [
      { name: 'Physics', completed: 12, total: 20, progress: 60, efficiency: 82, studyTime: 360 },
      { name: 'Chemistry', completed: 8, total: 15, progress: 53, efficiency: 75, studyTime: 240 },
      { name: 'Biology', completed: 14, total: 16, progress: 88, efficiency: 91, studyTime: 280 }
    ],
    totalStudyTime: 880,
    overallProgress: 67,
    suggestions: [
      'Biology mock tests show excellent performance! Keep it up! 🎯',
      'Physics numerical problems need more practice. Focus on mechanics 📐',
      'Chemistry theory questions improving. Work on inorganic chemistry ⚗️',
      'Use voice commands to quickly review incorrect answers 🗣️'
    ]
  };

  if (loading) {
    return <LoadingState message="Loading practice exams..." />;
  }

  return (
    <SharedPageLayout
      title="Practice Exams"
      subtitle="NEET mock tests and question practice"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <Helmet>
        <title>Practice Exams - PREPZR</title>
      </Helmet>
      
      <div className="space-y-8">
        {/* Overview Section for Practice Exams */}
        <OverviewSection 
          title="Practice Exams Progress"
          subjects={practiceExamsOverview.subjects}
          totalStudyTime={practiceExamsOverview.totalStudyTime}
          overallProgress={practiceExamsOverview.overallProgress}
          suggestions={practiceExamsOverview.suggestions}
          userName={userProfile?.name}
          pageContext="practice-exam"
        />
        
        {/* Practice Exams Section */}
        <PracticeExamsSection />
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

export default PracticeExamPage;
