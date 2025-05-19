
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, HelpCircle, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuickRecallSectionProps {
  conceptId: string;
  title: string;
  content: string;
}

const QuickRecallSection: React.FC<QuickRecallSectionProps> = ({ conceptId, title, content }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, boolean>>({});
  const { toast } = useToast();
  
  // Generate quick questions based on the content
  const questions = [
    {
      question: `What is the main topic of "${title}"?`,
      answer: content.substring(0, 100) + "...",
    },
    {
      question: "Can you explain this concept in your own words?",
      answer: "This is a self-assessment question. Try to recall and explain the concept clearly.",
    },
    {
      question: "How does this concept relate to other topics you've studied?",
      answer: "This is a self-assessment question. Think about connections with other concepts.",
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswer(false);
    } else {
      // End of questions
      const correctAnswers = Object.values(userAnswers).filter(Boolean).length;
      const totalAnswers = Object.values(userAnswers).length;
      
      toast({
        title: "Practice completed!",
        description: `You answered ${correctAnswers} out of ${totalAnswers} questions correctly.`,
        variant: "default",
      });
      
      // Reset for new round
      setCurrentQuestionIndex(0);
      setShowAnswer(false);
      setUserAnswers({});
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const markAnswer = (isCorrect: boolean) => {
    setUserAnswers({ ...userAnswers, [currentQuestionIndex]: isCorrect });
    handleNext();
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
    setUserAnswers({});
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Quick Recall Practice</h2>
        <Button variant="outline" onClick={resetQuiz} className="flex items-center gap-1">
          <RefreshCw className="h-4 w-4" /> Reset
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-2">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{currentQuestion.question}</p>
          
          {showAnswer ? (
            <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded">
              <p className="text-gray-700 dark:text-gray-300">{currentQuestion.answer}</p>
            </div>
          ) : (
            <div className="flex flex-col space-y-3">
              <Button variant="outline" onClick={handleShowAnswer}>
                Show Answer
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {showAnswer && (
        <div className="flex justify-between">
          <div className="space-x-2">
            <Button 
              variant="outline" 
              className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={() => markAnswer(false)}
            >
              <XCircle className="h-4 w-4 mr-1" /> Incorrect
            </Button>
            <Button 
              variant="outline" 
              className="border-green-500 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20"
              onClick={() => markAnswer(true)}
            >
              <CheckCircle className="h-4 w-4 mr-1" /> Correct
            </Button>
          </div>
          <Button onClick={handleNext}>
            Next Question
          </Button>
        </div>
      )}
      
      <div className="flex justify-between mt-6">
        <div className="flex items-center gap-1">
          {questions.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-3 h-3 rounded-full ${
                idx === currentQuestionIndex 
                  ? 'bg-blue-500' 
                  : idx in userAnswers
                    ? userAnswers[idx] 
                      ? 'bg-green-500' 
                      : 'bg-red-500'
                    : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickRecallSection;
