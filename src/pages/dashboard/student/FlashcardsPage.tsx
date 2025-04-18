
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

const FlashcardsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  
  const mockFlashcard: Flashcard = {
    id: "1",
    question: "What is Newton's First Law of Motion?",
    answer: "An object will remain at rest or in uniform motion in a straight line unless acted upon by an external force."
  };

  const checkAnswer = () => {
    const similarity = calculateSimilarity(currentAnswer.toLowerCase(), mockFlashcard.answer.toLowerCase());
    const isAnswerCorrect = similarity > 0.8;
    setIsCorrect(isAnswerCorrect);
    
    toast({
      title: isAnswerCorrect ? "Correct!" : "Try Again",
      description: isAnswerCorrect 
        ? "Great job! You've got it right." 
        : "Keep trying! Your answer needs some improvement.",
      variant: isAnswerCorrect ? "default" : "destructive"
    });
  };

  const calculateSimilarity = (str1: string, str2: string): number => {
    // Simple similarity check - can be improved with more sophisticated algorithms
    return str1.includes(str2) || str2.includes(str1) ? 1 : 0;
  };

  const resetAnswer = () => {
    setCurrentAnswer("");
    setIsCorrect(null);
  };

  return (
    <div className="container py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(-1)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Flashcard Practice</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Question:</h3>
            <p>{mockFlashcard.question}</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Answer:</label>
              <Input
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className={isCorrect === null ? "" : isCorrect ? "border-green-500" : "border-red-500"}
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={checkAnswer} className="gap-2">
                <Check className="h-4 w-4" />
                Check Answer
              </Button>
              <Button variant="outline" onClick={resetAnswer} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Try Again
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlashcardsPage;
