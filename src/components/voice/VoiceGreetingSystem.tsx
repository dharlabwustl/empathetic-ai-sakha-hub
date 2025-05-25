
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface VoiceGreetingSystemProps {
  userName?: string;
  language?: string;
  onGreetingComplete?: () => void;
}

const VoiceGreetingSystem: React.FC<VoiceGreetingSystemProps> = ({
  userName = 'Student',
  language = 'en-US',
  onGreetingComplete
}) => {
  const [hasGreeted, setHasGreeted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const location = useLocation();

  // Check if should activate based on current route
  const shouldActivate = location.pathname === '/' || 
                        location.pathname.includes('/signup') ||
                        location.pathname.includes('/login') ||
                        location.pathname.includes('/dashboard');

  useEffect(() => {
    // Check mute preference
    const mutePref = localStorage.getItem('voice_assistant_muted');
    if (mutePref === 'true') {
      setIsMuted(true);
      return;
    }

    if (!shouldActivate || hasGreeted || isMuted) return;

    // Wait for voices to load and then greet
    const initializeGreeting = () => {
      if (window.speechSynthesis) {
        const voices = window.speechSynthesis.getVoices();
        
        if (voices.length > 0) {
          setHasGreeted(true);
          const greeting = getContextualGreeting(location.pathname, userName);
          
          // Delay greeting slightly to ensure page is loaded
          setTimeout(() => {
            speakGreeting(greeting);
            onGreetingComplete?.();
          }, 1000);
        }
      }
    };

    // Handle voice loading
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.onvoiceschanged = null;
        initializeGreeting();
      };
      
      // Try immediate initialization
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        initializeGreeting();
      }
    }

    // Reset greeting state when location changes
    return () => {
      setHasGreeted(false);
    };
  }, [location.pathname, shouldActivate, hasGreeted, isMuted, userName, onGreetingComplete]);

  const getContextualGreeting = (pathname: string, userName: string): string => {
    const hour = new Date().getHours();
    const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    
    if (pathname === '/') {
      return `${timeGreeting}! Welcome to PREP-zer, India's first emotionally intelligent exam preparation platform. I'm Sakha AI, your adaptive learning companion. PREP-zer offers personalized study plans, AI tutoring, interactive concept cards, smart flashcards, practice exams, and emotional support to help you excel in competitive exams like JEE, NEET, UPSC, and CAT. Our advanced AI adapts to your learning style and emotional state, making exam preparation more effective and less stressful. Try saying "Sign up", "Free trial", "Analyze my readiness", or ask me about our features. What would you like to explore today?`;
    } else if (pathname.includes('/signup')) {
      return `${timeGreeting}! Welcome to PREP-zer's registration. I'm Sakha AI, and I'll help you get started with India's most advanced exam preparation platform. You can use voice commands during signup, or ask me any questions about our features.`;
    } else if (pathname.includes('/login')) {
      return `${timeGreeting}! Welcome back to PREP-zer. I'm here to help you access your personalized learning dashboard. Say "Demo login" for a quick preview, or ask me about any features.`;
    } else if (pathname.includes('/dashboard')) {
      const isFirstTime = localStorage.getItem('new_user_signup') === 'true';
      
      if (isFirstTime) {
        return `${timeGreeting} ${userName}! Congratulations on joining PREP-zer! I'm Sakha AI, your intelligent study companion. Welcome to your personalized dashboard - your command center for exam success. Let me guide you through our powerful features: Dashboard Overview shows your progress and key metrics. Today's Plan provides your daily study schedule. Concept Cards offer interactive learning with detailed explanations. Flashcards help with quick revision using spaced repetition. Practice Exams simulate real test conditions. Formula Lab provides interactive formulas. Academic Advisor gives personalized guidance. Feel Good Corner helps manage stress and motivation. You can ask me about any of these features, navigate using voice commands, or get study assistance anytime. What would you like to explore first?`;
      } else {
        return `${timeGreeting} ${userName}! Welcome back to your PREP-zer dashboard. I'm Sakha AI, ready to support your study session. Let me remind you about today's tasks and help you continue your exam preparation journey. You have pending study activities in your Today's Plan. I can help you navigate to Concept Cards for deep learning, Flashcards for quick revision, Practice Exams to test your knowledge, or any other feature you need. Your progress is tracked, and I'm here to provide guidance whenever you need it. What would you like to work on today?`;
      }
    }
    
    return `${timeGreeting}! Welcome to PREP-zer. I'm Sakha AI, your intelligent exam preparation assistant.`;
  };

  const speakGreeting = (message: string) => {
    if (!('speechSynthesis' in window) || isMuted) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance();
    speech.text = message.replace(/PREPZR/gi, 'PREP-zer');
    speech.lang = language;
    speech.rate = 1.0;
    speech.pitch = 1.1;
    speech.volume = 0.9;

    // Get available voices and prefer female voices
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('female') || 
      (!voice.name.toLowerCase().includes('male') && voice.lang.includes('en'))
    );
    
    if (femaleVoice) {
      speech.voice = femaleVoice;
    }

    speech.onstart = () => console.log('Greeting started');
    speech.onend = () => console.log('Greeting completed');
    speech.onerror = (e) => console.error('Speech error:', e);

    window.speechSynthesis.speak(speech);
  };

  // This component doesn't render anything visible
  return null;
};

export default VoiceGreetingSystem;
