
import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface EnhancedVoiceGreetingProps {
  userName: string;
  isFirstTimeUser: boolean;
  language?: string;
}

const EnhancedVoiceGreeting: React.FC<EnhancedVoiceGreetingProps> = ({ 
  userName, 
  isFirstTimeUser,
  language = 'en-IN'
}) => {
  const [greetingPlayed, setGreetingPlayed] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Get appropriate greeting message
  const getGreetingMessage = () => {
    if (isFirstTimeUser) {
      return `Congratulations ${userName}! Welcome to Prepzer, your personalized exam preparation platform. I'm Sakha AI, your learning companion. Let me help you understand our dashboard features: You can access your study plan for daily tasks, visit the academic advisor for guidance, explore concept cards for learning, use flashcards for memorization, take practice exams to test yourself, and access our formula section for quick reference. Would you like me to show you around?`;
    } else {
      return `Welcome back ${userName}! I hope you're ready for another productive study session. Let me remind you about your daily tasks and help you with your exam preparation. You have pending topics to review and practice tests to complete. How can I assist you with your studies today?`;
    }
  };

  // Cleanup function
  const cleanupVoiceResources = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (speechRef.current) {
      speechRef.current = null;
    }
  };

  // Setup voice greeting
  const setupVoiceGreeting = () => {
    if (greetingPlayed || audioMuted || !('speechSynthesis' in window)) {
      return;
    }

    try {
      const message = getGreetingMessage();
      const speech = new SpeechSynthesisUtterance();
      
      speech.text = message;
      speech.lang = language;
      speech.rate = 0.95;
      speech.pitch = 1.05;
      speech.volume = 0.9;

      // Get available voices
      const voices = window.speechSynthesis.getVoices();
      const preferredVoiceNames = language === 'en-IN' 
        ? ['Google India', 'Microsoft Kajal', 'en-IN', 'English India', 'India']
        : ['Google US English Female', 'Microsoft Zira', 'Samantha', 'Alex', 'en-US', 'en-GB'];
      
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

      if (selectedVoice) {
        speech.voice = selectedVoice;
      }

      speech.onstart = () => console.log("Enhanced voice greeting started");
      speech.onend = () => {
        setGreetingPlayed(true);
        console.log("Enhanced voice greeting completed");
        
        toast({
          title: "Sakha AI Assistant",
          description: isFirstTimeUser 
            ? "Welcome to Prepzer! I'm here to help you navigate and succeed."
            : "Welcome back! Ready to continue your exam preparation?",
          duration: 5000,
        });
      };
      speech.onerror = (e) => {
        console.error("Enhanced speech synthesis error", e);
        setGreetingPlayed(true);
      };

      speechRef.current = speech;
      window.speechSynthesis.speak(speech);
    } catch (error) {
      console.error("Error playing enhanced greeting:", error);
      setGreetingPlayed(true);
    }
  };

  // Effect to handle page changes and mute settings
  useEffect(() => {
    cleanupVoiceResources();
    
    const muteSetting = localStorage.getItem('voice_assistant_muted');
    if (muteSetting === 'true') {
      setAudioMuted(true);
    } else if (!audioMuted && !greetingPlayed) {
      // Delay greeting to ensure page is loaded
      const timer = setTimeout(() => {
        setupVoiceGreeting();
      }, 2000);
      
      return () => clearTimeout(timer);
    }

    return () => {
      cleanupVoiceResources();
    };
  }, [location.pathname, isFirstTimeUser]);

  // Listen for mute/unmute events
  useEffect(() => {
    const handleMuteEvent = () => {
      setAudioMuted(true);
      cleanupVoiceResources();
    };
    
    const handleUnmuteEvent = () => {
      setAudioMuted(false);
      if (!greetingPlayed) {
        setTimeout(() => setupVoiceGreeting(), 500);
      }
    };

    document.addEventListener('voice-assistant-mute', handleMuteEvent);
    document.addEventListener('voice-assistant-unmute', handleUnmuteEvent);
    
    return () => {
      document.removeEventListener('voice-assistant-mute', handleMuteEvent);
      document.removeEventListener('voice-assistant-unmute', handleUnmuteEvent);
      cleanupVoiceResources();
    };
  }, [greetingPlayed]);

  return null;
};

export default EnhancedVoiceGreeting;
