
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, ChevronRight, BookOpen, CheckCircle, BarChart } from 'lucide-react';
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
  const [questionCategories, setQuestionCategories] = useState<{
    conceptCompletion: number,
    practicePerformance: number,
    timeManagement: number,
    overallConfidence: number
  }>({
    conceptCompletion: 0,
    practicePerformance: 0, 
    timeManagement: 0,
    overallConfidence: 0
  });
  
  // Category-specific scores
  const [categoryScores, setCategoryScores] = useState({
    conceptCoverage: 0,
    practiceScore: 0,
    studyHabits: 0
  });
  
  const startTest = () => {
    const testQuestions = getReadinessTestQuestions(selectedExam);
    setQuestions(testQuestions);
    setIsTestActive(true);
  };
  
  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Track question category for weighted scoring
    if (currentQuestion.category === 'Concept Completion') {
      setQuestionCategories(prev => ({...prev, conceptCompletion: prev.conceptCompletion + 1}));
    } else if (currentQuestion.category === 'Practice Performance') {
      setQuestionCategories(prev => ({...prev, practicePerformance: prev.practicePerformance + 1}));
    } else if (currentQuestion.category === 'Time Management') {
      setQuestionCategories(prev => ({...prev, timeManagement: prev.timeManagement + 1}));
    } else if (currentQuestion.category === 'Overall Confidence') {
      setQuestionCategories(prev => ({...prev, overallConfidence: prev.overallConfidence + 1}));
    }
    
    // Calculate score based on answer index (0-3)
    // Format of answer is the full text of the option
    const optionIndex = currentQuestion.options.findIndex(option => option === answer);
    
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      answer: (optionIndex + 1).toString(), // Store as "1", "2", "3", "4"
      timeToAnswer: 0, // Time doesn't matter for self-assessment
      category: currentQuestion.category
    };
    
    setUserAnswers(prev => [...prev, newAnswer]);
    
    // Move to next question or complete test
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      // Calculate category scores before completing
      calculateCategoryScores([...userAnswers, newAnswer]);
      setIsTestActive(false);
      onCompleteTest([...userAnswers, newAnswer]);
    }
  };
  
  const calculateCategoryScores = (answers: UserAnswer[]) => {
    // Group answers by category
    const conceptAnswers = answers.filter(a => a.category === 'Concept Completion');
    const practiceAnswers = answers.filter(a => a.category === 'Practice Performance');
    const timeAnswers = answers.filter(a => a.category === 'Time Management');
    
    // Calculate scores (option index 0-3 represents readiness level)
    const getScoreFromAnswers = (categoryAnswers: UserAnswer[]) => {
      if (categoryAnswers.length === 0) return 0;
      
      const total = categoryAnswers.reduce((sum, answer) => {
        const score = parseInt(answer.answer) - 1; // Convert "1"-"4" to 0-3
        return sum + score;
      }, 0);
      
      return Math.floor((total / (categoryAnswers.length * 3)) * 100); // Scale to percentage
    };
    
    const conceptScore = getScoreFromAnswers(conceptAnswers);
    const practiceScore = getScoreFromAnswers(practiceAnswers);
    const studyScore = getScoreFromAnswers(timeAnswers);
    
    setCategoryScores({
      conceptCoverage: conceptScore,
      practiceScore: practiceScore,
      studyHabits: studyScore
    });
  };
  
  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="bg-violet-50 dark:bg-violet-900/30 border-violet-200 dark:border-violet-700">
            Question {currentQuestionIndex + 1}/{questions.length}
          </Badge>
          <Badge variant="outline" className="bg-violet-50 dark:bg-violet-900/30 border-violet-200 dark:border-violet-700">
            {currentQuestion.category || 'Readiness Assessment'}
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
          <BarChart className="mr-2 text-violet-500" size={20} />
          Readiness Score Assessment
        </h3>
        <Badge variant="outline" className="bg-violet-50 dark:bg-violet-900/30 border-violet-200 dark:border-violet-700">2 of 3</Badge>
      </div>
      
      <p className="text-sm">
        This assessment evaluates your current preparation by analyzing syllabus coverage, practice effectiveness, and study commitment.
      </p>
      
      {!loading && !testCompleted && !isTestActive ? (
        <div className="space-y-6">
          <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg border-2 border-violet-100 dark:border-violet-800">
            <h4 className="font-medium mb-2 flex items-center">
              <Target className="mr-2 text-violet-500" size={16} />
              Assessment Components:
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li><span className="font-medium">Concept Completion:</span> How much of the syllabus you've covered</li>
              <li><span className="font-medium">Practice Performance:</span> Your mock test scores and consistency</li>
              <li><span className="font-medium">Study Habits:</span> Your time management and study techniques</li>
            </ul>
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={startTest}
          >
            Begin Readiness Assessment
          </Button>
        </div>
      ) : loading ? (
        <div className="space-y-4">
          <div className="h-40 bg-violet-50 dark:bg-violet-900/20 rounded-lg flex items-center justify-center border-2 border-violet-100 dark:border-violet-800">
            <div className="text-center">
              <Target className="mx-auto mb-2 animate-pulse text-violet-500" size={40} />
              <p className="text-sm font-medium">Analyzing your preparation level...</p>
            </div>
          </div>
          <CustomProgress value={30} className="h-2" indicatorClassName="bg-gradient-to-r from-violet-400 to-violet-600" />
          <p className="text-xs text-center text-muted-foreground">Please wait while we calculate your readiness score</p>
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
            
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="bg-white/60 dark:bg-gray-800/60 p-2 rounded text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Concept Coverage</p>
                <p className="font-medium">{categoryScores.conceptCoverage}%</p>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 p-2 rounded text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Practice Score</p>
                <p className="font-medium">{categoryScores.practiceScore}%</p>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 p-2 rounded text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">Study Habits</p>
                <p className="font-medium">{categoryScores.studyHabits}%</p>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={onContinue}
          >
            <span>Continue to Concept Mastery Test</span>
            <ChevronRight size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReadinessTestSection;
