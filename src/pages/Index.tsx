
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
import AuthGuard from '@/components/auth/AuthGuard';
import { FloatingVoiceButton } from '@/components/voice/EnhancedVoiceCircle';
import HomepageVoiceAssistant from '@/components/voice/HomepageVoiceAssistant';

const Index = () => {
  const navigate = useNavigate();
  const [showExamAnalyzer, setShowExamAnalyzer] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
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
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background overflow-hidden">
        <Header />
        
        <main>
          {/* Enhanced 3D hero section with voice interaction */}
          <HeroSection onAnalyzeClick={handleOpenExamAnalyzer} />
          
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
        
        {/* Homepage Voice Assistant */}
        <HomepageVoiceAssistant onSpeakingChange={setIsSpeaking} />

        {/* Enhanced Floating Voice Button with context awareness */}
        <FloatingVoiceButton 
          isSpeaking={isSpeaking}
          onClick={() => {
            // Dispatch custom event to invoke voice assistant
            window.dispatchEvent(new CustomEvent('invoke-voice-assistant'));
          }}
        />
      </div>
    </AuthGuard>
  );
};

export default Index;
