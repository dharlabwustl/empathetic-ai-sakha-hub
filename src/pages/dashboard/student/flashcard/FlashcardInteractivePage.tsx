
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Check, ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown, RefreshCw, X, Eye, RotateCw, BarChart, Clock } from 'lucide-react';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  lastReviewed?: Date;
  nextReviewDate?: Date;
  mastered: boolean;
  accuracyHistory: boolean[];
}

interface FlashcardDeck {
  id: string;
  title: string;
  subject: string;
  description: string;
  cards: Flashcard[];
}

const FlashcardInteractivePage = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [deck, setDeck] = useState<FlashcardDeck | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showAccuracyDialog, setShowAccuracyDialog] = useState(false);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [studySessionStats, setStudySessionStats] = useState({
    correctAnswers: 0,
    incorrectAnswers: 0,
    skipped: 0,
    timeSpent: 0,
  });

  // Timer for session time tracking
  useEffect(() => {
    const timer = setInterval(() => {
      setStudySessionStats(prev => ({
        ...prev,
        timeSpent: prev.timeSpent + 1
      }));
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Mock load deck data
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockDeck: FlashcardDeck = {
        id: deckId || 'unknown',
        title: "Chemistry Periodic Table",
        subject: "Chemistry",
        description: "Learn the periodic table elements and their properties",
        cards: [
          {
            id: "card-1",
            front: "What is the chemical symbol for Hydrogen?",
            back: "H",
            difficulty: "Easy",
            mastered: false,
            accuracyHistory: [true, true, true]
          },
          {
            id: "card-2",
            front: "What is the atomic number of Carbon?",
            back: "6",
            difficulty: "Easy",
            mastered: false,
            accuracyHistory: [true, false, true]
          },
          {
            id: "card-3",
            front: "Which element has the chemical symbol 'Na'?",
            back: "Sodium",
            difficulty: "Medium",
            mastered: false,
            accuracyHistory: [false, false]
          },
          {
            id: "card-4",
            front: "What is the most electronegative element?",
            back: "Fluorine",
            difficulty: "Hard",
            mastered: false,
            accuracyHistory: []
          },
          {
            id: "card-5",
            front: "Which element is liquid at room temperature and standard pressure?",
            back: "Mercury (Hg) and Bromine (Br)",
            difficulty: "Medium",
            mastered: false,
            accuracyHistory: [true]
          },
          {
            id: "card-6",
            front: "What is the chemical symbol for Gold?",
            back: "Au (from Latin 'Aurum')",
            difficulty: "Easy",
            mastered: false,
            accuracyHistory: [true, true]
          },
          {
            id: "card-7",
            front: "Which element is named after the scientist who discovered radioactivity?",
            back: "Curium (named after Marie Curie)",
            difficulty: "Hard",
            mastered: false,
            accuracyHistory: []
          }
        ]
      };
      
      setDeck(mockDeck);
      setLoading(false);
    }, 1000);
  }, [deckId]);
  
  const handleFlipCard = () => {
    setFlipped(!flipped);
  };
  
  const handleNextCard = () => {
    if (!deck) return;
    
    if (currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex(prevIndex => prevIndex + 1);
      setFlipped(false);
    } else {
      // End of deck
      setShowCompletionDialog(true);
    }
  };
  
  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prevIndex => prevIndex - 1);
      setFlipped(false);
    }
  };
  
  const handleKnewAnswer = () => {
    if (!deck) return;
    
    // Update accuracy history
    const updatedCards = [...deck.cards];
    updatedCards[currentCardIndex].accuracyHistory.push(true);
    
    setDeck({
      ...deck,
      cards: updatedCards
    });
    
    // Update stats
    setStudySessionStats(prev => ({
      ...prev,
      correctAnswers: prev.correctAnswers + 1
    }));
    
    handleNextCard();
  };
  
  const handleDidNotKnow = () => {
    if (!deck) return;
    
    // Update accuracy history
    const updatedCards = [...deck.cards];
    updatedCards[currentCardIndex].accuracyHistory.push(false);
    
    setDeck({
      ...deck,
      cards: updatedCards
    });
    
    // Update stats
    setStudySessionStats(prev => ({
      ...prev,
      incorrectAnswers: prev.incorrectAnswers + 1
    }));
    
    // Show accuracy dialog
    setShowAccuracyDialog(true);
  };
  
  const handleSkip = () => {
    setStudySessionStats(prev => ({
      ...prev,
      skipped: prev.skipped + 1
    }));
    
    handleNextCard();
  };
  
  const handleReturnToDashboard = () => {
    navigate('/dashboard/student/flashcards');
  };
  
  const currentCard = deck?.cards[currentCardIndex];
  const progress = deck ? ((currentCardIndex + 1) / deck.cards.length) * 100 : 0;
  
  // Format time spent into minutes and seconds
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Calculate accuracy for current card
  const calculateAccuracy = (card: Flashcard) => {
    if (card.accuracyHistory.length === 0) return 'Not reviewed';
    
    const correct = card.accuracyHistory.filter(result => result).length;
    const percentage = Math.round((correct / card.accuracyHistory.length) * 100);
    
    return `${percentage}% accuracy`;
  };
  
  // Get difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-lg">Loading flashcards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-blue-100 dark:from-indigo-950 dark:to-blue-950 min-h-screen p-4 sm:p-6 lg:p-8 flex flex-col">
      {/* Header with navigation */}
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={handleReturnToDashboard}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Flashcards
        </Button>
        
        <div className="text-center">
          <h1 className="text-xl font-semibold">{deck?.title}</h1>
          <p className="text-sm text-muted-foreground">{deck?.subject}</p>
        </div>
        
        <Button variant="outline">
          <BarChart className="h-4 w-4 mr-2" />
          Stats
        </Button>
      </div>
      
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center text-sm mb-1">
          <span>Card {currentCardIndex + 1} of {deck?.cards.length}</span>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formatTime(studySessionStats.timeSpent)}</span>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      {/* Flashcard */}
      {currentCard && (
        <div className="flex-1 flex flex-col items-center justify-center mb-6">
          <div 
            className="w-full max-w-2xl perspective-1000"
            onClick={handleFlipCard}
          >
            <div className={`relative ${
              flipped ? 'rotate-y-180' : ''
            } transition-transform duration-500 transform-style-preserve-3d cursor-pointer min-h-[300px] sm:min-h-[400px]`}>
              {/* Front of card */}
              <div className={`absolute w-full h-full backface-hidden ${
                flipped ? 'invisible' : ''
              }`}>
                <Card className="h-full shadow-lg">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="outline" className={getDifficultyColor(currentCard.difficulty)}>
                        {currentCard.difficulty}
                      </Badge>
                      
                      <Badge variant="outline">
                        {calculateAccuracy(currentCard)}
                      </Badge>
                    </div>
                    
                    <div className="flex-1 flex items-center justify-center text-center">
                      <h2 className="text-xl sm:text-2xl font-medium">{currentCard.front}</h2>
                    </div>
                    
                    <div className="text-center text-sm text-muted-foreground mt-4">
                      Tap to reveal answer
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Back of card */}
              <div className={`absolute w-full h-full backface-hidden rotate-y-180 ${
                flipped ? '' : 'invisible'
              }`}>
                <Card className="h-full shadow-lg border-green-200 dark:border-green-800">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Answer
                      </Badge>
                    </div>
                    
                    <div className="flex-1 flex items-center justify-center text-center">
                      <h2 className="text-xl sm:text-2xl font-medium">{currentCard.back}</h2>
                    </div>
                    
                    <div className="text-center text-sm text-muted-foreground mt-4">
                      Did you know this answer?
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          {/* Card navigation buttons */}
          <div className="flex justify-center mt-6 space-x-2">
            <Button
              variant="outline"
              onClick={handlePreviousCard}
              disabled={currentCardIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              onClick={handleFlipCard}
            >
              <Eye className="h-4 w-4 mr-2" />
              {flipped ? 'Hide Answer' : 'Show Answer'}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleNextCard}
              disabled={currentCardIndex === (deck?.cards.length || 0) - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Action buttons */}
      <div className="grid grid-cols-3 gap-4">
        <Button 
          variant="outline" 
          className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
          onClick={handleDidNotKnow}
          disabled={!flipped}
        >
          <ThumbsDown className="h-4 w-4 mr-2" />
          Didn't Know
        </Button>
        
        <Button 
          variant="outline"
          onClick={handleSkip}
        >
          <RotateCw className="h-4 w-4 mr-2" />
          Skip
        </Button>
        
        <Button 
          variant="outline" 
          className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
          onClick={handleKnewAnswer}
          disabled={!flipped}
        >
          <ThumbsUp className="h-4 w-4 mr-2" />
          Knew It
        </Button>
      </div>
      
      {/* Stats summary */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="flex items-center justify-center mb-1">
              <ThumbsUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="font-medium">{studySessionStats.correctAnswers}</span>
            </div>
            <p className="text-xs text-muted-foreground">Correct</p>
          </div>
          
          <div>
            <div className="flex items-center justify-center mb-1">
              <ThumbsDown className="h-4 w-4 text-red-500 mr-1" />
              <span className="font-medium">{studySessionStats.incorrectAnswers}</span>
            </div>
            <p className="text-xs text-muted-foreground">Incorrect</p>
          </div>
          
          <div>
            <div className="flex items-center justify-center mb-1">
              <RotateCw className="h-4 w-4 text-blue-500 mr-1" />
              <span className="font-medium">{studySessionStats.skipped}</span>
            </div>
            <p className="text-xs text-muted-foreground">Skipped</p>
          </div>
        </div>
      </div>
      
      {/* Accuracy Dialog */}
      <AlertDialog open={showAccuracyDialog} onOpenChange={setShowAccuracyDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Don't worry, you're learning!</AlertDialogTitle>
            <AlertDialogDescription>
              Remember this answer for next time. Would you like to:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowAccuracyDialog(false)}>Continue</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              setShowAccuracyDialog(false);
              // Logic to repeat this card later
            }}>
              Add to review list
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Completion Dialog */}
      <AlertDialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Session Complete!</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="py-4">
                <p className="mb-4">Great job! You've reviewed all cards in this deck.</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-50 p-3 rounded">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-lg font-medium">{studySessionStats.correctAnswers}</span>
                    </div>
                    <p className="text-sm text-green-700">Correct answers</p>
                  </div>
                  
                  <div className="bg-red-50 p-3 rounded">
                    <div className="flex items-center">
                      <X className="h-5 w-5 text-red-600 mr-2" />
                      <span className="text-lg font-medium">{studySessionStats.incorrectAnswers}</span>
                    </div>
                    <p className="text-sm text-red-700">Incorrect answers</p>
                  </div>
                </div>
                
                <p className="text-sm">
                  Time spent: {formatTime(studySessionStats.timeSpent)}
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setShowCompletionDialog(false);
              handleReturnToDashboard();
            }}>
              Return to Flashcards
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              setShowCompletionDialog(false);
              // Reset for a new session
              setCurrentCardIndex(0);
              setFlipped(false);
              setStudySessionStats({
                correctAnswers: 0,
                incorrectAnswers: 0,
                skipped: 0,
                timeSpent: 0
              });
            }}>
              Restart Session
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FlashcardInteractivePage;
