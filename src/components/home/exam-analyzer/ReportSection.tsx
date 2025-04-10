
import React from 'react';
import { ExamResults, ConfidenceMapping } from './types';
import { CustomProgress } from '@/components/ui/custom-progress';
import ReportHeader from './report-components/ReportHeader';
import ScoreBadges from './report-components/ScoreBadges';
import ConfidenceMappingSection from './report-components/ConfidenceMapping';
import StrengthsAndImprovements from './report-components/StrengthsAndImprovements';
import StudyPlanSection from './report-components/StudyPlanSection';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Download, 
  RefreshCw, 
  UserPlus, 
  Share2,
  ArrowRight,
  Mail,
  BookOpen,
  Medal,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

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
  // Get the exam label from the selected exam
  const getExamLabel = (examId: string): string => {
    const examLabels: Record<string, string> = {
      'iit-jee': 'IIT-JEE',
      'neet': 'NEET',
      'upsc': 'UPSC',
      'cat': 'CAT',
      'bank-po': 'Bank PO',
      'default': 'Entrance Exam'
    };
    
    return examLabels[examId] || examLabels.default;
  };
  
  const examLabel = getExamLabel(selectedExam);
  
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
  
  // Get unique items for display (up to 5 each)
  const uniqueStrengths = [...new Set(allStrengths)].slice(0, 5);
  const uniqueImprovements = [...new Set(allImprovements)].slice(0, 5);
  
  // Calculate weighted readiness score using the formula:
  // Readiness = (Concept Completion x 0.3) + (Mock Accuracy x 0.5) + (Confidence Accuracy Alignment x 0.2)
  const conceptCompletionScore = results.concept.score;
  const mockAccuracyScore = results.stress.score;
  const confidenceAlignmentScore = results.concept.score * 0.8; // Simulating alignment score
  
  const weightedScore = Math.round(
    (conceptCompletionScore * 0.3) + 
    (mockAccuracyScore * 0.5) + 
    (confidenceAlignmentScore * 0.2)
  );
  
  // Confidence mapping data - in a real app, this would be calculated from test results
  const confidenceMappings: ConfidenceMapping[] = [
    {
      topic: "Critical Reasoning",
      confidence: 80,
      accuracy: 55,
      status: "overconfident"
    },
    {
      topic: "Quantitative Analysis",
      confidence: 60,
      accuracy: 62,
      status: "aligned"
    },
    {
      topic: "Data Interpretation",
      confidence: 40,
      accuracy: 65,
      status: "underconfident"
    },
    {
      topic: "Verbal Reasoning",
      confidence: 75,
      accuracy: 45,
      status: "overconfident"
    },
    {
      topic: "Logical Reasoning",
      confidence: 55,
      accuracy: 54,
      status: "aligned"
    }
  ];
  
  // Generate study plan recommendations based on results
  const studyPlanRecommendations = [
    results.stress.score < 60 ? "Daily pattern recognition practice to improve focus under pressure." : null,
    results.readiness.score < 60 ? "Create a structured study plan with dedicated hours for weak areas." : null,
    results.concept.score < 60 ? "Focus on fundamental concept mastery before moving to advanced topics." : null,
    results.readiness.score < 70 ? "Increase practice test frequency to build exam familiarity." : null,
    "Dedicate time to review and reinforce weak subjects regularly.",
    "Use active recall techniques instead of passive reading for better retention.",
    "Create a visual progress tracker to maintain motivation and accountability."
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
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const handleShareResults = () => {
    // In a real app, this would open a share dialog
    toast.success("Sharing options opened", {
      description: "You can share your results via various platforms."
    });
  };

  const handleDownloadReport = () => {
    // In a real app, this would download a PDF report
    toast.success("Report download started", {
      description: "Your detailed analysis report will be downloaded shortly."
    });
  };
  
  return (
    <motion.div 
      className="space-y-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Summary Card with Score */}
      <motion.div variants={item}>
        <Card className="overflow-hidden border-2 border-violet-100 dark:border-violet-800/50 shadow-lg">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-violet-500/20 to-blue-500/20 dark:from-violet-900/30 dark:to-blue-900/40 p-6 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-violet-400/20 to-blue-500/20 dark:from-violet-600/20 dark:to-blue-600/20 rounded-full blur-2xl"></div>
              <ReportHeader 
                examLabel={examLabel}
                weightedScore={weightedScore}
                overallAnalysis={results.overall.analysis}
                getScoreColorClass={getScoreColorClass}
              />
            </div>
            <div className="p-6">
              <ScoreBadges 
                stressScore={results.stress.score}
                conceptCompletionScore={conceptCompletionScore}
                mockAccuracyScore={mockAccuracyScore}
                confidenceAlignmentScore={confidenceAlignmentScore}
                getScoreColorClass={getScoreColorClass}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Primary CTA Section */}
      <motion.div 
        variants={item} 
        className="bg-gradient-to-br from-violet-600 to-blue-600 dark:from-violet-700 dark:to-blue-700 p-6 rounded-xl shadow-lg text-white"
      >
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="flex-1 space-y-3 text-center sm:text-left">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Medal className="h-6 w-6" />
              Unlock Your Full Potential
            </h3>
            <p className="opacity-90">Sign up now to access personalized study plans, premium practice content, and detailed performance analytics.</p>
          </div>
          <Button 
            asChild
            size="lg"
            className="bg-white text-violet-700 hover:bg-violet-50 shadow-md hover:shadow-lg transition-all duration-300 px-6 py-6 h-auto text-base font-medium"
          >
            <Link to="/signup">
              <Sparkles className="mr-2 h-5 w-5" />
              <span>Get Premium Access</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </motion.div>
      
      {/* Analysis Sections */}
      <motion.div variants={item}>
        <ConfidenceMappingSection
          confidenceMappings={confidenceMappings}
        />
      </motion.div>
      
      <motion.div variants={item}>
        <StrengthsAndImprovements
          strengths={uniqueStrengths}
          improvements={uniqueImprovements}
        />
      </motion.div>
      
      <motion.div variants={item}>
        <StudyPlanSection
          recommendations={studyPlanRecommendations}
          onStartOver={onStartOver}
        />
      </motion.div>
      
      {/* Action Buttons */}
      <motion.div variants={item}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Button 
            onClick={onStartOver} 
            className="py-7 bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <RefreshCw size={18} className="mr-2" />
            <span>Take Test Again</span>
          </Button>
          
          <Button 
            onClick={handleDownloadReport}
            className="py-7 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Download size={18} className="mr-2" />
            <span>Download Full Report</span>
          </Button>
          
          <Button 
            onClick={handleShareResults}
            className="py-7 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Share2 size={18} className="mr-2" />
            <span>Share Results</span>
          </Button>
        </div>
      </motion.div>
      
      <motion.div variants={item} className="pt-4">
        <Separator className="mb-6" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-5 border-2 border-green-100 dark:border-green-800/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium text-green-700 dark:text-green-400">Start Your Preparation</h3>
            </div>
            <p className="text-sm mb-4">Begin your structured study journey with expert-designed plans.</p>
            <Button 
              asChild
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500"
            >
              <Link to="/signup?plan=study">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>
          
          <Card className="p-5 border-2 border-blue-100 dark:border-blue-800/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium text-blue-700 dark:text-blue-400">Contact a Counselor</h3>
            </div>
            <p className="text-sm mb-4">Get personalized guidance from our expert academic counselors.</p>
            <Button 
              asChild
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500"
            >
              <Link to="/contact">
                Schedule Call
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReportSection;
