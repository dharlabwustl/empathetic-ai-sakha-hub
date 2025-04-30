
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, RotateCw, Check, X } from "lucide-react";

interface FlashcardData {
  id: string;
  question: string;
  answer: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const FlashcardInteractive = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cards, setCards] = useState<FlashcardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userResponses, setUserResponses] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - in a real app this would come from an API call
    const fetchFlashcards = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockCards: FlashcardData[] = [
            {
              id: '1',
              question: 'What is Newton's Third Law of Motion?',
              answer: 'For every action, there is an equal and opposite reaction.',
              subject: 'Physics',
              difficulty: 'medium',
            },
            {
              id: '2',
              question: 'What is the chemical formula for water?',
              answer: 'H2O',
              subject: 'Chemistry',
              difficulty: 'easy',
            },
            {
              id: '3',
              question: 'What is the Pythagorean theorem?',
              answer: 'In a right-angled triangle, the square of the length of the hypotenuse equals the sum of squares of the other two sides (a² + b² = c²).',
              subject: 'Mathematics',
              difficulty: 'medium',
            },
            {
              id: '4',
              question: 'What is photosynthesis?',
              answer: 'The process by which green plants and some other organisms use sunlight to synthesize nutrients from carbon dioxide and water.',
              subject: 'Biology',
              difficulty: 'hard',
            },
            {
              id: '5',
              question: 'Who wrote "Romeo and Juliet"?',
              answer: 'William Shakespeare',
              subject: 'Literature',
              difficulty: 'easy',
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
  }, [deckId, toast]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleResponse = (knew: boolean) => {
    setUserResponses(prev => ({
      ...prev,
      [cards[currentIndex].id]: knew,
    }));
    
    // Move to next card
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
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

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate('/dashboard/student/flashcards')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Flashcards
        </Button>
      </div>

      <h1 className="text-2xl font-bold mb-2">Flashcard Practice</h1>
      <p className="text-muted-foreground mb-6">Deck: {deckId} • Card {currentIndex + 1} of {cards.length}</p>

      <div className="relative w-full h-2 bg-gray-200 rounded-full mb-6">
        <div 
          className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="mb-8">
        <Card 
          className={`p-6 min-h-[200px] md:min-h-[300px] flex items-center justify-center relative transition-all duration-500 cursor-pointer ${isFlipped ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-white dark:bg-gray-800'}`}
          onClick={handleFlip}
        >
          <div className="text-center">
            {!isFlipped ? (
              <div>
                <h3 className="text-xl font-medium mb-2">Question:</h3>
                <p className="text-lg">{currentCard.question}</p>
                <p className="text-sm text-muted-foreground mt-4">
                  Click to reveal answer
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-medium mb-2">Answer:</h3>
                <p className="text-lg">{currentCard.answer}</p>
              </div>
            )}
          </div>
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              {currentCard.subject} • {currentCard.difficulty}
            </span>
          </div>
          <button
            className="absolute bottom-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleFlip();
            }}
          >
            <RotateCw className="h-4 w-4" />
          </button>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button 
            variant="outline" 
            onClick={handleNext}
            disabled={currentIndex === cards.length - 1}
          >
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        {isFlipped && (
          <div className="flex gap-2 justify-center sm:justify-end">
            <Button 
              variant="destructive" 
              onClick={() => handleResponse(false)}
            >
              <X className="mr-2 h-4 w-4" /> Didn't Know
            </Button>
            <Button 
              variant="default" 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => handleResponse(true)}
            >
              <Check className="mr-2 h-4 w-4" /> Knew It
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardInteractive;
