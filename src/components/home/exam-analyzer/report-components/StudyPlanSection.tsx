
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Download, RefreshCw, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';

interface StudyPlanSectionProps {
  recommendations: string[];
  onStartOver: () => void;
}

const StudyPlanSection: React.FC<StudyPlanSectionProps> = ({ recommendations, onStartOver }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-100 dark:border-blue-800/50 p-5 shadow-lg"
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
        {recommendations.slice(0, 5).map((recommendation, i) => (
          <motion.li 
            key={i} 
            className="flex items-start"
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.3 }}
          >
            <div className="h-5 w-5 rounded-full bg-gradient-to-r from-violet-400 to-blue-500 flex items-center justify-center text-xs text-white mr-2 mt-0.5 flex-shrink-0">
              {i + 1}
            </div>
            <span className="text-sm">{recommendation}</span>
          </motion.li>
        ))}
      </ul>
      
      <Separator className="my-4" />
      
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <Button variant="outline" className="flex-1 flex items-center justify-center gap-2 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30">
          <Download size={16} />
          <span>Save Results PDF</span>
        </Button>
        
        <Button 
          onClick={onStartOver} 
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 shadow-md hover:shadow-lg transition-all duration-300"
        >
          <RefreshCw size={16} />
          <span>Take Another Test</span>
        </Button>
      </div>
      
      <div className="mt-5 p-4 bg-gradient-to-br from-violet-50 to-blue-50 dark:from-violet-900/20 dark:to-blue-900/20 rounded-lg border border-violet-100 dark:border-violet-800 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-medium text-violet-700 dark:text-violet-400 flex items-center">
              <BookOpen className="mr-2 h-4 w-4" />
              Start Your Learning Journey
            </h4>
            <p className="text-sm text-violet-600 dark:text-violet-300 mt-1">
              Access personalized study plans, adaptive practice, and expert guidance
            </p>
          </div>
          <Button className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-300 animate-pulse">
            Sign Up Now
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default StudyPlanSection;
