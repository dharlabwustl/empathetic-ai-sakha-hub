
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { TestQuestion, UserAnswer } from '../types';
import { CustomProgress } from '@/components/ui/custom-progress';
import QuestionHeader from './components/QuestionHeader';
import QuestionContainer from './components/QuestionContainer';
import AnswerExplanation from './components/AnswerExplanation';

interface StressTestQuestionProps {
  currentQuestion: TestQuestion;
  currentQuestionIndex: number;
  questionsLength: number;
  timeLeft: number;
  showExplanation: boolean;
  showDistraction: boolean;
  currentComplexity: number;
  userAnswers: UserAnswer[];
  onAnswer: (answer: string) => void;
}

const StressTestQuestion: React.FC<StressTestQuestionProps> = ({
  currentQuestion,
  currentQuestionIndex,
  questionsLength,
  timeLeft,
  showExplanation,
  showDistraction,
  currentComplexity,
  userAnswers,
  onAnswer
}) => {
  return (
    <div className="space-y-6">
      <QuestionHeader
        currentQuestionIndex={currentQuestionIndex}
        questionsLength={questionsLength}
        timeLeft={timeLeft}
        questionType={currentQuestion.type}
        currentComplexity={currentComplexity}
      />
      
      <QuestionContainer
        currentQuestion={currentQuestion}
        showDistraction={showDistraction}
        showExplanation={showExplanation}
        onAnswer={onAnswer}
      />
      
      {showExplanation && userAnswers.length > 0 && (
        <AnswerExplanation
          userAnswer={userAnswers[userAnswers.length - 1]} 
          explanation={currentQuestion.explanation || ""}
        />
      )}
      
      <CustomProgress 
        value={(currentQuestionIndex + 1) / questionsLength * 100} 
        className="h-2" 
        indicatorClassName="bg-gradient-to-r from-blue-400 to-violet-600" 
      />
    </div>
  );
};

export default StressTestQuestion;
