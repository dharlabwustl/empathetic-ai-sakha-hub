
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Download, RefreshCw } from 'lucide-react';
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
        {recommendations.slice(0, 5).map((recommendation, i) => (
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
  );
};

export default StudyPlanSection;
