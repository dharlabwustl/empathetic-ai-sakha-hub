
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
import UltraFastSpeechRecognition from '@/components/voice/UltraFastSpeechRecognition';
import IntelligentHomepageAssistant from '@/components/voice/IntelligentHomepageAssistant';

const Index = () => {
  const navigate = useNavigate();
  const [showExamAnalyzer, setShowExamAnalyzer] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const handleOpenExamAnalyzer = () => {
    setShowExamAnalyzer(true);
  };
  
  const handleCloseExamAnalyzer = () => {
    setShowExamAnalyzer(false);
  };

  const handleSpeechCommand = (command: string) => {
    console.log('Homepage speech command received:', command);
  };

  const handleStopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
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
          {/* Enhanced 3D hero section */}
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
        
        {/* Ultra-fast Speech Recognition with manual activation */}
        <UltraFastSpeechRecognition
          onCommand={handleSpeechCommand}
          onListeningChange={setIsListening}
          onStopSpeaking={handleStopSpeaking}
          language="en-US"
          continuous={false}
          enabled={true}
          manualActivation={true}
        />
        
        {/* Intelligent Homepage Voice Assistant */}
        <IntelligentHomepageAssistant 
          language="en-US"
          onSpeakingChange={setIsSpeaking}
          isMicrophoneActive={isListening}
        />

        {/* Enhanced Floating Voice Button with microphone functionality */}
        <div className="fixed bottom-6 right-6 z-40">
          <FloatingVoiceButton 
            isSpeaking={isSpeaking}
            isListening={isListening}
            className="cursor-pointer"
          />
        </div>
      </div>
    </AuthGuard>
  );
};

export default Index;
