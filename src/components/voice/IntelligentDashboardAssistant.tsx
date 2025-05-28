
import React, { useEffect, useRef, useState } from 'react';
import { speakWithFemaleVoice } from '@/utils/voiceConfig';
import { MoodType } from '@/types/user/base';

interface IntelligentDashboardAssistantProps {
  userName: string;
  isFirstTimeUser: boolean;
  language?: string;
  userMood?: MoodType;
  userProgress?: {
    overallProgress: number;
    physicsProgress: number;
    chemistryProgress: number;
    biologyProgress: number;
    examReadinessScore: number;
  };
  studyStreak?: number;
  lastActivity?: string;
  onSpeakingChange?: (isSpeaking: boolean) => void;
  onMicrophoneClick?: () => void;
}

const IntelligentDashboardAssistant: React.FC<IntelligentDashboardAssistantProps> = ({
  userName,
  isFirstTimeUser,
  language = 'en-US',
  userMood,
  userProgress,
  studyStreak = 0,
  lastActivity,
  onSpeakingChange,
  onMicrophoneClick
}) => {
  const [hasGreeted, setHasGreeted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastUserActivity, setLastUserActivity] = useState(Date.now());
  const [reminderCount, setReminderCount] = useState(0);
  
  const activityTimeoutRef = useRef<number | null>(null);
  const speechTimeoutRef = useRef<number | null>(null);

  // Track user activity
  const handleActivity = () => {
    setLastUserActivity(Date.now());
    if (activityTimeoutRef.current) {
      clearTimeout(activityTimeoutRef.current);
    }
    scheduleNextReminder();
  };

  // Enhanced speak function with break management
  const speak = (text: string, takeBreakAfter: boolean = true) => {
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    setIsSpeaking(true);
    if (onSpeakingChange) onSpeakingChange(true);
    
    speakWithFemaleVoice(
      text,
      { language },
      () => {
        console.log('🔊 Dashboard: Speaking:', text);
      },
      () => {
        setIsSpeaking(false);
        if (onSpeakingChange) onSpeakingChange(false);
        
        // Take intelligent break after speaking
        if (takeBreakAfter) {
          speechTimeoutRef.current = window.setTimeout(() => {
            scheduleNextReminder();
          }, 30000); // 30 seconds break
        }
      }
    );
  };

  // Stop speaking when microphone is clicked
  useEffect(() => {
    if (onMicrophoneClick) {
      const handleMicClick = () => {
        if (isSpeaking) {
          window.speechSynthesis.cancel();
          setIsSpeaking(false);
          if (onSpeakingChange) onSpeakingChange(false);
        }
      };
      
      // Listen for microphone click events
      document.addEventListener('microphone-click', handleMicClick);
      return () => document.removeEventListener('microphone-click', handleMicClick);
    }
  }, [isSpeaking, onMicrophoneClick, onSpeakingChange]);

  // Context-aware greeting
  useEffect(() => {
    if (!hasGreeted && userName && userName !== 'Student') {
      setTimeout(() => {
        let greetingMessage = '';
        
        if (isFirstTimeUser) {
          greetingMessage = `Welcome to your PREPZR dashboard, ${userName}! Congratulations on taking the first step towards exam success. This is your personalized command center where we'll track your progress and adapt to your learning style. Let me guide you through the key sections: Today's Plan for daily study schedule, Concept Cards for subject mastery, Practice Exams for assessment, and Academic Advisor for personalized guidance.`;
        } else {
          const streakMessage = studyStreak > 0 ? ` Your ${studyStreak}-day study streak is impressive!` : '';
          const progressMessage = userProgress ? ` You've made great progress with ${userProgress.overallProgress}% overall completion.` : '';
          const lastActivityMessage = lastActivity ? ` I see you last worked on ${lastActivity}.` : '';
          
          greetingMessage = `Welcome back, ${userName}!${streakMessage}${progressMessage}${lastActivityMessage} Your dedication to consistent learning is exactly what leads to exam success. Ready to continue your preparation journey?`;
        }
        
        speak(greetingMessage);
        setHasGreeted(true);
      }, 3000);
    }
  }, [hasGreeted, userName, isFirstTimeUser, studyStreak, userProgress, lastActivity]);

  // Schedule next reminder
  const scheduleNextReminder = () => {
    if (activityTimeoutRef.current) {
      clearTimeout(activityTimeoutRef.current);
    }
    
    activityTimeoutRef.current = window.setTimeout(() => {
      if (!isSpeaking) {
        offerContextualAssistance();
      }
    }, 30000); // 30 seconds of inactivity
  };

  // Offer contextual assistance
  const offerContextualAssistance = () => {
    const messages = [
      `Need help navigating your dashboard, ${userName}? I can guide you to any section.`,
      "Would you like me to suggest your next study topic based on your progress?",
      "Ready to take a practice exam? Say 'practice exam' to test your knowledge.",
      "Want to review concept cards? Say 'concept cards' to start learning.",
      "Need study plan guidance? Say 'study plan' to see your personalized schedule."
    ];
    
    const message = messages[reminderCount % messages.length];
    speak(message);
    setReminderCount(prev => prev + 1);
  };

  // Activity listeners
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });
    
    // Initial reminder schedule
    scheduleNextReminder();
    
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      
      if (activityTimeoutRef.current) {
        clearTimeout(activityTimeoutRef.current);
      }
      
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
      }
      
      // Stop any ongoing speech when component unmounts
      window.speechSynthesis.cancel();
    };
  }, []);

  return null;
};

export default IntelligentDashboardAssistant;
