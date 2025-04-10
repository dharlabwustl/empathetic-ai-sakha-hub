
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronRight } from 'lucide-react';
import { TestType, TestCompletionState, ExamResults, ExamType } from './exam-analyzer/types';
import IntroSection from './exam-analyzer/IntroSection';
import StressTestSection from './exam-analyzer/StressTestSection';
import ReadinessTestSection from './exam-analyzer/ReadinessTestSection';
import ConceptTestSection from './exam-analyzer/ConceptTestSection';
import ReportSection from './exam-analyzer/ReportSection';
import ExamDialogHeader from './exam-analyzer/DialogHeader';

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

  const examTypes: ExamType[] = [
    { value: 'iit', label: 'IIT-JEE' },
    { value: 'neet', label: 'NEET' },
    { value: 'upsc', label: 'UPSC' },
    { value: 'bank', label: 'Bank PO' },
    { value: 'cat', label: 'MBA/CAT' },
    { value: 'cuet', label: 'CUET' },
    { value: 'clat', label: 'CLAT' },
  ];

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
        setTestCompleted(prev => ({ ...prev, stress: true }));
        
        // Generate mock results
        setResults(prev => ({
          ...prev,
          stress: {
            score: Math.floor(Math.random() * 40) + 60,
            level: 'Moderate',
            analysis: 'You handle stress reasonably well, but there\'s room for improvement.',
            strengths: ['Good focus under time constraints', 'Effective problem-solving'],
            improvements: ['Work on reaction speed', 'Practice memory recall techniques'],
          }
        }));
        
        // Move to next test
        setCurrentTest('readiness');
      }
    }, 300);
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
        setTestCompleted(prev => ({ ...prev, readiness: true }));
        
        // Generate mock results
        setResults(prev => ({
          ...prev,
          readiness: {
            score: Math.floor(Math.random() * 30) + 65,
            level: 'Above Average',
            analysis: 'Your preparation level is good, but some areas need attention.',
            strengths: ['Strong content coverage', 'Consistent study habits'],
            improvements: ['Increase practice test frequency', 'Focus more on weak topics'],
          }
        }));
        
        // Move to next test
        setCurrentTest('concept');
      }
    }, 300);
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
        setTestCompleted(prev => ({ ...prev, concept: true }));
        
        // Generate mock results
        setResults(prev => ({
          ...prev,
          concept: {
            score: Math.floor(Math.random() * 25) + 70,
            level: 'Strong',
            analysis: 'You have good concept mastery, with some confidence gaps.',
            strengths: ['Strong theoretical understanding', 'Good application of concepts'],
            improvements: ['Bridge the gap between knowledge and confidence', 'Practice more application questions'],
          }
        }));
        
        // Calculate overall results
        const overallScore = Math.floor((results.stress.score + results.readiness.score + results.concept.score) / 3);
        
        setResults(prev => ({
          ...prev,
          overall: {
            score: overallScore,
            level: overallScore >= 80 ? 'Excellent' : overallScore >= 70 ? 'Good' : overallScore >= 60 ? 'Average' : 'Needs Improvement',
            analysis: `Your overall preparation is ${overallScore >= 80 ? 'excellent' : overallScore >= 70 ? 'good' : overallScore >= 60 ? 'average' : 'below average'} for ${examTypes.find(e => e.value === selectedExam)?.label} preparation.`,
            strengths: [
              ...new Set([...prev.stress.strengths, ...prev.readiness.strengths, ...prev.concept.strengths].slice(0, 3))
            ],
            improvements: [
              ...new Set([...prev.stress.improvements, ...prev.readiness.improvements, ...prev.concept.improvements].slice(0, 3))
            ],
          }
        }));
        
        // Show report
        setCurrentTest('report');
      }
    }, 300);
  };

  const handleNavigation = () => {
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

  const getDialogTitle = () => {
    switch (currentTest) {
      case 'intro':
        return 'Exam Readiness Analyzer';
      case 'stress':
        return 'Stress Level Test';
      case 'readiness':
        return 'Exam Readiness Test';
      case 'concept':
        return 'Concept Mastery Test';
      case 'report':
        return 'Your Comprehensive Analysis';
      default:
        return 'Exam Readiness Analyzer';
    }
  };

  const getDialogDescription = () => {
    if (currentTest !== 'report') {
      return 'Complete these tests to assess your preparation level.';
    }
    return undefined;
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
            results={results.stress}
            simulateTest={simulateStressTest}
          />
        );

      case 'readiness':
        return (
          <ReadinessTestSection
            loading={loading}
            testCompleted={testCompleted.readiness}
            results={results.readiness}
            simulateTest={simulateReadinessTest}
            onContinue={() => setCurrentTest('concept')}
          />
        );

      case 'concept':
        return (
          <ConceptTestSection
            loading={loading}
            testCompleted={testCompleted.concept}
            results={results.concept}
            simulateTest={simulateConceptTest}
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

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-xl bg-white dark:bg-gray-900 shadow-xl border-2 border-violet-100 dark:border-violet-800">
        <ExamDialogHeader 
          title={getDialogTitle()} 
          description={getDialogDescription()}
          onClose={onClose} 
        />

        {currentTest !== 'intro' && currentTest !== 'report' && (
          <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full mt-2">
            <div 
              className="h-full bg-gradient-to-r from-sky-500 to-violet-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        
        <div className="py-4">
          {renderTestContent()}
        </div>
        
        {currentTest === 'intro' && (
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex items-center gap-2 border-2 border-gray-200 dark:border-gray-700"
            >
              <X size={16} />
              <span>Cancel</span>
            </Button>
            <Button 
              onClick={handleStartTest} 
              disabled={!selectedExam}
              className="bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span>Start Assessment</span>
              <ChevronRight size={16} className="ml-2" />
            </Button>
          </DialogFooter>
        )}
        
        {(currentTest === 'stress' || currentTest === 'readiness' || currentTest === 'concept') && !loading && testCompleted[currentTest] && (
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={handleNavigation}
              className="flex items-center gap-2 border-2 border-gray-200 dark:border-gray-700"
            >
              <span>Previous</span>
            </Button>
            <Button 
              onClick={currentTest === 'stress' ? simulateReadinessTest : 
                      currentTest === 'readiness' ? simulateConceptTest :
                      () => setCurrentTest('report')}
              className="bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span>Continue</span>
              <ChevronRight size={16} className="ml-2" />
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
