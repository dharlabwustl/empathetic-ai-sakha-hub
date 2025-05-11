
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ChevronRight, LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HeroGraphic from './HeroGraphic';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleGetStarted = () => {
    navigate('/signup');
  };

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="relative pt-16 md:pt-24 pb-12 md:pb-20 overflow-hidden bg-gradient-to-b from-white to-blue-50/30 dark:from-gray-900 dark:to-gray-900/90">
      {/* Blue gradient orb in the background */}
      <div 
        className="absolute -top-1/4 -right-1/4 w-2/3 h-2/3 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl"
        aria-hidden="true"
      />
      
      {/* Purple gradient orb in the background */}
      <div 
        className="absolute -bottom-1/4 -left-1/4 w-2/3 h-2/3 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl"
        aria-hidden="true"
      />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left column - Text Content */}
          <motion.div 
            className="flex flex-col items-start space-y-8 md:pr-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span 
              variants={itemVariants}
              className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
            >
              Introducing Prepzr - Your AI Learning Companion
            </motion.span>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent"
            >
              Master Concepts & Ace Exams With AI
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl"
            >
              A personalized AI tutoring system that adapts to your learning style, tracks your progress, and identifies your weaknesses to help you succeed in exams.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Button 
                onClick={handleGetStarted} 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Get Started Free
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => navigate('/about')}
                className="border-gray-300 hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-800/50"
              >
                Learn More
              </Button>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="pt-4 flex items-center text-sm text-gray-500 dark:text-gray-400"
            >
              <span className="font-medium mr-2">Trusted by students and educators</span>
              <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">
                NEET, JEE, CUET
              </span>
            </motion.div>
          </motion.div>
          
          {/* Right column - Hero Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <HeroGraphic />
          </motion.div>
        </div>

        {/* KPI stats have been removed from here as requested */}
      </div>
    </section>
  );
};

export default HeroSection;
