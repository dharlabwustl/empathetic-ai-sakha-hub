
import React, { useEffect, useRef, useState } from 'react';
import { useIntelligentVoiceAssistant } from '@/hooks/useIntelligentVoiceAssistant';
import EnhancedSpeechRecognition from './EnhancedSpeechRecognition';

interface DashboardVoiceGreetingProps {
  userName: string;
  isFirstTimeUser: boolean;
  language?: string;
  onSpeakingChange?: (isSpeaking: boolean) => void;
}

const DashboardVoiceGreeting: React.FC<DashboardVoiceGreetingProps> = ({
  userName,
  isFirstTimeUser,
  language = 'en-US',
  onSpeakingChange
}) => {
  const [hasOfferedHelp, setHasOfferedHelp] = useState(false);
  const helpOfferTimerRef = useRef<number | null>(null);
  const lastActivityRef = useRef(Date.now());
  
  const { isSpeaking, playInitialGreeting, speak, trackActivity } = useIntelligentVoiceAssistant({
    userName,
    language,
    onSpeakingChange,
    inactivityTimeout: 12000 // 12 seconds for dashboard
  });

  useEffect(() => {
    if (userName && userName !== 'there') {
      const greetingMessage = isFirstTimeUser 
        ? `Welcome to your PREPZR dashboard, ${userName}! This is your command center for exam preparation.`
        : `Great to see you back, ${userName}! Ready for today's learning session?`;
      
      setTimeout(() => {
        playInitialGreeting(greetingMessage);
        // Schedule help offer after greeting
        setTimeout(() => {
          scheduleHelpOffer();
        }, 4000);
      }, 2000);
    }
  }, [userName, isFirstTimeUser, playInitialGreeting]);

  const handleActivity = () => {
    lastActivityRef.current = Date.now();
    setHasOfferedHelp(false);
    
    if (helpOfferTimerRef.current) {
      clearTimeout(helpOfferTimerRef.current);
      helpOfferTimerRef.current = null;
    }
    
    scheduleHelpOffer();
    trackActivity();
  };

  const scheduleHelpOffer = () => {
    if (helpOfferTimerRef.current) {
      clearTimeout(helpOfferTimerRef.current);
    }
    
    helpOfferTimerRef.current = window.setTimeout(() => {
      offerDashboardAssistance();
    }, 12000);
  };

  const offerDashboardAssistance = () => {
    if (hasOfferedHelp || isSpeaking) return;
    
    const dashboardOffers = [
      "Need help navigating your dashboard? I can guide you to any section.",
      "Would you like me to explain any dashboard features?",
      "I can help you access study plans, concept cards, or practice exams.",
      "Let me know if you need assistance with any learning tools."
    ];
    
    const randomOffer = dashboardOffers[Math.floor(Math.random() * dashboardOffers.length)];
    speak(randomOffer, false);
    setHasOfferedHelp(true);
    
    helpOfferTimerRef.current = window.setTimeout(() => {
      setHasOfferedHelp(false);
      offerDashboardAssistance();
    }, 25000);
  };

  const handleVoiceCommand = (command: string) => {
    console.log('Dashboard voice command:', command);
    handleActivity();
  };

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

  return (
    <>
      {/* Enhanced Speech Recognition for Dashboard */}
      <EnhancedSpeechRecognition 
        language={language}
        continuous={true}
        onCommand={handleVoiceCommand}
      />
    </>
  );
};

export default DashboardVoiceGreeting;
