
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TestQuestion } from '../../types';
import { Button } from '@/components/ui/button';
import { Activity } from 'lucide-react';

interface QuestionContainerProps {
  currentQuestion: TestQuestion;
  showDistraction: boolean;
  showExplanation: boolean;
  onAnswer: (answer: string) => void;
}

const QuestionContainer: React.FC<QuestionContainerProps> = ({
  currentQuestion,
  showDistraction,
  showExplanation,
  onAnswer
}) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl border-2 border-blue-100 dark:border-blue-800/50 shadow-lg"
      animate={{ scale: showDistraction ? 0.98 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
      
      {currentQuestion.imageUrl && (
        <div className="mb-4">
          <img 
            src={currentQuestion.imageUrl} 
            alt="Question visual" 
            className="mx-auto max-h-40 object-contain rounded-lg shadow-md"
          />
        </div>
      )}
      
      <div className="space-y-3 relative">
        {currentQuestion.options.map((option, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              variant="outline" 
              className="w-full text-left justify-start p-4 h-auto border-blue-100 dark:border-blue-800 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all duration-200"
              onClick={() => onAnswer(option)}
              disabled={showExplanation}
            >
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-900 dark:to-violet-900 flex items-center justify-center text-sm font-medium text-blue-700 dark:text-blue-300 mr-2">
                {String.fromCharCode(65 + index)}
              </div>
              <span>{option}</span>
            </Button>
          </motion.div>
        ))}
        
        <AnimatePresence>
          {showDistraction && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg border border-red-200 dark:border-red-800 shadow-lg flex items-center">
                <Activity className="text-red-500 mr-2 animate-pulse" size={20} />
                <span className="font-medium text-red-600 dark:text-red-300">Stay focused!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default QuestionContainer;
