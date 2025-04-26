
import React from 'react';
import { TodaysPlanSection } from '@/components/dashboard/student/todays-plan';
import FlashcardView from '@/components/dashboard/student/FlashcardsFeature';
import MicroConcept from '@/components/dashboard/student/MicroConcept';

// Today's plan view component
export const TodayPlanView: React.FC = () => {
  return (
    <div>
      <TodaysPlanSection />
    </div>
  );
};

// Flashcards view component
export const FlashcardsView: React.FC = () => {
  return (
    <div>
      <FlashcardView />
    </div>
  );
};

// MicroConcept view component
export const MicroConceptView: React.FC = () => {
  return (
    <div>
      <MicroConcept />
    </div>
  );
};
