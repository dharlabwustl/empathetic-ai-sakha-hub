
import { useState } from 'react';

interface UseFlashcardNavigationProps {
  totalCards: number;
}

export const useFlashcardNavigation = ({ totalCards }: UseFlashcardNavigationProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    if (currentQuestionIndex < totalCards - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const toggleFlip = () => setIsFlipped(!isFlipped);

  return {
    currentQuestionIndex,
    isFlipped,
    handleNext,
    handlePrevious,
    toggleFlip
  };
};
