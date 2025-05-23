
import React from 'react';
import { motion } from 'framer-motion';
import HeroButtons from './HeroButtons';
import FeatureCheckpoints from './FeatureCheckpoints';
import StudentJourneyBadge from './StudentJourneyBadge';
import ExamNamesBadge from './ExamNamesBadge';
import { Award, GraduationCap, Clock, Shield, Smile } from 'lucide-react';
import { takeawayPoints } from './hero/feature-highlights/featureData';
import { fadeInStagger, itemVariants } from './hero/feature-highlights/animationVariants';

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
      className="w-full lg:w-1/2 pt-8 lg:pt-0 lg:pr-8"
    >
      <div className="flex flex-wrap gap-2 mb-4">
        <StudentJourneyBadge />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1"
        >
          <span className="animate-pulse-subtle">●</span> NEET is live now!
        </motion.div>
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
        We understand your mindset, not just the exam
      </h1>
      
      <motion.div 
        className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded-lg p-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Your Preparation Challenges</h3>
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
      
      <motion.p 
        className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="font-semibold">From struggling student to exam champion</span> - our AI-driven platform is specially designed for Indian competitive exams like <span className="font-semibold text-indigo-600 dark:text-indigo-400">JEE, NEET, UPSC, CAT</span> and more. Your personalized pathway to success starts here.
      </motion.p>
      
      {/* Key Benefits Section - Enhanced with animations */}
      <motion.div
        variants={fadeInStagger}
        initial="hidden"
        animate="show"
        className="mb-6"
      >
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
          Key Benefits
        </h3>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {takeawayPoints.map((point, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className={`flex items-center px-3 py-2 rounded-full bg-gradient-to-r ${point.color} text-white shadow-sm transform transition-all hover:shadow-md`}
            >
              <span className="mr-2">{point.icon}</span>
              <span className="font-medium text-sm">{point.title}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Exam Names Badge */}
      <ExamNamesBadge />

      {/* New Animated Key Benefits Showcase Before CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mb-6 bg-gradient-to-r from-indigo-50/70 to-purple-50/70 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-xl border border-indigo-100/50 dark:border-indigo-800/30"
      >
        <h4 className="text-base font-semibold text-indigo-700 dark:text-indigo-300 mb-3">
          Why Students Choose Prepzer
        </h4>
        
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {/* Confidence Builder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 4px 12px rgba(139, 92, 246, 0.15)" 
            }}
            className="flex flex-col items-center p-2 rounded-lg bg-white dark:bg-gray-800/60 shadow-sm"
          >
            <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-2">
              <Award size={18} />
            </div>
            <p className="text-xs font-medium text-center">Confidence Builder</p>
          </motion.div>
          
          {/* Exam Success */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)" 
            }}
            className="flex flex-col items-center p-2 rounded-lg bg-white dark:bg-gray-800/60 shadow-sm"
          >
            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2">
              <GraduationCap size={18} />
            </div>
            <p className="text-xs font-medium text-center">Exam Success</p>
          </motion.div>
          
          {/* Time Saver */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 4px 12px rgba(249, 115, 22, 0.15)" 
            }}
            className="flex flex-col items-center p-2 rounded-lg bg-white dark:bg-gray-800/60 shadow-sm"
          >
            <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-2">
              <Clock size={18} />
            </div>
            <p className="text-xs font-medium text-center">Time Saver</p>
          </motion.div>
          
          {/* Stress-Free */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0 }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 4px 12px rgba(139, 92, 246, 0.15)"
            }}
            className="flex flex-col items-center p-2 rounded-lg bg-white dark:bg-gray-800/60 shadow-sm"
          >
            <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-2">
              <Shield size={18} />
            </div>
            <p className="text-xs font-medium text-center">Stress-Free</p>
          </motion.div>
          
          {/* Happy Learning */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 4px 12px rgba(236, 72, 153, 0.15)" 
            }}
            className="flex flex-col items-center p-2 rounded-lg bg-white dark:bg-gray-800/60 shadow-sm"
          >
            <div className="h-8 w-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400 mb-2">
              <Smile size={18} />
            </div>
            <p className="text-xs font-medium text-center">Happy Learning</p>
          </motion.div>
        </div>
      </motion.div>
      
      <HeroButtons onAnalyzeClick={handleExamReadinessClick} />

      {/* Feature checkpoints */}
      <FeatureCheckpoints />
    </motion.div>
  );
};

export default HeroContent;
