
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
    const sustainabilityMessage = "PREP-zer supports UN Sustainability goals with inclusive and equitable quality education. We're committed to providing equal access to personalized learning for all students.";
    
    // Milestones messaging
    const milestonesMessage = "Our platform guides you through various milestones including Confidence Building, Exam Success, Time Saving, Stress-Free preparation, and Happy Learning.";
    
    if (path === '/') {
      return `Welcome to PREP-zer, the world's first emotionally aware exam preparation platform. I'm Sakha AI, and I adapt to your learning style to create a hyper-personalized study experience. We understand your mindset, not just the exam. ${milestonesMessage} ${sustainabilityMessage} Can I help you explore our features or answer any questions?`;
    } else if (path.includes('/signup')) {
      return `Congratulations on taking this important step! I'm Sakha AI, PREP-zer's exam preparation assistant. Our emotionally-aware, hyper-personalized platform adapts to your learning style to create a personalized study journey. We understand your mindset, not just the exam. ${sustainabilityMessage} Would you like me to guide you through our key features?`;
    } else if (path.includes('/free-trial')) {
      return `Welcome to your PREP-zer free trial! I'm Sakha AI, your adaptive learning assistant. During this trial, you'll experience our emotionally intelligent, hyper-personalized study plans and adaptive tutoring. We understand your mindset, not just the exam. ${sustainabilityMessage} I'm here to assist you throughout your journey.`;
    } else if (path.includes('/exam-readiness')) {
      return `Welcome to our exam readiness analyzer! I'm Sakha AI. Our analyzer provides detailed insights about your preparation level and recommends specific areas to focus on before your exam. We understand your mindset, not just the exam material. ${sustainabilityMessage} I can help you interpret your results and suggest appropriate study strategies.`;
    }
    
    return `Welcome to PREP-zer. I'm Sakha AI, your emotionally intelligent exam companion. We understand your mindset, not just the exam. ${sustainabilityMessage} How may I assist you today?`;
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
