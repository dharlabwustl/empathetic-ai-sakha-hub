
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
import ChampionMethodologySection from '@/components/home/ChampionMethodologySection';
import KpiStats from '@/components/home/hero/feature-highlights/KpiStats';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FloatingVoiceAssistant from '@/components/voice/FloatingVoiceAssistant';
import BackedBySection from '@/components/home/BackedBySection';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';

const Index = () => {
  const navigate = useNavigate();
  const featuresRef = useRef<HTMLDivElement>(null);
  const [showExamAnalyzer, setShowExamAnalyzer] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  
  // Initialize voice announcer
  const { speakMessage, voiceSettings } = useVoiceAnnouncer({
    initialSettings: { 
      language: 'en-IN',
      enabled: true,
      muted: false
    }
  });
  
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
  
  const handleNavigationCommand = (route: string) => {
    navigate(route);
  };

  // Welcome message after page load
  useEffect(() => {
    if (!hasGreeted && voiceSettings.enabled && !voiceSettings.muted) {
      const timer = setTimeout(() => {
        const welcomeMessage = "Namaste! Welcome to PREPZR. I'm your AI voice assistant with an Indian accent. I can help you explore our NEET preparation platform designed specifically for Indian medical entrance exams. Click the Test Your Exam Readiness button to assess your preparedness, or explore our features to see how we can help you succeed.";
        speakMessage(welcomeMessage);
        setHasGreeted(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [hasGreeted, speakMessage, voiceSettings.enabled, voiceSettings.muted]);

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
      
      <main>
        <HeroSection 
          scrollToFeatures={scrollToFeatures}
          scrollToForWhom={() => {}}
          openExamAnalyzer={handleOpenExamAnalyzer}
        />
        
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
        
        <ChampionMethodologySection />
        
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
      
      <Footer />
      
      {/* Enhanced floating voice assistant with Indian English support */}
      <FloatingVoiceAssistant language="en-IN" />
    </div>
  );
};

export default Index;
