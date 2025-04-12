
import React from 'react';
import ExamBadges from './hero/ExamBadges';
import PainPoints from './hero/PainPoints';
import ChatInterface from './hero/ChatInterface';
import ScrollIndicator from './hero/ScrollIndicator';
import HeroButtons from './hero/HeroButtons';
import { motion } from "framer-motion";
import ExamNamesBadge from './hero/ExamNamesBadge';

export interface HeroSectionProps {
  scrollToFeatures: () => void;
  scrollToForWhom: () => void;
  openExamAnalyzer: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  scrollToFeatures,
  scrollToForWhom,
  openExamAnalyzer
}) => {
  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
      {/* Hero background decorative elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-pink-200/30 to-purple-300/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-gradient-to-tr from-purple-200/30 to-pink-300/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              India's 1st personalized AI study partner
            </span>{" "}
            <span className="relative">
              for exam success
              <svg 
                className="absolute -bottom-2 left-0 w-full" 
                viewBox="0 0 300 12" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M3 9C50.1667 4.16667 145.9 -1.3 297.5 9" 
                  stroke="url(#paint0_linear)" 
                  strokeWidth="5" 
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient 
                    id="paint0_linear" 
                    x1="3" 
                    y1="9" 
                    x2="297.5" 
                    y2="9" 
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#EC4899" />
                    <stop offset="1" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Sakha AI adapts to your unique learning style, making exam preparation smarter, faster, and stress-free.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <HeroButtons 
              onAnalyzeClick={openExamAnalyzer} 
              scrollToFeatures={scrollToFeatures} 
              scrollToForWhom={scrollToForWhom}
            />
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <ExamNamesBadge />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <ExamBadges />
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white/90 dark:bg-slate-900/90 shadow-lg backdrop-blur-sm p-6 rounded-2xl border border-gray-100 dark:border-gray-800"
          >
            <PainPoints />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-xl rounded-2xl border border-pink-100 dark:border-pink-800 overflow-hidden"
          >
            <ChatInterface />
          </motion.div>
        </div>
        
        <ScrollIndicator />
      </div>
    </section>
  );
};

export default HeroSection;
