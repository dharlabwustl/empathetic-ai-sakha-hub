
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import FeatureSection from '@/components/home/FeatureSection';
import TestimonialSection from '@/components/home/TestimonialSection'; 
import StatisticsSection from '@/components/home/StatisticsSection';
import ExamEcosystemSection from '@/components/home/ExamEcosystemSection';
import SupportSection from '@/components/home/SupportSection';
import HomePageVoiceAssistant from '@/components/voice/HomePageVoiceAssistant';
import ChampionMethodologySection from '@/components/home/ChampionMethodologySection';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { getPreferredAccent } from '@/components/dashboard/student/voice/voiceUtils';
import EnhancedVoiceAssistant from '@/components/voice/EnhancedVoiceAssistant';
import TourGuide from '@/components/dashboard/student/tour/TourGuide';
import { Button } from '@/components/ui/button';

const Home = () => {
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [showTourGuide, setShowTourGuide] = useState(false);
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
      <HomePageVoiceAssistant language={getPreferredAccent()} />
      
      {/* Page content */}
      <HeroSection />
      
      {/* UN Sustainability Goals Banner - replacing donation message */}
      <div className="container mx-auto px-4 my-8">
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-blue-100 dark:from-green-900/20 dark:to-blue-900/20 dark:border-blue-800/30">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="bg-green-100 dark:bg-green-900/40 p-3 rounded-full">
              <Heart className="h-6 w-6 text-green-500 dark:text-green-300 fill-green-200 dark:fill-green-800" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1 text-green-600 dark:text-green-300">Supporting UN Sustainability Goals</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                PREP-zer is committed to providing inclusive and equitable quality education, 
                supporting UN Sustainability Goal 4 to ensure equal access to education for all.
              </p>
            </div>
            <div>
              <Button 
                variant="outline" 
                className="border-green-200 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900/30"
                onClick={() => setShowTourGuide(true)}
              >
                Take a Tour
              </Button>
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
      
      {/* Enhanced voice assistant */}
      <EnhancedVoiceAssistant
        currentScreen="home"
        onNavigationCommand={handleNavigationCommand}
      />
      
      {/* Tour Guide - Make sure we're using the latest version */}
      <TourGuide 
        isOpen={showTourGuide} 
        onClose={() => setShowTourGuide(false)} 
      />
    </MainLayout>
  );
};

export default Home;
