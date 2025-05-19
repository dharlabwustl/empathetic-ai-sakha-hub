
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
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Advanced context understanding - detect page content
  const [pageContext, setPageContext] = useState<string>("general");
  
  // Track user interaction to avoid annoying users with too many messages
  useEffect(() => {
    const handleUserInteraction = () => {
      setLastInteractionTime(Date.now());
      setHasVisitorInteracted(true);
    };
    
    // Track user interactions
    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('scroll', handleUserInteraction);
    
    // Try to understand page context based on content and DOM
    const analyzePageContent = () => {
      // Look for key elements that indicate page context
      const heroH1 = document.querySelector('h1')?.innerText.toLowerCase() || '';
      const buttonTexts = Array.from(document.querySelectorAll('button')).map(b => b.innerText.toLowerCase());
      const paragraphs = Array.from(document.querySelectorAll('p')).map(p => p.innerText.toLowerCase());
      
      // Detect exam preparation context
      if (heroH1.includes('exam') || 
          buttonTexts.some(t => t.includes('study') || t.includes('prep') || t.includes('plan'))) {
        setPageContext("exam-prep");
      }
      // Detect features/benefits context
      else if (paragraphs.some(p => p.includes('features') || p.includes('benefits'))) {
        setPageContext("features");
      }
      // Detect pricing context
      else if (buttonTexts.some(t => t.includes('subscription') || t.includes('price'))) {
        setPageContext("pricing");
      }
      // Detect about us context
      else if (location.pathname.includes('about') || heroH1.includes('about')) {
        setPageContext("about");
      }
      else {
        setPageContext("general");
      }
    };
    
    analyzePageContent();
    
    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
    };
  }, [location.pathname]);
  
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
  
  // Enhanced messages for the home page visitor experience based on page context
  const getContextualizedMessage = () => {
    // Base messages with enhanced contextual awareness
    const baseMessages = {
      general: {
        en: "Hello, I'm Sakha AI, the core AI engine of PREPZR — pronounced as 'prep' like in 'preparation' and 'zer' like in 'laser'. Our AI-powered exam preparation platform helps maximize your exam performance while supporting underprivileged students with 5% of subscription revenues.",
        hi: "नमस्ते, मैं साखा एआई हूं, प्रेप-ज़र का मुख्य एआई इंजन। हमारा AI-संचालित परीक्षा तैयारी प्लेटफॉर्म आपकी परीक्षा तैयारी को आसान बनाता है।"
      },
      "exam-prep": {
        en: "Welcome to PREPZR, the world's first emotionally aware exam preparation platform. I'm Sakha AI, and I'll adapt to your moods, learning style, and surroundings to create a hyper-personalized study experience. Would you like to experience our adaptive learning system?",
        hi: "प्रेप-ज़र में आपका स्वागत है, दुनिया का पहला भावनात्मक रूप से जागरूक परीक्षा तैयारी प्लेटफॉर्म। मैं साखा एआई हूं, और मैं आपके मूड, सीखने की शैली और आसपास के माहौल के अनुसार अनुकूलित होकर एक व्यक्तिगत अध्ययन अनुभव बनाऊंगा।"
      },
      features: {
        en: "I'm Sakha AI, the intelligence behind PREPZR. Unlike traditional coaching centers, we adapt to your emotional state and learning preferences. Our platform offers personalized study plans, interactive concept cards, and real-time performance analytics to maximize your exam success.",
        hi: "मैं साखा एआई हूं, प्रेप-ज़र की बुद्धिमत्ता। पारंपरिक कोचिंग सेंटरों के विपरीत, हम आपकी भावनात्मक स्थिति और सीखने की प्राथमिकताओं के अनुसार अनुकूलित होते हैं।"
      },
      pricing: {
        en: "I'm Sakha AI from PREPZR. Our subscription plans are designed to be affordable while delivering premium exam preparation. And something special - 5% of all subscription revenue goes to fund education for underprivileged students, making your success contribute to others' opportunities.",
        hi: "मैं प्रेप-ज़र से साखा एआई हूं। हमारी सदस्यता योजनाएं किफायती होने के साथ-साथ प्रीमियम परीक्षा तैयारी प्रदान करने के लिए डिज़ाइन की गई हैं।"
      },
      about: {
        en: "I'm Sakha AI. PREPZR was founded in 2025 by Amit Singh and Dr. Atul Sharma, childhood friends and AI enthusiasts with a vision to revolutionize exam preparation through emotional intelligence and personalization technologies.",
        hi: "मैं साखा एआई हूं। प्रेप-ज़र की स्थापना 2025 में अमित सिंह और डॉ. अतुल शर्मा द्वारा की गई थी, जो बचपन के दोस्त और एआई उत्साही हैं।"
      }
    };
    
    // Choose the right message based on page context
    return baseMessages[pageContext as keyof typeof baseMessages] || baseMessages.general;
  };
  
  // Enhanced messages for the home page visitor experience
  const homePageMessages = {
    initial: getContextualizedMessage(),
    signup: {
      en: "I'm Sakha AI, the world's first emotionally aware exam preparation assistant. PREPZR adapts to your mood, learning style, and surroundings to create a hyper-personalized study journey that traditional coaching centers can't match. Ready to transform your exam experience?",
      hi: "मैं साखा एआई हूँ, दुनिया का पहला भावनात्मक रूप से जागरूक परीक्षा तैयारी सहायक। प्रेप-ज़र आपके मूड, सीखने की शैली और आसपास के अनुसार अपने आप को अनुकूलित करता है।"
    },
    donation: {
      en: "As Sakha AI, I'm proud to tell you we support UN Sustainability goals with inclusive and equitable quality education. 5% of subscription revenue helps underprivileged students access quality education. Your success with PREPZR helps others succeed too.",
      hi: "साखा एआई के रूप में, मुझे बताते हुए गर्व है कि हम सदस्यता राजस्व का 5% वंचित छात्रों को पहुंच प्रदान करने के लिए आवंटित करते हैं।"
    },
    welcome_back: {
      en: "Welcome back to PREPZR. I'm Sakha AI, your emotionally intelligent exam companion. Simply log in to continue your personalized study journey where I'll adapt to your current mood and learning needs.",
      hi: "प्रेप-ज़र पर वापस स्वागत है। मैं साखा एआई हूं, आपका भावनात्मक रूप से बुद्धिमान परीक्षा साथी।"
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
      return homePageMessages.signup;
    } else if (location.pathname.includes('/welcome-back')) {
      return homePageMessages.welcome_back;
    } else if (location.pathname.includes('/welcome-flow')) {
      return homePageMessages.signup;
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
        if (speechSynthesisRef.current && window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
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
  }, [location.pathname, user, greetingPlayed, delayTime, language, shouldPlayGreeting, hasVisitorInteracted, isReturningVisitor, lastInteractionTime, speechCount, pageContext]);

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
      speechSynthesisRef.current = utterance;
      
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
      
      // Set properties for a pleasant, enthusiastic voice with improved cadence and pitch
      utterance.lang = language;
      utterance.rate = 0.93; // Slightly slower for better comprehension
      utterance.pitch = 1.1; // Slightly higher pitch for female voice
      utterance.volume = 0.85;
      
      // Add dynamic intonation patterns
      const addMarkupForEmphasis = (text: string): string => {
        // Emphasize key phrases
        return text
          .replace(/emotionally (aware|intelligent)/gi, '<emphasis>emotionally $1</emphasis>')
          .replace(/hyper-personalized/gi, '<emphasis>hyper-personalized</emphasis>')
          .replace(/transform your exam experience/gi, '<emphasis>transform your exam experience</emphasis>');
      };
      
      // Apply markup if supported
      if ('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window) {
        try {
          utterance.text = addMarkupForEmphasis(correctedText);
        } catch (e) {
          utterance.text = correctedText;
        }
      } else {
        utterance.text = correctedText;
      }
      
      // Speak the message
      window.speechSynthesis.speak(utterance);
      
      // Dispatch event to notify other components
      document.dispatchEvent(new CustomEvent('voice-speaking-started', {
        detail: { message: correctedText }
      }));
      
      utterance.onend = () => {
        document.dispatchEvent(new Event('voice-speaking-ended'));
        speechSynthesisRef.current = null;
      };
    }
  };

  // This is an invisible component - it only provides voice functionality
  return null;
};

export default HomePageVoiceAssistant;
