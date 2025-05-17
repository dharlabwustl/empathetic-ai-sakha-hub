
import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'react-router-dom';
import { fixPronunciation } from '@/utils/voiceUtils';

interface HomePageVoiceAssistantProps {
  language?: string;
}

const HomePageVoiceAssistant: React.FC<HomePageVoiceAssistantProps> = ({ 
  language = 'en-IN' 
}) => {
  const [greetingPlayed, setGreetingPlayed] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const location = useLocation();
  const { user } = useAuth();
  const [voiceSupported, setVoiceSupported] = useState<boolean>(false);
  
  // If this is the homepage, use a 4-second delay to allow for page load
  // If this is another page, use a shorter delay
  const delayTime = location.pathname === '/' ? 4000 : 2000;
  
  // Initialize voice recognition
  useEffect(() => {
    if ('speechSynthesis' in window) {
      setVoiceSupported(true);
      
      // Get voices
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
        console.log("Available voices:", availableVoices.length);
      };
      
      if (window.speechSynthesis.getVoices().length > 0) {
        loadVoices();
      } else {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
      
      return () => {
        if (window.speechSynthesis.onvoiceschanged) {
          window.speechSynthesis.onvoiceschanged = null;
        }
      };
    } else {
      console.warn("Speech synthesis not supported");
    }
  }, []);
  
  useEffect(() => {
    // Only play the greeting if speech synthesis is supported
    if (voiceSupported && !greetingPlayed) {
      const timer = setTimeout(() => {
        let message = '';
        
        // Determine appropriate welcome message based on page and user status
        if (location.pathname === '/') {
          if (user) {
            message = `Welcome back to PREPZR. Would you like to continue your NEET exam preparation journey?`;
          } else {
            message = `Welcome to PREPZR, your AI-powered exam preparation platform. I'm your voice assistant and I can guide you through our features. Would you like to try our free exam readiness test for NEET?`;
          }
        } else if (location.pathname.includes('/signup')) {
          message = `Welcome to PREPZR's free trial signup. Get access to our AI-powered exam preparation tools for 7 days. I'm here to help you get started.`;
        }
        
        if (message) {
          speakMessage(message);
          setGreetingPlayed(true);
        }
      }, delayTime);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, user, greetingPlayed, delayTime, voiceSupported]);

  const speakMessage = (text: string) => {
    if (!voiceSupported) return;
    
    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create utterance with proper PREPZR pronunciation (Prep-zer)
      const correctedText = fixPronunciation(text);
      const utterance = new SpeechSynthesisUtterance(correctedText);
      
      // Use voices API to find an Indian female voice if available
      const indianFemaleVoice = voices.find(v => 
        (v.name.includes('Indian') || v.lang === 'en-IN' || v.lang === 'hi-IN') && 
        (v.name.toLowerCase().includes('female') || v.name.includes('Kalpana') || v.name.includes('Kajal'))
      );
      
      if (indianFemaleVoice) {
        console.log("Using Indian female voice:", indianFemaleVoice.name);
        utterance.voice = indianFemaleVoice;
      } else {
        console.log("No Indian female voice found. Using default voice.");
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
    } catch (error) {
      console.error("Error speaking message:", error);
    }
  };

  // This is an invisible component - it only provides voice functionality
  return null;
};

export default HomePageVoiceAssistant;
