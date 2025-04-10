
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
    simulateStressTest,
    handleStressTestComplete,
    simulateReadinessTest,
    handleReadinessTestComplete,
    simulateConceptTest,
    handleConceptTestComplete,
    handleNavigation,
    handleStartOver
  } = useTestState();

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-md md:max-w-2xl lg:max-w-4xl bg-white dark:bg-gray-900 shadow-xl border-2 border-violet-100 dark:border-violet-800 ${isMobile ? 'p-3 w-[95vw] max-h-[90vh] overflow-y-auto' : 'p-6'} mx-auto`}>
        <ExamDialogHeader 
          title={getDialogTitle(currentTest)} 
          description={getDialogDescription(currentTest)}
          onClose={onClose} 
        />
        
        <TestContainer 
          currentTest={currentTest}
          selectedExam={selectedExam}
          setSelectedExam={setSelectedExam}
          loading={loading}
          progress={progress}
          testCompleted={testCompleted}
          results={results}
          examTypes={examTypes}
          simulateStressTest={simulateStressTest}
          simulateReadinessTest={simulateReadinessTest}
          simulateConceptTest={simulateConceptTest}
          handleStartTest={handleStartTest}
          handleStartOver={handleStartOver}
          handleStressTestComplete={handleStressTestComplete}
          handleReadinessTestComplete={handleReadinessTestComplete}
          handleConceptTestComplete={handleConceptTestComplete}
          handleNavigation={handleNavigation}
        />
        
        <DialogFooterButtons 
          currentTest={currentTest}
          testCompleted={testCompleted}
          selectedExam={selectedExam}
          onClose={onClose}
          handleStartTest={handleStartTest}
          handleNavigation={handleNavigation}
        />
      </DialogContent>
    </Dialog>
  );
}
