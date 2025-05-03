
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, X } from 'lucide-react';
import { TestType, TestCompletionState } from './types';

interface DialogFooterButtonsProps {
  currentTest: TestType;
  testCompleted: TestCompletionState;
  selectedExam: string;
  onClose: () => void;
  handleStartTest: () => void;
  handleNavigation: (test: TestType) => void;
}

const DialogFooterButtons: React.FC<DialogFooterButtonsProps> = ({
  currentTest,
  testCompleted,
  selectedExam,
  onClose,
  handleStartTest,
  handleNavigation
}) => {
  // Render different buttons based on current test
  const renderActionButton = () => {
    if (currentTest === 'intro') {
      return (
        <Button 
          onClick={handleStartTest}
          disabled={!selectedExam}
          className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
        >
          Start Test
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      );
    }
    
    if (currentTest === 'readiness' && testCompleted.readiness) {
      return (
        <Button 
          onClick={() => handleNavigation('stress')}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
        >
          Continue to Cognitive Stress Test
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      );
    }
    
    if (currentTest === 'stress' && testCompleted.stress) {
      return (
        <Button 
          onClick={() => handleNavigation('concept')}
          className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
        >
          Continue to Concept Mastery Test
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      );
    }
    
    if (currentTest === 'concept' && testCompleted.concept) {
      return (
        <Button 
          onClick={() => handleNavigation('report')}
          className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
        >
          View Final Report
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      );
    }
    
    return null;
  };
  
  return (
    <div className="flex justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onClose}
        className="text-gray-500 border-gray-300 dark:text-gray-400 dark:border-gray-600"
      >
        <X className="h-4 w-4 mr-1" />
        Close
      </Button>
      
      {renderActionButton()}
    </div>
  );
};

export default DialogFooterButtons;
