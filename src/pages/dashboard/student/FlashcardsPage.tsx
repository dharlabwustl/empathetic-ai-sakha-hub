
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import FlashcardsSection from '@/components/dashboard/student/flashcards/FlashcardsSection';
import OverviewSection from '@/components/dashboard/student/OverviewSection';

const FlashcardsPage = () => {
  // Mock NEET subject data for flashcards
  const flashcardsOverview = {
    subjects: [
      { name: 'Physics', completed: 120, total: 180, progress: 67, efficiency: 85, studyTime: 240 },
      { name: 'Chemistry', completed: 95, total: 150, progress: 63, efficiency: 78, studyTime: 210 },
      { name: 'Biology', completed: 145, total: 160, progress: 91, efficiency: 92, studyTime: 280 }
    ],
    totalStudyTime: 730,
    overallProgress: 74,
    suggestions: [
      'Review weak flashcards in Organic Chemistry daily 🧪',
      'Use spaced repetition for better retention in Physics formulas ⚡',
      'Create custom flashcards for difficult Biology terms 📚',
      'Practice flashcards during short breaks for maximum efficiency ⏱️'
    ]
  };

  return (
    <SharedPageLayout
      title="Flashcards"
      subtitle="Smart revision with spaced repetition"
    >
      {/* Overview Section for Flashcards */}
      <OverviewSection 
        title="NEET Flashcards Overview"
        subjects={flashcardsOverview.subjects}
        totalStudyTime={flashcardsOverview.totalStudyTime}
        overallProgress={flashcardsOverview.overallProgress}
        suggestions={flashcardsOverview.suggestions}
        pageContext="flashcards"
      />
      
      {/* Flashcards Section */}
      <FlashcardsSection />
    </SharedPageLayout>
  );
};

export default FlashcardsPage;
