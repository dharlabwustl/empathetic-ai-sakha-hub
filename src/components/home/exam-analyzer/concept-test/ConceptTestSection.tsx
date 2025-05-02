
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, ChevronRight, BookOpen, Check, BookMarked } from 'lucide-react';
import { CustomProgress } from '@/components/ui/custom-progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TestResults, TestQuestion, UserAnswer } from '../types';
import { getConceptTestQuestions, getConceptTestSubjects } from '../test-questions/conceptTestQuestions';
import { motion, AnimatePresence } from 'framer-motion';

interface ConceptTestSectionProps {
  loading: boolean;
  testCompleted: boolean;
  selectedExam: string;
  results: TestResults;
  simulateTest: () => void;
  onCompleteTest: (answers: UserAnswer[]) => void;
  onContinue: () => void;
}

const ConceptTestSection: React.FC<ConceptTestSectionProps> = ({
  loading,
  testCompleted,
  selectedExam,
  results,
  simulateTest,
  onCompleteTest,
  onContinue
}) => {
  const [isTestActive, setIsTestActive] = useState(false);
  const [currentSubject, setCurrentSubject] = useState('Physics');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [subjectQuestions, setSubjectQuestions] = useState<Record<string, TestQuestion[]>>({});
  const [subjectScores, setSubjectScores] = useState<Record<string, number>>({});
  const [completedSubjects, setCompletedSubjects] = useState<string[]>([]);
  const [allSubjects] = useState(getConceptTestSubjects());
  
  // Start the test for a particular subject
  const startTest = (subject: string) => {
    if (completedSubjects.includes(subject)) {
      return; // Subject already completed
    }
    
    const testQuestions = getConceptTestQuestions(subject, 10);
    
    setSubjectQuestions(prev => ({
      ...prev,
      [subject]: testQuestions
    }));
    
    setQuestions(testQuestions);
    setCurrentSubject(subject);
    setCurrentQuestionIndex(0);
    setIsTestActive(true);
  };
  
  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      answer,
      timeToAnswer: 0, 
      isCorrect: answer === currentQuestion.correctAnswer
    };
    
    setUserAnswers(prev => [...prev, newAnswer]);
    
    // Move to next question or complete the subject test
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      // Calculate score for this subject
      const subjectAnswers = [...userAnswers, newAnswer];
      const correctAnswers = subjectAnswers.filter(a => a.isCorrect).length;
      const score = Math.round((correctAnswers / subjectAnswers.length) * 100);
      
      setSubjectScores(prev => ({
        ...prev,
        [currentSubject]: score
      }));
      
      setCompletedSubjects(prev => [...prev, currentSubject]);
      
      // Check if all subjects are completed
      const updatedCompletedSubjects = [...completedSubjects, currentSubject];
      if (updatedCompletedSubjects.length === allSubjects.length) {
        // All subjects are completed, end the test
        setIsTestActive(false);
        
        // Combine all answers and submit
        const allAnswers = [...userAnswers, newAnswer];
        onCompleteTest(allAnswers);
      } else {
        // Move to the next subject
        setIsTestActive(false);
      }
    }
  };
  
  const renderQuestion = () => {
    if (!questions.length) return null;
    
    const currentQuestion = questions[currentQuestionIndex];
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="bg-pink-50 dark:bg-pink-900/30 border-pink-200 dark:border-pink-700">
            Question {currentQuestionIndex + 1}/{questions.length}
          </Badge>
          <Badge variant="outline" className="bg-pink-50 dark:bg-pink-900/30 border-pink-200 dark:border-pink-700">
            {currentSubject} - {currentQuestion.subject}
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
          indicatorClassName="bg-gradient-to-r from-pink-400 to-pink-600" 
        />
      </div>
    );
  };
  
  const renderSubjectSelection = () => {
    return (
      <div className="space-y-6">
        <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg border-2 border-pink-100 dark:border-pink-800">
          <h4 className="font-medium mb-2 flex items-center">
            <Brain className="mr-2 text-pink-500" size={16} />
            Test your concept mastery across all NEET subjects:
          </h4>
          <p className="text-sm mb-4">
            Complete 10 questions for each subject to assess your understanding of key concepts.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {allSubjects.map((subject) => (
              <Button 
                key={subject}
                variant={completedSubjects.includes(subject) ? "outline" : "default"}
                className={completedSubjects.includes(subject) 
                  ? "border-green-300 bg-green-50 text-green-800 hover:bg-green-100 hover:text-green-900"
                  : "bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"}
                onClick={() => startTest(subject)}
                disabled={completedSubjects.includes(subject)}
              >
                {completedSubjects.includes(subject) ? (
                  <>
                    <Check className="mr-2" size={16} />
                    {subject} ({subjectScores[subject]}%)
                  </>
                ) : (
                  <>
                    <BookMarked className="mr-2" size={16} />
                    {subject}
                  </>
                )}
              </Button>
            ))}
          </div>
          
          {completedSubjects.length > 0 && completedSubjects.length < allSubjects.length && (
            <div className="mt-4 text-center text-sm">
              <p className="text-muted-foreground">
                You've completed {completedSubjects.length} out of {allSubjects.length} subjects. Please complete all subjects.
              </p>
            </div>
          )}
          
          {completedSubjects.length === allSubjects.length && (
            <div className="mt-4 text-center">
              <p className="text-green-600 font-medium mb-2">All subjects completed!</p>
              <Button 
                className="w-full mt-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
                onClick={() => {
                  // Calculate overall score
                  const overallScore = Object.values(subjectScores).reduce((a, b) => a + b, 0) / allSubjects.length;
                  
                  // Format answers to include all subjects
                  const allAnswers = userAnswers;
                  
                  onCompleteTest(allAnswers);
                }}
              >
                View My Results
              </Button>
            </div>
          )}
        </div>
        
        {completedSubjects.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Subject Scores:</h4>
            <div className="space-y-3">
              {completedSubjects.map(subject => (
                <div key={subject} className="bg-white dark:bg-gray-800 p-3 rounded border">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{subject}</span>
                    <span className={`font-medium ${
                      subjectScores[subject] >= 70 ? 'text-green-600' : 
                      subjectScores[subject] >= 40 ? 'text-amber-600' : 
                      'text-red-600'
                    }`}>
                      {subjectScores[subject]}%
                    </span>
                  </div>
                  <CustomProgress 
                    value={subjectScores[subject]} 
                    className="h-2 mt-2" 
                    indicatorClassName={`
                      ${subjectScores[subject] >= 70 ? 'bg-green-500' : 
                        subjectScores[subject] >= 40 ? 'bg-amber-500' : 
                        'bg-red-500'
                      }
                    `}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center">
          <Brain className="mr-2 text-pink-500" size={20} />
          NEET Concept Mastery Test
        </h3>
        <Badge variant="outline" className="bg-pink-50 dark:bg-pink-900/30 border-pink-200 dark:border-pink-700">3 of 3</Badge>
      </div>
      
      <p className="text-sm">
        This assessment tests your knowledge across Physics, Chemistry, and Biology to identify your strengths and areas for improvement.
      </p>
      
      {!loading && !testCompleted && !isTestActive ? (
        renderSubjectSelection()
      ) : loading ? (
        <div className="space-y-4">
          <div className="h-40 bg-pink-50 dark:bg-pink-900/20 rounded-lg flex items-center justify-center border-2 border-pink-100 dark:border-pink-800">
            <div className="text-center">
              <Brain className="mx-auto mb-2 animate-pulse text-pink-500" size={40} />
              <p className="text-sm font-medium">Evaluating your concept mastery...</p>
            </div>
          </div>
          <CustomProgress value={30} className="h-2" indicatorClassName="bg-gradient-to-r from-pink-400 to-pink-600" />
          <p className="text-xs text-center text-muted-foreground">Please wait while we analyze your knowledge in key NEET topics</p>
        </div>
      ) : isTestActive ? (
        renderQuestion()
      ) : testCompleted ? (
        <div className="space-y-4">
          <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg border-2 border-pink-100 dark:border-pink-800">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Your Concept Mastery Score:</h4>
              <span className="text-lg font-bold">{results.score}%</span>
            </div>
            <CustomProgress value={results.score} className="h-2 my-2" indicatorClassName="bg-gradient-to-r from-pink-400 to-pink-600" />
            <p className="text-sm">{results.analysis}</p>
            
            <div className="grid grid-cols-3 gap-2 mt-4">
              {allSubjects.map(subject => (
                <div key={subject} className="bg-white/60 dark:bg-gray-800/60 p-2 rounded text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{subject}</p>
                  <p className="font-medium">{subjectScores[subject] || 0}%</p>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <h5 className="text-sm font-medium mb-2">Strengths:</h5>
              <ul className="text-xs space-y-1 list-disc list-inside">
                {results.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
              
              <h5 className="text-sm font-medium mt-3 mb-2">Areas for Improvement:</h5>
              <ul className="text-xs space-y-1 list-disc list-inside">
                {results.improvements.map((improvement, index) => (
                  <li key={index}>{improvement}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <Button 
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={onContinue}
          >
            <span>View My Full Analysis</span>
            <ChevronRight size={16} />
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default ConceptTestSection;
