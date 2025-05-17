
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'react-router-dom';

interface HomePageVoiceAssistantProps {
  language?: string;
}

const HomePageVoiceAssistant: React.FC<HomePageVoiceAssistantProps> = ({ 
  language = 'en-IN' 
}) => {
  const [greetingPlayed, setGreetingPlayed] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  
  // If this is the homepage, use a 4-second delay to allow for page load
  // If this is another page, use a shorter delay
  const delayTime = location.pathname === '/' ? 4000 : 2000;
  
  useEffect(() => {
    // Only play the greeting if speech synthesis is supported
    if ('speechSynthesis' in window && !greetingPlayed) {
      const timer = setTimeout(() => {
        let message = '';
        
        // Determine appropriate welcome message based on page and user status
        if (location.pathname === '/') {
          if (user) {
            message = `Welcome back to Prep-zer. Would you like to continue your NEET exam preparation journey?`;
          } else {
            message = `Welcome to Prep-zer, your AI-powered exam preparation platform. I'm your voice assistant and I can guide you through our features. Would you like to try our free exam readiness test for NEET?`;
          }
        } else if (location.pathname.includes('/signup')) {
          message = `Welcome to Prep-zer's free trial signup. Get access to our AI-powered exam preparation tools for 7 days. I'm here to help you get started.`;
        }
        
        if (message) {
          speakMessage(message);
          setGreetingPlayed(true);
        }
      }, delayTime);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, user, greetingPlayed, delayTime]);

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create utterance with proper PREPZR pronunciation (Prep-zer)
      const correctedText = text.replace(/PREPZR/gi, 'Prep-zer');
      const utterance = new SpeechSynthesisUtterance(correctedText);
      
      // Use voices API to find an Indian female voice if available
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
      utterance.rate = 0.9; // Slightly slower for better comprehension
      utterance.pitch = 1.1; // Slightly higher pitch for female voice
      utterance.volume = 0.8;
      
      // Speak the message
      window.speechSynthesis.speak(utterance);
      
      // Dispatch event to notify other components
      document.dispatchEvent(new CustomEvent('voice-speaking-started', {
        detail: { message: correctedText }
      }));
      
      utterance.onend = () => {
        document.dispatchEvent(new Event('voice-speaking-ended'));
      };
    }
  };

  // This is an invisible component - it only provides voice functionality
  return null;
};

export default HomePageVoiceAssistant;
