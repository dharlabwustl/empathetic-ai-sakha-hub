
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from 'lucide-react';
import { CustomProgress } from '@/components/ui/custom-progress';
import { TestQuestion, UserAnswer } from '../../types';
import { motion } from 'framer-motion';

interface ConceptTestQuestionProps {
  currentQuestionIndex: number;
  questions: TestQuestion[];
  selectedSubjects: string[];
  getCurrentSubject: (questionId: string) => string;
  showExplanation: boolean;
  userAnswers: UserAnswer[];
  onAnswer: (answer: string) => void;
}

const ConceptTestQuestion: React.FC<ConceptTestQuestionProps> = ({
  currentQuestionIndex,
  questions,
  selectedSubjects,
  getCurrentSubject,
  showExplanation,
  userAnswers,
  onAnswer
}) => {
  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Badge variant="outline" className="bg-pink-50 dark:bg-pink-900/30 border-pink-200 dark:border-pink-700">
          Question {currentQuestionIndex + 1}/{questions.length}
        </Badge>
        <Badge variant="outline" className="bg-pink-50 dark:bg-pink-900/30 border-pink-200 dark:border-pink-700">
          {getCurrentSubject(currentQuestion.id)}
        </Badge>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-pink-100 dark:border-pink-800 shadow-md">
        <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="outline" 
                className="w-full text-left justify-start p-4 h-auto"
                onClick={() => onAnswer(option)}
                disabled={showExplanation}
              >
                <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                {option}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
      
      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg ${
            userAnswers[userAnswers.length - 1].isCorrect 
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
          }`}
        >
          <div className="flex items-start">
            {userAnswers[userAnswers.length - 1].isCorrect ? (
              <CheckCircle2 className="text-green-500 mr-2 mt-1 flex-shrink-0" size={18} />
            ) : (
              <XCircle className="text-red-500 mr-2 mt-1 flex-shrink-0" size={18} />
            )}
            <div>
              <p className="font-medium">
                {userAnswers[userAnswers.length - 1].isCorrect ? 'Correct!' : 'Incorrect'}
              </p>
              <p className="text-sm mt-1">{currentQuestion.explanation}</p>
            </div>
          </div>
        </motion.div>
      )}
      
      <CustomProgress 
        value={(currentQuestionIndex + 1) / questions.length * 100} 
        className="h-2" 
        indicatorClassName="bg-gradient-to-r from-pink-400 to-pink-600" 
      />
    </div>
  );
};

export default ConceptTestQuestion;
