
import React from 'react';
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { TestType, TestCompletionState } from './types';

interface DialogFooterButtonsProps {
  currentTest: TestType;
  testCompleted: TestCompletionState;
  selectedExam: string;
  onClose: () => void;
  handleStartTest: () => void;
  handleNavigation: (direction: 'prev' | 'next') => void;
}

const DialogFooterButtons: React.FC<DialogFooterButtonsProps> = ({
  currentTest,
  testCompleted,
  selectedExam,
  onClose,
  handleStartTest,
  handleNavigation
}) => {
  if (currentTest === 'intro') {
    return (
      <DialogFooter className="space-x-2 pt-4">
        <Button 
          variant="outline" 
          onClick={onClose}
          className="flex items-center gap-2 border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <X size={16} />
          <span>Cancel</span>
        </Button>
        <Button 
          onClick={handleStartTest} 
          disabled={!selectedExam}
          className="bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 transition-all duration-300 shadow-md hover:shadow-lg px-6 py-2 text-white"
        >
          <span>Start Assessment</span>
          <ChevronRight size={16} className="ml-2" />
        </Button>
      </DialogFooter>
    );
  }
  
  if ((currentTest === 'stress' || currentTest === 'readiness' || currentTest === 'concept') && testCompleted[currentTest]) {
    return (
      <DialogFooter className="space-x-2 pt-4">
        <Button 
          variant="outline" 
          onClick={() => handleNavigation('prev')}
          className="flex items-center gap-2 border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-100"
        >
          <ChevronLeft size={16} />
          <span>Previous</span>
        </Button>
        <Button 
          onClick={() => handleNavigation('next')}
          className="bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 transition-all duration-300 shadow-md hover:shadow-lg px-6"
        >
          <span>Continue</span>
          <ChevronRight size={16} className="ml-2" />
        </Button>
      </DialogFooter>
    );
  }

  if (currentTest === 'report') {
    return (
      <DialogFooter className="space-x-2 pt-4">
        <Button 
          variant="outline" 
          onClick={() => handleNavigation('prev')}
          className="flex items-center gap-2 border-2 border-gray-200 dark:border-gray-700"
        >
          <ChevronLeft size={16} />
          <span>Back to Tests</span>
        </Button>
        <Button 
          onClick={onClose}
          className="bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 transition-all duration-300 shadow-md hover:shadow-lg px-6"
        >
          <span>Finish</span>
          <X size={16} className="ml-2" />
        </Button>
      </DialogFooter>
    );
  }
  
  return null;
};

export default DialogFooterButtons;
