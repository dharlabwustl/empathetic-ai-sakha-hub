
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
      return "Welcome to PREPZR, where we understand your mindset, not just the exam. Our platform provides personalized learning experiences to help you succeed in your academic journey.";
    } else if (path.includes('/signup')) {
      return "Welcome to PREPZR! We're excited to have you join us. Our AI will analyze your learning style to create a personalized study plan that adapts to your unique needs.";
    } else if (path.includes('/welcome') || path.includes('/free-trial')) {
      return "Welcome to your PREPZR experience. Our platform creates a personalized study path that evolves as you learn, helping you achieve your academic goals with confidence.";
    } else if (path.includes('/exam-readiness')) {
      return "Welcome to our exam readiness analyzer. PREPZR will assess your current preparation level and provide targeted recommendations to help you excel in your upcoming exams.";
    }
    
    return "Welcome to PREPZR. Our AI-powered platform personalizes your learning experience to help you achieve academic success. How can we help you succeed today?";
  };
  
  useEffect(() => {
    // Only play the greeting if speech synthesis is supported and we're on the right page
    if ('speechSynthesis' in window && !greetingPlayed && shouldPlayGreeting && !audioMuted) {
      // Use a timeout to ensure the component is fully mounted
      const timer = setTimeout(() => {
        try {
          const message = getContextMessage(location.pathname, language);
          
          // Create speech synthesis utterance
          const speech = new SpeechSynthesisUtterance();
          
          // Set speech properties
          speech.text = message;
          speech.lang = language;
          speech.rate = 1.0; // Normal rate for clarity
          speech.pitch = 1.1; // Slightly higher for a more vibrant tone
          speech.volume = 0.9;
          
          // Get available voices
          const voices = window.speechSynthesis.getVoices();
          
          // Try to find a clear, vibrant voice - preferring female voices which often sound better
          const preferredVoiceNames = [
            'Samantha', 'Google UK English Female', 'Microsoft Zira',
            'Google US English Female', 'Victoria', 'Alex'
          ];
          
          // Try to find a preferred voice
          let selectedVoice = null;
          for (const name of preferredVoiceNames) {
            const voice = voices.find(v => 
              v.name?.includes(name) || 
              v.lang?.includes(language.split('-')[0])
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
            title: "Voice Assistant Activated",
            description: "Welcome to PREPZR - We understand your mindset, not just the exam",
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
