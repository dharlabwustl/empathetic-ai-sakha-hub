
import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { speakWithFemaleVoice } from '@/utils/voiceConfig';

interface IntelligentDashboardAssistantProps {
  userName?: string;
  language?: string;
  isFirstTimeUser?: boolean;
  userProgress?: {
    overallProgress: number;
    studyStreak?: number;
    lastActivity?: string;
    examReadinessScore?: number;
  };
  onSpeakingChange?: (isSpeaking: boolean) => void;
  isMicrophoneActive?: boolean;
}

const IntelligentDashboardAssistant: React.FC<IntelligentDashboardAssistantProps> = ({ 
  userName = 'Student',
  language = 'en-US',
  isFirstTimeUser = false,
  userProgress = { overallProgress: 0 },
  onSpeakingChange,
  isMicrophoneActive = false
}) => {
  const [hasGreeted, setHasGreeted] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState<number>(0);
  const [reminderCount, setReminderCount] = useState(0);
  const location = useLocation();
  const timeoutRef = useRef<number | null>(null);
  const spokenMessagesRef = useRef<Set<string>>(new Set());
  
  const isDashboard = location.pathname.includes('/dashboard');

  const speak = (text: string, priority: boolean = false) => {
    if (isMicrophoneActive) {
      console.log('🔇 Microphone active, skipping speech');
      return;
    }

    const messageKey = text.toLowerCase().trim();
    
    // Prevent repetition within 45 seconds unless priority
    if (!priority && spokenMessagesRef.current.has(messageKey)) {
      console.log('🔇 Preventing message repetition:', text);
      return;
    }
    
    if (!('speechSynthesis' in window)) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Mark as spoken
    spokenMessagesRef.current.add(messageKey);
    setTimeout(() => {
      spokenMessagesRef.current.delete(messageKey);
    }, 45000);
    
    onSpeakingChange?.(true);
    
    speakWithFemaleVoice(
      text,
      { language },
      () => {
        console.log('🔊 Dashboard VA: Speaking:', text);
      },
      () => {
        console.log('🔇 Dashboard VA: Finished speaking');
        onSpeakingChange?.(false);
        setLastMessageTime(Date.now());
      }
    );
  };

  const getContextualGreeting = () => {
    if (isFirstTimeUser) {
      return `Welcome to your PREPZR dashboard, ${userName}! Congratulations on joining us. I'm here to guide you through your exam preparation journey. Let's start by exploring your personalized study plan and taking an exam readiness test to assess your current level.`;
    } else {
      const { studyStreak = 0, lastActivity = '', overallProgress = 0 } = userProgress;
      
      if (studyStreak > 0) {
        return `Welcome back, ${userName}! Your ${studyStreak}-day study streak is impressive. You're ${overallProgress}% through your preparation. Let's continue building on your momentum today!`;
      } else if (lastActivity) {
        return `Hi ${userName}! Great to see you back. I noticed you ${lastActivity} in your last session. Ready to continue your exam preparation journey?`;
      } else {
        return `Welcome back, ${userName}! Ready to tackle today's study plan and boost your exam readiness score?`;
      }
    }
  };

  const getMotivationalReminder = () => {
    const reminders = [
      `${userName}, remember that consistency is key to exam success. How about reviewing a few concept cards?`,
      `Ready for a quick study session, ${userName}? Your progress is building up nicely!`,
      `${userName}, taking regular breaks is important, but let's get back to your preparation when you're ready.`,
      `I'm here to help with any questions about your study plan, ${userName}. What would you like to explore?`
    ];
    
    return reminders[reminderCount % reminders.length];
  };

  const scheduleReminder = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = window.setTimeout(() => {
      const now = Date.now();
      
      // Only remind if 30 seconds have passed and user is still on dashboard
      if (now - lastMessageTime >= 30000 && !isMicrophoneActive && isDashboard) {
        const reminder = getMotivationalReminder();
        speak(reminder);
        setReminderCount(prev => prev + 1);
        scheduleReminder();
      } else if (isDashboard) {
        // Check again in 10 seconds
        setTimeout(scheduleReminder, 10000);
      }
    }, 30000);
  };

  // Stop speaking when microphone becomes active
  useEffect(() => {
    if (isMicrophoneActive && window.speechSynthesis) {
      console.log('🔇 Microphone activated, stopping dashboard assistant speech');
      window.speechSynthesis.cancel();
      onSpeakingChange?.(false);
    }
  }, [isMicrophoneActive, onSpeakingChange]);

  // Initial greeting for dashboard
  useEffect(() => {
    if (isDashboard && !hasGreeted && !isMicrophoneActive) {
      setTimeout(() => {
        const greeting = getContextualGreeting();
        speak(greeting, true);
        setHasGreeted(true);
        scheduleReminder();
      }, 3000);
    }
    
    if (!isDashboard) {
      setHasGreeted(false);
      setReminderCount(0);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isDashboard, hasGreeted, isFirstTimeUser, userName, isMicrophoneActive]);

  // Handle page navigation
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Reset state when leaving dashboard
    if (!isDashboard) {
      setHasGreeted(false);
      setReminderCount(0);
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

export default IntelligentDashboardAssistant;
