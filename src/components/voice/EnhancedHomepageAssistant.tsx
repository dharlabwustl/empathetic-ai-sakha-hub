
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useIntelligentVoiceAssistant } from '@/hooks/useIntelligentVoiceAssistant';
import EnhancedSpeechRecognition from './EnhancedSpeechRecognition';

interface EnhancedHomepageAssistantProps {
  language?: string;
  onSpeakingChange?: (isSpeaking: boolean) => void;
}

const EnhancedHomepageAssistant: React.FC<EnhancedHomepageAssistantProps> = ({ 
  language = 'en-US',
  onSpeakingChange
}) => {
  const location = useLocation();
  const shouldPlayWelcome = location.pathname === '/';
  const [hasOfferedHelp, setHasOfferedHelp] = useState(false);
  const lastActivityRef = useRef(Date.now());
  const helpOfferTimerRef = useRef<number | null>(null);
  
  const { isSpeaking, playInitialGreeting, speak, trackActivity } = useIntelligentVoiceAssistant({
    language,
    onSpeakingChange,
    inactivityTimeout: 10000 // 10 seconds for homepage
  });

  // Enhanced welcome message with breaks
  useEffect(() => {
    if (shouldPlayWelcome) {
      const welcomeMessage = "Welcome to PREPZR! I'm your AI companion here to guide you.";
      playInitialGreeting(welcomeMessage);
      
      // Schedule help offer after initial greeting
      setTimeout(() => {
        scheduleHelpOffer();
      }, 5000);
    }
  }, [shouldPlayWelcome, playInitialGreeting]);

  // Track user activity and reset help offer timer
  const handleActivity = () => {
    lastActivityRef.current = Date.now();
    setHasOfferedHelp(false);
    
    // Clear existing timer
    if (helpOfferTimerRef.current) {
      clearTimeout(helpOfferTimerRef.current);
      helpOfferTimerRef.current = null;
    }
    
    // Schedule new help offer
    scheduleHelpOffer();
    trackActivity();
  };

  const scheduleHelpOffer = () => {
    // Clear existing timer
    if (helpOfferTimerRef.current) {
      clearTimeout(helpOfferTimerRef.current);
    }
    
    // Set new timer for 10 seconds of inactivity
    helpOfferTimerRef.current = window.setTimeout(() => {
      offerAssistance();
    }, 10000);
  };

  const offerAssistance = () => {
    if (hasOfferedHelp || isSpeaking) return;
    
    const assistanceOffers = [
      "Let me know if you need any assistance exploring PREPZR.",
      "I'm here to help. Would you like to know about our features?",
      "Need help getting started? Just ask me anything.",
      "Ready to begin your learning journey? I can guide you."
    ];
    
    const randomOffer = assistanceOffers[Math.floor(Math.random() * assistanceOffers.length)];
    speak(randomOffer, false);
    setHasOfferedHelp(true);
    
    // Schedule next offer after longer delay
    helpOfferTimerRef.current = window.setTimeout(() => {
      setHasOfferedHelp(false);
      offerAssistance();
    }, 30000); // 30 seconds before next offer
  };

  const handleVoiceCommand = (command: string) => {
    console.log('Voice command received:', command);
    handleActivity(); // Reset activity timer on voice command
  };

  // Set up activity listeners
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });
    
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      
      if (helpOfferTimerRef.current) {
        clearTimeout(helpOfferTimerRef.current);
      }
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (helpOfferTimerRef.current) {
        clearTimeout(helpOfferTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Enhanced Speech Recognition for Homepage */}
      <EnhancedSpeechRecognition 
        language={language}
        continuous={true}
        onCommand={handleVoiceCommand}
      />
    </>
  );
};

export default EnhancedHomepageAssistant;
