
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import PracticeExamsSection from '@/components/dashboard/student/exams/PracticeExamsSection';
import OverviewSection from '@/components/dashboard/student/OverviewSection';

const PracticeExamPage = () => {
  // Mock NEET subject data for practice exams
  const practiceExamOverview = {
    subjects: [
      { name: 'Physics', completed: 8, total: 12, progress: 67, efficiency: 79, studyTime: 320 },
      { name: 'Chemistry', completed: 6, total: 10, progress: 60, efficiency: 73, studyTime: 280 },
      { name: 'Biology', completed: 10, total: 12, progress: 83, efficiency: 86, studyTime: 360 }
    ],
    totalStudyTime: 960,
    overallProgress: 70,
    suggestions: [
      'Take a full-length NEET mock test this weekend 📝',
      'Focus on time management in Physics section ⏰',
      'Review incorrect answers from previous Chemistry tests 🔍',
      'Practice Biology diagram-based questions more frequently 🔬'
    ]
  };

  return (
    <SharedPageLayout
      title="Practice Exams"
      subtitle="Test your knowledge with NEET-style mock exams"
    >
      {/* Overview Section for Practice Exams */}
      <OverviewSection 
        title="NEET Practice Exams Overview"
        subjects={practiceExamOverview.subjects}
        totalStudyTime={practiceExamOverview.totalStudyTime}
        overallProgress={practiceExamOverview.overallProgress}
        suggestions={practiceExamOverview.suggestions}
        pageContext="practice-exam"
      />
      
      {/* Practice Exams Section */}
      <PracticeExamsSection />
    </SharedPageLayout>
  );
};

export default PracticeExamPage;
