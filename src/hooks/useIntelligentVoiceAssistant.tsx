
import { useState, useEffect, useRef, useCallback } from 'react';
import { getDefaultVoiceConfig } from '@/utils/voiceConfig';

interface UseIntelligentVoiceAssistantProps {
  userName?: string;
  language?: string;
  onSpeakingChange?: (isSpeaking: boolean) => void;
  inactivityTimeout?: number; // milliseconds
}

export const useIntelligentVoiceAssistant = ({
  userName = 'there',
  language = 'en-US',
  onSpeakingChange,
  inactivityTimeout = 10000 // 10 seconds
}: UseIntelligentVoiceAssistantProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasPlayedInitial, setHasPlayedInitial] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  
  const inactivityTimerRef = useRef<number | null>(null);
  const spokenMessagesRef = useRef<Set<string>>(new Set());
  const sessionIdRef = useRef(Date.now().toString());

  // Track user activity
  const trackActivity = useCallback(() => {
    setLastActivity(Date.now());
    
    // Clear existing timer
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    
    // Set new timer for inactivity detection
    inactivityTimerRef.current = window.setTimeout(() => {
      offerAssistance();
    }, inactivityTimeout);
  }, [inactivityTimeout]);

  const speak = useCallback((text: string, preventRepetition = true) => {
    if (!('speechSynthesis' in window)) return;
    
    // Check for repetition within the session
    const messageKey = text.toLowerCase().trim().substring(0, 50);
    if (preventRepetition && spokenMessagesRef.current.has(messageKey)) {
      console.log('🔇 Voice: Preventing repetition of message:', text);
      return;
    }
    
    // Add to spoken messages
    if (preventRepetition) {
      spokenMessagesRef.current.add(messageKey);
    }
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const voiceConfig = getDefaultVoiceConfig();
    const speech = new SpeechSynthesisUtterance();
    speech.text = text.replace(/PREPZR/gi, 'Prep Zer');
    speech.lang = language;
    speech.rate = 0.95;
    speech.pitch = 1.1;
    speech.volume = 0.8;
    
    if (voiceConfig.voice) {
      speech.voice = voiceConfig.voice;
    }
    
    speech.onstart = () => {
      setIsSpeaking(true);
      if (onSpeakingChange) onSpeakingChange(true);
    };
    
    speech.onend = () => {
      setIsSpeaking(false);
      if (onSpeakingChange) onSpeakingChange(false);
    };
    
    window.speechSynthesis.speak(speech);
    trackActivity(); // Reset activity timer when speaking
  }, [language, onSpeakingChange, trackActivity]);

  const offerAssistance = useCallback(() => {
    const assistanceOffers = [
      "Need help exploring PREPZR? I'm here to assist you.",
      "Would you like me to explain PREPZR's features?",
      "Ready to start your free trial? Just let me know!",
      "I can help you navigate or answer any questions."
    ];
    
    const randomOffer = assistanceOffers[Math.floor(Math.random() * assistanceOffers.length)];
    speak(randomOffer, false); // Don't prevent repetition for assistance offers
  }, [speak]);

  const playInitialGreeting = useCallback((greeting: string) => {
    if (!hasPlayedInitial) {
      setTimeout(() => {
        speak(greeting);
        setHasPlayedInitial(true);
      }, 1000);
    }
  }, [hasPlayedInitial, speak]);

  // Set up activity listeners
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, trackActivity, true);
    });
    
    // Initial activity tracking
    trackActivity();
    
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, trackActivity, true);
      });
      
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [trackActivity]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, []);

  // Clear spoken messages when session changes
  useEffect(() => {
    spokenMessagesRef.current.clear();
  }, []);

  return {
    isSpeaking,
    speak,
    playInitialGreeting,
    trackActivity,
    hasPlayedInitial
  };
};
