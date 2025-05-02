
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { TestResults } from '../types';
import ConceptLoader from './ConceptLoader';
import ConceptTestResults from './ConceptTestResults';
import ConceptTestQuestions from './ConceptTestQuestions';
import { Card } from "@/components/ui/card";
import { FileText, Timer } from 'lucide-react';

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
  
  const isNEET = selectedExam === "NEET-UG";
  
  const handleStartTest = () => {
    setIsTestActive(true);
    simulateTest();
  };
  
  const handleCompleteTest = (answers: any[]) => {
    setUserAnswers(answers);
    setIsTestActive(false);
    onCompleteTest(answers);
  };
  
  if (loading) {
    return <ConceptLoader />;
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
      <ConceptTestQuestions
        selectedExam={selectedExam}
        onCompleteTest={handleCompleteTest}
        examDetails={examDetails}
      />
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
