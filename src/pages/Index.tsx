
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
import FloatingVoiceAssistant from '@/components/voice/FloatingVoiceAssistant';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HomePageVoiceAssistant from '@/components/voice/HomePageVoiceAssistant';
import BackedBySection from '@/components/home/BackedBySection';
import ChampionMethodologySection from '@/components/home/ChampionMethodologySection';

const Index = () => {
  const navigate = useNavigate();
  const featuresRef = useRef<HTMLDivElement>(null);
  const [showExamAnalyzer, setShowExamAnalyzer] = useState(false);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  
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
          
          {/* Donation message */}
          <div className="mt-8 text-center max-w-3xl mx-auto">
            <div className="bg-purple-50 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300 p-4 rounded-lg border border-purple-100 dark:border-purple-800/30">
              <span className="font-medium">Making a difference together:</span> We donate 5% of monthly subscription revenue to fund underprivileged students, providing them free access to our platform.
            </div>
          </div>
        </motion.section>
        
        {/* Backed By Section with partner logos */}
        <BackedBySection />
        
        {/* Add proper spacing between sections */}
        <div className="pt-12"></div>
                
        <WhatIsSection />
        
        {/* Champion Methodology Section */}
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
        
        {/* Subscription section with donation message */}
        <motion.section 
          className="container mx-auto px-4 py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Choose the Plan That's Right for You
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Unlock your full potential with our flexible subscription plans designed to fit your needs.
            </p>
            <div className="mt-6 bg-purple-50 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300 p-4 rounded-lg inline-block border border-purple-100 dark:border-purple-800/30">
              <span className="font-semibold">Making a difference together:</span> We donate 5% of monthly subscription revenue to fund underprivileged students, providing them free access to our platform.
            </div>
          </div>
          
          {/* Add subscription plan content here or link to subscription page */}
          <div className="flex justify-center mt-8">
            <Button 
              variant="default"
              size="lg"
              onClick={() => navigate('/subscription')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all"
            >
              View All Plans
            </Button>
          </div>
        </motion.section>
        
        <CallToAction />
      </main>
      
      <Footer />
      
      {/* Enhanced homepage voice assistant with improved Indian English guidance */}
      <HomePageVoiceAssistant language="en-IN" />
      
      {/* Floating Voice Assistant button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={handleOpenVoiceAssistant}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" x2="12" y1="19" y2="22"></line>
          </svg>
          <span className="ml-2 font-medium">Voice Assistant</span>
        </motion.button>
      </div>
      
      {/* Enhanced Floating Voice Assistant with settings panel */}
      {showVoiceAssistant && (
        <FloatingVoiceAssistant 
          isOpen={showVoiceAssistant} 
          onClose={handleCloseVoiceAssistant}
          onNavigationCommand={handleNavigationCommand}
          language="en-IN"  // Default to Indian English
        />
      )}
    </div>
  );
};

export default Index;
