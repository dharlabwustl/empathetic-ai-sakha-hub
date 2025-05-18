
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { TestType, TestCompletionState } from './types';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  // Helper to check if we should show the next button
  const shouldShowNextButton = () => {
    if (currentTest === 'intro') return true;
    if (currentTest === 'readiness' && testCompleted.readiness) return true;
    return false;
  };
  
  // Helper to get the next test
  const getNextTest = (): TestType => {
    if (currentTest === 'intro') return 'readiness';
    if (currentTest === 'readiness') return 'concept';
    return 'report';
  };
  
  return (
    <DialogFooter className={`${isMobile ? 'flex-col space-y-2' : 'sm:justify-between'} border-t dark:border-gray-700 pt-2`}>
      <Button
        variant="outline"
        size="sm"
        onClick={onClose}
        className={isMobile ? "w-full" : ""}
      >
        {currentTest === 'report' ? 'Close' : 'Cancel'}
      </Button>
      
      {shouldShowNextButton() && (
        <Button 
          size="sm" 
          disabled={currentTest === 'intro' && !selectedExam}
          onClick={() => {
            if (currentTest === 'intro') {
              handleStartTest();
            } else {
              handleNavigation(getNextTest());
            }
          }}
          className={isMobile ? "w-full" : ""}
        >
          {currentTest === 'intro' ? 'Start Analysis' : 'Continue'}
        </Button>
      )}
    </DialogFooter>
  );
};

export default DialogFooterButtons;
