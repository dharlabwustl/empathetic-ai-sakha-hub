
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { speakWithFemaleVoice } from '@/utils/voiceConfig';
import { MoodType } from '@/types/user/base';

interface IntelligentDashboardAssistantProps {
  userName?: string;
  language?: string;
  isFirstTimeUser?: boolean;
  userProgress?: {
    overallProgress: number;
    physicsProgress: number;
    chemistryProgress: number;
    biologyProgress: number;
    examReadinessScore: number;
  };
  studyStreak?: number;
  lastActivity?: string;
  userMood?: MoodType;
  onSpeakingChange?: (isSpeaking: boolean) => void;
  onStopSpeaking?: () => void;
}

const IntelligentDashboardAssistant: React.FC<IntelligentDashboardAssistantProps> = ({
  userName = 'Student',
  language = 'en-US',
  isFirstTimeUser = false,
  userProgress,
  studyStreak = 0,
  lastActivity,
  userMood,
  onSpeakingChange,
  onStopSpeaking
}) => {
  const location = useLocation();
  const [hasGreeted, setHasGreeted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const lastActivityRef = useRef(Date.now());
  const reminderTimerRef = useRef<number | null>(null);
  const isSpeakingRef = useRef(false);
  
  const isDashboard = location.pathname.includes('/dashboard');
  
  const speak = (text: string, onEnd?: () => void) => {
    if (!isActive || isSpeakingRef.current) return;
    
    isSpeakingRef.current = true;
    if (onSpeakingChange) onSpeakingChange(true);
    
    speakWithFemaleVoice(
      text,
      { language },
      () => {
        console.log('🔊 Dashboard AI speaking:', text);
      },
      () => {
        isSpeakingRef.current = false;
        if (onSpeakingChange) onSpeakingChange(false);
        if (onEnd) onEnd();
        console.log('🔇 Dashboard AI finished speaking');
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

  const getContextualGreeting = () => {
    if (isFirstTimeUser) {
      return `Welcome to your PREPZR dashboard, ${userName}! Congratulations on joining our learning community. This is your command center for exam preparation. Let me guide you through the key features to get you started on your success journey.`;
    } else {
      const progressContext = userProgress 
        ? ` Your overall progress is ${userProgress.overallProgress}% and your exam readiness score is ${userProgress.examReadinessScore}%.`
        : '';
      
      const streakContext = studyStreak > 0 
        ? ` Your study streak is going strong at ${studyStreak} days!`
        : '';
      
      const activityContext = lastActivity 
        ? ` Last time you were ${lastActivity}.`
        : '';
      
      return `Welcome back, ${userName}!${streakContext}${progressContext}${activityContext} Ready to continue your learning journey and improve your exam readiness?`;
    }
  };

  const getPersonalizedSuggestions = () => {
    if (isFirstTimeUser) {
      return [
        "Start by exploring your personalized study plan to see your learning path.",
        "Check out the concept cards to master key topics step by step.",
        "Try taking a practice exam to assess your current knowledge level.",
        "Visit the feel-good corner whenever you need motivation or stress relief."
      ];
    } else {
      const suggestions = [];
      
      if (userProgress) {
        if (userProgress.physicsProgress < 50) {
          suggestions.push("Consider focusing on Physics concepts to boost your progress.");
        }
        if (userProgress.examReadinessScore < 70) {
          suggestions.push("Take more practice exams to improve your readiness score.");
        }
        if (userProgress.overallProgress > 70) {
          suggestions.push("Great progress! Try some advanced practice tests to challenge yourself.");
        }
      }
      
      if (suggestions.length === 0) {
        suggestions.push("Continue with your study plan to maintain momentum.");
        suggestions.push("Review previous year papers for exam strategy insights.");
      }
      
      return suggestions;
    }
  };

  const getMotivationalMessage = () => {
    const moodMessages = {
      [MoodType.MOTIVATED]: "I can sense your motivation! Let's channel that energy into productive study sessions.",
      [MoodType.TIRED]: "Feeling tired? Remember, rest is part of learning. Take breaks when needed.",
      [MoodType.STRESSED]: "Stress is normal during exam prep. Try our feel-good corner for relaxation techniques.",
      [MoodType.HAPPY]: "Your positive energy is wonderful! Happy minds learn faster.",
      [MoodType.CONFUSED]: "Confusion means you're learning something new. Our AI tutor can help clarify doubts.",
      [MoodType.ANXIOUS]: "Anxiety is common before exams. Focus on your progress - you're doing great!"
    };
    
    if (userMood && moodMessages[userMood]) {
      return moodMessages[userMood];
    }
    
    return "Remember, every small step brings you closer to your goal. You've got this!";
  };

  const handleActivity = () => {
    lastActivityRef.current = Date.now();
    clearReminders();
    scheduleReminder();
  };

  const clearReminders = () => {
    if (reminderTimerRef.current) {
      clearTimeout(reminderTimerRef.current);
      reminderTimerRef.current = null;
    }
  };

  const scheduleReminder = () => {
    if (!isActive) return;
    
    reminderTimerRef.current = window.setTimeout(() => {
      if (isActive && !isSpeakingRef.current) {
        const reminders = [
          "Need any guidance navigating your dashboard?",
          "I'm here if you need help with your study plan.",
          "Want to know your progress in any subject?",
          "Ready for a practice test or concept review?"
        ];
        
        const randomReminder = reminders[Math.floor(Math.random() * reminders.length)];
        speak(randomReminder);
        scheduleReminder(); // Schedule next reminder
      }
    }, 30000); // 30 seconds as requested
  };

  const startDashboardGreeting = () => {
    if (!isDashboard || hasGreeted) return;
    
    setHasGreeted(true);
    
    // Initial greeting
    setTimeout(() => {
      if (isActive) {
        const greeting = getContextualGreeting();
        speak(greeting, () => {
          // After greeting, provide guidance for first-time users
          if (isFirstTimeUser) {
            setTimeout(() => {
              if (isActive) {
                const suggestions = getPersonalizedSuggestions();
                speak(suggestions[0], () => {
                  // Start reminder system after initial guidance
                  scheduleReminder();
                });
              }
            }, 3000);
          } else {
            // For returning users, provide motivational message
            setTimeout(() => {
              if (isActive) {
                const motivation = getMotivationalMessage();
                speak(motivation, () => {
                  scheduleReminder();
                });
              }
            }, 3000);
          }
        });
      }
    }, 2000);
  };

  // Set up dashboard behavior
  useEffect(() => {
    if (!isDashboard) {
      setIsActive(false);
      clearReminders();
      stopSpeaking();
      return;
    }
    
    setIsActive(true);
    
    // Start greeting sequence
    if (!hasGreeted) {
      startDashboardGreeting();
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
  }, [isDashboard, hasGreeted, userName, isFirstTimeUser]);

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

export default IntelligentDashboardAssistant;
