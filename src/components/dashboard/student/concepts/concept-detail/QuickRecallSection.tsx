
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, RefreshCw, CheckCircle, XCircle } from "lucide-react";

interface QuickRecallSectionProps {
  conceptId: string;
  title: string;
  content: string;
  onQuizComplete: (score: number) => void;
}

const QuickRecallSection: React.FC<QuickRecallSectionProps> = ({
  conceptId,
  title,
  content,
  onQuizComplete
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});

  // In a real app, you would generate these from the concept content or fetch from API
  const questions = [
    {
      id: "q1",
      question: "A 2kg object experiences a force of 10N. What is its acceleration?",
      options: ["2 m/s²", "5 m/s²", "8 m/s²", "10 m/s²"],
      correctAnswer: "5 m/s²"
    },
    {
      id: "q2",
      question: "If mass is doubled while force remains constant, what happens to acceleration?",
      options: ["Doubles", "Remains the same", "Halves", "Cannot be determined"],
      correctAnswer: "Halves"
    },
    {
      id: "q3",
      question: "Newton's Second Law is represented by the equation:",
      options: ["F = ma", "F = mg", "p = mv", "E = mc²"],
      correctAnswer: "F = ma"
    },
    {
      id: "q4",
      question: "The SI unit of force is:",
      options: ["Kilogram (kg)", "Newton (N)", "Joule (J)", "Watt (W)"],
      correctAnswer: "Newton (N)"
    },
    {
      id: "q5",
      question: "If acceleration is 4 m/s² and mass is 3 kg, what is the force?",
      options: ["7 N", "12 N", "1 N", "0.75 N"],
      correctAnswer: "12 N"
    }
  ];

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;
    
    // Save user's answer
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: selectedAnswer
    }));
    
    // Check if answer is correct and update score
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    // Move to next question or complete quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      // Calculate final score as percentage
      const finalScore = Math.round((score + (selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 1 : 0)) / questions.length * 100);
      setIsQuizCompleted(true);
      onQuizComplete(finalScore);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsQuizCompleted(false);
    setUserAnswers({});
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-bold">Knowledge Validation</h2>
      </div>
      
      {!isQuizCompleted ? (
        <>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          <Card className="p-4 mb-6">
            <p className="text-lg font-medium mb-4">{currentQuestion.question}</p>
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  className={`w-full text-left p-3 rounded-lg border ${
                    selectedAnswer === option
                      ? 'bg-blue-100 border-blue-300 dark:bg-blue-900/30 dark:border-blue-700'
                      : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750'
                  }`}
                  onClick={() => handleAnswerSelection(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </Card>
          
          <div className="flex justify-end">
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
            <span className="text-2xl font-bold text-blue-700 dark:text-blue-400">
              {Math.round((score / questions.length) * 100)}%
            </span>
          </div>
          
          <h3 className="text-xl font-bold mb-2">Quiz Completed!</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You got {score} out of {questions.length} questions correct.
          </p>
          
          <div className="space-y-4 mb-6">
            {questions.map((q, index) => (
              <div 
                key={q.id} 
                className={`p-3 rounded-lg border ${
                  userAnswers[index] === q.correctAnswer
                    ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800/50'
                    : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800/50'
                }`}
              >
                <div className="flex items-start gap-2">
                  {userAnswers[index] === q.correctAnswer ? (
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium mb-1">{q.question}</p>
                    <p className="text-sm">
                      Your answer: <span className={userAnswers[index] === q.correctAnswer ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}>{userAnswers[index]}</span>
                    </p>
                    {userAnswers[index] !== q.correctAnswer && (
                      <p className="text-sm text-green-700 dark:text-green-400">
                        Correct answer: {q.correctAnswer}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            className="flex items-center gap-2"
            onClick={handleRestartQuiz}
          >
            <RefreshCw className="h-4 w-4" />
            Retry Quiz
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuickRecallSection;
