
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

    console.log('👋 Post-signup processing command:', lowerCommand, 'confidence:', confidence);

    // Dashboard navigation
    if (lowerCommand.includes('dashboard') || lowerCommand.includes('start studying') ||
        lowerCommand.includes('begin') || lowerCommand.includes('go to dashboard') ||
        lowerCommand.includes('take me to dashboard')) {
      speak(`Perfect ${userName}! Let's head to your personalized dashboard where your emotionally intelligent study journey begins. Your dashboard adapts to your mood and learning style!`);
      setTimeout(() => navigate('/dashboard/student'), 1200);
      return;
    }

    // Exam readiness test
    if (lowerCommand.includes('exam readiness') || lowerCommand.includes('readiness test') ||
        lowerCommand.includes('assessment') || lowerCommand.includes('test my level') ||
        lowerCommand.includes('analyze my preparation')) {
      speak(`Excellent choice ${userName}! The Exam Readiness Test will help me understand your current preparation level, identify your strengths and weaknesses, and create the perfect personalized study plan just for you. Let's assess where you stand!`);
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('open-exam-analyzer'));
      }, 1200);
      return;
    }

    // Study plan creation
    if (lowerCommand.includes('study plan') || lowerCommand.includes('plan') ||
        lowerCommand.includes('schedule') || lowerCommand.includes('create plan') ||
        lowerCommand.includes('study schedule')) {
      speak(`Fantastic ${userName}! I'll help you create a personalized study plan that adapts to your learning style, mood, and goals. Your plan will be emotionally intelligent - it understands when you're motivated and when you need support!`);
      setTimeout(() => navigate('/dashboard/student?tab=study-plan'), 1200);
      return;
    }

    // Profile setup
    if (lowerCommand.includes('profile') || lowerCommand.includes('setup') ||
        lowerCommand.includes('preferences') || lowerCommand.includes('settings') ||
        lowerCommand.includes('customize')) {
      speak(`Great idea ${userName}! Let's set up your profile with your exam goals, subjects, and learning preferences. This helps me provide personalized guidance and emotional support throughout your journey!`);
      setTimeout(() => navigate('/dashboard/student?tab=profile'), 1200);
      return;
    }

    // First steps guidance
    if (lowerCommand.includes('what now') || lowerCommand.includes('next step') ||
        lowerCommand.includes('where to start') || lowerCommand.includes('first steps')) {
      speak(`Welcome to the PREPZR family ${userName}! I recommend starting with the Exam Readiness Test to assess your current level, then we'll create your personalized study plan. After that, explore your dashboard where everything adapts to how you're feeling. Ready to begin this exciting journey?`);
      return;
    }

    // General help
    if (lowerCommand.includes('help') || lowerCommand.includes('guide') ||
        lowerCommand.includes('tour') || lowerCommand.includes('show me around')) {
      speak(`I'm here to guide you ${userName}! As a new PREPZR member, you have access to emotionally intelligent study plans, mood-adaptive learning, comprehensive practice tests, and 24/7 AI support. Would you like me to take you to your dashboard or start with the exam readiness test?`);
      return;
    }

    // Default response for new users
    if (lowerCommand.length > 3) {
      speak(`Hi ${userName}! You've just joined India's most advanced exam preparation platform. You can ask me to take you to your dashboard, start with an exam readiness test, create your study plan, or set up your profile. What excites you most about beginning your PREPZR journey?`);
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

  // Enthusiastic welcome for new user
  useEffect(() => {
    if (isSupported && userName) {
      const timer = setTimeout(() => {
        speak(`Congratulations ${userName}! Welcome to the PREPZR family! 🎉 You've just taken the most important step towards exam success. I'm your personal AI guide, and I'm here to support you through every step of your preparation journey. PREPZR understands not just what you need to learn, but how you feel while learning. Ready to begin this exciting adventure?`);
        setTimeout(() => {
          startListening();
        }, 8000); // Start listening after welcome message
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isSupported, userName, speak, startListening]);

  return null;
};

export default PostSignupVoiceAssistant;
