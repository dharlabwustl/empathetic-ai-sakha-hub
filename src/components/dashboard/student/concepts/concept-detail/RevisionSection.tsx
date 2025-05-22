
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, RotateCw, CheckCircle2, XCircle, BookOpen, Brain, Timer } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import '@/styles/flashcard-animations.css';

interface RevisionSectionProps {
  conceptId: string;
  isFlagged: boolean;
  onToggleFlag: () => void;
}

const RevisionSection: React.FC<RevisionSectionProps> = ({
  conceptId,
  isFlagged,
  onToggleFlag
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [reviewedCards, setReviewedCards] = useState<Set<number>>(new Set());
  const [timerActive, setTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  
  // In a real app, this would come from your spaced repetition algorithm
  const nextRevisionData = {
    date: "Tomorrow",
    time: "10:00 AM",
  };

  // Mock practice questions for flashcards
  const flashcards = [
    {
      id: 1,
      question: "What happens to an object in motion when no external force acts on it?",
      answer: "It continues to move at constant velocity in a straight line (Newton's First Law)."
    },
    {
      id: 2,
      question: "How is force related to mass and acceleration?",
      answer: "Force equals mass times acceleration (F = ma), which is Newton's Second Law."
    },
    {
      id: 3,
      question: "When one object exerts a force on another, what happens?",
      answer: "The second object exerts an equal and opposite force on the first object (Newton's Third Law)."
    }
  ];

  // Reset timer when card changes
  useEffect(() => {
    if (timerActive) {
      setTimeRemaining(30);
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [flashcardIndex, timerActive]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev + 1) % flashcards.length);
    setShowAnswer(false);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setShowAnswer(false);
  };

  const handleKnowCard = () => {
    const updatedReviewed = new Set(reviewedCards);
    updatedReviewed.add(flashcardIndex);
    setReviewedCards(updatedReviewed);
    setScore(prev => prev + 1);
    
    // Move to next card
    handleNextCard();
  };

  const handleDontKnowCard = () => {
    const updatedReviewed = new Set(reviewedCards);
    updatedReviewed.add(flashcardIndex);
    setReviewedCards(updatedReviewed);
    
    // Move to next card
    handleNextCard();
  };

  const startTimer = () => {
    setTimerActive(true);
  };

  const currentFlashcard = flashcards[flashcardIndex];
  const progressPercentage = reviewedCards.size > 0 ? (score / reviewedCards.size) * 100 : 0;

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
          Revision Schedule
        </h3>
        
        <div className="space-y-3">
          {isFlagged ? (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Calendar className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                  <span>Next revision:</span>
                </div>
                <span className="text-sm font-medium">{nextRevisionData.date}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Clock className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                  <span>Suggested time:</span>
                </div>
                <span className="text-sm font-medium">{nextRevisionData.time}</span>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-2 justify-center text-amber-600 border-amber-200 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-900/20"
                onClick={onToggleFlag}
              >
                Remove from Revision
              </Button>
            </>
          ) : (
            <div className="text-center py-3">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Add this concept to your revision schedule to improve retention.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-center"
                onClick={onToggleFlag}
              >
                Add to Revision Schedule
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Revision Flashcard */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 flex items-center">
            <Brain className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" /> 
            Knowledge Check
          </h3>
          <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/30">
            {flashcardIndex + 1}/{flashcards.length}
          </Badge>
        </div>
        
        {/* Flashcard progress */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Mastery: {Math.round(progressPercentage)}%</span>
            {timerActive && <span>Time: {timeRemaining}s</span>}
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-1.5 bg-gray-100 dark:bg-gray-700" 
          />
        </div>
        
        {/* 3D Flashcard */}
        <div 
          className="perspective-1000 mb-4 cursor-pointer" 
          onClick={handleFlip}
          style={{ height: '180px' }}
        >
          <div className={`flashcard-3d relative w-full h-full ${isFlipped ? 'flipped' : ''}`}>
            {/* Front of card (Question) */}
            <div className="flashcard-face flashcard-front absolute w-full h-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/50 flex flex-col justify-between">
              <div>
                <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-2">QUESTION</div>
                <p className="text-gray-800 dark:text-gray-200">{currentFlashcard.question}</p>
              </div>
              <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
                Click to reveal answer
              </div>
            </div>
            
            {/* Back of card (Answer) */}
            <div className="flashcard-face flashcard-back absolute w-full h-full bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800/50 flex flex-col justify-between">
              <div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mb-2">ANSWER</div>
                <p className="text-gray-800 dark:text-gray-200">{currentFlashcard.answer}</p>
              </div>
              <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
                Click to see question
              </div>
            </div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-600 dark:text-gray-400"
              onClick={handlePrevCard}
            >
              Previous
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-600 dark:text-gray-400"
              onClick={handleNextCard}
            >
              Next
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-1">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
              onClick={handleDontKnowCard}
            >
              <XCircle className="h-3 w-3 mr-1" />
              Don't Know
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/20"
              onClick={handleKnowCard}
            >
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Know It
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="mt-2 text-gray-600 dark:text-gray-400 gap-1.5"
            onClick={startTimer}
            disabled={timerActive}
          >
            <Timer className="h-3 w-3" />
            {timerActive ? `Time: ${timeRemaining}s` : "Start Timer Challenge"}
          </Button>
        </div>
      </div>
      
      {/* Study Resources */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
          Related Resources
        </h3>
        
        <ul className="space-y-2 text-sm">
          <li className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></div>
            <a href="#">Interactive simulation: Forces and Motion</a>
          </li>
          <li className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></div>
            <a href="#">Video: Newton's Laws in Real Life</a>
          </li>
          <li className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></div>
            <a href="#">Practice problems: Newton's Laws</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RevisionSection;
