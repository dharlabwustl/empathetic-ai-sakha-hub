
import React from 'react';
import FlashcardsFeature from '@/components/dashboard/student/FlashcardsFeature';
import PracticeExamFeature from '@/components/dashboard/student/PracticeExamFeature';

export const MicroConceptView = () => {
  return (
    <div className="bg-white rounded-lg border p-4 mb-6">
      <h3 className="text-lg font-medium mb-4">Micro Concepts</h3>
      <p className="text-gray-600">Study micro concepts here - feature coming soon!</p>
    </div>
  );
};

export const FlashcardsView = () => {
  return (
    <FlashcardsFeature />
  );
};

export const PracticeExamsView = () => {
  return (
    <PracticeExamFeature />
  );
};
