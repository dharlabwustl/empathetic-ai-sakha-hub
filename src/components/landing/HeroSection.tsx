
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import KpiStats from '@/components/landing/KpiStats';

interface HeroSectionProps {
  scrollToFeatures: () => void;
  scrollToForWhom?: () => void;
  openExamAnalyzer?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  scrollToFeatures, 
  scrollToForWhom, 
  openExamAnalyzer 
}) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleTryExams = () => {
    navigate('/signup');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="relative overflow-hidden pt-16 md:pt-24 lg:pt-28">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-purple-100/20 to-transparent dark:from-purple-900/10 -z-10" />
      <div className="absolute top-40 left-10 w-72 h-72 rounded-full bg-gradient-to-br from-blue-300/10 to-purple-300/20 dark:from-blue-600/10 dark:to-purple-600/20 blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-purple-300/10 to-blue-300/20 dark:from-purple-700/10 dark:to-blue-700/20 blur-3xl -z-10" />
      
      <div className="container px-4 md:px-6">
        <motion.div 
          className="flex flex-col items-center gap-4 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Headline */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-purple-700 via-violet-600 to-blue-600 bg-clip-text text-transparent">
              Your Path to Exam Excellence
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              India's most advanced AI-powered exam preparation platform
            </p>
          </motion.div>

          {/* Subheadings with gradient underlines - each in a separate row */}
          <motion.div variants={itemVariants} className="w-full max-w-3xl space-y-5 my-6">
            <div className="relative">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                Master concepts with personalized AI guidance
              </h2>
              <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full"></div>
            </div>
            
            <div className="relative">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                Practice with AI-generated questions and mock exams
              </h2>
              <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></div>
            </div>
            
            <div className="relative">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                Track your progress with detailed analytics and insights
              </h2>
              <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-indigo-400 to-violet-500 rounded-full"></div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-6 my-6">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg py-6 px-8 rounded-xl"
              onClick={handleGetStarted}
            >
              Get Started Free
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/20 text-purple-700 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-200 shadow-md hover:shadow-lg transition-all duration-300 text-lg py-6 px-8 rounded-xl"
              onClick={scrollToFeatures}
            >
              Explore Features
            </Button>
          </motion.div>
          
          {/* Live Exam Button */}
          <motion.div 
            variants={itemVariants}
            className="mt-6 mb-10 transform hover:scale-105 transition-transform"
          >
            <Button
              variant="default"
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg rounded-xl px-8 py-6 text-lg animate-pulse"
              onClick={handleTryExams}
            >
              Try Live Practice Exams
              <span className="inline-block ml-2 relative">
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                LIVE
              </span>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div variants={itemVariants}>
            <KpiStats />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
