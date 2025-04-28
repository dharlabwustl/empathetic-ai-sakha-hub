
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Timer, ThumbsUp, ThumbsDown, RotateCw } from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  image?: string;
}

interface FlashcardDeck {
  id: string;
  title: string;
  subject: string;
  cards: Flashcard[];
  totalCards: number;
}

const FlashcardStudyPage = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState<FlashcardDeck | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [studyTime, setStudyTime] = useState(0);
  const [known, setKnown] = useState<string[]>([]);
  const [unknown, setUnknown] = useState<string[]>([]);

  useEffect(() => {
    const fetchDeck = async () => {
      // In a real app, this would be an API call
      setLoading(true);
      
      // Mock data
      setTimeout(() => {
        const mockDeck = {
          id: deckId,
          title: 'Organic Chemistry Reactions',
          subject: 'Chemistry',
          totalCards: 20,
          cards: [
            {
              id: '1',
              front: 'What is a nucleophilic substitution reaction?',
              back: 'A reaction in which a nucleophile replaces a leaving group in an organic molecule. Common types include SN1 and SN2 reactions.',
              image: 'https://example.com/nucleophilic-substitution.jpg'
            },
            {
              id: '2',
              front: 'What is the difference between SN1 and SN2 reactions?',
              back: 'SN1 reactions proceed in two steps with a carbocation intermediate, while SN2 reactions occur in a single step with inversion of stereochemistry.',
              image: 'https://example.com/sn1-sn2.jpg'
            },
            {
              id: '3',
              front: 'What is the Grignard reagent?',
              back: 'An organomagnesium compound with the formula R-Mg-X (where X is a halide) that is highly useful for forming carbon-carbon bonds.',
              image: 'https://example.com/grignard.jpg'
            },
            {
              id: '4',
              front: 'What is the Diels-Alder reaction?',
              back: 'A cycloaddition reaction between a conjugated diene and a substituted alkene (dienophile) to form a cyclohexene system.',
              image: 'https://example.com/diels-alder.jpg'
            },
            {
              id: '5',
              front: 'What is the Wittig reaction used for?',
              back: 'The Wittig reaction is used to convert aldehydes or ketones to alkenes using phosphonium ylides.',
              image: null
            }
          ]
        };
        
        setDeck(mockDeck);
        setLoading(false);
      }, 1000);
    };
    
    fetchDeck();
    
    // Start the study timer
    const timer = setInterval(() => {
      setStudyTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [deckId]);
  
  if (loading) {
    return (
      <SharedPageLayout 
        title="Loading Flashcards..." 
        subtitle="Please wait while we retrieve your study materials"
      >
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </SharedPageLayout>
    );
  }
  
  if (!deck) {
    return (
      <SharedPageLayout 
        title="Flashcard Deck Not Found" 
        subtitle="The requested deck could not be found"
      >
        <Button 
          onClick={() => navigate('/dashboard/student/flashcards')}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Flashcards
        </Button>
      </SharedPageLayout>
    );
  }
  
  const currentCard = deck.cards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / deck.cards.length) * 100;
  
  const handleFlip = () => {
    setFlipped(!flipped);
  };
  
  const handleNext = () => {
    if (currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setFlipped(false);
    }
  };
  
  const handlePrev = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setFlipped(false);
    }
  };
  
  const handleKnown = () => {
    if (currentCard) {
      setKnown(prev => [...prev, currentCard.id]);
      handleNext();
    }
  };
  
  const handleUnknown = () => {
    if (currentCard) {
      setUnknown(prev => [...prev, currentCard.id]);
      handleNext();
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const isLastCard = currentCardIndex === deck.cards.length - 1;

  return (
    <SharedPageLayout
      title={deck.title}
      subtitle={`${deck.subject} • ${deck.cards.length} flashcards`}
      showQuickAccess={false}
    >
      <div className="mb-4">
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2"
          onClick={() => navigate('/dashboard/student/flashcards')}
        >
          <ArrowLeft size={16} />
          Back to Flashcards
        </Button>
      </div>
      
      <div className="flex justify-between items-center mb-2">
        <div>
          <span className="text-sm font-medium">Card {currentCardIndex + 1} of {deck.cards.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <Timer size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium">{formatTime(studyTime)}</span>
        </div>
      </div>
      
      <Progress value={progress} className="mb-6" />
      
      <div className="flex justify-center mb-8">
        <div 
          className="w-full max-w-2xl h-64 perspective-1000 cursor-pointer"
          onClick={handleFlip}
        >
          <div className={`relative w-full h-full transition-all duration-500 ${flipped ? 'rotate-y-180' : ''}`}>
            <Card className={`absolute w-full h-full backface-hidden ${flipped ? 'hidden' : ''}`}>
              <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                <h3 className="text-xl font-semibold mb-4">{currentCard?.front}</h3>
                {currentCard?.image && (
                  <img 
                    src={currentCard.image} 
                    alt="Flashcard illustration" 
                    className="max-h-32 object-contain mb-4"
                  />
                )}
                <p className="text-sm text-muted-foreground mt-4">Tap to flip</p>
              </CardContent>
            </Card>
            
            <Card className={`absolute w-full h-full backface-hidden ${!flipped ? 'hidden' : ''}`}>
              <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                <h3 className="text-xl font-semibold mb-4">{currentCard?.back}</h3>
                <div className="flex gap-4 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnknown();
                    }}
                  >
                    <ThumbsDown size={16} />
                    Still Learning
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2 text-green-500 hover:text-green-600 hover:bg-green-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleKnown();
                    }}
                  >
                    <ThumbsUp size={16} />
                    I Know This
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrev}
          disabled={currentCardIndex === 0}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Previous
        </Button>
        
        <Button 
          variant="outline"
          onClick={() => {
            setCurrentCardIndex(0);
            setFlipped(false);
            setKnown([]);
            setUnknown([]);
          }}
          className="flex items-center gap-2"
        >
          <RotateCw size={16} />
          Restart
        </Button>
        
        <Button 
          variant="outline" 
          onClick={handleNext}
          disabled={isLastCard}
          className="flex items-center gap-2"
        >
          Next
          <ArrowRight size={16} />
        </Button>
      </div>
      
      {isLastCard && flipped && (
        <div className="mt-6">
          <div className="p-4 bg-green-50 border border-green-100 rounded-lg mb-4">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Study Session Complete!</h3>
            <p className="text-sm text-green-700">
              You've completed this flashcard deck. Here's your progress:
            </p>
            <div className="mt-2">
              <div className="flex justify-between text-sm mb-1">
                <span>I Know: {known.length} cards</span>
                <span>Still Learning: {unknown.length} cards</span>
              </div>
              <Progress 
                value={(known.length / deck.cards.length) * 100} 
                className="h-2 bg-red-100"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button 
              onClick={() => navigate('/dashboard/student/flashcards')}
              variant="outline"
              className="flex-1"
            >
              Back to All Flashcards
            </Button>
            <Button
              onClick={() => {
                setCurrentCardIndex(0);
                setFlipped(false);
                setKnown([]);
                setUnknown([]);
              }}
              className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600"
            >
              Practice Again
            </Button>
          </div>
        </div>
      )}
    </SharedPageLayout>
  );
};

export default FlashcardStudyPage;
