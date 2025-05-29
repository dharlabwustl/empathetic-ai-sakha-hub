
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
  const { context, userName, inactivityTimeout = 45000, enableInactivityPrompts = true } = options;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [promptCount, setPromptCount] = useState(0);
  
  const location = useLocation();
  const inactivityTimerRef = useRef<number | null>(null);
  const greetingTimeoutRef = useRef<number | null>(null);
  
  // Track user activity
  const trackActivity = () => {
    setLastActivityTime(Date.now());
    resetInactivityTimer();
  };
  
  // Reset inactivity timer
  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    
    if (enableInactivityPrompts && context !== 'dashboard') {
      inactivityTimerRef.current = window.setTimeout(() => {
        handleInactivityPrompt();
      }, inactivityTimeout);
    }
  };
  
  // Handle inactivity prompts based on context
  const handleInactivityPrompt = () => {
    if (isSpeaking) return;
    
    let promptMessage = '';
    
    switch (context) {
      case 'homepage':
        const homepagePrompts = [
          "I'm here to help you explore Prep-Zer. Would you like to know about our features?",
          "Ready to start your exam preparation journey? I can guide you through our free trial.",
          "Need assistance? I can tell you about Prep-Zer's benefits for exam success.",
          "Wondering how Prep-Zer can help you? Just ask me anything!"
        ];
        promptMessage = homepagePrompts[promptCount % homepagePrompts.length];
        break;
        
      case 'post-signup':
        const signupPrompts = [
          "Ready to take the next step? I recommend starting with your exam readiness test.",
          "Would you like me to guide you through your first study session?",
          "Let's get you started on your personalized learning journey!"
        ];
        promptMessage = signupPrompts[promptCount % signupPrompts.length];
        break;
        
      case 'dashboard':
        // Dashboard is silent unless invoked
        return;
    }
    
    if (promptMessage) {
      speak(promptMessage);
      setPromptCount(prev => prev + 1);
      resetInactivityTimer();
    }
  };
  
  // Enhanced speak function with context awareness
  const speak = (text: string, isGreeting = false): boolean => {
    if (!text) return false;
    
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
          resetInactivityTimer();
        }
      }
    );
    
    trackActivity();
    return success;
  };
  
  // Context-specific greeting messages
  const playGreeting = () => {
    if (hasGreeted || isSpeaking) return;
    
    let greetingMessage = '';
    
    switch (context) {
      case 'homepage':
        greetingMessage = `Welcome to Prep-Zer! I'm your A-I companion here to guide you through the world's first emotionally aware exam preparation platform. Prep-Zer helps students like you crack competitive exams with personalized study plans, smart practice, and confidence building.`;
        break;
        
      case 'post-signup':
        const userGreeting = userName ? `Welcome to Prep-Zer, ${userName}!` : 'Welcome to Prep-Zer!';
        greetingMessage = `${userGreeting} Congratulations on joining our community! You've taken the first step towards exam success. I'm here to guide you through your personalized learning journey.`;
        break;
        
      case 'dashboard':
        if (userName) {
          const welcomeMessages = [
            `Welcome back, ${userName}! Ready to continue your learning journey?`,
            `Hi ${userName}! Let's make today productive.`,
            `Great to see you back, ${userName}! Your dedication shows.`
          ];
          greetingMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        } else {
          greetingMessage = "Welcome back! Ready to continue your studies?";
        }
        break;
    }
    
    if (greetingMessage) {
      // Delay greeting slightly for better user experience
      greetingTimeoutRef.current = window.setTimeout(() => {
        speak(greetingMessage, true);
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
      speak("Prep-Zer offers emotionally aware learning with personalized study plans, adaptive practice, A-I tutoring, and comprehensive exam preparation for N-E-E-T, J-E-E, and other competitive exams.");
      return true;
    }
    
    if (command.includes('free trial') || command.includes('trial')) {
      speak("Great choice! Our free trial gives you full access to Prep-Zer's features for 7 days. You can explore personalized study plans, take practice tests, and experience our A-I guidance.");
      return true;
    }
    
    if (command.includes('exam readiness') || command.includes('readiness test')) {
      speak("Our exam readiness analyzer evaluates your current preparation level across all subjects and provides personalized recommendations. It's a great way to understand where you stand!");
      return true;
    }
    
    if (command.includes('scholarship') || command.includes('discount')) {
      speak("Prep-Zer offers scholarship opportunities based on your performance. Take our scholarship test to qualify for discounts and financial assistance!");
      return true;
    }
    
    if (command.includes('better than') || command.includes('why prepzr')) {
      speak("Unlike traditional coaching or other platforms, Prep-Zer understands your emotions and adapts to your learning style. We provide personalized guidance, not one-size-fits-all solutions.");
      return true;
    }
    
    return false;
  };
  
  const processSignupCommand = (command: string): boolean => {
    if (command.includes('next step') || command.includes('what now')) {
      speak("I recommend starting with your exam readiness test to understand your current level, then exploring your personalized study plan.");
      return true;
    }
    
    if (command.includes('exam readiness') || command.includes('test')) {
      speak("Perfect! The exam readiness test will analyze your strengths and areas for improvement. It's the best way to begin your journey.");
      return true;
    }
    
    return false;
  };
  
  const processDashboardCommand = (command: string): boolean => {
    // Dashboard commands will be context-aware based on user progress
    if (command.includes('help') || command.includes('guide')) {
      speak("I'm here to help with your studies. You can ask about your progress, next topics to study, or get motivational support.");
      return true;
    }
    
    return false;
  };
  
  // Setup activity listeners
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
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
    
    // Clear existing timers
    if (greetingTimeoutRef.current) {
      clearTimeout(greetingTimeoutRef.current);
    }
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    
    // Play greeting for appropriate contexts
    if (context === 'homepage' || context === 'post-signup') {
      playGreeting();
    }
  }, [context, location.pathname]);
  
  // Cleanup on unmount
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
