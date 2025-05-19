
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
import StudentJourneyCarousel from '@/components/home/StudentJourneyCarousel';
import { useState } from 'react';
import FloatingVoiceAssistant from '@/components/voice/FloatingVoiceAssistant';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import ImmersiveJourneyPath from '@/components/home/ImmersiveJourneyPath';
import ImmersiveStudentExperience from '@/components/home/ImmersiveStudentExperience';

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
      
      {/* Immersive Student Experience - New Component */}
      <ImmersiveStudentExperience />
      
      {/* Student Journey Carousel */}
      <StudentJourneyCarousel />
      
      {/* Immersive Journey Path - New Component */}
      <ImmersiveJourneyPath />
      
      {/* Donation Message Banner for Subscription Section */}
      <div className="container mx-auto px-4 my-8">
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 dark:border-blue-800/30">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="bg-purple-100 dark:bg-purple-900/40 p-3 rounded-full">
              <Heart className="h-6 w-6 text-purple-500 dark:text-purple-300 fill-purple-200 dark:fill-purple-800" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1 text-purple-600 dark:text-purple-300">Making a difference together</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                We donate 5% of monthly subscription revenue to fund underprivileged students,
                providing them free access to our platform.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <FeatureSection />
      <StatisticsSection />
      <ChampionMethodologySection />
      <ExamEcosystemSection />
      <TestimonialSection />
      <SupportSection />
      
      {/* Floating voice assistant button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
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
