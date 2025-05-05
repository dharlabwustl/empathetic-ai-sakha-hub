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
import AchievementsSection from '@/components/home/AchievementsSection';
import FloatingVoiceAnnouncer from '@/components/shared/FloatingVoiceAnnouncer';
import HomepageVoiceAnnouncer from '@/components/home/HomepageVoiceAnnouncer';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { Volume } from 'lucide-react';

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const [showExamAnalyzer, setShowExamAnalyzer] = useState(false);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  
  // Voice announcer hook for automated guidance
  const { speakMessage } = useVoiceAnnouncer();
  
  // Check if user is logged in to decide whether to show HomepageVoiceAnnouncer
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
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

  // Check login status
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    // Speak welcome message when page loads for non-logged in users
    if (!loggedIn) {
      // Small delay before speaking to ensure components are rendered
      const timer = setTimeout(() => {
        speakMessage("Welcome to PREPZR! I'm your AI study assistant. You can explore our features or click on the exam analyzer to assess your readiness. Feel free to ask me any questions by clicking the voice icon.");
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [speakMessage]);

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
        <HeroSection 
          scrollToFeatures={scrollToFeatures}
          scrollToForWhom={() => {}}
          openExamAnalyzer={handleOpenExamAnalyzer}
        />
        
        {/* KPI Stats is inside HeroSection */}
        
        {/* Add the new AchievementsSection right after KPI Stats */}
        <AchievementsSection />
        
        <WhatIsSection />
        
        {/* Add the ChampionMethodologySection right after WhatIsSection */}
        <ChampionMethodologySection />
        
        {/* Add the EcosystemAnimation section after ChampionMethodologySection */}
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
      
      {/* Floating Voice Assistant */}
      <FloatingVoiceAnnouncer 
        isOpen={showVoiceAssistant} 
        onClose={handleCloseVoiceAssistant} 
      />
      
      {/* HomepageVoiceAnnouncer - auto play with shorter delay */}
      <HomepageVoiceAnnouncer autoPlay={!isLoggedIn} delayStart={2000} />
      
      {/* Add a button to easily access voice assistant */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button 
          onClick={handleOpenVoiceAssistant}
          className="rounded-full h-12 w-12 bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg"
          aria-label="Open voice assistant"
        >
          <Volume className="h-6 w-6 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
