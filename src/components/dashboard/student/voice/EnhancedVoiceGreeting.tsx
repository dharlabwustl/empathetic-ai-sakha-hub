
import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { MoodType } from '@/types/user/base';

interface EnhancedVoiceGreetingProps {
  isFirstTimeUser?: boolean;
  userName?: string;
  language?: string;
  mood?: MoodType;
  isLoginSession?: boolean;
}

const EnhancedVoiceGreeting: React.FC<EnhancedVoiceGreetingProps> = ({
  isFirstTimeUser = false,
  userName = 'Student',
  language = 'en-US',
  mood,
  isLoginSession = false
}) => {
  const [hasGreeted, setHasGreeted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const location = useLocation();
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timeoutRef = useRef<number | null>(null);
  
  // Check if we should activate on this page
  const shouldActivate = location.pathname.includes('/dashboard/student');

  useEffect(() => {
    // Check mute preference
    const mutePref = localStorage.getItem('voice_assistant_muted');
    if (mutePref === 'true') {
      setIsMuted(true);
      return;
    }

    // Only greet once per session and on dashboard pages
    if (!shouldActivate || hasGreeted || isMuted) return;

    const greetUser = () => {
      if (!window.speechSynthesis) return;

      const greeting = getContextualGreeting();
      
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const speech = new SpeechSynthesisUtterance(greeting);
      speech.lang = language;
      speech.rate = 1.0;
      speech.pitch = 1.1;
      speech.volume = 0.9;

      // Get female voice preference
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.name?.toLowerCase().includes('female') ||
        (voice.name?.toLowerCase().includes('zira') && !voice.name?.toLowerCase().includes('male'))
      );
      
      if (femaleVoice) {
        speech.voice = femaleVoice;
      }

      speech.onstart = () => setHasGreeted(true);
      speech.onend = () => {
        // Mark as greeted for this session
        sessionStorage.setItem('voice_greeted', 'true');
      };

      speechRef.current = speech;
      window.speechSynthesis.speak(speech);
    };

    // Check if we've already greeted in this session
    const hasGreetedThisSession = sessionStorage.getItem('voice_greeted');
    if (hasGreetedThisSession) {
      setHasGreeted(true);
      return;
    }

    // Wait for voices to load and then greet
    const initGreeting = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        timeoutRef.current = window.setTimeout(greetUser, 1500);
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.onvoiceschanged = null;
          timeoutRef.current = window.setTimeout(greetUser, 1500);
        };
      }
    };

    initGreeting();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [shouldActivate, hasGreeted, isMuted, isFirstTimeUser, userName, isLoginSession]);

  const getContextualGreeting = (): string => {
    const hour = new Date().getHours();
    const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    
    if (isFirstTimeUser) {
      return `${timeGreeting} ${userName}! Congratulations on joining PREPZR! I'm Sakha AI, your personal study companion. I'm here to help you understand our dashboard features. You can explore your study plan through the Academic Advisor, check your daily plan, study concept cards, practice with flashcards, take exams, and access our formula section. I'll guide you through each feature as you navigate. Let's make your exam preparation journey successful together!`;
    } else if (isLoginSession) {
      return `${timeGreeting} ${userName}! Welcome back to PREPZR. I hope you're feeling motivated today. Let me remind you about your daily tasks. You have pending study sessions in your today's plan, some concept cards to review, and practice exams waiting for you. I'm here to help you stay focused on your preparation and achieve your study goals. Which area would you like to focus on today?`;
    } else {
      return `${timeGreeting} ${userName}! Ready to continue your exam preparation journey? I'm here to assist you with any questions about your study plan, daily tasks, or any of our features.`;
    }
  };

  // Listen for mute events
  useEffect(() => {
    const handleMute = () => {
      setIsMuted(true);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
    
    const handleUnmute = () => setIsMuted(false);

    document.addEventListener('voice-assistant-mute', handleMute);
    document.addEventListener('voice-assistant-unmute', handleUnmute);

    return () => {
      document.removeEventListener('voice-assistant-mute', handleMute);
      document.removeEventListener('voice-assistant-unmute', handleUnmute);
    };
  }, []);

  return null;
};

export default EnhancedVoiceGreeting;
