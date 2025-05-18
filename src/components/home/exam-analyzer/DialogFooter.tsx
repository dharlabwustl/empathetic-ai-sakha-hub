
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { TestType, TestCompletionState } from './types';
import { useIsMobile } from "@/hooks/use-mobile";

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
    <DialogFooter className={`sm:justify-between border-t dark:border-gray-700 ${isMobile ? 'pt-2 pb-1' : 'pt-3'}`}>
      <Button
        variant="outline"
        size={isMobile ? "sm" : "default"}
        onClick={onClose}
        className={isMobile ? "text-xs" : ""}
      >
        {currentTest === 'report' ? 'Close' : 'Cancel'}
      </Button>
      
      <div>
        {shouldShowNextButton() && (
          <Button 
            size={isMobile ? "sm" : "default"}
            className={isMobile ? "text-xs" : ""}
            disabled={currentTest === 'intro' && !selectedExam}
            onClick={() => {
              if (currentTest === 'intro') {
                handleStartTest();
              } else {
                handleNavigation(getNextTest());
              }
            }}
          >
            {currentTest === 'intro' ? 'Start Analysis' : 'Continue'}
          </Button>
        )}
      </div>
    </DialogFooter>
  );
};

export default DialogFooterButtons;
