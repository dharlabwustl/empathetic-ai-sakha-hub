
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExamResults, ExamType, ConfidenceMapping } from './types';
import { CustomProgress } from '@/components/ui/custom-progress';
import { motion } from 'framer-motion';
import { Download, BarChart3, Brain, Target, Clock, RefreshCw, CheckCircle, AlertTriangle, BookOpen } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface ReportSectionProps {
  results: ExamResults;
  selectedExam: string;
  examTypes: ExamType[];
  onStartOver: () => void;
}

const ReportSection: React.FC<ReportSectionProps> = ({ 
  results, 
  selectedExam,
  examTypes,
  onStartOver
}) => {
  const examLabel = examTypes.find(exam => exam.value === selectedExam)?.label || selectedExam;
  
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
  ].filter(Boolean);
  
  // Color coding for score ranges
  const getScoreColorClass = (score: number) => {
    if (score >= 80) return 'from-green-400 to-green-600';
    if (score >= 65) return 'from-blue-400 to-blue-600';
    if (score >= 50) return 'from-amber-400 to-amber-600';
    return 'from-red-400 to-red-600';
  };
  
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
            Your {examLabel} Readiness Analysis
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Based on scientific assessment across cognitive stress, readiness, and concept mastery
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-violet-50 to-blue-50 dark:from-violet-900/20 dark:to-blue-900/20 p-6 rounded-xl border-2 border-violet-100 dark:border-violet-800/50 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-lg">Overall Readiness Score</h4>
            <span className="text-2xl font-bold text-violet-700 dark:text-violet-300">{weightedScore}%</span>
          </div>
          
          <CustomProgress 
            value={weightedScore} 
            className="h-3 mb-4"
            indicatorClassName={`bg-gradient-to-r ${getScoreColorClass(weightedScore)}`}
          />
          
          <div className="bg-white/80 dark:bg-gray-800/50 p-4 rounded-lg mb-4">
            <p className="text-sm mb-2">{results.overall.analysis}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">
              Score Formula: (Concept Mastery × 0.3) + (Stress Performance × 0.5) + (Confidence Alignment × 0.2)
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge 
              icon={Clock} 
              value={results.stress.score} 
              label="Stress Management" 
              colorClass={getScoreColorClass(results.stress.score)}
            />
            <Badge 
              icon={BookOpen} 
              value={Math.round(conceptCompletionScore)} 
              label="Concept Coverage" 
              colorClass={getScoreColorClass(conceptCompletionScore)}
            />
            <Badge 
              icon={Target} 
              value={Math.round(mockAccuracyScore)} 
              label="Mock Accuracy" 
              colorClass={getScoreColorClass(mockAccuracyScore)}
            />
            <Badge 
              icon={Brain} 
              value={Math.round(confidenceAlignmentScore)} 
              label="Confidence Alignment" 
              colorClass={getScoreColorClass(confidenceAlignmentScore)}
            />
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-100 dark:border-blue-800/50 p-5 shadow-md"
      >
        <h4 className="flex items-center text-blue-700 dark:text-blue-400 font-medium mb-4">
          <div className="p-2 mr-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          Confidence Mapping
        </h4>
        
        <p className="text-sm mb-3 text-gray-600 dark:text-gray-400">
          This mapping shows how your perceived knowledge (confidence) aligns with your actual performance (accuracy).
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-50 dark:bg-blue-900/20">
                <th className="p-2 text-left">Topic</th>
                <th className="p-2 text-center">Confidence</th>
                <th className="p-2 text-center">Accuracy</th>
                <th className="p-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {confidenceMappings.map((mapping, index) => (
                <tr key={index} className="border-b border-blue-100 dark:border-blue-800/30">
                  <td className="p-2">{mapping.topic}</td>
                  <td className="p-2 text-center">{mapping.confidence}%</td>
                  <td className="p-2 text-center">{mapping.accuracy}%</td>
                  <td className="p-2 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      mapping.status === 'overconfident' 
                        ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400' 
                        : mapping.status === 'aligned'
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                        : 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                    }`}>
                      {mapping.status === 'overconfident' && 'Overconfident ❗️'}
                      {mapping.status === 'aligned' && 'Aligned ✅'}
                      {mapping.status === 'underconfident' && 'Underconfident 🤯'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl border-2 border-green-100 dark:border-green-800/50 p-5 shadow-md"
        >
          <h4 className="flex items-center text-green-700 dark:text-green-400 font-medium mb-4">
            <div className="p-2 mr-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            Your Strengths
          </h4>
          
          <ul className="space-y-2">
            {uniqueStrengths.map((strength, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">{strength}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl border-2 border-amber-100 dark:border-amber-800/50 p-5 shadow-md"
        >
          <h4 className="flex items-center text-amber-700 dark:text-amber-400 font-medium mb-4">
            <div className="p-2 mr-2 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
            Areas for Improvement
          </h4>
          
          <ul className="space-y-2">
            {uniqueImprovements.map((improvement, i) => (
              <li key={i} className="flex items-start">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">{improvement}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-100 dark:border-blue-800/50 p-5 shadow-md"
      >
        <h4 className="flex items-center text-blue-700 dark:text-blue-400 font-medium mb-4">
          <div className="p-2 mr-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          Personalized Study Plan
        </h4>
        
        <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
          <p className="text-sm">Based on your performance, we recommend focusing on these key areas:</p>
        </div>
        
        <ul className="space-y-3 mb-5">
          {studyPlanRecommendations.slice(0, 5).map((recommendation, i) => (
            <li key={i} className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-xs text-blue-700 dark:text-blue-300 mr-2 mt-0.5 flex-shrink-0">
                {i + 1}
              </div>
              <span className="text-sm">{recommendation}</span>
            </li>
          ))}
        </ul>
        
        <Separator className="my-4" />
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button variant="outline" className="flex-1 flex items-center justify-center gap-2">
            <Download size={16} />
            <span>Save Results PDF</span>
          </Button>
          
          <Button 
            onClick={onStartOver} 
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600"
          >
            <RefreshCw size={16} />
            <span>Take Another Test</span>
          </Button>
        </div>
        
        <div className="mt-5 p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg border border-violet-100 dark:border-violet-800">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-violet-700 dark:text-violet-400">Start Your Learning Journey</h4>
              <p className="text-sm text-violet-600 dark:text-violet-300 mt-1">
                Access personalized study plans, adaptive practice, and expert guidance
              </p>
            </div>
            <Button className="bg-violet-600 hover:bg-violet-700">
              Sign Up Now
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Badge component for showing scores with icons
const Badge = ({ 
  icon: Icon, 
  value, 
  label, 
  colorClass 
}: { 
  icon: any, 
  value: number, 
  label: string,
  colorClass: string 
}) => (
  <div className="flex items-center bg-white/60 dark:bg-gray-800/60 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
    <Icon className={`h-3.5 w-3.5 mr-1.5 bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`} />
    <span className="text-xs font-medium">{label}: <span className="font-bold">{value}%</span></span>
  </div>
);

export default ReportSection;
