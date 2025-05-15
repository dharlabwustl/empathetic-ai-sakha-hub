
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HeroButtons from "@/components/home/hero/HeroButtons";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  scrollToFeatures: () => void;
  scrollToForWhom: () => void;
  openExamAnalyzer: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToFeatures, scrollToForWhom, openExamAnalyzer }) => {
  const navigate = useNavigate();
  const isMobileOrTablet = useMediaQuery("(max-width: 1024px)");
  const [exploreFeatures, setExploreFeatures] = useState(false);
  
  const handleExploreFeatures = () => {
    setExploreFeatures(true);
    scrollToFeatures();
  };
  
  const handleAnalyzeClick = () => {
    openExamAnalyzer();
  };

  const handleFreeTrialClick = () => {
    navigate('/signup');
  };

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-950 pt-16 md:pt-20">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 mb-6 inline-block"
          >
            Master Your Exam Preparation
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mx-auto max-w-2xl text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10"
          >
            Your AI-powered study companion that adapts to your learning style and helps you achieve your academic goals.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Button 
              onClick={handleAnalyzeClick}
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg px-8 py-6 text-lg font-medium rounded-xl"
            >
              Exam Readiness Analyzer
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              onClick={handleFreeTrialClick}
              size="lg"
              variant="outline" 
              className="border-2 border-purple-400 text-purple-700 hover:bg-purple-50 dark:text-purple-300 dark:hover:bg-purple-900/20 px-8 py-6 text-lg font-medium rounded-xl"
            >
              7 Days Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <HeroButtons 
              scrollToFeatures={handleExploreFeatures}
              onAnalyzeClick={handleAnalyzeClick}
            />
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 sm:mt-24 relative max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
            <div className="bg-gray-100 dark:bg-gray-800 h-12 flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <div className="mx-auto text-sm text-gray-500 dark:text-gray-400">
                Prepzr Dashboard
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 aspect-[16/9] sm:aspect-[16/8]">
              <img 
                src="/img/dashboard-preview.png" 
                alt="Prepzr Dashboard Preview" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute -top-40 -left-40 h-80 w-80 bg-purple-300 dark:bg-purple-900/30 rounded-full filter blur-3xl opacity-30 mix-blend-multiply dark:mix-blend-soft-light animate-blob" />
          <div className="absolute -bottom-40 -right-40 h-80 w-80 bg-indigo-300 dark:bg-indigo-900/30 rounded-full filter blur-3xl opacity-30 mix-blend-multiply dark:mix-blend-soft-light animate-blob animation-delay-2000" />
          <div className="absolute top-1/4 left-1/3 h-80 w-80 bg-pink-300 dark:bg-pink-900/30 rounded-full filter blur-3xl opacity-20 mix-blend-multiply dark:mix-blend-soft-light animate-blob animation-delay-4000" />
        </motion.div>
      </div>
      
      {/* Gradient background */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>
    </div>
  );
};

export default HeroSection;
