
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, ThumbsUp, ThumbsDown, Flag, Share, ExternalLink, Repeat, Undo } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardContainer from '@/components/dashboard/student/DashboardContainer';
import { useToast } from "@/hooks/use-toast";
import FlashcardCalculator from './FlashcardCalculator';

const FlashcardStudyPage = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock data - would be fetched from API in a real app
  const [deckData, setDeckData] = useState({
    id: deckId,
    title: "Physics Core Concepts",
    subject: "Physics",
    description: "Key concepts and formulas for JEE physics",
    totalCards: 30,
    currentCardIndex: 0,
    cards: [
      {
        id: "card1",
        front: "Newton's First Law of Motion",
        frontContent: "What does Newton's First Law of Motion state?",
        back: "An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction, unless acted upon by an external force.",
        backContent: "This law is also known as the Law of Inertia. It describes the tendency of objects to resist changes in their state of motion.",
        difficulty: "medium",
        tags: ["mechanics", "newton-laws"],
        masteryLevel: 0,
        images: {
          front: null,
          back: null
        }
      },
      {
        id: "card2",
        front: "Electrostatic Force (Coulomb's Law)",
        frontContent: "What is the formula for Coulomb's Law?",
        back: "F = k(q₁q₂)/r²",
        backContent: "Where F is the force, k is Coulomb's constant (8.99×10⁹ N·m²/C²), q₁ and q₂ are the charges, and r is the distance between them.",
        difficulty: "hard",
        tags: ["electrostatics", "forces"],
        masteryLevel: 0,
        images: {
          front: null,
          back: null
        }
      },
      {
        id: "card3",
        front: "Lens Formula",
        frontContent: "What is the lens formula in optics?",
        back: "1/f = 1/v + 1/u",
        backContent: "Where f is the focal length, v is the distance of the image from the lens, and u is the distance of the object from the lens.",
        difficulty: "medium",
        tags: ["optics", "lenses"],
        masteryLevel: 0,
        images: {
          front: null,
          back: null
        }
      }
    ],
    stats: {
      mastered: 0,
      learning: 0,
      new: 30
    }
  });
  
  const [showBack, setShowBack] = useState(false);
  const [cardHeight, setCardHeight] = useState("auto");
  const currentCard = deckData.cards[deckData.currentCardIndex];
  
  // Update the cardHeight when showBack changes to prevent layout shifts
  useEffect(() => {
    if (showBack) {
      const cardElement = document.getElementById('flashcard');
      if (cardElement) {
        setCardHeight(`${cardElement.scrollHeight}px`);
      }
    }
  }, [showBack]);
  
  // Flip the card
  const flipCard = () => {
    setShowBack(!showBack);
  };
  
  // Navigate to next card
  const nextCard = () => {
    if (deckData.currentCardIndex < deckData.cards.length - 1) {
      setShowBack(false);
      setDeckData({
        ...deckData,
        currentCardIndex: deckData.currentCardIndex + 1
      });
    } else {
      // End of deck
      toast({
        title: "End of Deck",
        description: "You've reached the end of this flashcard deck."
      });
    }
  };
  
  // Navigate to previous card
  const prevCard = () => {
    if (deckData.currentCardIndex > 0) {
      setShowBack(false);
      setDeckData({
        ...deckData,
        currentCardIndex: deckData.currentCardIndex - 1
      });
    }
  };
  
  // Handle card mastery response
  const handleMasteryResponse = (mastered: boolean) => {
    const newDeckData = { ...deckData };
    const currentCardIndex = deckData.currentCardIndex;
    
    // Update mastery level
    newDeckData.cards[currentCardIndex].masteryLevel = mastered ? 
      Math.min(5, newDeckData.cards[currentCardIndex].masteryLevel + 1) :
      Math.max(0, newDeckData.cards[currentCardIndex].masteryLevel - 1);
    
    // Update stats
    if (mastered) {
      if (newDeckData.cards[currentCardIndex].masteryLevel === 5) {
        newDeckData.stats.mastered += 1;
        newDeckData.stats.learning -= 1;
        toast({
          title: "Card Mastered!",
          description: "This card has been moved to your mastered stack."
        });
      } else if (newDeckData.cards[currentCardIndex].masteryLevel === 1) {
        newDeckData.stats.learning += 1;
        newDeckData.stats.new -= 1;
      }
    } else {
      if (newDeckData.cards[currentCardIndex].masteryLevel === 0 && 
          newDeckData.cards[currentCardIndex].masteryLevel === 1) {
        newDeckData.stats.learning -= 1;
        newDeckData.stats.new += 1;
      }
    }
    
    setDeckData(newDeckData);
    
    // Move to next card automatically
    setTimeout(() => {
      nextCard();
    }, 500);
  };
  
  // Calculate progress percentage
  const calculateProgress = () => {
    return ((deckData.currentCardIndex + 1) / deckData.totalCards) * 100;
  };
  
  return (
    <DashboardContainer>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">{deckData.title}</h1>
            <p className="text-gray-500">{deckData.description}</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline">
              {deckData.subject}
            </Badge>
            <Badge variant="outline">
              {deckData.totalCards} Cards
            </Badge>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2 text-sm">
            <div>
              Card {deckData.currentCardIndex + 1} of {deckData.totalCards}
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Mastered: {deckData.stats.mastered}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span>Learning: {deckData.stats.learning}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                <span>New: {deckData.stats.new}</span>
              </div>
            </div>
          </div>
          <Progress value={calculateProgress()} className="h-2" />
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCard.id + (showBack ? '-back' : '-front')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  id="flashcard"
                  className="overflow-hidden cursor-pointer transition-all duration-300"
                  style={{ height: cardHeight }}
                  onClick={flipCard}
                >
                  <CardContent className="p-6">
                    {!showBack ? (
                      <div className="flex flex-col items-center">
                        <div className="w-full text-center mb-4">
                          <Badge 
                            variant={currentCard.difficulty === 'easy' ? 'outline' : 
                              (currentCard.difficulty === 'medium' ? 'secondary' : 'destructive')}
                            className="mb-2"
                          >
                            {currentCard.difficulty}
                          </Badge>
                          <h2 className="text-xl font-bold mb-4">{currentCard.front}</h2>
                          <p className="text-gray-700">{currentCard.frontContent}</p>
                        </div>
                        
                        {currentCard.images.front && (
                          <img 
                            src={currentCard.images.front} 
                            alt="Front card illustration" 
                            className="max-h-64 object-contain my-4"
                          />
                        )}
                        
                        <p className="text-sm text-blue-600 mt-4">(Tap to reveal answer)</p>
                      </div>
                    ) : (
                      <div>
                        <h3 className="font-bold text-xl mb-4">{currentCard.front}</h3>
                        <Separator className="my-4" />
                        <div className="mb-4">
                          <h4 className="font-semibold text-xl mb-2">Answer:</h4>
                          <p className="text-lg">{currentCard.back}</p>
                        </div>
                        
                        {currentCard.backContent && (
                          <div className="mt-4 bg-blue-50 p-4 rounded-md">
                            <h4 className="font-semibold mb-2">Explanation:</h4>
                            <p>{currentCard.backContent}</p>
                          </div>
                        )}
                        
                        {currentCard.images.back && (
                          <img 
                            src={currentCard.images.back} 
                            alt="Back card illustration" 
                            className="max-h-64 object-contain my-4"
                          />
                        )}
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          {currentCard.tags.map((tag, index) => (
                            <Badge key={index} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <p className="text-sm text-blue-600 mt-4">(Tap to flip back)</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-between items-center mt-6">
              <Button 
                variant="outline" 
                onClick={prevCard}
                disabled={deckData.currentCardIndex === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => {}} // Would bookmark/flag card in real app
                >
                  <Flag className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => {}} // Would share card in real app
                >
                  <Share className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => {
                    const newDeckData = { ...deckData };
                    // Simulate shuffling by randomly reordering remaining cards
                    const currentCard = newDeckData.cards[newDeckData.currentCardIndex];
                    const remainingCards = newDeckData.cards.slice(newDeckData.currentCardIndex + 1);
                    // Fisher-Yates shuffle
                    for (let i = remainingCards.length - 1; i > 0; i--) {
                      const j = Math.floor(Math.random() * (i + 1));
                      [remainingCards[i], remainingCards[j]] = [remainingCards[j], remainingCards[i]];
                    }
                    newDeckData.cards = [
                      ...newDeckData.cards.slice(0, newDeckData.currentCardIndex),
                      currentCard,
                      ...remainingCards
                    ];
                    setDeckData(newDeckData);
                    toast({
                      title: "Cards Shuffled",
                      description: "Remaining cards have been shuffled."
                    });
                  }}
                >
                  <Repeat className="h-4 w-4" />
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                onClick={nextCard}
                disabled={deckData.currentCardIndex === deckData.cards.length - 1}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => handleMasteryResponse(false)}
              >
                <ThumbsDown className="mr-2 h-4 w-4" />
                Need More Practice
              </Button>
              <Button 
                variant="default"
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => handleMasteryResponse(true)}
              >
                <ThumbsUp className="mr-2 h-4 w-4" />
                Got It!
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Study Tips</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex gap-2">
                    <div className="w-1 h-1 bg-blue-500 rounded-full mt-2"></div>
                    <span>Try to recall the answer before flipping the card.</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="w-1 h-1 bg-blue-500 rounded-full mt-2"></div>
                    <span>Say the answer out loud to reinforce memory.</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="w-1 h-1 bg-blue-500 rounded-full mt-2"></div>
                    <span>Use "Got It!" only when you're confident.</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="w-1 h-1 bg-blue-500 rounded-full mt-2"></div>
                    <span>Regular short sessions are more effective than cramming.</span>
                  </li>
                </ul>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => navigate('/dashboard/student/flashcards')}
                  >
                    <Undo className="mr-1 h-3 w-3" />
                    Back to Decks
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      // Would open related content in real app
                      toast({
                        title: "Related Resources",
                        description: "Opening related study materials for this topic."
                      });
                    }}
                  >
                    <ExternalLink className="mr-1 h-3 w-3" />
                    Related Content
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <FlashcardCalculator />
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default FlashcardStudyPage;
