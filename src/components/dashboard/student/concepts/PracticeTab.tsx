
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Question {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
}

interface PracticeTabProps {
  conceptId: string;
  questions: Question[];
  onMasteryUpdate: (percentage: number) => void;
}

const PracticeTab: React.FC<PracticeTabProps> = ({ conceptId, questions, onMasteryUpdate }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOption(optionId);
  };
  
  const handleCheckAnswer = () => {
    if (!selectedOption) return;
    
    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctOptionId) {
      setCorrectAnswers(prev => prev + 1);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      // Calculate mastery percentage
      const masteryPercentage = Math.round((correctAnswers / questions.length) * 100);
      onMasteryUpdate(masteryPercentage);
      setShowSummary(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };
  
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectAnswers(0);
    setShowSummary(false);
  };
  
  if (questions.length === 0) {
    return (
      <div className="bg-muted/50 rounded-lg p-8 text-center">
        <h3 className="font-medium text-lg mb-1">No practice questions available</h3>
        <p className="text-muted-foreground">
          Check back later for practice questions on this concept.
        </p>
      </div>
    );
  }
  
  if (showSummary) {
    const masteryPercentage = Math.round((correctAnswers / questions.length) * 100);
    
    return (
      <Card>
        <CardHeader>
          <CardTitle>Practice Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Mastery Progress</span>
              <span className="font-medium">{masteryPercentage}%</span>
            </div>
            <Progress value={masteryPercentage} />
          </div>
          
          <div className="flex items-center justify-center gap-4 py-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{correctAnswers}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            
            <div className="h-8 w-px bg-border"></div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{questions.length - correctAnswers}</div>
              <div className="text-sm text-muted-foreground">Incorrect</div>
            </div>
          </div>
          
          <Button onClick={handleRestart} className="w-full">Practice Again</Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Practice Question</CardTitle>
          <span className="text-sm text-muted-foreground">
            {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} />
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">{currentQuestion.text}</h3>
        </div>
        
        <RadioGroup value={selectedOption || ""} className="space-y-3">
          {currentQuestion.options.map((option) => (
            <div
              key={option.id}
              className={`border rounded-md p-4 ${
                isAnswered
                  ? option.id === currentQuestion.correctOptionId
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : selectedOption === option.id
                    ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                    : "border-border"
                  : "border-border hover:border-primary cursor-pointer"
              }`}
              onClick={() => handleSelectOption(option.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.id}
                    id={option.id}
                    disabled={isAnswered}
                    className={isAnswered ? "cursor-default" : ""}
                  />
                  <Label htmlFor={option.id} className="cursor-pointer">
                    {option.text}
                  </Label>
                </div>
                
                {isAnswered && option.id === currentQuestion.correctOptionId && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
                
                {isAnswered && option.id === selectedOption && option.id !== currentQuestion.correctOptionId && (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            </div>
          ))}
        </RadioGroup>
        
        <div className="pt-4 flex justify-end">
          {!isAnswered ? (
            <Button 
              onClick={handleCheckAnswer} 
              disabled={!selectedOption}
            >
              Check Answer
            </Button>
          ) : (
            <Button onClick={handleNextQuestion}>
              {currentQuestionIndex === questions.length - 1 ? "Show Results" : "Next Question"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PracticeTab;
