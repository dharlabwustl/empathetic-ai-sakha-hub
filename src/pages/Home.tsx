
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import FeatureSection from '@/components/home/FeatureSection';
import TestimonialSection from '@/components/home/TestimonialSection'; 
import StatisticsSection from '@/components/home/StatisticsSection';
import ExamEcosystemSection from '@/components/home/ExamEcosystemSection';
import SupportSection from '@/components/home/SupportSection';
import HomePageVoiceAssistant from '@/components/voice/HomePageVoiceAssistant';
import ChampionMethodologySection from '@/components/home/ChampionMethodologySection';
import { useState } from 'react';
import FloatingVoiceAssistant from '@/components/voice/FloatingVoiceAssistant';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const navigate = useNavigate();
  
  const handleOpenVoiceAssistant = () => {
    setShowVoiceAssistant(true);
  };
  
  const handleCloseVoiceAssistant = () => {
    setShowVoiceAssistant(false);
  };
  
  const handleNavigationCommand = (route: string) => {
    navigate(route);
  };

  return (
    <MainLayout>
      {/* Voice assistance */}
      <HomePageVoiceAssistant language="en-IN" />
      
      {/* Page content */}
      <HeroSection />
      <FeatureSection />
      <StatisticsSection />
      <ChampionMethodologySection />
      <ExamEcosystemSection />
      <TestimonialSection />
      <SupportSection />
      
      {/* Floating voice assistant button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl flex items-center justify-center"
          onClick={handleOpenVoiceAssistant}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" x2="12" y1="19" y2="22"></line>
          </svg>
          <span className="ml-2 font-medium">Voice Assistant</span>
        </button>
      </div>
      
      {/* Voice assistant dialog */}
      {showVoiceAssistant && (
        <FloatingVoiceAssistant 
          isOpen={showVoiceAssistant} 
          onClose={handleCloseVoiceAssistant}
          onNavigationCommand={handleNavigationCommand}
          language="en-IN"
        />
      )}
    </MainLayout>
  );
};

export default Home;
