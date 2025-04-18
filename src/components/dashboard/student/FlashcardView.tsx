
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, RefreshCw, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import BackToDashboardButton from '../BackToDashboardButton';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface FlashcardViewProps {
  title?: string;
  subject?: string;
  chapter?: string;
  flashcards: Flashcard[];
}

const FlashcardView: React.FC<FlashcardViewProps> = ({ 
  title = "Today's Flashcards", 
  subject = "Physics", 
  chapter = "Mechanics",
  flashcards = [] 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Flashcard | null>(null);

  // Sample flashcards if none provided
  const defaultFlashcards: Flashcard[] = [
    {
      id: "1",
      question: "What is Newton's first law of motion?",
      answer: "An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an external force.",
      subject: "Physics",
      topic: "Mechanics",
      difficulty: "medium"
    },
    {
      id: "2",
      question: "What is the formula for force according to Newton's second law?",
      answer: "F = ma, where F is force, m is mass, and a is acceleration.",
      subject: "Physics",
      topic: "Mechanics",
      difficulty: "easy"
    },
    {
      id: "3",
      question: "State Newton's third law of motion.",
      answer: "For every action, there is an equal and opposite reaction.",
      subject: "Physics",
      topic: "Mechanics",
      difficulty: "easy"
    }
  ];
  
  const cards = flashcards.length > 0 ? flashcards : defaultFlashcards;
  const currentCard = cards[currentIndex];
  
  const handlePrevious = () => {
    setFlipped(false);
    setIsAnswerCorrect(null);
    setUserAnswer("");
    setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setFlipped(false);
    setIsAnswerCorrect(null);
    setUserAnswer("");
    setCurrentIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };
  
  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };
  
  const handleCheckAnswer = () => {
    const isCorrect = userAnswer.toLowerCase().includes(currentCard.answer.toLowerCase()) ||
                     currentCard.answer.toLowerCase().includes(userAnswer.toLowerCase());
    setIsAnswerCorrect(isCorrect);
  };
  
  const handleReset = () => {
    setUserAnswer("");
    setIsAnswerCorrect(null);
  };

  const handleCardClick = (card: Flashcard) => {
    setSelectedCard(card);
    setShowDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <BackToDashboardButton />
          <h1 className="text-2xl font-bold mb-1">{title}</h1>
          <p className="text-gray-500">{subject} - {chapter}</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          {currentIndex + 1}/{cards.length}
        </Badge>
      </div>
      
      {/* All flashcards grid view */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <Card 
            key={card.id}
            className="cursor-pointer hover:shadow-md transition-all"
            onClick={() => handleCardClick(card)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{`Card ${index + 1}`}</CardTitle>
              <CardDescription className="text-xs flex justify-between">
                <span>{card.subject}</span>
                <Badge variant={
                  card.difficulty === 'easy' ? 'outline' : 
                  card.difficulty === 'medium' ? 'secondary' : 
                  'destructive'
                } className="text-xs">
                  {card.difficulty}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-medium line-clamp-2">{card.question}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Flashcard dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Flashcard</DialogTitle>
            <DialogDescription>
              {selectedCard?.subject} - {selectedCard?.topic}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle>Question</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">{selectedCard?.question}</p>
              </CardContent>
            </Card>
            
            <Textarea
              placeholder="Type your answer here..."
              className="min-h-[100px] w-full"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
            
            {isAnswerCorrect !== null && (
              <div className={`p-3 rounded-md ${
                isAnswerCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
              }`}>
                <div className="flex items-start gap-2">
                  {isAnswerCorrect ? 
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" /> : 
                    <RefreshCw className="h-5 w-5 text-red-600 mt-0.5" />
                  }
                  <div>
                    <p className={`font-medium ${isAnswerCorrect ? "text-green-700" : "text-red-700"}`}>
                      {isAnswerCorrect ? "Correct!" : "Try again"}
                    </p>
                    <p className="text-sm mt-1">
                      {isAnswerCorrect ? 
                        "Great job! You got it right." : 
                        "Not quite right. The correct answer is:"
                      }
                    </p>
                    {!isAnswerCorrect && (
                      <p className="text-sm font-medium mt-1">{selectedCard?.answer}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter className="flex justify-between sm:justify-between">
            <div className="space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setShowDialog(false)}
                className="flex items-center gap-1"
              >
                <ArrowLeft size={16} />
                Back
              </Button>
            </div>
            
            <div className="space-x-2">
              {isAnswerCorrect === null ? (
                <Button 
                  onClick={handleCheckAnswer} 
                  disabled={!userAnswer.trim()}
                >
                  Check Answer
                </Button>
              ) : (
                <Button onClick={handleReset} variant="outline">
                  <RefreshCw size={16} className="mr-1" />
                  Try Again
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FlashcardView;
