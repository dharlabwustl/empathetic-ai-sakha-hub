
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bookmark, 
  BookmarkPlus, 
  Mic, 
  Calculator, 
  Rotate3d, 
  Check, 
  RefreshCw,
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const FlashcardInteractive = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  
  // State for the flashcard
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  
  // Mock flashcard data
  const mockFlashcards = [
    {
      id: '1',
      question: "What is Newton's First Law of Motion?",
      answer: "An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.",
      subject: "Physics",
      topic: "Mechanics",
      difficulty: "Medium",
      type: "text"
    },
    {
      id: '2',
      question: "Define the term 'Activation Energy' in a chemical reaction.",
      answer: "Activation energy is the minimum energy required to initiate a chemical reaction.",
      subject: "Chemistry",
      topic: "Kinetics",
      difficulty: "Easy",
      type: "text"
    },
    {
      id: '3',
      question: "Solve the equation: 2x + 5 = 15",
      answer: "x = 5",
      subject: "Mathematics",
      topic: "Algebra",
      difficulty: "Easy",
      type: "text"
    },
    {
      id: '4',
      question: "What are the main components of a eukaryotic cell?",
      answer: "The main components include: cell membrane, nucleus, cytoplasm, mitochondria, endoplasmic reticulum, Golgi apparatus, lysosomes, and various other organelles.",
      subject: "Biology",
      topic: "Cell Biology",
      difficulty: "Medium",
      type: "text"
    }
  ];
  
  const currentCard = mockFlashcards[cardIndex];
  
  // Handle flipping the card
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  // Handle answer submission
  const handleSubmit = () => {
    // In a real app, we would compare the answer with the correct one
    // and calculate accuracy, but here we'll simulate it
    const randomAccuracy = Math.floor(Math.random() * 40) + 60; // Random accuracy between 60-100%
    setAccuracy(randomAccuracy);
    setHasSubmitted(true);
  };
  
  // Handle moving to the next card
  const handleNextCard = () => {
    if (cardIndex < mockFlashcards.length - 1) {
      setCardIndex(cardIndex + 1);
      resetCard();
    }
  };
  
  // Handle moving to the previous card
  const handlePrevCard = () => {
    if (cardIndex > 0) {
      setCardIndex(cardIndex - 1);
      resetCard();
    }
  };
  
  // Reset the card state
  const resetCard = () => {
    setIsFlipped(false);
    setUserAnswer('');
    setHasSubmitted(false);
    setAccuracy(null);
  };
  
  // Handle retry
  const handleRetry = () => {
    resetCard();
  };
  
  // Toggle bookmark
  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button variant="outline" onClick={() => navigate('/dashboard/student/flashcards')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Flashcards
          </Button>
          <div className="text-center">
            <h2 className="text-2xl font-bold">{currentCard.subject}: {currentCard.topic}</h2>
            <p className="text-gray-500 dark:text-gray-400">Flashcard {cardIndex + 1} of {mockFlashcards.length}</p>
          </div>
          <div className="w-[100px]">
            {/* Placeholder for symmetry */}
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mb-8">
          <Progress value={((cardIndex + 1) / mockFlashcards.length) * 100} className="h-2" />
        </div>
        
        <div className="relative perspective-1000">
          {/* Flashcard */}
          <div 
            className={`relative w-full transition-transform duration-500 transform-style-preserve-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
          >
            {/* Front side (Question) */}
            <Card 
              className={`p-8 ${isFlipped ? 'opacity-0' : 'opacity-100'}`}
              style={{ 
                backfaceVisibility: 'hidden',
                transition: 'opacity 0.3s ease',
                minHeight: '400px'
              }}
            >
              <div className="flex justify-between items-start mb-6">
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  Question
                </Badge>
                <Badge className={`${
                  currentCard.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                  currentCard.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                }`}>
                  {currentCard.difficulty}
                </Badge>
              </div>
              
              <div className="flex flex-col justify-center items-center h-[300px] text-center">
                <h3 className="text-xl font-medium mb-8">{currentCard.question}</h3>
              </div>
              
              <div className="mt-6">
                <Textarea 
                  placeholder="Type your answer here..."
                  className="mb-4"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={hasSubmitted}
                  rows={4}
                />
                
                <div className="flex justify-between flex-wrap gap-2">
                  <div className="space-x-2">
                    <Button
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowCalculator(!showCalculator)}
                    >
                      <Calculator className="h-4 w-4 mr-1" />
                      Calculator
                    </Button>
                    <Button
                      variant="outline" 
                      size="sm"
                    >
                      <Mic className="h-4 w-4 mr-1" />
                      Voice Input
                    </Button>
                  </div>
                  
                  <div className="space-x-2">
                    <Button 
                      variant="outline"
                      onClick={handleFlip}
                    >
                      <Rotate3d className="h-4 w-4 mr-1" />
                      Flip Card
                    </Button>
                    {!hasSubmitted ? (
                      <Button 
                        onClick={handleSubmit} 
                        disabled={!userAnswer.trim()}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Submit
                      </Button>
                    ) : (
                      <Button 
                        variant="outline"
                        onClick={handleRetry}
                      >
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Retry
                      </Button>
                    )}
                  </div>
                </div>
                
                {/* Accuracy feedback */}
                {hasSubmitted && accuracy !== null && (
                  <div className="mt-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                    <h4 className="font-medium mb-2">AI Accuracy Assessment</h4>
                    <div className="flex items-center mb-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-2">
                        <div 
                          className={`h-2.5 rounded-full ${
                            accuracy >= 80 ? 'bg-green-600' :
                            accuracy >= 60 ? 'bg-yellow-500' :
                            'bg-red-600'
                          }`} 
                          style={{ width: `${accuracy}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{accuracy}%</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {accuracy >= 80 ? 'Great job! Your answer is mostly correct.' :
                       accuracy >= 60 ? 'Good attempt. Some elements are correct, but there\'s room for improvement.' :
                       'Your answer needs improvement. Try reviewing the concept again.'}
                    </p>
                  </div>
                )}
              </div>
            </Card>
            
            {/* Back side (Answer) */}
            <Card 
              className={`p-8 absolute inset-0 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                transition: 'opacity 0.3s ease',
                minHeight: '400px'
              }}
            >
              <div className="flex justify-between items-start mb-6">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  Answer
                </Badge>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={isBookmarked ? 'text-yellow-500' : ''}
                  onClick={handleToggleBookmark}
                >
                  {isBookmarked ? (
                    <Bookmark className="h-5 w-5" />
                  ) : (
                    <BookmarkPlus className="h-5 w-5" />
                  )}
                </Button>
              </div>
              
              <div className="flex flex-col justify-center items-center h-[300px] overflow-y-auto">
                <p className="text-lg">{currentCard.answer}</p>
              </div>
              
              <div className="mt-6 flex justify-between">
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Got it
                  </Button>
                  <Button variant="outline" size="sm">
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    Needs Review
                  </Button>
                </div>
                
                <Button 
                  onClick={handleFlip}
                >
                  <Rotate3d className="h-4 w-4 mr-1" />
                  Flip Back
                </Button>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Navigation controls */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={handlePrevCard}
            disabled={cardIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous Card
          </Button>
          
          <div className="text-center">
            <span className="text-sm text-gray-500">
              {cardIndex + 1} of {mockFlashcards.length}
            </span>
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleNextCard}
            disabled={cardIndex === mockFlashcards.length - 1}
          >
            Next Card
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardInteractive;
