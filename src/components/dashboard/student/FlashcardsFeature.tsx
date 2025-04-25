
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUserStudyPlan } from "@/hooks/useUserStudyPlan";
import { BookOpen, CheckCircle, RotateCcw } from "lucide-react";

// Mock flashcard data structure
interface Flashcard {
  id: string;
  question: string;
  answer: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed?: string;
  masteryLevel: number;
}

const FlashcardsFeature = () => {
  const { conceptCards } = useUserStudyPlan();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  
  // Mock flashcard decks based on concept cards
  const flashcardDecks = [
    { id: 'physics', name: 'Physics', count: 25, subject: 'Physics', color: 'bg-blue-100 border-blue-300 text-blue-800' },
    { id: 'chemistry', name: 'Chemistry', count: 30, subject: 'Chemistry', color: 'bg-green-100 border-green-300 text-green-800' },
    { id: 'mathematics', name: 'Mathematics', count: 40, subject: 'Mathematics', color: 'bg-purple-100 border-purple-300 text-purple-800' },
  ];
  
  // Generate mock flashcards for the selected deck
  const generateFlashcardsForDeck = (deckId: string): Flashcard[] => {
    const subjects: Record<string, { questions: string[], answers: string[] }> = {
      'physics': {
        questions: [
          "What is Newton's first law of motion?",
          "What is the formula for calculating kinetic energy?",
          "What is the difference between velocity and acceleration?"
        ],
        answers: [
          "An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an external force.",
          "Kinetic Energy (KE) = (1/2) × mass × velocity²",
          "Velocity is the rate of change of position with respect to time, while acceleration is the rate of change of velocity with respect to time."
        ]
      },
      'chemistry': {
        questions: [
          "What is the periodic law?",
          "What are valence electrons?",
          "What is the difference between an exothermic and endothermic reaction?"
        ],
        answers: [
          "The physical and chemical properties of elements recur in a systematic and predictable way when the elements are arranged in order of increasing atomic number.",
          "Valence electrons are electrons in the outermost shell of an atom that can participate in forming chemical bonds with other atoms.",
          "Exothermic reactions release energy to the surroundings, while endothermic reactions absorb energy from the surroundings."
        ]
      },
      'mathematics': {
        questions: [
          "What is the quadratic formula?",
          "What is a derivative in calculus?",
          "What is the Pythagorean theorem?"
        ],
        answers: [
          "For a quadratic equation ax² + bx + c = 0, the solutions are x = (-b ± √(b² - 4ac)) / (2a)",
          "A derivative measures the rate at which a function changes at a particular point. It's defined as the limit of the ratio of the change in the function value to the change in the independent variable as the change in the independent variable approaches zero.",
          "In a right-angled triangle, the square of the length of the hypotenuse equals the sum of the squares of the lengths of the other two sides: a² + b² = c²"
        ]
      }
    };
    
    const source = subjects[deckId] || subjects['physics'];
    const cards: Flashcard[] = [];
    
    for (let i = 0; i < source.questions.length; i++) {
      cards.push({
        id: `${deckId}_${i}`,
        question: source.questions[i],
        answer: source.answers[i],
        subject: deckId,
        difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)] as 'easy' | 'medium' | 'hard',
        masteryLevel: Math.floor(Math.random() * 5) + 1,
        lastReviewed: i === 0 ? 'Never' : `${Math.floor(Math.random() * 7) + 1} days ago`
      });
    }
    
    return cards;
  };
  
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  
  // Handle deck selection
  const handleDeckSelect = (deckId: string) => {
    setSelectedDeck(deckId);
    const generatedCards = generateFlashcardsForDeck(deckId);
    setFlashcards(generatedCards);
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };
  
  // Navigate to next card
  const handleNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    } else {
      // Loop back to first card when reached the end
      setCurrentCardIndex(0);
      setShowAnswer(false);
    }
  };
  
  // Navigate to previous card
  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowAnswer(false);
    } else {
      // Loop to last card when on first card
      setCurrentCardIndex(flashcards.length - 1);
      setShowAnswer(false);
    }
  };
  
  // Toggle answer visibility
  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };
  
  // Handle marking mastery level
  const handleMarkMastery = (level: number) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[currentCardIndex] = {
      ...updatedFlashcards[currentCardIndex],
      masteryLevel: level,
      lastReviewed: 'Today'
    };
    setFlashcards(updatedFlashcards);
    
    // Move to next card after marking
    setTimeout(() => {
      handleNextCard();
    }, 500);
  };
  
  return (
    <div className="space-y-8">
      {!selectedDeck ? (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-medium mb-4">Select a Flashcard Deck</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {flashcardDecks.map((deck) => (
                <Card 
                  key={deck.id} 
                  className={`border-2 hover:shadow-md transition-all cursor-pointer ${deck.color}`}
                  onClick={() => handleDeckSelect(deck.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{deck.name}</h3>
                        <p className="text-sm mt-1">{deck.count} flashcards</p>
                      </div>
                      <BookOpen className="h-10 w-10 opacity-70" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-4">Flashcards Statistics</h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-3xl font-bold text-blue-700">95</p>
                    <p className="text-sm text-gray-600">Total Flashcards</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-3xl font-bold text-green-700">42</p>
                    <p className="text-sm text-gray-600">Cards Mastered</p>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <p className="text-3xl font-bold text-amber-700">23</p>
                    <p className="text-sm text-gray-600">Due for Review</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium">
              {flashcardDecks.find(deck => deck.id === selectedDeck)?.name} Flashcards
              <span className="ml-2 text-sm text-gray-500">
                ({currentCardIndex + 1}/{flashcards.length})
              </span>
            </h2>
            <Button variant="outline" onClick={() => setSelectedDeck(null)}>
              Change Deck
            </Button>
          </div>
          
          {flashcards.length > 0 && (
            <>
              <Card className="min-h-[300px] flex items-center justify-center border-2 border-blue-200">
                <CardContent className="p-8 w-full">
                  <div 
                    className="cursor-pointer w-full h-full text-center" 
                    onClick={toggleAnswer}
                  >
                    <div className="text-sm text-gray-500 mb-4">
                      {showAnswer ? "Answer" : "Question"} (Click to flip)
                    </div>
                    <div className="text-xl font-medium">
                      {showAnswer 
                        ? flashcards[currentCardIndex].answer 
                        : flashcards[currentCardIndex].question
                      }
                    </div>
                    {showAnswer && (
                      <div className="mt-8">
                        <p className="text-sm text-gray-500 mb-2">How well did you know this?</p>
                        <div className="flex justify-center space-x-2">
                          {[1, 2, 3, 4, 5].map(level => (
                            <Button 
                              key={level}
                              variant={level === flashcards[currentCardIndex].masteryLevel ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleMarkMastery(level)}
                              className={level === flashcards[currentCardIndex].masteryLevel ? "bg-green-600" : ""}
                            >
                              {level}
                            </Button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          1 = Didn't know, 5 = Perfect recall
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handlePrevCard}
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  onClick={toggleAnswer}
                >
                  {showAnswer ? "Show Question" : "Show Answer"}
                </Button>
                <Button 
                  onClick={handleNextCard}
                >
                  Next
                </Button>
              </div>
              
              <Card className="border-gray-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div>
                      Difficulty: <span className="font-medium">{flashcards[currentCardIndex].difficulty}</span>
                    </div>
                    <div>
                      Last Reviewed: <span className="font-medium">{flashcards[currentCardIndex].lastReviewed}</span>
                    </div>
                    <div>
                      Mastery Level: <span className="font-medium">{flashcards[currentCardIndex].masteryLevel}/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FlashcardsFeature;
