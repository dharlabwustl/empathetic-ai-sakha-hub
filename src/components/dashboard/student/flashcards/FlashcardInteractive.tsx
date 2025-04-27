
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, X, Bookmark, RotateCcw, RefreshCw, ThumbsUp, ThumbsDown, Clock } from 'lucide-react';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  examples: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export default function FlashcardInteractive() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // States
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    skipped: 0,
    marked: 0,
    timeSpent: 0
  });
  
  // Mock data for flashcards
  useEffect(() => {
    // Simulate API call to fetch flashcards
    setTimeout(() => {
      const mockCards: Flashcard[] = [
        {
          id: '1',
          front: "What is Newton's First Law?",
          back: "An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an unbalanced force.",
          examples: ["A book on a table remains at rest until a force moves it.", "A moving ball continues moving until friction slows it down."],
          difficulty: 'medium',
          tags: ['physics', 'newton', 'laws of motion']
        },
        {
          id: '2',
          front: "What is Newton's Second Law?",
          back: "Force equals mass times acceleration (F = ma). The acceleration of an object is directly proportional to the force applied and inversely proportional to its mass.",
          examples: ["A heavy truck needs more force to accelerate at the same rate as a small car.", "A tennis ball accelerates more quickly than a bowling ball when the same force is applied."],
          difficulty: 'hard',
          tags: ['physics', 'newton', 'laws of motion', 'formula']
        },
        {
          id: '3',
          front: "What is Newton's Third Law?",
          back: "For every action, there is an equal and opposite reaction. If object A exerts a force on object B, then object B exerts an equal and opposite force on object A.",
          examples: ["A swimmer pushes water backward and moves forward in response.", "A rocket pushes exhaust gases downward and moves upward in response."],
          difficulty: 'medium',
          tags: ['physics', 'newton', 'laws of motion']
        },
        {
          id: '4',
          front: "Define kinetic energy",
          back: "Kinetic energy is the energy that an object possesses due to its motion. It is calculated as KE = (1/2)mv².",
          examples: ["A moving car has kinetic energy.", "A rolling ball has kinetic energy that depends on its mass and velocity."],
          difficulty: 'easy',
          tags: ['physics', 'energy', 'formula']
        },
        {
          id: '5',
          front: "Define potential energy",
          back: "Potential energy is the stored energy of an object due to its position or arrangement. For gravitational potential energy: PE = mgh",
          examples: ["A book on a shelf has potential energy.", "A stretched spring has elastic potential energy."],
          difficulty: 'medium',
          tags: ['physics', 'energy', 'formula']
        },
      ];
      
      setCards(mockCards);
      setLoading(false);
    }, 1000);
    
    // Start timer
    const timer = setInterval(() => {
      setSessionStats(prev => ({
        ...prev,
        timeSpent: prev.timeSpent + 1
      }));
    }, 1000);
    
    return () => clearInterval(timer);
  }, [deckId]);
  
  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;
  
  const handleFlip = () => {
    setFlipped(!flipped);
    if (!flipped) {
      setShowAnswer(true);
    }
  };
  
  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
      setShowAnswer(false);
    } else {
      setReviewMode(true);
      toast({
        title: "Deck Completed!",
        description: `You've completed all ${cards.length} flashcards in this deck.`
      });
    }
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false);
      setShowAnswer(false);
    }
  };
  
  const handleKnew = () => {
    setSessionStats(prev => ({
      ...prev,
      correct: prev.correct + 1
    }));
    handleNext();
  };
  
  const handleDidntKnow = () => {
    setSessionStats(prev => ({
      ...prev,
      incorrect: prev.incorrect + 1
    }));
    handleNext();
  };
  
  const handleSkip = () => {
    setSessionStats(prev => ({
      ...prev,
      skipped: prev.skipped + 1
    }));
    handleNext();
  };
  
  const handleBookmark = () => {
    toast({
      title: "Card Bookmarked",
      description: "This card has been added to your bookmarks for later review."
    });
    setSessionStats(prev => ({
      ...prev,
      marked: prev.marked + 1
    }));
  };
  
  const handleRestart = () => {
    setCurrentIndex(0);
    setFlipped(false);
    setShowAnswer(false);
    setReviewMode(false);
    setSessionStats({
      correct: 0,
      incorrect: 0,
      skipped: 0,
      marked: 0,
      timeSpent: 0
    });
  };
  
  const handleExit = () => {
    navigate('/dashboard/student/flashcards');
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    }
  };
  
  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Loading Flashcards...</h2>
        </div>
        <Card className="w-full h-[400px] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4 mx-auto"></div>
            <p className="text-muted-foreground">Loading your flashcards...</p>
          </div>
        </Card>
      </div>
    );
  }
  
  if (reviewMode) {
    return (
      <div className="container max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Session Summary</h2>
          <Button variant="outline" onClick={handleExit}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Exit
          </Button>
        </div>
        
        <Card>
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardTitle className="text-xl">Flashcard Review Complete</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                <ThumbsUp className="h-5 w-5 mx-auto mb-1 text-green-600" />
                <p className="text-xl font-bold">{sessionStats.correct}</p>
                <p className="text-sm text-muted-foreground">Correct</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
                <ThumbsDown className="h-5 w-5 mx-auto mb-1 text-red-600" />
                <p className="text-xl font-bold">{sessionStats.incorrect}</p>
                <p className="text-sm text-muted-foreground">Incorrect</p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg text-center">
                <ArrowRight className="h-5 w-5 mx-auto mb-1 text-amber-600" />
                <p className="text-xl font-bold">{sessionStats.skipped}</p>
                <p className="text-sm text-muted-foreground">Skipped</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                <Clock className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                <p className="text-xl font-bold">{formatTime(sessionStats.timeSpent)}</p>
                <p className="text-sm text-muted-foreground">Time Spent</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Performance Summary</h3>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                <div className="flex justify-between mb-1 text-sm">
                  <span>Accuracy Rate</span>
                  <span>{sessionStats.correct + sessionStats.incorrect > 0 ? 
                    `${Math.round((sessionStats.correct / (sessionStats.correct + sessionStats.incorrect)) * 100)}%` : 
                    '0%'}
                  </span>
                </div>
                <Progress 
                  value={sessionStats.correct + sessionStats.incorrect > 0 ? 
                    (sessionStats.correct / (sessionStats.correct + sessionStats.incorrect)) * 100 : 
                    0} 
                  className="h-2"
                />
                
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>🎯 Cards per minute: {sessionStats.timeSpent > 60 ? 
                    ((sessionStats.correct + sessionStats.incorrect + sessionStats.skipped) / (sessionStats.timeSpent / 60)).toFixed(2) : 
                    'Less than a minute spent'}
                  </p>
                  <p>🔖 Bookmarked for later: {sessionStats.marked} cards</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-blue-800 dark:text-blue-300 text-sm mb-6">
              <p className="font-medium">💡 Smart Suggestion</p>
              <p>Based on your performance, we recommend reviewing these concepts again in 2 days for optimal retention.</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between bg-gray-50 dark:bg-gray-800/50">
            <Button variant="outline" onClick={handleExit}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Exit to Deck List
            </Button>
            <Button onClick={handleRestart}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Restart Deck
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Flashcard Study</h2>
          <p className="text-sm text-muted-foreground">
            Card {currentIndex + 1} of {cards.length}
          </p>
        </div>
        <Button variant="outline" onClick={handleExit}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Exit
        </Button>
      </div>
      
      <div className="space-y-4">
        <Progress value={progress} className="h-2" />
        
        <Card className="shadow-lg">
          <CardContent className="p-0">
            <div 
              className="relative min-h-[400px] cursor-pointer"
              onClick={handleFlip}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={flipped ? 'back' : 'front'}
                  initial={{ rotateY: flipped ? -90 : 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: flipped ? 90 : -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 p-6"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <Badge className={getDifficultyColor(currentCard?.difficulty || 'medium')}>
                        {currentCard?.difficulty?.charAt(0).toUpperCase() + currentCard?.difficulty?.slice(1) || 'Medium'}
                      </Badge>
                      {currentCard?.tags && (
                        <div className="flex flex-wrap gap-1 justify-end">
                          {currentCard.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <h3 className="text-xl font-semibold mb-4">
                          {flipped ? 'Answer:' : 'Question:'}
                        </h3>
                        <p className="text-lg">
                          {flipped ? currentCard?.back : currentCard?.front}
                        </p>
                        
                        {flipped && currentCard?.examples && currentCard.examples.length > 0 && (
                          <div className="mt-4 text-left bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Examples:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {currentCard.examples.map((example, index) => (
                                <li key={index} className="text-sm">{example}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {!flipped && (
                      <div className="text-center text-sm text-muted-foreground mt-4">
                        Tap to reveal answer
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 bg-gray-50 dark:bg-gray-800/50 p-4">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePrevious} disabled={currentIndex === 0}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button variant="outline" size="sm" onClick={handleSkip}>
                <ArrowRight className="h-4 w-4 mr-1" />
                Skip
              </Button>
              <Button variant="outline" size="sm" onClick={handleBookmark}>
                <Bookmark className="h-4 w-4 mr-1" />
                Bookmark
              </Button>
            </div>
            
            <div className="flex gap-2">
              {showAnswer && (
                <>
                  <Button variant="destructive" size="sm" onClick={handleDidntKnow}>
                    <X className="h-4 w-4 mr-1" />
                    Didn't Know
                  </Button>
                  <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700" onClick={handleKnew}>
                    <Check className="h-4 w-4 mr-1" />
                    Knew It
                  </Button>
                </>
              )}
              {!showAnswer && (
                <Button variant="default" size="sm" onClick={handleFlip}>
                  Show Answer
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
        
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex gap-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
              <span>Correct: {sessionStats.correct}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
              <span>Incorrect: {sessionStats.incorrect}</span>
            </div>
          </div>
          <div>
            Time: {formatTime(sessionStats.timeSpent)}
          </div>
        </div>
      </div>
    </div>
  );
}
