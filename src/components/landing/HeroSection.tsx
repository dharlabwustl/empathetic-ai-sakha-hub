
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowRight, FileCheck } from 'lucide-react';

interface HeroSectionProps {
  scrollToFeatures: () => void;
  scrollToForWhom: () => void;
  openExamAnalyzer: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToFeatures, scrollToForWhom, openExamAnalyzer }) => {
  return (
    <section className="relative pt-20 pb-12 overflow-hidden">
      {/* Background gradient and effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50/30 to-white dark:from-purple-900/10 dark:to-background pointer-events-none"></div>
      
      {/* Animated gradient balls */}
      <motion.div 
        className="absolute top-20 right-[5%] w-72 h-72 bg-gradient-to-r from-purple-300/20 to-blue-300/20 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -40, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-10 left-[10%] w-60 h-60 bg-gradient-to-r from-blue-300/10 to-indigo-300/10 rounded-full blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-500 dark:from-purple-400 dark:to-indigo-300 mb-6">
              Revolutionizing NEET Exam Preparation with AI
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            PREPZR supercharges your NEET preparation with personalized study plans, adaptive learning, 
            and in-depth analytics—all powered by cutting-edge AI that adapts to your individual learning style.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <Button 
              onClick={openExamAnalyzer} 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full px-8"
            >
              <FileCheck className="mr-2 h-5 w-5" />
              Test Your Exam Readiness
            </Button>
            
            <Button 
              onClick={scrollToFeatures} 
              variant="outline" 
              size="lg"
              className="rounded-full border-purple-300 dark:border-purple-700 px-8"
            >
              Explore Features
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
        
        {/* Scroll down indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToForWhom}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500 mb-2">Discover More</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowDown className="h-6 w-6 text-purple-500" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
