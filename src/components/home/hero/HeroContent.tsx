
import React from 'react';
import { motion } from 'framer-motion';
import HeroButtons from './hero/HeroButtons';
import FeatureCheckpoints from './hero/FeatureCheckpoints';
import StudentJourneyBadge from './hero/StudentJourneyBadge';
import ExamNamesBadge from './hero/ExamNamesBadge';
import { Sparkles, CheckCircle2, BrainCircuit } from 'lucide-react';

interface HeroContentProps {
  handleExamReadinessClick: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ handleExamReadinessClick }) => {
  const painPoints = [
    "Overwhelming syllabus",
    "Ineffective study techniques",
    "Lack of personalized guidance"
  ];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="w-full lg:w-1/2 pt-8 lg:pt-0 lg:pr-8 relative z-10"
    >
      <div className="flex flex-wrap gap-2 mb-4">
        <StudentJourneyBadge />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shine-badge"
        >
          <span className="animate-pulse-subtle">●</span> NEET is live now!
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3" /> Success Rate 94%
        </motion.div>
      </div>
      
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span className="relative inline-block">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
            Transform your struggle
          </span>
          <motion.span
            className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          />
        </span>
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">into exam triumph</span>
      </motion.h1>
      
      {/* Success statistics - Moved higher for immediate visibility */}
      <motion.div
        className="flex flex-wrap gap-3 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30 rounded-full py-1 px-3">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span className="text-sm text-green-700 dark:text-green-300 font-medium">92% improved scores</span>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 rounded-full py-1 px-3">
          <CheckCircle2 className="h-4 w-4 text-indigo-500" />
          <span className="text-sm text-indigo-700 dark:text-indigo-300 font-medium">50000+ success stories</span>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 rounded-full py-1 px-3">
          <CheckCircle2 className="h-4 w-4 text-amber-500" />
          <span className="text-sm text-amber-700 dark:text-amber-300 font-medium">2.5x study efficiency</span>
        </div>
      </motion.div>

      {/* CTA buttons - Moved higher for visibility without scrolling */}
      <div className="mb-6">
        <HeroButtons onAnalyzeClick={handleExamReadinessClick} />
      </div>
      
      {/* Exam Names Badge */}
      <ExamNamesBadge />
      
      <motion.p 
        className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="font-semibold">From struggling student to exam champion</span> - our AI-driven platform is specially designed for Indian competitive exams like <span className="font-semibold text-indigo-600 dark:text-indigo-400">JEE, NEET, UPSC, CAT</span> and more. Your personalized pathway to success starts here with PREPZR.
      </motion.p>
      
      <motion.div 
        className="mt-6 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded-lg p-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center">
          <BrainCircuit className="mr-2 h-5 w-5" />
          Your Preparation Challenges
        </h3>
        <ul className="space-y-2">
          {painPoints.map((point, idx) => (
            <motion.li 
              key={idx}
              className="flex items-center text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
            >
              <span className="h-2 w-2 bg-red-500 rounded-full mr-2" />
              {point}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Feature checkpoints moved to bottom since they're less critical for first impression */}
      <div className="mt-6">
        <FeatureCheckpoints />
      </div>
    </motion.div>
  );
};

export default HeroContent;
