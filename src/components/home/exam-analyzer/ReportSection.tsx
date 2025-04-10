
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
import { RefreshCw, UserPlus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  
  return (
    <motion.div 
      className="space-y-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <Card className="overflow-hidden border-2 border-violet-100 dark:border-violet-800/50 shadow-lg">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-violet-500/10 to-blue-500/10 dark:from-violet-900/30 dark:to-blue-900/30 p-6">
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
      
      <motion.div 
        variants={item}
        className="flex flex-col sm:flex-row gap-4 mt-8"
      >
        <Button 
          onClick={onStartOver} 
          className="flex-1 py-6 bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 shadow-md hover:shadow-lg transition-all duration-300"
        >
          <RefreshCw size={18} className="mr-2" />
          <span>Take Another Test</span>
        </Button>
        
        <Button 
          asChild
          className="flex-1 py-6 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Link to="/signup">
            <UserPlus size={18} className="mr-2" />
            <span>Sign Up for Full Results</span>
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ReportSection;
