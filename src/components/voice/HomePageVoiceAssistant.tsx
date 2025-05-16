
import React, { useState, useEffect } from 'react';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { Button } from '@/components/ui/button';
import { Mic, Volume2 } from 'lucide-react';

interface HomePageVoiceAssistantProps {
  language?: string;
}

const HomePageVoiceAssistant: React.FC<HomePageVoiceAssistantProps> = ({ 
  language = 'en-IN' // Default to Indian English
}) => {
  const [showIntro, setShowIntro] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  
  const { 
    speakMessage, 
    isVoiceSupported, 
    toggleMute, 
    voiceSettings,
    updateVoiceSettings
  } = useVoiceAnnouncer({
    initialSettings: { 
      language,
      enabled: true,
      muted: false
    }
  });
  
  // Set Indian English as the default language
  useEffect(() => {
    if (isVoiceSupported) {
      updateVoiceSettings({ 
        language: 'en-IN',
        enabled: true
      });
    }
  }, [isVoiceSupported, updateVoiceSettings]);

  // Welcome message after page load
  useEffect(() => {
    if (isVoiceSupported && !hasGreeted && voiceSettings.enabled && !voiceSettings.muted) {
      const timer = setTimeout(() => {
        const welcomeMessage = "Welcome to PREPZR. I'm your AI voice assistant with an Indian accent. I can help you explore our NEET preparation platform. Click on 'Test Your Exam Readiness' to check your preparation level, or start a free trial to access all our features.";
        speakMessage(welcomeMessage);
        setHasGreeted(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isVoiceSupported, hasGreeted, speakMessage, voiceSettings]);

  // Show intro message when button is clicked
  const handleShowIntro = () => {
    setShowIntro(true);
    
    const introMessage = "PREPZR is an AI-powered NEET exam preparation platform. We use advanced artificial intelligence to personalize your study plan, help you master concepts, and track your progress. Our approach combines technology with proven study methodologies to maximize your exam performance.";
    
    speakMessage(introMessage);
  };

  // Guide user through different sections
  const explainFeatures = () => {
    const featuresMessage = "Our platform includes personalized study plans, interactive concept cards, practice exams with detailed analysis, AI-powered progress tracking, and 24/7 tutoring support. Every feature is designed specifically for NEET preparation, focusing on Physics, Chemistry, and Biology.";
    
    speakMessage(featuresMessage);
  };

  // This component doesn't render anything visible by default
  // It only provides voice functionality for the homepage
  return null;
};

export default HomePageVoiceAssistant;
