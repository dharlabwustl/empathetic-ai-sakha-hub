
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { speakWithFemaleVoice } from '@/utils/voiceConfig';

interface IntelligentHomepageAssistantProps {
  language?: string;
  onSpeakingChange?: (isSpeaking: boolean) => void;
  onStopSpeaking?: () => void;
}

const IntelligentHomepageAssistant: React.FC<IntelligentHomepageAssistantProps> = ({ 
  language = 'en-US',
  onSpeakingChange,
  onStopSpeaking
}) => {
  const location = useLocation();
  const [hasGreeted, setHasGreeted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const lastActivityRef = useRef(Date.now());
  const reminderTimerRef = useRef<number | null>(null);
  const messageTimerRef = useRef<number | null>(null);
  const isSpeakingRef = useRef(false);
  
  const shouldBeActive = location.pathname === '/';
  
  // Educational content sequence for homepage visitors
  const welcomeSequence = [
    {
      message: "Welcome visitor! I'm your PREPZR AI assistant.",
      delay: 1000
    },
    {
      message: "PREPZR is the world's first emotionally aware, hyper-personalized adaptive exam preparation platform.",
      delay: 30000
    },
    {
      message: "Unlike traditional coaching institutes, PREPZR understands your mindset, not just exam content.",
      delay: 30000
    },
    {
      message: "We offer personalized study plans, AI tutoring, adaptive practice tests, and emotional support.",
      delay: 30000
    },
    {
      message: "Ready to start? You can sign up for free, take our exam readiness test, or try our scholarship assessment.",
      delay: 30000
    }
  ];
  
  // Conversion-focused reminders
  const reminderMessages = [
    "Let me know if you need any assistance exploring PREPZR.",
    "Ready to transform your exam preparation? I can help you get started.",
    "Want to see how PREPZR can boost your exam readiness? Just ask me.",
    "Curious about our features? I'm here to guide you through everything.",
    "Need help choosing the right plan? I can explain all our options."
  ];

  const speak = (text: string, onEnd?: () => void) => {
    if (!isActive || isSpeakingRef.current) return;
    
    isSpeakingRef.current = true;
    if (onSpeakingChange) onSpeakingChange(true);
    
    speakWithFemaleVoice(
      text,
      { language },
      () => {
        console.log('🔊 Homepage AI speaking:', text);
      },
      () => {
        isSpeakingRef.current = false;
        if (onSpeakingChange) onSpeakingChange(false);
        if (onEnd) onEnd();
        console.log('🔇 Homepage AI finished speaking');
      }
    );
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    isSpeakingRef.current = false;
    if (onSpeakingChange) onSpeakingChange(false);
    if (onStopSpeaking) onStopSpeaking();
  };

  const handleActivity = () => {
    lastActivityRef.current = Date.now();
    clearReminders();
    scheduleNextReminder();
  };

  const clearReminders = () => {
    if (reminderTimerRef.current) {
      clearTimeout(reminderTimerRef.current);
      reminderTimerRef.current = null;
    }
    if (messageTimerRef.current) {
      clearTimeout(messageTimerRef.current);
      messageTimerRef.current = null;
    }
  };

  const scheduleNextReminder = () => {
    if (!isActive) return;
    
    reminderTimerRef.current = window.setTimeout(() => {
      if (isActive && !isSpeakingRef.current) {
        const randomReminder = reminderMessages[Math.floor(Math.random() * reminderMessages.length)];
        speak(randomReminder);
        scheduleNextReminder(); // Schedule next reminder
      }
    }, 30000); // 30 seconds as requested
  };

  const startWelcomeSequence = () => {
    if (!shouldBeActive || hasGreeted) return;
    
    setHasGreeted(true);
    
    const playSequence = (stepIndex: number) => {
      if (stepIndex >= welcomeSequence.length || !isActive) return;
      
      const step = welcomeSequence[stepIndex];
      
      messageTimerRef.current = window.setTimeout(() => {
        if (isActive && !isSpeakingRef.current) {
          speak(step.message, () => {
            // After each message, wait 30 seconds before next
            if (stepIndex < welcomeSequence.length - 1) {
              messageTimerRef.current = window.setTimeout(() => {
                playSequence(stepIndex + 1);
              }, 30000);
            } else {
              // After sequence, start reminder system
              scheduleNextReminder();
            }
          });
        }
      }, step.delay);
    };
    
    playSequence(0);
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    handleActivity();
    
    if (lowerCommand.includes('explain prepzr') || lowerCommand.includes('what is prepzr')) {
      speak("PREPZR is revolutionizing exam preparation with emotional intelligence. We provide personalized study plans, adaptive learning, and AI tutoring that understands your mindset and learning style.");
    } else if (lowerCommand.includes('benefits') || lowerCommand.includes('why prepzr')) {
      speak("PREPZR offers personalized learning paths, emotional support during stress, adaptive practice tests, real-time progress tracking, and AI tutoring available 24/7. We're not just another study app - we're your study companion.");
    } else if (lowerCommand.includes('features')) {
      speak("Our key features include adaptive flashcards, personalized study plans, AI tutoring, practice exams, emotional wellness support, progress analytics, and previous year paper analysis.");
    } else if (lowerCommand.includes('plans') || lowerCommand.includes('pricing')) {
      speak("We offer flexible subscription plans including a free trial. You can start with our basic plan or choose premium for advanced features like unlimited AI tutoring and detailed analytics.");
    }
  };

  // Set up activity tracking
  useEffect(() => {
    if (!shouldBeActive) {
      setIsActive(false);
      clearReminders();
      stopSpeaking();
      return;
    }
    
    setIsActive(true);
    
    // Start welcome sequence
    if (!hasGreeted) {
      startWelcomeSequence();
    }
    
    // Track user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });
    
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      clearReminders();
    };
  }, [shouldBeActive, hasGreeted]);

  // Listen for voice commands
  useEffect(() => {
    const handleCommand = (event: any) => {
      if (event.detail) {
        handleVoiceCommand(event.detail);
      }
    };

    window.addEventListener('homepage-voice-command', handleCommand);
    return () => {
      window.removeEventListener('homepage-voice-command', handleCommand);
    };
  }, []);

  // Expose stop function for microphone click
  useEffect(() => {
    const handleMicrophoneClick = () => {
      stopSpeaking();
    };

    window.addEventListener('microphone-clicked', handleMicrophoneClick);
    return () => {
      window.removeEventListener('microphone-clicked', handleMicrophoneClick);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearReminders();
      stopSpeaking();
    };
  }, []);

  return null;
};

export default IntelligentHomepageAssistant;
