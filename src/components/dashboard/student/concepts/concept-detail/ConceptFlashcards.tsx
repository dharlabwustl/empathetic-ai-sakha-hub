
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, RefreshCw, ArrowLeft, ArrowRight, Plus, RotateCw,
  CheckCircle, XCircle 
} from 'lucide-react';

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
        <h2 className="text-xl font-bold flex items-center">
          <BarChart className="h-5 w-5 mr-2 text-green-600" /> 
          Flashcards
        </h2>
        
        <Button 
          variant="outline" 
          onClick={resetCards} 
          className="flex items-center gap-1"
        >
          <RefreshCw className="h-4 w-4" /> Reset
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium">Progress</div>
          <div className="text-sm">{flashcardsCompleted} of {flashcardsTotal} cards</div>
        </div>
        <Progress value={(flashcardsCompleted / flashcardsTotal) * 100} className="h-2" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-green-50 dark:bg-green-900/20">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-green-700 dark:text-green-400">{flashcardsTotal}</div>
            <div className="text-sm text-green-600 dark:text-green-500">Total Cards</div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 dark:bg-blue-900/20">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">{flashcardsCompleted}</div>
            <div className="text-sm text-blue-600 dark:text-blue-500">Mastered</div>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-50 dark:bg-amber-900/20">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-amber-700 dark:text-amber-400">
              {flashcardsTotal - flashcardsCompleted}
            </div>
            <div className="text-sm text-amber-600 dark:text-amber-500">To Review</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-center mb-6">
        <motion.div 
          className="w-full max-w-lg h-80 cursor-pointer"
          onClick={handleFlipCard}
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ perspective: 1000 }}
        >
          <div className="w-full h-full relative preserve-3d">
            {/* Front of card */}
            <motion.div
              className={`absolute w-full h-full backface-hidden rounded-xl flex items-center justify-center p-8 ${
                isFlipped ? 'hidden' : 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40 shadow-lg border border-blue-100 dark:border-blue-800'
              }`}
            >
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-2">Question</div>
                <h3 className="text-2xl font-bold">{currentCard.front}</h3>
                <div className="mt-6 text-sm text-blue-600">Click to reveal answer</div>
              </div>
            </motion.div>
            
            {/* Back of card */}
            <motion.div
              className={`absolute w-full h-full backface-hidden rounded-xl flex items-center justify-center p-8 ${
                !isFlipped ? 'hidden' : 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/40 dark:to-pink-900/40 shadow-lg border border-purple-100 dark:border-purple-800'
              }`}
              style={{ transform: 'rotateY(180deg)' }}
            >
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-2">Answer</div>
                <p className="text-xl">{currentCard.back}</p>
                <div className="mt-6 text-sm text-purple-600">Click to see question</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <div className="flex justify-center items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          onClick={handlePreviousCard}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> Previous
        </Button>
        
        <Button
          onClick={handleFlipCard}
          className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700"
        >
          <RotateCw className="h-4 w-4" /> Flip Card
        </Button>
        
        <Button 
          variant="outline" 
          onClick={handleNextCard}
          className="flex items-center gap-1"
        >
          Next <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex justify-center gap-4">
        <Button 
          variant="outline" 
          className="border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <XCircle className="h-4 w-4 mr-1" /> Don't Know
        </Button>
        <Button 
          variant="outline" 
          className="border-green-300 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
        >
          <CheckCircle className="h-4 w-4 mr-1" /> Got It
        </Button>
      </div>
      
      <div className="mt-6 text-center">
        <Button variant="outline" className="flex items-center gap-1 mx-auto">
          <Plus className="h-4 w-4" /> Create New Card
        </Button>
      </div>
      
      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default ConceptFlashcards;
