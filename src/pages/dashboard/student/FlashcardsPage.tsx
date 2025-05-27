
import React from 'react';
import FlashcardLandingPage from '@/components/dashboard/student/flashcards/FlashcardLandingPage';

const FlashcardsPage = () => {
  console.log('🚨 FLASHCARDS PAGE - Component rendered');
  console.log('🚨 Current location:', window.location.href);
  console.log('🚨 About to render FlashcardLandingPage');
  
  return <FlashcardLandingPage />;
};

export default FlashcardsPage;
