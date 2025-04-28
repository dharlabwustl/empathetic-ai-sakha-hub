
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CirclePlus, Check, X, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed?: string;
}

interface FlashcardDeck {
  id: string;
  title: string;
  subject: string;
  topic: string;
  description: string;
  totalCards: number;
  cards: Flashcard[];
}

const FlashcardStudyPage = () => {
  const { deckId } = useParams();
  const { toast } = useToast();
  const [deck, setDeck] = useState<FlashcardDeck | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyResults, setStudyResults] = useState({
    correct: 0,
    incorrect: 0,
    skipped: 0
  });
  const [cardsRemaining, setCardsRemaining] = useState<Flashcard[]>([]);
  const [cardsCompleted, setCardsCompleted] = useState<Flashcard[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Mock data fetch
    const fetchData = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const mockDeck: FlashcardDeck = {
          id: deckId || '1',
          title: "Newton's Laws of Motion",
          subject: "Physics",
          topic: "Mechanics",
          description: "Key concepts related to Newton's three laws of motion",
          totalCards: 10,
          cards: Array.from({ length: 10 }, (_, i) => ({
            id: `card-${i}`,
            front: `Question ${i+1}: What is an important aspect of Newton's ${(i % 3) + 1} law of motion?`,
            back: `Newton's ${(i % 3) + 1} law states that ${
              i % 3 === 0 
                ? "an object at rest tends to stay at rest, and an object in motion tends to stay in motion unless acted upon by an external force."
                : i % 3 === 1 
                  ? "the acceleration of an object depends on the force applied and the mass of the object (F = ma)."
                  : "for every action, there is an equal and opposite reaction."
            }`,
            difficulty: i % 3 === 0 ? 'easy' : i % 3 === 1 ? 'medium' : 'hard'
          }))
        };
        setDeck(mockDeck);
        setCardsRemaining(mockDeck.cards);
        setLoading(false);
      }, 500);
    };
    
    fetchData();
  }, [deckId]);

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    if (cardsRemaining.length <= 1) {
      setIsCompleted(true);
      return;
    }

    setIsFlipped(false);
    // Wait for flip animation to complete
    setTimeout(() => {
      if (currentCardIndex < cardsRemaining.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
      } else {
        setCurrentCardIndex(0);
      }
    }, 150);
  };

  const handleCardResponse = (response: 'correct' | 'incorrect' | 'skip') => {
    if (!deck || !cardsRemaining.length) return;
    
    const currentCard = cardsRemaining[currentCardIndex];
    
    // Update study results
    setStudyResults(prev => ({
      ...prev,
      [response]: prev[response as keyof typeof prev] + (response === 'skip' ? 0 : 1),
      skipped: prev.skipped + (response === 'skip' ? 1 : 0)
    }));
    
    // Move card to completed pile
    if (response !== 'skip') {
      setCardsCompleted(prev => [...prev, currentCard]);
      setCardsRemaining(prev => prev.filter((_, idx) => idx !== currentCardIndex));
      
      if (currentCardIndex >= cardsRemaining.length - 1) {
        setCurrentCardIndex(0);
      }
    } else {
      handleNextCard();
    }
    
    // If all cards have been reviewed
    if (response !== 'skip' && cardsRemaining.length === 1) {
      setIsCompleted(true);
      toast({
        title: "Deck Completed!",
        description: `You've finished studying this flashcard deck.`
      });
    }
  };

  const resetStudySession = () => {
    if (!deck) return;
    setIsFlipped(false);
    setCurrentCardIndex(0);
    setCardsRemaining(deck.cards);
    setCardsCompleted([]);
    setStudyResults({
      correct: 0,
      incorrect: 0,
      skipped: 0
    });
    setIsCompleted(false);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!deck) return (
    <div className="max-w-4xl mx-auto p-6">
      <p className="text-center text-muted-foreground">Flashcard deck not found</p>
    </div>
  );

  if (isCompleted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Study Session Complete</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center py-6">
              <h3 className="text-xl font-medium mb-2">Great job!</h3>
              <p className="text-muted-foreground">You've completed all flashcards in this deck</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{studyResults.correct}</p>
                <p className="text-sm text-green-600 dark:text-green-400">Correct</p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{studyResults.incorrect}</p>
                <p className="text-sm text-red-600 dark:text-red-400">Incorrect</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{cardsCompleted.length}</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">Total Reviewed</p>
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <Button onClick={resetStudySession} className="flex items-center">
                <RefreshCw className="h-4 w-4 mr-2" /> Study Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentCard = cardsRemaining[currentCardIndex];
  const progress = cardsCompleted.length / deck.totalCards * 100;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">{deck.title}</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {cardsCompleted.length}/{deck.totalCards} Cards
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Progress
              </span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          {/* Flashcard */}
          {currentCard && (
            <div className="min-h-[300px] mb-6">
              <div 
                className="w-full h-64 cursor-pointer"
                onClick={handleFlipCard}
              >
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={isFlipped ? 'back' : 'front'}
                    initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <Card className="w-full h-full flex items-center justify-center p-6 shadow-lg">
                      <div className="text-center">
                        <div className="text-sm text-gray-500 mb-4">
                          {isFlipped ? 'Answer' : 'Question'}
                        </div>
                        <div className="text-xl font-medium">
                          {isFlipped ? currentCard.back : currentCard.front}
                        </div>
                        <div className="mt-6 text-sm text-gray-400">
                          Click to {isFlipped ? 'see question' : 'reveal answer'}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}
          
          {/* Control buttons */}
          <div className="grid grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600"
              onClick={() => handleCardResponse('incorrect')}
            >
              <X className="h-4 w-4 mr-2" />
              Incorrect
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleCardResponse('skip')}
            >
              <CirclePlus className="h-4 w-4 mr-2" />
              Skip
            </Button>
            <Button 
              variant="outline" 
              className="border-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600"
              onClick={() => handleCardResponse('correct')}
            >
              <Check className="h-4 w-4 mr-2" />
              Correct
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Deck Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><strong>Subject:</strong> {deck.subject}</p>
            <p><strong>Topic:</strong> {deck.topic}</p>
            <p className="text-gray-600 dark:text-gray-400">{deck.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlashcardStudyPage;
