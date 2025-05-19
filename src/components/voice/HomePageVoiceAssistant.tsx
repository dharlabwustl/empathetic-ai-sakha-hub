
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';

interface HomePageVoiceAssistantProps {
  language?: string;
}

const HomePageVoiceAssistant: React.FC<HomePageVoiceAssistantProps> = ({ 
  language = 'en-US'
}) => {
  const [greetingPlayed, setGreetingPlayed] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const { speakMessage } = useVoiceAnnouncer({
    initialSettings: { language }
  });
  
  // Check if the current location is appropriate for voice greeting
  const shouldPlayGreeting = location.pathname === '/' || 
                            location.pathname.includes('/signup') ||
                            location.pathname.includes('/welcome') ||
                            location.pathname.includes('/free-trial') ||
                            location.pathname.includes('/exam-readiness');
  
  // Get context-aware message based on page
  const getContextMessage = (path: string, lang: string) => {
    // Add UN sustainability goals message
    const sustainabilityMessage = "Prep-zer supports UN Sustainability goals with inclusive and equitable quality education. We're committed to providing equal access to personalized learning for all students.";
    
    if (path === '/') {
      return `Welcome to Prep-zer, the world's first emotionally aware exam preparation platform. I'm Sakha AI, and I adapt to your learning style to create a hyper-personalized study experience. If you need any assistance exploring our features, I'm here to help. ${sustainabilityMessage}`;
    } else if (path.includes('/signup')) {
      return `Congratulations on taking this important step! I'm Sakha AI, Prep-zer's exam preparation assistant. Our platform adapts to your learning style to create a personalized study journey. Need any help getting started? Just ask. ${sustainabilityMessage}`;
    } else if (path.includes('/free-trial')) {
      return `Welcome to your Prep-zer free trial! I'm Sakha AI, your adaptive learning assistant. During this trial, you'll experience our personalized study plans and emotionally intelligent tutoring. Let me know if you need help exploring any features. ${sustainabilityMessage}`;
    } else if (path.includes('/exam-readiness')) {
      return `Welcome to our exam readiness analyzer! I'm Sakha AI. Our analyzer provides detailed insights about your preparation level and recommends specific areas to focus on before your exam. I can help you interpret these results if you need assistance. ${sustainabilityMessage}`;
    }
    
    return `Welcome to Prep-zer. I'm Sakha AI, your emotionally intelligent exam companion. I'm here to assist you with navigating our platform, exploring study plans, concept cards, flashcards, practice exams, and more. ${sustainabilityMessage}`;
  };
  
  useEffect(() => {
    // Only play the greeting if we haven't played it already and we're on the right page
    if (!greetingPlayed && shouldPlayGreeting) {
      // Use a timeout to ensure the component is fully mounted
      const timer = setTimeout(() => {
        try {
          const message = getContextMessage(location.pathname, language);
          
          // Use our centralized voice system
          speakMessage(message);
          setGreetingPlayed(true);
          
          // Show toast notification
          toast({
            title: "Sakha AI Voice Assistant",
            description: "Voice assistance is available on this page",
            duration: 3000,
          });
        } catch (error) {
          console.error("Error playing greeting:", error);
          setGreetingPlayed(true);
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
    
    // Cleanup function to cancel any ongoing speech when component unmounts
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [greetingPlayed, shouldPlayGreeting, location.pathname, language, toast, speakMessage]);
  
  return null; // This component doesn't render any UI
};

export default HomePageVoiceAssistant;
