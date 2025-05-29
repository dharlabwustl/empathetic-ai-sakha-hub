
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

    console.log('📊 Dashboard processing command:', lowerCommand, 'confidence:', confidence);

    // Study-related commands
    if (lowerCommand.includes('start studying') || lowerCommand.includes('study now') ||
        lowerCommand.includes('begin study') || lowerCommand.includes('study session') ||
        lowerCommand.includes('lets study')) {
      speak("Excellent! Let's start your study session. I'll take you to your concept cards where you can begin learning with content that adapts to your current mood and energy level.");
      setTimeout(() => navigate('/dashboard/student/concepts'), 1000);
      return;
    }

    // Concept cards
    if (lowerCommand.includes('concept cards') || lowerCommand.includes('concepts') ||
        lowerCommand.includes('flashcards') || lowerCommand.includes('cards')) {
      speak("Great choice! Concept cards are perfect for focused learning. Our cards adapt to your understanding level and mood. Let's dive in!");
      setTimeout(() => navigate('/dashboard/student/concepts'), 1000);
      return;
    }

    // Study plan
    if (lowerCommand.includes('study plan') || lowerCommand.includes('plan') ||
        lowerCommand.includes('schedule') || lowerCommand.includes('routine')) {
      speak("I'll show you your personalized study plan that adapts to your progress and emotional state. It's designed to keep you motivated and on track!");
      setTimeout(() => navigate('/dashboard/student/academic'), 1000);
      return;
    }

    // Practice tests
    if (lowerCommand.includes('practice test') || lowerCommand.includes('mock test') ||
        lowerCommand.includes('test') || lowerCommand.includes('exam practice')) {
      speak("Perfect timing for practice! Mock tests are excellent for building exam confidence. Our tests adapt to your stress levels and provide supportive feedback. Let's get started!");
      setTimeout(() => navigate('/dashboard/student/practice'), 1000);
      return;
    }

    // Progress and analytics
    if (lowerCommand.includes('progress') || lowerCommand.includes('analytics') ||
        lowerCommand.includes('performance') || lowerCommand.includes('stats') ||
        lowerCommand.includes('how am i doing')) {
      speak("Let me show you your learning analytics and progress insights! It's great to track your growth and see how your emotional well-being affects your learning.");
      setTimeout(() => navigate('/dashboard/student/analytics'), 1000);
      return;
    }

    // Mood and emotional support
    if (lowerCommand.includes('feeling') || lowerCommand.includes('mood') ||
        lowerCommand.includes('stressed') || lowerCommand.includes('tired') ||
        lowerCommand.includes('anxious') || lowerCommand.includes('motivated')) {
      speak(`I understand that how you feel greatly affects your learning, ${userName}. PREPZR adapts to your emotional state to provide the best study experience. Remember, it's okay to have ups and downs - I'm here to support you through everything!`);
      return;
    }

    // Next action or recommendation
    if (lowerCommand.includes('what next') || lowerCommand.includes('recommend') ||
        lowerCommand.includes('suggest') || lowerCommand.includes('what should i do')) {
      if (suggestedNextAction) {
        speak(`Based on your progress and current mood, I recommend: ${suggestedNextAction}. This suggestion is personalized just for you. Would you like me to take you there?`);
      } else {
        speak("Based on your learning pattern, I suggest continuing with your concept cards or taking a practice test to reinforce your learning. Both will adapt to how you're feeling right now. What interests you more?");
      }
      return;
    }

    // Motivational support
    if (lowerCommand.includes('motivate') || lowerCommand.includes('encourage') ||
        lowerCommand.includes('inspire') || lowerCommand.includes('motivation') ||
        lowerCommand.includes('support')) {
      const motivationalMessages = [
        `${userName}, every step you take brings you closer to your exam success! Your consistency and emotional growth are your superpowers.`,
        `You're building something amazing ${userName}! Each study session adds to your knowledge foundation and emotional resilience.`,
        `${userName}, remember why you started this journey. Your dedication today, combined with emotional intelligence, shapes your future success!`,
        `Great job staying committed ${userName}! Champions are made through daily practice and emotional awareness, just like what you're developing with PREPZR.`
      ];
      const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      speak(randomMessage);
      return;
    }

    // Help and guidance
    if (lowerCommand.includes('help') || lowerCommand.includes('guide') ||
        lowerCommand.includes('lost') || lowerCommand.includes('confused')) {
      if (isFirstTimeUser) {
        speak(`${userName}, as a new PREPZR user, I recommend starting with concept cards to build your foundation, then moving to practice tests. Everything here adapts to your emotional state and learning style!`);
      } else {
        speak(`${userName}, you're doing great! Continue with your emotionally intelligent study routine, try the formula lab, or check analytics to see how your mood affects your learning progress.`);
      }
      return;
    }

    // Default response for unrecognized commands
    if (lowerCommand.length > 3) {
      speak(`I'm here to support your study journey, ${userName}! You can ask me to start studying, show your adaptive study plan, take mood-aware practice tests, or check your emotional learning progress. How can I help you succeed today?`);
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

  // Context-aware greeting based on user status (silent unless necessary)
  useEffect(() => {
    if (isSupported && !hasGreeted && userName) {
      const timer = setTimeout(() => {
        let greetingMessage = '';
        
        if (isFirstTimeUser) {
          greetingMessage = `Welcome to your PREPZR dashboard, ${userName}! This is your emotionally intelligent command center for exam preparation excellence. Everything here adapts to your mood and learning style. Ready to start your first study session? I recommend beginning with the concept cards!`;
        } else if (loginCount === 2) {
          greetingMessage = `Welcome back ${userName}! Great to see you again. Your dedication to consistent learning with emotional awareness is exactly what leads to exam success. What would you like to focus on in today's adaptive study session?`;
        } else if (lastActivity) {
          greetingMessage = `Hi ${userName}! Your emotionally intelligent study streak is impressive. ${lastActivity.description}. Ready to continue your adaptive learning journey?`;
        } else {
          // Silent for regular returning users - only speak when invoked
          setHasGreeted(true);
          startListening();
          return;
        }
        
        speak(greetingMessage);
        setTimeout(() => {
          startListening();
        }, 6000);
        setHasGreeted(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isSupported, hasGreeted, userName, isFirstTimeUser, loginCount, lastActivity, speak, startListening]);

  return null;
};

export default DashboardVoiceAssistant;
