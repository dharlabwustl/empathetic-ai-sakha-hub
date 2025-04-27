
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, BookmarkIcon, Share2, Mic, RefreshCw, ThumbsUp, ThumbsDown, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface FlashcardData {
  id: string;
  question: string;
  answer: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  imageUrl?: string;
  attempts: {
    date: string;
    correct: boolean;
  }[];
  isBookmarked: boolean;
  relatedCards: {
    id: string;
    question: string;
  }[];
}

const FlashcardPracticePage = () => {
  const { cardId } = useParams();
  const { toast } = useToast();
  const [isFlipped, setIsFlipped] = useState(false);
  const [answer, setAnswer] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [card, setCard] = useState<FlashcardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [cardIndex, setCardIndex] = useState(0);
  const [cards, setCards] = useState<FlashcardData[]>([]);

  useEffect(() => {
    const fetchFlashcard = async () => {
      setLoading(true);
      try {
        // In a real application, fetch from API
        // For now, we're using mock data
        setTimeout(() => {
          const mockCards = [
            {
              id: "1",
              question: "What is Newton's First Law of Motion?",
              answer: "An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an unbalanced force.",
              subject: "Physics",
              topic: "Laws of Motion",
              difficulty: "medium" as const,
              attempts: [],
              isBookmarked: false,
              relatedCards: [
                { id: "2", question: "What is Newton's Second Law of Motion?" },
                { id: "3", question: "What is Newton's Third Law of Motion?" }
              ]
            },
            {
              id: "2",
              question: "What is Newton's Second Law of Motion?",
              answer: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. F = ma.",
              subject: "Physics",
              topic: "Laws of Motion",
              difficulty: "medium" as const,
              attempts: [],
              isBookmarked: false,
              relatedCards: [
                { id: "1", question: "What is Newton's First Law of Motion?" },
                { id: "3", question: "What is Newton's Third Law of Motion?" }
              ]
            },
            {
              id: "3",
              question: "What is Newton's Third Law of Motion?",
              answer: "For every action, there is an equal and opposite reaction.",
              subject: "Physics",
              topic: "Laws of Motion",
              difficulty: "easy" as const,
              attempts: [],
              isBookmarked: true,
              relatedCards: [
                { id: "1", question: "What is Newton's First Law of Motion?" },
                { id: "2", question: "What is Newton's Second Law of Motion?" }
              ]
            }
          ];
          
          setCards(mockCards);
          const foundCard = mockCards.find(c => c.id === cardId) || mockCards[0];
          setCard(foundCard);
          setCardIndex(mockCards.findIndex(c => c.id === foundCard.id));
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching flashcard:', error);
        toast({
          title: "Error",
          description: "Failed to load flashcard data",
          variant: "destructive"
        });
        setLoading(false);
      }
    };

    fetchFlashcard();
  }, [cardId, toast]);

  const handleFlip = () => {
    if (!isFlipped && !hasAnswered) {
      setIsFlipped(true);
    }
  };

  const handleCheckAnswer = () => {
    setHasAnswered(true);
    
    if (!card) return;
    
    // Simple check - in a real app would use more sophisticated comparison
    const userAnswerLower = answer.toLowerCase().trim();
    const correctAnswerLower = card.answer.toLowerCase();
    
    // Check if the answer contains key terms
    const isAnswerCorrect = userAnswerLower.includes(correctAnswerLower.substring(0, 15)) || 
                          correctAnswerLower.includes(userAnswerLower.substring(0, 10));
    
    setIsCorrect(isAnswerCorrect);
    setIsFlipped(true);
    
    toast({
      title: isAnswerCorrect ? "Correct!" : "Not Quite Right",
      description: isAnswerCorrect 
        ? "Great job! You got it right." 
        : "Review the correct answer and try again.",
      variant: isAnswerCorrect ? "default" : "destructive"
    });
  };

  const handleNextCard = () => {
    if (cardIndex < cards.length - 1) {
      setCardIndex(cardIndex + 1);
      setCard(cards[cardIndex + 1]);
    } else {
      // Loop back to the beginning if at the end
      setCardIndex(0);
      setCard(cards[0]);
    }
    
    // Reset states for the new card
    setIsFlipped(false);
    setHasAnswered(false);
    setIsCorrect(null);
    setAnswer('');
  };

  const toggleSpeechRecognition = () => {
    setIsListening(!isListening);
    toast({
      title: isListening ? "Speech Recognition Stopped" : "Listening...",
      duration: 2000
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-4"></div>
          </CardHeader>
          <CardContent>
            <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold">Flashcard Not Found</h2>
        <p className="text-muted-foreground mt-2">The requested flashcard could not be found.</p>
        <Link to="/dashboard/student/flashcards">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Flashcards
          </Button>
        </Link>
      </div>
    );
  }

  const difficultyColor = {
    'easy': 'bg-green-100 text-green-800 border-green-200',
    'medium': 'bg-amber-100 text-amber-800 border-amber-200',
    'hard': 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <Link to="/dashboard/student/flashcards">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to Flashcards
          </Button>
        </Link>
        <div className="text-sm text-muted-foreground">
          Card {cardIndex + 1} of {cards.length}
        </div>
      </div>

      <Progress value={((cardIndex + 1) / cards.length) * 100} className="h-2" />

      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <CardTitle>Flashcard Practice</CardTitle>
              <div className={`text-xs px-2 py-1 rounded-full ${difficultyColor[card.difficulty]}`}>
                {card.difficulty.charAt(0).toUpperCase() + card.difficulty.slice(1)}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant={card.isBookmarked ? "secondary" : "outline"} size="icon" title="Bookmark">
                <BookmarkIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" title="Share">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardDescription className="flex items-center gap-1">
            <span>{card.subject}</span>
            <span className="mx-1">•</span>
            <span>{card.topic}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className={`relative bg-white dark:bg-gray-800 rounded-lg p-6 border shadow-sm 
                  min-h-[200px] flex items-center justify-center cursor-pointer mb-4
                  ${isFlipped ? "border-green-300 dark:border-green-700" : "hover:border-blue-300 dark:hover:border-blue-700"}`}
                onClick={handleFlip}
              >
                {!isFlipped ? (
                  <div className="text-center text-lg font-medium">
                    <h3>{card.question}</h3>
                    {card.imageUrl && (
                      <div className="mt-4">
                        <img 
                          src={card.imageUrl} 
                          alt="Flashcard illustration" 
                          className="max-h-40 mx-auto rounded-md"
                        />
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-4">Click to reveal answer</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="font-medium">{card.answer}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {!hasAnswered && !isFlipped && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="min-h-[100px] w-full"
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={toggleSpeechRecognition} 
                  className={isListening ? "bg-blue-100" : ""}
                >
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                onClick={handleCheckAnswer} 
                className="w-full"
                disabled={!answer.trim()}
              >
                Check Answer
              </Button>
            </div>
          )}

          {hasAnswered && (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  )}
                  <h3 className="font-medium">{isCorrect ? 'Correct!' : 'Not Quite Right'}</h3>
                </div>
                <p className="mt-2 text-sm">
                  {isCorrect 
                    ? "Great job! Your answer matches what we were looking for." 
                    : "Your answer didn't quite match what we were looking for. Review the correct answer above."}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant={isCorrect ? "default" : "outline"} 
                  className="flex-1"
                  onClick={() => {
                    setIsCorrect(true);
                    toast({ title: "Marked as correct" });
                  }}
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  I Got It Right
                </Button>
                <Button 
                  variant={isCorrect === false ? "default" : "outline"} 
                  className="flex-1"
                  onClick={() => {
                    setIsCorrect(false);
                    toast({ title: "Marked as incorrect" });
                  }}
                >
                  <ThumbsDown className="h-4 w-4 mr-2" />
                  I Got It Wrong
                </Button>
              </div>
            </div>
          )}
          
          <div className="pt-4 border-t">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleNextCard}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Next Flashcard
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FlashcardPracticePage;
