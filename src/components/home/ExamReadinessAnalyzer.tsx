
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronRight } from 'lucide-react';
import { TestType, TestCompletionState, ExamResults, ExamType, UserAnswer } from './exam-analyzer/types';
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
      }
    }, 300);
  };
  
  const handleStressTestComplete = (answers: UserAnswer[]) => {
    // Calculate score based on correct answers
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const score = Math.round((correctAnswers / answers.length) * 100);
    
    // Generate analysis based on score
    let level = '';
    let analysis = '';
    const strengths = [];
    const improvements = [];
    
    if (score >= 80) {
      level = 'Excellent';
      analysis = 'You handle pressure extremely well. Your ability to focus and solve problems quickly is excellent.';
      strengths.push('Outstanding focus under pressure', 'Excellent pattern recognition');
      improvements.push('Maintain this level through regular practice');
    } else if (score >= 60) {
      level = 'Good';
      analysis = 'You handle stress reasonably well, but there\'s room for improvement in maintaining focus under pressure.';
      strengths.push('Good focus under time constraints', 'Effective problem-solving');
      improvements.push('Work on reaction speed', 'Practice memory recall techniques');
    } else {
      level = 'Needs Improvement';
      analysis = 'You may find it challenging to maintain focus under pressure. Regular practice can help improve this skill.';
      strengths.push('Basic pattern recognition abilities');
      improvements.push('Practice timed exercises regularly', 'Work on stress management techniques');
    }
    
    // Update results
    setResults(prev => ({
      ...prev,
      stress: {
        score,
        level,
        analysis,
        strengths,
        improvements,
      }
    }));
    
    setTestCompleted(prev => ({ ...prev, stress: true }));
    
    // Move to next test
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
    // Calculate score based on the selected options
    // For readiness test, we evaluate based on the study habits indicated in answers
    let score = 0;
    answers.forEach((answer) => {
      // For simplicity, we assign scores based on the position of the answer in the options array
      // This would be more sophisticated in a real implementation
      if (answer.answer.includes('More than')) score += 10;
      else if (answer.answer.includes('detailed') || answer.answer.includes('comprehensive')) score += 10;
      else if (answer.answer.includes('Daily') || answer.answer.includes('Frequently')) score += 10;
      else if (answer.answer.includes('75%') || answer.answer.includes('Very')) score += 10;
      else if (answer.answer.includes('3-4') || answer.answer.includes('6-15')) score += 7;
      else if (answer.answer.includes('Confident')) score += 7;
      else score += 5;
    });
    
    score = Math.min(Math.round(score / answers.length * 10), 100);
    
    // Generate analysis based on score
    let level = '';
    let analysis = '';
    const strengths = [];
    const improvements = [];
    
    if (score >= 80) {
      level = 'Excellent';
      analysis = 'Your study habits and preparation level are excellent. You have a structured approach to learning.';
      strengths.push('Strong preparation routine', 'Consistent study habits');
      improvements.push('Focus on targeted revision of weak areas');
    } else if (score >= 60) {
      level = 'Good';
      analysis = 'Your preparation level is good, but some areas need attention to optimize your study effectiveness.';
      strengths.push('Good content coverage', 'Regular study habits');
      improvements.push('Increase practice test frequency', 'Develop a more structured study plan');
    } else {
      level = 'Needs Improvement';
      analysis = 'Your preparation requires a more structured approach. Focus on developing consistent study habits.';
      strengths.push('Awareness of preparation needs');
      improvements.push('Create a detailed study schedule', 'Increase daily study hours');
    }
    
    // Update results
    setResults(prev => ({
      ...prev,
      readiness: {
        score,
        level,
        analysis,
        strengths,
        improvements,
      }
    }));
    
    setTestCompleted(prev => ({ ...prev, readiness: true }));
    
    // Move to next test
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
    // Calculate score based on correct answers
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const score = Math.round((correctAnswers / answers.length) * 100);
    
    // Generate analysis based on score
    let level = '';
    let analysis = '';
    const strengths = [];
    const improvements = [];
    
    if (score >= 80) {
      level = 'Excellent';
      analysis = 'You have excellent mastery of the key concepts. Your understanding is clear and comprehensive.';
      strengths.push('Strong conceptual understanding', 'Excellent application of concepts');
      improvements.push('Challenge yourself with advanced problems');
    } else if (score >= 60) {
      level = 'Good';
      analysis = 'You have good concept mastery with some areas needing reinforcement.';
      strengths.push('Good theoretical understanding', 'Solid application of concepts');
      improvements.push('Focus on specific weak areas', 'Practice more application questions');
    } else {
      level = 'Needs Improvement';
      analysis = 'Your concept mastery needs improvement. Focus on strengthening your understanding of fundamental principles.';
      strengths.push('Basic conceptual awareness');
      improvements.push('Revisit fundamental concepts', 'Increase practice with guided examples');
    }
    
    // Update results
    setResults(prev => ({
      ...prev,
      concept: {
        score,
        level,
        analysis,
        strengths,
        improvements,
      }
    }));
    
    setTestCompleted(prev => ({ ...prev, concept: true }));
    
    // Calculate overall results
    const overallScore = Math.floor((results.stress.score + results.readiness.score + score) / 3);
    
    setResults(prev => ({
      ...prev,
      overall: {
        score: overallScore,
        level: overallScore >= 80 ? 'Excellent' : overallScore >= 70 ? 'Good' : overallScore >= 60 ? 'Average' : 'Needs Improvement',
        analysis: `Your overall preparation is ${overallScore >= 80 ? 'excellent' : overallScore >= 70 ? 'good' : overallScore >= 60 ? 'average' : 'below average'} for ${examTypes.find(e => e.value === selectedExam)?.label} preparation.`,
        strengths: [
          ...new Set([...prev.stress.strengths, ...prev.readiness.strengths, ...strengths].slice(0, 3))
        ],
        improvements: [
          ...new Set([...prev.stress.improvements, ...prev.readiness.improvements, ...improvements].slice(0, 3))
        ],
      }
    }));
    
    // Show report
    setCurrentTest('report');
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
        
        {(currentTest === 'stress' || currentTest === 'readiness' || currentTest === 'concept') && testCompleted[currentTest] && (
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={handleNavigation}
              className="flex items-center gap-2 border-2 border-gray-200 dark:border-gray-700"
            >
              <span>Previous</span>
            </Button>
            <Button 
              onClick={currentTest === 'concept' ? () => setCurrentTest('report') : null}
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
