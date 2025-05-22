
import React from 'react';
import { motion } from 'framer-motion';
import HeroButtons from './HeroButtons';
import FeatureCheckpoints from './FeatureCheckpoints';
import StudentJourneyBadge from './StudentJourneyBadge';
import ExamNamesBadge from './ExamNamesBadge';
import { Sparkles, CheckCircle2, BrainCircuit, Lightbulb, Award, Star, Rocket } from 'lucide-react';

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
      {/* Premium Experience Badge */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="absolute -top-2 -right-2 md:top-0 md:-right-8 z-30 transform rotate-12"
      >
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-1 rounded-lg shadow-lg flex items-center gap-2">
          <Award className="h-5 w-5 text-amber-100" />
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
        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3"
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
        className="mb-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg p-4 border border-indigo-100 dark:border-indigo-800/30 shadow-inner"
      >
        <div className="flex items-start gap-3">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-full shadow-lg mt-0.5">
            <Lightbulb className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-700 dark:from-indigo-400 dark:to-purple-400">
              Your Exam Journey Reimagined
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              At PREPZR, we understand the emotional rollercoaster of exam preparation. Our AI-powered system <span className="font-semibold text-indigo-700 dark:text-indigo-400">adapts to your learning style</span>, providing personalized support when you need it most.
            </p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="mb-4 bg-red-50/80 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded-lg p-3 shadow-sm"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-base font-semibold text-red-600 dark:text-red-400 mb-1 flex items-center">
          <BrainCircuit className="mr-2 h-5 w-5" />
          Your Preparation Challenges
        </h3>
        <ul className="space-y-1">
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
        <span className="font-semibold">From struggling student to exam champion</span> - our AI-driven platform is specially designed for Indian competitive exams like <span className="font-semibold text-indigo-600 dark:text-indigo-400">JEE, NEET, UPSC, CAT</span> and more. Your personalized pathway to success starts with <motion.span 
          className="text-indigo-600 dark:text-indigo-400 font-bold"
          animate={{ 
            textShadow: [
              "0 0 0 rgba(79, 70, 229, 0)", 
              "0 0 10px rgba(79, 70, 229, 0.5)", 
              "0 0 0 rgba(79, 70, 229, 0)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >PREPZR</motion.span>.
      </motion.p>

      {/* Success Stories Callout */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mb-5 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800/30"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-green-100 dark:bg-green-800/50 p-1.5 rounded-full">
            <Star className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <h4 className="font-semibold text-green-700 dark:text-green-400">Success Stories</h4>
        </div>
        <p className="text-sm text-green-800 dark:text-green-300 italic">
          "The emotional support and personalized guidance from PREPZR helped me overcome my anxiety and crack NEET in my first attempt!"
          <span className="block mt-1 text-xs font-medium">— Priya K, AIIMS Delhi</span>
        </p>
      </motion.div>
      
      {/* Quick Stats */}
      <motion.div
        className="flex flex-wrap gap-3 mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div 
          className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30 rounded-full py-1 px-3"
          whileHover={{ scale: 1.05 }}
        >
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span className="text-sm text-green-700 dark:text-green-300 font-medium">92% improved scores</span>
        </motion.div>
        <motion.div 
          className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 rounded-full py-1 px-3"
          whileHover={{ scale: 1.05 }}
        >
          <CheckCircle2 className="h-4 w-4 text-indigo-500" />
          <span className="text-sm text-indigo-700 dark:text-indigo-300 font-medium">50000+ success stories</span>
        </motion.div>
        <motion.div 
          className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 rounded-full py-1 px-3"
          whileHover={{ scale: 1.05 }}
        >
          <CheckCircle2 className="h-4 w-4 text-amber-500" />
          <span className="text-sm text-amber-700 dark:text-amber-300 font-medium">2.5x study efficiency</span>
        </motion.div>
      </motion.div>
      
      {/* CTA buttons - moved up for immediate visibility */}
      <HeroButtons onAnalyzeClick={handleExamReadinessClick} />
      
      {/* Exam Names Badge */}
      <ExamNamesBadge />

      {/* Feature checkpoints */}
      <FeatureCheckpoints />

      {/* Emotional Support Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-5 flex items-center gap-3 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/30 p-2 pl-3 pr-4 rounded-full border border-purple-200 dark:border-purple-800/30 shadow-sm"
      >
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-1 rounded-full">
          <Rocket className="h-4 w-4 text-white" />
        </div>
        <p className="text-xs font-medium text-purple-700 dark:text-purple-300">
          Emotional wellbeing & academic excellence: the PREPZR promise
        </p>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
