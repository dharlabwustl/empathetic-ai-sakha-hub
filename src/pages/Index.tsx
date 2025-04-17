
import React from "react";
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

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-violet-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-950">
      <Header />
      <main>
        <HeroSection />
        <WhatIsSection />
        <ExamPreparationSection />
        <ForWhomSection />
        <FeaturesSection />
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
