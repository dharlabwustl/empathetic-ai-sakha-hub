
import { Dialog, DialogContent } from "@/components/ui/dialog";
import TestContainer from "./TestContainer";
import ExamDialogHeader from './DialogHeader';
import DialogFooterButtons from './DialogFooter';
import { 
  examTypes, 
  getDialogTitle, 
  getDialogDescription 
} from './testDataService';
import { useTestState } from './hooks/useTestState';
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
    simulateStressTest,
    handleStressTestComplete,
    handleReadinessTestComplete,
    simulateConceptTest,
    handleConceptTestComplete,
    handleNavigation,
    handleStartOver
  } = useTestState();

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-md md:max-w-2xl lg:max-w-4xl bg-white dark:bg-gray-900 shadow-xl border-2 border-violet-100 dark:border-violet-800 ${isMobile ? 'p-3 w-[95vw]' : 'p-6'} mx-auto max-h-[90vh] overflow-hidden flex flex-col`}>
        <ExamDialogHeader 
          title={getDialogTitle(currentTest)} 
          description={getDialogDescription(currentTest)}
          onClose={onClose} 
        />
        
        <div className="flex-1 overflow-auto">
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
            simulateStressTest={simulateStressTest}
            simulateConceptTest={simulateConceptTest}
            handleStartTest={handleStartTest}
            handleStartOver={handleStartOver}
            handleReadinessTestComplete={handleReadinessTestComplete}
            handleStressTestComplete={handleStressTestComplete}
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
        />
      </DialogContent>
    </Dialog>
  );
}
