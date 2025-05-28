
import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { speakWithFemaleVoice } from '@/utils/voiceConfig';
import { useToast } from '@/hooks/use-toast';

interface PrepzrVoiceAssistantProps {
  context: 'homepage' | 'signup' | 'welcome' | 'dashboard-first' | 'dashboard-returning';
  userName?: string;
  lastActivity?: string;
  onCommand?: (command: string) => void;
}

const PrepzrVoiceAssistant: React.FC<PrepzrVoiceAssistantProps> = ({
  context,
  userName,
  lastActivity,
  onCommand
}) => {
  const [hasGreeted, setHasGreeted] = useState(false);
  const [suggestionCycle, setSuggestionCycle] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const greetingPlayedRef = useRef<Set<string>>(new Set());
  const lastSuggestionTimeRef = useRef<number>(0);
  const pauseTimeoutRef = useRef<number | null>(null);

  // Voice messages based on context
  const getContextualMessage = () => {
    const timeOfDay = new Date().getHours();
    const greeting = timeOfDay < 12 ? 'Good morning' : timeOfDay < 17 ? 'Good afternoon' : 'Good evening';

    switch (context) {
      case 'homepage':
        return {
          greeting: `${greeting}! I'm PREPZR AI – your smart preparation partner.`,
          introduction: "PREPZR is built for students like you to master every step of your exam journey – smarter, faster, and more confidently.",
          suggestions: [
            "📚 Curious about how PREPZR compares with other platforms or coaching centers? Just ask me.",
            "🎁 Want to explore a free trial or check your exam readiness with our smart tools? I'm here to help.",
            "🎓 You might also want to know about scholarships available through PREPZR – I can guide you there."
          ]
        };

      case 'signup':
        return {
          greeting: "Sign up now to unlock your personalized exam preparation journey with PREPZR.",
          introduction: "",
          suggestions: []
        };

      case 'welcome':
        return {
          greeting: `Welcome aboard, ${userName}! 🎉`,
          introduction: "You've just taken the first step toward your success. PREPZR is your personal guide for focused, goal-based exam preparation. Whether it's UPSC, JEE, NEET, or more—PREPZR will walk with you at every step to keep you on track and exam-ready. Let's begin!",
          suggestions: []
        };

      case 'dashboard-first':
        return {
          greeting: `Hi ${userName}, welcome to your dashboard!`,
          introduction: "Let's build your first learning path and get started. If you need help at any point, I'm just a tap away.",
          suggestions: []
        };

      case 'dashboard-returning':
        return {
          greeting: `Welcome back, ${userName}!`,
          introduction: `Last time, you were ${lastActivity || 'exploring your study materials'}. Ready to continue? Just say the word!`,
          suggestions: getDashboardSuggestions(timeOfDay)
        };

      default:
        return { greeting: "", introduction: "", suggestions: [] };
    }
  };

  const getDashboardSuggestions = (timeOfDay: number) => {
    if (timeOfDay < 10) {
      return [
        "🌅 Ready to start your morning revision?",
        "📊 Check your study streak and today's goals",
        "☕ Let's plan your day with smart study blocks"
      ];
    } else if (timeOfDay < 14) {
      return [
        "⚡ Time for some productive practice sessions",
        "🎯 Focus on your weak areas with targeted exercises",
        "📈 Review your progress and adjust your plan"
      ];
    } else if (timeOfDay < 18) {
      return [
        "🔄 Perfect time for concept revision",
        "📝 Take a quick practice test",
        "💡 Review today's learning highlights"
      ];
    } else {
      return [
        "🌙 Wind down with light revision",
        "📚 Review flashcards before tomorrow",
        "✅ Mark today's progress and plan tomorrow"
      ];
    }
  };

  const speak = (text: string, delay: number = 1000) => {
    setTimeout(() => {
      speakWithFemaleVoice(text, { 
        rate: 0.95, 
        pitch: 1.1, 
        volume: 0.8 
      });
    }, delay);
  };

  const speakWithPause = (messages: string[], basePause: number = 6000) => {
    let currentDelay = 1000;
    
    messages.forEach((message, index) => {
      speak(message, currentDelay);
      currentDelay += message.length * 50 + basePause + (index * 2000); // Intelligent pause based on message length
    });
  };

  const playContextualGreeting = () => {
    const contextKey = `${context}-${location.pathname}`;
    
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
      speakWithPause(fullMessages, 2000);
      greetingPlayedRef.current.add(contextKey);
      setHasGreeted(true);

      // Start suggestion cycle for homepage
      if (context === 'homepage' && messages.suggestions.length > 0) {
        startSuggestionCycle(messages.suggestions);
      }
    }
  };

  const startSuggestionCycle = (suggestions: string[]) => {
    const now = Date.now();
    if (now - lastSuggestionTimeRef.current < 30000) return; // Prevent rapid suggestions

    let currentIndex = 0;
    const cycleSuggestions = () => {
      if (currentIndex < suggestions.length && !isPaused) {
        speak(suggestions[currentIndex], 8000);
        currentIndex++;
        lastSuggestionTimeRef.current = Date.now();

        if (currentIndex >= suggestions.length) {
          // After all suggestions, pause and offer help
          speak("Just let me know when you're ready to explore more.", 15000);
          setIsPaused(true);
          
          // Resume after longer pause
          pauseTimeoutRef.current = window.setTimeout(() => {
            setIsPaused(false);
            currentIndex = 0;
            cycleSuggestions();
          }, 45000);
        } else {
          setTimeout(cycleSuggestions, 12000); // Pause between suggestions
        }
      }
    };

    setTimeout(cycleSuggestions, 5000); // Initial delay before suggestions
  };

  const handleVoiceCommand = (transcript: string) => {
    const command = transcript.toLowerCase();
    
    if (command.includes('compare') || command.includes('vs') || command.includes('versus')) {
      speak("PREPZR stands out with emotionally aware AI that adapts to your mood and learning style, unlike traditional platforms.");
    }
    else if (command.includes('free trial') || command.includes('trial')) {
      speak("Starting your 7-day free trial!");
      navigate('/signup?trial=true');
    }
    else if (command.includes('scholarship') || command.includes('scholarships')) {
      speak("Let me show you our scholarship opportunities!");
      navigate('/scholarship');
    }
    else if (command.includes('exam readiness') || command.includes('readiness')) {
      speak("Let's analyze your exam readiness!");
      // Trigger exam analyzer
      window.dispatchEvent(new Event('open-exam-analyzer'));
    }
    else if (onCommand) {
      onCommand(command);
    }
  };

  // Initialize voice recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleVoiceCommand(transcript);
      };

      // Auto-start listening after greeting (for homepage only)
      if (context === 'homepage') {
        setTimeout(() => {
          recognition.start();
        }, 8000);
      }

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
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  return null; // This component only handles voice logic
};

export default PrepzrVoiceAssistant;
