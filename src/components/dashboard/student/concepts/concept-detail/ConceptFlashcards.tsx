
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, RotateCw, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Flashcard {
  id: string;
  front: string;
  back: string;
}

interface ConceptFlashcardsProps {
  flashcards: Flashcard[];
}

const ConceptFlashcards: React.FC<ConceptFlashcardsProps> = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<string[]>([]);
  const [reviewLaterCards, setReviewLaterCards] = useState<string[]>([]);
  
  const totalCards = flashcards.length;
  const currentCard = flashcards[currentIndex];
  const progress = ((currentIndex + 1) / totalCards) * 100;
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 300);
    }
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
      }, 300);
    }
  };
  
  const handleKnown = () => {
    setKnownCards([...knownCards, currentCard.id]);
    handleNext();
  };
  
  const handleReviewLater = () => {
    setReviewLaterCards([...reviewLaterCards, currentCard.id]);
    handleNext();
  };
  
  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCards([]);
    setReviewLaterCards([]);
  };
  
  return (
    <div className="flex flex-col items-center p-6">
      <div className="w-full max-w-lg">
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Card {currentIndex + 1} of {totalCards}
          </span>
          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            {knownCards.length} Known · {reviewLaterCards.length} To Review
          </span>
        </div>
        
        <Progress value={progress} className="h-2 mb-6" />
  
        {/* Flashcard */}
        <div className="perspective-1000 w-full h-64 mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex + (isFlipped ? '-flipped' : '')}
              initial={{ rotateY: isFlipped ? -90 : 0, opacity: 0 }}
              animate={{ rotateY: isFlipped ? 180 : 0, opacity: 1 }}
              exit={{ rotateY: isFlipped ? 90 : 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <Card 
                className={`absolute w-full h-full cursor-pointer flex items-center justify-center p-6 bg-gradient-to-br ${
                  !isFlipped 
                    ? 'from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20' 
                    : 'from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20'
                } border-2 border-indigo-100 dark:border-indigo-900`}
                onClick={handleFlip}
              >
                <div className="text-center">
                  <Badge className="mb-2 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                    {!isFlipped ? 'Question' : 'Answer'}
                  </Badge>
                  <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
                    {!isFlipped ? currentCard.front : currentCard.back}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                    Click to {!isFlipped ? 'reveal answer' : 'see question'}
                  </p>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
  
        {/* Control buttons */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="flex-1"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleNext}
              disabled={currentIndex === flashcards.length - 1}
              className="flex-1"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="flex justify-between gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleReviewLater}
              className="flex-1 border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300 dark:hover:bg-amber-900/40"
            >
              <X className="h-4 w-4 mr-1" />
              Review Later
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleKnown}
              className="flex-1 border-green-200 bg-green-50 hover:bg-green-100 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300 dark:hover:bg-green-900/40"
            >
              <Check className="h-4 w-4 mr-1" />
              I Know This
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleReset}
            className="mt-2"
          >
            <RotateCw className="h-4 w-4 mr-1" />
            Reset Deck
          </Button>
        </div>
      </div>
      
      <style>
        {`
          .perspective-1000 {
            perspective: 1000px;
          }
        `}
      </style>
    </div>
  );
};

export default ConceptFlashcards;
