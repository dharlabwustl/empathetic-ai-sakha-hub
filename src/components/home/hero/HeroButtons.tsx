
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SparklesIcon, BookOpen, ArrowRight } from "lucide-react";
import { motion } from 'framer-motion';

interface HeroButtonsProps {
  onAnalyzeClick?: () => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ onAnalyzeClick }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button
        size="lg"
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl flex items-center gap-2 px-6 py-6"
        onClick={onAnalyzeClick}
      >
        <SparklesIcon size={20} />
        <span className="font-medium">Test Your Exam Readiness</span>
      </Button>

      <Button
        asChild
        variant="outline"
        size="lg"
        className="border-violet-200 hover:border-violet-300 hover:bg-violet-50 shadow-md hover:shadow-lg transition-all dark:border-violet-800 dark:hover:border-violet-700 dark:hover:bg-violet-900/50 px-6 py-6"
      >
        <Link to="/signup" className="flex items-center gap-2">
          <BookOpen size={20} />
          <span>7-Day Free Trial</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowRight size={18} />
          </motion.div>
        </Link>
      </Button>
    </div>
  );
};

export default HeroButtons;
