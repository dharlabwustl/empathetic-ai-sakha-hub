
import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { speakWithFemaleVoice } from '@/utils/voiceConfig';

interface IntelligentHomepageAssistantProps {
  language?: string;
  onSpeakingChange?: (isSpeaking: boolean) => void;
  isMicrophoneActive?: boolean;
}

const IntelligentHomepageAssistant: React.FC<IntelligentHomepageAssistantProps> = ({ 
  language = 'en-US',
  onSpeakingChange,
  isMicrophoneActive = false
}) => {
  const [hasGreeted, setHasGreeted] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState<number>(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [userClickedMic, setUserClickedMic] = useState(false);
  const location = useLocation();
  const timeoutRef = useRef<number | null>(null);
  const spokenMessagesRef = useRef<Set<string>>(new Set());
  
  const shouldBeActive = location.pathname === '/' || 
                        location.pathname.includes('/signup') ||
                        location.pathname.includes('/welcome') ||
                        location.pathname.includes('/free-trial');

  // Welcome and educational messages
  const welcomeMessage = "Welcome to PREPZR! I'm your AI assistant. PREPZR is India's first emotionally aware, hyper-personalized exam preparation platform that understands your mindset, not just the exam.";
  
  const educationalMessages = [
    "PREPZR offers personalized study plans, adaptive learning, and real-time progress tracking to help you ace exams like JEE, NEET, UPSC, and CAT.",
    "Ready to start your journey? You can sign up for a free trial, take our exam readiness test, or explore scholarship opportunities.",
    "Unlike traditional coaching, PREPZR adapts to your learning style and emotional state, making exam preparation stress-free and effective.",
    "Would you like to start with a free trial or take our exam readiness assessment to see where you stand?"
  ];

  const speak = (text: string, priority: boolean = false) => {
    if (isMicrophoneActive) {
      console.log('🔇 Microphone active, skipping speech');
      return;
    }

    const messageKey = text.toLowerCase().trim();
    const now = Date.now();
    
    // Don't repeat messages unless it's priority or user specifically clicked microphone
    if (!priority && !userClickedMic && spokenMessagesRef.current.has(messageKey)) {
      console.log('🔇 Preventing message repetition:', text);
      return;
    }
    
    if (!('speechSynthesis' in window)) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Mark as spoken
    spokenMessagesRef.current.add(messageKey);
    setTimeout(() => {
      spokenMessagesRef.current.delete(messageKey);
    }, 60000);
    
    onSpeakingChange?.(true);
    
    speakWithFemaleVoice(
      text,
      { language },
      () => {
        console.log('🔊 Homepage VA: Speaking:', text);
      },
      () => {
        console.log('🔇 Homepage VA: Finished speaking');
        onSpeakingChange?.(false);
        setLastMessageTime(Date.now());
      }
    );
  };

  const scheduleNextMessage = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = window.setTimeout(() => {
      const now = Date.now();
      
      // Only speak if 30 seconds have passed, mic is not active, user hasn't clicked mic, and should be active
      if (now - lastMessageTime >= 30000 && !isMicrophoneActive && !userClickedMic && shouldBeActive) {
        const nextMessage = educationalMessages[messageIndex % educationalMessages.length];
        speak(nextMessage);
        setMessageIndex(prev => prev + 1);
        scheduleNextMessage();
      } else {
        // Check again in 5 seconds
        scheduleNextMessage();
      }
    }, 30000);
  };

  // Stop speaking when microphone becomes active
  useEffect(() => {
    if (isMicrophoneActive && window.speechSynthesis) {
      console.log('🔇 Microphone activated, stopping homepage assistant speech');
      window.speechSynthesis.cancel();
      onSpeakingChange?.(false);
      setUserClickedMic(true);
      
      // Reset the clicked state after 10 seconds of inactivity
      setTimeout(() => {
        if (!isMicrophoneActive) {
          setUserClickedMic(false);
        }
      }, 10000);
    }
  }, [isMicrophoneActive, onSpeakingChange]);

  // Listen for manual microphone activation
  useEffect(() => {
    const handleMicClick = () => {
      setUserClickedMic(true);
      // Stop speaking immediately
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        onSpeakingChange?.(false);
      }
      
      // Reset after 15 seconds
      setTimeout(() => {
        setUserClickedMic(false);
      }, 15000);
    };

    window.addEventListener('microphone-clicked', handleMicClick);
    return () => {
      window.removeEventListener('microphone-clicked', handleMicClick);
    };
  }, [onSpeakingChange]);

  // Initial greeting and message scheduling
  useEffect(() => {
    if (shouldBeActive && !hasGreeted && !isMicrophoneActive && !userClickedMic) {
      setTimeout(() => {
        speak(welcomeMessage, true);
        setHasGreeted(true);
        scheduleNextMessage();
      }, 2000);
    }
    
    if (!shouldBeActive) {
      setHasGreeted(false);
      setMessageIndex(0);
      setUserClickedMic(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [shouldBeActive, hasGreeted, isMicrophoneActive, userClickedMic]);

  // Handle page navigation
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Reset state when navigating away
    if (!shouldBeActive) {
      setHasGreeted(false);
      setMessageIndex(0);
      setUserClickedMic(false);
      spokenMessagesRef.current.clear();
    }
  }, [location.pathname]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return null;
};

export default IntelligentHomepageAssistant;
