
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, BookOpen, Check, X } from 'lucide-react';

export default function FlashcardStudyPage() {
  const { deckId } = useParams();
  const { toast } = useToast();
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [progress, setProgress] = useState(0);

  // Mock flashcard data - replace with actual data from your backend
  const flashcards = [
    {
      id: 1,
      question: "What is Newton's First Law?",
      answer: "An object will remain at rest or in uniform motion in a straight line unless acted upon by an external force.",
      subject: "Physics",
      chapter: "Laws of Motion",
      difficulty: "Medium"
    },
    // ... more flashcards
  ];

  const handleNext = () => {
    if (currentCard < flashcards.length - 1) {
      setCurrentCard(prev => prev + 1);
      setShowAnswer(false);
      setProgress((currentCard + 1) / flashcards.length * 100);
    }
  };

  const handlePrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(prev => prev - 1);
      setShowAnswer(false);
      setProgress(currentCard / flashcards.length * 100);
    }
  };

  const handleResponse = (understood: boolean) => {
    toast({
      title: understood ? "Great job!" : "Keep practicing!",
      description: understood ? "You've mastered this concept" : "We'll review this card again later",
      duration: 2000,
    });
    handleNext();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Flashcard Practice</h1>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Deck
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Card {currentCard + 1} of {flashcards.length}
            </span>
            <Progress value={progress} className="w-64" />
          </div>

          <Card className="p-8">
            <div className="min-h-[300px] flex flex-col items-center justify-center text-center space-y-6">
              {!showAnswer ? (
                <div className="space-y-4">
                  <BookOpen className="h-8 w-8 mx-auto text-primary" />
                  <h2 className="text-xl font-semibold">{flashcards[currentCard].question}</h2>
                  <Button 
                    size="lg"
                    onClick={() => setShowAnswer(true)}
                  >
                    Show Answer
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-lg">{flashcards[currentCard].answer}</p>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handleResponse(false)}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Need Review
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => handleResponse(true)}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Got It
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentCard === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Card
            </Button>
            <Button
              variant="outline"
              onClick={handleNext}
              disabled={currentCard === flashcards.length - 1}
            >
              Next Card
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
