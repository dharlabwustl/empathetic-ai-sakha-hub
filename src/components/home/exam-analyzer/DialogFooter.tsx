
import React from 'react';
import { Button } from "@/components/ui/button";
import { TestCompletionState, TestType } from './types';

interface DialogFooterButtonsProps {
  currentTest: TestType;
  testCompleted: TestCompletionState;
  selectedExam: string;
  onClose: () => void;
  handleStartTest: () => void;
  handleNavigation: (test: TestType) => void;
  isMobile?: boolean;
}

const DialogFooterButtons: React.FC<DialogFooterButtonsProps> = ({ 
  currentTest, 
  testCompleted, 
  selectedExam,
  onClose,
  handleStartTest,
  handleNavigation,
  isMobile = false
}) => {
  // Function to render appropriate buttons based on test stage
  const renderButtons = () => {
    // For intro screen
    if (currentTest === 'intro') {
      return (
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} size={isMobile ? "sm" : "default"}>
            Cancel
          </Button>
          <Button 
            disabled={!selectedExam} 
            onClick={handleStartTest}
            className={`bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 ${isMobile ? 'text-sm' : ''}`}
            size={isMobile ? "sm" : "default"}
          >
            Start Analysis
          </Button>
        </div>
      );
    }
    
    // For report screen
    if (currentTest === 'report') {
      return (
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} size={isMobile ? "sm" : "default"}>
            Close
          </Button>
          <Button 
            onClick={() => handleNavigation('intro')}
            className={`bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 ${isMobile ? 'text-sm' : ''}`}
            size={isMobile ? "sm" : "default"}
          >
            Start New Analysis
          </Button>
        </div>
      );
    }
    
    // For readiness test 
    if (currentTest === 'readiness' && testCompleted.readiness) {
      return (
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} size={isMobile ? "sm" : "default"}>
            Close
          </Button>
          <Button 
            onClick={() => handleNavigation('concept')}
            className={`bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 ${isMobile ? 'text-sm' : ''}`}
            size={isMobile ? "sm" : "default"}
          >
            Continue to Concept Test
          </Button>
        </div>
      );
    }
    
    // For concept test
    if (currentTest === 'concept' && testCompleted.concept) {
      return (
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} size={isMobile ? "sm" : "default"}>
            Close
          </Button>
          <Button 
            onClick={() => handleNavigation('report')}
            className={`bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 ${isMobile ? 'text-sm' : ''}`}
            size={isMobile ? "sm" : "default"}
          >
            View Final Report
          </Button>
        </div>
      );
    }
    
    // Default: just Close button
    return (
      <div className="flex justify-end">
        <Button variant="outline" onClick={onClose} size={isMobile ? "sm" : "default"}>
          Close
        </Button>
      </div>
    );
  };
  
  return (
    <div className={`${isMobile ? 'mt-3 pt-2' : 'mt-4 pt-3'} border-t border-gray-200 dark:border-gray-700`}>
      {renderButtons()}
    </div>
  );
};

export default DialogFooterButtons;
