
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import WhatIsSection from "@/components/home/WhatIsSection";
import ForWhomSection from "@/components/home/ForWhomSection";
import FounderSection from "@/components/home/FounderSection";
import VideoSection from "@/components/home/VideoSection";
import OnboardingSection from "@/components/home/OnboardingSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CallToAction from "@/components/home/CallToAction";
import FloatingAvatar from "@/components/shared/FloatingAvatar";
import ExamPreparationSection from "@/components/home/ExamPreparationSection";
import StudentBenefitsSection from "@/components/home/StudentBenefitsSection";
import { ExamReadinessAnalyzer } from "@/components/home/ExamReadinessAnalyzer";

const Index = () => {
  const [showAnalyzer, setShowAnalyzer] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50/30 via-white to-violet-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-violet-950/30">
      <Header />
      <main className="flex-grow">
        <HeroSection onAnalyzeClick={() => setShowAnalyzer(true)} />
        <ExamPreparationSection />
        <StudentBenefitsSection />
        <WhatIsSection />
        <ForWhomSection />
        <FounderSection />
        <VideoSection />
        <OnboardingSection />
        <FeaturesSection />
        <CallToAction />
      </main>
      <Footer />
      <FloatingAvatar />
      {showAnalyzer && <ExamReadinessAnalyzer onClose={() => setShowAnalyzer(false)} />}
    </div>
  );
};

export default Index;
