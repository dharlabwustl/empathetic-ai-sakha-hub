
import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEnhancedVoiceAssistant } from '@/hooks/useEnhancedVoiceAssistant';

interface HomepageVoiceAssistantProps {
  onSpeakingChange?: (isSpeaking: boolean) => void;
  onListeningChange?: (isListening: boolean) => void;
}

const HomepageVoiceAssistant: React.FC<HomepageVoiceAssistantProps> = ({
  onSpeakingChange,
  onListeningChange
}) => {
  const navigate = useNavigate();
  
  const processHomepageCommand = useCallback((command: string, confidence: number) => {
    const lowerCommand = command.toLowerCase().trim();
    
    // Only process commands with reasonable confidence
    if (confidence < 0.3 && lowerCommand.length < 6) return;

    console.log('🏠 Homepage processing command:', lowerCommand, 'confidence:', confidence);

    // Signup and registration commands
    if (lowerCommand.includes('sign up') || lowerCommand.includes('signup') || 
        lowerCommand.includes('register') || lowerCommand.includes('join') ||
        lowerCommand.includes('create account') || lowerCommand.includes('get started')) {
      speak("Excellent choice! I'll take you to our signup page where you can create your free PREPZR account and begin your exam preparation journey with India's first emotionally intelligent study platform.");
      setTimeout(() => navigate('/signup'), 1200);
      return;
    }

    // Free trial commands
    if (lowerCommand.includes('free trial') || lowerCommand.includes('trial') ||
        lowerCommand.includes('try free') || lowerCommand.includes('start free')) {
      speak("Perfect! PREPZR offers a comprehensive 7-day free trial with full access to our emotionally intelligent study platform. You'll experience personalized learning that adapts to your mood and motivation. Let me guide you to get started!");
      setTimeout(() => navigate('/signup?trial=true'), 1200);
      return;
    }

    // Login commands
    if (lowerCommand.includes('login') || lowerCommand.includes('log in') ||
        lowerCommand.includes('sign in') || lowerCommand.includes('signin')) {
      speak("Welcome back to PREPZR! I'll take you to the login page where you can access your personalized study dashboard.");
      setTimeout(() => navigate('/login'), 1000);
      return;
    }

    // Exam readiness test commands
    if (lowerCommand.includes('exam readiness') || lowerCommand.includes('readiness test') ||
        lowerCommand.includes('assessment') || lowerCommand.includes('test my level') ||
        lowerCommand.includes('analyze my preparation')) {
      speak("Our Exam Readiness Test is a fantastic way to understand your current preparation level! It analyzes your strengths and weaknesses across all subjects and provides personalized insights. You can take this comprehensive assessment after signing up for your free account!");
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('open-exam-analyzer'));
      }, 1200);
      return;
    }

    // About PREPZR commands
    if (lowerCommand.includes('what is prepzr') || lowerCommand.includes('about prepzr') ||
        lowerCommand.includes('tell me about') || lowerCommand.includes('explain prepzr') ||
        lowerCommand.includes('how does prepzr work')) {
      speak("PREPZR is India's first emotionally intelligent exam preparation platform! Unlike traditional coaching, we understand not just what you need to learn, but how you feel while learning. Our AI adapts to your mood, stress levels, and motivation to create a supportive, personalized study experience. We make exam preparation more human, more effective, and less stressful!");
      return;
    }

    // Benefits and features
    if (lowerCommand.includes('benefits') || lowerCommand.includes('features') ||
        lowerCommand.includes('why prepzr') || lowerCommand.includes('how does it help') ||
        lowerCommand.includes('what makes prepzr special')) {
      speak("PREPZR offers revolutionary features like mood-based learning adaptation, personalized study plans that evolve with you, comprehensive practice tests, real-time emotional support, and 24/7 AI guidance. Unlike traditional coaching institutes, we focus on your emotional well-being during exam preparation, leading to better results, reduced stress, and improved confidence!");
      return;
    }

    // Comparison with traditional coaching
    if (lowerCommand.includes('coaching') || lowerCommand.includes('institute') ||
        lowerCommand.includes('traditional') || lowerCommand.includes('better than') ||
        lowerCommand.includes('vs coaching') || lowerCommand.includes('difference')) {
      speak("Great question! Unlike traditional coaching institutes with fixed schedules and one-size-fits-all approaches, PREPZR offers 24/7 accessibility, personalized attention for every student, emotional intelligence that understands your feelings, and adaptive learning that evolves with your progress. You study at your own pace without the stress of rigid timetables!");
      return;
    }

    // Subscription and pricing
    if (lowerCommand.includes('subscription') || lowerCommand.includes('pricing') ||
        lowerCommand.includes('plans') || lowerCommand.includes('cost') ||
        lowerCommand.includes('how much') || lowerCommand.includes('price')) {
      speak("We offer flexible subscription plans starting with a completely free 7-day trial! Our premium plans include unlimited practice tests, advanced analytics, personalized study paths, and priority support. The best part? You can try everything free for a week to see how PREPZR transforms your exam preparation!");
      return;
    }

    // Scholarship test
    if (lowerCommand.includes('scholarship') || lowerCommand.includes('discount') ||
        lowerCommand.includes('scholarship test') || lowerCommand.includes('save money')) {
      speak("Excellent! Our scholarship test is a great opportunity for dedicated students! High performers can earn significant discounts on PREPZR premium plans - up to 50% off! You can take the scholarship test after creating your free account. It's our way of supporting serious exam aspirants!");
      return;
    }

    // General help and guidance
    if (lowerCommand.includes('help') || lowerCommand.includes('how') ||
        lowerCommand.includes('guide') || lowerCommand.includes('start') ||
        lowerCommand.includes('what can you do')) {
      speak("I'm your PREPZR assistant, here to help you discover how our platform can revolutionize your exam preparation! I can guide you through our features, help you start a free trial, answer questions about our benefits, or explain why PREPZR is perfect for exam aspirants. Just ask me anything about PREPZR or say 'free trial' to get started!");
      return;
    }

    // Default response for unclear commands
    if (lowerCommand.length > 3) {
      speak("I'm your friendly PREPZR assistant! I can help you learn about our emotionally intelligent exam preparation platform, guide you through our free trial, or answer any questions about how PREPZR can boost your exam success. What would you like to know about PREPZR?");
    }
  }, [navigate]);

  const {
    isSpeaking,
    isListening,
    speak,
    startListening,
    stopSpeaking,
    isSupported
  } = useEnhancedVoiceAssistant({
    context: 'homepage',
    onCommand: processHomepageCommand,
    reminderInterval: 45
  });

  // Notify parent components about state changes
  useEffect(() => {
    if (onSpeakingChange) {
      onSpeakingChange(isSpeaking);
    }
  }, [isSpeaking, onSpeakingChange]);

  useEffect(() => {
    if (onListeningChange) {
      onListeningChange(isListening);
    }
  }, [isListening, onListeningChange]);

  // Auto-start with engaging welcome message
  useEffect(() => {
    if (isSupported) {
      const timer = setTimeout(() => {
        startListening();
        speak("Welcome to PREPZR - India's first emotionally intelligent exam preparation platform! I'm your AI guide, here to help you discover how PREPZR can transform your exam preparation journey. Ask me about our features, start a free trial, or learn why thousands of students choose PREPZR over traditional coaching!");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isSupported, startListening, speak]);

  return null;
};

export default HomepageVoiceAssistant;
