
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
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-30"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-30"
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8">
        <div className="text-center max-w-5xl mx-auto space-y-3">
          {/* India's #1 Platform Text - moved higher and reduced spacing */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-1"
          >
            <p className="text-lg text-gray-600 dark:text-gray-400 font-semibold">
              India's #1 AI-Powered Exam Prep Platform
            </p>
          </motion.div>

          {/* Main Headline - Single row, optimized spacing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-2"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 leading-tight whitespace-nowrap">
              Master Exam Preparation with AI-Powered Precision
            </h1>
          </motion.div>

          {/* Enhanced Subtitle - compact spacing */}
          <motion.div
            className="mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-1">
              We understand your mindset, not just the exam
            </p>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-2 max-w-4xl mx-auto">
              Master JEE, NEET, UPSC, CAT and more with our emotionally intelligent AI that understands your learning style and adapts to your needs.
            </p>
          </motion.div>

          {/* NEET 2026 Banner - positioned after subtitle */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-3"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg border-2 border-white/20">
              <Star className="h-4 w-4 fill-current animate-pulse" />
              NEET 2026 PREP - JOIN NOW!
            </div>
          </motion.div>

          {/* Animated Key Benefits - compact spacing */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              7 Key Benefits That Transform Your Journey
            </h3>
            
            {/* Dynamic Benefit Display */}
            <div className="min-h-[60px] flex items-center justify-center">
              <motion.div
                key={currentBenefitIndex}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.6 }}
                className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-3 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg max-w-md mx-auto"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {benefits[currentBenefitIndex]}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mt-2">
              {benefits.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentBenefitIndex 
                      ? 'bg-blue-600 w-6' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons - prominently positioned */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start 7 Days Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={onAnalyzeClick}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
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
