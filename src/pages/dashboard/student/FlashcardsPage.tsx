
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw, Check, X, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface Flashcard {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const flashcards: Flashcard[] = [
  {
    id: 1,
    question: "What is Newton's first law of motion?",
    answer: "An object at rest stays at rest and an object in motion stays in motion with the same speed and direction unless acted upon by an unbalanced force.",
    category: "Physics"
  },
  {
    id: 2,
    question: "What is the chemical formula for glucose?",
    answer: "C6H12O6",
    category: "Chemistry"
  },
  {
    id: 3,
    question: "What is the value of π (pi) to 5 decimal places?",
    answer: "3.14159",
    category: "Mathematics"
  },
  {
    id: 4,
    question: "What's the difference between potential and kinetic energy?",
    answer: "Potential energy is stored energy based on position or state, while kinetic energy is the energy of motion.",
    category: "Physics"
  },
  {
    id: 5,
    question: "What is the main function of mitochondria?",
    answer: "Mitochondria are the powerhouse of the cell, generating most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy.",
    category: "Biology"
  }
];

const FlashcardsPage = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  
  const { toast } = useToast();
  
  const currentCard = flashcards[currentCardIndex];
  
  const handleFlip = () => {
    setFlipped(!flipped);
    if (!flipped && !hasChecked) {
      checkAnswer();
    }
  };
  
  const handleNext = () => {
    if (currentCardIndex < flashcards.length - 1) {
      resetCard();
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      toast({
        title: "End of flashcards",
        description: "You've reached the end of the flashcard set."
      });
    }
  };
  
  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      resetCard();
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };
  
  const resetCard = () => {
    setFlipped(false);
    setUserAnswer("");
    setHasChecked(false);
    setIsCorrect(false);
  };
  
  const checkAnswer = () => {
    if (!userAnswer.trim()) {
      setHasChecked(false);
      return;
    }
    
    // Simple string similarity for answer checking
    const similarity = calculateSimilarity(
      userAnswer.toLowerCase().trim(), 
      currentCard.answer.toLowerCase()
    );
    
    setAccuracy(Math.round(similarity * 100));
    setIsCorrect(similarity > 0.7);
    setHasChecked(true);
    setAnsweredCount(answeredCount + 1);
    
    if (similarity > 0.7) {
      setCorrectCount(correctCount + 1);
    }
    
    toast({
      title: similarity > 0.7 ? "Correct!" : "Not quite right",
      description: similarity > 0.7 
        ? "Great job! Your answer is correct." 
        : `Your answer was ${Math.round(similarity * 100)}% accurate. Try again or view the answer.`,
      variant: similarity > 0.7 ? "default" : "destructive"
    });
  };
  
  const calculateSimilarity = (str1: string, str2: string) => {
    // This is a simple implementation - in a real app, you would use a more
    // sophisticated algorithm for text comparison
    const words1 = str1.split(/\s+/).filter(Boolean);
    const words2 = str2.split(/\s+/).filter(Boolean);
    
    let matches = 0;
    for (const word of words1) {
      if (words2.includes(word)) matches++;
    }
    
    return words1.length === 0 ? 0 : matches / Math.max(words1.length, words2.length);
  };
  
  const tryAgain = () => {
    setUserAnswer("");
    setHasChecked(false);
    setIsCorrect(false);
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Flashcards</h1>
          <p className="text-gray-500">Review and test your knowledge</p>
        </div>
        <Link to="/dashboard/student">
          <Button variant="outline" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow mb-6">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            Card {currentCardIndex + 1} of {flashcards.length}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {currentCard.category}
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {correctCount} / {answeredCount} correct
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-8/12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCardIndex + (flipped ? "-flipped" : "")}
              initial={{ opacity: 0, rotateY: flipped ? -90 : 0 }}
              animate={{ opacity: 1, rotateY: flipped ? 180 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ perspective: 1000 }}
              className="h-full"
            >
              <Card className="w-full h-full min-h-[250px] shadow-lg">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="text-sm text-gray-500 mb-4 flex justify-between">
                    <span>Tap card to {flipped ? "see question" : "see answer"}</span>
                  </div>
                  
                  <div 
                    className="flex-grow flex flex-col items-center justify-center cursor-pointer"
                    onClick={handleFlip}
                  >
                    {!flipped ? (
                      <div className="text-center">
                        <h2 className="text-xl font-medium mb-8">{currentCard.question}</h2>
                        
                        <div className="space-y-4 mt-4">
                          <Input
                            placeholder="Type your answer here..."
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-lg mx-auto"
                          />
                          
                          <div className="flex justify-center gap-2">
                            {!hasChecked ? (
                              <Button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  checkAnswer();
                                }}
                                disabled={!userAnswer.trim()}
                              >
                                Check Answer
                              </Button>
                            ) : (
                              <>
                                {isCorrect ? (
                                  <Badge variant="outline" className="px-3 py-2 bg-green-50 text-green-700 border-green-200">
                                    <Check className="h-4 w-4 mr-1" />
                                    Correct Answer! ({accuracy}% match)
                                  </Badge>
                                ) : (
                                  <div className="flex flex-col items-center">
                                    <Badge variant="outline" className="px-3 py-2 mb-2 bg-orange-50 text-orange-700 border-orange-200">
                                      <X className="h-4 w-4 mr-1" />
                                      {accuracy}% accurate
                                    </Badge>
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        tryAgain();
                                      }}
                                    >
                                      <RotateCcw className="h-3 w-3 mr-1" />
                                      Try Again
                                    </Button>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <h3 className="text-lg font-medium mb-3">Answer:</h3>
                        <p className="text-2xl font-bold mb-4">{currentCard.answer}</p>
                        
                        {hasChecked && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">Your answer:</h4>
                            <p className={`text-lg ${isCorrect ? 'text-green-600' : 'text-orange-600'}`}>
                              {userAnswer || "(No answer provided)"}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentCardIndex === 0}
              className="flex items-center"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>
            
            <Button
              variant={flipped ? "default" : "outline"}
              onClick={handleFlip}
              className="flex items-center"
            >
              {flipped ? 'Show Question' : 'Show Answer'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleNext}
              disabled={currentCardIndex === flashcards.length - 1}
              className="flex items-center"
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="w-full md:w-4/12 space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Study Tips</h3>
              <ul className="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-gray-300">
                <li>Try to answer before checking</li>
                <li>Use spaced repetition for better recall</li>
                <li>Speak your answer out loud</li>
                <li>Create mental associations</li>
                <li>Review difficult cards more frequently</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Your Progress</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Accuracy</span>
                    <span>{answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full mt-1">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ 
                        width: `${answeredCount > 0 ? (correctCount / answeredCount) * 100 : 0}%` 
                      }} 
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Cards Reviewed</span>
                    <span>{answeredCount} / {flashcards.length}</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full mt-1">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ 
                        width: `${(answeredCount / flashcards.length) * 100}%` 
                      }} 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsPage;
