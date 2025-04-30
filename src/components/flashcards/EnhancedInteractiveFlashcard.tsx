
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import {
  ArrowRight,
  Bookmark,
  BookmarkPlus,
  Calculator,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Flag,
  Lightbulb,
  Mic,
  Repeat,
  RotateCcw,
  ThumbsDown,
  ThumbsUp,
  Volume2,
  X
} from 'lucide-react';

// Mock flashcard data for demonstration
const mockFlashcards = [
  {
    id: "1",
    question: "What is Newton's First Law of Motion?",
    answer: "An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an external force.",
    explanation: "This law is also known as the Law of Inertia. It explains why objects continue their motion unless a force acts on them.",
    difficulty: "medium",
    subject: "Physics",
    topic: "Classical Mechanics",
    conceptId: "c1",
    conceptName: "Newton's Laws of Motion",
    answerType: "text",
    hasFormula: true
  },
  {
    id: "2",
    question: "What is the formula for Newton's Second Law of Motion?",
    answer: "F = ma",
    explanation: "Where F is force, m is mass, and a is acceleration. This law quantifies the relationship between force and acceleration.",
    difficulty: "medium",
    subject: "Physics",
    topic: "Classical Mechanics",
    conceptId: "c1",
    conceptName: "Newton's Laws of Motion",
    answerType: "formula",
    hasFormula: true
  },
  {
    id: "3",
    question: "State Newton's Third Law of Motion.",
    answer: "For every action, there is an equal and opposite reaction.",
    explanation: "This law describes the mutual interaction between two objects - if object A exerts a force on object B, then object B exerts an equal and opposite force on object A.",
    difficulty: "medium",
    subject: "Physics",
    topic: "Classical Mechanics",
    conceptId: "c1",
    conceptName: "Newton's Laws of Motion",
    answerType: "text",
    hasFormula: false
  },
  {
    id: "4",
    question: "What happens to acceleration if you double the mass while keeping force constant?",
    answer: "The acceleration will be halved.",
    explanation: "According to F = ma, if mass (m) doubles and force (F) remains constant, then acceleration (a) must be halved to maintain the equation.",
    difficulty: "hard",
    subject: "Physics",
    topic: "Applications of Newton's Laws",
    conceptId: "c1",
    conceptName: "Newton's Laws of Motion",
    answerType: "text",
    hasFormula: true
  },
  {
    id: "5",
    question: "How do Newton's Laws apply to a rocket launch?",
    answer: "The rocket expels gas downward (action), and experiences an upward force (reaction) that propels it upward.",
    explanation: "This is a direct application of Newton's Third Law. The thrust comes from expelling mass (exhaust gases) at high velocity in one direction, resulting in the rocket moving in the opposite direction.",
    difficulty: "hard",
    subject: "Physics",
    topic: "Applications of Newton's Laws",
    conceptId: "c1",
    conceptName: "Newton's Laws of Motion",
    answerType: "text",
    hasFormula: false
  }
];

type FlashcardMode = 'typing' | 'speech' | 'choice' | 'view';

interface FlashcardSessionStats {
  correct: number;
  incorrect: number;
  skipped: number;
  flagged: number;
  total: number;
  reviewed: number;
}

const EnhancedInteractiveFlashcard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealAnswer, setRevealAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFlagged, setIsFlagged] = useState(false);
  const [mode, setMode] = useState<FlashcardMode>('typing');
  const [isListening, setIsListening] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showSessionSummary, setShowSessionSummary] = useState(false);
  const [resultFeedback, setResultFeedback] = useState<'correct' | 'incorrect' | 'none'>('none');
  
  const [stats, setStats] = useState<FlashcardSessionStats>({
    correct: 0,
    incorrect: 0,
    skipped: 0,
    flagged: 0,
    total: mockFlashcards.length,
    reviewed: 0
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const speechRecognitionRef = useRef<SpeechRecognition | null>(null);
  
  // Initialize speech recognition if supported
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      speechRecognitionRef.current = new SpeechRecognition();
      speechRecognitionRef.current.continuous = false;
      speechRecognitionRef.current.interimResults = false;
      
      speechRecognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserAnswer(transcript);
        setIsListening(false);
      };
      
      speechRecognitionRef.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "Speech recognition error",
          description: "We couldn't understand what you said. Please try again.",
          variant: "destructive"
        });
      };
      
      speechRecognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
    
    return () => {
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.abort();
      }
    };
  }, [toast]);
  
  const currentCard = mockFlashcards[currentIndex];
  
  const toggleSpeechRecognition = () => {
    if (!speechRecognitionRef.current) {
      toast({
        title: "Speech recognition not supported",
        description: "Your browser doesn't support speech recognition. Try using a different browser.",
        variant: "destructive"
      });
      return;
    }
    
    if (isListening) {
      speechRecognitionRef.current.abort();
      setIsListening(false);
    } else {
      setIsListening(true);
      speechRecognitionRef.current.start();
    }
  };
  
  const handleNextCard = () => {
    // Update stats before moving to next card
    if (resultFeedback !== 'none') {
      setStats(prev => ({
        ...prev,
        reviewed: prev.reviewed + 1
      }));
    }
    
    if (currentIndex < mockFlashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetCardState();
    } else {
      // End of deck
      setShowSessionSummary(true);
    }
  };
  
  const handlePrevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      resetCardState();
    }
  };
  
  const resetCardState = () => {
    setRevealAnswer(false);
    setUserAnswer('');
    setResultFeedback('none');
    setIsFlagged(false);
  };
  
  const handleSubmitAnswer = () => {
    const normalizedUserAnswer = userAnswer.trim().toLowerCase();
    const normalizedCorrectAnswer = currentCard.answer.trim().toLowerCase();
    
    // Simple string comparison - in a real app, you would use more sophisticated comparison
    const isCorrect = normalizedUserAnswer.includes(normalizedCorrectAnswer) || 
                     normalizedCorrectAnswer.includes(normalizedUserAnswer);
    
    if (isCorrect) {
      setResultFeedback('correct');
      setStats(prev => ({ ...prev, correct: prev.correct + 1 }));
      toast({
        title: "Correct!",
        description: "Great job! You remembered this correctly.",
        variant: "default"
      });
    } else {
      setResultFeedback('incorrect');
      setStats(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
    
    setRevealAnswer(true);
  };
  
  const handleFlag = () => {
    setIsFlagged(!isFlagged);
    if (!isFlagged) {
      setStats(prev => ({ ...prev, flagged: prev.flagged + 1 }));
    } else {
      setStats(prev => ({ ...prev, flagged: Math.max(0, prev.flagged - 1) }));
    }
    
    toast({
      title: isFlagged ? "Flag removed" : "Card flagged for review",
      description: isFlagged 
        ? "This card has been removed from your review list" 
        : "This card will be prioritized in future study sessions",
    });
  };
  
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark removed" : "Card bookmarked",
      description: isBookmarked 
        ? "This flashcard has been removed from your bookmarks" 
        : "This flashcard has been added to your bookmarks",
    });
  };
  
  const handleRemembered = () => {
    if (!revealAnswer) {
      setRevealAnswer(true);
      setResultFeedback('correct');
      setStats(prev => ({ ...prev, correct: prev.correct + 1 }));
    }
  };
  
  const handleForgot = () => {
    if (!revealAnswer) {
      setRevealAnswer(true);
      setResultFeedback('incorrect');
      setStats(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
  };
  
  const handleSkip = () => {
    setRevealAnswer(true);
    setStats(prev => ({ ...prev, skipped: prev.skipped + 1 }));
  };
  
  const endSession = () => {
    navigate(-1);
  };
  
  const getProgressColor = () => {
    const accuracy = stats.reviewed > 0 
      ? (stats.correct / stats.reviewed) * 100 
      : 0;
    
    if (accuracy >= 80) return "bg-green-500";
    if (accuracy >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy": return "bg-green-100 text-green-800 border-green-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "hard": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  const getAccuracyPercentage = () => {
    return stats.reviewed > 0 
      ? Math.round((stats.correct / stats.reviewed) * 100) 
      : 0;
  };
  
  return (
    <div className="space-y-6">
      {/* Top Section */}
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div>
          <div className="flex gap-2 items-center mb-2">
            <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200">
              {currentCard.subject}
            </Badge>
            <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">
              {currentCard.topic}
            </Badge>
            <Badge variant="outline" className={getDifficultyColor(currentCard.difficulty)}>
              {currentCard.difficulty.charAt(0).toUpperCase() + currentCard.difficulty.slice(1)}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="link" 
              size="sm" 
              className="text-blue-600 p-0 h-auto font-medium"
              onClick={() => navigate(`/dashboard/student/concepts/study/${currentCard.conceptId}`)}
            >
              <ExternalLink className="h-3.5 w-3.5 mr-1" />
              {currentCard.conceptName}
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {/* Practice Mode Selector */}
          <Tabs 
            defaultValue="typing"
            value={mode}
            onValueChange={(value) => setMode(value as FlashcardMode)}
            className="w-auto"
          >
            <TabsList className="h-9">
              <TabsTrigger value="typing" className="text-xs px-3">
                Typing Answer
              </TabsTrigger>
              <TabsTrigger value="speech" className="text-xs px-3">
                Speech-to-Text
              </TabsTrigger>
              <TabsTrigger value="view" className="text-xs px-3">
                View Only
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Calculator Toggle */}
          {currentCard.hasFormula && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowCalculator(!showCalculator)}
              className={showCalculator ? "bg-blue-50 text-blue-700" : ""}
            >
              <Calculator className="h-4 w-4 mr-1" /> Calculator
            </Button>
          )}
          
          {/* Bookmark Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={handleBookmark}
            className={isBookmarked ? "text-amber-500" : ""}
          >
            {isBookmarked ? <Bookmark className="h-4 w-4 fill-amber-100" /> : <BookmarkPlus className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      {/* Progress Tracker */}
      <div className="flex items-center gap-4">
        <div className="text-sm font-medium">
          {currentIndex + 1} / {mockFlashcards.length}
        </div>
        <div className="flex-1">
          <Progress 
            value={((currentIndex + 1) / mockFlashcards.length) * 100} 
            className="h-2" 
          />
        </div>
        <div className="flex items-center gap-1 text-sm">
          <ThumbsUp className="h-4 w-4 text-green-500" />
          <span className="font-medium">{getAccuracyPercentage()}%</span>
        </div>
      </div>
      
      {/* Main Flashcard */}
      <Card className="shadow-lg border-2 transition-all duration-300 transform">
        {/* Question Side */}
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/50 dark:to-blue-950/50 border-b">
          <div className="text-xl font-semibold">
            {currentCard.question}
          </div>
        </CardHeader>
        
        <CardContent className="pt-6 pb-6 min-h-[16rem] flex flex-col">
          {!revealAnswer ? (
            <div className="flex flex-col gap-4 flex-1">
              {mode === 'typing' && (
                <>
                  <Textarea
                    placeholder="Type your answer here..."
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="flex-1 min-h-[8rem] resize-none"
                    disabled={revealAnswer}
                  />
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handleSkip}>
                      Skip
                    </Button>
                    <Button onClick={handleSubmitAnswer} disabled={!userAnswer.trim()}>
                      Submit Answer
                    </Button>
                  </div>
                </>
              )}
              
              {mode === 'speech' && (
                <div className="flex flex-col gap-4 items-center flex-1">
                  <div className="flex-1 flex items-center justify-center">
                    <Button 
                      size="lg"
                      variant={isListening ? "destructive" : "default"}
                      onClick={toggleSpeechRecognition}
                      className={`rounded-full h-16 w-16 ${isListening ? 'animate-pulse' : ''}`}
                    >
                      <Mic className="h-6 w-6" />
                    </Button>
                  </div>
                  
                  <Textarea
                    placeholder="Your spoken answer will appear here..."
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="resize-none"
                    disabled={isListening}
                  />
                  
                  <div className="flex justify-between w-full">
                    <Button variant="outline" onClick={handleSkip}>
                      Skip
                    </Button>
                    <Button onClick={handleSubmitAnswer} disabled={!userAnswer.trim()}>
                      Submit Answer
                    </Button>
                  </div>
                </div>
              )}
              
              {mode === 'view' && (
                <div className="flex flex-col items-center gap-6 justify-center flex-1">
                  <div className="text-center text-muted-foreground">
                    Press the button below to reveal the answer
                  </div>
                  <div className="space-x-4">
                    <Button size="lg" variant="outline" onClick={() => setRevealAnswer(true)}>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reveal Answer
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {resultFeedback !== 'none' && (
                <div className={`p-3 rounded-md ${
                  resultFeedback === 'correct' 
                    ? 'bg-green-50 border border-green-100 dark:bg-green-900/20 dark:border-green-800' 
                    : 'bg-amber-50 border border-amber-100 dark:bg-amber-900/20 dark:border-amber-800'
                }`}>
                  <div className="flex items-center gap-2">
                    {resultFeedback === 'correct' ? (
                      <>
                        <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <span className="font-medium text-green-800 dark:text-green-400">Correct!</span>
                      </>
                    ) : (
                      <>
                        <X className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        <span className="font-medium text-amber-800 dark:text-amber-400">Not quite right</span>
                      </>
                    )}
                  </div>
                  
                  {resultFeedback === 'incorrect' && userAnswer && (
                    <div className="mt-2 pl-7">
                      <div className="text-sm text-amber-800 dark:text-amber-400">Your answer:</div>
                      <div className="text-sm font-medium mt-1">{userAnswer}</div>
                    </div>
                  )}
                </div>
              )}
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Answer:</h3>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-100 dark:border-blue-900">
                  {currentCard.answer}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Explanation:</h3>
                <p className="text-sm">{currentCard.explanation}</p>
              </div>
              
              {/* Response Options */}
              <div className="pt-2 flex flex-wrap gap-2 justify-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleFlag}
                  className={isFlagged ? "bg-red-50 text-red-700 border-red-200" : ""}
                >
                  <Flag className={`h-4 w-4 mr-1 ${isFlagged ? "text-red-500" : ""}`} />
                  {isFlagged ? "Flagged" : "Need Help"}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-green-50 text-green-700 border-green-200"
                  onClick={handleRemembered}
                >
                  <ThumbsUp className="h-4 w-4 mr-1 text-green-500" />
                  I Remembered
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-amber-50 text-amber-700 border-amber-200"
                  onClick={handleForgot}
                >
                  <ThumbsDown className="h-4 w-4 mr-1 text-amber-500" />
                  I Forgot
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="border-t bg-gray-50 dark:bg-gray-900/30 flex justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handlePrevCard} 
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              if (revealAnswer) {
                handleNextCard();
              } else {
                setRevealAnswer(true);
              }
            }}
          >
            {revealAnswer ? (
              <>
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </>
            ) : (
              <>
                Reveal
                <RotateCcw className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      {/* Bottom Toolbar */}
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate(-1)}
        >
          <ArrowRight className="h-4 w-4 mr-1 transform rotate-180" />
          Back to Concept
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowSessionSummary(true)}
          >
            Session Summary
          </Button>
          
          <Button 
            variant="default" 
            size="sm"
            onClick={() => {
              resetCardState();
              setCurrentIndex(0);
              setStats({
                correct: 0,
                incorrect: 0,
                skipped: 0,
                flagged: 0,
                total: mockFlashcards.length,
                reviewed: 0
              });
              toast({
                title: "Session restarted",
                description: "Let's go through these flashcards again!"
              });
            }}
          >
            <Repeat className="h-4 w-4 mr-1" />
            Restart
          </Button>
        </div>
      </div>
      
      {/* Session Summary Dialog */}
      <Dialog open={showSessionSummary} onOpenChange={setShowSessionSummary}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Session Summary</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <h3 className="font-medium mb-2">Your Performance</h3>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Accuracy</span>
                    <span className="text-2xl font-bold">{getAccuracyPercentage()}%</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Cards Reviewed</span>
                    <span className="text-2xl font-bold">{stats.reviewed}/{stats.total}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Correct</span>
                    <span className="text-2xl font-bold text-green-600">{stats.correct}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Incorrect</span>
                    <span className="text-2xl font-bold text-red-500">{stats.incorrect}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Recommendation</h3>
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-100 dark:border-amber-800">
                <div className="flex gap-3">
                  <div className="shrink-0">
                    <Lightbulb className="h-10 w-10 text-amber-500" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Focus on your weak areas</p>
                    <p className="text-sm">We recommend reviewing the {stats.incorrect} cards you answered incorrectly to strengthen your understanding.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSessionSummary(false)}>
              Continue Practice
            </Button>
            <Button onClick={endSession}>
              End Session
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnhancedInteractiveFlashcard;
