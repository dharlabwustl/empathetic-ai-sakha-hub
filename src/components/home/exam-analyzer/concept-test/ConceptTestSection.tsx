
import React, { useState, useEffect } from 'react';
import { TestResults, TestQuestion, SubjectTopic, UserAnswer } from '../types';
import { getConceptTopics, getConceptTestQuestions } from '../test-questions/conceptTestQuestions';
import ConceptTestIntro from './components/ConceptTestIntro';
import ConceptTestQuestion from './components/ConceptTestQuestion';
import ConfidenceQuestion from './components/ConfidenceQuestion';
import ConceptTestResults from './components/ConceptTestResults';
import ConceptTestLoading from './components/ConceptTestLoading';

interface ConceptTestSectionProps {
  loading: boolean;
  testCompleted: boolean;
  selectedExam: string;
  results: TestResults;
  simulateTest: () => void;
  onCompleteTest: (answers: UserAnswer[]) => void;
}

const ConceptTestSection: React.FC<ConceptTestSectionProps> = ({
  loading,
  testCompleted,
  selectedExam,
  results,
  simulateTest,
  onCompleteTest
}) => {
  const [isTestActive, setIsTestActive] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [topics, setTopics] = useState<SubjectTopic[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [confidenceRating, setConfidenceRating] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
  
  // Initialize topics based on exam type
  useEffect(() => {
    if (selectedExam) {
      const examTopics = getConceptTopics(selectedExam);
      setTopics(examTopics);
      setSelectedSubjects([]);
    }
  }, [selectedExam]);
  
  const toggleSubjectSelection = (subject: string) => {
    setSelectedSubjects(prev => {
      // If already selected, remove it
      if (prev.includes(subject)) {
        return prev.filter(s => s !== subject);
      }
      
      // If trying to add more than 2 subjects, don't allow
      if (prev.length >= 2) {
        return prev;
      }
      
      // Add the subject
      return [...prev, subject];
    });
  };
  
  const startTest = () => {
    if (selectedSubjects.length === 0) return;
    
    let allQuestions: TestQuestion[] = [];
    
    // Get 5 questions from each selected subject
    selectedSubjects.forEach(subject => {
      const subjectQuestions = getConceptTestQuestions(selectedExam, subject);
      allQuestions = [...allQuestions, ...subjectQuestions.slice(0, 5)];
    });
    
    setQuestions(allQuestions);
    setCurrentSubjectIndex(0);
    setIsTestActive(true);
    setCurrentQuestionIndex(-1); // Start with confidence question
    setUserAnswers([]);
  };
  
  const handleConfidenceRating = (rating: number) => {
    setConfidenceRating(rating);
  };
  
  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      answer,
      timeToAnswer: 0,
      isCorrect,
      confidenceLevel: confidenceRating || 3
    };
    
    setUserAnswers(prev => [...prev, newAnswer]);
    setShowExplanation(true);
    
    // Automatically proceed to next question after explanation
    setTimeout(() => {
      setShowExplanation(false);
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      } else {
        setIsTestActive(false);
        onCompleteTest(userAnswers);
      }
    }, 2500);
  };
  
  const getCurrentSubjectFromQuestionId = (questionId: string): string => {
    // Find which subject this question belongs to based on the ID prefix
    for (const subject of selectedSubjects) {
      if (questionId.toLowerCase().includes(subject.toLowerCase().substring(0, 3))) {
        return subject;
      }
    }
    return selectedSubjects[0]; // Fallback
  };
  
  const getEstimatedTestTime = (): number => {
    // Each question takes about 1 minute (60 seconds)
    const questionsPerSubject = 5;
    return selectedSubjects.length * questionsPerSubject * 60;
  };
  
  if (loading) {
    return <ConceptTestLoading />;
  }

  if (testCompleted) {
    return <ConceptTestResults results={results} />;
  }

  if (isTestActive) {
    if (currentQuestionIndex === -1) {
      return (
        <ConfidenceQuestion
          currentSubject={selectedSubjects[currentSubjectIndex]}
          confidenceRating={confidenceRating}
          onConfidenceRating={handleConfidenceRating}
          onContinue={() => setCurrentQuestionIndex(0)}
        />
      );
    }

    return (
      <ConceptTestQuestion
        currentQuestionIndex={currentQuestionIndex}
        questions={questions}
        selectedSubjects={selectedSubjects}
        getCurrentSubject={getCurrentSubjectFromQuestionId}
        showExplanation={showExplanation}
        userAnswers={userAnswers}
        onAnswer={handleAnswer}
      />
    );
  }

  return (
    <ConceptTestIntro 
      topics={topics}
      selectedSubjects={selectedSubjects}
      toggleSubjectSelection={toggleSubjectSelection}
      getEstimatedTestTime={getEstimatedTestTime}
      startTest={startTest}
    />
  );
};

export default ConceptTestSection;
