
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, CheckCircle2, XCircle, RotateCw, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface RecallSectionProps {
  conceptName: string;
}

const RecallSection: React.FC<RecallSectionProps> = ({ conceptName }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // Sample recall questions for Ohm's Law
  const questions = [
    {
      question: "What is the formula for Ohm's Law?",
      answer: "V = IR (Voltage equals Current multiplied by Resistance)"
    },
    {
      question: "If current (I) is 2 amperes and resistance (R) is 5 ohms, what is the voltage (V)?",
      answer: "V = I × R = 2A × 5Ω = 10V"
    },
    {
      question: "If voltage (V) is 12 volts and resistance (R) is 4 ohms, what is the current (I)?",
      answer: "I = V ÷ R = 12V ÷ 4Ω = 3A"
    },
    {
      question: "What unit is used to measure electrical resistance?",
      answer: "Ohm (Ω)"
    }
  ];
  
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowAnswer(false);
    } else {
      setQuizCompleted(true);
    }
  };
  
  const handleRestart = () => {
    setCurrentQuestion(0);
    setShowAnswer(false);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setQuizCompleted(false);
  };
  
  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setCorrectAnswers(prev => prev + 1);
    } else {
      setIncorrectAnswers(prev => prev + 1);
    }
    handleNextQuestion();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-indigo-600" />
          Recall Practice
        </CardTitle>
        <CardDescription>
          Test your memory of key facts about {conceptName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {quizCompleted ? (
          <div className="text-center space-y-6 py-8">
            <h3 className="text-2xl font-bold">Recall Assessment Complete</h3>
            
            <div className="w-40 h-40 mx-auto relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={correctAnswers / questions.length >= 0.75 ? "#10b981" : "#f59e0b"}
                  strokeWidth="10"
                  strokeDasharray={`${(correctAnswers / questions.length) * 283} 283`}
                  transform="rotate(-90 50 50)"
                />
                <text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="24"
                  fontWeight="bold"
                  fill="currentColor"
                >
                  {Math.round((correctAnswers / questions.length) * 100)}%
                </text>
              </svg>
            </div>
            
            <div className="space-y-2">
              <p className="font-medium">
                You answered {correctAnswers} out of {questions.length} questions correctly
              </p>
              <p className="text-sm text-muted-foreground">
                {correctAnswers / questions.length >= 0.75 
                  ? "Great job! You have strong recall of this concept." 
                  : "Keep practicing to improve your recall of this concept."}
              </p>
            </div>
            
            <div className="flex justify-center gap-4 pt-4">
              <Button variant="outline" onClick={handleRestart}>
                <RotateCw className="h-4 w-4 mr-2" />
                Start Over
              </Button>
              <Button>
                <Zap className="h-4 w-4 mr-2" />
                Review Weak Areas
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium">
                {correctAnswers} correct / {incorrectAnswers} incorrect
              </span>
            </div>
            
            <Progress 
              value={(currentQuestion / questions.length) * 100} 
              className="h-2" 
            />
            
            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-2">
                {questions[currentQuestion].question}
              </h3>
              
              {showAnswer ? (
                <div className="mt-6 bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                  <h4 className="font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    Answer
                  </h4>
                  <p className="mt-2">{questions[currentQuestion].answer}</p>
                </div>
              ) : (
                <div className="mt-4 flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="flex-1"
                    onClick={() => setShowAnswer(true)}
                  >
                    Show Answer
                  </Button>
                </div>
              )}
            </div>
            
            {showAnswer && (
              <div className="flex justify-between gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1 border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50"
                  onClick={() => handleAnswer(false)}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  I Got It Wrong
                </Button>
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => handleAnswer(true)}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  I Got It Right
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        Tip: Regular recall practice significantly improves long-term retention of concepts.
      </CardFooter>
    </Card>
  );
};

export default RecallSection;
