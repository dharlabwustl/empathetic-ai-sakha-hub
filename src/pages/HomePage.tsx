import React from 'react';
import { useLocation } from 'react-router-dom';
import PrepzrAIVoiceAssistant from '@/components/voice/PrepzrAIVoiceAssistant';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PricingSection from '@/components/home/PricingSection';
import FAQSection from '@/components/home/FAQSection';
import Footer from '@/components/home/Footer';
import ExamReadinessAnalyzer from '@/components/home/ExamReadinessAnalyzer';
import ScholarshipSection from '@/components/home/ScholarshipSection';

const HomePage = () => {
  const location = useLocation();

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <ScholarshipSection />
      <Footer />
      <ExamReadinessAnalyzer />
      
      {/* PREPZR AI Voice Assistant for home page */}
      <PrepzrAIVoiceAssistant
        language="en-US"
        currentPage="home"
      />
    </>
  );
};

export default HomePage;
