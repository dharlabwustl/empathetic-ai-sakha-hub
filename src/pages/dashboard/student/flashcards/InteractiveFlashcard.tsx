
import React from 'react';
import { useParams } from 'react-router-dom';
import FlashcardInteractivePage from '@/components/dashboard/student/flashcards/FlashcardInteractivePage';

const InteractiveFlashcard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  console.log('🚨 INTERACTIVE FLASHCARD PAGE - ID:', id);
  console.log('🚨 Current URL:', window.location.href);
  
  return <FlashcardInteractivePage />;
};

export default InteractiveFlashcard;
