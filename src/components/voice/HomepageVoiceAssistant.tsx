
import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEnhancedVoiceAssistant } from '@/hooks/useEnhancedVoiceAssistant';

interface HomepageVoiceAssistantProps {
  onSpeakingChange?: (isSpeaking: boolean) => void;
}

const HomepageVoiceAssistant: React.FC<HomepageVoiceAssistantProps> = ({
  onSpeakingChange
}) => {
  const navigate = useNavigate();
  
  const processHomepageCommand = useCallback((command: string, confidence: number) => {
    const lowerCommand = command.toLowerCase().trim();
    
    // Only process if confidence is reasonable or command is clear
    if (confidence < 0.3 && lowerCommand.length < 8) return;

    // Signup and registration commands
    if (lowerCommand.includes('sign up') || lowerCommand.includes('signup') || 
        lowerCommand.includes('register') || lowerCommand.includes('join') ||
        lowerCommand.includes('create account')) {
      speak("Great! I'll take you to our signup page where you can create your free account and start your exam preparation journey.");
      setTimeout(() => navigate('/signup'), 1000);
      return;
    }

    // Free trial commands
    if (lowerCommand.includes('free trial') || lowerCommand.includes('trial') ||
        lowerCommand.includes('try free') || lowerCommand.includes('start free')) {
      speak("Excellent! PREPZR offers a 7-day free trial with full access to our emotionally intelligent study platform. Let me guide you to get started!");
      setTimeout(() => navigate('/signup?trial=true'), 1000);
      return;
    }

    // Login commands
    if (lowerCommand.includes('login') || lowerCommand.includes('log in') ||
        lowerCommand.includes('sign in') || lowerCommand.includes('signin')) {
      speak("I'll take you to the login page. Welcome back to PREPZR!");
      setTimeout(() => navigate('/login'), 1000);
      return;
    }

    // Exam readiness test commands
    if (lowerCommand.includes('exam readiness') || lowerCommand.includes('readiness test') ||
        lowerCommand.includes('assessment') || lowerCommand.includes('test my level')) {
      speak("Our Exam Readiness Test is a great way to understand your current preparation level. It analyzes your strengths and weaknesses across subjects. You can take it after signing up!");
      // Trigger exam readiness analyzer
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('open-exam-analyzer'));
      }, 1000);
      return;
    }

    // Scholarship test commands
    if (lowerCommand.includes('scholarship') || lowerCommand.includes('discount') ||
        lowerCommand.includes('scholarship test')) {
      speak("Our scholarship test can help you earn discounts on PREPZR premium plans! High performers can get up to 50% off. You can take it after creating your account.");
      return;
    }

    // About PREPZR commands
    if (lowerCommand.includes('what is prepzr') || lowerCommand.includes('about prepzr') ||
        lowerCommand.includes('tell me about') || lowerCommand.includes('explain prepzr')) {
      speak("PREPZR is India's first emotionally intelligent exam preparation platform. We understand not just what you need to learn, but how you feel while learning. Our AI adapts to your mood, motivation levels, and learning patterns to create a supportive study experience tailored just for you.");
      return;
    }

    // Benefits and features
    if (lowerCommand.includes('benefits') || lowerCommand.includes('features') ||
        lowerCommand.includes('why prepzr') || lowerCommand.includes('how does it help')) {
      speak("PREPZR offers personalized study plans, mood-based learning adaptation, comprehensive practice tests, and 24/7 AI support. Unlike traditional coaching, we focus on your emotional well-being during exam preparation, leading to better results and reduced stress.");
      return;
    }

    // Subscription and pricing
    if (lowerCommand.includes('subscription') || lowerCommand.includes('pricing') ||
        lowerCommand.includes('plans') || lowerCommand.includes('cost')) {
      speak("We offer flexible subscription plans starting with a free 7-day trial. Our premium plans include unlimited practice tests, personalized study plans, and advanced analytics. Would you like to start with our free trial?");
      return;
    }

    // Comparison with coaching institutes
    if (lowerCommand.includes('coaching') || lowerCommand.includes('institute') ||
        lowerCommand.includes('traditional') || lowerCommand.includes('better than')) {
      speak("Unlike traditional coaching institutes, PREPZR offers 24/7 accessibility, personalized attention, emotional intelligence, and adaptive learning. You study at your own pace without the stress of fixed schedules or one-size-fits-all approaches.");
      return;
    }

    // Help and general queries
    if (lowerCommand.includes('help') || lowerCommand.includes('how') ||
        lowerCommand.includes('guide') || lowerCommand.includes('start')) {
      speak("I'm here to help you learn about PREPZR! You can ask me about our features, free trial, exam preparation methods, or anything else. Just say 'free trial' to get started, or 'sign up' to create your account!");
      return;
    }

    // Default response for unrecognized commands
    if (lowerCommand.length > 3) {
      speak("I'm PREPZR's voice assistant! I can help you learn about our exam preparation platform, sign up for a free trial, or answer questions about our features. What would you like to know?");
    }
  }, [navigate]);

  const {
    isSpeaking,
    speak,
    startListening,
    isSupported
  } = useEnhancedVoiceAssistant({
    context: 'homepage',
    onCommand: processHomepageCommand,
    reminderInterval: 45
  });

  // Notify parent component about speaking state
  useEffect(() => {
    if (onSpeakingChange) {
      onSpeakingChange(isSpeaking);
    }
  }, [isSpeaking, onSpeakingChange]);

  // Auto-start listening when component mounts
  useEffect(() => {
    if (isSupported) {
      // Small delay to ensure proper initialization
      const timer = setTimeout(() => {
        startListening();
        // Welcome message
        speak("Welcome to PREPZR! I'm your AI guide. Ask me about our emotionally intelligent exam preparation platform, or say 'free trial' to get started!");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isSupported, startListening, speak]);

  // This component doesn't render anything visible
  return null;
};

export default HomepageVoiceAssistant;
