
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, XCircle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { SharedPageLayout } from "@/components/dashboard/student/SharedPageLayout";

// Mock flashcard deck data
const getMockDeck = (deckId: string) => {
  return {
    id: deckId,
    title: "Thermodynamics Essentials",
    description: "Core concepts of thermodynamics",
    subject: "Physics",
    totalCards: 15,
    currentCard: 0,
    cards: [
      {
        id: "1",
        question: "What is the First Law of Thermodynamics?",
        answer: "The First Law of Thermodynamics states that energy cannot be created or destroyed in an isolated system; it can only be transformed from one form to another.",
        difficulty: "medium",
        tags: ["thermodynamics", "laws"]
      },
      {
        id: "2",
        question: "What is entropy in thermodynamics?",
        answer: "Entropy is a measure of the disorder or randomness in a system. According to the Second Law of Thermodynamics, the total entropy of an isolated system always increases over time.",
        difficulty: "hard",
        tags: ["thermodynamics", "entropy"]
      },
      {
        id: "3",
        question: "Define specific heat capacity.",
        answer: "Specific heat capacity is the amount of heat energy required to raise the temperature of 1 kg of a substance by 1 Kelvin. It's measured in J/(kg·K).",
        difficulty: "medium",
        tags: ["thermodynamics", "heat"]
      },
      {
        id: "4",
        question: "What is the difference between heat and temperature?",
        answer: "Heat is the total energy of molecular motion in a substance, while temperature is a measure of the average energy of molecular motion in a substance. Heat energy depends on the speed of the particles, the number of particles, and the type of particles in an object.",
        difficulty: "medium",
        tags: ["thermodynamics", "basics"]
      },
      {
        id: "5",
        question: "State the Zeroth Law of Thermodynamics.",
        answer: "If two thermodynamic systems are each in thermal equilibrium with a third system, then they are in thermal equilibrium with each other.",
        difficulty: "medium",
        tags: ["thermodynamics", "laws"]
      }
    ]
  };
};

const FlashcardInteractive = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const deck = getMockDeck(deckId || "default");
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [knownCards, setKnownCards] = useState<string[]>([]);
  const [unknownCards, setUnknownCards] = useState<string[]>([]);
  
  const currentCard = deck.cards[currentIndex];
  const progress = ((currentIndex + 1) / deck.cards.length) * 100;
  
  const handleFlip = () => {
    setShowAnswer(!showAnswer);
  };
  
  const handleKnown = () => {
    if (!knownCards.includes(currentCard.id)) {
      setKnownCards([...knownCards, currentCard.id]);
    }
    
    if (currentIndex < deck.cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      // End of deck
      completeSession();
    }
  };
  
  const handleUnknown = () => {
    if (!unknownCards.includes(currentCard.id)) {
      setUnknownCards([...unknownCards, currentCard.id]);
    }
    
    if (currentIndex < deck.cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      // End of deck
      completeSession();
    }
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };
  
  const handleNext = () => {
    if (currentIndex < deck.cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };
  
  const completeSession = () => {
    // In a real app, this would save progress to a backend
    console.log("Session complete", {
      knownCards,
      unknownCards
    });
  };
  
  const handleBackToDecks = () => {
    navigate(`/dashboard/student/flashcards`);
  };

  return (
    <SharedPageLayout 
      title={deck.title}
      subtitle={`${deck.subject} · ${deck.cards.length} cards`}
      showBackButton={true}
      backButtonUrl="/dashboard/student/flashcards"
    >
      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="flex items-center gap-2">
          <Progress value={progress} className="h-2" />
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {deck.cards.length}
          </span>
        </div>
        
        {/* Flashcard */}
        <motion.div
          className="relative perspective-1000"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full min-h-[300px] sm:min-h-[400px]" onClick={handleFlip}>
            <motion.div
              className={`flashcard-inner w-full h-full transition-transform duration-500 ${showAnswer ? 'rotate-y-180' : ''}`}
              animate={{ rotateY: showAnswer ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Front of Card (Question) */}
              <motion.div 
                className={`absolute w-full h-full backface-hidden ${!showAnswer ? 'flex items-center justify-center' : 'hidden'}`}
              >
                <Card className="w-full h-full shadow-md">
                  <CardContent className="p-6 h-full flex flex-col justify-between">
                    <div className="flex-1 flex items-center justify-center p-4">
                      <h3 className="text-xl font-medium text-center">{currentCard.question}</h3>
                    </div>
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
                      <p className="text-sm text-muted-foreground">Tap to see answer</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Back of Card (Answer) */}
              <motion.div 
                className={`absolute w-full h-full backface-hidden rotate-y-180 ${showAnswer ? 'flex items-center justify-center' : 'hidden'}`}
              >
                <Card className="w-full h-full shadow-md">
                  <CardContent className="p-6 h-full flex flex-col justify-between">
                    <div className="flex-1 flex items-center justify-center p-4">
                      <p className="text-center">{currentCard.answer}</p>
                    </div>
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-center gap-4">
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        className="gap-2" 
                        onClick={handleUnknown}
                      >
                        <XCircle size={16} /> Did not know
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="gap-2 bg-green-600 hover:bg-green-700" 
                        onClick={handleKnown}
                      >
                        <CheckCircle size={16} /> Knew it
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Navigation Controls */}
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handlePrevious} 
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={16} className="mr-1" /> Previous
          </Button>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleFlip}>
              <BookOpen size={16} className="mr-1" /> Flip Card
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleNext} 
            disabled={currentIndex === deck.cards.length - 1}
          >
            Next <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default FlashcardInteractive;
