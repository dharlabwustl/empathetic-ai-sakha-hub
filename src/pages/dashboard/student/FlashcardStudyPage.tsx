
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface FlashcardDeck {
  id: string;
  title: string;
  subject: string;
  topic: string;
  totalCards: number;
  mastered: number;
  cards: Flashcard[];
}

const FlashcardStudyPage = () => {
  const { deckId } = useParams();
  const [loading, setLoading] = useState(true);
  const [deck, setDeck] = useState<FlashcardDeck | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    // Mock data fetch
    const fetchData = () => {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        const mockDeck: FlashcardDeck = {
          id: deckId || '1',
          title: "Physics Fundamentals",
          subject: "Physics",
          topic: "Classical Mechanics",
          totalCards: 10,
          mastered: 3,
          cards: Array.from({ length: 10 }, (_, i) => ({
            id: `card-${i+1}`,
            question: `Question ${i+1}: ${
              i % 3 === 0 ? "What is Newton's Third Law of Motion?" :
              i % 3 === 1 ? "Define kinetic energy and explain its formula." :
              "Explain the principle of conservation of momentum."
            }`,
            answer: `Answer ${i+1}: ${
              i % 3 === 0 ? "For every action, there is an equal and opposite reaction." :
              i % 3 === 1 ? "Kinetic energy is the energy possessed by an object due to its motion. It is calculated using the formula E = (1/2)mv², where m is mass and v is velocity." :
              "The principle of conservation of momentum states that the total momentum of an isolated system remains constant if there are no external forces acting on the system."
            }`,
            difficulty: i % 3 === 0 ? 'easy' : i % 3 === 1 ? 'medium' : 'hard'
          }))
        };

        setDeck(mockDeck);
        setLoading(false);
      }, 500);
    };
    
    fetchData();
  }, [deckId]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    if (!deck) return;
    
    if (currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const toggleMastered = () => {
    if (!deck) return;
    
    const cardId = deck.cards[currentCardIndex].id;
    
    setMasteredCards(prev => {
      const newState = { ...prev, [cardId]: !prev[cardId] };
      return newState;
    });
  };
  
  if (loading) {
    return (
      <SharedPageLayout
        title="Loading Flashcards"
        subtitle="Please wait..."
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
        subtitle="The requested flashcard deck could not be found"
      >
        <div className="text-center py-8">
          <Link to="/dashboard/student/flashcards">
            <Button>Back to Flashcards</Button>
          </Link>
        </div>
      </SharedPageLayout>
    );
  }

  const currentCard = deck.cards[currentCardIndex];
  const masteredCount = Object.values(masteredCards).filter(Boolean).length;
  const progressPercentage = (masteredCount / deck.cards.length) * 100;

  return (
    <SharedPageLayout
      title={deck.title}
      subtitle={`Study ${deck.cards.length} flashcards on ${deck.topic}`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 space-y-4">
          <div className="flex gap-4 flex-wrap">
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400">
              {deck.subject}
            </Badge>
            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400">
              {deck.topic}
            </Badge>
          </div>
          
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">
                Progress: {masteredCount} of {deck.cards.length} mastered
              </span>
              <span className="text-sm font-medium">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            
            <Progress value={progressPercentage} className="h-2" />
            
            <div className="flex justify-between text-sm">
              <span>Card {currentCardIndex + 1} of {deck.cards.length}</span>
              
              <div className="flex gap-1 items-center">
                <span className="w-3 h-3 inline-block rounded-full bg-green-500"></span>
                <span className="text-green-700 dark:text-green-400">
                  Mastered: {masteredCount}
                </span>
                
                <span className="w-3 h-3 inline-block rounded-full bg-gray-300 ml-2"></span>
                <span className="text-gray-700 dark:text-gray-400">
                  Remaining: {deck.cards.length - masteredCount}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Flashcard */}
        <div 
          className={`relative w-full h-96 cursor-pointer perspective-1000 transition-transform duration-700 transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={handleFlip}
        >
          {/* Front side */}
          <Card 
            className={`absolute w-full h-full backface-hidden ${
              isFlipped ? 'opacity-0' : 'opacity-100'
            } transition-opacity duration-300`}
          >
            <CardHeader className={`py-6 text-white ${
              masteredCards[currentCard.id] 
              ? 'bg-gradient-to-r from-green-500 to-green-600' 
              : 'bg-gradient-to-r from-blue-500 to-blue-600'
            }`}>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Question</CardTitle>
                <Badge className={`${
                  currentCard.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  currentCard.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {currentCard.difficulty.charAt(0).toUpperCase() + currentCard.difficulty.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-lg flex items-center justify-center h-64">
              <p className="text-center">{currentCard.question}</p>
            </CardContent>
            <CardFooter className="text-center text-sm text-muted-foreground">
              Click to flip card
            </CardFooter>
          </Card>
          
          {/* Back side */}
          <Card 
            className={`absolute w-full h-full backface-hidden rotate-y-180 ${
              isFlipped ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-300`}
          >
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white py-6">
              <CardTitle className="text-xl">Answer</CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-lg flex items-center justify-center h-64">
              <p className="text-center">{currentCard.answer}</p>
            </CardContent>
            <CardFooter className="text-center text-sm text-muted-foreground">
              Click to flip back
            </CardFooter>
          </Card>
        </div>
        
        {/* Controls */}
        <div className="mt-6 flex justify-between flex-wrap gap-4">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handlePrevCard}
              disabled={currentCardIndex === 0}
            >
              Previous Card
            </Button>
            
            <Button 
              onClick={handleNextCard}
              disabled={currentCardIndex === deck.cards.length - 1}
            >
              Next Card
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant={masteredCards[currentCard.id] ? "default" : "outline"}
              onClick={toggleMastered}
              className={masteredCards[currentCard.id] ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {masteredCards[currentCard.id] ? "Mastered ✓" : "Mark as Mastered"}
            </Button>
            
            <Link to={`/dashboard/student/flashcards/practice/${currentCard.id}`}>
              <Button variant="outline">Practice Mode</Button>
            </Link>
          </div>
        </div>
        
        {/* Bottom navigation */}
        <div className="mt-8 flex justify-between">
          <Link to="/dashboard/student/flashcards">
            <Button variant="outline">Back to All Flashcards</Button>
          </Link>
          
          <Button disabled>Shuffle Cards</Button>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default FlashcardStudyPage;
