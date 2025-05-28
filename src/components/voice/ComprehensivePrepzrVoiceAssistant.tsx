
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { speakWithIntelligentBreaks } from '@/utils/voiceConfig';
import { useToast } from '@/hooks/use-toast';

interface ComprehensivePrepzrVoiceAssistantProps {
  context: 'homepage' | 'signup' | 'welcome' | 'dashboard-first' | 'dashboard-returning';
  userName?: string;
  lastActivity?: string;
  onCommand?: (command: string) => void;
}

const ComprehensivePrepzrVoiceAssistant: React.FC<ComprehensivePrepzrVoiceAssistantProps> = ({
  context,
  userName,
  lastActivity,
  onCommand
}) => {
  const [currentSuggestionIndex, setSuggestionIndex] = useState(0);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const greetingPlayedRef = useRef<Set<string>>(new Set());
  const suggestionTimeoutRef = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<number | null>(null);

  // Voice messages based on comprehensive instructions
  const getContextualMessage = () => {
    switch (context) {
      case 'homepage':
        return {
          greeting: "Hi there! I'm PREPZR AI, your personal exam prep guide.",
          introduction: "PREPZR isn't just another study app – it's your smart companion, built to help you crack your exams with confidence, structure, and speed.",
          suggestions: [
            "🎁 Want to try PREPZR free before signing up? Just say 'Free trial'.",
            "📘 Curious how PREPZR is different from coaching centers? Ask me – I'll explain.",
            "🎓 Looking for scholarships or readiness tests? I'll help you get started."
          ]
        };

      case 'signup':
        return {
          greeting: "Sign up to unlock a customized study journey. PREPZR will guide you at every step.",
          introduction: "",
          suggestions: []
        };

      case 'welcome':
        return {
          greeting: `Congratulations, ${userName}! 🎉`,
          introduction: "You've officially joined PREPZR – your ultimate prep companion. Together, we'll build your confidence, track your progress, and make sure you're fully exam-ready. Let's begin this exciting journey!",
          suggestions: []
        };

      case 'dashboard-first':
        return {
          greeting: `Hi ${userName}, welcome to your dashboard.`,
          introduction: "Let's set up your first learning path and explore what PREPZR can do for you. Whenever you need help, just ask!",
          suggestions: []
        };

      case 'dashboard-returning':
        return {
          greeting: `Welcome back, ${userName}!`,
          introduction: `Last time you were working on ${lastActivity || 'your study materials'}. Ready to pick up where you left off?`,
          suggestions: []
        };

      default:
        return { greeting: "", introduction: "", suggestions: [] };
    }
  };

  const speak = (text: string, delay: number = 1000) => {
    setTimeout(() => {
      speakWithIntelligentBreaks(text, { 
        rate: 0.95, 
        pitch: 1.1, 
        volume: 0.8 
      });
    }, delay);
  };

  const speakWithIntelligentPause = (messages: string[], basePause: number = 4000) => {
    let currentDelay = 1000;
    
    messages.forEach((message, index) => {
      speak(message, currentDelay);
      // Intelligent pause calculation based on message length
      const messageLength = message.length;
      const readingTime = messageLength * 60; // ~60ms per character
      const pauseTime = Math.max(basePause, readingTime + 2000);
      currentDelay += pauseTime;
    });
  };

  const playContextualGreeting = () => {
    const contextKey = `${context}-${location.pathname}-${userName || 'anonymous'}`;
    
    // Prevent repetition for the same context
    if (greetingPlayedRef.current.has(contextKey)) {
      return;
    }

    const messages = getContextualMessage();
    const fullMessages: string[] = [];

    if (messages.greeting) {
      fullMessages.push(messages.greeting);
    }
    
    if (messages.introduction) {
      fullMessages.push(messages.introduction);
    }

    if (fullMessages.length > 0) {
      speakWithIntelligentPause(fullMessages, 3000);
      greetingPlayedRef.current.add(contextKey);
      setHasGreeted(true);

      // Start suggestion cycle for homepage only
      if (context === 'homepage' && messages.suggestions.length > 0) {
        startSuggestionCycle(messages.suggestions);
      }
    }
  };

  const startSuggestionCycle = (suggestions: string[]) => {
    let currentIndex = 0;
    
    const cycleSuggestions = () => {
      if (currentIndex < suggestions.length && !isPaused) {
        // Speak suggestion with intelligent breaks
        speak(suggestions[currentIndex], 6000);
        currentIndex++;

        if (currentIndex >= suggestions.length) {
          // After all suggestions, pause with helpful message
          speak("I'll pause now. Ask me anything when you're ready.", 10000);
          setIsPaused(true);
          
          // Resume after longer pause (optional)
          pauseTimeoutRef.current = window.setTimeout(() => {
            setIsPaused(false);
            currentIndex = 0;
            cycleSuggestions();
          }, 60000); // 1 minute pause
        } else {
          // Schedule next suggestion with intelligent pause
          suggestionTimeoutRef.current = window.setTimeout(cycleSuggestions, 8000);
        }
      }
    };

    // Start suggestion cycle after initial greeting completes
    suggestionTimeoutRef.current = window.setTimeout(cycleSuggestions, 8000);
  };

  const handleVoiceCommand = (transcript: string) => {
    const command = transcript.toLowerCase();
    
    if (command.includes('free trial') || command.includes('trial')) {
      speak("Starting your free trial with PREPZR!");
      navigate('/signup?trial=true');
    }
    else if (command.includes('different') || command.includes('coaching centers')) {
      speak("PREPZR is the world's first emotionally aware, hyper-personalized adaptive exam prep platform, unlike traditional coaching centers.");
    }
    else if (command.includes('scholarship') || command.includes('readiness test')) {
      speak("Let me show you our scholarship opportunities and readiness tests!");
      navigate('/scholarship');
    }
    else if (command.includes('sign up') || command.includes('signup')) {
      speak("Taking you to the signup page!");
      navigate('/signup');
    }
    else if (onCommand) {
      onCommand(command);
    }
  };

  // Initialize voice recognition for homepage
  useEffect(() => {
    if (context === 'homepage' && 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleVoiceCommand(transcript);
      };

      recognition.onerror = () => {
        // Silently handle errors to avoid console spam
      };

      // Auto-start listening after greeting completes
      setTimeout(() => {
        try {
          recognition.start();
        } catch (error) {
          // Handle recognition errors silently
        }
      }, 12000);

      return () => {
        recognition.stop();
      };
    }
  }, [context]);

  // Play greeting when component mounts or context changes
  useEffect(() => {
    if (!hasGreeted) {
      playContextualGreeting();
    }
  }, [context, userName, lastActivity]);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (suggestionTimeoutRef.current) {
        clearTimeout(suggestionTimeoutRef.current);
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  return null; // This component only handles voice logic
};

export default ComprehensivePrepzrVoiceAssistant;
