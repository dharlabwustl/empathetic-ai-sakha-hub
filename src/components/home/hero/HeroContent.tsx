
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ExamNamesBadge from './ExamNamesBadge';

interface HeroContentProps {
  handleExamReadinessClick: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ handleExamReadinessClick }) => {
  const navigate = useNavigate();
  
  const keyBenefits = [
    "Build unshakable confidence",
    "Study stress-free with AI guidance",
    "Master complex topics faster",
    "Improving exam readiness score everyday",
    "Track progress with clear metrics"
  ];

  const handleFreeTrialClick = () => {
    navigate('/signup');
  };
  
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
          <span className="font-bold text-sm">PREMIUM</span>
        </div>
      </motion.div>

      {/* Welcome message with animated text */}
      <motion.div
        className="flex flex-col gap-2 mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.div
          className="text-lg font-semibold relative overflow-hidden inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Animated welcome text */}
          <motion.span 
            className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent inline-block"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            Welcome to PREPZR - Tomorrow's learning experience
          </motion.span>
          
          {/* Animated underline */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500"
            initial={{ scaleX: 0, transformOrigin: "left" }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
          />
          
          {/* Animated particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full w-1 h-1 bg-blue-400"
              style={{
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                repeatDelay: Math.random()
              }}
            />
          ))}
        </motion.div>
        
        <div className="flex gap-2">
          <motion.div 
            className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2 shadow-md"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="inline-block h-2 w-2 rounded-full bg-white animate-pulse"></span>
            NEET Exam Preparation Live Now!
          </motion.div>
          
          <motion.div 
            className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <span className="mr-1">New</span>
            AI Study companion
          </motion.div>
        </div>
      </motion.div>
      
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
            We understand your mindset,
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
          not just the exam
        </motion.span>
      </motion.h1>

      {/* Emotional Connection Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mb-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg p-3 border border-indigo-100 dark:border-indigo-800/30 shadow-inner"
      >
        <p className="text-base text-gray-700 dark:text-gray-300">
          Our <span className="font-semibold text-indigo-700 dark:text-indigo-400">AI-driven platform</span> is specifically designed for Indian competitive exams like 
          <span className="font-semibold text-purple-700 dark:text-purple-400"> NEET, JEE, UPSC, and CAT</span>.
        </p>
      </motion.div>
      
      {/* Key benefits section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800/30"
      >
        <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-2">Key Benefits:</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {keyBenefits.map((benefit, idx) => (
            <motion.li
              key={idx}
              className="flex items-center text-sm text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + (idx * 0.1) }}
            >
              <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
              <span>{benefit}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
      
      {/* Improved Exam Names Badge */}
      <ExamNamesBadge />

      {/* CTA Buttons */}
      <div className="space-y-4 mt-6">
        {/* Primary CTA */}
        <motion.button
          onClick={handleFreeTrialClick}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
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
          onClick={handleExamReadinessClick}
          className="w-full border-2 border-purple-300 hover:border-purple-400 dark:border-purple-700 dark:hover:border-purple-600 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 py-3 px-6 rounded-xl flex items-center justify-center"
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
      
      {/* Active Users */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="mt-4 text-center"
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Join <span className="font-medium text-indigo-600 dark:text-indigo-400">2 million+</span> students already on their path to success
        </p>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
