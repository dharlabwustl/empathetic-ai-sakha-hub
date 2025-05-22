
import React from 'react';
import { motion } from 'framer-motion';
import HeroButtons from './HeroButtons';
import FeatureCheckpoints from './FeatureCheckpoints';
import StudentJourneyBadge from './StudentJourneyBadge';
import { Sparkles, BrainCircuit } from 'lucide-react';

interface HeroContentProps {
  handleExamReadinessClick: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ handleExamReadinessClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="w-full lg:w-1/2 pt-4 lg:pt-0 lg:pr-8 relative z-20"
    >
      {/* Premium Experience Badge */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="absolute -top-2 -right-2 md:top-0 md:-right-8 z-30 transform rotate-12"
      >
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-1 rounded-lg shadow-lg flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-100" />
          <span className="font-bold text-sm">PREMIUM</span>
        </div>
      </motion.div>
  
      <div className="flex flex-wrap gap-2 mb-3">
        <StudentJourneyBadge />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shine-badge"
        >
          <motion.span 
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >●</motion.span> NEET is live now!
        </motion.div>
      </div>
      
      {/* Welcome text */}
      <motion.p
        className="text-lg font-medium text-indigo-600 dark:text-indigo-400 mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Welcome to PREPZR - tomorrow's learning experience:
      </motion.p>
      
      <motion.h1
        className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span className="relative inline-block">
          <motion.span 
            className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          >
            Transform your struggle
          </motion.span>
          <motion.span
            className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          />
        </span>
        <br />
        <motion.span 
          className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
          animate={{ 
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
          }}
          transition={{ duration: 15, delay: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          into exam triumph
        </motion.span>
      </motion.h1>

      {/* Emotional Connection Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mb-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg p-3 border border-indigo-100 dark:border-indigo-800/30 shadow-inner"
      >
        <div className="flex items-start gap-3">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-full shadow-lg mt-0.5">
            <BrainCircuit className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-700 dark:from-indigo-400 dark:to-purple-400">
              Your Exam Journey Reimagined
            </h3>
            <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">
              Our AI-powered system <span className="font-semibold text-indigo-700 dark:text-indigo-400">adapts to your learning style</span>, providing personalized support when you need it most.
            </p>
          </div>
        </div>
      </motion.div>
      
      {/* CTA Buttons moved up for better visibility */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mb-4"
      >
        <HeroButtons onAnalyzeClick={handleExamReadinessClick} />
      </motion.div>
      
      <motion.p 
        className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Our AI-driven platform is specially designed for Indian competitive exams like <span className="font-semibold text-indigo-600 dark:text-indigo-400">JEE, NEET, UPSC, CAT</span> and more.
      </motion.p>
      
      <FeatureCheckpoints />
    </motion.div>
  );
};

export default HeroContent;
