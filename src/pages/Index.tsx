
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
import { motion } from 'framer-motion';
import ImpactSection from '@/components/home/ImpactSection';

const Index = () => {
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
        
        {/* Smart Data. Real Impact. Section with new title */}
        <motion.section 
          className="container mx-auto px-4 py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-2"
            >
              Smart Data. Real Impact.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Humanizing exam prep.
            </motion.p>
          </div>
          
          <ImpactSection />
        </motion.section>
        
        {/* Add the AchievementsSection right after Impact section */}
        <AchievementsSection />
        
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
      
      {/* Floating Voice Assistant */}
      <FloatingVoiceAnnouncer 
        isOpen={showVoiceAssistant} 
        onClose={handleCloseVoiceAssistant}
        userName="Student" 
      />
      
      {/* Add HomepageVoiceAnnouncer for visitors */}
      {<HomepageVoiceAnnouncer autoPlay={!isLoggedIn} delayStart={5000} />}
    </div>
  );
};

export default Index;
