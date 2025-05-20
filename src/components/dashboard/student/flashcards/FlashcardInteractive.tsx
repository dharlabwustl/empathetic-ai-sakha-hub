
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RotateCw, ArrowLeft, ArrowRight, XCircle, CheckCircle, SkipForward } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface FlashcardInteractiveProps {
  cards: Array<{
    id: string;
    front: string;
    back: string;
    mastered?: boolean;
  }>;
  onComplete: () => void;
  onNextCardSet?: () => void;
  onMastered?: (id: string, mastered: boolean) => void;
}

const FlashcardInteractive: React.FC<FlashcardInteractiveProps> = ({
  cards,
  onComplete,
  onNextCardSet,
  onMastered
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mastered, setMastered] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState(0);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Initialize mastery status from props
    const initialMastery: Record<string, boolean> = {};
    cards.forEach(card => {
      initialMastery[card.id] = card.mastered || false;
    });
    setMastered(initialMastery);
    
    // Calculate initial progress
    const masteredCount = Object.values(initialMastery).filter(Boolean).length;
    setProgress((masteredCount / cards.length) * 100);
  }, [cards]);
  
  const handleNextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    } else {
      // End of deck
      onComplete();
    }
  };
  
  const handlePreviousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false);
    }
  };
  
  const handleFlip = () => {
    setFlipped(!flipped);
  };
  
  const handleMarkMastered = (id: string, masteredStatus: boolean) => {
    const updatedMastery = { ...mastered, [id]: masteredStatus };
    setMastered(updatedMastery);
    
    // Calculate new progress
    const masteredCount = Object.values(updatedMastery).filter(Boolean).length;
    setProgress((masteredCount / cards.length) * 100);
    
    // Call the callback if provided
    if (onMastered) {
      onMastered(id, masteredStatus);
    }
    
    // Move to next card
    handleNextCard();
  };
  
  const handleReset = () => {
    setCurrentIndex(0);
    setFlipped(false);
  };
  
  const handleSkip = () => {
    handleNextCard();
  };
  
  // Check if we have cards
  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h3 className="text-xl font-medium mb-2">No flashcards available</h3>
        <p className="text-muted-foreground mb-4">This deck doesn't have any cards yet.</p>
        {onNextCardSet && (
          <Button onClick={onNextCardSet}>
            Try Another Deck
          </Button>
        )}
      </div>
    );
  }
  
  const currentCard = cards[currentIndex];
  
  return (
    <div className="flex flex-col">
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium">
            Card {currentIndex + 1} of {cards.length}
          </span>
          <span className="text-xs font-medium">
            {Math.round(progress)}% Mastered
          </span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>
      
      {/* Flashcard */}
      <div className="perspective-1000 mb-4">
        <div 
          className={`relative transition-transform duration-500 transform-style-3d cursor-pointer h-[250px] sm:h-[300px] md:h-[400px] ${flipped ? 'rotate-y-180' : ''}`}
          onClick={handleFlip}
        >
          {/* Front of card */}
          <Card className={`absolute inset-0 backface-hidden ${flipped ? 'hidden' : ''} flex items-center justify-center`}>
            <CardContent className="text-center p-6">
              <div className="text-sm text-muted-foreground mb-2">Question</div>
              <div className="text-xl sm:text-2xl font-medium">{currentCard.front}</div>
              <div className="text-sm text-muted-foreground mt-4 animate-pulse">Tap to flip</div>
            </CardContent>
          </Card>
          
          {/* Back of card */}
          <Card 
            className={`absolute inset-0 backface-hidden rotate-y-180 ${!flipped ? 'hidden' : ''} flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20`}
          >
            <CardContent className="text-center p-6">
              <div className="text-sm text-muted-foreground mb-2">Answer</div>
              <div className="text-lg sm:text-xl">{currentCard.back}</div>
              <div className="text-sm text-muted-foreground mt-4 animate-pulse">Tap to flip back</div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Controls */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <Button 
          variant="outline" 
          onClick={handlePreviousCard}
          disabled={currentIndex === 0}
          size={isMobile ? "sm" : "default"}
        >
          <ArrowLeft className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} />
          <span className={isMobile ? 'text-xs' : ''}>Previous</span>
        </Button>
        
        <Button 
          variant="outline" 
          onClick={handleFlip}
          size={isMobile ? "sm" : "default"}
        >
          <RotateCw className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} />
          <span className={isMobile ? 'text-xs' : ''}>Flip</span>
        </Button>
        
        <Button 
          variant="outline" 
          onClick={handleSkip}
          size={isMobile ? "sm" : "default"}
        >
          <span className={isMobile ? 'text-xs' : ''}>Skip</span>
          <SkipForward className={`${isMobile ? 'h-3 w-3 ml-1' : 'h-4 w-4 ml-2'}`} />
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <Button 
          onClick={() => handleMarkMastered(currentCard.id, false)}
          className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
          size={isMobile ? "sm" : "default"}
        >
          <XCircle className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} />
          <span className={isMobile ? 'text-xs' : ''}>Still Learning</span>
        </Button>
        
        <Button 
          onClick={() => handleMarkMastered(currentCard.id, true)}
          className="bg-green-50 hover:bg-green-100 text-green-600 border border-green-200"
          size={isMobile ? "sm" : "default"}
        >
          <CheckCircle className={`${isMobile ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} />
          <span className={isMobile ? 'text-xs' : ''}>Got It!</span>
        </Button>
      </div>
      
      <div className="flex justify-center mt-4">
        <Button 
          variant="ghost" 
          onClick={handleReset}
          size={isMobile ? "sm" : "default"}
          className={isMobile ? 'text-xs' : ''}
        >
          <RotateCw className="mr-1 h-3 w-3" />
          Restart Deck
        </Button>
      </div>
      
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default FlashcardInteractive;
