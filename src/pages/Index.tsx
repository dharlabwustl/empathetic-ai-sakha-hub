
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

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
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
    </div>
  );
};

export default Index;
