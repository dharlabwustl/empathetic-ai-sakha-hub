
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Target, TrendingUp, Users, Star, CheckCircle, Rocket } from 'lucide-react';
import HeroButtons from './hero/HeroButtons';

interface HeroSectionProps {
  onAnalyzeClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onAnalyzeClick }) => {
  const [currentBenefitIndex, setCurrentBenefitIndex] = useState(0);
  
  const benefits = [
    "Save Valuable Time",
    "Stress-Free Learning", 
    "Build Strong Habits",
    "Syllabus-Aligned Content",
    "Boost Your Confidence",
    "Smart Performance Analytics",
    "Exam-Ready Preparation"
  ];

  // Animate through benefits one by one
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBenefitIndex((prev) => (prev + 1) % benefits.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [benefits.length]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 overflow-hidden pt-16">
      {/* Premium Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-purple-100/30" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,white,transparent)]" />
      </div>
      
      {/* Premium Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 right-20 w-16 h-16 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-lg"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-4">
        <div className="text-center max-w-6xl mx-auto space-y-3">
          {/* India's #1 Platform Text - with reduced top spacing */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-2"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200/50 dark:border-blue-700/50 px-6 py-3 rounded-full backdrop-blur-sm">
              <Star className="h-4 w-4 text-amber-500 fill-current" />
              <p className="text-lg font-semibold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                India's #1 AI-Powered Exam Prep Platform
              </p>
              <Star className="h-4 w-4 text-amber-500 fill-current" />
            </div>
          </motion.div>

          {/* Main Headline - Made into one row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-3"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                Master Exam Preparation with AI-Powered Precision
              </span>
            </h1>
          </motion.div>

          {/* Enhanced Subtitle - reduced spacing */}
          <motion.div
            className="mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-purple-700 to-blue-700 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent mb-2">
              We understand your mindset, not just the exam
            </p>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto font-medium">
              Master JEE, NEET, UPSC, CAT and more with our emotionally intelligent AI that understands your learning style and adapts to your needs.
            </p>
          </motion.div>

          {/* Enhanced NEET 2026 Banner with vibrant purple and smaller text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-4"
          >
            <div className="relative inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl border-2 border-white/20 backdrop-blur-sm overflow-hidden">
              {/* Dynamic glowing background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-400 via-violet-400 to-purple-500 rounded-full opacity-70"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.9, 0.5],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Pulsing outer glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-300 to-violet-300 rounded-full blur-md"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="relative z-10 flex items-center gap-2">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Rocket className="h-4 w-4 fill-current" />
                </motion.div>
                <span className="text-sm">NEET 2026 PREP - JOIN NOW!</span>
                <motion.div
                  className="w-1.5 h-1.5 bg-white rounded-full"
                  animate={{ 
                    opacity: [1, 0.3, 1],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity 
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Animated Key Benefits - compact design */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
              7 Key Benefits That Transform Your Journey
            </h3>
            
            {/* Dynamic Benefit Display - reduced height */}
            <div className="min-h-[60px] flex items-center justify-center">
              <motion.div
                key={currentBenefitIndex}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -30 }}
                transition={{ duration: 0.8 }}
                className="bg-white/90 dark:bg-slate-800/90 rounded-2xl p-4 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-2xl max-w-md mx-auto"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    {benefits[currentBenefitIndex]}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Progress Dots - enhanced */}
            <div className="flex justify-center gap-3 mt-3">
              {benefits.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index === currentBenefitIndex 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 w-8' 
                      : 'bg-slate-300 dark:bg-slate-600 w-2'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Premium CTA Buttons - ensured visibility */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <HeroButtons onAnalyzeClick={onAnalyzeClick} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
