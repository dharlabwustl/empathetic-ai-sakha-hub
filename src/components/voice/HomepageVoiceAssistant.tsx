
import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEnhancedVoiceAssistant } from '@/hooks/useEnhancedVoiceAssistant';

interface HomepageVoiceAssistantProps {
  onSpeakingChange?: (isSpeaking: boolean) => void;
  onListeningChange?: (isListening: boolean) => void;
  onStopSpeaking?: (handler: () => void) => void;
}

const HomepageVoiceAssistant: React.FC<HomepageVoiceAssistantProps> = ({
  onSpeakingChange,
  onListeningChange,
  onStopSpeaking
}) => {
  const navigate = useNavigate();
  
  const processHomepageCommand = useCallback((command: string, confidence: number) => {
    const lowerCommand = command.toLowerCase().trim();
    
    // Only process if confidence is reasonable
    if (confidence < 0.3 && lowerCommand.length < 5) return;

    // PREPZR introduction and benefits
    if (lowerCommand.includes('what is prepzr') || lowerCommand.includes('about prepzr') ||
        lowerCommand.includes('tell me about') || lowerCommand.includes('what is prep zr')) {
      speak("Prep-Zer is the world's first emotionally aware exam preparation platform! We use advanced AI to understand your learning style, mood, and progress to create personalized study plans. Unlike traditional coaching institutes, Prep-Zer adapts to YOU - providing 24/7 support, smart practice tests, and emotional guidance throughout your exam journey.");
      return;
    }

    // Free trial and signup
    if (lowerCommand.includes('free trial') || lowerCommand.includes('trial') ||
        lowerCommand.includes('sign up') || lowerCommand.includes('register') ||
        lowerCommand.includes('get started')) {
      speak("Excellent! Prep-Zer offers a completely free 7-day trial with full access to all features. You'll get personalized study plans, AI-powered practice tests, and emotional support. Ready to start your transformation? Just click the signup button!");
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('scroll-to-signup'));
      }, 1000);
      return;
    }

    // Login
    if (lowerCommand.includes('login') || lowerCommand.includes('log in') ||
        lowerCommand.includes('sign in')) {
      speak("Welcome back! Click the login button to access your Prep-Zer dashboard and continue your exam preparation journey.");
      navigate('/auth');
      return;
    }

    // Exam Readiness Test
    if (lowerCommand.includes('exam readiness') || lowerCommand.includes('readiness test') ||
        lowerCommand.includes('assessment') || lowerCommand.includes('test my level')) {
      speak("Great question! Our Exam Readiness Test is a comprehensive assessment that evaluates your current preparation level across all subjects. It helps us create the perfect personalized study plan for you. Want to take it now?");
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('open-exam-analyzer'));
      }, 1000);
      return;
    }

    // Scholarship test
    if (lowerCommand.includes('scholarship') || lowerCommand.includes('discount') ||
        lowerCommand.includes('scholarship test')) {
      speak("Amazing! Prep-Zer offers scholarship tests that can give you significant discounts on our premium plans. High performers can earn up to 50% off! These tests evaluate your academic potential and dedication to studies.");
      return;
    }

    // Comparison with coaching institutes
    if (lowerCommand.includes('better than coaching') || lowerCommand.includes('coaching institute') ||
        lowerCommand.includes('vs coaching') || lowerCommand.includes('traditional coaching')) {
      speak("Great question! Unlike traditional coaching institutes, Prep-Zer offers 24/7 personalized support, adapts to your learning pace, tracks your emotional well-being, and costs a fraction of expensive coaching fees. You get world-class education without geographical limitations or rigid schedules!");
      return;
    }

    // Comparison with other platforms
    if (lowerCommand.includes('better than others') || lowerCommand.includes('vs other platform') ||
        lowerCommand.includes('different from') || lowerCommand.includes('why choose')) {
      speak("Prep-Zer is unique because we're the only platform that combines AI-powered personalization with emotional intelligence. While others just provide content, we understand your feelings, adapt to your moods, and provide psychological support throughout your exam journey. It's like having a personal mentor and therapist combined!");
      return;
    }

    // Subscription and plans
    if (lowerCommand.includes('subscription') || lowerCommand.includes('plans') ||
        lowerCommand.includes('pricing') || lowerCommand.includes('cost')) {
      speak("Prep-Zer offers flexible subscription plans starting with a completely free 7-day trial. Our affordable plans include personalized study schedules, unlimited practice tests, AI tutoring, and emotional support - all at a fraction of traditional coaching costs!");
      return;
    }

    // General help or greeting
    if (lowerCommand.includes('help') || lowerCommand.includes('hello') ||
        lowerCommand.includes('hi') || lowerCommand.includes('hey')) {
      speak("Hello! I'm your Prep-Zer AI assistant! I'm here to tell you about our revolutionary exam preparation platform. You can ask me about our free trial, exam readiness test, how we're better than coaching institutes, or anything else about Prep-Zer!");
      return;
    }

    // Default response for unrecognized commands
    if (lowerCommand.length > 3) {
      speak("I'm here to help you learn about Prep-Zer! You can ask me about our free trial, exam readiness test, subscription plans, or how we're revolutionizing exam preparation. What would you like to know?");
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
    onCommand: processHomepageCommand
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

  useEffect(() => {
    if (onStopSpeaking) {
      onStopSpeaking(stopSpeaking);
    }
  }, [stopSpeaking, onStopSpeaking]);

  // Auto-start voice assistant on homepage
  useEffect(() => {
    if (isSupported) {
      const timer = setTimeout(() => {
        speak("Welcome to Prep-Zer! I'm your AI assistant, here to guide you through the world's first emotionally aware exam preparation platform. Feel free to ask me anything about how Prep-Zer can transform your exam preparation journey!");
        startListening();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isSupported, speak, startListening]);

  return null;
};

export default HomepageVoiceAssistant;
