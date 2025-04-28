
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calculator, BookOpen, Mic, Star, Book, Bookmark } from "lucide-react";
import { motion } from "framer-motion";

interface FlashcardData {
  id: string;
  question: string;
  answer: string;
  imageUrl?: string;
  videoUrl?: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const FlashcardStudyPage = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [accuracy, setAccuracy] = useState<number | null>(null);

  const handleFlip = () => setIsFlipped(!isFlipped);

  const toggleSpeechToText = () => {
    setIsListening(!isListening);
    toast({
      title: isListening ? "Speech recognition stopped" : "Listening...",
      duration: 2000
    });
  };

  const toggleCalculator = () => {
    setShowCalculator(!showCalculator);
    toast({
      title: showCalculator ? "Calculator hidden" : "Calculator shown",
      duration: 2000
    });
  };

  const handleBookmark = () => {
    toast({
      title: "Flashcard bookmarked",
      description: "Added to your review list",
      duration: 2000
    });
  };

  const checkAnswer = () => {
    // Simple mock accuracy calculation - in a real app, would use more sophisticated comparison
    const mockAccuracy = Math.floor(Math.random() * 40) + 60; // 60-100%
    setAccuracy(mockAccuracy);
    toast({
      title: `Accuracy: ${mockAccuracy}%`,
      description: mockAccuracy > 80 ? "Great job!" : "Keep practicing!",
      duration: 3000
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">Flashcard Study</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={handleBookmark}>
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={toggleCalculator}>
                <Calculator className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardDescription>Master the concept through active recall</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            {/* Flashcard */}
            <motion.div
              className="relative min-h-[300px] rounded-lg border p-6 cursor-pointer"
              onClick={handleFlip}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className={`absolute inset-0 p-6 ${isFlipped ? 'hidden' : ''}`}>
                <h3 className="text-xl font-medium mb-4">What is Newton's First Law of Motion?</h3>
                <div className="mt-4 text-sm text-muted-foreground">
                  Click to flip and see the answer
                </div>
              </div>
              <div className={`absolute inset-0 p-6 [transform:rotateY(180deg)] ${!isFlipped ? 'hidden' : ''}`}>
                <p className="text-lg">
                  An object at rest stays at rest, and an object in motion stays in motion, unless acted upon by an external force.
                </p>
              </div>
            </motion.div>

            {/* Answer Input */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Type your answer here..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="flex-grow"
                />
                <Button variant="outline" size="icon" onClick={toggleSpeechToText}>
                  <Mic className="h-4 w-4" className={isListening ? "text-blue-500" : ""} />
                </Button>
              </div>

              <div className="flex gap-2">
                <Button onClick={checkAnswer} className="flex-grow">
                  Check Answer
                </Button>
                <Button variant="outline" onClick={() => setUserAnswer('')}>
                  Try Again
                </Button>
              </div>

              {accuracy !== null && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Accuracy</span>
                    <span>{accuracy}%</span>
                  </div>
                  <Progress value={accuracy} className="h-2" />
                </div>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <div className="w-full border-t pt-4">
            <h4 className="font-medium mb-2">Related Flashcards</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="justify-start">
                <Book className="h-4 w-4 mr-2" />
                Newton's Second Law
              </Button>
              <Button variant="outline" className="justify-start">
                <Book className="h-4 w-4 mr-2" />
                Newton's Third Law
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FlashcardStudyPage;
