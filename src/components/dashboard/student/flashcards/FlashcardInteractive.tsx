
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, X, ArrowLeft, ArrowRight, Bookmark, RefreshCw, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  imageUrl?: string;
}

const FlashcardInteractive: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock flashcard data
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    {
      id: '1',
      front: "What is Newton's First Law of Motion?",
      back: "An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an unbalanced force.",
      difficulty: 'medium',
      tags: ['physics', 'mechanics', 'newton']
    },
    {
      id: '2',
      front: "What is Newton's Second Law of Motion?",
      back: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. F = ma",
      difficulty: 'medium',
      tags: ['physics', 'mechanics', 'newton']
    },
    {
      id: '3',
      front: "What is Newton's Third Law of Motion?",
      back: "For every action, there is an equal and opposite reaction.",
      difficulty: 'easy',
      tags: ['physics', 'mechanics', 'newton']
    },
    {
      id: '4',
      front: "What is the formula for kinetic energy?",
      back: "Kinetic Energy (KE) = ½mv², where m is mass and v is velocity.",
      difficulty: 'medium',
      tags: ['physics', 'energy', 'formulas']
    },
    {
      id: '5',
      front: "What is the formula for gravitational potential energy?",
      back: "Gravitational Potential Energy (GPE) = mgh, where m is mass, g is gravitational acceleration, and h is height.",
      difficulty: 'medium',
      tags: ['physics', 'energy', 'formulas']
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [shuffleMode, setShuffleMode] = useState(false);
  const [knownCards, setKnownCards] = useState<Record<string, boolean>>({});
  
  const currentCard = flashcards[currentIndex];
  const progress = ((currentIndex + 1) / flashcards.length) * 100;
  
  // Count of cards marked as "known"
  const knownCount = Object.values(knownCards).filter(Boolean).length;
  
  const handleFlip = () => {
    setShowAnswer(false);
    setFlipped(!flipped);
  };
  
  const handleRevealAnswer = () => {
    setShowAnswer(true);
  };
  
  const handleMarkKnown = () => {
    setKnownCards(prev => ({ ...prev, [currentCard.id]: true }));
    handleNext();
    
    if (currentIndex === flashcards.length - 1) {
      toast({
        title: "Deck completed!",
        description: `You've finished studying this deck.`,
      });
    }
  };
  
  const handleMarkUnknown = () => {
    setKnownCards(prev => ({ ...prev, [currentCard.id]: false }));
    handleNext();
  };
  
  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
      setShowAnswer(false);
    }
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false);
      setShowAnswer(false);
    }
  };
  
  const handleShuffle = () => {
    const shuffledCards = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffledCards);
    setCurrentIndex(0);
    setFlipped(false);
    setShowAnswer(false);
    setShuffleMode(true);
    
    toast({
      title: "Cards shuffled",
      description: "Flashcards have been randomly reordered.",
    });
  };
  
  const handleToggleReviewMode = () => {
    setReviewMode(!reviewMode);
    setCurrentIndex(0);
    setFlipped(false);
    setShowAnswer(false);
    
    toast({
      title: reviewMode ? "Normal mode activated" : "Review mode activated",
      description: reviewMode 
        ? "Studying all cards in sequence." 
        : "Now focusing only on cards you marked as difficult.",
    });
  };
  
  const deckInfo = {
    title: `Physics Concepts: ${deckId}`,
    totalCards: flashcards.length,
    description: "Key concepts and formulas in classical mechanics focusing on Newton's laws."
  };
  
  return (
    <SharedPageLayout
      title={deckInfo.title}
      subtitle={`Flashcards • ${deckInfo.totalCards} cards • Interactive mode`}
      showBackButton
      backButtonUrl="/dashboard/student/flashcards"
    >
      <div className="space-y-6">
        {/* Progress and controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleShuffle}
              className="gap-1"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>{shuffleMode ? 'Reshuffle' : 'Shuffle'}</span>
            </Button>
            <Button 
              variant={reviewMode ? "default" : "outline"} 
              size="sm" 
              onClick={handleToggleReviewMode}
              className="gap-1"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Review Mode</span>
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            Card {currentIndex + 1} of {flashcards.length}
          </div>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-6">
          <div 
            className="bg-green-500 h-1.5 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Flashcard */}
        <div className="flex justify-center mb-6">
          <div 
            className="w-full max-w-2xl perspective h-[350px] sm:h-[400px] cursor-pointer"
            onClick={handleFlip}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={flipped ? 'back' : 'front'}
                initial={{ rotateY: flipped ? -90 : 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: flipped ? 90 : -90, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className={cn(
                  "w-full h-full rounded-xl shadow-lg flex flex-col items-center justify-center p-8 sm:p-10 text-center",
                  flipped 
                    ? "bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50" 
                    : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                )}
              >
                {flipped ? (
                  <div className="space-y-6">
                    <p className="text-lg sm:text-xl font-medium text-indigo-700 dark:text-indigo-300">{currentCard.back}</p>
                    
                    {!showAnswer && (
                      <Button variant="outline" onClick={handleRevealAnswer} className="mt-4">
                        Show Answer Details
                      </Button>
                    )}
                    
                    {showAnswer && (
                      <div className="opacity-animation mt-4 text-sm text-gray-700 dark:text-gray-300">
                        <p>Additional explanation would appear here...</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-medium">{currentCard.front}</h3>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      {currentCard.tags.map(tag => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">Tap to see answer</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        {/* Control buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Button variant="outline" onClick={handlePrevious} disabled={currentIndex === 0} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <Button variant="outline" onClick={handleNext} disabled={currentIndex === flashcards.length - 1} className="gap-2">
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleMarkUnknown} 
            className="bg-red-50 hover:bg-red-100 text-red-600 border-red-100 dark:bg-red-900/20 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/30 gap-2"
          >
            <X className="h-4 w-4" />
            Don't Know
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleMarkKnown} 
            className="bg-green-50 hover:bg-green-100 text-green-600 border-green-100 dark:bg-green-900/20 dark:border-green-900/30 dark:text-green-400 dark:hover:bg-green-900/30 gap-2"
          >
            <Check className="h-4 w-4" />
            Know It
          </Button>
        </div>
        
        {/* Summary Card */}
        <Card className="bg-muted/50 mt-6">
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Study Progress</h3>
              <span className="text-sm">{knownCount} of {flashcards.length} mastered</span>
            </div>
            <Progress value={(knownCount / flashcards.length) * 100} className="h-2" />
            <div className="mt-4 text-sm text-muted-foreground">
              {knownCount === flashcards.length ? (
                <p>Great job! You've mastered all cards in this deck.</p>
              ) : (
                <p>Keep going! You're making good progress.</p>
              )}
            </div>
          </div>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default FlashcardInteractive;
