
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { speakWithFemaleVoice } from '@/utils/voiceConfig';

interface IntelligentHomepageAssistantProps {
  language?: string;
  onSpeakingChange?: (isSpeaking: boolean) => void;
  onMicrophoneClick?: () => void;
}

const IntelligentHomepageAssistant: React.FC<IntelligentHomepageAssistantProps> = ({ 
  language = 'en-US',
  onSpeakingChange,
  onMicrophoneClick
}) => {
  const location = useLocation();
  const [hasGreeted, setHasGreeted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [reminderCount, setReminderCount] = useState(0);
  
  const activityTimeoutRef = useRef<number | null>(null);
  const speechTimeoutRef = useRef<number | null>(null);
  const isHomepage = location.pathname === '/';
  
  // Track user activity
  const handleActivity = () => {
    setLastActivity(Date.now());
    if (activityTimeoutRef.current) {
      clearTimeout(activityTimeoutRef.current);
    }
    scheduleNextReminder();
  };

  // Enhanced speak function with break management
  const speak = (text: string, takeBreakAfter: boolean = true) => {
    if (!isHomepage) return;
    
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    setIsSpeaking(true);
    if (onSpeakingChange) onSpeakingChange(true);
    
    speakWithFemaleVoice(
      text,
      { language },
      () => {
        console.log('🔊 Homepage: Speaking:', text);
      },
      () => {
        setIsSpeaking(false);
        if (onSpeakingChange) onSpeakingChange(false);
        
        // Take intelligent break after speaking
        if (takeBreakAfter) {
          speechTimeoutRef.current = window.setTimeout(() => {
            scheduleNextReminder();
          }, 30000); // 30 seconds break
        }
      }
    );
  };

  // Stop speaking when microphone is clicked
  useEffect(() => {
    if (onMicrophoneClick) {
      const handleMicClick = () => {
        if (isSpeaking) {
          window.speechSynthesis.cancel();
          setIsSpeaking(false);
          if (onSpeakingChange) onSpeakingChange(false);
        }
      };
      
      // Listen for microphone click events
      document.addEventListener('microphone-click', handleMicClick);
      return () => document.removeEventListener('microphone-click', handleMicClick);
    }
  }, [isSpeaking, onMicrophoneClick, onSpeakingChange]);

  // Initial greeting
  useEffect(() => {
    if (isHomepage && !hasGreeted) {
      setTimeout(() => {
        const welcomeMessage = "Welcome to PREPZR! I'm your AI companion. PREPZR is the world's first emotionally aware, hyper-personalized exam preparation platform designed specifically for medical and engineering aspirants. We help students prepare more effectively than traditional coaching institutes through adaptive AI technology, personalized study plans, and emotional intelligence.";
        speak(welcomeMessage);
        setHasGreeted(true);
      }, 2000);
    }
  }, [isHomepage, hasGreeted]);

  // Schedule next reminder
  const scheduleNextReminder = () => {
    if (activityTimeoutRef.current) {
      clearTimeout(activityTimeoutRef.current);
    }
    
    activityTimeoutRef.current = window.setTimeout(() => {
      if (!isSpeaking && isHomepage) {
        offerAssistance();
      }
    }, 30000); // 30 seconds of inactivity
  };

  // Offer assistance with varied messages
  const offerAssistance = () => {
    const messages = [
      "Would you like to start your free 7-day trial? Just say 'free trial' or click the signup button.",
      "Ready to test your exam readiness? Say 'exam readiness test' to analyze your preparation level.",
      "Interested in our scholarship program? Say 'scholarship test' to check your eligibility for discounts.",
      "Want to explore PREPZR's features? I can tell you how we're different from traditional coaching institutes.",
      "Ready to join thousands of successful students? Say 'signup' to create your account."
    ];
    
    const message = messages[reminderCount % messages.length];
    speak(message);
    setReminderCount(prev => prev + 1);
  };

  // Activity listeners
  useEffect(() => {
    if (!isHomepage) return;
    
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });
    
    // Initial reminder schedule
    scheduleNextReminder();
    
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      
      if (activityTimeoutRef.current) {
        clearTimeout(activityTimeoutRef.current);
      }
      
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
      }
      
      // Stop any ongoing speech when component unmounts
      window.speechSynthesis.cancel();
    };
  }, [isHomepage]);

  // Reset state when leaving homepage
  useEffect(() => {
    if (!isHomepage) {
      setHasGreeted(false);
      setReminderCount(0);
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      if (onSpeakingChange) onSpeakingChange(false);
    }
  }, [isHomepage, onSpeakingChange]);

  return null;
};

export default IntelligentHomepageAssistant;
