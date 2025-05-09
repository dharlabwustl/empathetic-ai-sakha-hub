
import React from 'react';
import { Route } from 'react-router-dom';
import FlashcardsLandingPage from '@/components/dashboard/student/flashcards/FlashcardsLandingPage';
import FlashcardInteractive from '@/components/dashboard/student/flashcards/FlashcardInteractive';
import FlashcardDetailsPage from '@/pages/dashboard/student/FlashcardDetailsPage';
import InteractiveFlashcardBrowser from '@/components/flashcards/InteractiveFlashcardBrowser';
import EnhancedFlashcardPractice from '@/components/dashboard/student/flashcards/EnhancedFlashcardPractice';

export const flashcardRoutes = (
  <>
    {/* Flashcard routes */}
    <Route path="/dashboard/student/flashcards/:flashcardId/interactive" element={<FlashcardInteractive />} />
    <Route path="/dashboard/student/flashcards/:flashcardId" element={<FlashcardDetailsPage />} />
    <Route path="/dashboard/student/flashcards/:flashcardId/browse" element={<InteractiveFlashcardBrowser />} />
    <Route path="/dashboard/student/flashcards/:flashcardId/practice" element={<EnhancedFlashcardPractice />} />
    <Route path="/dashboard/student/flashcards" element={<FlashcardsLandingPage />} />
  </>
);
