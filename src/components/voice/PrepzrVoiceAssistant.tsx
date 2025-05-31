
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { speakWithFemaleVoice, createIntelligentPause } from '@/utils/voiceConfig';

interface PrepzrVoiceAssistantProps {
  userName?: string;
  language?: string;
  isNewUser?: boolean;
  lastActivity?: string;
}

const PrepzrVoiceAssistant: React.FC<PrepzrVoiceAssistantProps> = ({ 
  userName = 'there',
  language = 'en-US',
  isNewUser = false,
  lastActivity
}) => {
  const [hasGreeted, setHasGreeted] = useState(false);
  const [currentContext, setCurrentContext] = useState<string>('');
  const [messagesSent, setMessagesSent] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const messageCountRef = useRef(0);
  const lastMessageTimeRef = useRef(0);
  
  // Track which messages have been spoken for this session
  const spokenInSessionRef = useRef(new Set<string>());
  
  const shouldPlayGreeting = location.pathname === '/' || 
                            location.pathname.includes('/signup') ||
                            location.pathname.includes('/welcome') ||
                            location.pathname.includes('/dashboard');

  // Get contextual message based on current page
  const getContextMessage = (path: string, userName: string, isNewUser: boolean) => {
    if (path === '/') {
      const messageKey = 'home-intro';
      if (!messagesSent.has(messageKey)) {
        setMessagesSent(prev => new Set(prev).add(messageKey));
        return `Hi ${userName}! I'm Prep Zer AI, your personal exam prep guide. Prep Zer isn't just another study app – it's your smart companion, built to help you crack your exams with confidence, structure, and speed.`;
      }
      return null;
    } else if (path.includes('/signup')) {
      const messageKey = 'signup-help';
      if (!messagesSent.has(messageKey)) {
        setMessagesSent(prev => new Set(prev).add(messageKey));
        return `Sign up to unlock a customized study journey. Prep Zer will guide you at every step.`;
      }
      return null;
    } else if (path.includes('/dashboard')) {
      if (isNewUser) {
        const messageKey = 'dashboard-welcome';
        if (!messagesSent.has(messageKey)) {
          setMessagesSent(prev => new Set(prev).add(messageKey));
          return `Congratulations, ${userName}! You've officially joined Prep Zer – your ultimate prep companion. Together, we'll build your confidence, track your progress, and make sure you're fully exam-ready.`;
        }
      } else {
        const messageKey = 'dashboard-return';
        if (!messagesSent.has(messageKey)) {
          setMessagesSent(prev => new Set(prev).add(messageKey));
          return lastActivity 
            ? `Welcome back, ${userName}! Last time you were working on ${lastActivity}. Ready to pick up where you left off?`
            : `Welcome back, ${userName}! Ready to continue your learning journey?`;
        }
      }
      return null;
    }
    
    return null;
  };

  // Smart suggestion system with intelligent breaks
  const getSmartSuggestion = (path: string) => {
    if (path === '/') {
      const suggestions = [
        { key: 'free-trial', text: "Want to try Prep Zer free before signing up? Just say 'Free trial'." },
        { key: 'explain-prepzr', text: "Curious how Prep Zer is different from coaching centers? Ask me – I'll explain." },
        { key: 'scholarship', text: "Looking for scholarships or readiness tests? I'll help you get started." }
      ];
      
      const unspokenSuggestions = suggestions.filter(s => 
        !messagesSent.has(`suggestion-${s.key}`)
      );
      
      if (unspokenSuggestions.length > 0) {
        const suggestion = unspokenSuggestions[0];
        setMessagesSent(prev => new Set(prev).add(`suggestion-${suggestion.key}`));
        return suggestion.text;
      }
      
      // After all suggestions, offer to pause
      const pauseKey = 'pause-offer';
      if (!messagesSent.has(pauseKey)) {
        setMessagesSent(prev => new Set(prev).add(pauseKey));
        return "I'll pause now. Ask me anything when you're ready.";
      }
    }
    
    return null;
  };

  // Speak with intelligent timing and prevent repetition
  const speakMessage = async (message: string) => {
    const now = Date.now();
    
    // Prevent too frequent messages (minimum 5 seconds between messages)
    if (now - lastMessageTimeRef.current < 5000) {
      return;
    }
    
    // Prevent repetition by checking if message was already sent
    const messageKey = message.toLowerCase().trim();
    if (messagesSent.has(messageKey)) {
      return;
    }
    
    const success = speakWithFemaleVoice(message, { language });
    if (success) {
      lastMessageTimeRef.current = now;
      messageCountRef.current++;
      setMessagesSent(prev => new Set(prev).add(messageKey));
      
      // After speaking, create an intelligent pause before next message
      await createIntelligentPause(4000);
    }
  };

  // Handle greetings and context-aware messages
  useEffect(() => {
    if (!shouldPlayGreeting || hasGreeted) return;
    
    const handleContextualGreeting = async () => {
      const contextMessage = getContextMessage(location.pathname, userName, isNewUser);
      
      if (contextMessage) {
        await speakMessage(contextMessage);
        setHasGreeted(true);
        setCurrentContext(location.pathname);
        
        // After greeting, provide smart suggestions with delay
        if (location.pathname === '/') {
          setTimeout(async () => {
            const suggestion = getSmartSuggestion(location.pathname);
            if (suggestion) {
              await speakMessage(suggestion);
            }
          }, 6000);
        }
      }
    };
    
    // Delay initial greeting slightly
    setTimeout(handleContextualGreeting, 1500);
  }, [location.pathname, userName, isNewUser, hasGreeted, shouldPlayGreeting]);

  // Reset context when changing routes but preserve message history
  useEffect(() => {
    if (location.pathname !== currentContext) {
      setHasGreeted(false);
      setCurrentContext('');
      // Don't clear spoken messages - let them persist for the session
    }
  }, [location.pathname, currentContext]);

  // Process voice commands (this would integrate with speech recognition)
  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('free trial')) {
      speakMessage("Starting your free trial!");
      navigate('/signup?trial=true');
    } else if (lowerCommand.includes('explain prepzr') || lowerCommand.includes('how different')) {
      speakMessage("Prep Zer is the world's first emotionally aware, hyper-personalized adaptive exam preparation platform. Unlike traditional coaching centers, we understand your mindset, not just the exam content.");
    } else if (lowerCommand.includes('scholarship') || lowerCommand.includes('readiness test')) {
      speakMessage("Let's check your exam readiness!");
      // Trigger exam analyzer
      window.dispatchEvent(new Event('open-exam-analyzer'));
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return null; // This component only handles voice logic
};

export default PrepzrVoiceAssistant;
