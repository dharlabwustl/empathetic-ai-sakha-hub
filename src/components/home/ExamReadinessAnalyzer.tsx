
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

export function ExamReadinessAnalyzer({ onClose }: { onClose: () => void }) {
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
      <DialogContent className="sm:max-w-md md:max-w-2xl lg:max-w-3xl bg-white dark:bg-gray-900 shadow-xl border-2 border-violet-100 dark:border-violet-800 p-6">
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
