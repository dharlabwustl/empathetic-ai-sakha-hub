
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
import KpiStats from '@/components/home/hero/feature-highlights/KpiStats';
import FloatingVoiceAssistant from '@/components/voice/FloatingVoiceAssistant';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HomePageVoiceAssistant from '@/components/voice/HomePageVoiceAssistant';

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
        
        {/* Impact Section with animation and KPI stats - REMOVED DUPLICATE HEADING */}
        <motion.section 
          className="container mx-auto px-4 py-16 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <KpiStats />
        </motion.section>
        
        {/* Improved spacing between sections */}
        <div className="pt-20"></div>
        
        {/* Add the AchievementsSection with improved spacing and z-index */}
        <div className="relative z-10 mt-16 mb-32">
          <AchievementsSection />
        </div>
        
        <WhatIsSection />
        
        <ChampionMethodologySection />
        
        <div className="py-12"></div>
        
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
      
      {/* Enhanced homepage voice assistant with improved guidance */}
      <HomePageVoiceAssistant />
      
      {/* Floating Voice Assistant */}
      <FloatingVoiceAnnouncer 
        isOpen={showVoiceAssistant} 
        onClose={handleCloseVoiceAssistant} 
      />
    </div>
  );
};

export default Index;
