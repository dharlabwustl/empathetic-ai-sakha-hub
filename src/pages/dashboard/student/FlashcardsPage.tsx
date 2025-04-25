import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle, ChevronLeft, ChevronRight, RotateCcw, Search, BookOpen, LucideProps } from "lucide-react";

const FlashcardsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("study");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentDeck, setCurrentDeck] = useState<string | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
  // Sample flashcard decks data
  const flashcardDecks = [
    {
      id: "physics-kinematics",
      title: "Physics: Kinematics",
      description: "Motion, velocity, acceleration",
      progress: 65,
      cardCount: 24,
      timeEstimate: "20 min",
      icon: BookOpen,
      cards: [
        {
          id: "phys-1",
          question: "What is the formula for calculating displacement when an object moves with constant acceleration?",
          answer: "s = ut + (1/2)at²",
          explanation: "Where s is displacement, u is initial velocity, t is time, and a is acceleration. This formula is derived from integrating the velocity-time function."
        },
        {
          id: "phys-2",
          question: "Define instantaneous velocity.",
          answer: "The velocity of an object at a specific point in time, calculated as the derivative of position with respect to time.",
          explanation: "Mathematically, it's represented as v = dx/dt, where x is position and t is time."
        }
      ]
    },
    {
      id: "chemistry-periodic",
      title: "Chemistry: Periodic Table",
      description: "Elements, properties, periodicity",
      progress: 42,
      cardCount: 18,
      timeEstimate: "15 min",
      icon: BookOpen,
      cards: [
        {
          id: "chem-1",
          question: "What is the atomic number of Oxygen?",
          answer: "8",
          explanation: "The atomic number represents the number of protons in an atom's nucleus. Oxygen has 8 protons."
        }
      ]
    },
    {
      id: "math-calculus",
      title: "Mathematics: Calculus",
      description: "Derivatives and integrals",
      progress: 28,
      cardCount: 30,
      timeEstimate: "25 min",
      icon: BookOpen,
      cards: [
        {
          id: "math-1",
          question: "What is the derivative of sin(x)?",
          answer: "cos(x)",
          explanation: "This can be proven using the limit definition of the derivative and trigonometric identities."
        }
      ]
    }
  ];
  
  // Handle deck selection
  const handleDeckSelect = (deckId: string) => {
    setCurrentDeck(deckId);
    setCurrentCardIndex(0);
  };
  
  // Get current card
  const getCurrentCard = () => {
    if (!currentDeck) return null;
    const deck = flashcardDecks.find(d => d.id === currentDeck);
    if (!deck || !deck.cards || deck.cards.length === 0) return null;
    return deck.cards[currentCardIndex];
  };
  
  // Navigation functions
  const handleNextCard = () => {
    if (!currentDeck) return;
    const deck = flashcardDecks.find(d => d.id === currentDeck);
    if (!deck || !deck.cards) return;
    
    if (currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };
  
  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };
  
  // Get current deck info
  const getCurrentDeckInfo = () => {
    if (!currentDeck) return null;
    return flashcardDecks.find(d => d.id === currentDeck);
  };
  
  const currentCard = getCurrentCard();
  const currentDeckInfo = getCurrentDeckInfo();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Flashcards</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Search Cards
          </Button>
          <Button variant="outline" size="sm">
            Create Card
          </Button>
        </div>
      </div>

      <Tabs defaultValue="study" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="study">Study</TabsTrigger>
          <TabsTrigger value="revision">Revision</TabsTrigger>
          <TabsTrigger value="mastered">Mastered</TabsTrigger>
          <TabsTrigger value="all">All Cards</TabsTrigger>
        </TabsList>

        <TabsContent value="study" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashcardDecks.map((deck) => (
              <FlashcardDeck
                key={deck.id}
                title={deck.title}
                description={deck.description}
                progress={deck.progress}
                cardCount={deck.cardCount}
                timeEstimate={deck.timeEstimate}
                icon={(props: LucideProps) => <BookOpen {...props} />}
                onClick={() => handleDeckSelect(deck.id)}
              />
            ))}
          </div>

          {currentCard && currentDeckInfo && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Active Flashcard Session</CardTitle>
                <CardDescription>
                  {currentDeckInfo.title} - Card {currentCardIndex + 1} of {currentDeckInfo.cardCount}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  <FlashcardInteractive 
                    key={currentCard.id}
                    question={currentCard.question} 
                    answer={currentCard.answer}
                    explanation={currentCard.explanation}
                  />
                </AnimatePresence>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={handlePrevCard}
                  disabled={currentCardIndex === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button 
                  onClick={handleNextCard}
                  disabled={currentCardIndex === currentDeckInfo.cardCount - 1}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="revision">
          <div className="p-8 text-center text-gray-500">
            <p>You have 18 cards due for revision today.</p>
          </div>
        </TabsContent>

        <TabsContent value="mastered">
          <div className="p-8 text-center text-gray-500">
            <p>You have mastered 42 cards so far.</p>
          </div>
        </TabsContent>

        <TabsContent value="all">
          <div className="p-8 text-center text-gray-500">
            <p>You have 120 cards in your collection.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface FlashcardDeckProps {
  title: string;
  description: string;
  progress: number;
  cardCount: number;
  timeEstimate: string;
  icon: React.FC<LucideProps>;
  onClick?: () => void;
}

const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  title,
  description,
  progress,
  cardCount,
  timeEstimate,
  icon: Icon,
  onClick
}) => {
  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="p-2 bg-blue-50 rounded-md">
            <Icon className="h-5 w-5 text-blue-500" />
          </div>
          <span className="text-sm text-gray-500">{cardCount} cards</span>
        </div>
        <CardTitle className="text-lg mt-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex justify-between items-center w-full">
          <span className="text-sm text-gray-500">{timeEstimate}</span>
          <Button size="sm" onClick={onClick}>Study Now</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

interface FlashcardInteractiveProps {
  question: string;
  answer: string;
  explanation?: string;
}

const FlashcardInteractive: React.FC<FlashcardInteractiveProps> = ({
  question,
  answer,
  explanation,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;
    
    const accuracy = calculateAccuracy(userAnswer, answer);
    setAccuracy(accuracy);
    setHasSubmitted(true);
  };

  const calculateAccuracy = (userAnswer: string, correctAnswer: string) => {
    // Simple implementation - replace with more sophisticated algorithm if needed
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      return 100;
    }
    
    // Check if key terms are present
    const correctTerms = correctAnswer.toLowerCase().split(/\s+/);
    const userTerms = userAnswer.toLowerCase().split(/\s+/);
    
    let matchedTerms = 0;
    correctTerms.forEach(term => {
      if (userTerms.includes(term)) matchedTerms++;
    });
    
    return Math.floor((matchedTerms / correctTerms.length) * 100);
  };

  const handleReset = () => {
    setUserAnswer("");
    setHasSubmitted(false);
    setAccuracy(0);
    setShowExplanation(false);
  };

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

  const getAccuracyColor = () => {
    if (accuracy >= 90) return "text-green-500";
    if (accuracy >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="w-full">
      <motion.div
        className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 min-h-[200px]"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {!isFlipped ? (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-gray-800">{question}</h3>
            
            <Textarea
              placeholder="Type your answer here..."
              className="min-h-[100px] resize-none"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={hasSubmitted}
            />
            
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
              <p className="text-blue-800">{answer}</p>
            </div>
            
            {explanation && (
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
                    <p>{explanation}</p>
                  </motion.div>
                )}
              </>
            )}
            
            <div className="pt-2 flex justify-center">
              <Button variant="outline" onClick={handleFlip}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Question
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FlashcardsPage;
