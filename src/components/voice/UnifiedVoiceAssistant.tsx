
import React, { useState, useEffect, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useLocation } from 'react-router-dom';

interface UnifiedVoiceAssistantProps {
  userName?: string;
  language?: string;
  isFirstTimeUser?: boolean;
  userMood?: string;
}

const UnifiedVoiceAssistant: React.FC<UnifiedVoiceAssistantProps> = ({
  userName = 'Student',
  language = 'en-US',
  isFirstTimeUser = false,
  userMood
}) => {
  const { toast } = useToast();
  const location = useLocation();
  const [hasGreeted, setHasGreeted] = useState(false);
  const currentSpeechRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Stop current speech when route changes
  useEffect(() => {
    if (currentSpeechRef.current && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setHasGreeted(false);
  }, [location.pathname]);

  // Greet user based on page and user type
  useEffect(() => {
    if (!hasGreeted) {
      const timer = setTimeout(() => {
        speakPageSpecificMessage();
        setHasGreeted(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasGreeted, location.pathname, isFirstTimeUser]);

  const speakPageSpecificMessage = () => {
    if ('speechSynthesis' in window) {
      let message = '';
      
      if (isFirstTimeUser) {
        message = getFirstTimeUserMessage();
      } else {
        message = getReturningUserMessage();
      }
      
      const speech = new SpeechSynthesisUtterance();
      speech.text = message;
      speech.lang = language;
      speech.volume = 0.8;
      speech.rate = 0.9;
      speech.pitch = 1.1;
      
      // Get available voices and select a preferred one
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('zira') ||
        voice.name.toLowerCase().includes('samantha')
      );
      
      if (femaleVoice) {
        speech.voice = femaleVoice;
      }
      
      currentSpeechRef.current = speech;
      window.speechSynthesis.speak(speech);
    }
  };

  const getFirstTimeUserMessage = () => {
    const currentPath = location.pathname;
    
    if (currentPath.includes('/dashboard/student')) {
      return `Congratulations ${userName}! Welcome to PREP-zer! I'm Sakha AI, your personal study companion. Let me help you understand our amazing features. You have access to your personalized study plan, academic advisor for expert guidance, daily study plans, interactive concept cards, smart flashcards, practice exams, and formula sections. Each feature is designed to help you crack your target exam. Would you like me to guide you through any specific section?`;
    }
    
    return `Welcome to PREP-zer, ${userName}! Congratulations on joining our community of successful exam crackers!`;
  };

  const getReturningUserMessage = () => {
    const currentPath = location.pathname;
    
    if (currentPath.includes('/dashboard/student')) {
      return `Welcome back, ${userName}! Ready to continue your exam preparation journey? You have some daily tasks waiting for you. Let me remind you about your pending activities and help you stay on track with your study plan. Remember, consistent effort leads to exam success!`;
    }
    
    if (currentPath.includes('/concepts')) {
      return `Great choice, ${userName}! You're in the concept cards section. Here you can master fundamental concepts with interactive explanations, examples, and practice questions. Focus on understanding rather than memorizing!`;
    }
    
    if (currentPath.includes('/todays-plan')) {
      return `Perfect timing, ${userName}! Your today's plan is ready. I've organized your study schedule to maximize learning efficiency. Start with high-priority tasks and don't forget to take breaks!`;
    }
    
    if (currentPath.includes('/flashcards')) {
      return `Excellent, ${userName}! Flashcards are perfect for quick revision and memory reinforcement. Practice regularly to improve your recall speed and accuracy!`;
    }
    
    if (currentPath.includes('/academic-advisor')) {
      return `Welcome to your academic advisor section, ${userName}! Here you can get personalized study recommendations, track your progress, and plan your exam strategy effectively!`;
    }
    
    return `Welcome back, ${userName}! Ready to ace your exams today?`;
  };

  return null; // This component doesn't render anything visible
};

export default UnifiedVoiceAssistant;
