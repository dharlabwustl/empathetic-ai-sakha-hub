
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
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg flex items-center gap-2 px-6 py-6 border border-white/10"
          onClick={onAnalyzeClick}
        >
          <SparklesIcon size={20} />
          <span className="font-medium text-lg">Test Your NEET Readiness</span>
        </Button>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-violet-200 hover:border-violet-300 hover:bg-violet-50 shadow-md dark:border-violet-800 dark:hover:border-violet-700 dark:hover:bg-violet-900/50 px-6 py-6"
        >
          <Link to="/signup" className="flex items-center gap-2">
            <GraduationCap size={18} className="text-green-600" />
            <span className="text-lg">Start NEET Preparation</span>
            <ArrowRight size={16} />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default HeroButtons;
