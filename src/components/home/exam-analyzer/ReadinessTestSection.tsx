
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, ChevronRight } from 'lucide-react';
import { CustomProgress } from '@/components/ui/custom-progress';
import { TestResults, TestQuestion, UserAnswer } from './types';
import { getReadinessTestQuestions } from './test-questions/readinessTestQuestions';
import { motion } from 'framer-motion';

interface ReadinessTestSectionProps {
  loading: boolean;
  testCompleted: boolean;
  selectedExam: string;
  results: TestResults;
  simulateTest: () => void;
  onCompleteTest: (answers: UserAnswer[]) => void;
  onContinue: () => void;
}

const ReadinessTestSection: React.FC<ReadinessTestSectionProps> = ({
  loading,
  testCompleted,
  selectedExam,
  results,
  simulateTest,
  onCompleteTest,
  onContinue
}) => {
  const [isTestActive, setIsTestActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  
  const startTest = () => {
    const testQuestions = getReadinessTestQuestions(selectedExam);
    setQuestions(testQuestions);
    setIsTestActive(true);
  };
  
  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      answer,
      timeToAnswer: 0, // Time doesn't matter for self-assessment
    };
    
    setUserAnswers(prev => [...prev, newAnswer]);
    
    // Move to next question or complete test
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setIsTestActive(false);
      onCompleteTest(userAnswers);
    }
  };
  
  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="bg-violet-50 dark:bg-violet-900/30 border-violet-200 dark:border-violet-700">
            Question {currentQuestionIndex + 1}/{questions.length}
          </Badge>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-violet-100 dark:border-violet-800 shadow-md">
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
                  onClick={() => handleAnswer(option)}
                >
                  <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
        
        <CustomProgress 
          value={(currentQuestionIndex + 1) / questions.length * 100} 
          className="h-2" 
          indicatorClassName="bg-gradient-to-r from-violet-400 to-violet-600" 
        />
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center">
          <Target className="mr-2 text-violet-500" size={20} />
          Readiness Score Test
        </h3>
        <Badge variant="outline" className="bg-violet-50 dark:bg-violet-900/30 border-violet-200 dark:border-violet-700">2 of 3</Badge>
      </div>
      
      <p className="text-sm">
        This test evaluates your current preparation level by analyzing content coverage, practice effectiveness, and study commitment.
      </p>
      
      {!loading && !testCompleted && !isTestActive ? (
        <div className="space-y-6">
          <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg border-2 border-violet-100 dark:border-violet-800">
            <h4 className="font-medium mb-2 flex items-center">
              <Target className="mr-2 text-violet-500" size={16} />
              Instructions:
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>You'll answer 10 questions about your study habits and exam preparation</li>
              <li>Be honest about your preparation level for accurate results</li>
              <li>Questions cover syllabus knowledge, practice frequency, and time management</li>
              <li>Your responses will help create your personalized study plan</li>
            </ul>
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={startTest}
          >
            Begin Readiness Test
          </Button>
        </div>
      ) : loading ? (
        <div className="space-y-4">
          <div className="h-40 bg-violet-50 dark:bg-violet-900/20 rounded-lg flex items-center justify-center border-2 border-violet-100 dark:border-violet-800">
            <div className="text-center">
              <Target className="mx-auto mb-2 animate-pulse text-violet-500" size={40} />
              <p className="text-sm font-medium">Test in progress...</p>
            </div>
          </div>
          <CustomProgress value={30} className="h-2" indicatorClassName="bg-gradient-to-r from-violet-400 to-violet-600" />
          <p className="text-xs text-center text-muted-foreground">Please wait while we analyze your responses</p>
        </div>
      ) : isTestActive ? (
        renderQuestion()
      ) : (
        <div className="space-y-4">
          <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg border-2 border-violet-100 dark:border-violet-800">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Your Readiness Score:</h4>
              <span className="text-lg font-bold">{results.score}%</span>
            </div>
            <CustomProgress value={results.score} className="h-2 my-2" indicatorClassName="bg-gradient-to-r from-violet-400 to-violet-600" />
            <p className="text-sm">{results.analysis}</p>
          </div>
          
          <Button 
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={onContinue}
          >
            <span>Continue to Next Test</span>
            <ChevronRight size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReadinessTestSection;
