
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useIntelligentVoiceAssistant } from '@/hooks/useIntelligentVoiceAssistant';
import EnhancedSpeechRecognition from './EnhancedSpeechRecognition';

interface IntelligentHomepageAssistantProps {
  language?: string;
  onSpeakingChange?: (isSpeaking: boolean) => void;
}

const IntelligentHomepageAssistant: React.FC<IntelligentHomepageAssistantProps> = ({ 
  language = 'en-US',
  onSpeakingChange
}) => {
  const location = useLocation();
  const shouldPlayWelcome = location.pathname === '/';
  const [hasGreeted, setHasGreeted] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'welcome' | 'introduction' | 'actions' | 'quiet'>('welcome');
  const phaseTimerRef = useRef<number | null>(null);
  const reminderTimerRef = useRef<number | null>(null);
  const lastActivityRef = useRef(Date.now());
  
  const { isSpeaking, playInitialGreeting, speak, trackActivity } = useIntelligentVoiceAssistant({
    language,
    onSpeakingChange,
    inactivityTimeout: 30000 // 30 seconds for homepage
  });

  // Comprehensive welcome sequence
  useEffect(() => {
    if (shouldPlayWelcome && !hasGreeted) {
      startWelcomeSequence();
      setHasGreeted(true);
    }
  }, [shouldPlayWelcome, hasGreeted]);

  const startWelcomeSequence = () => {
    // Phase 1: Welcome visitor
    const welcomeMessage = "Welcome visitor! I'm your AI companion at PREPZR.";
    playInitialGreeting(welcomeMessage);
    
    setCurrentPhase('welcome');
    
    // Phase 2: Detailed introduction after welcome
    phaseTimerRef.current = window.setTimeout(() => {
      if (!isSpeaking) {
        introducePrePZR();
      }
    }, 3000);
  };

  const introducePrePZR = () => {
    const introductionMessage = `PREPZR is the world's first emotionally aware, hyper-personalized adaptive exam preparation platform. We use cutting-edge AI to understand your learning style, emotional state, and academic needs to create the most effective study experience possible. Our platform adapts in real-time to help you master concepts faster, retain information longer, and achieve your exam goals with confidence.`;
    
    speak(introductionMessage, false);
    setCurrentPhase('introduction');
    
    // Phase 3: Offer quick actions
    phaseTimerRef.current = window.setTimeout(() => {
      if (!isSpeaking) {
        offerQuickActions();
      }
    }, 8000);
  };

  const offerQuickActions = () => {
    const actionsMessage = `Ready to transform your exam preparation? You can start your free 7-day trial, sign up for full access, or take our exam readiness test to see where you stand. You can also explore our scholarship opportunities. Just say what interests you most!`;
    
    speak(actionsMessage, false);
    setCurrentPhase('actions');
    
    // Phase 4: Enter quiet mode
    phaseTimerRef.current = window.setTimeout(() => {
      enterQuietMode();
    }, 6000);
  };

  const enterQuietMode = () => {
    setCurrentPhase('quiet');
    scheduleReminder();
  };

  const scheduleReminder = () => {
    // Schedule first reminder after 30 seconds
    reminderTimerRef.current = window.setTimeout(() => {
      if (currentPhase === 'quiet' && !isSpeaking) {
        provideGentleReminder();
      }
    }, 30000);
  };

  const provideGentleReminder = () => {
    const reminders = [
      "I'm here if you need any assistance exploring PREPZR's features.",
      "Ready to begin your learning journey? Just let me know how I can help.",
      "Would you like to know more about how PREPZR can transform your exam preparation?",
      "I can guide you through getting started with your free trial or any other questions you have."
    ];
    
    const randomReminder = reminders[Math.floor(Math.random() * reminders.length)];
    speak(randomReminder, false);
    
    // Schedule next reminder after longer interval
    reminderTimerRef.current = window.setTimeout(() => {
      if (currentPhase === 'quiet') {
        provideGentleReminder();
      }
    }, 45000); // 45 seconds between reminders
  };

  const handleActivity = () => {
    lastActivityRef.current = Date.now();
    
    // Clear existing timers on activity
    if (phaseTimerRef.current) {
      clearTimeout(phaseTimerRef.current);
      phaseTimerRef.current = null;
    }
    
    if (reminderTimerRef.current) {
      clearTimeout(reminderTimerRef.current);
      reminderTimerRef.current = null;
    }
    
    trackActivity();
  };

  const handleVoiceCommand = (command: string) => {
    console.log('Homepage voice command received:', command);
    handleActivity(); // Reset activity timer on voice command
    
    // Provide contextual responses
    if (command.includes('help') || command.includes('assistance')) {
      speak("I'm here to help! You can ask about our features, start a free trial, or take our exam readiness test.", false);
    } else if (command.includes('features') || command.includes('what can')) {
      speak("PREPZR offers personalized study plans, adaptive learning, AI tutoring, practice exams, emotional wellness support, and real-time progress tracking.", false);
    }
  };

  // Set up activity listeners
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });
    
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      
      if (phaseTimerRef.current) {
        clearTimeout(phaseTimerRef.current);
      }
      
      if (reminderTimerRef.current) {
        clearTimeout(reminderTimerRef.current);
      }
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (phaseTimerRef.current) {
        clearTimeout(phaseTimerRef.current);
      }
      if (reminderTimerRef.current) {
        clearTimeout(reminderTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Enhanced Speech Recognition for Homepage */}
      <EnhancedSpeechRecognition 
        language={language}
        continuous={true}
        onCommand={handleVoiceCommand}
      />
    </>
  );
};

export default IntelligentHomepageAssistant;
