
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
import KpiStats from '@/components/home/hero/feature-highlights/KpiStats';
import FloatingVoiceAssistant from '@/components/voice/FloatingVoiceAssistant';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const featuresRef = useRef<HTMLDivElement>(null);
  const [showExamAnalyzer, setShowExamAnalyzer] = useState(false);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  
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
  
  const handleNavigationCommand = (route: string) => {
    navigate(route);
  };

  // Check login status
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
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
        
        {/* Redesigned Impact Section with animation and title */}
        <motion.section 
          className="container mx-auto px-4 py-16"
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
        
        {/* Add proper spacing between sections */}
        <div className="mt-16 pt-8"></div>
        
        {/* Add the AchievementsSection with improved spacing */}
        <div className="relative z-10">
          <AchievementsSection />
        </div>
        
        {/* Add more spacing for the next section */}
        <div className="mt-12"></div>
        
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
      
      {/* Add improved floating voice assistant */}
      <FloatingVoiceAssistant onNavigationCommand={handleNavigationCommand} />
      
      {/* Floating Voice Assistant */}
      <FloatingVoiceAnnouncer 
        isOpen={showVoiceAssistant} 
        onClose={handleCloseVoiceAssistant} 
      />
      
      {/* Add HomepageVoiceAnnouncer for visitors */}
      {<HomepageVoiceAnnouncer autoPlay={!isLoggedIn} delayStart={5000} />}
    </div>
  );
};

export default Index;
