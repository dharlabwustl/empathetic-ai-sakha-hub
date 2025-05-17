
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface VoiceGreetingProps {
  isFirstTimeUser: boolean;
  userName: string;
  language?: string;
}

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({ 
  isFirstTimeUser, 
  userName, 
  language = 'en-IN' 
}) => {
  const [greetingPlayed, setGreetingPlayed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Only welcome the user if voice is supported and not muted
    if ('speechSynthesis' in window && !greetingPlayed) {
      // Delay the greeting to ensure page has loaded
      const timer = setTimeout(() => {
        let message = '';
        
        // Different messages based on the current page and user status
        if (location.pathname.includes('welcome-flow')) {
          if (isFirstTimeUser) {
            message = `Welcome to PREPZR, ${userName}! I'm your AI voice assistant. I'll guide you through our platform setup and help you get started with your NEET exam preparation journey. Please follow the on-screen instructions to complete your onboarding.`;
          } else {
            message = `Welcome back to PREPZR, ${userName}. Let me guide you through your learning journey today.`;
          }
        } else if (location.pathname.includes('dashboard')) {
          if (isFirstTimeUser) {
            message = `Welcome to your personalized dashboard, ${userName}! Here you'll find your study plans, practice tests, and personalized recommendations. Take a moment to explore the different sections and let me know if you need any assistance.`;
          } else {
            const hour = new Date().getHours();
            let timeGreeting = '';
            
            if (hour < 12) timeGreeting = 'Good morning';
            else if (hour < 18) timeGreeting = 'Good afternoon';
            else timeGreeting = 'Good evening';
            
            message = `${timeGreeting}, ${userName}. Welcome back to your PREPZR dashboard. Your study materials are ready for you. Let me know if you need any help navigating the platform.`;
          }
        }
        
        if (message) {
          speakMessage(message);
          setGreetingPlayed(true);
        }
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isFirstTimeUser, userName, greetingPlayed, location.pathname]);

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create utterance
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Find an Indian female voice
      const voices = window.speechSynthesis.getVoices();
      const indianFemaleVoice = voices.find(v => 
        (v.name.includes('Indian') || v.lang === 'en-IN' || v.lang === 'hi-IN') && 
        (v.name.toLowerCase().includes('female') || v.name.includes('Kalpana') || v.name.includes('Kajal'))
      );
      
      if (indianFemaleVoice) {
        utterance.voice = indianFemaleVoice;
      }
      
      // Set properties
      utterance.lang = language;
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      
      // Speak the message
      window.speechSynthesis.speak(utterance);
      
      document.dispatchEvent(new CustomEvent('voice-speaking-started', {
        detail: { message: text }
      }));
      
      utterance.onend = () => {
        document.dispatchEvent(new Event('voice-speaking-ended'));
      };
    }
  };

  // This is an invisible component - it only provides voice functionality
  return null;
};

export default VoiceGreeting;
