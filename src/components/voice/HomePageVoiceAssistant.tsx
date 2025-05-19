import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'react-router-dom';

interface HomePageVoiceAssistantProps {
  language?: string;
}

const HomePageVoiceAssistant: React.FC<HomePageVoiceAssistantProps> = ({ 
  language = 'en-IN' // Setting English as default, with India accent
}) => {
  const [greetingPlayed, setGreetingPlayed] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const [hasVisitorInteracted, setHasVisitorInteracted] = useState(false);
  const [speechCount, setSpeechCount] = useState(0);
  const [lastPagePath, setLastPagePath] = useState<string | null>(null);
  const location = useLocation();
  const { user } = useAuth();
  const messageTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Track user interaction to avoid annoying users with too many messages
  useEffect(() => {
    const handleUserInteraction = () => {
      setLastInteractionTime(Date.now());
      setHasVisitorInteracted(true);
    };
    
    // Track user interactions
    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('scroll', handleUserInteraction);
    
    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
    };
  }, []);
  
  // Check for page changes and cancel ongoing speech
  useEffect(() => {
    const path = location.pathname;
    // If page has changed, cancel any ongoing speech
    if (path !== lastPagePath) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setLastPagePath(path);
      setGreetingPlayed(false);
    }
  }, [location.pathname, lastPagePath]);
  
  // Only play greeting on specific pages, not on concept pages or dashboard pages
  const shouldPlayGreeting = location.pathname === '/' || 
                            location.pathname.includes('/signup') ||
                            location.pathname.includes('/welcome-back') ||
                            location.pathname.includes('/welcome-flow');
  
  // If this is the homepage, use a 4-second delay to allow for page load
  // If this is another page, use a shorter delay
  const delayTime = location.pathname === '/' ? 4000 : 2000;
  
  // Check if user has seen the homepage before to avoid repeating for returning visitors
  const isReturningVisitor = localStorage.getItem('has_visited_homepage') === 'true';
  
  // Enhanced messages for the home page visitor experience
  const homePageMessages = {
    initial: {
      en: "Hello, I'm Sakha AI, the core AI engine of PREPZR — pronounced as 'prep' like in 'preparation' and 'zer' like in 'laser'. Our AI-powered exam preparation platform helps maximize your exam performance while supporting underprivileged students with 5% of subscription revenues.",
      hi: "नमस्ते, मैं साखा एआई हूं, प्रेप-ज़र का मुख्य एआई इंजन। हमारा AI-संचालित परीक्षा तैयारी प्लेटफॉर्म आपकी परीक्षा तैयारी को आसान बनाता है।"
    },
    signup: {
      en: "I'm Sakha AI, and I'll help you crack your exams. Want to know why PREPZR outshines coaching centers? Let me tell you. Explore our free trial and take the Exam Readiness Challenge to see where you stand.",
      hi: "मैं साखा एआई हूँ, और मैं आपको अपनी परीक्षाओं में सफलता प्राप्त करने में मदद करूँगा। अपनी परीक्षा की तैयारी शुरू कर���े के लिए तैयार हैं? हमारे प्रीमियम ट्रायल के लिए साइन अप करें।"
    },
    features: {
      en: "I'm Sakha AI, your exam assistant. Unlike coaching institutes, PREPZR offers 24/7 access to personalized study plans and AI tutoring that focuses on your weak areas.",
      hi: "मैं साखा एआई हूं, आपका परीक्षा सहायक। कोचिंग संस्थानों के विपरीत, प्रेप-ज़र आपको व्यक्तिगत अध्ययन योजनाओं और AI ट्यूटरिंग तक 24/7 पहुंच प्रदान करता है।"
    },
    donation: {
      en: "As Sakha AI, I'm proud to tell you we support UN Sustainability goals with inclusive and equitable quality education. 5% of subscription revenue helps underprivileged students access quality education.",
      hi: "साखा एआई के रूप में, मुझे बताते हुए गर्व है कि हम सदस्यता राजस्व का 5% वंचित छात्रों को पहुंच प्रदान करने के लिए आवंटित करते हैं।"
    },
    welcome_back: {
      en: "Welcome back to PREPZR. I'm Sakha AI, your exam companion. Simply log in to continue your personalized study journey.",
      hi: "प्रेप-ज़र पर वापस स्वागत है। मैं साखा एआई हूं, आपका परीक्षा साथी। बस लॉग इन करें और अपनी अध्ययन यात्रा जारी रखें।"
    }
  };
  
  // Get context-aware message based on page and interaction
  const getContextMessage = () => {
    if (location.pathname === '/') {
      // For homepage, base message on whether they've scrolled or clicked
      if (hasVisitorInteracted && speechCount === 0) {
        setSpeechCount(1);
        return homePageMessages.signup;
      } else if (speechCount === 0) {
        return homePageMessages.initial;
      }
    } else if (location.pathname.includes('/signup')) {
      return homePageMessages.features;
    } else if (location.pathname.includes('/welcome-back')) {
      return homePageMessages.welcome_back;
    } else if (location.pathname.includes('/welcome-flow')) {
      return homePageMessages.features;
    }
    
    return null;
  };
  
  useEffect(() => {
    // Only play the greeting if speech synthesis is supported and we're on the right page
    if ('speechSynthesis' in window && !greetingPlayed && shouldPlayGreeting) {
      // Skip initial greeting for returning visitors or show reduced greeting
      if (isReturningVisitor && location.pathname === '/') {
        // Mark as played and skip for returning visitor on homepage
        setGreetingPlayed(true);
        localStorage.setItem('has_visited_homepage', 'true');
        return;
      }
      
      const timer = setTimeout(() => {
        const contextMessage = getContextMessage();
        if (!contextMessage) {
          setGreetingPlayed(true);
          return;
        }
        
        const message = language.includes('hi') ? contextMessage.hi : contextMessage.en;
        
        // Set flag to remember this visitor has been to the homepage
        localStorage.setItem('has_visited_homepage', 'true');
        
        if (message) {
          speakMessage(message);
          setGreetingPlayed(true);
        }
      }, delayTime);
      
      return () => {
        if (timer) clearTimeout(timer);
        if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
      };
    }
    
    // Reset the played state when navigating to a different page
    return () => {
      if (messageTimerRef.current) {
        clearTimeout(messageTimerRef.current);
      }
      
      if (location.pathname) {
        setGreetingPlayed(false);
      }
    };
  }, [location.pathname, user, greetingPlayed, delayTime, language, shouldPlayGreeting, hasVisitorInteracted, isReturningVisitor, lastInteractionTime, speechCount]);

  // Properly format the speakMessage function to ensure correct PREPZR pronunciation
  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create utterance with proper PREPZR pronunciation (Prep-zer) with a pause between syllables
      // Using phonetic spelling for better pronunciation: "Prep" (as in preparation) + "zer" (as in laser)
      const correctedText = text
        .replace(/PREPZR/gi, 'Prep-zer')
        .replace(/prepzr/gi, 'Prep-zer')
        .replace(/Prepzr/g, 'Prep-zer');
      
      const utterance = new SpeechSynthesisUtterance(correctedText);
      
      // Use voices API to find an appropriate voice based on language
      const voices = window.speechSynthesis.getVoices();
      let selectedVoice = null;
      
      if (language === 'hi-IN') {
        // Try to find a Hindi female voice
        selectedVoice = voices.find(v => 
          v.lang === 'hi-IN' || v.lang.includes('hi') && 
          (v.name.toLowerCase().includes('female') || v.name.includes('Kalpana'))
        );
      } else if (language === 'en-IN') {
        // Try to find an Indian English voice
        selectedVoice = voices.find(v => 
          (v.lang === 'en-IN' || v.name.includes('Indian')) && 
          (v.name.toLowerCase().includes('female') || v.name.includes('Kalpana') || v.name.includes('Kajal'))
        );
      }
      
      // If no specific voice found, try to find any voice matching the language
      if (!selectedVoice) {
        selectedVoice = voices.find(v => v.lang === language);
      }
      
      // If still no match, use default voice
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      // Set properties for a pleasant, enthusiastic voice
      utterance.lang = language;
      utterance.rate = 0.95; // Slightly slower for better comprehension
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
