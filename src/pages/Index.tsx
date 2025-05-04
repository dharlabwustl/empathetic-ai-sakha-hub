
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

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const [showExamAnalyzer, setShowExamAnalyzer] = useState(false);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  
  // Check if user is logged in to decide whether to show HomepageVoiceAnnouncer
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReturningVisitor, setIsReturningVisitor] = useState(false);
  
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

  // Check login and visitor status
  useEffect(() => {
    // Check login status
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    // Check if returning visitor
    const visitCount = parseInt(localStorage.getItem('visitCount') || '0', 10);
    setIsReturningVisitor(visitCount > 1);
    
    // Update visit count
    localStorage.setItem('visitCount', String(visitCount + 1));
  }, []);

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
      
      {/* HomepageVoiceAnnouncer with different settings based on user status */}
      {<HomepageVoiceAnnouncer 
        autoPlay={!isLoggedIn && !isReturningVisitor} // Only autoplay for first-time visitors who are not logged in
        delayStart={5000} // 5 seconds delay to not interrupt initial user experience
      />}
    </div>
  );
};

export default Index;
