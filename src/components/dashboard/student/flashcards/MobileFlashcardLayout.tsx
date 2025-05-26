
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">Flashcards</h1>
          <p className="text-sm text-gray-600">
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
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
        />
      </div>

      {/* Flashcard */}
      <div className="flex-1 flex items-center justify-center mb-6">
        <motion.div
          className="w-full max-w-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card 
            className="h-80 cursor-pointer shadow-lg"
            onClick={onFlip}
          >
            <CardContent className="h-full p-6 flex flex-col items-center justify-center text-center">
              <AnimatePresence mode="wait">
                {!isFlipped ? (
                  <motion.div
                    key="front"
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <Badge variant="outline" className="mb-4">
                      {currentCard?.subject}
                    </Badge>
                    <h3 className="text-lg font-semibold">
                      {currentCard?.question}
                    </h3>
                    <p className="text-sm text-gray-500 mt-4">
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
                    className="space-y-4"
                  >
                    <Badge variant="secondary" className="mb-4">
                      Answer
                    </Badge>
                    <p className="text-base">
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
          className="flex gap-4 mb-6"
        >
          <Button
            onClick={onIncorrect}
            variant="outline"
            className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
          >
            <X className="h-4 w-4 mr-2" />
            Didn't Know
          </Button>
          <Button
            onClick={onCorrect}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <Check className="h-4 w-4 mr-2" />
            Got It!
          </Button>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          onClick={onPrevious}
          variant="outline"
          disabled={currentIndex === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <Button
          onClick={onNext}
          disabled={currentIndex === totalCards - 1}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MobileFlashcardLayout;
