
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
      
      {/* 5 KEY POINTS SECTION - HIGHLY VISIBLE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mb-8 p-3 bg-white dark:bg-gray-800 rounded-xl border-2 border-purple-300 dark:border-purple-500/30 shadow-lg"
      >
        <h2 className="text-center text-xl font-bold mb-5 text-purple-700 dark:text-purple-400 underline decoration-wavy decoration-purple-400 underline-offset-4">
          5 KEY BENEFITS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg flex flex-col items-center text-center border border-green-200 dark:border-green-800/50">
            <div className="bg-green-500 p-3 rounded-full mb-2">
              <Award size={24} className="text-white" />
            </div>
            <span className="font-bold text-green-700 dark:text-green-400">Confidence Builder</span>
          </div>
          
          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg flex flex-col items-center text-center border border-blue-200 dark:border-blue-800/50">
            <div className="bg-blue-500 p-3 rounded-full mb-2">
              <GraduationCap size={24} className="text-white" />
            </div>
            <span className="font-bold text-blue-700 dark:text-blue-400">Exam Success</span>
          </div>
          
          <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg flex flex-col items-center text-center border border-amber-200 dark:border-amber-800/50">
            <div className="bg-amber-500 p-3 rounded-full mb-2">
              <Clock size={24} className="text-white" />
            </div>
            <span className="font-bold text-amber-700 dark:text-amber-400">Time Saver</span>
          </div>
          
          <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg flex flex-col items-center text-center border border-purple-200 dark:border-purple-800/50">
            <div className="bg-purple-500 p-3 rounded-full mb-2">
              <Shield size={24} className="text-white" />
            </div>
            <span className="font-bold text-purple-700 dark:text-purple-400">Stress-Free</span>
          </div>
          
          <div className="bg-pink-100 dark:bg-pink-900/30 p-4 rounded-lg flex flex-col items-center text-center border border-pink-200 dark:border-pink-800/50">
            <div className="bg-pink-500 p-3 rounded-full mb-2">
              <Smile size={24} className="text-white" />
            </div>
            <span className="font-bold text-pink-700 dark:text-pink-400">Happy Learning</span>
          </div>
        </div>
      </motion.div>
      
      {/* Exam Names Badge */}
      <ExamNamesBadge />
      
      <HeroButtons onAnalyzeClick={handleExamReadinessClick} />

      {/* Feature checkpoints */}
      <FeatureCheckpoints />
    </motion.div>
  );
};

export default HeroContent;
