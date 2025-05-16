
import React, { useEffect, useState } from 'react';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { useLocation } from 'react-router-dom';

interface HomePageVoiceAssistantProps {
  language?: string;
}

const HomePageVoiceAssistant: React.FC<HomePageVoiceAssistantProps> = ({ 
  language = 'en-IN' // Default to Indian English
}) => {
  const location = useLocation();
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const { speakMessage, isVoiceSupported, voiceSettings } = useVoiceAnnouncer({
    initialSettings: { language, rate: 0.95, pitch: 1.0 }
  });

  useEffect(() => {
    // Check if we already welcomed the user this session
    const hasWelcomedBefore = sessionStorage.getItem('homepage_voice_welcomed') === 'true';
    
    // Only speak if voice is supported, enabled, not muted, and we haven't welcomed yet
    if (isVoiceSupported && voiceSettings.enabled && !voiceSettings.muted && !hasWelcomedBefore && !hasWelcomed) {
      // Wait a bit before speaking to ensure page is loaded and user is settled
      const timer = setTimeout(() => {
        const welcomeMessage = `Welcome to PREPZR, the AI-powered learning platform for exam preparation. Our personalized approach adapts to your unique learning style and needs. Explore our features by scrolling down or click on "Test Your Exam Readiness" to assess your current level. You can also start a 7-day free trial to experience the full platform.`;
        
        speakMessage(welcomeMessage);
        setHasWelcomed(true);
        sessionStorage.setItem('homepage_voice_welcomed', 'true');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isVoiceSupported, voiceSettings.enabled, voiceSettings.muted, hasWelcomed, speakMessage]);

  // Provide contextual guidance based on the current section in view
  useEffect(() => {
    const handleScrollIntoSection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && isVoiceSupported && voiceSettings.enabled && !voiceSettings.muted) {
          const sectionId = entry.target.id;
          let message = '';
          
          switch(sectionId) {
            case 'features-section':
              message = 'Here are the key features of PREPZR. Our AI-powered platform offers personalized study plans, adaptive learning content, and detailed analytics to optimize your exam preparation.';
              break;
            case 'exams-section':
              message = 'PREPZR supports preparation for various competitive exams including IIT-JEE, NEET, UPSC, and more. Each exam has specialized content and strategies.';
              break;
            case 'methodology-section':
              message = 'Our champion methodology combines cognitive science, AI personalization, and expert guidance to maximize your learning efficiency.';
              break;
            default:
              return; // Don't speak for unnamed sections
          }
          
          if (message) {
            speakMessage(message);
          }
        }
      });
    };
    
    // Setup intersection observer for main sections that need voice guidance
    const observer = new IntersectionObserver(handleScrollIntoSection, {
      threshold: 0.3 // Trigger when 30% of the section is visible
    });
    
    // Add all sections that should trigger voice guidance
    const sections = document.querySelectorAll('[id$="-section"]');
    sections.forEach(section => observer.observe(section));
    
    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, [isVoiceSupported, voiceSettings.enabled, voiceSettings.muted, speakMessage]);

  // No visible UI elements - this component just provides voice functionality
  return null;
};

export default HomePageVoiceAssistant;
