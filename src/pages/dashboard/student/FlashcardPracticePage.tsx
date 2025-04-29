
import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeftIcon, Bookmark, RotateCw, ThumbsUp, ThumbsDown, 
  Volume2, Calculator, Check, X, Brain, ChevronRightIcon, 
  ChevronLeft, RefreshCw, Star, StarIcon 
} from 'lucide-react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SharedPageLayout } from "@/components/dashboard/student/SharedPageLayout";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  explanation: string;
  subject: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  imageUrl?: string;
  formula?: string;
  tags: string[];
  lastReviewed?: string;
  nextReview?: string;
  status: 'New' | 'Learning' | 'Review' | 'Mastered';
  recallAccuracy?: number;
}

const mockFlashcard: Flashcard = {
  id: "f1",
  question: "What is Newton's Third Law of Motion?",
  answer: "For every action, there is an equal and opposite reaction.",
  explanation: "Newton's Third Law states that when one object exerts a force on a second object, the second object exerts an equal and opposite force on the first. This law explains many everyday phenomena, from rocket propulsion to walking.",
  subject: "Physics",
  topic: "Laws of Motion",
  difficulty: "Medium",
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Third_law_of_action_and_reaction.svg/1200px-Third_law_of_action_and_reaction.svg.png",
  formula: "F₁₂ = -F₂₁",
  tags: ["mechanics", "forces", "newton's laws"],
  lastReviewed: "2025-04-26",
  nextReview: "2025-04-29",
  status: "Learning",
  recallAccuracy: 75
};

const FlashcardPracticePage = () => {
  const { cardId } = useParams<{cardId: string}>();
  const [flashcard, setFlashcard] = useState<Flashcard>(mockFlashcard);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const answerRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    // In a real app, we would fetch the flashcard data using the cardId
    console.log("Flashcard ID:", cardId);
  }, [cardId]);
  
  const handleSubmit = () => {
    if (!userAnswer.trim()) return;
    
    // Simple accuracy calculation - can be improved with more sophisticated algorithms
    const accuracy = calculateAccuracy(userAnswer, flashcard.answer);
    setAccuracy(accuracy);
    setHasSubmitted(true);
    setAttempts(prev => prev + 1);
  };
  
  const calculateAccuracy = (userAnswer: string, correctAnswer: string) => {
    const userLower = userAnswer.toLowerCase().trim();
    const correctLower = correctAnswer.toLowerCase().trim();
    
    if (userLower === correctLower) {
      return 100;
    }
    
    // Check for key terms
    const correctWords = correctLower.split(/\s+/).filter(word => word.length > 3);
    const userWords = userLower.split(/\s+/);
    
    let matchedWords = 0;
    correctWords.forEach(word => {
      if (userWords.includes(word)) matchedWords++;
    });
    
    return Math.min(Math.round((matchedWords / correctWords.length) * 100), 90);
  };
  
  const handleReset = () => {
    setUserAnswer("");
    setHasSubmitted(false);
    setAccuracy(0);
    setIsFlipped(false);
    answerRef.current?.focus();
  };
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    // In a real app, you'd save this to the backend
  };
  
  const handleRetry = () => {
    setUserAnswer("");
    setHasSubmitted(false);
    setAccuracy(0);
  };
  
  const handleSpeakQuestion = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(flashcard.question);
      speechSynthesis.speak(utterance);
    }
  };
  
  // Create a visual indicator based on accuracy
  const getAccuracyColor = () => {
    if (accuracy >= 90) return "text-green-500";
    if (accuracy >= 70) return "text-amber-500";
    return "text-red-500";
  };
  
  const getAccuracyBadge = () => {
    if (accuracy >= 90) return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    if (accuracy >= 70) return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
    return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
  };

  return (
    <SharedPageLayout
      title="Flashcard Practice"
      subtitle="Test your knowledge and boost your recall"
      showBackLink={true}
      backLinkText="Back to Flashcards"
      backLinkUrl="/dashboard/student/flashcards"
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <Link to="/dashboard/student/flashcards" className="text-sm text-blue-600 hover:underline inline-flex items-center">
              <ChevronLeftIcon size={16} className="mr-1" />
              Back to Flashcards
            </Link>
          </div>
          
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Badge className={`${
              flashcard.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
              flashcard.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
            }`}>
              {flashcard.difficulty}
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
              {flashcard.subject}
            </Badge>
            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300">
              {flashcard.topic}
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="relative min-h-[400px] perspective-1000">
              <motion.div
                className={`w-full min-h-[400px] relative ${isFlipped ? 'rotate-y-180' : ''}`}
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front of card - Question */}
                <Card className={`absolute w-full h-full backface-hidden ${isFlipped ? 'hidden' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-bold">Question</h2>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={handleSpeakQuestion} title="Read aloud">
                          <Volume2 size={18} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handleBookmarkToggle} title="Bookmark">
                          {isBookmarked ? 
                            <Bookmark className="h-5 w-5 fill-current text-amber-500" /> :
                            <Bookmark className="h-5 w-5" />
                          }
                        </Button>
                      </div>
                    </div>
                    
                    <div className="prose dark:prose-invert max-w-none mb-6">
                      <p className="text-lg">{flashcard.question}</p>
                    </div>
                    
                    {flashcard.imageUrl && (
                      <div className="mb-6">
                        <img 
                          src={flashcard.imageUrl} 
                          alt="Flashcard visual" 
                          className="rounded-lg mx-auto max-h-48"
                        />
                      </div>
                    )}
                    
                    {flashcard.formula && (
                      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg mb-6 text-center">
                        <p className="font-mono">{flashcard.formula}</p>
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      <Textarea
                        ref={answerRef}
                        placeholder="Type your answer here..."
                        className="min-h-[120px] resize-none"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        disabled={hasSubmitted}
                      />
                      
                      {hasSubmitted ? (
                        <div className="flex flex-col sm:flex-row gap-3 justify-between">
                          <div className="flex items-center">
                            <Badge className={getAccuracyBadge()}>
                              Accuracy: {accuracy}%
                            </Badge>
                            {accuracy >= 90 ? (
                              <ThumbsUp className="ml-2 text-green-500" size={18} />
                            ) : accuracy >= 70 ? (
                              <span className="ml-2 text-amber-500">Almost there!</span>
                            ) : (
                              <ThumbsDown className="ml-2 text-red-500" size={18} />
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" onClick={handleFlip} className="gap-1">
                              <RotateCw size={16} />
                              Show Answer
                            </Button>
                            <Button variant="ghost" onClick={handleRetry} className="gap-1">
                              <RefreshCw size={16} />
                              Try Again
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between">
                          <Button variant="outline" onClick={handleFlip}>
                            <RotateCw size={16} className="mr-1" />
                            Flip Card
                          </Button>
                          <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setUserAnswer("")}>
                              Clear
                            </Button>
                            <Button onClick={handleSubmit} disabled={!userAnswer.trim()}>
                              <Check size={16} className="mr-1" />
                              Submit
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Back of card - Answer */}
                <Card className={`absolute w-full h-full backface-hidden rotate-y-180 ${!isFlipped ? 'hidden' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-bold">Answer</h2>
                      <Button variant="ghost" size="sm" onClick={handleFlip}>
                        <RotateCw size={18} />
                      </Button>
                    </div>
                    
                    <div className="prose dark:prose-invert max-w-none mb-6">
                      <p className="text-lg font-medium">{flashcard.answer}</p>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800/50 mb-6">
                      <h3 className="font-medium text-blue-800 dark:text-blue-300">Explanation</h3>
                      <p className="mt-2 text-blue-700 dark:text-blue-300">{flashcard.explanation}</p>
                    </div>
                    
                    {hasSubmitted && (
                      <div className="mb-6">
                        <h3 className="font-medium mb-2">Your Answer</h3>
                        <p className={cn("p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg", 
                          accuracy >= 90 ? "border-green-300 dark:border-green-600" : 
                          accuracy >= 70 ? "border-amber-300 dark:border-amber-600" : 
                          "border-red-300 dark:border-red-600"
                        )}>
                          {userAnswer}
                        </p>
                        
                        <div className="flex items-center justify-between mt-3">
                          <Badge className={getAccuracyBadge()}>
                            Accuracy: {accuracy}%
                          </Badge>
                          <div>
                            <span className="text-sm mr-2">How well did you know this?</span>
                            <div className="inline-flex">
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <Button key={rating} size="sm" variant="ghost" className="p-1 h-auto">
                                  <Star size={16} className={rating <= 3 ? "text-amber-500 fill-amber-500" : ""} />
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={handleReset}>
                        <RefreshCw size={16} className="mr-1" />
                        Reset & Try Again
                      </Button>
                      <Button onClick={handleBookmarkToggle}>
                        {isBookmarked ? 
                          <Bookmark className="h-4 w-4 fill-current mr-1" /> :
                          <Bookmark className="h-4 w-4 mr-1" />
                        }
                        {isBookmarked ? "Bookmarked" : "Bookmark"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Study Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Recall Accuracy</span>
                      <span>{flashcard.recallAccuracy}%</span>
                    </div>
                    <Progress value={flashcard.recallAccuracy} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Status</span>
                      <Badge variant="outline" className={
                        flashcard.status === "Mastered" ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300" :
                        flashcard.status === "Learning" ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300" :
                        flashcard.status === "Review" ? "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300" :
                        "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
                      }>
                        {flashcard.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Last Reviewed</p>
                      <p className="font-medium">{new Date(flashcard.lastReviewed || "").toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Next Review</p>
                      <p className="font-medium">{new Date(flashcard.nextReview || "").toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Related Flashcards</h3>
                <div className="space-y-3">
                  <Link to="/dashboard/student/flashcards/practice/f2" className="block p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <p className="font-medium">Newton's First Law of Motion</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 text-xs">Physics</Badge>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs">Easy</Badge>
                    </div>
                  </Link>
                  <Link to="/dashboard/student/flashcards/practice/f3" className="block p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <p className="font-medium">Newton's Second Law of Motion</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 text-xs">Physics</Badge>
                      <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs">Medium</Badge>
                    </div>
                  </Link>
                </div>
                <Button variant="link" className="w-full mt-2">View More</Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <Button variant="outline" className="gap-2">
            <ChevronLeft size={16} />
            Previous Card
          </Button>
          <Button variant="outline" className="gap-2">
            Next Card
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default FlashcardPracticePage;
