
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/HeaderWithAdmin';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import WhatIsSection from '@/components/home/WhatIsSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ExamPreparationSection from '@/components/home/ExamPreparationSection';
import StudentBenefitsSection from '@/components/home/StudentBenefitsSection';
import CallToAction from '@/components/home/CallToAction';
import FounderSection from '@/components/home/FounderSection';
import VideoSection from '@/components/home/VideoSection';
import { ExamReadinessAnalyzer } from '@/components/home/ExamReadinessAnalyzer';
import FoundingTeamSection from '@/components/home/FoundingTeamSection';
import EcosystemAnimation from '@/components/home/EcosystemAnimation';
import KpiStats from '@/components/home/hero/feature-highlights/KpiStats';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BackedBySection from '@/components/home/BackedBySection';
import ChampionMethodologySection from '@/components/home/ChampionMethodologySection';
import SpeechRecognitionButton from '@/components/dashboard/student/SpeechRecognitionButton';
import EnhancedHomePageVoiceAssistant from '@/components/voice/EnhancedHomePageVoiceAssistant';
import { Mic } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [showExamAnalyzer, setShowExamAnalyzer] = useState(false);
  
  const handleOpenExamAnalyzer = () => {
    setShowExamAnalyzer(true);
  };
  
  const handleCloseExamAnalyzer = () => {
    setShowExamAnalyzer(false);
  };
  
  const handleNavigationCommand = (route: string) => {
    navigate(route);
  };

  // Listen for events
  useEffect(() => {
    const handleExamAnalyzerEvent = () => {
      setShowExamAnalyzer(true);
    };
    
    window.addEventListener('open-exam-analyzer', handleExamAnalyzerEvent);
    
    return () => {
      window.removeEventListener('open-exam-analyzer', handleExamAnalyzerEvent);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background overflow-hidden">
      <Header />
      
      {/* Speech Recognition and Voice Assistant - Fixed positioning */}
      <div className="fixed top-24 right-6 z-50 flex flex-col gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SpeechRecognitionButton 
            context="homepage"
            size="lg"
            className="shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
        >
          <Mic className="h-6 w-6 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
        </motion.div>
      </div>
      
      <main>
        {/* Enhanced 3D hero section with voice interaction */}
        <HeroSection />
        
        {/* Smart Data section with animation and KPI stats */}
        <motion.section 
          className="container mx-auto px-4 py-16 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Smart Data. Real Impact. Humanizing exam prep.
            </h2>
          </div>
          <KpiStats />
        </motion.section>
        
        {/* Backed By Section with partner logos */}
        <BackedBySection />
        
        {/* Add proper spacing between sections */}
        <div className="pt-12"></div>
                
        <WhatIsSection />
        
        {/* Champion Methodology Section */}
        <ChampionMethodologySection />
        
        <EcosystemAnimation />
        
        <FeaturesSection />
        
        <ExamPreparationSection />
        
        {showExamAnalyzer && <ExamReadinessAnalyzer onClose={handleCloseExamAnalyzer} />}
        
        <StudentBenefitsSection />
        
        <VideoSection />
        
        <FounderSection />
        
        <FoundingTeamSection />
        
        <CallToAction />
      </main>
      
      <Footer />
      
      {/* Enhanced Voice Assistant for Homepage - positioned at bottom right */}
      <div className="fixed bottom-6 right-6 z-40">
        <EnhancedHomePageVoiceAssistant 
          language="en-US"
        />
      </div>
    </div>
  );
};

export default Index;
