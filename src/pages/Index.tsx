
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
import InteractiveVoiceAssistant from '@/components/voice/InteractiveVoiceAssistant';
import EnhancedHomePageVoiceAssistant from '@/components/voice/EnhancedHomePageVoiceAssistant';
import SpeechRecognitionButton from '@/components/voice/SpeechRecognitionButton';
import { Button } from '@/components/ui/button';
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
      
      {/* NEET 2026 Live Button - Top positioned */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
        <Button 
          className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold px-6 py-3 rounded-full shadow-lg animate-pulse"
          onClick={() => navigate('/neet-2026-live')}
        >
          🏆 Take NEET 2026 Live Test - India's #1 Platform
        </Button>
      </div>
      
      {/* Voice Recognition and Assistant positioned together */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3 items-end">
        {/* Speech Recognition Button - on top */}
        <div className="relative">
          <SpeechRecognitionButton 
            context="homepage"
            className="shadow-lg bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full"
            onCommand={handleNavigationCommand}
          />
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Voice
          </div>
        </div>
        
        {/* Voice Assistant positioned below */}
        <div className="relative">
          <EnhancedHomePageVoiceAssistant language="en-US" />
          <InteractiveVoiceAssistant 
            userName="Visitor"
            language="en-US"
            onNavigationCommand={handleNavigationCommand}
            position="bottom-right"
          />
        </div>
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
    </div>
  );
};

export default Index;
