
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import ConceptsGrid from '@/components/dashboard/student/concepts/ConceptsGrid';
import OverviewSection from '@/components/dashboard/student/OverviewSection';

const ConceptsPage = () => {
  // Mock NEET subject data for concepts
  const conceptsOverview = {
    subjects: [
      { name: 'Physics', completed: 45, total: 78, progress: 58, efficiency: 82, studyTime: 180 },
      { name: 'Chemistry', completed: 32, total: 65, progress: 49, efficiency: 75, studyTime: 150 },
      { name: 'Biology', completed: 58, total: 72, progress: 81, efficiency: 88, studyTime: 200 }
    ],
    totalStudyTime: 530,
    overallProgress: 63,
    suggestions: [
      'Focus on Chemical Bonding - high weightage in NEET 🧪',
      'Complete Mechanics concepts before moving to Thermodynamics ⚡',
      'Review Plant Physiology diagrams for better retention 🌱',
      'Practice numerical problems in Physics daily for speed 🔢'
    ]
  };

  return (
    <SharedPageLayout
      title="Concept Cards"
      subtitle="Master key concepts with interactive learning cards"
    >
      {/* Overview Section for Concepts */}
      <OverviewSection 
        title="NEET Concepts Overview"
        subjects={conceptsOverview.subjects}
        totalStudyTime={conceptsOverview.totalStudyTime}
        overallProgress={conceptsOverview.overallProgress}
        suggestions={conceptsOverview.suggestions}
        pageContext="concepts"
      />
      
      {/* Concepts Grid */}
      <ConceptsGrid />
    </SharedPageLayout>
  );
};

export default ConceptsPage;
