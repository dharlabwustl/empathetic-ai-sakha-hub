
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, RotateCw, Check, X, Bookmark, BookmarkPlus, Save, Dices,
         Calculator, Mic, Brain, Volume2, ThumbsUp, ThumbsDown, Clock, Pencil } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

interface FlashcardData {
  id: string;
  question: string;
  answer: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionType: 'text' | 'image' | 'video' | 'audio';
  tags: string[];
}

const FlashcardInteractive = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cards, setCards] = useState<FlashcardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userResponses, setUserResponses] = useState<Record<string, boolean>>({});
  const [userAnswer, setUserAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [accuracyScore, setAccuracyScore] = useState<number | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [studyTime, setStudyTime] = useState(0);
  const [speechToTextActive, setSpeechToTextActive] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("type");

  useEffect(() => {
    // Mock data - in a real app this would come from an API call
    const fetchFlashcards = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockCards: FlashcardData[] = [
            {
              id: '1',
              question: "What is Newton\'s Third Law of Motion?",
              answer: 'For every action, there is an equal and opposite reaction.',
              subject: 'Physics',
              topic: 'Classical Mechanics',
              difficulty: 'medium',
              questionType: 'text',
              tags: ['Newton', 'Laws of Motion', 'Physics']
            },
            {
              id: '2',
              question: 'What is the chemical formula for water?',
              answer: 'H2O',
              subject: 'Chemistry',
              topic: 'Chemical Formulas',
              difficulty: 'easy',
              questionType: 'text',
              tags: ['Chemistry', 'Formulas', 'Elements']
            },
            {
              id: '3',
              question: 'What is the Pythagorean theorem?',
              answer: 'In a right-angled triangle, the square of the length of the hypotenuse equals the sum of squares of the other two sides (a² + b² = c²).',
              subject: 'Mathematics',
              topic: 'Geometry',
              difficulty: 'medium',
              questionType: 'text',
              tags: ['Math', 'Geometry', 'Triangles']
            },
            {
              id: '4',
              question: 'What is photosynthesis?',
              answer: 'The process by which green plants and some other organisms use sunlight to synthesize nutrients from carbon dioxide and water.',
              subject: 'Biology',
              topic: 'Cell Biology',
              difficulty: 'hard',
              questionType: 'text',
              tags: ['Biology', 'Plants', 'Energy']
            },
            {
              id: '5',
              question: 'Who wrote "Romeo and Juliet"?',
              answer: 'William Shakespeare',
              subject: 'Literature',
              topic: 'Classic Literature',
              difficulty: 'easy',
              questionType: 'text',
              tags: ['Literature', 'Shakespeare', 'Plays']
            },
          ];
          setCards(mockCards);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
        toast({
          title: "Failed to load flashcards",
          description: "Please try again later",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    fetchFlashcards();
    
    // Timer for study time tracking
    const timer = setInterval(() => {
      setStudyTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [deckId, toast]);

  // Format study time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const submitAnswer = () => {
    if (userAnswer.trim() === '') return;
    
    setIsSubmitted(true);
    
    // Simple accuracy calculation (in a real app, use more sophisticated algorithms)
    const answerWords = cards[currentIndex].answer.toLowerCase().split(/\s+/);
    const userWords = userAnswer.toLowerCase().split(/\s+/);
    
    const matchedWords = userWords.filter(word => 
      answerWords.some(answerWord => answerWord.includes(word) || word.includes(answerWord))
    );
    
    const accuracy = Math.min(100, Math.round((matchedWords.length / answerWords.length) * 100));
    setAccuracyScore(accuracy);
    
    // Update user responses
    setUserResponses(prev => ({
      ...prev,
      [cards[currentIndex].id]: accuracy > 60,
    }));
    
    // Show toast with result
    toast({
      title: accuracy > 70 ? "Great job!" : "Keep practicing!",
      description: `Your answer was ${accuracy}% accurate.`,
      variant: accuracy > 70 ? "default" : "destructive",
    });
  };

  const handleResponse = (knew: boolean) => {
    setUserResponses(prev => ({
      ...prev,
      [cards[currentIndex].id]: knew,
    }));
    
    // Move to next card
    if (currentIndex < cards.length - 1) {
      moveToNextCard();
    } else {
      // End of deck
      toast({
        title: "Deck completed!",
        description: "Moving to results page",
      });
      
      // In a real app, you would save the results and navigate to a results page
      setTimeout(() => {
        navigate(`/dashboard/student/flashcards/${deckId}/results`);
      }, 1500);
    }
  };

  const moveToNextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetCardState();
    }
  };

  const moveToPreviousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      resetCardState();
    }
  };

  const resetCardState = () => {
    setIsFlipped(false);
    setUserAnswer("");
    setIsSubmitted(false);
    setAccuracyScore(null);
    setSpeechToTextActive(false);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: !isBookmarked ? "Flashcard bookmarked" : "Bookmark removed",
      description: !isBookmarked 
        ? "You can find this card in your bookmarks section." 
        : "Card removed from your bookmarks.",
    });
  };

  const retryCard = () => {
    setIsSubmitted(false);
    setUserAnswer("");
    setAccuracyScore(null);
  };

  const toggleSpeechToText = () => {
    setSpeechToTextActive(!speechToTextActive);
    if (!speechToTextActive) {
      toast({
        title: "Speech recognition activated",
        description: "Start speaking to convert your speech to text",
      });
      // Simulating speech-to-text functionality
      setTimeout(() => {
        if (cards[currentIndex].subject === 'Physics') {
          setUserAnswer(prev => prev + " Force equals mass times acceleration");
        } else if (cards[currentIndex].subject === 'Chemistry') {
          setUserAnswer(prev => prev + " H2O is water");
        } else {
          setUserAnswer(prev => prev + " Speaking my answer...");
        }
      }, 2000);
    }
  };

  const toggleCalculator = () => {
    setIsCalculatorOpen(!isCalculatorOpen);
  };

  // Insert mathematical symbols into answer
  const insertMathSymbol = (symbol: string) => {
    setUserAnswer(prev => prev + symbol);
  };

  const addVoiceRead = () => {
    toast({
      title: "Reading aloud",
      description: "The question is being read aloud",
    });
    // In a real app, this would trigger text-to-speech
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No flashcards found</h2>
          <Button onClick={() => navigate('/dashboard/student/flashcards')}>
            Go Back to Flashcards
          </Button>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header area */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Button variant="outline" onClick={() => navigate('/dashboard/student/flashcards')} className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Flashcards
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold">{currentCard.subject} Flashcards</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge variant="secondary">{currentCard.topic}</Badge>
            <Badge variant={
              currentCard.difficulty === 'easy' ? "outline" : 
              currentCard.difficulty === 'medium' ? "secondary" : "destructive"
            }>
              {currentCard.difficulty.charAt(0).toUpperCase() + currentCard.difficulty.slice(1)}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              {formatTime(studyTime)}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleBookmark}
            className={isBookmarked ? "text-yellow-500 border-yellow-200" : ""}
          >
            {isBookmarked ? <Bookmark className="fill-yellow-500" /> : <BookmarkPlus />}
          </Button>
          <Button variant="outline" size="icon" onClick={addVoiceRead}>
            <Volume2 />
          </Button>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span>Card {currentIndex + 1} of {cards.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      {/* Main flashcard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="relative min-h-[300px]">
            <Card 
              className={`min-h-[300px] flex flex-col justify-center p-6 cursor-pointer transition-all duration-300 ${isFlipped ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
              onClick={handleFlip}
            >
              <div className="flex justify-between mb-4">
                <Badge>{isFlipped ? 'Answer' : 'Question'}</Badge>
                <span className="text-sm text-muted-foreground">Tap to flip</span>
              </div>
              
              {currentCard.questionType === 'image' && !isFlipped && (
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 mb-4 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400">Question Image</span>
                </div>
              )}
              
              {currentCard.questionType === 'video' && !isFlipped && (
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 mb-4 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400">Question Video</span>
                </div>
              )}
              
              {currentCard.questionType === 'audio' && !isFlipped && (
                <div className="w-full h-20 bg-gray-200 dark:bg-gray-700 mb-4 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400">Question Audio</span>
                </div>
              )}
              
              <div className="flex-grow flex items-center justify-center">
                <div className="prose max-w-none dark:prose-invert">
                  {isFlipped ? (
                    <div>
                      {currentCard.answer.split('\n').map((paragraph, idx) => (
                        <p key={idx} className="text-lg">{paragraph}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xl font-medium">{currentCard.question}</p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center mt-4">
                <Button variant="outline" size="sm" className="animate-pulse">
                  <RotateCw className="mr-2 h-4 w-4" />
                  {isFlipped ? 'Show Question' : 'Show Answer'}
                </Button>
              </div>
            </Card>
          </div>
          
          {/* Answer input area */}
          <div className="mt-6">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="w-full justify-start mb-4">
                <TabsTrigger value="type">Type Answer</TabsTrigger>
                <TabsTrigger value="speak">Speak Answer</TabsTrigger>
                <TabsTrigger value="math">Math Tools</TabsTrigger>
                <TabsTrigger value="draw">Draw Answer</TabsTrigger>
              </TabsList>
              
              <TabsContent value="type" className="mt-0">
                <Textarea
                  placeholder="Type your answer here..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={isSubmitted}
                  className="min-h-[120px]"
                />
              </TabsContent>
              
              <TabsContent value="speak" className="mt-0">
                <div className="bg-muted/30 rounded-lg p-6 text-center">
                  <Button
                    variant={speechToTextActive ? "destructive" : "default"}
                    className="mx-auto mb-3"
                    onClick={toggleSpeechToText}
                  >
                    <Mic className="mr-2 h-4 w-4" />
                    {speechToTextActive ? "Stop Recording" : "Start Speaking"}
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    {speechToTextActive
                      ? "Listening... Speak your answer clearly."
                      : "Click the button and start speaking to convert your speech to text."}
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="math" className="mt-0">
                <div className="bg-muted/30 rounded-lg p-6 text-center">
                  <Button variant="outline" className="mx-auto mb-3" onClick={toggleCalculator}>
                    <Calculator className="mr-2 h-4 w-4" />
                    Open Calculator
                  </Button>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                    {["x²", "√", "π", "÷", "∫", "Σ", "∞", "θ"].map((symbol) => (
                      <Button
                        key={symbol}
                        variant="outline"
                        size="sm"
                        onClick={() => insertMathSymbol(symbol)}
                      >
                        {symbol}
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="draw" className="mt-0">
                <div className="bg-muted/30 rounded-lg p-6 text-center h-[200px] flex items-center justify-center">
                  <div className="text-center">
                    <Pencil className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Drawing tools would appear here for sketching your answer.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-4 flex flex-wrap gap-3">
              {!isSubmitted ? (
                <>
                  <Button onClick={submitAnswer} disabled={userAnswer.trim() === ""}>
                    Submit Answer
                  </Button>
                  <Button variant="outline" onClick={handleFlip}>
                    <RotateCw className="mr-2 h-4 w-4" />
                    Flip Card
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={retryCard}>
                    <RotateCw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                  <Button onClick={moveToNextCard}>
                    Next Card
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          {/* Accuracy score (shows after submission) */}
          {isSubmitted && accuracyScore !== null && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Answer Accuracy</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex justify-between mb-1 text-sm">
                  <span>Score</span>
                  <span>{accuracyScore}%</span>
                </div>
                <Progress 
                  value={accuracyScore} 
                  className={`h-2 mb-4 ${
                    accuracyScore > 70 ? "bg-green-500" : 
                    accuracyScore > 40 ? "bg-amber-500" : "bg-red-500"
                  }`}
                />
                
                <div className="flex justify-center space-x-4 mt-4">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Good Recall
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <ThumbsDown className="mr-2 h-4 w-4" />
                    Need Practice
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Navigation and stats */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Navigation</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={moveToPreviousCard} 
                  disabled={currentIndex === 0}
                  className="flex items-center"
                  size="sm"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    const randomIndex = Math.floor(Math.random() * cards.length);
                    setCurrentIndex(randomIndex);
                    resetCardState();
                  }}
                  className="flex items-center mx-2"
                  size="sm"
                >
                  <Dices className="mr-1 h-4 w-4" />
                  Random
                </Button>
                <Button 
                  variant="outline" 
                  onClick={moveToNextCard} 
                  disabled={currentIndex === cards.length - 1}
                  className="flex items-center"
                  size="sm"
                >
                  Next
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Tags */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Tags</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex flex-wrap gap-2">
                {currentCard.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Study stats */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Study Statistics</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Recall Accuracy</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Cards Practiced</span>
                    <span>{currentIndex + 1}/{cards.length}</span>
                  </div>
                  <Progress value={(currentIndex + 1) / cards.length * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Study Streak</span>
                    <span>4 days</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Related resources */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Related Resources</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                  onClick={() => navigate(`/dashboard/student/concepts/card/1`)}
                >
                  <Brain className="mr-2 h-4 w-4" />
                  {currentCard.topic} Concept Cards
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                  onClick={() => navigate(`/dashboard/student/practice-exam/1`)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Practice Quiz: {currentCard.subject}
                </Button>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Save className="mr-2 h-4 w-4" />
                Save Study Session
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FlashcardInteractive;
