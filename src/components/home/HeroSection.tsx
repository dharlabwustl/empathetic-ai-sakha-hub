
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CleanHeroContent from './hero/CleanHeroContent';
import DashboardPreview from './hero/DashboardPreview';
import { ExamReadinessAnalyzer } from './ExamReadinessAnalyzer';
import EnhancedVoiceAssistant from '@/components/voice/EnhancedVoiceAssistant';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [showExamAnalyzer, setShowExamAnalyzer] = useState(false);
  const navigate = useNavigate();
  
  const handleOpenExamAnalyzer = () => {
    setShowExamAnalyzer(true);
  };
  
  const handleCloseExamAnalyzer = () => {
    setShowExamAnalyzer(false);
  };

  const handleNavigationCommand = (route: string) => {
    navigate(route);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 -left-20 w-72 h-72 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <CleanHeroContent onAnalyzeClick={handleOpenExamAnalyzer} />
          </div>
          
          {/* Right Dashboard Preview */}
          <div className="order-1 lg:order-2">
            <DashboardPreview />
          </div>
        </div>
      </div>

      {/* Exam Readiness Analyzer Modal */}
      {showExamAnalyzer && (
        <ExamReadinessAnalyzer onClose={handleCloseExamAnalyzer} />
      )}

      {/* Enhanced Voice Assistant for Home Page */}
      <EnhancedVoiceAssistant 
        userName="Visitor"
        language="en-US"
        onNavigationCommand={handleNavigationCommand}
        position="bottom-right"
        size="medium"
        page="home"
      />
    </section>
  );
};

export default HeroSection;
