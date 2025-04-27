
import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, X, ChevronLeft, ChevronRight, Refresh, Clock, Book, Star, Home } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isStarred?: boolean;
}

// Mock data - in a real app this would come from an API
const mockFlashcards: Record<string, { 
  title: string;
  subject: string;
  cards: Flashcard[];
}> = {
  "physics-mechanics": {
    title: "Physics Mechanics",
    subject: "Physics",
    cards: [
      { 
        id: "1", 
        front: "What is Newton's First Law?", 
        back: "An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an external force.", 
        difficulty: "medium" 
      },
      { 
        id: "2", 
        front: "What is Newton's Second Law?", 
        back: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. F = ma", 
        difficulty: "medium" 
      },
      { 
        id: "3", 
        front: "What is Newton's Third Law?", 
        back: "For every action, there is an equal and opposite reaction.", 
        difficulty: "easy" 
      },
      { 
        id: "4", 
        front: "Define momentum", 
        back: "Momentum is the product of an object's mass and velocity. p = mv", 
        difficulty: "easy" 
      },
      { 
        id: "5", 
        front: "What is the principle of conservation of momentum?", 
        back: "The total momentum of an isolated system remains constant if no external forces act on the system.", 
        difficulty: "hard" 
      }
    ]
  },
  "chemistry-organic": {
    title: "Organic Chemistry",
    subject: "Chemistry",
    cards: [
      { 
        id: "1", 
        front: "What are alkanes?", 
        back: "Alkanes are saturated hydrocarbons with single bonds between carbon atoms.", 
        difficulty: "easy" 
      },
      { 
        id: "2", 
        front: "Define functional group in organic chemistry", 
        back: "A functional group is a specific group of atoms within a molecule that is responsible for the characteristic chemical reactions of that molecule.", 
        difficulty: "medium" 
      },
      { 
        id: "3", 
        front: "What is isomerism?", 
        back: "Isomerism is the phenomenon where two or more compounds have the same molecular formula but different structural arrangements.", 
        difficulty: "hard" 
      }
    ]
  }
};

export default function FlashcardInteractive() {
  const { deckId } = useParams<{ deckId: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set());
  const [reviewLater, setReviewLater] = useState<Set<string>>(new Set());
  const [starredCards, setStarredCards] = useState<Set<string>>(new Set());
  const [studyTime, setStudyTime] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const deckData = deckId && mockFlashcards[deckId] ? mockFlashcards[deckId] : {
    title: "Unknown Deck",
    subject: "Unknown Subject",
    cards: []
  };
  
  const { title, subject, cards } = deckData;
  const currentCard = cards[currentIndex] || null;
  
  // Timer effect
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setStudyTime(prev => prev + 1);
    }, 1000);
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      setShowComplete(true);
    }
  };
  
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };
  
  const handleKnown = () => {
    if (currentCard) {
      setKnownCards(prev => {
        const newSet = new Set(prev);
        newSet.add(currentCard.id);
        return newSet;
      });
      handleNext();
    }
  };
  
  const handleUnknown = () => {
    if (currentCard) {
      setKnownCards(prev => {
        const newSet = new Set(prev);
        newSet.delete(currentCard.id);
        return newSet;
      });
      setReviewLater(prev => {
        const newSet = new Set(prev);
        newSet.add(currentCard.id);
        return newSet;
      });
      handleNext();
    }
  };
  
  const toggleStar = () => {
    if (currentCard) {
      setStarredCards(prev => {
        const newSet = new Set(prev);
        if (newSet.has(currentCard.id)) {
          newSet.delete(currentCard.id);
        } else {
          newSet.add(currentCard.id);
        }
        return newSet;
      });
    }
  };
  
  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowComplete(false);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const progressPercentage = (cards.length > 0 ? 
    ((currentIndex + (showComplete ? 1 : 0)) / cards.length) * 100 : 0);
    
  // If we're showing the completion screen
  if (showComplete) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <Link to="/dashboard/student/flashcards" className="flex items-center text-sm font-medium text-blue-600">
            <Home className="mr-1 h-4 w-4" />
            Back to Flashcard Decks
          </Link>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <Clock className="h-3.5 w-3.5 mr-1" /> Study Time: {formatTime(studyTime)}
          </Badge>
        </div>
          
        <Card className="overflow-hidden border-t-4 border-t-green-500 bg-white dark:bg-gray-800 shadow-lg">
          <div className="bg-green-50 dark:bg-green-900/20 p-8 text-center">
            <div className="inline-block p-4 bg-green-100 dark:bg-green-800/30 rounded-full mb-4">
              <Check className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 dark:text-green-300">Congratulations!</h2>
            <p className="text-green-700 dark:text-green-400 mt-2">
              You've completed all {cards.length} flashcards in this deck.
            </p>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg border p-4 shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Known</h3>
                <p className="text-2xl font-bold">{knownCards.size}</p>
                <p className="text-xs text-gray-500">
                  {Math.round((knownCards.size / cards.length) * 100)}% of cards
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg border p-4 shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Need Review</h3>
                <p className="text-2xl font-bold">{reviewLater.size}</p>
                <p className="text-xs text-gray-500">
                  {Math.round((reviewLater.size / cards.length) * 100)}% of cards
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg border p-4 shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Starred</h3>
                <p className="text-2xl font-bold">{starredCards.size}</p>
                <p className="text-xs text-gray-500">
                  {Math.round((starredCards.size / cards.length) * 100)}% of cards
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleRestart}
              className="flex items-center"
            >
              <Refresh className="mr-2 h-4 w-4" />
              Study Again
            </Button>
            <Link to="/dashboard/student/flashcards">
              <Button 
                size="lg" 
                className="w-full sm:w-auto flex items-center bg-gradient-to-r from-blue-500 to-violet-500"
              >
                <Book className="mr-2 h-4 w-4" />
                Back to Decks
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }
  
  // If no flashcard available
  if (!currentCard) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold">No flashcards available</h2>
          <p className="mt-2 text-gray-500">This deck doesn't have any flashcards yet.</p>
          <Link to="/dashboard/student/flashcards" className="mt-4 inline-block">
            <Button>Back to Flashcards</Button>
          </Link>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{subject}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Card {currentIndex + 1} of {cards.length}
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            <Clock className="h-3.5 w-3.5 mr-1" /> {formatTime(studyTime)}
          </Badge>
        </div>
      </div>
      
      <div className="mb-6">
        <Progress value={progressPercentage} className="h-2" />
      </div>
      
      <div className="relative mb-8" style={{ perspective: "1000px" }}>
        <AnimatePresence>
          <motion.div
            key={`card-${currentIndex}-${isFlipped ? 'back' : 'front'}`}
            initial={{ opacity: 0, rotateY: isFlipped ? -90 : 0 }}
            animate={{ opacity: 1, rotateY: isFlipped ? 180 : 0 }}
            exit={{ opacity: 0, rotateY: isFlipped ? 0 : 90 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
            style={{ transformStyle: "preserve-3d" }}
            className="cursor-pointer"
            onClick={handleFlip}
          >
            <Card className={`bg-white dark:bg-gray-800 min-h-[300px] md:min-h-[400px] flex flex-col p-6 shadow-lg ${
              currentCard.difficulty === 'easy' ? 'border-t-4 border-t-green-500' : 
              currentCard.difficulty === 'medium' ? 'border-t-4 border-t-amber-500' : 
              'border-t-4 border-t-red-500'
            }`}>
              <div className="flex justify-between items-start mb-4">
                <Badge className={`
                  ${currentCard.difficulty === 'easy' ? 'bg-green-100 text-green-800 border-green-200' : 
                    currentCard.difficulty === 'medium' ? 'bg-amber-100 text-amber-800 border-amber-200' : 
                    'bg-red-100 text-red-800 border-red-200'}
                `}>
                  {currentCard.difficulty.charAt(0).toUpperCase() + currentCard.difficulty.slice(1)}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStar();
                  }}
                >
                  <Star 
                    className={`h-5 w-5 ${starredCards.has(currentCard.id) ? 'text-amber-500 fill-amber-500' : 'text-gray-400'}`}
                  />
                </Button>
              </div>
              
              <div className="flex-grow flex items-center justify-center text-center p-4">
                <div className="max-w-lg">
                  <p className="text-xl md:text-2xl font-medium">
                    {isFlipped ? currentCard.back : currentCard.front}
                  </p>
                  {!isFlipped && (
                    <p className="mt-4 text-sm text-muted-foreground">Click to flip</p>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center justify-center"
        >
          <ChevronLeft className="mr-1 h-5 w-5" />
          Previous
        </Button>
        
        <Button
          variant="outline" 
          onClick={handleNext}
          className="flex items-center justify-center"
        >
          Next
          <ChevronRight className="ml-1 h-5 w-5" />
        </Button>
        
        <Button
          variant="default"
          onClick={handleKnown}
          className="flex items-center justify-center bg-green-600 hover:bg-green-700"
        >
          <Check className="mr-1 h-5 w-5" />
          I Know This
        </Button>
        
        <Button
          variant="default"
          onClick={handleUnknown}
          className="flex items-center justify-center bg-amber-600 hover:bg-amber-700"
        >
          <X className="mr-1 h-5 w-5" />
          Review Later
        </Button>
      </div>
    </div>
  );
}
