
import React, { useRef, useState, useEffect } from 'react';
import Header from '@/components/layout/HeaderWithAdmin';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
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
import HomePageVoiceAssistant from '@/components/voice/HomePageVoiceAssistant';
import BackedBySection from '@/components/home/BackedBySection';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';

const Index = () => {
  const navigate = useNavigate();
  const featuresRef = useRef<HTMLDivElement>(null);
  const [showExamAnalyzer, setShowExamAnalyzer] = useState(false);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const { theme, setTheme } = useTheme();
  
  const scrollToFeatures = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleOpenExamAnalyzer = () => {
    setShowExamAnalyzer(true);
  };
  
  const handleCloseExamAnalyzer = () => {
    setShowExamAnalyzer(false);
  };
  
  const handleOpenVoiceAssistant = () => {
    setShowVoiceAssistant(true);
  };
  
  const handleCloseVoiceAssistant = () => {
    setShowVoiceAssistant(false);
  };
  
  const handleNavigationCommand = (route: string) => {
    navigate(route);
  };

  // Listen for events
  useEffect(() => {
    const handleExamAnalyzerEvent = () => {
      setShowExamAnalyzer(true);
    };
    
    const handleVoiceAssistantEvent = () => {
      setShowVoiceAssistant(true);
    };
    
    window.addEventListener('open-exam-analyzer', handleExamAnalyzerEvent);
    document.addEventListener('open-voice-assistant', handleVoiceAssistantEvent as EventListener);
    
    return () => {
      window.removeEventListener('open-exam-analyzer', handleExamAnalyzerEvent);
      document.removeEventListener('open-voice-assistant', handleVoiceAssistantEvent as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background overflow-hidden">
      <Header />
      
      <main>
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
        
        <EcosystemAnimation />
        
        <div ref={featuresRef}>
          <FeaturesSection />
        </div>
        
        <ExamPreparationSection />
        
        {showExamAnalyzer && <ExamReadinessAnalyzer onClose={handleCloseExamAnalyzer} />}
        
        <StudentBenefitsSection />
        
        <VideoSection />
        
        <FounderSection />
        
        <FoundingTeamSection />
        
        <CallToAction />
      </main>
      
      <Footer>
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {theme === "light" ? (
              <MoonIcon className="h-5 w-5" />
            ) : (
              <SunIcon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </button>
        </div>
      </Footer>
      
      {/* Enhanced home page voice assistant with improved Indian English guidance */}
      <HomePageVoiceAssistant language="en-IN" />
    </div>
  );
};

export default Index;
