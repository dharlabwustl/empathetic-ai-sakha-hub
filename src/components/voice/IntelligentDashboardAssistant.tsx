
import React, { useEffect, useRef, useState } from 'react';
import { useIntelligentVoiceAssistant } from '@/hooks/useIntelligentVoiceAssistant';
import EnhancedSpeechRecognition from './EnhancedSpeechRecognition';

interface IntelligentDashboardAssistantProps {
  userName: string;
  isFirstTimeUser: boolean;
  language?: string;
  onSpeakingChange?: (isSpeaking: boolean) => void;
  userProgress?: {
    overallProgress: number;
    completedTasks: number;
    studyStreak: number;
    lastActivity: string;
    examReadinessScore: number;
  };
}

const IntelligentDashboardAssistant: React.FC<IntelligentDashboardAssistantProps> = ({
  userName,
  isFirstTimeUser,
  language = 'en-US',
  onSpeakingChange,
  userProgress
}) => {
  const [hasGreeted, setHasGreeted] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'greeting' | 'context' | 'guidance' | 'quiet'>('greeting');
  const phaseTimerRef = useRef<number | null>(null);
  const reminderTimerRef = useRef<number | null>(null);
  const lastActivityRef = useRef(Date.now());
  
  const { isSpeaking, playInitialGreeting, speak, trackActivity } = useIntelligentVoiceAssistant({
    userName,
    language,
    onSpeakingChange,
    inactivityTimeout: 20000 // 20 seconds for dashboard
  });

  useEffect(() => {
    if (userName && userName !== 'there' && !hasGreeted) {
      startDashboardGreeting();
      setHasGreeted(true);
    }
  }, [userName, isFirstTimeUser, hasGreeted]);

  const startDashboardGreeting = () => {
    const greetingMessage = isFirstTimeUser 
      ? `Welcome to your PREPZR dashboard, ${userName}!`
      : `Welcome back, ${userName}! Great to see you again.`;
    
    playInitialGreeting(greetingMessage);
    setCurrentPhase('greeting');
    
    // Phase 2: Context-based message
    phaseTimerRef.current = window.setTimeout(() => {
      if (!isSpeaking) {
        provideContextualMessage();
      }
    }, 3000);
  };

  const provideContextualMessage = () => {
    let contextMessage = '';
    
    if (isFirstTimeUser) {
      contextMessage = `Congratulations on joining PREPZR! This is your command center for exam preparation excellence. Here you'll find everything you need - personalized study plans, adaptive learning materials, practice exams, and emotional wellness support.`;
    } else {
      // Returning user with progress context
      if (userProgress) {
        const { studyStreak, lastActivity, examReadinessScore, completedTasks } = userProgress;
        
        let progressPart = '';
        if (studyStreak > 0) {
          progressPart = `Your ${studyStreak}-day study streak is impressive! `;
        }
        
        if (completedTasks > 0) {
          progressPart += `You've completed ${completedTasks} tasks. `;
        }
        
        if (examReadinessScore > 0) {
          progressPart += `Your exam readiness score of ${examReadinessScore}% shows great progress. `;
        }
        
        contextMessage = `${progressPart}Your dedication to consistent learning is exactly what leads to exam success. Keep up this excellent momentum!`;
      } else {
        contextMessage = `Your commitment to learning is inspiring. Every session brings you closer to your exam goals. Let's make today another productive step forward!`;
      }
    }
    
    speak(contextMessage, false);
    setCurrentPhase('context');
    
    // Phase 3: Guidance and next steps
    phaseTimerRef.current = window.setTimeout(() => {
      if (!isSpeaking) {
        provideGuidance();
      }
    }, 6000);
  };

  const provideGuidance = () => {
    let guidanceMessage = '';
    
    if (isFirstTimeUser) {
      guidanceMessage = `Ready to start your exam preparation journey? I recommend beginning with your study plan to see today's personalized learning path, then explore concept cards for theory, and practice with flashcards. You can also take a practice exam to baseline your current knowledge.`;
    } else {
      guidanceMessage = `Ready for today's learning session? Your study plan has been updated with personalized recommendations. You can continue where you left off, tackle new concepts, or take a practice exam to boost your readiness score. What would you like to focus on today?`;
    }
    
    speak(guidanceMessage, false);
    setCurrentPhase('guidance');
    
    // Phase 4: Enter quiet mode
    phaseTimerRef.current = window.setTimeout(() => {
      enterQuietMode();
    }, 7000);
  };

  const enterQuietMode = () => {
    setCurrentPhase('quiet');
    scheduleIntelligentReminder();
  };

  const scheduleIntelligentReminder = () => {
    // Schedule reminder after 20 seconds of inactivity
    reminderTimerRef.current = window.setTimeout(() => {
      if (currentPhase === 'quiet' && !isSpeaking) {
        provideIntelligentReminder();
      }
    }, 20000);
  };

  const provideIntelligentReminder = () => {
    const reminders = [
      `Need help navigating your dashboard, ${userName}? I can guide you to any section.`,
      `I'm here to help with your study plan, practice exams, or any questions you have.`,
      `Ready to dive into your personalized learning materials? Just let me know where to start.`,
      `Would you like me to explain any dashboard features or help you find specific study materials?`
    ];
    
    const randomReminder = reminders[Math.floor(Math.random() * reminders.length)];
    speak(randomReminder, false);
    
    // Schedule next reminder with longer interval
    reminderTimerRef.current = window.setTimeout(() => {
      if (currentPhase === 'quiet') {
        provideIntelligentReminder();
      }
    }, 30000); // 30 seconds between reminders
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
    console.log('Dashboard voice command:', command);
    handleActivity();
    
    // Provide contextual responses for dashboard
    if (command.includes('help') || command.includes('guide')) {
      speak(`I can help you navigate to study plans, concept cards, practice exams, or any other section. Just say where you'd like to go!`, false);
    } else if (command.includes('progress') || command.includes('score')) {
      speak(`You can view your detailed progress in the overview section, or take a practice exam to update your readiness score.`, false);
    } else if (command.includes('today') || command.includes('plan')) {
      speak(`Your personalized study plan for today is ready with recommended topics and practice materials.`, false);
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

  return (
    <>
      {/* Enhanced Speech Recognition for Dashboard */}
      <EnhancedSpeechRecognition 
        language={language}
        continuous={true}
        onCommand={handleVoiceCommand}
      />
    </>
  );
};

export default IntelligentDashboardAssistant;
