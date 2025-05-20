
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, RefreshCw, ArrowLeft, ArrowRight, Plus, RotateCw,
  CheckCircle, XCircle 
} from 'lucide-react';
import '@/styles/flashcard-animations.css';

interface ConceptFlashcardsProps {
  flashcardsTotal: number;
  flashcardsCompleted: number;
}

const ConceptFlashcards: React.FC<ConceptFlashcardsProps> = ({
  flashcardsTotal,
  flashcardsCompleted
}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Mock flashcards - in a real app this would come from an API
  const flashcards = [
    {
      id: "f1", 
      front: "What is Newton's Second Law?", 
      back: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass."
    },
    {
      id: "f2", 
      front: "What is the formula for Newton's Second Law?", 
      back: "F = ma"
    },
    {
      id: "f3", 
      front: "What is the SI unit of force?", 
      back: "Newton (N)"
    }
  ];
  
  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };
  
  const handleNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      // Wrap around to the first card
      setCurrentCardIndex(0);
      setIsFlipped(false);
    }
  };
  
  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    } else {
      // Wrap around to the last card
      setCurrentCardIndex(flashcards.length - 1);
      setIsFlipped(false);
    }
  };
  
  const resetCards = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };
  
  const currentCard = flashcards[currentCardIndex];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-medium flex items-center">
          <BarChart className="h-4 w-4 mr-2 text-green-600" /> 
          Flashcards
        </h2>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={resetCards} 
          className="h-7 text-xs px-2"
        >
          <RefreshCw className="h-3 w-3 mr-1" /> Reset
        </Button>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between items-center text-xs mb-1">
          <div>Progress</div>
          <div>{flashcardsCompleted} of {flashcardsTotal}</div>
        </div>
        <Progress value={(flashcardsCompleted / flashcardsTotal) * 100} className="h-1" />
      </div>
      
      <div className="flex justify-center">
        <div 
          className="w-full h-28 cursor-pointer perspective-1000"
          onClick={handleFlipCard}
        >
          <div className="relative w-full h-full transform-style-preserve-3d transition-transform duration-500" 
               style={{ transform: isFlipped ? 'rotateY(180deg)' : '' }}>
            {/* Front of card */}
            <div className={`absolute w-full h-full backface-hidden rounded-lg flex items-center justify-center p-4 
                           bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40 
                           border border-blue-100 dark:border-blue-800`}>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Question</div>
                <div className="text-sm font-medium">{currentCard.front}</div>
              </div>
            </div>
            
            {/* Back of card */}
            <div className={`absolute w-full h-full backface-hidden rounded-lg flex items-center justify-center p-4 
                           bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/40 dark:to-pink-900/40 
                           border border-purple-100 dark:border-purple-800 rotate-y-180`}>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Answer</div>
                <p className="text-sm">{currentCard.back}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-xs">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handlePreviousCard}
          className="h-6 px-2"
        >
          <ArrowLeft className="h-3 w-3 mr-1" /> Prev
        </Button>
        
        <Button
          size="sm"
          onClick={handleFlipCard}
          className="h-6 px-2 bg-indigo-600 hover:bg-indigo-700"
        >
          <RotateCw className="h-3 w-3 mr-1" /> Flip
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleNextCard}
          className="h-6 px-2"
        >
          Next <ArrowRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default ConceptFlashcards;
