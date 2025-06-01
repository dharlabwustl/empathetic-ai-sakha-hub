
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { speakWithFemaleVoice, getPreferredFemaleVoice } from '@/utils/voiceConfig';

interface EnhancedHomePageAssistantProps {
  language?: string;
}

const EnhancedHomePageAssistant: React.FC<EnhancedHomePageAssistantProps> = ({ 
  language = 'en-US'
}) => {
  const [greetingPlayed, setGreetingPlayed] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [offerCycle, setOfferCycle] = useState(0);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<number | null>(null);
  const lastCommandTimeRef = useRef<number>(0);
  const lastOfferTimeRef = useRef<number>(0);
  const lastGreetingPathRef = useRef<string>('');
  
  // FIXED: Better tracking of spoken messages to prevent repetition
  const spokenMessagesRef = useRef<Map<string, number>>(new Map());
  
  const shouldPlayGreeting = location.pathname === '/' || 
                            location.pathname.includes('/signup') ||
                            location.pathname.includes('/welcome') ||
                            location.pathname.includes('/free-trial') ||
                            location.pathname.includes('/exam-readiness') ||
                            location.pathname.includes('/scholarship');
  
  // Enhanced greeting messages for different pages
  const getContextMessage = (path: string) => {
    if (path === '/') {
      return "Welcome to PREPZR, the world's first emotionally aware, hyper-personalized adaptive exam preparation platform. I'm your PREPZR AI assistant.";
    } else if (path.includes('/signup')) {
      return "Welcome to PREPZR signup! I can help you navigate the registration process.";
    } else if (path.includes('/free-trial')) {
      return "Welcome to PREPZR's free trial! Experience our emotionally intelligent exam preparation platform.";
    } else if (path.includes('/exam-readiness')) {
      return "Our exam readiness analyzer will evaluate your current preparation level.";
    } else if (path.includes('/scholarship')) {
      return "Explore PREPZR's scholarship opportunities for quality education access.";
    }
    
    return "Welcome to PREPZR, where AI meets empathy in exam preparation.";
  };

  // Smart assistance offers that cycle through different topics
  const getSmartOffer = () => {
    const offers = [
      "Would you like to start a free trial? Just say 'free trial'.",
      "Curious about PREPZR features? Ask me 'what can PREPZR do'.",
      "Want to test your exam readiness? Say 'exam readiness test'.",
      "Interested in scholarships? Say 'scholarship test'.",
      "Ready to sign up? Say 'sign up' to begin."
    ];
    
    const currentOffer = offers[offerCycle % offers.length];
    setOfferCycle(prev => prev + 1);
    return currentOffer;
  };

  // Enhanced command processing for home page
  const processVoiceCommand = (transcript: string) => {
    const command = transcript.toLowerCase();
    
    // FIXED: Prevent rapid commands with longer cooldown
    const now = Date.now();
    if (now - lastCommandTimeRef.current < 3000) return;
    lastCommandTimeRef.current = now;

    // Features and information commands
    if (command.includes('features') || command.includes('what can prepzr do')) {
      speak("PREPZR offers emotionally aware learning with personalized study plans, adaptive flashcards, AI tutoring, and practice exams.");
    }
    else if (command.includes('free trial') || command.includes('try free')) {
      speak("Starting your free trial!");
      navigate('/signup?trial=true');
    }
    else if (command.includes('exam readiness') || command.includes('readiness test')) {
      speak("Let's analyze your exam readiness!");
      window.dispatchEvent(new Event('open-exam-analyzer'));
    }
    else if (command.includes('scholarship') || command.includes('scholarship test')) {
      speak("Exploring scholarship opportunities!");
      navigate('/scholarship');
    }
    else if (command.includes('signup') || command.includes('sign up') || command.includes('register')) {
      speak("Taking you to the signup page!");
      navigate('/signup');
    }
    else if (command.includes('login') || command.includes('log in')) {
      speak("Redirecting to login page.");
      navigate('/login');
    }
    else {
      speak("I can help you explore PREPZR's features or start your learning journey. What interests you?");
    }
  };

  // FIXED: Improved speak function to prevent repetition
  const speak = (text: string) => {
    if (!('speechSynthesis' in window) || audioMuted) return;
    
    const messageKey = text.toLowerCase().trim();
    const now = Date.now();
    
    // Check if this exact message was spoken recently (within 30 seconds)
    const lastSpoken = spokenMessagesRef.current.get(messageKey);
    if (lastSpoken && (now - lastSpoken) < 30000) {
      console.log('🔇 Voice: Preventing repetition of message:', text);
      return;
    }
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Store the timestamp when we start speaking
    spokenMessagesRef.current.set(messageKey, now);
    
    speakWithFemaleVoice(
      text,
      { language },
      () => {
        console.log('🔊 Voice: Speaking:', text);
      },
      () => {
        console.log('🔇 Voice: Finished speaking');
      }
    );
  };

  const offerSmartAssistance = () => {
    const now = Date.now();
    if (now - lastOfferTimeRef.current < 60000) return; // Wait 60 seconds between offers
    
    const offer = getSmartOffer();
    speak(offer);
    lastOfferTimeRef.current = now;
  };

  // FIXED: Only play greeting once per path and session
  useEffect(() => {
    if (shouldPlayGreeting && !audioMuted && location.pathname !== lastGreetingPathRef.current) {
      const contextMessage = getContextMessage(location.pathname);
      setTimeout(() => {
        speak(contextMessage);
        lastGreetingPathRef.current = location.pathname;
      }, 1000);
    }
  }, [location.pathname, audioMuted, shouldPlayGreeting]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return null; // This component only handles voice logic
};

export default EnhancedHomePageAssistant;
