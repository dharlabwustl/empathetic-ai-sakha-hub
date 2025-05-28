
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
    inactivityTimeout: 12000
  });

  useEffect(() => {
    if (userName && userName !== 'there') {
      const greetingMessage = isFirstTimeUser 
        ? `Welcome to your PREPZR dashboard, ${userName}! Let's start your learning journey together.`
        : `Great to see you back, ${userName}! Ready to continue your studies today?`;
      
      setTimeout(() => {
        playInitialGreeting(greetingMessage);
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
      "Need help navigating your dashboard? I can guide you to study materials.",
      "Would you like me to explain your progress or suggest what to study next?",
      "I can help you access concept cards, practice exams, or today's study plan.",
      "Let me know if you need assistance with any learning features.",
      "Want to check your study progress or start a practice session?",
      "I'm here to help with your studies. What would you like to work on?"
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
      <EnhancedSpeechRecognition 
        language={language}
        continuous={true}
        onCommand={handleVoiceCommand}
      />
    </>
  );
};

export default DashboardVoiceGreeting;
