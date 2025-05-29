
import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEnhancedVoiceAssistant } from '@/hooks/useEnhancedVoiceAssistant';

interface PostSignupVoiceAssistantProps {
  userName: string;
  onSpeakingChange?: (isSpeaking: boolean) => void;
}

const PostSignupVoiceAssistant: React.FC<PostSignupVoiceAssistantProps> = ({
  userName,
  onSpeakingChange
}) => {
  const navigate = useNavigate();
  
  const processPostSignupCommand = useCallback((command: string, confidence: number) => {
    const lowerCommand = command.toLowerCase().trim();
    
    // Only process if confidence is reasonable
    if (confidence < 0.3 && lowerCommand.length < 8) return;

    // Dashboard navigation
    if (lowerCommand.includes('dashboard') || lowerCommand.includes('start studying') ||
        lowerCommand.includes('begin') || lowerCommand.includes('go to dashboard')) {
      speak(`Perfect ${userName}! Let's head to your dashboard where your personalized study journey awaits.`);
      setTimeout(() => navigate('/dashboard/student'), 1000);
      return;
    }

    // Exam readiness test
    if (lowerCommand.includes('exam readiness') || lowerCommand.includes('readiness test') ||
        lowerCommand.includes('assessment') || lowerCommand.includes('test my level')) {
      speak("Great idea! The Exam Readiness Test will help me understand your current preparation level so I can create the perfect study plan for you.");
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('open-exam-analyzer'));
      }, 1000);
      return;
    }

    // Study plan creation
    if (lowerCommand.includes('study plan') || lowerCommand.includes('plan') ||
        lowerCommand.includes('schedule') || lowerCommand.includes('create plan')) {
      speak(`Excellent choice ${userName}! I'll help you create a personalized study plan that adapts to your learning style and goals.`);
      setTimeout(() => navigate('/dashboard/student?tab=study-plan'), 1000);
      return;
    }

    // Profile setup
    if (lowerCommand.includes('profile') || lowerCommand.includes('setup') ||
        lowerCommand.includes('preferences') || lowerCommand.includes('settings')) {
      speak("Let's set up your profile with your exam goals, subjects, and learning preferences. This helps me provide better guidance!");
      setTimeout(() => navigate('/dashboard/student?tab=profile'), 1000);
      return;
    }

    // General help
    if (lowerCommand.includes('help') || lowerCommand.includes('what now') ||
        lowerCommand.includes('next') || lowerCommand.includes('guide')) {
      speak(`Welcome to PREPZR ${userName}! I recommend starting with the Exam Readiness Test to assess your current level, then we'll create your personalized study plan. Ready to begin?`);
      return;
    }

    // Default response
    if (lowerCommand.length > 3) {
      speak(`Hi ${userName}! You can ask me to take you to your dashboard, start with an exam readiness test, or create your study plan. What would you like to do first?`);
    }
  }, [userName, navigate]);

  const {
    isSpeaking,
    speak,
    startListening,
    isSupported
  } = useEnhancedVoiceAssistant({
    context: 'post-signup',
    userName,
    onCommand: processPostSignupCommand
  });

  // Notify parent component about speaking state
  useEffect(() => {
    if (onSpeakingChange) {
      onSpeakingChange(isSpeaking);
    }
  }, [isSpeaking, onSpeakingChange]);

  // Auto-welcome new user
  useEffect(() => {
    if (isSupported && userName) {
      const timer = setTimeout(() => {
        speak(`Congratulations ${userName}! Welcome to the PREPZR family! You've just taken the most important step towards exam success. I'm here to guide you through your personalized learning journey. Ready to begin?`);
        startListening();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isSupported, userName, speak, startListening]);

  return null;
};

export default PostSignupVoiceAssistant;
