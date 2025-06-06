
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { speakWithFemaleVoice, createIntelligentPause } from '@/utils/voiceConfig';

interface VoiceAssistantOptions {
  context: 'homepage' | 'post-signup' | 'dashboard';
  userName?: string;
  inactivityTimeout?: number;
  enableInactivityPrompts?: boolean;
}

export const useSmartVoiceAssistant = (options: VoiceAssistantOptions) => {
  const { context, userName, inactivityTimeout = 60000, enableInactivityPrompts = true } = options;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [promptCount, setPromptCount] = useState(0);
  const [userIsActive, setUserIsActive] = useState(false);
  
  const location = useLocation();
  const inactivityTimerRef = useRef<number | null>(null);
  const greetingTimeoutRef = useRef<number | null>(null);
  const lastMessageTime = useRef<number>(0);
  
  // Track user activity with immediate pause on interaction
  const trackActivity = () => {
    setLastActivityTime(Date.now());
    setUserIsActive(true);
    
    // Immediately stop any ongoing speech when user interacts
    if (isSpeaking && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    
    // Reset user activity after 3 seconds of no interaction
    setTimeout(() => {
      setUserIsActive(false);
    }, 3000);
    
    resetInactivityTimer();
  };
  
  // Reset inactivity timer
  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    
    if (enableInactivityPrompts && context === 'homepage' && !userIsActive) {
      inactivityTimerRef.current = window.setTimeout(() => {
        handleInactivityPrompt();
      }, inactivityTimeout);
    }
  };
  
  // Handle inactivity prompts based on context (only homepage)
  const handleInactivityPrompt = () => {
    if (isSpeaking || userIsActive) return;
    
    // Check 60-second minimum gap between messages
    const now = Date.now();
    if (now - lastMessageTime.current < 60000) return;
    
    let promptMessage = '';
    
    if (context === 'homepage') {
      const homepagePrompts = [
        "I'm here to help you explore PREPZR. Would you like to know about our features?",
        "Ready to start your personalized journey? Sign up and get ready to conquer your exams with PREPZR.",
        "Need assistance? I can tell you about PREPZR's benefits for exam success.",
        "Wondering how PREPZR can help you? Just ask me anything!"
      ];
      promptMessage = homepagePrompts[promptCount % homepagePrompts.length];
    }
    
    if (promptMessage && !userIsActive) {
      speak(promptMessage);
      setPromptCount(prev => prev + 1);
      resetInactivityTimer();
    }
  };
  
  // Enhanced speak function with activity and timing checks
  const speak = (text: string, isGreeting = false): boolean => {
    if (!text || userIsActive) return false;
    
    // Enforce 60-second minimum gap between messages
    const now = Date.now();
    if (now - lastMessageTime.current < 60000 && !isGreeting) {
      return false;
    }
    
    const success = speakWithFemaleVoice(
      text,
      { language: 'en-US' },
      () => {
        setIsSpeaking(true);
        console.log(`🔊 ${context} Voice: Speaking:`, text);
      },
      () => {
        setIsSpeaking(false);
        console.log(`🔇 ${context} Voice: Finished speaking`);
        
        if (isGreeting) {
          setHasGreeted(true);
        }
        
        lastMessageTime.current = Date.now();
        resetInactivityTimer();
      }
    );
    
    if (success) {
      lastMessageTime.current = now;
    }
    
    trackActivity();
    return success;
  };
  
  // Context-specific greeting messages
  const playGreeting = () => {
    if (hasGreeted || isSpeaking || userIsActive) return;
    
    let greetingMessage = '';
    
    switch (context) {
      case 'homepage':
        greetingMessage = `Welcome to PREPZR! I'm your AI companion, here to guide you through the world's first emotionally aware exam preparation platform. PREPZR helps students like you crack competitive exams with personalized study plans, smart practice, and confidence building.`;
        break;
        
      case 'post-signup':
        greetingMessage = `Congratulations, ${userName}! You've officially joined PREPZR – your exam prep companion. From today, we'll be with you at every step, making you exam-ready with personalized support, mock tests, and expert strategies.`;
        break;
        
      case 'dashboard':
        // Dashboard greetings are handled by DashboardVoiceAssistant
        return;
    }
    
    if (greetingMessage) {
      // Delay greeting slightly for better user experience
      greetingTimeoutRef.current = window.setTimeout(() => {
        if (!userIsActive) {
          speak(greetingMessage, true);
        }
      }, 1500);
    }
  };
  
  // Handle voice commands based on context
  const processCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    switch (context) {
      case 'homepage':
        return processHomepageCommand(lowerCommand);
      case 'post-signup':
        return processSignupCommand(lowerCommand);
      case 'dashboard':
        return processDashboardCommand(lowerCommand);
      default:
        return false;
    }
  };
  
  const processHomepageCommand = (command: string): boolean => {
    if (command.includes('features') || command.includes('what can prepzr do')) {
      speak("PREPZR offers emotionally aware learning with personalized study plans, adaptive practice, AI tutoring, and comprehensive exam preparation for NEET, JEE, and other competitive exams.");
      return true;
    }
    
    if (command.includes('free trial') || command.includes('trial')) {
      speak("Great choice! Our free trial gives you full access to PREPZR's features for 7 days. You can explore personalized study plans, take practice tests, and experience our AI guidance.");
      return true;
    }
    
    if (command.includes('signup') || command.includes('join')) {
      speak("Let's start your personalized journey. Sign up and get ready to conquer your exams with PREPZR.");
      return true;
    }
    
    return false;
  };
  
  const processSignupCommand = (command: string): boolean => {
    if (command.includes('next step') || command.includes('what now')) {
      speak(`I recommend starting with your exam readiness test to understand your current level, ${userName}, then exploring your personalized study plan.`);
      return true;
    }
    
    return false;
  };
  
  const processDashboardCommand = (command: string): boolean => {
    if (command.includes('help') || command.includes('guide')) {
      speak(`I'm here to help with your studies, ${userName}. You can ask about your progress, next topics to study, or get motivational support.`);
      return true;
    }
    
    return false;
  };
  
  // Setup activity listeners with comprehensive event tracking
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click', 'keydown'];
    
    events.forEach(event => {
      document.addEventListener(event, trackActivity, true);
    });
    
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, trackActivity, true);
      });
    };
  }, []);
  
  // Play greeting when context changes
  useEffect(() => {
    setHasGreeted(false);
    setPromptCount(0);
    setUserIsActive(false);
    
    // Clear existing timers
    if (greetingTimeoutRef.current) {
      clearTimeout(greetingTimeoutRef.current);
    }
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    
    // Cancel any ongoing speech on route change
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    
    // Play greeting for appropriate contexts
    if (context === 'homepage' || context === 'post-signup') {
      playGreeting();
    }
  }, [context, location.pathname]);
  
  // Cleanup on unmount and route changes
  useEffect(() => {
    return () => {
      if (greetingTimeoutRef.current) {
        clearTimeout(greetingTimeoutRef.current);
      }
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  
  return {
    isSpeaking,
    hasGreeted,
    speak,
    playGreeting,
    processCommand,
    trackActivity
  };
};
