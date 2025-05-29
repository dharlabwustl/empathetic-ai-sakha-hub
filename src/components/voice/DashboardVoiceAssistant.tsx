
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
    if (confidence < 0.3 && lowerCommand.length < 5) return;

    // Study plan navigation
    if (lowerCommand.includes('study plan') || lowerCommand.includes('schedule') ||
        lowerCommand.includes('plan') || lowerCommand.includes('timetable')) {
      speak("Opening your personalized study plan. This shows your daily schedule optimized for your exam goals.");
      setTimeout(() => navigate('/dashboard/student?tab=study-plan'), 500);
      return;
    }

    // Practice tests
    if (lowerCommand.includes('practice test') || lowerCommand.includes('mock test') ||
        lowerCommand.includes('practice exam') || lowerCommand.includes('test')) {
      speak("Great! Let's head to practice exams where you can test your knowledge and track your progress.");
      setTimeout(() => navigate('/dashboard/student/practice-exam'), 500);
      return;
    }

    // Flashcards
    if (lowerCommand.includes('flashcard') || lowerCommand.includes('flash card') ||
        lowerCommand.includes('revision cards') || lowerCommand.includes('cards')) {
      speak("Perfect for quick revision! Opening your smart flashcards with spaced repetition.");
      setTimeout(() => navigate('/dashboard/student/flashcards'), 500);
      return;
    }

    // Concepts
    if (lowerCommand.includes('concept') || lowerCommand.includes('theory') ||
        lowerCommand.includes('learn') || lowerCommand.includes('study material')) {
      speak("Let's dive into concept learning! This section has all your subjects organized for easy understanding.");
      setTimeout(() => navigate('/dashboard/student/concepts'), 500);
      return;
    }

    // Progress and analytics
    if (lowerCommand.includes('progress') || lowerCommand.includes('performance') ||
        lowerCommand.includes('analytics') || lowerCommand.includes('stats')) {
      speak("Here's your detailed progress analysis showing your strengths and areas for improvement.");
      setTimeout(() => navigate('/dashboard/student?tab=analytics'), 500);
      return;
    }

    // Next task or suggestion
    if (lowerCommand.includes('what should i study') || lowerCommand.includes('next task') ||
        lowerCommand.includes('what now') || lowerCommand.includes('suggest')) {
      if (suggestedNextAction) {
        speak(`Based on your progress, I suggest: ${suggestedNextAction}. This will help optimize your preparation strategy.`);
      } else {
        speak("Let me check your study plan... I recommend starting with your weakest subject or taking a practice test to identify areas for improvement.");
      }
      return;
    }

    // Motivational support
    if (lowerCommand.includes('motivate') || lowerCommand.includes('encourage') ||
        lowerCommand.includes('feeling down') || lowerCommand.includes('stressed')) {
      speak(`${userName}, remember that every expert was once a beginner! Your consistent effort is building the foundation for your success. You've got this! Let's take one step at a time.`);
      return;
    }

    // Help and guidance
    if (lowerCommand.includes('help') || lowerCommand.includes('guide') ||
        lowerCommand.includes('how to') || lowerCommand.includes('navigate')) {
      speak("I'm here to help! You can ask me to open your study plan, practice tests, flashcards, or concepts. I can also provide study suggestions and motivational support. What would you like to do?");
      return;
    }

    // Study tips
    if (lowerCommand.includes('study tip') || lowerCommand.includes('advice') ||
        lowerCommand.includes('how to study') || lowerCommand.includes('improve')) {
      const tips = [
        "Try the Pomodoro technique: 25 minutes of focused study followed by a 5-minute break.",
        "Review your notes within 24 hours to improve retention by up to 80%.",
        "Practice active recall by testing yourself instead of just re-reading notes.",
        "Create mind maps to visualize connections between different concepts."
      ];
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      speak(`Here's a study tip for you: ${randomTip}`);
      return;
    }

    // Default helpful response
    if (lowerCommand.length > 3) {
      speak("I'm your Prep-Zer study assistant! I can help you navigate to different sections, provide study suggestions, or offer motivational support. What would you like to do?");
    }
  }, [userName, navigate, suggestedNextAction]);

  const {
    isSpeaking,
    speak,
    startListening,
    isSupported
  } = useEnhancedVoiceAssistant({
    context: 'dashboard',
    userName,
    onCommand: processDashboardCommand,
    isActive: true
  });

  // Notify parent component about speaking state
  useEffect(() => {
    if (onSpeakingChange) {
      onSpeakingChange(isSpeaking);
    }
  }, [isSpeaking, onSpeakingChange]);

  // Context-aware greeting for dashboard users
  useEffect(() => {
    if (isSupported && !hasGreeted) {
      const timer = setTimeout(() => {
        let greetingMessage = '';
        
        if (isFirstTimeUser || loginCount <= 1) {
          greetingMessage = `Welcome to your Prep-Zer dashboard, ${userName}! This is your command center for exam preparation excellence. I'm here to help you navigate and succeed. Ready to start your study journey?`;
        } else {
          const hour = new Date().getHours();
          const timeGreeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
          
          if (lastActivity) {
            greetingMessage = `${timeGreeting} ${userName}! Welcome back. I see you were working on ${lastActivity.description}. Ready to continue your preparation?`;
          } else {
            greetingMessage = `${timeGreeting} ${userName}! Welcome back to Prep-Zer. Your study streak is looking great! What would you like to focus on today?`;
          }
        }
        
        speak(greetingMessage);
        setHasGreeted(true);
        
        // Start listening for commands after greeting
        setTimeout(() => {
          startListening();
        }, 3000);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isSupported, hasGreeted, isFirstTimeUser, loginCount, lastActivity, userName, speak, startListening]);

  return null;
};

export default DashboardVoiceAssistant;
