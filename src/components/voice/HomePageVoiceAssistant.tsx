
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
        const welcomeMessage = "Namaste! Welcome to PREPZR. I'm your AI voice assistant with an Indian accent. I can help you explore our NEET preparation platform designed specifically for Indian medical entrance exams. You can test your exam readiness or start a free trial to access all our features including personalized study plans, interactive concept cards, and AI-powered analytics.";
        speakMessage(welcomeMessage);
        setHasGreeted(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isVoiceSupported, hasGreeted, speakMessage, voiceSettings]);

  // Show intro message when button is clicked
  const handleShowIntro = () => {
    setShowIntro(true);
    
    const introMessage = "PREPZR is an advanced AI-powered NEET exam preparation platform. We use cutting-edge artificial intelligence to personalize your study plan based on your learning style and progress. Our platform helps you master difficult concepts through interactive learning, track your progress with detailed analytics, and provide personalized guidance for your NEET journey.";
    
    speakMessage(introMessage);
  };

  // Guide user through different sections
  const explainFeatures = () => {
    const featuresMessage = "Our platform includes personalized study plans tailored to your learning style, interactive concept cards with visual aids and practice questions, AI-generated performance analytics, practice exams with NEET-style questions, and 24/7 AI tutoring support. Every feature is specifically designed for NEET preparation, covering Physics, Chemistry, and Biology in line with the latest NEET syllabus.";
    
    speakMessage(featuresMessage);
  };

  // This component doesn't render anything visible by default
  // It only provides voice functionality for the homepage
  return null;
};

export default HomePageVoiceAssistant;
