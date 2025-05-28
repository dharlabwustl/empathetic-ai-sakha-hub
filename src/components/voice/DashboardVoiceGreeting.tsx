
import React, { useEffect, useState, useRef } from 'react';
import { getDefaultVoiceConfig, trackUserActivity, shouldOfferAssistance, markAssistanceOffered } from '@/utils/voiceConfig';
import { 
  firstTimeDashboardMessages, 
  returningUserMessages,
  assistanceOfferMessages,
  speakMessagesWithBreaks 
} from '@/utils/voiceMessages';

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
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const activityCheckIntervalRef = useRef<number | null>(null);

  // Track user activity for intelligent assistance
  useEffect(() => {
    const handleActivity = () => {
      trackUserActivity();
    };

    // Track various user interactions
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Check periodically if we should offer assistance
    activityCheckIntervalRef.current = window.setInterval(() => {
      if (!isSpeaking && hasPlayed && shouldOfferAssistance()) {
        offerDashboardAssistance();
      }
    }, 5000); // Check every 5 seconds

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      if (activityCheckIntervalRef.current) {
        clearInterval(activityCheckIntervalRef.current);
      }
    };
  }, [isSpeaking, hasPlayed]);

  const offerDashboardAssistance = async () => {
    markAssistanceOffered();
    const voiceConfig = getDefaultVoiceConfig();
    
    const dashboardAssistanceMessages = [
      {
        text: "Need help navigating your dashboard? I can explain features or help you get started with your studies.",
        pauseAfter: 0
      }
    ];
    
    await speakMessagesWithBreaks(
      dashboardAssistanceMessages,
      { ...voiceConfig, language },
      () => {
        setIsSpeaking(true);
        if (onSpeakingChange) onSpeakingChange(true);
      },
      () => {
        setIsSpeaking(false);
        if (onSpeakingChange) onSpeakingChange(false);
      }
    );
  };

  const playDashboardGreeting = async () => {
    if (hasPlayed) return;
    
    const voiceConfig = getDefaultVoiceConfig();
    const messages = isFirstTimeUser 
      ? firstTimeDashboardMessages(userName)
      : returningUserMessages(userName);
    
    await speakMessagesWithBreaks(
      messages,
      { ...voiceConfig, language },
      () => {
        setIsSpeaking(true);
        if (onSpeakingChange) onSpeakingChange(true);
      },
      () => {
        setIsSpeaking(false);
        if (onSpeakingChange) onSpeakingChange(false);
        setHasPlayed(true);
      }
    );
  };

  useEffect(() => {
    if (userName && !hasPlayed) {
      // Delay to ensure dashboard is loaded
      setTimeout(() => {
        playDashboardGreeting();
      }, 3000);
    }
  }, [userName, hasPlayed]);

  return null;
};

export default DashboardVoiceGreeting;
