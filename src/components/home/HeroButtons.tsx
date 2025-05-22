
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroButtonsProps {
  onAnalyzeClick: () => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ onAnalyzeClick }) => {
  const navigate = useNavigate();
  
  const handleFreeTrialClick = () => {
    navigate('/signup');
  };
  
  return (
    <div className="space-y-4">
      {/* Primary CTA */}
      <motion.button
        onClick={handleFreeTrialClick}
        className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span className="mr-2">Your first 7 days of free exam preparation are on us</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </motion.button>
      
      {/* Secondary CTA */}
      <motion.button
        onClick={onAnalyzeClick}
        className="w-full border-2 border-amber-300 hover:border-amber-400 dark:border-amber-700 dark:hover:border-amber-600 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30 py-3 px-6 rounded-xl flex items-center justify-center"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <Sparkles className="mr-2 h-5 w-5" />
        Analyze Your Exam Readiness
      </motion.button>
    </div>
  );
};

export default HeroButtons;
