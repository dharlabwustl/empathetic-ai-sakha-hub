
import React from 'react';
import { motion } from 'framer-motion';
import HeroContent from './HeroContent';
import HeroDashboard from './HeroDashboard';

interface HeroSectionProps {
  onExamReadinessClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onExamReadinessClick }) => {
  const handleExamReadinessClick = () => {
    if (onExamReadinessClick) {
      onExamReadinessClick();
    } else {
      // Fallback: dispatch event for global listener
      window.dispatchEvent(new Event('open-exam-analyzer'));
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-background">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-indigo-50/30 dark:from-blue-950/30 dark:via-purple-950/20 dark:to-indigo-950/30" />
        
        {/* Animated background elements */}
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main Hero Container */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 min-h-[90vh]">
          {/* Left side - Hero Content */}
          <HeroContent handleExamReadinessClick={handleExamReadinessClick} />
          
          {/* Right side - Dashboard Preview - Made larger */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full lg:w-1/2 flex justify-center items-center h-full"
          >
            <div className="w-full max-w-2xl h-[90vh] flex items-center justify-center">
              <HeroDashboard />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
