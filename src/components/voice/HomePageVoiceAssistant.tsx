
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface HomePageVoiceAssistantProps {
  language?: string;
}

const HomePageVoiceAssistant: React.FC<HomePageVoiceAssistantProps> = ({ 
  language = 'en-US'
}) => {
  const [greetingPlayed, setGreetingPlayed] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  
  // Check if the current location is appropriate for voice greeting
  const shouldPlayGreeting = location.pathname === '/' || 
                            location.pathname.includes('/signup') ||
                            location.pathname.includes('/welcome') ||
                            location.pathname.includes('/free-trial') ||
                            location.pathname.includes('/exam-readiness');
  
  // Get context-aware message based on page
  const getContextMessage = (path: string, lang: string) => {
    if (path === '/') {
      return "Welcome to PREPZR, the world's first emotionally aware exam preparation platform. I'm Sakha AI, and I adapt to your learning style to create a hyper-personalized study experience.";
    } else if (path.includes('/signup')) {
      return "Congratulations on taking this important step! I'm Sakha AI, PREPZR's exam preparation assistant. Our platform adapts to your learning style to create a personalized study journey that traditional coaching centers can't match.";
    } else if (path.includes('/free-trial')) {
      return "Welcome to your PREPZR free trial! I'm Sakha AI, your adaptive learning assistant. During this trial, you'll experience our personalized study plans and emotionally intelligent tutoring.";
    } else if (path.includes('/exam-readiness')) {
      return "Welcome to our exam readiness analyzer! I'm Sakha AI. Our analyzer provides detailed insights about your preparation level and recommends specific areas to focus on before your exam.";
    }
    
    return "Welcome to PREPZR. I'm Sakha AI, your emotionally intelligent exam companion.";
  };
  
  useEffect(() => {
    // Only play the greeting if speech synthesis is supported and we're on the right page
    if ('speechSynthesis' in window && !greetingPlayed && shouldPlayGreeting && !audioMuted) {
      // Use a timeout to ensure the component is fully mounted
      const timer = setTimeout(() => {
        try {
          const message = getContextMessage(location.pathname, language);
          
          // Create speech synthesis utterance
          const speech = new SpeechSynthesisUtterance(message);
          speech.lang = language;
          speech.rate = 1.0; // Normal rate for clarity
          speech.pitch = 1.1; // Slightly higher for a more vibrant tone
          speech.volume = 0.9;
          
          // Get available voices
          const voices = window.speechSynthesis.getVoices();
          
          // Try to find a clear, vibrant voice - preferring US English voices
          const preferredVoiceNames = [
            'Google US English Female', 'Microsoft Zira', 'Samantha', 
            'Alex', 'en-US', 'en-GB'
          ];
          
          // Try to find a preferred voice
          let selectedVoice = null;
          for (const name of preferredVoiceNames) {
            const voice = voices.find(v => 
              v.name?.toLowerCase().includes(name.toLowerCase()) || 
              v.lang?.toLowerCase().includes(name.toLowerCase())
            );
            if (voice) {
              selectedVoice = voice;
              break;
            }
          }
          
          // If still no voice selected, use any available voice
          if (!selectedVoice && voices.length > 0) {
            selectedVoice = voices[0];
          }
          
          // Set the selected voice if found
          if (selectedVoice) {
            speech.voice = selectedVoice;
          }
          
          // Handle events
          speech.onstart = () => console.log("Voice greeting started");
          speech.onend = () => {
            setGreetingPlayed(true);
            console.log("Voice greeting completed");
          };
          speech.onerror = (e) => {
            console.error("Speech synthesis error", e);
            setGreetingPlayed(true);
          };
          
          // Speak the message
          window.speechSynthesis.speak(speech);
          
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
  }, [greetingPlayed, shouldPlayGreeting, location.pathname, language, audioMuted, toast]);
  
  return null; // This component doesn't render any UI
};

export default HomePageVoiceAssistant;
