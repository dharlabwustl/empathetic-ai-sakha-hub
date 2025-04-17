
import React, { useState, useEffect } from 'react';
import { TestResults, UserAnswer, TestQuestion } from '../types';
import { Button } from '@/components/ui/button';
import { getConceptTestQuestionsByExam, getAvailableSubjects } from '../test-questions/conceptTestQuestions';
import ConceptTestIntro from './components/ConceptTestIntro';
import ConceptTestLoading from './components/ConceptTestLoading';
import ConceptTestQuestion from './components/ConceptTestQuestion';
import ConceptTestResults from './components/ConceptTestResults';
import { Badge } from '@/components/ui/badge';
import { CustomProgress } from '@/components/ui/custom-progress';
import { motion } from 'framer-motion';
import { Brain, Check, AlertTriangle } from 'lucide-react';

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedSet, setSelectedSet] = useState<number>(1);
  const [showExplanation, setShowExplanation] = useState(false);
  const [processingNextQuestion, setProcessingNextQuestion] = useState(false);
  const [confidenceLevel, setConfidenceLevel] = useState<number>(3);
  const [testFinished, setTestFinished] = useState(false);
  
  // Get available subjects for the selected exam
  const availableSubjects = getAvailableSubjects(selectedExam);
  
  const toggleSubjectSelection = (subject: string) => {
    setSelectedSubjects(prev => {
      if (prev.includes(subject)) {
        return prev.filter(s => s !== subject);
      } else if (prev.length < 2) {
        return [...prev, subject];
      }
      return prev;
    });
  };
  
  const startTest = () => {
    if (selectedSubjects.length === 0) {
      return;
    }
    
    let allQuestions: TestQuestion[] = [];
    
    // Get questions for each selected subject with the chosen set
    selectedSubjects.forEach(subject => {
      const subjectQuestions = getConceptTestQuestionsByExam(selectedExam, subject, selectedSet);
      allQuestions = [...allQuestions, ...subjectQuestions];
    });
    
    setQuestions(allQuestions);
    setIsTestActive(true);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setTestFinished(false);
  };
  
  const handleAnswer = (answer: string, confidence: number = confidenceLevel) => {
    if (processingNextQuestion || !questions[currentQuestionIndex]) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      answer,
      timeToAnswer: 30, // Default value
      isCorrect,
      confidenceLevel: confidence
    };
    
    setUserAnswers(prev => [...prev, newAnswer]);
    setShowExplanation(true);
    setProcessingNextQuestion(true);
    
    setTimeout(() => {
      setShowExplanation(false);
      setProcessingNextQuestion(false);
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setIsTestActive(false);
        setTestFinished(true);
        onCompleteTest([...userAnswers, newAnswer]);
      }
    }, 2000);
  };

  // Reset if exam changes
  useEffect(() => {
    setSelectedSubjects([]);
  }, [selectedExam]);

  // Estimated test time calculation
  const getEstimatedTestTime = () => {
    return selectedSubjects.length * 5 * 60; // 5 questions × 60 seconds per subject
  };
  
  // Format time function
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg">
        <h3 className="font-medium text-lg mb-2">Concept Mapping Test</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          This test evaluates your understanding of key concepts and how they connect to each other.
        </p>
      </div>
      
      {!loading && !testCompleted && !isTestActive && !testFinished ? (
        <div className="space-y-6">
          {availableSubjects.length > 0 ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Select Subjects (max 2):</h3>
                <div className="flex flex-wrap gap-2">
                  {availableSubjects.map(subject => (
                    <Badge
                      key={subject}
                      onClick={() => toggleSubjectSelection(subject)}
                      className={`cursor-pointer px-3 py-1 ${
                        selectedSubjects.includes(subject) 
                          ? 'bg-purple-600 hover:bg-purple-700' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'
                      } ${selectedSubjects.length >= 2 && !selectedSubjects.includes(subject) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Select Test Set:</h3>
                <div className="flex gap-2">
                  {[1, 2, 3].map(setNum => (
                    <button
                      key={setNum}
                      className={`px-3 py-1 text-sm rounded-md ${
                        selectedSet === setNum 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                      onClick={() => setSelectedSet(setNum)}
                    >
                      {setNum === 1 ? 'Basic' : setNum === 2 ? 'Intermediate' : 'Advanced'} 
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Test Summary:</h4>
                <ul className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
                  <li>• Selected subjects: {selectedSubjects.length > 0 ? selectedSubjects.join(", ") : "None"}</li>
                  <li>• Questions per subject: 5</li>
                  <li>• Total questions: {selectedSubjects.length * 5}</li>
                  <li>• Estimated time: {formatTime(getEstimatedTestTime())}</li>
                  <li>• Set difficulty: {selectedSet === 1 ? 'Basic' : selectedSet === 2 ? 'Intermediate' : 'Advanced'}</li>
                </ul>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
                onClick={startTest}
                disabled={selectedSubjects.length === 0}
              >
                Begin Concept Test
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No subject data available for {selectedExam}.</p>
              <Button className="mt-4" onClick={onContinue}>
                Continue
              </Button>
            </div>
          )}
        </div>
      ) : loading ? (
        <ConceptTestLoading />
      ) : isTestActive && currentQuestion ? (
        <div>
          <div className="mb-2 flex justify-between items-center">
            <Badge variant="outline" className="text-xs">
              Question {currentQuestionIndex + 1}/{questions.length}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {currentQuestion.id.includes('-set1') ? 'Basic' : 
               currentQuestion.id.includes('-set2') ? 'Intermediate' : 'Advanced'}
            </Badge>
          </div>
          
          <ConceptTestQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            disabled={showExplanation || processingNextQuestion}
          />
          
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg mt-4 ${
                userAnswers[userAnswers.length - 1]?.isCorrect 
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                  : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
              }`}
            >
              <div className="flex items-start">
                {userAnswers[userAnswers.length - 1]?.isCorrect ? (
                  <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={18} />
                ) : (
                  <AlertTriangle className="text-red-500 mr-2 mt-1 flex-shrink-0" size={18} />
                )}
                <div>
                  <p className="font-medium">
                    {userAnswers[userAnswers.length - 1]?.isCorrect ? 'Correct!' : 'Incorrect'}
                  </p>
                  <p className="text-sm mt-1">{currentQuestion.explanation}</p>
                </div>
              </div>
            </motion.div>
          )}
          
          <CustomProgress 
            value={(currentQuestionIndex + 1) / questions.length * 100} 
            className="h-2 mt-4" 
            indicatorClassName="bg-gradient-to-r from-pink-400 to-pink-600" 
          />
        </div>
      ) : testFinished || testCompleted ? (
        <div>
          <ConceptTestResults 
            results={results} 
            userAnswers={userAnswers}
            subjects={selectedSubjects}
          />
          <div className="flex justify-end mt-4">
            <Button onClick={onContinue}>
              Continue to Report
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ConceptTestSection;
