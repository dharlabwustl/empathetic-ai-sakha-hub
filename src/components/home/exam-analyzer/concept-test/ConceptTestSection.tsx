
import React, { useState } from 'react';
import { TestResults, UserAnswer } from '../types';
import { Button } from '@/components/ui/button';
import { getConceptTestQuestionsByExam, getAvailableSubjects } from '../test-questions/conceptTestQuestions';
import ConceptTestIntro from './components/ConceptTestIntro';
import ConceptTestLoading from './components/ConceptTestLoading';
import ConceptTestQuestion from './components/ConceptTestQuestion';
import ConceptTestResults from './components/ConceptTestResults';
import { Badge } from '@/components/ui/badge';

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
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedSet, setSelectedSet] = useState<number>(1);
  
  // Get available subjects for the selected exam
  const availableSubjects = getAvailableSubjects(selectedExam);
  
  const startTest = () => {
    if (!selectedSubject) {
      return;
    }
    const testQuestions = getConceptTestQuestionsByExam(selectedExam, selectedSubject, selectedSet);
    setQuestions(testQuestions);
    setIsTestActive(true);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
  };
  
  const handleAnswer = (answer: string, confidenceLevel: number = 3) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      answer,
      timeToAnswer: 0,
      isCorrect,
      confidenceLevel
    };
    
    setUserAnswers(prev => [...prev, newAnswer]);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setIsTestActive(false);
      onCompleteTest(userAnswers.concat(newAnswer));
    }
  };

  // Dummy function for estimated time - could be replaced with real logic
  const getEstimatedTestTime = () => 300; // 5 minutes default
  
  // Dummy array for topics
  const dummyTopics = [];

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg">
        <h3 className="font-medium text-lg mb-2">Concept Mapping Test</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          This test evaluates your understanding of key concepts and how they connect to each other.
        </p>
      </div>
      
      {!loading && !testCompleted && !isTestActive ? (
        <div className="space-y-6">
          {availableSubjects.length > 0 ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Select Subject:</h3>
                <div className="flex flex-wrap gap-2">
                  {availableSubjects.map(subject => (
                    <Badge
                      key={subject}
                      onClick={() => setSelectedSubject(subject)}
                      className={`cursor-pointer px-3 py-1 ${
                        selectedSubject === subject 
                          ? 'bg-purple-600 hover:bg-purple-700' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'
                      }`}
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
                      Set {setNum}
                    </button>
                  ))}
                </div>
              </div>
              
              <ConceptTestIntro 
                selectedExam={selectedExam} 
                selectedSubject={selectedSubject}
                onStart={startTest} 
                disabled={!selectedSubject}
                topics={dummyTopics}
                selectedSubjects={[selectedSubject].filter(Boolean)}
                toggleSubjectSelection={() => {}}
                getEstimatedTestTime={getEstimatedTestTime}
                startTest={startTest}
              />
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
      ) : isTestActive ? (
        <div>
          <div className="mb-2 flex justify-between items-center text-xs text-gray-600">
            <Badge variant="outline">
              {selectedSubject} - Set {selectedSet}
            </Badge>
            <span>Question {currentQuestionIndex + 1}/{questions.length}</span>
          </div>
          <ConceptTestQuestion
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <ConceptTestResults 
            results={results} 
            subject={selectedSubject}
            userAnswers={userAnswers} 
          />
          <div className="flex justify-end">
            <Button onClick={onContinue}>
              Continue to Report
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConceptTestSection;
