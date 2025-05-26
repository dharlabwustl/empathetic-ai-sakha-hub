
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, RotateCcw, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileFlashcardLayoutProps {
  currentCard: any;
  currentIndex: number;
  totalCards: number;
  isFlipped: boolean;
  onFlip: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onCorrect: () => void;
  onIncorrect: () => void;
  onReset: () => void;
}

const MobileFlashcardLayout: React.FC<MobileFlashcardLayoutProps> = ({
  currentCard,
  currentIndex,
  totalCards,
  isFlipped,
  onFlip,
  onNext,
  onPrevious,
  onCorrect,
  onIncorrect,
  onReset
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-2 sm:p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6 px-2">
        <div>
          <h1 className="text-lg sm:text-xl font-bold">Flashcards</h1>
          <p className="text-xs sm:text-sm text-gray-600">
            Card {currentIndex + 1} of {totalCards}
          </p>
        </div>
        <Button
          onClick={onReset}
          variant="outline"
          size="sm"
          className="p-2"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4 sm:mb-6 mx-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
        />
      </div>

      {/* Flashcard */}
      <div className="flex-1 flex items-center justify-center mb-4 sm:mb-6 px-2">
        <motion.div
          className="w-full max-w-xs sm:max-w-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card 
            className="h-64 sm:h-80 cursor-pointer shadow-lg"
            onClick={onFlip}
          >
            <CardContent className="h-full p-4 sm:p-6 flex flex-col items-center justify-center text-center">
              <AnimatePresence mode="wait">
                {!isFlipped ? (
                  <motion.div
                    key="front"
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3 sm:space-y-4 w-full"
                  >
                    <Badge variant="outline" className="mb-2 sm:mb-4 text-xs">
                      {currentCard?.subject}
                    </Badge>
                    <h3 className="text-base sm:text-lg font-semibold leading-tight">
                      {currentCard?.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
                      Tap to reveal answer
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="back"
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3 sm:space-y-4 w-full"
                  >
                    <Badge variant="secondary" className="mb-2 sm:mb-4 text-xs">
                      Answer
                    </Badge>
                    <p className="text-sm sm:text-base leading-relaxed">
                      {currentCard?.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Action Buttons */}
      {isFlipped && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 sm:gap-4 mb-4 sm:mb-6 px-2"
        >
          <Button
            onClick={onIncorrect}
            variant="outline"
            className="flex-1 border-red-300 text-red-600 hover:bg-red-50 text-sm sm:text-base py-2 sm:py-3"
          >
            <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Didn't Know</span>
            <span className="xs:hidden">Wrong</span>
          </Button>
          <Button
            onClick={onCorrect}
            className="flex-1 bg-green-600 hover:bg-green-700 text-sm sm:text-base py-2 sm:py-3"
          >
            <Check className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Got It!</span>
            <span className="xs:hidden">Correct</span>
          </Button>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center px-2 pb-4">
        <Button
          onClick={onPrevious}
          variant="outline"
          disabled={currentIndex === 0}
          className="flex items-center gap-1 sm:gap-2 text-sm px-3 sm:px-4"
        >
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden xs:inline">Previous</span>
          <span className="xs:hidden">Prev</span>
        </Button>
        
        <div className="text-xs sm:text-sm text-gray-600 px-2">
          {currentIndex + 1} / {totalCards}
        </div>
        
        <Button
          onClick={onNext}
          disabled={currentIndex === totalCards - 1}
          className="flex items-center gap-1 sm:gap-2 text-sm px-3 sm:px-4"
        >
          <span className="hidden xs:inline">Next</span>
          <span className="xs:hidden">Next</span>
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MobileFlashcardLayout;
