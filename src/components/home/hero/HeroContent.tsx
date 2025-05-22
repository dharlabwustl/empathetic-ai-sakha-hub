
import React from 'react';
import { motion } from 'framer-motion';
import ButtonsContainer from './buttons/ButtonsContainer';
import FeatureCheckpoints from './FeatureCheckpoints';
import StudentJourneyBadge from './StudentJourneyBadge';
import ExamNamesBadge from './ExamNamesBadge';
import { Sparkles, CheckCircle2, BrainCircuit, Lightbulb, Star } from 'lucide-react';

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
      className="w-full lg:w-1/2 pt-4 lg:pt-0 lg:pr-8 relative z-20"
    >
      <div className="flex flex-wrap gap-2 mb-3">
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
      
      {/* Premium Emotional Badge */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="mb-4 inline-block"
      >
        <div className="bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 dark:from-indigo-400/20 dark:via-purple-400/20 dark:to-pink-400/20 border border-indigo-200 dark:border-indigo-800 p-1.5 rounded-full">
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold text-sm px-3 flex items-center">
            <Star className="h-3 w-3 mr-1 text-amber-500" /> Your Path to Exam Excellence
          </span>
        </div>
      </motion.div>
      
      <motion.h1
        className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="mb-2 relative">
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
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">into exam triumph</span>
          <motion.div 
            className="absolute -right-8 -top-5 rotate-12"
            animate={{ y: [0, -5, 0], rotate: [12, 15, 12] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Lightbulb className="h-7 w-7 text-amber-500 fill-amber-100 dark:fill-amber-900/50" />
          </motion.div>
        </motion.div>
      </motion.h1>
      
      <motion.div 
        className="mb-5 bg-red-50/80 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded-lg p-3 shadow-sm"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-base font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center">
          <BrainCircuit className="mr-2 h-5 w-5" />
          Your Preparation Challenges
        </h3>
        <ul className="space-y-1.5">
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
      
      <motion.p 
        className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="font-semibold">From struggling student to exam champion</span> - our AI-driven platform is specially designed for Indian competitive exams like <span className="font-semibold text-indigo-600 dark:text-indigo-400">JEE, NEET, UPSC, CAT</span> and more. Your personalized pathway to success starts with <span className="text-indigo-600 dark:text-indigo-400 font-bold">PREPZR</span>.
      </motion.p>
      
      {/* Success statistics */}
      <motion.div
        className="flex flex-wrap gap-3 mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
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
      
      {/* CTA buttons - moved up for immediate visibility */}
      <ButtonsContainer onAnalyzeClick={handleExamReadinessClick} />
      
      {/* Exam Names Badge */}
      <ExamNamesBadge />

      {/* Feature checkpoints */}
      <FeatureCheckpoints />
    </motion.div>
  );
};

export default HeroContent;
