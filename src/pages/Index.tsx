
import React, { useRef, useState } from 'react';
import Header from '@/components/layout/HeaderWithAdmin';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import WhatIsSection from '@/components/home/WhatIsSection';
import ForWhomSection from '@/components/home/ForWhomSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ExamPreparationSection from '@/components/home/ExamPreparationSection';
import StudentBenefitsSection from '@/components/home/StudentBenefitsSection';
import OnboardingSection from '@/components/home/OnboardingSection';
import CallToAction from '@/components/home/CallToAction';
import FounderSection from '@/components/home/FounderSection';
import VideoSection from '@/components/home/VideoSection';
import EcosystemAnimation from '@/components/home/EcosystemAnimation';
import { ExamReadinessAnalyzer } from '@/components/home/ExamReadinessAnalyzer';

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const forWhomRef = useRef<HTMLDivElement>(null);
  const [showExamAnalyzer, setShowExamAnalyzer] = useState(false);
  
  const scrollToFeatures = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const scrollToForWhom = () => {
    if (forWhomRef.current) {
      forWhomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleOpenExamAnalyzer = () => {
    setShowExamAnalyzer(true);
  };
  
  const handleCloseExamAnalyzer = () => {
    setShowExamAnalyzer(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background overflow-hidden">
      <Header />
      
      <main>
        <HeroSection 
          scrollToFeatures={scrollToFeatures} 
          scrollToForWhom={scrollToForWhom}
          openExamAnalyzer={handleOpenExamAnalyzer}
        />
        
        <EcosystemAnimation />
        
        <WhatIsSection />
        
        <div ref={featuresRef}>
          <FeaturesSection />
        </div>
        
        <div ref={forWhomRef}>
          <ForWhomSection />
        </div>
        
        <ExamPreparationSection />
        
        {showExamAnalyzer && <ExamReadinessAnalyzer onClose={handleCloseExamAnalyzer} />}
        
        <StudentBenefitsSection />
        
        <OnboardingSection />
        
        <VideoSection />
        
        <FounderSection />
        
        <CallToAction />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
