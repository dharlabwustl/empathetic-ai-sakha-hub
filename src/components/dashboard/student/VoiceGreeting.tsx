
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface VoiceGreetingProps {
  isFirstTimeUser: boolean;
  userName?: string;
  language?: string;
}

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({ 
  isFirstTimeUser, 
  userName = 'Student', 
  language = 'en-IN'
}) => {
  const [hasGreeted, setHasGreeted] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Only greet first-time users and only once per session
    if (isFirstTimeUser && !hasGreeted) {
      const greetUser = () => {
        // Check if speech synthesis is available
        if ('speechSynthesis' in window) {
          // Cancel any ongoing speech
          window.speechSynthesis.cancel();
          
          // Create greeting message
          const greeting = `Namaste ${userName}! Welcome to Prep-zer! I'm your AI-powered study companion. I'll help you prepare for your NEET exams with personalized study plans, concept cards, and practice tests. Let me give you a quick tour of your dashboard.`;
          
          // Create utterance
          const utterance = new SpeechSynthesisUtterance(greeting);
          
          // Set Indian English voice if available
          utterance.lang = language;
          
          // Try to find an Indian English voice
          const voices = window.speechSynthesis.getVoices();
          const indianVoice = voices.find(voice => voice.lang === 'en-IN' || voice.lang === 'hi-IN');
          if (indianVoice) {
            utterance.voice = indianVoice;
          }
          
          // Set voice properties for better clarity
          utterance.rate = 0.9;
          utterance.pitch = 1;
          utterance.volume = 1;
          
          // Speak the greeting
          window.speechSynthesis.speak(utterance);
          
          // Show toast with greeting message
          toast({
            title: "Welcome to PREPZR!",
            description: "I'll help you navigate your personalized dashboard.",
            duration: 6000,
          });
          
          // Mark as greeted
          setHasGreeted(true);
          localStorage.setItem('has_greeted_user', 'true');
        }
      };

      // Wait a moment before greeting to allow UI to settle
      const timer = setTimeout(() => {
        greetUser();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isFirstTimeUser, userName, hasGreeted, toast, language]);

  return null; // This is a non-visual component
};

export default VoiceGreeting;
