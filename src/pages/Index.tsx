
import React, { useRef, useState, useEffect, lazy, Suspense } from 'react';
import Header from '@/components/layout/HeaderWithAdmin';
import Footer from '@/components/layout/Footer';
import WhatIsSection from '@/components/home/WhatIsSection';
import { ExamReadinessAnalyzer } from '@/components/home/ExamReadinessAnalyzer';
import KpiStats from '@/components/home/hero/feature-highlights/KpiStats';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

// Lazy load components that aren't immediately visible
const Interactive3DHero = lazy(() => import('@/components/home/Interactive3DHero'));
const FeaturesSection = lazy(() => import('@/components/home/FeaturesSection'));
const ExamPreparationSection = lazy(() => import('@/components/home/ExamPreparationSection'));
const StudentBenefitsSection = lazy(() => import('@/components/home/StudentBenefitsSection'));
const CallToAction = lazy(() => import('@/components/home/CallToAction'));
const FounderSection = lazy(() => import('@/components/home/FounderSection'));
const VideoSection = lazy(() => import('@/components/home/VideoSection'));
const FoundingTeamSection = lazy(() => import('@/components/home/FoundingTeamSection'));
const EcosystemAnimation = lazy(() => import('@/components/home/EcosystemAnimation'));
const BackedBySection = lazy(() => import('@/components/home/BackedBySection'));
const ChampionMethodologySection = lazy(() => import('@/components/home/ChampionMethodologySection'));
const HomePageVoiceAssistant = lazy(() => import('@/components/voice/HomePageVoiceAssistant'));
const FloatingVoiceAssistant = lazy(() => import('@/components/voice/FloatingVoiceAssistant'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
  </div>
);

const Index = () => {
  const navigate = useNavigate();
  const featuresRef = useRef<HTMLDivElement>(null);
  const [showExamAnalyzer, setShowExamAnalyzer] = useState(false);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const scrollToFeatures = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleOpenExamAnalyzer = () => {
    setShowExamAnalyzer(true);
  };
  
  const handleCloseExamAnalyzer = () => {
    setShowExamAnalyzer(false);
  };
  
  const handleOpenVoiceAssistant = () => {
    setShowVoiceAssistant(true);
  };
  
  const handleCloseVoiceAssistant = () => {
    setShowVoiceAssistant(false);
  };
  
  const handleNavigationCommand = (route: string) => {
    navigate(route);
  };

  // Listen for events and set loading state
  useEffect(() => {
    const handleExamAnalyzerEvent = () => {
      setShowExamAnalyzer(true);
    };
    
    const handleVoiceAssistantEvent = () => {
      setShowVoiceAssistant(true);
    };
    
    window.addEventListener('open-exam-analyzer', handleExamAnalyzerEvent);
    document.addEventListener('open-voice-assistant', handleVoiceAssistantEvent as EventListener);
    
    // Mark as loaded after a short delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    
    return () => {
      window.removeEventListener('open-exam-analyzer', handleExamAnalyzerEvent);
      document.removeEventListener('open-voice-assistant', handleVoiceAssistantEvent as EventListener);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background overflow-hidden">
      <Header />
      
      <main>
        {/* Hero section with loading optimization */}
        <Suspense fallback={
          <div className="h-[80vh] flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-center mb-2">
                Loading immersive NEET experience...
              </h2>
              <p className="text-muted-foreground">
                Preparing your personalized learning journey
              </p>
            </div>
          </div>
        }>
          <Interactive3DHero />
        </Suspense>
        
        {/* Smart Data section with animation and KPI stats */}
        <motion.section 
          className="container mx-auto px-4 py-16 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Smart Data. Real Impact. Humanizing exam prep.
            </h2>
          </div>
          <KpiStats />
        </motion.section>
        
        {/* Backed By Section with partner logos */}
        <Suspense fallback={<LoadingFallback />}>
          <BackedBySection />
        </Suspense>
        
        {/* Add proper spacing between sections */}
        <div className="pt-12"></div>
                
        <WhatIsSection />
        
        {/* Champion Methodology Section */}
        <Suspense fallback={<LoadingFallback />}>
          <ChampionMethodologySection />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <EcosystemAnimation />
        </Suspense>
        
        <div ref={featuresRef}>
          <Suspense fallback={<LoadingFallback />}>
            <FeaturesSection />
          </Suspense>
        </div>
        
        <Suspense fallback={<LoadingFallback />}>
          <ExamPreparationSection />
        </Suspense>
        
        {showExamAnalyzer && <ExamReadinessAnalyzer onClose={handleCloseExamAnalyzer} />}
        
        <Suspense fallback={<LoadingFallback />}>
          <StudentBenefitsSection />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <VideoSection />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <FounderSection />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <FoundingTeamSection />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <CallToAction />
        </Suspense>
      </main>
      
      <Footer />
      
      {/* Conditionally render voice assistant components when needed */}
      {isLoaded && (
        <Suspense fallback={null}>
          <HomePageVoiceAssistant language="en-IN" />
        </Suspense>
      )}
      
      {/* Floating Voice Assistant button - simplified animation */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={handleOpenVoiceAssistant}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" x2="12" y1="19" y2="22"></line>
          </svg>
          <span className="ml-2 font-medium">Voice Assistant</span>
        </motion.button>
      </div>
      
      {/* Render voice assistant dialog only when active */}
      {showVoiceAssistant && isLoaded && (
        <Suspense fallback={null}>
          <FloatingVoiceAssistant 
            isOpen={showVoiceAssistant} 
            onClose={handleCloseVoiceAssistant}
            onNavigationCommand={handleNavigationCommand}
            language="en-IN"
          />
        </Suspense>
      )}
    </div>
  );
};

export default Index;
