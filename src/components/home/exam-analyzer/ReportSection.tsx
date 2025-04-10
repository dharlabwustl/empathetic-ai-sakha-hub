
import React from 'react';
import { ExamResults, ConfidenceMapping, TestType } from './types';
import { CustomProgress } from '@/components/ui/custom-progress';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Download, 
  RefreshCw, 
  UserPlus, 
  Share2,
  ArrowRight,
  BookOpen,
  ArrowDown,
  Brain,
  Clock,
  LightbulbIcon,
  PieChart,
  BarChart3,
  Target,
  Medal,
  Sparkles,
  Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import StressTestResults from './stress-test/StressTestResults';
import ConceptTestResults from './concept-test/components/ConceptTestResults';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ReportSectionProps {
  results: ExamResults;
  selectedExam: string;
  onStartOver: () => void;
}

const ReportSection: React.FC<ReportSectionProps> = ({ 
  results, 
  selectedExam,
  onStartOver
}) => {
  // Map exam IDs to their full names and descriptions
  const examDetails: Record<string, { name: string, description: string, icon: React.ReactNode }> = {
    'iit-jee': { 
      name: 'IIT-JEE', 
      description: 'Joint Entrance Examination for Indian Institutes of Technology',
      icon: <PieChart className="h-6 w-6 text-blue-500" />
    },
    'neet': { 
      name: 'NEET', 
      description: 'National Eligibility cum Entrance Test for Medical Courses',
      icon: <LightbulbIcon className="h-6 w-6 text-green-500" />
    },
    'upsc': { 
      name: 'UPSC', 
      description: 'Union Public Service Commission Examination',
      icon: <FileText className="h-6 w-6 text-amber-500" />
    },
    'cat': { 
      name: 'CAT', 
      description: 'Common Admission Test for Management Studies',
      icon: <BarChart3 className="h-6 w-6 text-purple-500" />
    },
    'bank-po': { 
      name: 'Bank PO', 
      description: 'Banking Probationary Officer Examination',
      icon: <Target className="h-6 w-6 text-cyan-500" />
    }
  };
  
  const currentExam = examDetails[selectedExam] || { 
    name: 'Entrance Exam', 
    description: 'Standardized Entrance Examination Analysis',
    icon: <BookOpen className="h-6 w-6 text-violet-500" /> 
  };
  
  // Get all strengths and improvements for recommendation cards
  const allStrengths = [
    ...results.stress.strengths,
    ...results.readiness.strengths,
    ...results.concept.strengths
  ];
  
  const allImprovements = [
    ...results.stress.improvements,
    ...results.readiness.improvements,
    ...results.concept.improvements
  ];
  
  // Get unique items for display
  const uniqueStrengths = [...new Set(allStrengths)];
  const uniqueImprovements = [...new Set(allImprovements)];
  
  // Calculate weighted readiness score
  const conceptCompletionScore = results.concept.score;
  const mockAccuracyScore = results.stress.score;
  const confidenceAlignmentScore = results.readiness.score;
  
  const weightedScore = Math.round(
    (conceptCompletionScore * 0.3) + 
    (mockAccuracyScore * 0.5) + 
    (confidenceAlignmentScore * 0.2)
  );
  
  // Confidence mapping data - in a real app, this would be calculated from test results
  const confidenceMappings: ConfidenceMapping[] = [
    {
      topic: "Cognitive Processing",
      confidence: 80,
      accuracy: results.stress.score,
      status: results.stress.score < 70 ? "overconfident" : "aligned"
    },
    {
      topic: "Concept Mastery",
      confidence: 75,
      accuracy: results.concept.score,
      status: results.concept.score < 65 ? "overconfident" : "aligned"
    },
    {
      topic: "Exam Readiness",
      confidence: 85,
      accuracy: results.readiness.score,
      status: results.readiness.score < 75 ? "overconfident" : "aligned"
    }
  ];
  
  // Generate study plan recommendations based on results
  const studyPlanRecommendations = [
    results.stress.score < 70 ? "Practice timed mock tests weekly to improve cognitive processing under pressure." : null,
    results.concept.score < 70 ? "Focus on strengthening foundational concepts before advancing to complex topics." : null,
    results.readiness.score < 70 ? "Create a structured study schedule with daily goals and regular practice tests." : null,
    weightedScore < 70 ? "Schedule one-on-one sessions with subject matter experts to clarify doubts." : null,
    "Utilize active recall techniques rather than passive reading for better retention.",
    "Practice with previous years' question papers to build familiarity with exam patterns."
  ].filter(Boolean) as string[];
  
  // Color coding for score ranges
  const getScoreColorClass = (score: number) => {
    if (score >= 80) return 'from-green-400 to-green-600';
    if (score >= 65) return 'from-blue-400 to-blue-600';
    if (score >= 50) return 'from-amber-400 to-amber-600';
    return 'from-red-400 to-red-600';
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const handleShareResults = () => {
    toast.success("Share options opened", {
      description: "You can now share your results via email or social media"
    });
  };

  const handleDownloadReport = () => {
    toast.success("Report download initiated", {
      description: "Your comprehensive analysis report will be downloaded shortly"
    });
  };

  return (
    <ScrollArea className="h-[70vh] pr-4">
      <motion.div 
        className="space-y-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Exam Header Banner */}
        <motion.div variants={item}>
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                {currentExam.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{currentExam.name} Analysis</h2>
                <p className="text-violet-200">{currentExam.description}</p>
              </div>
            </div>
            <div className="flex flex-col items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg">
              <span className="text-sm text-violet-200">Overall Readiness</span>
              <span className="text-3xl font-bold">{weightedScore}%</span>
            </div>
          </div>
        </motion.div>
        
        {/* Primary CTA / Premium Banner */}
        <motion.div variants={item}>
          <Card className="overflow-hidden border-2 border-violet-200 dark:border-violet-800 bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/30">
            <CardContent className="p-0">
              <div className="p-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-400/10 rounded-full -mt-10 -mr-10 blur-3xl"></div>
                
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="flex-1 space-y-3">
                    <Badge variant="outline" className="bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300 border-violet-200 dark:border-violet-700 px-3 py-1">
                      <Sparkles className="mr-1 h-3.5 w-3.5" />
                      Premium Feature
                    </Badge>
                    
                    <h3 className="text-xl font-bold text-violet-900 dark:text-violet-300">
                      Unlock Your Complete {currentExam.name} Success Path
                    </h3>
                    
                    <p className="text-violet-700/90 dark:text-violet-400/90 text-sm">
                      Sign up now to access your personalized study plan, advanced analytics and expert guidance tailored for {currentExam.name} success.
                    </p>
                  </div>
                  
                  <Button 
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 h-auto"
                  >
                    <Link to="/signup">
                      <UserPlus className="mr-2 h-5 w-5" />
                      <span className="font-semibold">Get Started Free</span>
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Test Results Tabs */}
        <motion.div variants={item}>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6 bg-violet-50 dark:bg-violet-900/20 p-1">
              <TabsTrigger value="overview" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white">
                Overview
              </TabsTrigger>
              <TabsTrigger value="stress" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Clock className="h-4 w-4 mr-1" />
                Cognitive
              </TabsTrigger>
              <TabsTrigger value="concept" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white">
                <LightbulbIcon className="h-4 w-4 mr-1" />
                Concepts
              </TabsTrigger>
              <TabsTrigger value="readiness" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white">
                <Target className="h-4 w-4 mr-1" />
                Readiness
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <Card className="border-2 border-violet-100 dark:border-violet-800/50">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30 p-6 rounded-xl border border-blue-200 dark:border-blue-800/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 dark:bg-blue-800/50 p-2 rounded">
                            <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="font-medium text-blue-700 dark:text-blue-400">Cognitive</span>
                        </div>
                        <span className="text-xl font-bold text-blue-700 dark:text-blue-400">
                          {results.stress.score}%
                        </span>
                      </div>
                      <CustomProgress
                        value={results.stress.score}
                        className="h-2 my-3"
                        indicatorClassName={`bg-gradient-to-r ${getScoreColorClass(results.stress.score)}`}
                      />
                      <p className="text-xs text-blue-700/70 dark:text-blue-400/70">Measures your ability to perform under pressure and time constraints</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/30 p-6 rounded-xl border border-pink-200 dark:border-pink-800/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-pink-100 dark:bg-pink-800/50 p-2 rounded">
                            <LightbulbIcon className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                          </div>
                          <span className="font-medium text-pink-700 dark:text-pink-400">Concept</span>
                        </div>
                        <span className="text-xl font-bold text-pink-700 dark:text-pink-400">
                          {results.concept.score}%
                        </span>
                      </div>
                      <CustomProgress
                        value={results.concept.score}
                        className="h-2 my-3"
                        indicatorClassName={`bg-gradient-to-r ${getScoreColorClass(results.concept.score)}`}
                      />
                      <p className="text-xs text-pink-700/70 dark:text-pink-400/70">Evaluates your mastery of fundamental concepts required for the exam</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/30 p-6 rounded-xl border border-amber-200 dark:border-amber-800/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-amber-100 dark:bg-amber-800/50 p-2 rounded">
                            <Target className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                          </div>
                          <span className="font-medium text-amber-700 dark:text-amber-400">Readiness</span>
                        </div>
                        <span className="text-xl font-bold text-amber-700 dark:text-amber-400">
                          {results.readiness.score}%
                        </span>
                      </div>
                      <CustomProgress
                        value={results.readiness.score}
                        className="h-2 my-3"
                        indicatorClassName={`bg-gradient-to-r ${getScoreColorClass(results.readiness.score)}`}
                      />
                      <p className="text-xs text-amber-700/70 dark:text-amber-400/70">Determines your overall preparedness for the upcoming exam</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-violet-800 dark:text-violet-300">
                        <Medal className="h-5 w-5" />
                        Overall Analysis
                      </h3>
                      <div className="bg-violet-50/50 dark:bg-violet-900/20 p-4 rounded-lg border border-violet-100 dark:border-violet-800/30">
                        <p>{results.overall.analysis}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-base font-semibold mb-3 flex items-center gap-2 text-green-700 dark:text-green-400">
                          <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-md">
                            <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          Key Strengths
                        </h3>
                        <ul className="space-y-2">
                          {uniqueStrengths.slice(0, 5).map((strength, idx) => (
                            <li key={idx} className="flex gap-2 items-start">
                              <div className="mt-1 text-green-500">•</div>
                              <p className="text-sm">{strength}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-base font-semibold mb-3 flex items-center gap-2 text-amber-700 dark:text-amber-400">
                          <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-md">
                            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          </div>
                          Areas to Improve
                        </h3>
                        <ul className="space-y-2">
                          {uniqueImprovements.slice(0, 5).map((improvement, idx) => (
                            <li key={idx} className="flex gap-2 items-start">
                              <div className="mt-1 text-amber-500">•</div>
                              <p className="text-sm">{improvement}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Personalized Study Plan Card */}
              <Card className="mt-6 border-2 border-indigo-100 dark:border-indigo-800/50 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Your Personalized Study Plan
                    </h3>
                    <Badge variant="secondary" className="bg-white/20 hover:bg-white/30">
                      {currentExam.name} Focused
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-4 mb-6">
                    <p className="text-sm">Based on your performance in all three assessments, here's what you should focus on:</p>
                    
                    <ul className="space-y-3">
                      {studyPlanRecommendations.slice(0, 5).map((recommendation, idx) => (
                        <li key={idx} className="flex items-start gap-3 bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg">
                          <div className="bg-indigo-100 dark:bg-indigo-800/50 p-1.5 rounded-md mt-0.5">
                            <CheckCircle className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <p className="text-sm">{recommendation}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 p-5 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                    <h4 className="font-medium text-indigo-700 dark:text-indigo-400 mb-3">Ready to excel in your {currentExam.name} journey?</h4>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        asChild
                        className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-md"
                      >
                        <Link to="/signup">
                          <UserPlus className="mr-1.5 h-4 w-4" />
                          Get Full Study Plan
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-400"
                        asChild
                      >
                        <Link to="/contact">
                          <Mail className="mr-1.5 h-4 w-4" />
                          Talk to an Expert
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="stress" className="focus-visible:outline-none focus-visible:ring-0">
              <StressTestResults results={results.stress} userAnswers={[]} />
              
              <Card className="mt-6 border-2 border-blue-100 dark:border-blue-800/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-400 flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Cognitive Performance Analysis
                  </h3>
                  
                  <p className="mb-4 text-sm">{results.stress.analysis}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30">
                      <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">Your Strengths</h4>
                      <ul className="space-y-1.5">
                        {results.stress.strengths.map((strength, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <div className="text-blue-500 mt-0.5">•</div>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800/30">
                      <h4 className="font-medium text-amber-700 dark:text-amber-400 mb-2">Areas to Improve</h4>
                      <ul className="space-y-1.5">
                        {results.stress.improvements.map((improvement, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <div className="text-amber-500 mt-0.5">•</div>
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button 
                      asChild
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-md"
                    >
                      <Link to="/signup?plan=cognitive">
                        <Brain className="mr-1.5 h-4 w-4" />
                        Get Cognitive Enhancement Exercises
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="concept" className="focus-visible:outline-none focus-visible:ring-0">
              <ConceptTestResults results={results.concept} />
              
              <Card className="mt-6 border-2 border-pink-100 dark:border-pink-800/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-pink-700 dark:text-pink-400 flex items-center gap-2">
                    <LightbulbIcon className="h-5 w-5" />
                    Concept Mastery Analysis
                  </h3>
                  
                  <p className="mb-4 text-sm">{results.concept.analysis}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg border border-pink-100 dark:border-pink-800/30">
                      <h4 className="font-medium text-pink-700 dark:text-pink-400 mb-2">Your Strengths</h4>
                      <ul className="space-y-1.5">
                        {results.concept.strengths.map((strength, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <div className="text-pink-500 mt-0.5">•</div>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800/30">
                      <h4 className="font-medium text-amber-700 dark:text-amber-400 mb-2">Areas to Improve</h4>
                      <ul className="space-y-1.5">
                        {results.concept.improvements.map((improvement, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <div className="text-amber-500 mt-0.5">•</div>
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button 
                      asChild
                      className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-md"
                    >
                      <Link to="/signup?plan=concepts">
                        <BookOpen className="mr-1.5 h-4 w-4" />
                        Access Concept Practice Materials
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="readiness" className="focus-visible:outline-none focus-visible:ring-0">
              <Card className="border-2 border-amber-100 dark:border-amber-800/50">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Exam Readiness Analysis
                    </h3>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-700">
                      {results.readiness.level}
                    </Badge>
                  </div>
                  
                  <div className="bg-amber-50/50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800/30 mb-6">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-medium text-amber-700 dark:text-amber-400">Overall Readiness</span>
                      <span className="text-lg font-semibold text-amber-700 dark:text-amber-400">{results.readiness.score}%</span>
                    </div>
                    <CustomProgress
                      value={results.readiness.score}
                      className="h-2 mb-3"
                      indicatorClassName={`bg-gradient-to-r ${getScoreColorClass(results.readiness.score)}`}
                    />
                    <p className="text-sm">{results.readiness.analysis}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800/30">
                      <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">Your Strengths</h4>
                      <ul className="space-y-1.5">
                        {results.readiness.strengths.map((strength, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <div className="text-green-500 mt-0.5">•</div>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800/30">
                      <h4 className="font-medium text-amber-700 dark:text-amber-400 mb-2">Areas to Improve</h4>
                      <ul className="space-y-1.5">
                        {results.readiness.improvements.map((improvement, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <div className="text-amber-500 mt-0.5">•</div>
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button 
                      asChild
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md"
                    >
                      <Link to="/signup?plan=readiness">
                        <Target className="mr-1.5 h-4 w-4" />
                        Get Custom Readiness Plan
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 p-5 rounded-xl border-2 border-amber-100 dark:border-amber-800/50">
                <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Tips to Improve Your Readiness</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="bg-amber-100 dark:bg-amber-800/50 p-1 rounded-full mt-0.5">
                      <Check className="h-3.5 w-3.5 text-amber-700 dark:text-amber-300" />
                    </div>
                    <p className="text-sm">Create a realistic study schedule that accounts for your strengths and weak areas</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-amber-100 dark:bg-amber-800/50 p-1 rounded-full mt-0.5">
                      <Check className="h-3.5 w-3.5 text-amber-700 dark:text-amber-300" />
                    </div>
                    <p className="text-sm">Take regular mock tests under exam-like conditions to build stamina and time management</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-amber-100 dark:bg-amber-800/50 p-1 rounded-full mt-0.5">
                      <Check className="h-3.5 w-3.5 text-amber-700 dark:text-amber-300" />
                    </div>
                    <p className="text-sm">Review previous years' {currentExam.name} question papers to understand patterns</p>
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
        
        {/* Action Buttons */}
        <motion.div variants={item} className="pt-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Button 
              onClick={onStartOver} 
              variant="outline"
              className="py-6 border-2 border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/30"
            >
              <RefreshCw size={16} className="mr-1.5" />
              <span>Restart</span>
            </Button>
            
            <Button 
              onClick={handleDownloadReport}
              variant="outline"
              className="py-6 border-2 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30"
            >
              <Download size={16} className="mr-1.5" />
              <span>Download</span>
            </Button>
            
            <Button 
              onClick={handleShareResults}
              variant="outline"
              className="py-6 border-2 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
            >
              <Share2 size={16} className="mr-1.5" />
              <span>Share</span>
            </Button>
            
            <Button 
              asChild
              className="py-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
            >
              <Link to="/signup">
                <UserPlus size={16} className="mr-1.5" />
                <span>Sign Up</span>
              </Link>
            </Button>
          </div>
          
          <div className="p-4 bg-violet-50 dark:bg-violet-900/30 rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-100 dark:bg-violet-800/50 rounded-lg">
                <ArrowDown className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
              <p className="text-sm text-violet-700 dark:text-violet-400">
                Scroll down to view detailed analytics and study recommendations
              </p>
            </div>
            <Button 
              size="sm"
              variant="outline"
              className="border-violet-300 dark:border-violet-700 text-violet-700 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-800/50"
              asChild
            >
              <Link to="/contact">
                Contact Academic Advisor
              </Link>
            </Button>
          </div>
        </motion.div>
        
        {/* Confidence Mapping Section */}
        <motion.div variants={item}>
          <Card className="border-2 border-indigo-100 dark:border-indigo-800/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Confidence vs Performance Analysis
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-indigo-50 dark:bg-indigo-900/20">
                      <th className="p-3 text-left">Assessment Area</th>
                      <th className="p-3 text-center">Your Confidence</th>
                      <th className="p-3 text-center">Actual Performance</th>
                      <th className="p-3 text-center">Gap Analysis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {confidenceMappings.map((mapping, index) => (
                      <tr key={index} className="border-b border-indigo-100 dark:border-indigo-800/30">
                        <td className="p-3">{mapping.topic}</td>
                        <td className="p-3 text-center">{mapping.confidence}%</td>
                        <td className="p-3 text-center">{mapping.accuracy}%</td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            mapping.status === 'overconfident' 
                              ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400' 
                              : mapping.status === 'aligned'
                              ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                              : 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                          }`}>
                            {mapping.status === 'overconfident' && 'Overconfident ❗️'}
                            {mapping.status === 'aligned' && 'Well Aligned ✅'}
                            {mapping.status === 'underconfident' && 'Underconfident 🔍'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Final CTA Section */}
        <motion.div variants={item}>
          <div className="relative overflow-hidden rounded-xl border-2 border-violet-200 dark:border-violet-800">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-indigo-600/20 dark:from-violet-600/20 dark:to-indigo-600/30"></div>
            <div className="relative p-8 z-10">
              <div className="text-center mb-6">
                <Badge className="bg-white dark:bg-gray-800 text-violet-700 dark:text-violet-400 mb-3">
                  <Medal className="h-3.5 w-3.5 mr-1" />
                  Unlock Your Full Potential
                </Badge>
                <h2 className="text-2xl font-bold text-violet-800 dark:text-violet-300 mb-2">
                  Ready to Excel in {currentExam.name}?
                </h2>
                <p className="text-violet-700/80 dark:text-violet-300/80 max-w-xl mx-auto">
                  Sign up now to access personalized study plans, premium practice content, and detailed performance analytics tailored for {currentExam.name} success.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all"
                >
                  <Link to="/signup">
                    <UserPlus className="mr-2 h-5 w-5" />
                    <span className="font-semibold">Create Free Account</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button 
                  onClick={onStartOver}
                  variant="outline"
                  size="lg"
                  className="border-2 border-violet-300 dark:border-violet-700 text-violet-700 dark:text-violet-400 px-8 py-6 h-auto"
                >
                  <RefreshCw className="mr-2 h-5 w-5" />
                  <span>Take Another Test</span>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </ScrollArea>
  );
};

// These are the Lucide icon components used in the report section
const Check = ({ className, ...props }: { className?: string, [key: string]: any }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className} 
    {...props}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const AlertTriangle = ({ className, ...props }: { className?: string, [key: string]: any }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className} 
    {...props}
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

const CheckCircle = ({ className, ...props }: { className?: string, [key: string]: any }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className} 
    {...props}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default ReportSection;
