
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  AlertCircle, 
  Flag, 
  Calculator, 
  Bookmark,
  Check,
  X,
  Calculator as CalculatorIcon,
  Repeat,
  Play
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import MainLayout from '@/components/layouts/MainLayout';

// Mock data for the flashcard decks
const mockFlashcards = {
  "physics-kinematics": {
    id: "physics-kinematics",
    title: "Physics: Kinematics",
    description: "Motion, velocity, acceleration",
    subject: "Physics",
    topic: "Kinematics",
    cards: [
      {
        id: "phys-1",
        question: "What is the formula for calculating displacement when an object moves with constant acceleration?",
        answer: "s = ut + (1/2)at²",
        explanation: "Where s is displacement, u is initial velocity, t is time, and a is acceleration.",
        difficulty: "medium"
      },
      {
        id: "phys-2",
        question: "Define instantaneous velocity.",
        answer: "The velocity of an object at a specific point in time, calculated as the derivative of position with respect to time.",
        explanation: "Mathematically, it's represented as v = dx/dt, where x is position and t is time.",
        difficulty: "easy"
      },
      {
        id: "phys-3",
        question: "What is the relationship between average velocity and displacement?",
        answer: "Average velocity = displacement / time interval",
        explanation: "This is different from average speed, which is total distance / time interval.",
        difficulty: "medium"
      }
    ]
  },
  "chemistry-periodic": {
    id: "chemistry-periodic",
    title: "Chemistry: Periodic Table",
    description: "Elements, properties, periodicity",
    subject: "Chemistry",
    topic: "Periodic Table",
    cards: [
      {
        id: "chem-1",
        question: "What is the atomic number of Oxygen?",
        answer: "8",
        explanation: "The atomic number represents the number of protons in an atom's nucleus. Oxygen has 8 protons.",
        difficulty: "easy"
      }
    ]
  }
};

const FlashcardInteractivePage = () => {
  const { deckId } = useParams<{deckId: string}>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [responseMode, setResponseMode] = useState<'typing' | 'speech'>('typing');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  // Get the deck data
  const deck = deckId ? mockFlashcards[deckId as keyof typeof mockFlashcards] : null;
  
  // If no deck found, handle error
  useEffect(() => {
    if (!deck && deckId) {
      toast({
        title: "Deck not found",
        description: `No flashcard deck found with ID: ${deckId}`,
        variant: "destructive"
      });
      navigate('/dashboard/student/flashcards');
    }
  }, [deck, deckId, navigate, toast]);

  // Get current card
  const currentCard = deck?.cards[currentCardIndex];

  // Handle going to previous card
  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      resetCardState();
    }
  };

  // Handle going to next card
  const handleNextCard = () => {
    if (deck && currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      resetCardState();
    }
  };

  // Reset the card state when changing cards
  const resetCardState = () => {
    setUserAnswer("");
    setHasSubmitted(false);
    setIsFlipped(false);
    setAccuracy(0);
    setShowExplanation(false);
  };

  // Handle submitting an answer
  const handleSubmit = () => {
    if (!userAnswer.trim() || !currentCard) return;
    
    // Calculate accuracy based on the answer
    const calculatedAccuracy = calculateAccuracy(userAnswer, currentCard.answer);
    setAccuracy(calculatedAccuracy);
    setHasSubmitted(true);

    // Show feedback toast
    if (calculatedAccuracy >= 90) {
      toast({
        title: "Great job!",
        description: "Your answer is correct!",
      });
    } else if (calculatedAccuracy >= 60) {
      toast({
        title: "Almost there!",
        description: "Your answer is partially correct.",
      });
    } else {
      toast({
        title: "Keep trying!",
        description: "Review the answer and try again.",
        variant: "destructive",
      });
    }
  };

  // Reset the current card to try again
  const handleReset = () => {
    setUserAnswer("");
    setHasSubmitted(false);
    setAccuracy(0);
    setShowExplanation(false);
    setIsFlipped(false);
  };

  // Flip the card to show/hide answer
  const handleFlip = () => {
    if (!hasSubmitted) {
      handleSubmit();
    } else {
      setIsFlipped(!isFlipped);
      if (isFlipped) {
        setShowExplanation(false);
      }
    }
  };

  // Mark that you remembered or forgot the answer
  const handleRecallResponse = (remembered: boolean) => {
    toast({
      title: remembered ? "Great!" : "No problem!",
      description: remembered 
        ? "This card will be reviewed less frequently." 
        : "We'll make sure to show you this card more often.",
    });
    handleNextCard();
  };

  // Flag the card for review
  const handleFlagForReview = () => {
    toast({
      title: "Card flagged for review",
      description: "This card will be highlighted in your review sessions.",
    });
    setIsBookmarked(true);
  };

  // Toggle bookmark status
  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark removed" : "Bookmark added",
      description: isBookmarked 
        ? "Card removed from your bookmarks." 
        : "Card added to your bookmarks for later review.",
    });
  };

  // Calculate the answer accuracy
  const calculateAccuracy = (userAnswer: string, correctAnswer: string): number => {
    if (!userAnswer || !correctAnswer) return 0;
    
    const userLower = userAnswer.toLowerCase().trim();
    const correctLower = correctAnswer.toLowerCase().trim();
    
    // Exact match
    if (userLower === correctLower) return 100;
    
    // Check if key terms are present
    const correctTerms = correctLower.split(/\s+|[,.;:]/).filter(word => word.length > 3);
    const userTerms = userLower.split(/\s+|[,.;:]/).filter(word => word.length > 3);
    
    let matchedTerms = 0;
    correctTerms.forEach(term => {
      if (userTerms.some(userTerm => userTerm.includes(term) || term.includes(userTerm))) {
        matchedTerms++;
      }
    });
    
    if (correctTerms.length === 0) return 0;
    return Math.floor((matchedTerms / correctTerms.length) * 100);
  };

  // Get CSS class for accuracy display
  const getAccuracyColor = () => {
    if (accuracy >= 90) return "text-green-500";
    if (accuracy >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  const handleGoBack = () => {
    navigate('/dashboard/student/flashcards');
  };

  if (!deck || !currentCard) {
    return (
      <MainLayout>
        <div className="container py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Flashcard deck not found</h2>
            <p className="mt-2 text-gray-600">The flashcard deck you're looking for doesn't exist.</p>
            <Button className="mt-4" onClick={() => navigate('/dashboard/student/flashcards')}>
              Back to Flashcards
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Button variant="outline" size="sm" onClick={handleGoBack} className="mb-2">
              <ChevronLeft className="h-4 w-4 mr-1" /> Back to Flashcards
            </Button>
            <h1 className="text-3xl font-bold">{deck.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">
                {deck.subject}
              </Badge>
              <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200">
                {deck.topic}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleToggleBookmark}
              className={isBookmarked ? "text-amber-600" : ""}
            >
              <Bookmark className={`h-4 w-4 mr-1 ${isBookmarked ? "fill-amber-200" : ""}`} />
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </Button>
            <Dialog open={showCalculator} onOpenChange={setShowCalculator}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <CalculatorIcon className="h-4 w-4 mr-1" />
                  Calculator
                </Button>
              </DialogTrigger>
              <DialogContent>
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-4">Calculator</h2>
                  <div className="bg-gray-100 border border-gray-300 rounded p-4 text-right mb-4">
                    0
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "-", "0", ".", "=", "+"].map((key) => (
                      <Button 
                        key={key} 
                        variant={["÷", "×", "-", "+", "="].includes(key) ? "default" : "outline"}
                        className="h-12 text-lg"
                      >
                        {key}
                      </Button>
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button variant="outline" className="h-12">AC</Button>
                    <Button variant="outline" className="h-12">DEL</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1 text-sm text-gray-500">
            <span>Card {currentCardIndex + 1} of {deck.cards.length}</span>
            <span>{Math.round((currentCardIndex + 1) / deck.cards.length * 100)}% Complete</span>
          </div>
          <Progress value={(currentCardIndex + 1) / deck.cards.length * 100} className="h-2" />
        </div>

        <div className="mb-6">
          <Tabs defaultValue="typing" onValueChange={(value) => setResponseMode(value as 'typing' | 'speech')}>
            <TabsList>
              <TabsTrigger value="typing">Type Answer</TabsTrigger>
              <TabsTrigger value="speech">Speech to Text</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <Badge className="px-2 py-1">
                {currentCard.difficulty.charAt(0).toUpperCase() + currentCard.difficulty.slice(1)}
              </Badge>
              {hasSubmitted && (
                <Badge className={`px-2 py-1 ${accuracy >= 90 ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                  {accuracy}% accuracy
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <motion.div
              className="bg-white rounded-lg py-6 px-4 shadow-sm border border-gray-200 min-h-[200px]"
              initial={false}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {!isFlipped ? (
                <div className="space-y-6">
                  <h3 className="text-xl font-medium text-gray-800">{currentCard.question}</h3>
                  
                  {responseMode === 'typing' && (
                    <Textarea
                      placeholder="Type your answer here..."
                      className="min-h-[120px] resize-none"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      disabled={hasSubmitted}
                    />
                  )}
                  
                  {responseMode === 'speech' && (
                    <div className="border border-dashed border-gray-300 rounded p-4 flex flex-col items-center justify-center min-h-[120px]">
                      <Button className="mb-2" disabled={hasSubmitted}>
                        <Play className="h-4 w-4 mr-2" /> Start Speaking
                      </Button>
                      <p className="text-gray-500 text-sm text-center">
                        {userAnswer ? userAnswer : "Click the button and speak your answer"}
                      </p>
                    </div>
                  )}
                  
                  {hasSubmitted && (
                    <div className="pt-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Accuracy:</span>
                          <span className={`font-bold ${getAccuracyColor()}`}>
                            {accuracy}%
                          </span>
                        </div>
                        {accuracy < 90 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleReset}
                          >
                            <RotateCcw className="h-4 w-4 mr-1" />
                            Try Again
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-2 flex justify-center gap-4">
                    {!hasSubmitted ? (
                      <Button onClick={handleSubmit}>Check Answer</Button>
                    ) : (
                      <Button onClick={handleFlip}>
                        {accuracy >= 90 ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            View Answer
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-4 w-4 mr-2" />
                            View Answer
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4 transform rotate-y-180">
                  <h3 className="text-xl font-medium text-gray-800">Answer:</h3>
                  <div className="p-4 rounded-md bg-blue-50 border border-blue-100">
                    <p className="text-blue-800">{currentCard.answer}</p>
                  </div>
                  
                  {currentCard.explanation && (
                    <>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setShowExplanation(!showExplanation)}
                      >
                        {showExplanation ? "Hide Explanation" : "Show Explanation"}
                      </Button>
                      
                      {showExplanation && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="p-4 rounded-md bg-gray-50 border border-gray-200"
                        >
                          <h4 className="font-medium mb-1">Explanation:</h4>
                          <p>{currentCard.explanation}</p>
                        </motion.div>
                      )}
                    </>
                  )}
                  
                  <div className="pt-2 flex justify-between">
                    <Button variant="outline" onClick={handleFlip}>
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Back to Question
                    </Button>
                    <Button variant="outline" onClick={() => handleFlagForReview()}>
                      <Flag className="h-4 w-4 mr-2" />
                      Flag for Review
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                disabled={currentCardIndex === 0} 
                onClick={handlePrevCard}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                disabled={!deck || currentCardIndex >= deck.cards.length - 1}
                onClick={handleNextCard}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => handleRecallResponse(false)}
                className="bg-red-500 hover:bg-red-600"
              >
                <X className="h-4 w-4 mr-1" />
                I Forgot
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => handleRecallResponse(true)}
                className="bg-green-500 hover:bg-green-600"
              >
                <Check className="h-4 w-4 mr-1" />
                I Remembered
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleReset}
              >
                <Repeat className="h-4 w-4 mr-1" />
                Retry
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default FlashcardInteractivePage;
