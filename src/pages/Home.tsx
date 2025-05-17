
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
import FloatingVoiceControl from '@/components/voice/FloatingVoiceControl';

const Home = () => {
  return (
    <MainLayout>
      <HomePageVoiceAssistant language="hi-IN" />
      <HeroSection />
      <FeatureSection />
      <StatisticsSection />
      <ChampionMethodologySection />
      <ExamEcosystemSection />
      <TestimonialSection />
      <SupportSection />
      <FloatingVoiceControl isHomepage={true} defaultLanguage="hi-IN" />
    </MainLayout>
  );
};

export default Home;
