
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Target, TrendingUp, Users, Star, CheckCircle } from 'lucide-react';

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
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 overflow-hidden">
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8">
        <div className="text-center max-w-6xl mx-auto space-y-4">
          {/* India's #1 Platform Text - with reduced margin */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-3"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200/50 dark:border-blue-700/50 px-6 py-3 rounded-full backdrop-blur-sm">
              <Star className="h-4 w-4 text-amber-500 fill-current" />
              <p className="text-lg font-semibold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                India's #1 AI-Powered Exam Prep Platform
              </p>
              <Star className="h-4 w-4 text-amber-500 fill-current" />
            </div>
          </motion.div>

          {/* Main Headline - Enhanced with better spacing and proper line breaking */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              <span className="block bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-2">
                Master Exam Preparation with
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                AI-Powered Precision
              </span>
            </h1>
          </motion.div>

          {/* Enhanced Subtitle - reduced spacing */}
          <motion.div
            className="mb-4"
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

          {/* NEET 2026 Banner - reduced spacing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-5"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-8 py-4 rounded-full text-sm font-bold shadow-2xl border-2 border-white/30 backdrop-blur-sm">
              <Star className="h-5 w-5 fill-current animate-pulse" />
              <span className="text-base">NEET 2026 PREP - JOIN NOW!</span>
              <Star className="h-5 w-5 fill-current animate-pulse" />
            </div>
          </motion.div>

          {/* Animated Key Benefits - compact design */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">
              7 Key Benefits That Transform Your Journey
            </h3>
            
            {/* Dynamic Benefit Display - reduced height */}
            <div className="min-h-[70px] flex items-center justify-center">
              <motion.div
                key={currentBenefitIndex}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -30 }}
                transition={{ duration: 0.8 }}
                className="bg-white/90 dark:bg-slate-800/90 rounded-2xl p-5 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-2xl max-w-md mx-auto"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    {benefits[currentBenefitIndex]}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Progress Dots - enhanced */}
            <div className="flex justify-center gap-3 mt-4">
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
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 text-white px-10 py-6 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-white/20"
            >
              Start 7 Days Free Trial
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={onAnalyzeClick}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-10 py-6 rounded-2xl text-lg font-bold transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
            >
              Exam Readiness & Scholarship Test
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
