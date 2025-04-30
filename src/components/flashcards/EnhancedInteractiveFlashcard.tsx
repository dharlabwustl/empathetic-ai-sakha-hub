
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, BookOpen, Calculator,
  Check, X, Flag, RotateCw, Mic, Star, 
  BookmarkPlus, BookmarkCheck, HelpCircle, RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  explanation?: string;
  image?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
  topic: string;
  relatedConceptId?: string;
  relatedConceptName?: string;
}

interface FlashcardDeck {
  id: string;
  title: string;
  subject: string;
  topic: string;
  cards: Flashcard[];
}

type PracticeMode = 'typing' | 'speech';
type RecallStatus = 'remembered' | 'forgot' | 'needHelp' | null;

const EnhancedInteractiveFlashcard = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const speechRecognitionRef = useRef<any>(null);
  
  // State management
  const [loading, setLoading] = useState(true);
  const [deckInfo, setDeckInfo] = useState<FlashcardDeck | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('typing');
  const [showCalculator, setShowCalculator] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [bookmarkedCards, setBookmarkedCards] = useState<Set<string>>(new Set());
  const [cardStats, setCardStats] = useState<Record<string, RecallStatus>>({});
  const [listening, setListening] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    remembered: 0,
    forgot: 0,
    needHelp: 0,
    totalAccuracy: 0,
    totalAnswered: 0
  });
  const [showSessionSummary, setShowSessionSummary] = useState(false);

  // Mock data for the initial load
  useEffect(() => {
    const fetchFlashcardDeck = async () => {
      setLoading(true);
      // In a real app, this would be an API call
      setTimeout(() => {
        const mockDeck: FlashcardDeck = {
          id: deckId || 'default',
          title: 'Physics: Kinematics Fundamentals',
          subject: 'Physics',
          topic: 'Kinematics',
          cards: [
            {
              id: 'card1',
              question: "What is the formula for displacement when an object moves with constant acceleration?",
              answer: "s = ut + (1/2)at²",
              explanation: "Where s is displacement, u is initial velocity, t is time, and a is acceleration.",
              difficulty: 'medium',
              subject: 'Physics',
              topic: 'Kinematics',
              relatedConceptId: 'concept-kinematics-1',
              relatedConceptName: 'Motion with Constant Acceleration'
            },
            {
              id: 'card2',
              question: "State Newton's Second Law of Motion.",
              answer: "Force equals mass times acceleration (F = ma).",
              explanation: "This law defines the relationship between an object's mass (m), its acceleration (a), and the applied force (F).",
              image: "https://example.com/newton2.jpg",
              difficulty: 'easy',
              subject: 'Physics',
              topic: 'Classical Mechanics',
              relatedConceptId: 'concept-newton-laws',
              relatedConceptName: 'Newton\'s Laws of Motion'
            },
            {
              id: 'card3',
              question: "Define instantaneous velocity.",
              answer: "The velocity of an object at a specific point in time, calculated as the derivative of position with respect to time (v = dx/dt).",
              explanation: "It represents the rate of change of position at a particular moment.",
              difficulty: 'hard',
              subject: 'Physics',
              topic: 'Kinematics',
              relatedConceptId: 'concept-velocity',
              relatedConceptName: 'Velocity and Derivatives'
            }
          ]
        };
        setDeckInfo(mockDeck);
        setLoading(false);
      }, 1000);
    };

    fetchFlashcardDeck();
  }, [deckId]);

  // Current card helper
  const currentCard = deckInfo && currentCardIndex < deckInfo.cards.length
    ? deckInfo.cards[currentCardIndex]
    : null;

  // Progress calculation
  const progress = deckInfo 
    ? Math.round(((currentCardIndex + 1) / deckInfo.cards.length) * 100)
    : 0;

  // Speech recognition functions
  const startListening = () => {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition. Try using Chrome instead.",
        variant: "destructive"
      });
      return;
    }

    try {
      // @ts-ignore - TypeScript doesn't know about webkit prefixed API
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!speechRecognitionRef.current) {
        speechRecognitionRef.current = new SpeechRecognition();
        speechRecognitionRef.current.continuous = false;
        speechRecognitionRef.current.interimResults = false;
        speechRecognitionRef.current.lang = 'en-US';
        
        speechRecognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setUserAnswer(transcript);
          setListening(false);
        };
        
        speechRecognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event);
          setListening(false);
          toast({
            title: "Speech Recognition Error",
            description: "Please try again or switch to typing mode.",
            variant: "destructive"
          });
        };
      }
      
      setListening(true);
      speechRecognitionRef.current.start();
    } catch (error) {
      console.error("Speech recognition error:", error);
      toast({
        title: "Failed to start speech recognition",
        description: "Please try switching to typing mode instead.",
        variant: "destructive"
      });
      setListening(false);
    }
  };

  const stopListening = () => {
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.stop();
      setListening(false);
    }
  };

  // Card navigation functions
  const goToNextCard = () => {
    if (!deckInfo) return;
    
    if (currentCardIndex >= deckInfo.cards.length - 1) {
      // End of deck
      setShowSessionSummary(true);
      return;
    }

    setCurrentCardIndex(prev => prev + 1);
    setIsFlipped(false);
    setUserAnswer('');
    setAccuracy(null);
  };

  const goToPreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setIsFlipped(false);
      setUserAnswer('');
      setAccuracy(null);
    }
  };

  // Handle card interactions
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const calculateAnswerAccuracy = (userAnswer: string, correctAnswer: string): number => {
    if (!userAnswer.trim()) return 0;
    
    // This is a simple implementation. In a real app, you'd want more sophisticated NLP
    const userWords = userAnswer.toLowerCase().split(/\s+/).filter(Boolean);
    const correctWords = correctAnswer.toLowerCase().split(/\s+/).filter(Boolean);
    
    let matchedWords = 0;
    for (const word of userWords) {
      if (correctWords.some(cw => cw.includes(word) || word.includes(cw))) {
        matchedWords++;
      }
    }
    
    return Math.round((matchedWords / Math.max(userWords.length, correctWords.length)) * 100);
  };

  const handleCheckAnswer = () => {
    if (!currentCard || !userAnswer.trim()) return;
    
    const accuracyScore = calculateAnswerAccuracy(userAnswer, currentCard.answer);
    setAccuracy(accuracyScore);
    
    // Show feedback toast
    if (accuracyScore >= 80) {
      toast({
        title: "Excellent!",
        description: "Your answer is correct.",
      });
    } else if (accuracyScore >= 50) {
      toast({
        title: "Almost there!",
        description: "You've got the main idea but missed some details.",
      });
    } else {
      toast({
        title: "Keep practicing",
        description: "Review the answer and try again.",
        variant: "destructive"
      });
    }
  };

  const handleRecallResponse = (status: RecallStatus) => {
    if (!currentCard) return;
    
    // Update card stats
    setCardStats(prev => ({
      ...prev,
      [currentCard.id]: status
    }));
    
    // Update session stats
    setSessionStats(prev => {
      const newStats = { ...prev };
      if (status === 'remembered') newStats.remembered += 1;
      else if (status === 'forgot') newStats.forgot += 1;
      else if (status === 'needHelp') newStats.needHelp += 1;
      
      newStats.totalAnswered += 1;
      newStats.totalAccuracy = Math.round(
        (newStats.remembered / newStats.totalAnswered) * 100
      );
      
      return newStats;
    });
    
    // Show feedback toast
    const messages = {
      remembered: "Great! This card will be shown less frequently.",
      forgot: "No problem! We'll review this card more often.",
      needHelp: "Marked for additional review and learning resources."
    };
    
    if (status) {
      toast({
        title: status === 'remembered' ? "Well done!" : "Learning in progress",
        description: messages[status]
      });
    }
    
    // Move to next card after a delay
    setTimeout(goToNextCard, 800);
  };

  const toggleBookmark = () => {
    if (!currentCard) return;
    
    setBookmarkedCards(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(currentCard.id)) {
        newBookmarks.delete(currentCard.id);
        toast({ 
          title: "Bookmark removed",
          description: "Card removed from your bookmarks"
        });
      } else {
        newBookmarks.add(currentCard.id);
        toast({ 
          title: "Bookmarked!",
          description: "Card added to your bookmarks for easy access later"
        });
      }
      return newBookmarks;
    });
  };

  const handleRetry = () => {
    setUserAnswer('');
    setAccuracy(null);
  };

  const handleBackToDeck = () => {
    navigate('/dashboard/student/flashcards');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    }
  };

  const getRecallStatusColor = (status: RecallStatus) => {
    switch (status) {
      case 'remembered': return 'text-green-600 dark:text-green-400';
      case 'forgot': return 'text-red-600 dark:text-red-400';
      case 'needHelp': return 'text-amber-600 dark:text-amber-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getRecallStatusIcon = (status: RecallStatus) => {
    switch (status) {
      case 'remembered': return <Check className={`h-4 w-4 ${getRecallStatusColor(status)}`} />;
      case 'forgot': return <X className={`h-4 w-4 ${getRecallStatusColor(status)}`} />;
      case 'needHelp': return <HelpCircle className={`h-4 w-4 ${getRecallStatusColor(status)}`} />;
      default: return null;
    }
  };

  // Calculator component (simplified)
  const CalculatorPanel = () => {
    const [display, setDisplay] = useState('0');
    const [prevValue, setPrevValue] = useState<number | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const inputDigit = (digit: string) => {
      if (waitingForOperand) {
        setDisplay(digit);
        setWaitingForOperand(false);
      } else {
        setDisplay(display === '0' ? digit : display + digit);
      }
    };

    const inputDot = () => {
      if (waitingForOperand) {
        setDisplay('0.');
        setWaitingForOperand(false);
      } else if (display.indexOf('.') === -1) {
        setDisplay(display + '.');
      }
    };

    const performOperation = (nextOperator: string) => {
      const inputValue = parseFloat(display);

      if (prevValue === null) {
        setPrevValue(inputValue);
      } else if (operator) {
        const currentValue = prevValue || 0;
        let newValue: number;

        switch (operator) {
          case '+': newValue = currentValue + inputValue; break;
          case '-': newValue = currentValue - inputValue; break;
          case '×': newValue = currentValue * inputValue; break;
          case '÷': newValue = currentValue / inputValue; break;
          default: newValue = inputValue;
        }

        setPrevValue(newValue);
        setDisplay(String(newValue));
      }

      setWaitingForOperand(true);
      setOperator(nextOperator);
    };

    const calculateResult = () => {
      if (prevValue === null || operator === null) return;
      
      performOperation('=');
      setOperator(null);
    };

    const clearAll = () => {
      setDisplay('0');
      setPrevValue(null);
      setOperator(null);
      setWaitingForOperand(false);
    };

    return (
      <div className="p-4 space-y-2">
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-right text-xl font-mono h-12 flex items-center justify-end">
          {display}
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Button variant="outline" onClick={clearAll} className="col-span-2">AC</Button>
          <Button variant="outline" onClick={() => {/* Not implemented */}}>±</Button>
          <Button variant="outline" onClick={() => performOperation('÷')}>÷</Button>

          {[7, 8, 9].map(num => (
            <Button key={num} variant="outline" onClick={() => inputDigit(num.toString())}>{num}</Button>
          ))}
          <Button variant="outline" onClick={() => performOperation('×')}>×</Button>

          {[4, 5, 6].map(num => (
            <Button key={num} variant="outline" onClick={() => inputDigit(num.toString())}>{num}</Button>
          ))}
          <Button variant="outline" onClick={() => performOperation('-')}>-</Button>

          {[1, 2, 3].map(num => (
            <Button key={num} variant="outline" onClick={() => inputDigit(num.toString())}>{num}</Button>
          ))}
          <Button variant="outline" onClick={() => performOperation('+')}>+</Button>

          <Button variant="outline" onClick={() => inputDigit('0')} className="col-span-2">0</Button>
          <Button variant="outline" onClick={inputDot}>.</Button>
          <Button variant="outline" onClick={calculateResult}>=</Button>
        </div>
        
        <div className="pt-2">
          <h4 className="font-medium text-sm mb-2">Common Physics Formulas:</h4>
          <div className="grid grid-cols-2 gap-1 text-xs">
            <Button variant="outline" size="sm" onClick={() => setDisplay("v=u+at")}>v=u+at</Button>
            <Button variant="outline" size="sm" onClick={() => setDisplay("s=ut+½at²")}>s=ut+½at²</Button>
            <Button variant="outline" size="sm" onClick={() => setDisplay("v²=u²+2as")}>v²=u²+2as</Button>
            <Button variant="outline" size="sm" onClick={() => setDisplay("F=ma")}>F=ma</Button>
          </div>
        </div>
      </div>
    );
  };
  
  // Recommendations Panel (simplified)
  const RecommendationsPanel = () => {
    const recommendations = [
      {
        type: 'concept',
        title: 'Kinematic Equations Deep Dive',
        description: 'Learn the derivation and application of kinematic equations',
        difficulty: 'medium'
      },
      {
        type: 'flashcard',
        title: 'Kinematics Problem-Solving',
        description: '15 practice problems with step-by-step solutions',
        difficulty: 'hard'
      },
      {
        type: 'exam',
        title: 'Physics Mechanics Quiz',
        description: '30-minute assessment on classical mechanics',
        difficulty: 'medium'
      }
    ];
    
    return (
      <div className="p-4 space-y-4">
        <h3 className="font-medium">Recommended for You</h3>
        <div className="space-y-3">
          {recommendations.map((item, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className={
                    item.type === 'concept' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30' :
                    item.type === 'flashcard' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30' :
                    'bg-green-100 text-green-800 dark:bg-green-900/30'
                  }>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </Badge>
                  <Badge variant="outline" className={getDifficultyColor(item.difficulty)}>
                    {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
                  </Badge>
                </div>
                <h4 className="font-medium text-sm">{item.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.description}</p>
                <Button size="sm" variant="outline" className="w-full mt-3">View</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  // Session Summary Component
  const SessionSummaryDialog = () => {
    const averageAccuracy = sessionStats.totalAnswered > 0 
      ? Math.round((sessionStats.remembered / sessionStats.totalAnswered) * 100)
      : 0;
      
    const getGrade = (accuracy: number) => {
      if (accuracy >= 90) return 'A';
      if (accuracy >= 80) return 'B';
      if (accuracy >= 70) return 'C';
      if (accuracy >= 60) return 'D';
      return 'E';
    };
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <h2 className="text-xl font-bold text-center">Session Complete!</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold mb-2">{averageAccuracy}%</div>
              <div className="text-2xl">{getGrade(averageAccuracy)}</div>
              <p className="text-gray-500 dark:text-gray-400">Overall Recall Accuracy</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {sessionStats.remembered}
                </div>
                <p className="text-sm text-green-600 dark:text-green-400">Remembered</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {sessionStats.forgot}
                </div>
                <p className="text-sm text-red-600 dark:text-red-400">Forgot</p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {sessionStats.needHelp}
                </div>
                <p className="text-sm text-amber-600 dark:text-amber-400">Need Help</p>
              </div>
            </div>
            
            {deckInfo && (
              <div>
                <h3 className="font-medium mb-2">Recommendations:</h3>
                <ul className="text-sm space-y-1.5">
                  {sessionStats.needHelp > 0 && (
                    <li className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                      <span>Review related concepts for difficult cards</span>
                    </li>
                  )}
                  {sessionStats.forgot > 2 && (
                    <li className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 text-indigo-500" />
                      <span>Schedule a review session in 2 days</span>
                    </li>
                  )}
                  {averageAccuracy > 80 && (
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-green-500" />
                      <span>Try more advanced topics in {deckInfo.subject}</span>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex gap-3 justify-between">
            <Button variant="outline" onClick={handleBackToDeck}>
              Back to Decks
            </Button>
            <Button onClick={() => {
              setCurrentCardIndex(0);
              setIsFlipped(false);
              setUserAnswer('');
              setAccuracy(null);
              setCardStats({});
              setSessionStats({
                remembered: 0,
                forgot: 0,
                needHelp: 0,
                totalAccuracy: 0,
                totalAnswered: 0
              });
              setShowSessionSummary(false);
            }}>
              Restart Deck
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading flashcards...</p>
        </div>
      </div>
    );
  }

  if (!deckInfo) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Flashcard Deck Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Sorry, we couldn't find the flashcard deck you're looking for.
          </p>
          <Button onClick={handleBackToDeck}>Return to Flashcards</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-16 md:pb-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleBackToDeck}
              className="flex items-center gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            
            <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
              {deckInfo.subject}
            </Badge>
            
            <Badge variant="outline" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300">
              {deckInfo.topic}
            </Badge>
          </div>
          
          <h1 className="text-2xl font-bold">{deckInfo.title}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleBookmark}
                  className="h-9 w-9"
                >
                  {currentCard && bookmarkedCards.has(currentCard.id) ? (
                    <BookmarkCheck className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <BookmarkPlus className="h-5 w-5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{currentCard && bookmarkedCards.has(currentCard.id) ? 'Remove bookmark' : 'Add bookmark'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
              >
                <Calculator className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Calculator & Formulas</SheetTitle>
                <SheetDescription>
                  Use this tool for calculations during practice
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4">
                <CalculatorPanel />
              </div>
            </SheetContent>
          </Sheet>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
              >
                <BookOpen className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Recommendations</SheetTitle>
                <SheetDescription>
                  Related learning resources
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4">
                <RecommendationsPanel />
              </div>
            </SheetContent>
          </Sheet>
          
          <Button 
            variant="default"
            onClick={() => setShowSessionSummary(true)}
          >
            Session Summary
          </Button>
        </div>
      </div>
      
      {/* Progress Bar & Practice Mode Selection */}
      <div className="mb-6 space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span>Card {currentCardIndex + 1} of {deckInfo.cards.length}</span>
            <div className="flex items-center gap-1.5">
              <span>Accuracy:</span>
              <span className="font-medium">{sessionStats.totalAnswered > 0 
                ? `${Math.round((sessionStats.remembered / sessionStats.totalAnswered) * 100)}%` 
                : '0%'}
              </span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <Tabs
          value={practiceMode}
          onValueChange={(value) => setPracticeMode(value as PracticeMode)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="typing" className="flex items-center gap-1.5">
              <span>Typing Mode</span>
            </TabsTrigger>
            <TabsTrigger value="speech" className="flex items-center gap-1.5">
              <span>Speech Mode</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Main Flashcard Component */}
      {currentCard && (
        <div className="mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentCardIndex}-${isFlipped ? 'back' : 'front'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="bg-gray-50 dark:bg-gray-800/50 border-b pb-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-lg">
                      {!isFlipped ? "Question" : "Answer"}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className={getDifficultyColor(currentCard.difficulty)}
                      >
                        {currentCard.difficulty.charAt(0).toUpperCase() + currentCard.difficulty.slice(1)}
                      </Badge>
                      
                      {currentCard.relatedConceptName && (
                        <Badge 
                          variant="outline" 
                          className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 cursor-pointer hover:bg-blue-200"
                          onClick={() => currentCard.relatedConceptId && 
                            navigate(`/dashboard/student/concepts/${currentCard.relatedConceptId}`)}
                        >
                          <BookOpen className="h-3 w-3 mr-1" />
                          <span>{currentCard.relatedConceptName}</span>
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6 min-h-[300px]">
                  {!isFlipped ? (
                    <div className="space-y-6">
                      {/* Question Content */}
                      <div className="prose dark:prose-invert max-w-none">
                        <div className="text-lg font-medium">{currentCard.question}</div>
                        
                        {currentCard.image && (
                          <div className="mt-4">
                            <img 
                              src={currentCard.image} 
                              alt="Question visual" 
                              className="mx-auto max-h-40 rounded-md object-contain"
                            />
                          </div>
                        )}
                      </div>
                      
                      {/* Answer Input Section */}
                      <TabsContent value="typing" className="mt-6 space-y-4">
                        <Textarea
                          placeholder="Type your answer here..."
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          disabled={accuracy !== null}
                          className="min-h-[100px] resize-none"
                        />
                        
                        {accuracy !== null && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span>Accuracy:</span>
                              <span className={`font-bold ${
                                accuracy >= 80 ? 'text-green-600' :
                                accuracy >= 50 ? 'text-amber-600' :
                                'text-red-600'
                              }`}>{accuracy}%</span>
                            </div>
                            <Button size="sm" variant="outline" onClick={handleRetry}>
                              <RotateCw className="h-3 w-3 mr-1" />
                              <span>Try Again</span>
                            </Button>
                          </div>
                        )}
                        
                        {accuracy === null && (
                          <div className="flex justify-between">
                            <Button 
                              variant="default" 
                              onClick={handleCheckAnswer}
                              disabled={!userAnswer.trim()}
                            >
                              Check Answer
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={handleFlip}
                            >
                              Reveal Answer
                            </Button>
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="speech" className="mt-6 space-y-4">
                        <div className="flex flex-col items-center justify-center gap-4 py-4">
                          <Button 
                            className={`h-16 w-16 rounded-full ${listening ? 'animate-pulse bg-red-500 hover:bg-red-600' : ''}`}
                            onClick={listening ? stopListening : startListening}
                          >
                            <Mic className="h-8 w-8" />
                          </Button>
                          <div className="text-sm text-center text-muted-foreground">
                            {listening 
                              ? 'Listening... Click to stop' 
                              : 'Click the mic button and speak your answer'}
                          </div>
                        </div>
                        
                        {userAnswer && (
                          <>
                            <div className="bg-gray-50 dark:bg-gray-800 border rounded-md p-4">
                              <div className="text-sm font-medium mb-1">Your spoken answer:</div>
                              <p>{userAnswer}</p>
                            </div>
                            
                            {accuracy !== null && (
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span>Accuracy:</span>
                                  <span className={`font-bold ${
                                    accuracy >= 80 ? 'text-green-600' :
                                    accuracy >= 50 ? 'text-amber-600' :
                                    'text-red-600'
                                  }`}>{accuracy}%</span>
                                </div>
                                <Button size="sm" variant="outline" onClick={handleRetry}>
                                  <RotateCw className="h-3 w-3 mr-1" />
                                  <span>Try Again</span>
                                </Button>
                              </div>
                            )}
                            
                            {accuracy === null && (
                              <div className="flex justify-between">
                                <Button 
                                  variant="default" 
                                  onClick={handleCheckAnswer}
                                >
                                  Check Answer
                                </Button>
                                <Button 
                                  variant="outline" 
                                  onClick={handleFlip}
                                >
                                  Reveal Answer
                                </Button>
                              </div>
                            )}
                          </>
                        )}
                        
                        {!userAnswer && !listening && (
                          <Button 
                            variant="outline" 
                            onClick={handleFlip}
                            className="w-full"
                          >
                            Skip to Answer
                          </Button>
                        )}
                      </TabsContent>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Answer Content */}
                      <div className="bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900 rounded-md p-4">
                        <h3 className="font-medium mb-2">Answer:</h3>
                        <p className="text-lg">{currentCard.answer}</p>
                      </div>
                      
                      {/* Explanation if available */}
                      {currentCard.explanation && (
                        <div>
                          <h4 className="font-medium mb-1">Explanation:</h4>
                          <p className="text-gray-700 dark:text-gray-300">{currentCard.explanation}</p>
                        </div>
                      )}
                      
                      {/* Related concept if available */}
                      {currentCard.relatedConceptId && (
                        <div className="pt-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/dashboard/student/concepts/${currentCard.relatedConceptId}`)}
                            className="w-full"
                          >
                            <BookOpen className="h-4 w-4 mr-2" />
                            <span>Study Related Concept: {currentCard.relatedConceptName}</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                
                <CardFooter className="border-t p-4 flex flex-col gap-4">
                  {isFlipped ? (
                    <>
                      <div className="grid grid-cols-3 gap-2 w-full">
                        <Button
                          variant="outline"
                          className="border-green-200 hover:bg-green-50 text-green-700 dark:border-green-800 dark:hover:bg-green-900/20 dark:text-green-400"
                          onClick={() => handleRecallResponse('remembered')}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          <span>I Remembered</span>
                        </Button>
                        
                        <Button
                          variant="outline"
                          className="border-red-200 hover:bg-red-50 text-red-700 dark:border-red-800 dark:hover:bg-red-900/20 dark:text-red-400"
                          onClick={() => handleRecallResponse('forgot')}
                        >
                          <X className="h-4 w-4 mr-1" />
                          <span>I Forgot</span>
                        </Button>
                        
                        <Button
                          variant="outline"
                          className="border-amber-200 hover:bg-amber-50 text-amber-700 dark:border-amber-800 dark:hover:bg-amber-900/20 dark:text-amber-400"
                          onClick={() => handleRecallResponse('needHelp')}
                        >
                          <Flag className="h-4 w-4 mr-1" />
                          <span>Need Help</span>
                        </Button>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleFlip}
                        className="w-fit self-center"
                      >
                        <RotateCw className="h-3 w-3 mr-1" />
                        <span>Back to Question</span>
                      </Button>
                    </>
                  ) : (
                    <div className="flex justify-center w-full">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        onClick={handleFlip}
                      >
                        <RotateCw className="h-4 w-4 mr-2" />
                        <span>Flip Card</span>
                      </Button>
                    </div>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
      
      {/* Navigation Controls */}
      <div className="flex justify-between mb-6">
        <Button
          variant="outline"
          onClick={goToPreviousCard}
          disabled={currentCardIndex === 0}
          className="flex items-center gap-1.5"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Previous Card</span>
        </Button>
        
        <Button
          variant="outline"
          onClick={goToNextCard}
          disabled={!deckInfo || currentCardIndex >= deckInfo.cards.length - 1}
          className="flex items-center gap-1.5"
        >
          <span>Next Card</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Card Review Status */}
      <div className="mb-8">
        <h3 className="font-medium mb-2 text-sm">Card Status:</h3>
        <div className="flex flex-wrap gap-2">
          {deckInfo.cards.map((card, index) => (
            <TooltipProvider key={card.id}>
              <Tooltip>
                <TooltipTrigger>
                  <div 
                    className={`w-3 h-3 rounded-full cursor-pointer ${
                      currentCardIndex === index 
                        ? 'ring-2 ring-offset-2 ring-primary' 
                        : ''
                    } ${
                      cardStats[card.id] === 'remembered' ? 'bg-green-500' :
                      cardStats[card.id] === 'forgot' ? 'bg-red-500' :
                      cardStats[card.id] === 'needHelp' ? 'bg-amber-500' :
                      'bg-gray-300 dark:bg-gray-600'
                    }`}
                    onClick={() => {
                      setCurrentCardIndex(index);
                      setIsFlipped(false);
                      setUserAnswer('');
                      setAccuracy(null);
                    }}
                  ></div>
                </TooltipTrigger>
                <TooltipContent className="text-xs">
                  Card {index + 1}: {
                    cardStats[card.id] === 'remembered' ? 'Remembered' :
                    cardStats[card.id] === 'forgot' ? 'Forgot' :
                    cardStats[card.id] === 'needHelp' ? 'Needs Help' :
                    'Not Reviewed'
                  }
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
      
      {/* Show session summary dialog when completed */}
      {showSessionSummary && <SessionSummaryDialog />}
    </div>
  );
};

export default EnhancedInteractiveFlashcard;
