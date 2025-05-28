
import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { speakWithFemaleVoice } from '@/utils/voiceConfig';

interface IntelligentHomepageAssistantProps {
  language?: string;
  onSpeakingChange?: (isSpeaking: boolean) => void;
  isMicrophoneActive?: boolean;
}

const IntelligentHomepageAssistant: React.FC<IntelligentHomepageAssistantProps> = ({ 
  language = 'en-US',
  onSpeakingChange,
  isMicrophoneActive = false
}) => {
  const [hasGreeted, setHasGreeted] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState<number>(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [userClickedMic, setUserClickedMic] = useState(false);
  const [conversationState, setConversationState] = useState<string>('initial');
  const location = useLocation();
  const timeoutRef = useRef<number | null>(null);
  const spokenMessagesRef = useRef<Set<string>>(new Set());
  
  const shouldBeActive = location.pathname === '/' || 
                        location.pathname.includes('/signup') ||
                        location.pathname.includes('/welcome') ||
                        location.pathname.includes('/free-trial');

  // Enhanced welcome message
  const welcomeMessage = "Welcome to PREPZR! I'm your AI assistant. PREPZR is India's first emotionally aware, hyper-personalized exam preparation platform that understands your mindset, not just the exam. I'm here to help you get started!";
  
  // Enhanced educational messages with conversation flow
  const educationalMessages = {
    initial: [
      "PREPZR offers personalized study plans, adaptive learning, and real-time progress tracking for exams like JEE, NEET, UPSC, and CAT.",
      "Unlike traditional coaching, PREPZR adapts to your learning style and emotional state, making exam preparation stress-free and effective.",
      "Ready to start your journey? You can sign up for a free trial or take our exam readiness test to see where you stand."
    ],
    features: [
      "PREPZR's AI understands when you're stressed, motivated, or confused, and adjusts your study plan accordingly.",
      "We offer interactive concept cards, smart flashcards, and practice exams that adapt to your performance.",
      "Our scholarship test can help you get discounts on premium features based on your performance."
    ],
    comparison: [
      "Traditional coaching institutes follow a one-size-fits-all approach, but PREPZR personalizes everything for you.",
      "While other platforms just track your scores, PREPZR tracks your emotions and mindset for holistic preparation.",
      "PREPZR's AI mentor provides 24/7 support, unlike limited coaching institute hours."
    ],
    action: [
      "Would you like to start with a free trial to experience PREPZR's personalized approach?",
      "Ready to take our exam readiness assessment? It only takes 5 minutes and gives you a complete analysis.",
      "Interested in our scholarship program? You could get up to 50% off based on your performance!"
    ]
  };

  // Enhanced command responses
  const commandResponses = {
    'explain_prepzr': "PREPZR is India's first emotionally intelligent exam preparation platform. We use AI to understand not just what you study, but how you feel while studying. This helps us create truly personalized study plans that adapt to your mood, stress levels, and learning patterns. It's like having a personal mentor who knows exactly what you need, when you need it.",
    'explain_how_it_works': "PREPZR works in three simple steps: First, we assess your current knowledge and emotional patterns. Then, our AI creates a personalized study plan that adapts to your learning style. Finally, we continuously monitor your progress and emotions, adjusting your plan in real-time. You'll get concept cards, practice tests, and AI tutoring that responds to your unique needs.",
    'explain_pricing': "PREPZR offers flexible plans for every student. We have a free tier to get you started, premium monthly plans for comprehensive features, and annual plans with significant savings. Plus, our scholarship program can give you up to 50% off based on your performance in our assessment test. Would you like to take the scholarship test?",
    'start_study_session': "I'd love to help you start studying! First, you'll need to sign up for PREPZR to access our personalized study features. Would you like me to guide you through the signup process?",
    'continue_study': "To continue your studies with PREPZR's adaptive learning system, please sign up first. Our AI will pick up right where you left off and adjust to your current state of mind.",
    'show_progress': "Once you join PREPZR, you'll have access to detailed progress analytics that track not just your scores, but your learning patterns, emotional state, and optimal study times. Sign up to start tracking your progress!",
    'take_break': "Taking breaks is important for effective learning! PREPZR's AI actually monitors your stress levels and suggests optimal break times. Join us to experience smart, mindful studying."
  };

  const speak = (text: string, priority: boolean = false) => {
    if (isMicrophoneActive) {
      console.log('🔇 Microphone active, skipping speech');
      return;
    }

    const messageKey = text.toLowerCase().trim();
    const now = Date.now();
    
    // Enhanced repetition prevention
    if (!priority && !userClickedMic && spokenMessagesRef.current.has(messageKey)) {
      console.log('🔇 Preventing message repetition:', text);
      return;
    }
    
    if (!('speechSynthesis' in window)) return;
    
    // Cancel any ongoing speech for immediate response
    window.speechSynthesis.cancel();
    
    // Mark as spoken with longer duration for non-priority messages
    spokenMessagesRef.current.add(messageKey);
    setTimeout(() => {
      spokenMessagesRef.current.delete(messageKey);
    }, priority ? 30000 : 120000); // 2 minutes for regular messages
    
    onSpeakingChange?.(true);
    
    speakWithFemaleVoice(
      text,
      { language },
      () => {
        console.log('🔊 Homepage VA: Speaking:', text);
      },
      () => {
        console.log('🔇 Homepage VA: Finished speaking');
        onSpeakingChange?.(false);
        setLastMessageTime(Date.now());
      }
    );
  };

  const getNextMessage = () => {
    const messageCategories = Object.keys(educationalMessages);
    const currentCategory = messageCategories[Math.floor(messageIndex / 3) % messageCategories.length];
    const messagesInCategory = educationalMessages[currentCategory];
    const messageInCategoryIndex = messageIndex % messagesInCategory.length;
    
    return messagesInCategory[messageInCategoryIndex];
  };

  const scheduleNextMessage = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = window.setTimeout(() => {
      const now = Date.now();
      
      // Enhanced timing: 45 seconds between messages, but shorter if user seems engaged
      const timeSinceLastMessage = now - lastMessageTime;
      const requiredDelay = userClickedMic ? 60000 : 45000; // Longer delay if user clicked mic
      
      if (timeSinceLastMessage >= requiredDelay && !isMicrophoneActive && !userClickedMic && shouldBeActive) {
        const nextMessage = getNextMessage();
        speak(nextMessage);
        setMessageIndex(prev => prev + 1);
        scheduleNextMessage();
      } else if (shouldBeActive) {
        // Check again in 10 seconds
        setTimeout(scheduleNextMessage, 10000);
      }
    }, 45000);
  };

  // Enhanced microphone handling
  useEffect(() => {
    if (isMicrophoneActive && window.speechSynthesis) {
      console.log('🔇 Microphone activated, stopping homepage assistant speech');
      window.speechSynthesis.cancel();
      onSpeakingChange?.(false);
      setUserClickedMic(true);
      
      // Reset clicked state after longer period
      setTimeout(() => {
        if (!isMicrophoneActive) {
          setUserClickedMic(false);
        }
      }, 30000); // Increased to 30 seconds
    }
  }, [isMicrophoneActive, onSpeakingChange]);

  // Enhanced command handling
  useEffect(() => {
    const handleCommand = (event: any) => {
      const command = event.detail?.command || event.command;
      if (command && commandResponses[command]) {
        speak(commandResponses[command], true);
      }
    };

    const handleMicClick = () => {
      setUserClickedMic(true);
      // Stop speaking immediately
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        onSpeakingChange?.(false);
      }
      
      // Reset after 30 seconds
      setTimeout(() => {
        setUserClickedMic(false);
      }, 30000);
    };

    window.addEventListener('voice-command', handleCommand);
    window.addEventListener('microphone-clicked', handleMicClick);
    
    return () => {
      window.removeEventListener('voice-command', handleCommand);
      window.removeEventListener('microphone-clicked', handleMicClick);
    };
  }, [onSpeakingChange]);

  // Enhanced greeting and scheduling
  useEffect(() => {
    if (shouldBeActive && !hasGreeted && !isMicrophoneActive && !userClickedMic) {
      setTimeout(() => {
        speak(welcomeMessage, true);
        setHasGreeted(true);
        setConversationState('initial');
        scheduleNextMessage();
      }, 2000);
    }
    
    if (!shouldBeActive) {
      setHasGreeted(false);
      setMessageIndex(0);
      setUserClickedMic(false);
      setConversationState('initial');
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [shouldBeActive, hasGreeted, isMicrophoneActive, userClickedMic]);

  // Handle page navigation
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Reset state when navigating away
    if (!shouldBeActive) {
      setHasGreeted(false);
      setMessageIndex(0);
      setUserClickedMic(false);
      setConversationState('initial');
      spokenMessagesRef.current.clear();
    }
  }, [location.pathname]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return null;
};

export default IntelligentHomepageAssistant;
