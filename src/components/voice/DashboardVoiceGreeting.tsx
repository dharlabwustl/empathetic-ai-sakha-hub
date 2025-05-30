
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
    inactivityTimeout: 15000 // 15 seconds for dashboard
  });

  useEffect(() => {
    if (userName && userName !== 'there') {
      const greetingMessage = isFirstTimeUser 
        ? `Welcome to your NEET preparation dashboard, ${userName}! Your exam readiness score is looking good. Let's focus on improving those weak areas today.`
        : `Good to see you back, ${userName}! Your current study streak is impressive. Ready to tackle today's priority concepts?`;
      
      setTimeout(() => {
        playInitialGreeting(greetingMessage);
        // Schedule help offer after greeting
        setTimeout(() => {
          scheduleHelpOffer();
        }, 5000);
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
    }, 15000);
  };

  const offerDashboardAssistance = () => {
    if (hasOfferedHelp || isSpeaking) return;
    
    const dashboardOffers = [
      "I notice you have thermodynamics as a priority concept. Would you like me to guide you to the concept cards?",
      "Your physics progress could use some attention. Should I help you access practice questions?",
      "You're doing great with biology! Want to try some advanced practice tests?",
      "Ready to start your 2 hour 30 minute physics session? I can help you begin."
    ];
    
    const randomOffer = dashboardOffers[Math.floor(Math.random() * dashboardOffers.length)];
    speak(randomOffer, false);
    setHasOfferedHelp(true);
    
    helpOfferTimerRef.current = window.setTimeout(() => {
      setHasOfferedHelp(false);
      offerDashboardAssistance();
    }, 30000);
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
      <EnhancedSpeechRecognition 
        language={language}
        continuous={true}
        onCommand={handleVoiceCommand}
      />
    </>
  );
};

export default DashboardVoiceGreeting;
