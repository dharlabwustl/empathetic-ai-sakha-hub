
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import HeroSection from '@/components/landing/HeroSection';
import FeatureSection from '@/components/home/FeatureSection';
import TestimonialSection from '@/components/home/TestimonialSection'; 
import StatisticsSection from '@/components/home/StatisticsSection';
import ExamEcosystemSection from '@/components/home/ExamEcosystemSection';
import SupportSection from '@/components/home/SupportSection';
import ChampionMethodologySection from '@/components/home/ChampionMethodologySection';
import HomePageVoiceAssistant from '@/components/voice/HomePageVoiceAssistant';

const Home = () => {
  return (
    <MainLayout>
      <HomePageVoiceAssistant />
      <HeroSection />
      <FeatureSection />
      <StatisticsSection />
      <ChampionMethodologySection />
      <ExamEcosystemSection />
      <TestimonialSection />
      <SupportSection />
    </MainLayout>
  );
};

export default Home;
