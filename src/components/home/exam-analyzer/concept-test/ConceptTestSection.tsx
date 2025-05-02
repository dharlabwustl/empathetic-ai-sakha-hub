
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { TestResults } from '../types';
import ConceptLoader from './ConceptLoader';
import ConceptTestResults from './ConceptTestResults';
import ConceptTestQuestions from './ConceptTestQuestions';
import { Card } from "@/components/ui/card";
import { FileText, Timer, Brain, Atom, Flask, Book } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ConceptTestSectionProps {
  loading: boolean;
  testCompleted: boolean;
  selectedExam: string;
  results: TestResults | null;
  simulateTest: () => void;
  onCompleteTest: (answers: any[]) => void;
  onContinue: () => void;
  examDetails?: {
    scoringPattern: string;
    timePerQuestion: string;
    totalTime: string;
    totalQuestions: string;
  };
}

const ConceptTestSection: React.FC<ConceptTestSectionProps> = ({
  loading,
  testCompleted,
  selectedExam,
  results,
  simulateTest,
  onCompleteTest,
  onContinue,
  examDetails
}) => {
  const [isTestActive, setIsTestActive] = useState(false);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  const [currentSubject, setCurrentSubject] = useState<string | undefined>(undefined);
  const [completedSubjects, setCompletedSubjects] = useState<string[]>([]);
  
  const isNEET = selectedExam === "NEET-UG";
  
  const neetSubjects = ["Physics", "Chemistry", "Biology"];
  
  const handleStartTest = () => {
    setIsTestActive(true);
    simulateTest();
    if (isNEET) {
      setCurrentSubject("Physics"); // Start with Physics for NEET
    }
  };
  
  const handleCompleteSubjectTest = (answers: any[]) => {
    // Store answers for this subject
    setUserAnswers(prev => [...prev, ...answers]);
    
    if (isNEET) {
      // Track completed subjects
      setCompletedSubjects(prev => [...prev, currentSubject!]);
      
      // Determine next subject
      if (currentSubject === "Physics") {
        setCurrentSubject("Chemistry");
        simulateTest(); // Simulate loading for next subject
      } else if (currentSubject === "Chemistry") {
        setCurrentSubject("Biology");
        simulateTest(); // Simulate loading for next subject
      } else {
        // All subjects completed
        setIsTestActive(false);
        onCompleteTest(userAnswers);
      }
    } else {
      // For non-NEET exams, complete the test
      setIsTestActive(false);
      onCompleteTest(answers);
    }
  };
  
  const getSubjectProgress = () => {
    if (!isNEET || !currentSubject) return 0;
    
    const index = neetSubjects.indexOf(currentSubject);
    return ((index + 1) / neetSubjects.length) * 100;
  };
  
  if (loading) {
    return <ConceptLoader subject={currentSubject} />;
  }
  
  if (testCompleted && results) {
    return (
      <ConceptTestResults 
        results={results}
        onContinue={onContinue}
      />
    );
  }
  
  if (isTestActive) {
    return (
      <div className="space-y-4">
        {isNEET && (
          <div className="flex items-center justify-between">
            <h3 className="font-medium">NEET Concept Test</h3>
            <div className="flex items-center space-x-2">
              {neetSubjects.map((subject, index) => (
                <Badge 
                  key={subject}
                  variant={currentSubject === subject ? "default" : completedSubjects.includes(subject) ? "outline" : "secondary"}
                  className={currentSubject === subject ? "bg-pink-500" : completedSubjects.includes(subject) ? "bg-green-50 text-green-700 border-green-300" : ""}
                >
                  {subject}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <ConceptTestQuestions
          selectedExam={selectedExam}
          onCompleteTest={handleCompleteSubjectTest}
          examDetails={examDetails}
          currentSubject={currentSubject}
        />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2">Test Your Concept Understanding</h3>
        <p className="text-muted-foreground">
          Let's assess your understanding of key concepts required for {selectedExam}
        </p>
      </div>
      
      {isNEET && examDetails && (
        <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="space-y-2">
            <h4 className="font-medium text-blue-700 dark:text-blue-300">NEET-UG Concept Test</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                <span>Scoring: {examDetails.scoringPattern}</span>
              </div>
              <div className="flex items-center">
                <Timer className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                <span>Time: {examDetails.timePerQuestion}</span>
              </div>
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              This test will assess your understanding of key concepts across subjects covered in NEET-UG
            </p>
          </div>
        </Card>
      )}
      
      <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-lg p-6">
        <h4 className="text-lg font-medium mb-4">What to expect in the concept test:</h4>
        
        <ul className="space-y-3 list-disc pl-5">
          <li>
            <span className="font-medium">Subject Coverage:</span>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isNEET 
                ? "Questions from Physics, Chemistry, and Biology covering key NEET concepts" 
                : `Core topics relevant to ${selectedExam}`}
            </p>
          </li>
          <li>
            <span className="font-medium">Question Format:</span>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              A mix of multiple-choice and conceptual understanding questions
            </p>
          </li>
          <li>
            <span className="font-medium">Difficulty Level:</span>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Progressive difficulty to assess different levels of understanding
            </p>
          </li>
          {isNEET && (
            <li>
              <span className="font-medium">NEET Specifics:</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Follows +4/-1 scoring pattern with 1.06 minutes per question timing
              </p>
            </li>
          )}
        </ul>
        
        {isNEET && (
          <div className="mt-5 pt-5 border-t border-violet-200 dark:border-violet-700">
            <h5 className="font-medium mb-3">NEET Subject Coverage:</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white dark:bg-gray-800 rounded-md p-3 flex items-center">
                <Atom className="h-5 w-5 text-blue-500 mr-2" />
                <div>
                  <p className="font-medium">Physics</p>
                  <p className="text-xs text-gray-500">10 questions</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-md p-3 flex items-center">
                <Flask className="h-5 w-5 text-green-500 mr-2" />
                <div>
                  <p className="font-medium">Chemistry</p>
                  <p className="text-xs text-gray-500">10 questions</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-md p-3 flex items-center">
                <Book className="h-5 w-5 text-red-500 mr-2" />
                <div>
                  <p className="font-medium">Biology</p>
                  <p className="text-xs text-gray-500">10 questions</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button onClick={handleStartTest}>
          Start Concept Test
        </Button>
      </div>
    </div>
  );
};

export default ConceptTestSection;
