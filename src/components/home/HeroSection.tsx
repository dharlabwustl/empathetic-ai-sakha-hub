
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExamReadinessAnalyzer } from './ExamReadinessAnalyzer';
import HeroContent from './hero/HeroContent';
import HeroDashboard from './hero/HeroDashboard';
import ScrollIndicator from './hero/ScrollIndicator';

const HeroSection = () => {
  const [showExamAnalyzer, setShowExamAnalyzer] = useState(false);

  const handleExamReadinessClick = () => {
    setShowExamAnalyzer(true);
  };

  const handleCloseExamAnalyzer = () => {
    setShowExamAnalyzer(false);
  };

  return (
    <section className="relative pt-8 pb-4 overflow-hidden min-h-[calc(100vh-5rem)]">
      {/* Increased padding for better visibility of components */}
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between relative z-10 h-full">
        {/* Left side: Hero content with props to handle exam readiness click */}
        <HeroContent handleExamReadinessClick={handleExamReadinessClick} />

        {/* Right side: Dashboard visualization with increased size */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full lg:w-1/2 mt-8 lg:mt-0 flex justify-end items-center"
        >
          <div className="w-full h-full">
            <HeroDashboard />
          </div>
        </motion.div>
      </div>

      {/* Exam Readiness Analyzer Dialog */}
      {showExamAnalyzer && (
        <ExamReadinessAnalyzer onClose={handleCloseExamAnalyzer} />
      )}

      {/* Scroll indicator at the bottom */}
      <div className="absolute bottom-4 left-0 right-0">
        <ScrollIndicator />
      </div>

      {/* Background glow effects */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-60 -left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default HeroSection;
