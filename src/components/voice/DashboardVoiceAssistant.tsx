
import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEnhancedVoiceAssistant } from '@/hooks/useEnhancedVoiceAssistant';

interface DashboardVoiceAssistantProps {
  userName: string;
  isFirstTimeUser?: boolean;
  loginCount?: number;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  onSpeakingChange?: (isSpeaking: boolean) => void;
}

const DashboardVoiceAssistant: React.FC<DashboardVoiceAssistantProps> = ({
  userName,
  isFirstTimeUser = false,
  loginCount = 1,
  lastActivity,
  suggestedNextAction,
  onSpeakingChange
}) => {
  const navigate = useNavigate();
  const [hasGreeted, setHasGreeted] = useState(false);
  
  const processDashboardCommand = useCallback((command: string, confidence: number) => {
    const lowerCommand = command.toLowerCase().trim();
    
    // Only process if confidence is reasonable
    if (confidence < 0.3 && lowerCommand.length < 8) return;

    // Study-related commands
    if (lowerCommand.includes('start studying') || lowerCommand.includes('study now') ||
        lowerCommand.includes('begin study') || lowerCommand.includes('study session')) {
      speak("Let's start your study session! I'll take you to your concept cards where you can begin learning.");
      setTimeout(() => navigate('/dashboard/student/concepts'), 1000);
      return;
    }

    // Concept cards
    if (lowerCommand.includes('concept cards') || lowerCommand.includes('concepts') ||
        lowerCommand.includes('flashcards') || lowerCommand.includes('cards')) {
      speak("Great choice! Concept cards are perfect for focused learning. Let's dive in!");
      setTimeout(() => navigate('/dashboard/student/concepts'), 1000);
      return;
    }

    // Study plan
    if (lowerCommand.includes('study plan') || lowerCommand.includes('plan') ||
        lowerCommand.includes('schedule') || lowerCommand.includes('routine')) {
      speak("I'll show you your personalized study plan with all your subjects and progress tracking.");
      setTimeout(() => navigate('/dashboard/student/academic'), 1000);
      return;
    }

    // Practice tests
    if (lowerCommand.includes('practice test') || lowerCommand.includes('mock test') ||
        lowerCommand.includes('test') || lowerCommand.includes('exam practice')) {
      speak("Time for some practice! Mock tests are excellent for building exam confidence. Let's get started!");
      setTimeout(() => navigate('/dashboard/student/practice'), 1000);
      return;
    }

    // Progress and analytics
    if (lowerCommand.includes('progress') || lowerCommand.includes('analytics') ||
        lowerCommand.includes('performance') || lowerCommand.includes('stats')) {
      speak("Let me show you your learning analytics and progress insights. It's great to track your growth!");
      setTimeout(() => navigate('/dashboard/student/analytics'), 1000);
      return;
    }

    // Mood and motivation
    if (lowerCommand.includes('feeling') || lowerCommand.includes('mood') ||
        lowerCommand.includes('motivated') || lowerCommand.includes('stressed')) {
      speak("I understand that how you feel affects your learning. PREPZR adapts to your emotional state to provide the best study experience. You're doing great!");
      return;
    }

    // Next action or recommendation
    if (lowerCommand.includes('what next') || lowerCommand.includes('recommend') ||
        lowerCommand.includes('suggest') || lowerCommand.includes('what should i do')) {
      if (suggestedNextAction) {
        speak(`Based on your progress, I recommend: ${suggestedNextAction}. Would you like me to take you there?`);
      } else {
        speak("I suggest continuing with your concept cards or taking a practice test to reinforce your learning. What interests you more?");
      }
      return;
    }

    // Help and guidance
    if (lowerCommand.includes('help') || lowerCommand.includes('guide') ||
        lowerCommand.includes('lost') || lowerCommand.includes('confused')) {
      if (isFirstTimeUser) {
        speak(`${userName}, as a new user, I recommend starting with concept cards to build your foundation, then moving to practice tests. Your study plan is personalized just for you!`);
      } else {
        speak(`${userName}, you're doing great! Continue with your regular study routine or try something new like the formula lab or analytics to track your progress.`);
      }
      return;
    }

    // Motivational commands
    if (lowerCommand.includes('motivate') || lowerCommand.includes('encourage') ||
        lowerCommand.includes('inspire') || lowerCommand.includes('motivation')) {
      const motivationalMessages = [
        `${userName}, every step you take brings you closer to your exam success! Your consistency is your superpower.`,
        `You're building something amazing ${userName}! Each study session adds to your knowledge foundation.`,
        `${userName}, remember why you started this journey. Your dedication today shapes your future success!`,
        `Great job staying committed ${userName}! Champions are made through daily practice, just like what you're doing.`
      ];
      const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      speak(randomMessage);
      return;
    }

    // Default response for unrecognized commands
    if (lowerCommand.length > 3) {
      speak(`I'm here to help with your studies ${userName}! You can ask me to start studying, show your study plan, take practice tests, or check your progress. What would you like to do?`);
    }
  }, [userName, isFirstTimeUser, suggestedNextAction, navigate]);

  const {
    isSpeaking,
    speak,
    startListening,
    isSupported
  } = useEnhancedVoiceAssistant({
    context: 'dashboard',
    userName,
    onCommand: processDashboardCommand,
    reminderInterval: 60
  });

  // Notify parent component about speaking state
  useEffect(() => {
    if (onSpeakingChange) {
      onSpeakingChange(isSpeaking);
    }
  }, [isSpeaking, onSpeakingChange]);

  // Context-aware greeting based on user status
  useEffect(() => {
    if (isSupported && !hasGreeted && userName) {
      const timer = setTimeout(() => {
        let greetingMessage = '';
        
        if (isFirstTimeUser) {
          greetingMessage = `Welcome to your PREPZR dashboard ${userName}! This is your command center for exam preparation excellence. Ready to start your first study session? I recommend beginning with the concept cards!`;
        } else if (loginCount === 2) {
          greetingMessage = `Welcome back ${userName}! Great to see you again. Your dedication to consistent learning is exactly what leads to exam success. What would you like to focus on in today's study session?`;
        } else if (lastActivity) {
          greetingMessage = `Hi ${userName}! Your study streak is impressive. ${lastActivity.description}. Ready to continue your learning journey?`;
        } else {
          greetingMessage = `Welcome back ${userName}! Your consistency in learning is your greatest strength. What would you like to study today?`;
        }
        
        speak(greetingMessage);
        startListening();
        setHasGreeted(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isSupported, hasGreeted, userName, isFirstTimeUser, loginCount, lastActivity, speak, startListening]);

  return null;
};

export default DashboardVoiceAssistant;
