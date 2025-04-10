
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Zap, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import ComplexityIndicator from './ComplexityIndicator';
import QuestionTimer from './QuestionTimer';

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
  return (
    <>
      <div className="flex justify-between items-center">
        <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/30 dark:to-violet-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300">
          Question {currentQuestionIndex + 1}/{questionsLength}
        </Badge>
        <QuestionTimer timeLeft={timeLeft} />
      </div>
      
      <motion.div
        initial={{ opacity: 0.8, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-between"
      >
        {questionType && (
          <div className="flex items-center">
            <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/30 dark:to-violet-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 flex items-center gap-1">
              {questionType === 'pattern-recognition' && <Zap className="h-3 w-3" />}
              {questionType === 'memory-recall' && <Brain className="h-3 w-3" />}
              {questionType}
            </Badge>
          </div>
        )}
        <ComplexityIndicator currentComplexity={currentComplexity} />
      </motion.div>
    </>
  );
};

export default QuestionHeader;
