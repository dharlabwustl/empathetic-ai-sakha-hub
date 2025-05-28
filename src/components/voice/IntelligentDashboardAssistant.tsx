
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
  const [conversationContext, setConversationContext] = useState<string>('general');
  const location = useLocation();
  const timeoutRef = useRef<number | null>(null);
  const spokenMessagesRef = useRef<Set<string>>(new Set());
  
  const isDashboard = location.pathname.includes('/dashboard');

  // Enhanced command responses for dashboard
  const commandResponses = {
    'start_study_session': `Great choice, ${userName}! Let me help you start a focused study session. Based on your progress, I recommend starting with ${getRecommendedSubject()}. Would you like me to open that section for you?`,
    'continue_study': `Welcome back, ${userName}! You were working on ${userProgress.lastActivity || 'your studies'}. Let's pick up where you left off and maintain that momentum!`,
    'take_break': `Good idea, ${userName}! Taking regular breaks improves retention. I recommend a 10-15 minute break. When you're ready to return, I'll be here to help you refocus.`,
    'show_progress': `You're doing amazing, ${userName}! You've completed ${userProgress.overallProgress}% of your preparation${userProgress.studyStreak ? ` and maintained a ${userProgress.studyStreak}-day study streak` : ''}. Your exam readiness score is ${userProgress.examReadinessScore || 'still being calculated'}. Keep up the excellent work!`,
    'explain_prepzr': `${userName}, PREPZR is your personal AI study companion. I understand your emotions, adapt to your learning style, and provide personalized guidance. I'm here to make your exam preparation more effective and less stressful.`
  };

  const getRecommendedSubject = () => {
    const subjects = ['Physics', 'Chemistry', 'Biology', 'Mathematics'];
    const currentHour = new Date().getHours();
    
    // Simple logic based on time of day
    if (currentHour < 10) return subjects[3]; // Math in morning
    if (currentHour < 14) return subjects[0]; // Physics afternoon
    if (currentHour < 18) return subjects[1]; // Chemistry evening
    return subjects[2]; // Biology night
  };

  const speak = (text: string, priority: boolean = false) => {
    if (isMicrophoneActive) {
      console.log('🔇 Microphone active, skipping speech');
      return;
    }

    const messageKey = text.toLowerCase().trim();
    
    // Enhanced repetition prevention with context awareness
    if (!priority && spokenMessagesRef.current.has(messageKey)) {
      console.log('🔇 Preventing message repetition:', text);
      return;
    }
    
    if (!('speechSynthesis' in window)) return;
    
    // Cancel any ongoing speech for immediate response
    window.speechSynthesis.cancel();
    
    // Mark as spoken with shorter duration for dashboard (more interactive)
    spokenMessagesRef.current.add(messageKey);
    setTimeout(() => {
      spokenMessagesRef.current.delete(messageKey);
    }, 60000); // 1 minute for dashboard messages
    
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
      return `Welcome to your PREPZR dashboard, ${userName}! Congratulations on joining us. I'm your personal AI study assistant, and I'm here to guide you through your exam preparation journey. Let's start by exploring your personalized study plan and taking an exam readiness test to assess your current level. I'll be with you every step of the way!`;
    } else {
      const { studyStreak = 0, lastActivity = '', overallProgress = 0 } = userProgress;
      
      if (studyStreak > 0) {
        return `Welcome back, ${userName}! Your ${studyStreak}-day study streak is impressive - you're showing real dedication! You're ${overallProgress}% through your preparation. Let's continue building on your momentum today. What would you like to focus on?`;
      } else if (lastActivity) {
        return `Hi ${userName}! Great to see you back. I noticed you ${lastActivity} in your last session. Ready to continue your exam preparation journey? I have some personalized recommendations based on your progress.`;
      } else {
        return `Welcome back, ${userName}! Ready to tackle today's study plan and boost your exam readiness score? I'm here to help you stay focused and motivated.`;
      }
    }
  };

  const getSmartReminder = () => {
    const reminders = [
      `${userName}, remember that consistency is key to exam success. How about reviewing some concept cards to reinforce your learning?`,
      `Ready for a productive study session, ${userName}? Your progress is building up nicely, and I'm here to guide you through the next steps.`,
      `${userName}, taking strategic breaks is important, but when you're ready, let's get back to your preparation. I have some great study suggestions for you.`,
      `I'm here to help with any questions about your study plan, ${userName}. Would you like me to recommend the best topic to focus on right now based on your progress?`,
      `${userName}, your dedication to learning is admirable. Let's make the most of this study session together. What subject would you like to explore?`
    ];
    
    return reminders[reminderCount % reminders.length];
  };

  const scheduleReminder = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = window.setTimeout(() => {
      const now = Date.now();
      
      // Enhanced timing for dashboard: 45 seconds between reminders
      if (now - lastMessageTime >= 45000 && !isMicrophoneActive && isDashboard) {
        const reminder = getSmartReminder();
        speak(reminder);
        setReminderCount(prev => prev + 1);
        scheduleReminder();
      } else if (isDashboard) {
        // Check again in 15 seconds for more responsive experience
        setTimeout(scheduleReminder, 15000);
      }
    }, 45000);
  };

  // Enhanced microphone handling
  useEffect(() => {
    if (isMicrophoneActive && window.speechSynthesis) {
      console.log('🔇 Microphone activated, stopping dashboard assistant speech');
      window.speechSynthesis.cancel();
      onSpeakingChange?.(false);
    }
  }, [isMicrophoneActive, onSpeakingChange]);

  // Enhanced command handling
  useEffect(() => {
    const handleCommand = (event: any) => {
      const command = event.detail?.command || event.command;
      if (command && commandResponses[command]) {
        speak(commandResponses[command], true);
        setConversationContext(command);
      }
    };

    window.addEventListener('voice-command', handleCommand);
    return () => {
      window.removeEventListener('voice-command', handleCommand);
    };
  }, [userName, userProgress]);

  // Enhanced greeting and scheduling
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
      setConversationContext('general');
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
      setConversationContext('general');
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
