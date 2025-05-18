
import React, { useState } from 'react';
import { TestQuestion } from '../../types';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Brain } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ConceptTestQuestionProps {
  question: TestQuestion;
  onAnswer: (answer: string, confidenceLevel?: number) => void;
  disabled?: boolean;
}

const ConceptTestQuestion: React.FC<ConceptTestQuestionProps> = ({ 
  question, 
  onAnswer,
  disabled = false
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  const handleSubmit = () => {
    if (selectedAnswer && !disabled) {
      onAnswer(selectedAnswer);
    }
  };
  
  // Format options according to NEET standard (using 1, 2, 3, 4 numbering)
  const getFormattedOptions = () => {
    return question.options.map((option, index) => {
      // NEET uses numbers (1,2,3,4) for options, not letters
      const optionNumber = index + 1;
      return {
        label: `${optionNumber}. ${option}`,
        value: option
      };
    });
  };
  
  const formattedOptions = getFormattedOptions();
  
  return (
    <div className={`bg-white dark:bg-gray-800 ${isMobile ? 'p-4' : 'p-6'} rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm`}>
      <div className={`${isMobile ? 'mb-4' : 'mb-6'}`}>
        <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-medium flex items-start`}>
          <Brain className={`mr-2 text-pink-500 mt-1 flex-shrink-0 ${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
          <span>{question.question}</span>
        </h3>
        
        {question.imageUrl && (
          <div className="mt-4 rounded-lg overflow-hidden">
            <img 
              src={question.imageUrl} 
              alt="Question visual" 
              className="w-full object-contain max-h-64" 
            />
          </div>
        )}
      </div>
      
      <RadioGroup className={`space-y-2 ${isMobile ? 'mb-4' : 'mb-6'}`}>
        {formattedOptions.map((option, index) => (
          <div 
            key={index} 
            className={`flex items-center space-x-2 ${isMobile ? 'p-2' : 'p-3'} rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
              selectedAnswer === option.value ? 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800' : ''
            }`}
            onClick={() => !disabled && setSelectedAnswer(option.value)}
          >
            <RadioGroupItem 
              value={option.value} 
              id={`option-${index}`} 
              checked={selectedAnswer === option.value}
              disabled={disabled}
            />
            <Label 
              htmlFor={`option-${index}`}
              className={`flex-1 cursor-pointer ${isMobile ? 'text-sm' : ''}`}
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button
          className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
          onClick={handleSubmit}
          disabled={!selectedAnswer || disabled}
          size={isMobile ? "sm" : "default"}
        >
          Submit Answer
        </Button>
      </motion.div>
    </div>
  );
};

export default ConceptTestQuestion;
