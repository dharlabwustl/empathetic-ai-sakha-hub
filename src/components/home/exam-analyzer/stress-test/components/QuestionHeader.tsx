
import React from 'react';
import { Badge } from "@/components/ui/badge";
import QuestionTimer from './QuestionTimer';
import ComplexityIndicator from './ComplexityIndicator';

interface QuestionHeaderProps {
  currentQuestionIndex: number;
  questionsLength: number;
  timeLeft: number;
  questionType?: string;
  currentComplexity: number;
}

const QuestionHeader: React.FC<QuestionHeaderProps> = ({
  currentQuestionIndex,
  questionsLength,
  timeLeft,
  questionType,
  currentComplexity
}) => {
  const getQuestionTypeLabel = () => {
    switch (questionType) {
      case 'pattern-recognition':
        return 'Pattern Recognition';
      case 'memory-recall':
        return 'Memory Recall';
      case 'timed-calculation':
        return 'Calculation';
      case 'multiple-choice':
        return 'Multiple Choice';
      case 'self-assessment':
        return 'Self Assessment';
      default:
        return 'Question';
    }
  };
  
  const getQuestionTypeColor = () => {
    switch (questionType) {
      case 'pattern-recognition':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'memory-recall':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 animate-pulse';
      case 'timed-calculation':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300';
    }
  };
  
  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Question {currentQuestionIndex + 1} of {questionsLength}
        </div>
        <Badge 
          className={`mt-1 ${getQuestionTypeColor()}`}
        >
          {getQuestionTypeLabel()}
        </Badge>
      </div>
      
      <div className="flex items-center space-x-4">
        <ComplexityIndicator level={currentComplexity} />
        <QuestionTimer timeLeft={timeLeft} questionType={questionType} />
      </div>
    </div>
  );
};

export default QuestionHeader;
