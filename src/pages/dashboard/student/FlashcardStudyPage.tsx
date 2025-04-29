
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, RotateCw, Check, X } from 'lucide-react';

const FlashcardStudyPage = () => {
  const { deckId } = useParams();
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Mock data for flashcards
  const flashcards = [
    {
      id: '1',
      question: 'What is the formula for the Pythagorean theorem?',
      answer: 'a² + b² = c²'
    },
    {
      id: '2',
      question: 'What is the quadratic formula?',
      answer: 'x = (-b ± √(b² - 4ac)) / 2a'
    },
    {
      id: '3',
      question: 'What is Newton\'s second law of motion?',
      answer: 'F = ma (Force equals mass times acceleration)'
    }
  ];
  
  const totalCards = flashcards.length;
  
  const handleNext = () => {
    if (currentCard < totalCards - 1) {
      setCurrentCard(currentCard + 1);
      setFlipped(false);
      setProgress(((currentCard + 1) / (totalCards - 1)) * 100);
    }
  };
  
  const handlePrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setFlipped(false);
      setProgress(((currentCard - 1) / (totalCards - 1)) * 100);
    }
  };
  
  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <SharedPageLayout 
      title="Flashcard Study" 
      subtitle="Mathematics Deck"
      showQuickAccess={false}
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-500">
            Card {currentCard + 1} of {totalCards}
          </div>
          <div className="w-1/2">
            <Progress value={progress} className="h-2" />
          </div>
          <Button variant="outline" size="sm">End Session</Button>
        </div>
        
        <div 
          className="relative w-full h-[400px] cursor-pointer"
          onClick={handleFlip}
        >
          <Card className={`absolute inset-0 p-8 flex flex-col items-center justify-center transition-opacity duration-300 ${flipped ? 'opacity-0' : 'opacity-100'}`}>
            <p className="text-sm text-gray-500 mb-4">Question:</p>
            <h3 className="text-2xl font-bold text-center mb-8">{flashcards[currentCard].question}</h3>
            <p className="text-gray-500 italic">Click to flip</p>
          </Card>
          
          <Card className={`absolute inset-0 p-8 flex flex-col items-center justify-center transition-opacity duration-300 ${flipped ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-sm text-gray-500 mb-4">Answer:</p>
            <h3 className="text-2xl font-bold text-center mb-8">{flashcards[currentCard].answer}</h3>
            <p className="text-gray-500 italic">Click to flip</p>
          </Card>
        </div>
        
        <div className="mt-8 flex justify-between items-center">
          <Button variant="outline" onClick={handlePrevious} disabled={currentCard === 0}>
            <ChevronLeft size={18} className="mr-1" />
            Previous
          </Button>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleFlip}>
              <RotateCw size={18} className="mr-2" />
              Flip
            </Button>
            
            <Button variant="outline" className="text-red-500 border-red-200">
              <X size={18} className="mr-2" />
              Didn't Know
            </Button>
            
            <Button variant="outline" className="text-green-500 border-green-200">
              <Check size={18} className="mr-2" />
              Knew It
            </Button>
          </div>
          
          <Button variant="outline" onClick={handleNext} disabled={currentCard === totalCards - 1}>
            Next
            <ChevronRight size={18} className="ml-1" />
          </Button>
        </div>
        
        <div className="mt-12 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Study Tips</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Try to recall the answer before flipping the card</li>
            <li>Space out your study sessions for better retention</li>
            <li>Review cards you struggled with more frequently</li>
            <li>Try explaining the concepts in your own words</li>
          </ul>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default FlashcardStudyPage;
