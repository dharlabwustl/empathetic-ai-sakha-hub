import React from 'react';
import PainPoints from './hero/PainPoints';
import ChatInterface from './hero/ChatInterface';
import ScrollIndicator from './hero/ScrollIndicator';
import HeroButtons from './HeroButtons';
import { motion } from "framer-motion";
import ExamNamesBadge from './hero/ExamNamesBadge';
import KeyFeatures from '../landing/KeyFeatures';
import PlatformStrengths from '../landing/PlatformStrengths';
import OnboardingSection from './OnboardingSection';
import KpiStats from './hero/feature-highlights/KpiStats';

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
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-blue-300/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-gradient-to-tr from-blue-200/30 to-purple-300/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              अब तैयारी करो अपने तरीके से, सिर्फ PREPZR के साथ!
            </span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            We understand Your Mindset, Not Just the Exam.{" "}
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 font-bold"
              animate={{ 
                scale: [1, 1.1, 1],
                color: ["#9333ea", "#ec4899", "#9333ea"]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              Ace your exams. Save time. Stress less. Study smarter.
            </motion.span>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <HeroButtons 
              scrollToFeatures={scrollToFeatures} 
              scrollToForWhom={scrollToForWhom}
              openExamAnalyzer={openExamAnalyzer}
            />
          </motion.div>
        </div>
        
        {/* Exam Names Badge - Now positioned directly after the hero intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-6"
        >
          <ExamNamesBadge />
        </motion.div>

        {/* KPI Stats Section - Right after ExamNamesBadge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12"
        >
          <KpiStats />
        </motion.div>
        
        {/* Key Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-12"
        >
          <KeyFeatures />
        </motion.div>
        
        {/* Platform Strengths Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-12"
        >
          <PlatformStrengths />
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="bg-white/90 dark:bg-slate-900/90 shadow-lg backdrop-blur-sm p-6 rounded-2xl border border-gray-100 dark:border-gray-800"
          >
            <PainPoints />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-xl rounded-2xl border border-purple-100 dark:border-purple-800 overflow-hidden"
          >
            <ChatInterface />
          </motion.div>
        </div>
        
        {/* Add the OnboardingSection */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <OnboardingSection />
        </motion.div>
        
        <ScrollIndicator />
      </div>
    </section>
  );
};

export default HeroSection;
