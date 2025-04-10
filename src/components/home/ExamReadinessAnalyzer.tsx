
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { X, ChevronRight, ArrowRight, XCircle, Check, Clock, Target, Brain, AlertTriangle, ChevronLeft } from 'lucide-react';

export function ExamReadinessAnalyzer({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const [currentTest, setCurrentTest] = useState<'intro' | 'stress' | 'readiness' | 'concept' | 'report'>('intro');
  const [selectedExam, setSelectedExam] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [testCompleted, setTestCompleted] = useState({
    stress: false,
    readiness: false,
    concept: false
  });
  const [results, setResults] = useState({
    stress: {
      score: 0,
      level: '',
      analysis: '',
      strengths: [] as string[],
      improvements: [] as string[],
    },
    readiness: {
      score: 0,
      level: '',
      analysis: '',
      strengths: [] as string[],
      improvements: [] as string[],
    },
    concept: {
      score: 0,
      level: '',
      analysis: '',
      strengths: [] as string[],
      improvements: [] as string[],
    },
    overall: {
      score: 0,
      level: '',
      analysis: '',
      strengths: [] as string[],
      improvements: [] as string[],
    }
  });

  const examTypes = [
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

  const renderTestContent = () => {
    switch (currentTest) {
      case 'intro':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Select Your Target Exam</h3>
              <Select value={selectedExam} onValueChange={setSelectedExam}>
                <SelectTrigger className="bg-white dark:bg-gray-800 border-2 border-violet-100 dark:border-violet-900">
                  <SelectValue placeholder="Choose exam type" />
                </SelectTrigger>
                <SelectContent>
                  {examTypes.map(exam => (
                    <SelectItem key={exam.value} value={exam.value}>
                      {exam.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Test Components</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                  <Clock className="mt-0.5 text-blue-500 flex-shrink-0" size={18} />
                  <div>
                    <span className="font-medium">Stress Level Test</span>
                    <p className="text-sm text-muted-foreground">Measures your cognitive performance under pressure</p>
                  </div>
                </li>
                <li className="flex items-start gap-2 p-3 rounded-lg bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800">
                  <Target className="mt-0.5 text-violet-500 flex-shrink-0" size={18} />
                  <div>
                    <span className="font-medium">Readiness Score Test</span>
                    <p className="text-sm text-muted-foreground">Evaluates your current preparation level</p>
                  </div>
                </li>
                <li className="flex items-start gap-2 p-3 rounded-lg bg-pink-50 dark:bg-pink-900/20 border border-pink-100 dark:border-pink-800">
                  <Brain className="mt-0.5 text-pink-500 flex-shrink-0" size={18} />
                  <div>
                    <span className="font-medium">Concept Mastery & Confidence Mapping</span>
                    <p className="text-sm text-muted-foreground">Identifies gaps in knowledge and confidence</p>
                  </div>
                </li>
              </ul>
            </div>

            <p className="text-sm text-muted-foreground bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
              This test takes approximately 5-7 minutes to complete and provides personalized insights to boost your exam performance.
            </p>
          </div>
        );

      case 'stress':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium flex items-center">
                <Clock className="mr-2 text-blue-500" size={20} />
                Stress Level Test
              </h3>
              <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700">1 of 3</Badge>
            </div>
            
            <p className="text-sm">
              This test measures your ability to perform under pressure through pattern recognition, reaction speed, and memory recall exercises.
            </p>
            
            {!loading && !testCompleted.stress ? (
              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-2 border-blue-100 dark:border-blue-800">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Clock className="mr-2 text-blue-500" size={16} />
                    Instructions:
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>You'll face 8 pattern recognition challenges</li>
                    <li>Each question has a 15-second time limit</li>
                    <li>Try to maintain focus despite distractions</li>
                    <li>Answer as quickly and accurately as possible</li>
                  </ul>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  onClick={simulateStressTest}
                >
                  Begin Stress Test
                </Button>
              </div>
            ) : loading ? (
              <div className="space-y-4">
                <div className="h-40 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center border-2 border-blue-100 dark:border-blue-800">
                  <div className="text-center">
                    <Clock className="mx-auto mb-2 animate-pulse text-blue-500" size={40} />
                    <p className="text-sm font-medium">Test in progress...</p>
                  </div>
                </div>
                <Progress value={progress - 10} className="h-2" indicatorClassName="bg-gradient-to-r from-blue-400 to-blue-600" />
                <p className="text-xs text-center text-muted-foreground">Please wait while we analyze your responses</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-2 border-blue-100 dark:border-blue-800">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Your Stress Level Score:</h4>
                    <span className="text-lg font-bold">{results.stress.score}%</span>
                  </div>
                  <Progress value={results.stress.score} className="h-2 my-2" indicatorClassName="bg-gradient-to-r from-blue-400 to-blue-600" />
                  <p className="text-sm">{results.stress.analysis}</p>
                </div>
              </div>
            )}
          </div>
        );

      case 'readiness':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium flex items-center">
                <Target className="mr-2 text-violet-500" size={20} />
                Readiness Score Test
              </h3>
              <Badge variant="outline" className="bg-violet-50 dark:bg-violet-900/30 border-violet-200 dark:border-violet-700">2 of 3</Badge>
            </div>
            
            <p className="text-sm">
              This test evaluates your current preparation level by analyzing content coverage, practice effectiveness, and study commitment.
            </p>
            
            {!loading && !testCompleted.readiness ? (
              <div className="space-y-6">
                <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg border-2 border-violet-100 dark:border-violet-800">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Target className="mr-2 text-violet-500" size={16} />
                    Instructions:
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>You'll answer 10 questions about your study habits</li>
                    <li>Be honest about your preparation level</li>
                    <li>Questions cover syllabus knowledge, practice, and time management</li>
                    <li>Results will help create your personalized study plan</li>
                  </ul>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  onClick={simulateReadinessTest}
                >
                  Begin Readiness Test
                </Button>
              </div>
            ) : loading ? (
              <div className="space-y-4">
                <div className="h-40 bg-violet-50 dark:bg-violet-900/20 rounded-lg flex items-center justify-center border-2 border-violet-100 dark:border-violet-800">
                  <div className="text-center">
                    <Target className="mx-auto mb-2 animate-pulse text-violet-500" size={40} />
                    <p className="text-sm font-medium">Test in progress...</p>
                  </div>
                </div>
                <Progress value={progress - 30} className="h-2" indicatorClassName="bg-gradient-to-r from-violet-400 to-violet-600" />
                <p className="text-xs text-center text-muted-foreground">Please wait while we analyze your responses</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg border-2 border-violet-100 dark:border-violet-800">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Your Readiness Score:</h4>
                    <span className="text-lg font-bold">{results.readiness.score}%</span>
                  </div>
                  <Progress value={results.readiness.score} className="h-2 my-2" indicatorClassName="bg-gradient-to-r from-violet-400 to-violet-600" />
                  <p className="text-sm">{results.readiness.analysis}</p>
                </div>
                
                <Button 
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  onClick={() => setCurrentTest('concept')}
                >
                  <span>Continue to Next Test</span>
                  <ChevronRight size={16} />
                </Button>
              </div>
            )}
          </div>
        );

      case 'concept':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium flex items-center">
                <Brain className="mr-2 text-pink-500" size={20} />
                Concept Mastery Test
              </h3>
              <Badge variant="outline" className="bg-pink-50 dark:bg-pink-900/30 border-pink-200 dark:border-pink-700">3 of 3</Badge>
            </div>
            
            <p className="text-sm">
              This test identifies gaps between your perceived knowledge and actual performance on key topics.
            </p>
            
            {!loading && !testCompleted.concept ? (
              <div className="space-y-6">
                <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg border-2 border-pink-100 dark:border-pink-800">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Brain className="mr-2 text-pink-500" size={16} />
                    Instructions:
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Rate your confidence on key topics from the exam syllabus</li>
                    <li>Answer 5 multiple-choice questions on each topic</li>
                    <li>The test adapts to your responses</li>
                    <li>We'll map your confidence against actual performance</li>
                  </ul>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  onClick={simulateConceptTest}
                >
                  Begin Concept Test
                </Button>
              </div>
            ) : loading ? (
              <div className="space-y-4">
                <div className="h-40 bg-pink-50 dark:bg-pink-900/20 rounded-lg flex items-center justify-center border-2 border-pink-100 dark:border-pink-800">
                  <div className="text-center">
                    <Brain className="mx-auto mb-2 animate-pulse text-pink-500" size={40} />
                    <p className="text-sm font-medium">Test in progress...</p>
                  </div>
                </div>
                <Progress value={progress - 60} className="h-2" indicatorClassName="bg-gradient-to-r from-pink-400 to-pink-600" />
                <p className="text-xs text-center text-muted-foreground">Please wait while we analyze your responses</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg border-2 border-pink-100 dark:border-pink-800">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Your Concept Mastery Score:</h4>
                    <span className="text-lg font-bold">{results.concept.score}%</span>
                  </div>
                  <Progress value={results.concept.score} className="h-2 my-2" indicatorClassName="bg-gradient-to-r from-pink-400 to-pink-600" />
                  <p className="text-sm">{results.concept.analysis}</p>
                </div>
              </div>
            )}
          </div>
        );

      case 'report':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Your Comprehensive Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Based on your performance across all three tests for {examTypes.find(e => e.value === selectedExam)?.label} preparation
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/30 dark:to-violet-900/30 p-4 rounded-lg border-2 border-blue-100 dark:border-violet-800">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Overall Readiness Score:</h4>
                <span className="text-lg font-bold">{results.overall.score}%</span>
              </div>
              <Progress value={results.overall.score} className="h-3 my-3 bg-white/50 dark:bg-gray-700/50" indicatorClassName="bg-gradient-to-r from-sky-400 to-violet-600" />
              <p className="text-sm font-medium">{results.overall.analysis}</p>
            </div>
            
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="stress">Stress</TabsTrigger>
                <TabsTrigger value="readiness">Readiness</TabsTrigger>
                <TabsTrigger value="concept">Concept</TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border-2 border-green-100 dark:border-green-800">
                    <h5 className="font-medium flex items-center text-sm mb-2">
                      <Check size={16} className="mr-1 text-green-500" />
                      Key Strengths
                    </h5>
                    <ul className="space-y-1">
                      {results.overall.strengths.map((strength, i) => (
                        <li key={i} className="text-sm flex items-start gap-1">
                          <span className="text-green-500 text-xs mt-0.5">●</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border-2 border-amber-100 dark:border-amber-800">
                    <h5 className="font-medium flex items-center text-sm mb-2">
                      <AlertTriangle size={16} className="mr-1 text-amber-500" />
                      Areas to Improve
                    </h5>
                    <ul className="space-y-1">
                      {results.overall.improvements.map((improvement, i) => (
                        <li key={i} className="text-sm flex items-start gap-1">
                          <span className="text-amber-500 text-xs mt-0.5">●</span>
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-sky-500 to-violet-500 text-white p-4 rounded-lg shadow-lg">
                  <h5 className="font-medium mb-2">Get Your Detailed Improvement Plan</h5>
                  <p className="text-sm text-white/90 mb-4">Sign up to receive a personalized study schedule and resources tailored to your needs.</p>
                  <Button 
                    className="bg-white text-violet-700 hover:bg-white/90 hover:text-violet-800 w-full shadow-md hover:shadow-lg"
                    onClick={() => navigate('/signup')}
                  >
                    Create Free Account <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="stress" className="pt-4">
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-2 border-blue-100 dark:border-blue-800">
                    <h5 className="font-medium mb-2 flex items-center">
                      <Clock size={18} className="mr-2 text-blue-500" />
                      Stress Level Performance
                    </h5>
                    <div className="flex justify-between items-center mt-3">
                      <span>Your Score:</span>
                      <span className="font-bold">{results.stress.score}%</span>
                    </div>
                    <Progress value={results.stress.score} className="h-2 my-2" indicatorClassName="bg-gradient-to-r from-blue-400 to-blue-600" />
                    <p className="text-sm mt-2">{results.stress.analysis}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800">
                      <h5 className="font-medium flex items-center text-sm mb-2">
                        <Check size={16} className="mr-1 text-green-500" />
                        Strengths
                      </h5>
                      <ul className="space-y-1">
                        {results.stress.strengths.map((strength, i) => (
                          <li key={i} className="text-sm flex items-start gap-1">
                            <span className="text-green-500 text-xs mt-0.5">●</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-100 dark:border-amber-800">
                      <h5 className="font-medium flex items-center text-sm mb-2">
                        <AlertTriangle size={16} className="mr-1 text-amber-500" />
                        To Improve
                      </h5>
                      <ul className="space-y-1">
                        {results.stress.improvements.map((improvement, i) => (
                          <li key={i} className="text-sm flex items-start gap-1">
                            <span className="text-amber-500 text-xs mt-0.5">●</span>
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="readiness" className="pt-4">
                <div className="space-y-4">
                  <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg border-2 border-violet-100 dark:border-violet-800">
                    <h5 className="font-medium mb-2 flex items-center">
                      <Target size={18} className="mr-2 text-violet-500" />
                      Exam Readiness
                    </h5>
                    <div className="flex justify-between items-center mt-3">
                      <span>Your Score:</span>
                      <span className="font-bold">{results.readiness.score}%</span>
                    </div>
                    <Progress value={results.readiness.score} className="h-2 my-2" indicatorClassName="bg-gradient-to-r from-violet-400 to-violet-600" />
                    <p className="text-sm mt-2">{results.readiness.analysis}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800">
                      <h5 className="font-medium flex items-center text-sm mb-2">
                        <Check size={16} className="mr-1 text-green-500" />
                        Strengths
                      </h5>
                      <ul className="space-y-1">
                        {results.readiness.strengths.map((strength, i) => (
                          <li key={i} className="text-sm flex items-start gap-1">
                            <span className="text-green-500 text-xs mt-0.5">●</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-100 dark:border-amber-800">
                      <h5 className="font-medium flex items-center text-sm mb-2">
                        <AlertTriangle size={16} className="mr-1 text-amber-500" />
                        To Improve
                      </h5>
                      <ul className="space-y-1">
                        {results.readiness.improvements.map((improvement, i) => (
                          <li key={i} className="text-sm flex items-start gap-1">
                            <span className="text-amber-500 text-xs mt-0.5">●</span>
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="concept" className="pt-4">
                <div className="space-y-4">
                  <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg border-2 border-pink-100 dark:border-pink-800">
                    <h5 className="font-medium mb-2 flex items-center">
                      <Brain size={18} className="mr-2 text-pink-500" />
                      Concept Mastery
                    </h5>
                    <div className="flex justify-between items-center mt-3">
                      <span>Your Score:</span>
                      <span className="font-bold">{results.concept.score}%</span>
                    </div>
                    <Progress value={results.concept.score} className="h-2 my-2" indicatorClassName="bg-gradient-to-r from-pink-400 to-pink-600" />
                    <p className="text-sm mt-2">{results.concept.analysis}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800">
                      <h5 className="font-medium flex items-center text-sm mb-2">
                        <Check size={16} className="mr-1 text-green-500" />
                        Strengths
                      </h5>
                      <ul className="space-y-1">
                        {results.concept.strengths.map((strength, i) => (
                          <li key={i} className="text-sm flex items-start gap-1">
                            <span className="text-green-500 text-xs mt-0.5">●</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-100 dark:border-amber-800">
                      <h5 className="font-medium flex items-center text-sm mb-2">
                        <AlertTriangle size={16} className="mr-1 text-amber-500" />
                        To Improve
                      </h5>
                      <ul className="space-y-1">
                        {results.concept.improvements.map((improvement, i) => (
                          <li key={i} className="text-sm flex items-start gap-1">
                            <span className="text-amber-500 text-xs mt-0.5">●</span>
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => {
                  setCurrentTest('intro');
                  setSelectedExam('');
                  setTestCompleted({
                    stress: false,
                    readiness: false,
                    concept: false
                  });
                  setProgress(0);
                }}
                className="flex items-center gap-2 border-2 border-gray-200 dark:border-gray-700"
              >
                <ChevronLeft size={16} />
                <span>Start Over</span>
              </Button>
              
              <Button 
                onClick={() => navigate('/signup')}
                className="bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Sign Up for Full Plan
              </Button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
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

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-xl bg-white dark:bg-gray-900 shadow-xl border-2 border-violet-100 dark:border-violet-800">
        <div className="absolute right-4 top-4">
          <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <XCircle className="h-4 w-4" />
          </Button>
        </div>
        <DialogHeader>
          <DialogTitle className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-violet-500">{getDialogTitle()}</DialogTitle>
          <DialogDescription>
            {currentTest !== 'report' && 'Complete these tests to assess your preparation level.'}
          </DialogDescription>
        </DialogHeader>

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
              <ChevronLeft size={16} />
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

