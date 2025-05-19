
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SparklesIcon, BookOpen, ArrowRight, GraduationCap } from "lucide-react";
import { motion } from 'framer-motion';

interface HeroButtonsProps {
  onAnalyzeClick?: () => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ onAnalyzeClick }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        animate={{ 
          boxShadow: ['0px 0px 0px 0px rgba(139, 92, 246, 0)', '0px 0px 20px 0px rgba(139, 92, 246, 0.5)', '0px 0px 0px 0px rgba(139, 92, 246, 0)'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <Button
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-xl flex items-center gap-2 px-7 py-7 border border-white/10"
          onClick={onAnalyzeClick}
        >
          <SparklesIcon size={22} className="animate-pulse" />
          <span className="font-medium text-lg">Test Your NEET Readiness</span>
        </Button>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-violet-200 hover:border-violet-300 hover:bg-violet-50 shadow-lg hover:shadow-xl transition-all dark:border-violet-800 dark:hover:border-violet-700 dark:hover:bg-violet-900/50 px-7 py-7"
        >
          <Link to="/signup" className="flex items-center gap-2">
            <GraduationCap size={20} className="text-green-600" />
            <span className="text-lg">Start NEET Preparation</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight size={18} />
            </motion.div>
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default HeroButtons;
