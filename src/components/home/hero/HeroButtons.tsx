
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart, Clock } from 'lucide-react';

interface HeroButtonsProps {
  onAnalyzeClick: () => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ onAnalyzeClick }) => {
  const navigate = useNavigate();
  
  const handleFreeTrial = () => {
    navigate('/signup');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="w-full sm:w-auto"
      >
        <Button 
          onClick={handleFreeTrial}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-xl transition-all px-6 py-5 h-auto rounded-xl group font-medium text-base"
        >
          <Clock className="mr-2 h-5 w-5 group-hover:animate-pulse" />
          Start 7-Day Free Trial
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
      
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="w-full sm:w-auto"
      >
        <Button 
          onClick={onAnalyzeClick} 
          variant="outline" 
          className="w-full sm:w-auto border-2 border-purple-300 hover:border-purple-400 dark:border-purple-700 dark:hover:border-purple-600 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 px-6 py-5 h-auto rounded-xl"
        >
          <BarChart className="mr-2 h-5 w-5" />
          Try Exam Readiness Analyzer
        </Button>
      </motion.div>
    </div>
  );
};

export default HeroButtons;
