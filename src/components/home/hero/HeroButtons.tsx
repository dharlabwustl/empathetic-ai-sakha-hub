
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart, Clock, Brain, Sparkles } from 'lucide-react';

interface HeroButtonsProps {
  onAnalyzeClick: () => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ onAnalyzeClick }) => {
  const navigate = useNavigate();
  
  const handleFreeTrial = () => {
    navigate('/signup');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-6 z-20 relative">
      {/* Primary CTA Button */}
      <motion.div
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="w-full sm:w-auto"
      >
        <Button 
          onClick={handleFreeTrial}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all px-6 py-6 h-auto rounded-xl group font-medium text-base relative overflow-hidden border border-blue-400/20"
        >
          {/* Add shine effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <Clock className="mr-2 h-5 w-5 group-hover:animate-pulse" />
          <span className="relative z-10">Start 7-Day Free Trial</span>
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
      
      {/* Secondary CTA Button with Animation */}
      <motion.div
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.98 }}
        className="w-full sm:w-auto"
      >
        <Button 
          onClick={onAnalyzeClick} 
          variant="outline" 
          className="w-full sm:w-auto border-2 border-purple-300 hover:border-purple-400 dark:border-purple-700 dark:hover:border-purple-600 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 px-6 py-6 h-auto rounded-xl group relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-purple-200/20 dark:bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={{
              boxShadow: [
                "inset 0 0 20px rgba(147, 51, 234, 0)",
                "inset 0 0 30px rgba(147, 51, 234, 0.2)",
                "inset 0 0 20px rgba(147, 51, 234, 0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          <Brain className="mr-2 h-5 w-5 relative z-10" />
          <span className="font-medium text-base relative z-10">Exam Readiness Analyzer</span>
          <Sparkles className="ml-2 h-4 w-4 text-purple-500 group-hover:rotate-12 transition-transform relative z-10" />
        </Button>
      </motion.div>
    </div>
  );
};

export default HeroButtons;
