
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HeroContent from './HeroContent';
import DashboardPreview from './DashboardPreview';
import ExamReadinessAssessment from '../assessment/ExamReadinessAssessment';

interface HeroSectionProps {
  onGetStarted?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  const [showAssessment, setShowAssessment] = useState(false);

  const handleExamReadinessClick = () => {
    setShowAssessment(true);
  };

  const handleCloseAssessment = () => {
    setShowAssessment(false);
  };

  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/30 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Primary geometric pattern */}
          <div className="absolute inset-0">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgb(99 102 241 / 0.05)" strokeWidth="1"/>
                </pattern>
                <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(99 102 241 / 0.1)" />
                  <stop offset="50%" stopColor="rgb(139 92 246 / 0.05)" />
                  <stop offset="100%" stopColor="rgb(59 130 246 / 0.1)" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <rect width="100%" height="100%" fill="url(#heroGradient)" />
            </svg>
          </div>

          {/* Floating geometric shapes */}
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl rotate-12 backdrop-blur-sm"
            animate={{
              y: [0, -20, 0],
              rotate: [12, 24, 12],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full backdrop-blur-sm"
            animate={{
              y: [0, 15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />

          <motion.div
            className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-xl rotate-45 backdrop-blur-sm"
            animate={{
              y: [0, -25, 0],
              rotate: [45, 90, 45],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />

          <motion.div
            className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full backdrop-blur-sm"
            animate={{
              x: [0, 20, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
        </div>

        {/* Main Content Container */}
        <div className="relative z-10">
          <div className="container mx-auto px-6 py-12 lg:py-20">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Left Content */}
              <div className="flex-1 order-2 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative"
                >
                  {/* Content backdrop */}
                  <div className="absolute -inset-4 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/20 shadow-2xl" />
                  
                  <div className="relative p-8">
                    <HeroContent handleExamReadinessClick={handleExamReadinessClick} />
                  </div>
                </motion.div>
              </div>

              {/* Right Content - Dashboard Preview */}
              <div className="flex-1 order-1 lg:order-2">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  className="relative"
                >
                  {/* Preview container with enhanced styling */}
                  <div className="relative group">
                    {/* Glow effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    
                    {/* Main preview container */}
                    <div className="relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-2xl rounded-2xl border border-white/30 dark:border-gray-700/30 p-2 shadow-2xl">
                      <DashboardPreview />
                    </div>

                    {/* Decorative elements around preview */}
                    <motion.div
                      className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <span className="text-white font-bold text-lg">✨</span>
                    </motion.div>

                    <motion.div
                      className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg"
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" fill="none" className="w-full h-24">
            <path
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              fill="url(#waveGradient)"
            />
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(99 102 241 / 0.1)" />
                <stop offset="50%" stopColor="rgb(139 92 246 / 0.05)" />
                <stop offset="100%" stopColor="rgb(59 130 246 / 0.1)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </section>

      {/* Assessment Modal */}
      {showAssessment && (
        <ExamReadinessAssessment onClose={handleCloseAssessment} />
      )}
    </>
  );
};

export default HeroSection;
