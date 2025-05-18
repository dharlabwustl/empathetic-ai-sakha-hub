
import { Dialog, DialogContent } from "@/components/ui/dialog";
import TestContainer from "./exam-analyzer/TestContainer";
import ExamDialogHeader from './exam-analyzer/DialogHeader';
import DialogFooterButtons from './exam-analyzer/DialogFooter';
import { 
  examTypes, 
  getDialogTitle, 
  getDialogDescription 
} from './exam-analyzer/testDataService';
import { useTestState } from './exam-analyzer/hooks/useTestState';
import { useIsMobile } from "@/hooks/use-mobile";

export function ExamReadinessAnalyzer({ onClose }: { onClose: () => void }) {
  const isMobile = useIsMobile();
  
  const {
    currentTest,
    selectedExam,
    setSelectedExam,
    progress,
    loading,
    testCompleted,
    results,
    handleStartTest,
    simulateReadinessTest,
    handleReadinessTestComplete,
    simulateConceptTest,
    handleConceptTestComplete,
    handleNavigation,
    handleStartOver
  } = useTestState();

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className={`bg-white dark:bg-gray-900 shadow-xl border-2 border-violet-100 dark:border-violet-800 mx-auto max-h-[90vh] overflow-hidden flex flex-col
        ${isMobile ? 'p-3 w-[95vw] sm:max-w-[95vw] rounded-lg' : 'p-6 sm:max-w-md md:max-w-2xl lg:max-w-4xl rounded-xl'}`}>
        <ExamDialogHeader 
          title={getDialogTitle(currentTest)} 
          description={getDialogDescription(currentTest)}
          onClose={onClose} 
          isMobile={isMobile}
        />
        
        <div className={`flex-1 overflow-auto ${isMobile ? 'px-1' : ''}`}>
          <TestContainer 
            currentTest={currentTest}
            selectedExam={selectedExam}
            setSelectedExam={setSelectedExam}
            loading={loading}
            progress={progress}
            testCompleted={testCompleted}
            results={results}
            examTypes={examTypes}
            simulateReadinessTest={simulateReadinessTest}
            simulateConceptTest={simulateConceptTest}
            handleStartTest={handleStartTest}
            handleStartOver={handleStartOver}
            handleReadinessTestComplete={handleReadinessTestComplete}
            handleConceptTestComplete={handleConceptTestComplete}
            handleNavigation={handleNavigation}
          />
        </div>
        
        <DialogFooterButtons 
          currentTest={currentTest}
          testCompleted={testCompleted}
          selectedExam={selectedExam}
          onClose={onClose}
          handleStartTest={handleStartTest}
          handleNavigation={handleNavigation}
          isMobile={isMobile}
        />
      </DialogContent>
    </Dialog>
  );
}
