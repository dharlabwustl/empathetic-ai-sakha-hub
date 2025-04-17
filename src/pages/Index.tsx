import React, { useRef } from "react";
import HeroSection from "@/components/home/HeroSection";
import WhatIsSection from "@/components/home/WhatIsSection";
import ExamPreparationSection from "@/components/home/ExamPreparationSection";
import ForWhomSection from "@/components/home/ForWhomSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import OnboardingSection from "@/components/home/OnboardingSection";
import VideoSection from "@/components/home/VideoSection";
import CallToAction from "@/components/home/CallToAction";
import FounderSection from "@/components/home/FounderSection";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { useState } from "react";
import { ExamReadinessAnalyzer } from "@/components/home/ExamReadinessAnalyzer";

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const forWhomRef = useRef<HTMLDivElement>(null);
  const [showExamAnalyzer, setShowExamAnalyzer] = useState(false);
  
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToForWhom = () => {
    forWhomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const openExamAnalyzer = () => {
    setShowExamAnalyzer(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-violet-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      <Header />
      <main>
        <HeroSection 
          scrollToFeatures={scrollToFeatures}
          scrollToForWhom={scrollToForWhom}
          openExamAnalyzer={openExamAnalyzer}
        />
        <WhatIsSection />
        <ExamPreparationSection />
        <div ref={forWhomRef}>
          <ForWhomSection />
        </div>
        <div ref={featuresRef}>
          <FeaturesSection />
        </div>
        <OnboardingSection />
        <VideoSection />
        <FounderSection />
        <CallToAction />
      </main>
      <Footer />
      
      {showExamAnalyzer && (
        <ExamReadinessAnalyzer
          isOpen={showExamAnalyzer}
          onClose={() => setShowExamAnalyzer(false)}
        />
      )}
    </div>
  );
};

export default Index;
