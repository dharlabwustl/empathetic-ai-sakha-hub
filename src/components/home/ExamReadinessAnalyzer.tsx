import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TestType, TestCompletionState, ExamResults, UserAnswer } from './exam-analyzer/types';
import IntroSection from './exam-analyzer/IntroSection';
import StressTestSection from './exam-analyzer/StressTestSection';
import ReadinessTestSection from './exam-analyzer/ReadinessTestSection';
import ConceptTestSection from './exam-analyzer/ConceptTestSection';
import ReportSection from './exam-analyzer/ReportSection';
import ExamDialogHeader from './exam-analyzer/DialogHeader';
import { motion } from "framer-motion";
import DialogFooterButtons from './exam-analyzer/DialogFooter';
import ProgressIndicator from './exam-analyzer/ProgressIndicator';
import { 
  examTypes, 
  calculateStressTestResults, 
  calculateReadinessTestResults, 
  calculateConceptTestResults, 
  calculateOverallResults,
  getDialogTitle, 
  getDialogDescription 
} from './exam-analyzer/testDataService';

export function ExamReadinessAnalyzer({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const [currentTest, setCurrentTest] = useState<TestType>('intro');
  const [selectedExam, setSelectedExam] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [testCompleted, setTestCompleted] = useState<TestCompletionState>({
    stress: false,
    readiness: false,
    concept: false
  });
  
  const [results, setResults] = useState<ExamResults>({
    stress: {
      score: 0,
      level: '',
      analysis: '',
      strengths: [],
      improvements: [],
    },
    readiness: {
      score: 0,
      level: '',
      analysis: '',
      strengths: [],
      improvements: [],
    },
    concept: {
      score: 0,
      level: '',
      analysis: '',
      strengths: [],
      improvements: [],
    },
    overall: {
      score: 0,
      level: '',
      analysis: '',
      strengths: [],
      improvements: [],
    }
  });

  const handleStartTest = () => {
    if (!selectedExam) return;
    setCurrentTest('stress');
    setProgress(10);
  };

  const simulateStressTest = () => {
    setLoading(true);
    let progressCounter = 10;
    const interval = setInterval(() => {
      progressCounter += 5;
      setProgress(progressCounter);
      if (progressCounter >= 30) {
        clearInterval(interval);
        setLoading(false);
      }
    }, 300);
  };
  
  const handleStressTestComplete = (answers: UserAnswer[]) => {
    const stressResults = calculateStressTestResults(answers);
    
    setResults(prev => ({
      ...prev,
      stress: stressResults
    }));
    
    setTestCompleted(prev => ({ ...prev, stress: true }));
    setCurrentTest('readiness');
    setProgress(30);
  };

  const simulateReadinessTest = () => {
    setLoading(true);
    let progressCounter = 30;
    const interval = setInterval(() => {
      progressCounter += 5;
      setProgress(progressCounter);
      if (progressCounter >= 60) {
        clearInterval(interval);
        setLoading(false);
      }
    }, 300);
  };
  
  const handleReadinessTestComplete = (answers: UserAnswer[]) => {
    const readinessResults = calculateReadinessTestResults(answers);
    
    setResults(prev => ({
      ...prev,
      readiness: readinessResults
    }));
    
    setTestCompleted(prev => ({ ...prev, readiness: true }));
    setCurrentTest('concept');
    setProgress(60);
  };

  const simulateConceptTest = () => {
    setLoading(true);
    let progressCounter = 60;
    const interval = setInterval(() => {
      progressCounter += 5;
      setProgress(progressCounter);
      if (progressCounter >= 100) {
        clearInterval(interval);
        setLoading(false);
      }
    }, 300);
  };
  
  const handleConceptTestComplete = (answers: UserAnswer[]) => {
    const conceptResults = calculateConceptTestResults(answers);
    
    setResults(prev => ({
      ...prev,
      concept: conceptResults
    }));
    
    setTestCompleted(prev => ({ ...prev, concept: true }));
    
    const overallResults = calculateOverallResults(
      results.stress, 
      results.readiness, 
      conceptResults, 
      selectedExam
    );
    
    setResults(prev => ({
      ...prev,
      overall: overallResults
    }));
    
    setCurrentTest('report');
    setProgress(100);
  };

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentTest === 'stress') {
        setCurrentTest('intro');
        setProgress(0);
      } else if (currentTest === 'readiness') {
        setCurrentTest('stress');
        setProgress(10);
      } else if (currentTest === 'concept') {
        setCurrentTest('readiness');
        setProgress(30);
      } else if (currentTest === 'report') {
        setCurrentTest('concept');
        setProgress(60);
      }
    } else {
      if (currentTest === 'stress' && testCompleted.stress) {
        setCurrentTest('readiness');
        setProgress(30);
      } else if (currentTest === 'readiness' && testCompleted.readiness) {
        setCurrentTest('concept');
        setProgress(60);
      } else if (currentTest === 'concept' && testCompleted.concept) {
        setCurrentTest('report');
        setProgress(100);
      }
    }
  };

  const handleStartOver = () => {
    setCurrentTest('intro');
    setSelectedExam('');
    setTestCompleted({
      stress: false,
      readiness: false,
      concept: false
    });
    setProgress(0);
  };

  const renderTestContent = () => {
    switch (currentTest) {
      case 'intro':
        return (
          <IntroSection
            selectedExam={selectedExam}
            setSelectedExam={setSelectedExam}
            examTypes={examTypes}
          />
        );

      case 'stress':
        return (
          <StressTestSection
            loading={loading}
            testCompleted={testCompleted.stress}
            selectedExam={selectedExam}
            results={results.stress}
            simulateTest={simulateStressTest}
            onCompleteTest={handleStressTestComplete}
          />
        );

      case 'readiness':
        return (
          <ReadinessTestSection
            loading={loading}
            testCompleted={testCompleted.readiness}
            selectedExam={selectedExam}
            results={results.readiness}
            simulateTest={simulateReadinessTest}
            onCompleteTest={handleReadinessTestComplete}
            onContinue={() => setCurrentTest('concept')}
          />
        );

      case 'concept':
        return (
          <ConceptTestSection
            loading={loading}
            testCompleted={testCompleted.concept}
            selectedExam={selectedExam}
            results={results.concept}
            simulateTest={simulateConceptTest}
            onCompleteTest={handleConceptTestComplete}
          />
        );

      case 'report':
        return (
          <ReportSection
            results={results}
            selectedExam={selectedExam}
            examTypes={examTypes}
            onStartOver={handleStartOver}
          />
        );
        
      default:
        return null;
    }
  };

  const fadeVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-2xl lg:max-w-3xl bg-white dark:bg-gray-900 shadow-xl border-2 border-violet-100 dark:border-violet-800 p-6">
        <ExamDialogHeader 
          title={getDialogTitle(currentTest)} 
          description={getDialogDescription(currentTest)}
          onClose={onClose} 
        />

        <ProgressIndicator progress={progress} currentTest={currentTest} />
        
        <motion.div 
          className="py-6"
          key={currentTest}
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
        >
          {renderTestContent()}
        </motion.div>
        
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
