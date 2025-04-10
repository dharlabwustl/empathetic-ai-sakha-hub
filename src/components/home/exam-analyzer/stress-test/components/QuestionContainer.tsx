
import React from 'react';
import { TestQuestion } from '../../types';
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { motion } from 'framer-motion';

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
  const isVisualQuestion = !!currentQuestion.imageUrl;

  const distractAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <div className="relative">
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg border border-violet-100 dark:border-violet-800/30">
        <h3 className="text-lg font-medium mb-4 text-center">{currentQuestion.question}</h3>
        
        {/* Visual question image */}
        {isVisualQuestion && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-lg overflow-hidden shadow-md"
          >
            <img 
              src={currentQuestion.imageUrl} 
              alt="Question visual" 
              className="w-full max-h-[250px] object-cover" 
            />
          </motion.div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => onAnswer(option)}
              disabled={showExplanation}
              className="p-4 h-auto text-left justify-start hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors"
              variant="outline"
            >
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-violet-100 dark:bg-violet-800/40 text-violet-800 dark:text-violet-300 mr-3 flex-shrink-0">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-gray-700 dark:text-gray-200">{option}</span>
            </Button>
          ))}
        </div>
      </div>

      {showDistraction && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-orange-500/30 flex items-center justify-center rounded-xl backdrop-blur-sm z-10"
          variants={distractAnimation}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex items-center">
            <AlertTriangle className="text-amber-500 mr-2" size={24} />
            <span className="font-medium">Stay focused!</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QuestionContainer;
