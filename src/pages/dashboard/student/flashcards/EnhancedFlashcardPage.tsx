
import React from 'react';
import EnhancedInteractiveFlashcard from '@/components/flashcards/EnhancedInteractiveFlashcard';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

const EnhancedFlashcardPage = () => {
  return (
    <SharedPageLayout
      title="Interactive Flashcards"
      subtitle="Master concepts with our enhanced flashcard learning system"
      showQuickAccess={false}
    >
      <EnhancedInteractiveFlashcard />
    </SharedPageLayout>
  );
};

export default EnhancedFlashcardPage;
