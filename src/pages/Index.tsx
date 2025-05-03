
import React, { useRef, useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import WhatIsSection from '@/components/home/WhatIsSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ExamPreparationSection from '@/components/home/ExamPreparationSection';
import StudentBenefitsSection from '@/components/home/StudentBenefitsSection';
import CallToAction from '@/components/home/CallToAction';
import FounderSection from '@/components/home/FounderSection';
import VideoSection from '@/components/home/VideoSection';
import { ExamReadinessAnalyzer } from '@/components/home/ExamReadinessAnalyzer';
import FoundingTeamSection from '@/components/home/FoundingTeamSection';
import EcosystemAnimation from '@/components/home/EcosystemAnimation';
import ChampionMethodologySection from '@/components/home/ChampionMethodologySection';
import AchievementsSection from '@/components/home/AchievementsSection';

// Add CSS for the floating announcer animation
const animateCSS = `
@keyframes progress {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

.animate-progress {
  animation: progress 20s linear;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const [showExamAnalyzer, setShowExamAnalyzer] = useState(false);
  
  const scrollToFeatures = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleOpenExamAnalyzer = () => {
    setShowExamAnalyzer(true);
    
    // Dispatch event to close voice announcer when opening analyzer
    const event = new CustomEvent('close-voice-announcer');
    window.dispatchEvent(event);
  };
  
  const handleCloseExamAnalyzer = () => {
    setShowExamAnalyzer(false);
  };
  
  // Trigger voice announcer after a slight delay on homepage
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only trigger on homepage, not other routes
      if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        const event = new CustomEvent('open-voice-announcer');
        window.dispatchEvent(event);
      }
    }, 5000); // 5 second delay before showing
    
    return () => clearTimeout(timer);
  }, []);

  // Listen for the custom event to open the exam analyzer
  useEffect(() => {
    const handleExamAnalyzerEvent = () => {
      setShowExamAnalyzer(true);
    };
    
    window.addEventListener('open-exam-analyzer', handleExamAnalyzerEvent);
    
    return () => {
      window.removeEventListener('open-exam-analyzer', handleExamAnalyzerEvent);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background overflow-hidden">
      {/* Add the CSS for animations */}
      <style>{animateCSS}</style>
      
      <Header />
      
      <main>
        <HeroSection 
          scrollToFeatures={scrollToFeatures}
          scrollToForWhom={() => {}}
          openExamAnalyzer={handleOpenExamAnalyzer}
        />
        
        {/* KPI Stats is inside HeroSection */}
        
        {/* Add the new AchievementsSection right after KPI Stats */}
        <AchievementsSection />
        
        <WhatIsSection />
        
        {/* Add the ChampionMethodologySection right after WhatIsSection */}
        <ChampionMethodologySection />
        
        {/* Add the EcosystemAnimation section after ChampionMethodologySection */}
        <EcosystemAnimation />
        
        <div ref={featuresRef}>
          <FeaturesSection />
        </div>
        
        <ExamPreparationSection />
        
        {showExamAnalyzer && <ExamReadinessAnalyzer onClose={handleCloseExamAnalyzer} />}
        
        <StudentBenefitsSection />
        
        <VideoSection />
        
        <FounderSection />
        
        <FoundingTeamSection />
        
        <CallToAction />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
