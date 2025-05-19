
import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { MoodType } from '@/types/user/base';

interface DashboardVoiceAssistantProps {
  userName?: string;
  userMood?: MoodType;
  language?: string;
}

const DashboardVoiceAssistant: React.FC<DashboardVoiceAssistantProps> = ({
  userName = 'Student',
  userMood,
  language = 'en-US'
}) => {
  const [greetingPlayed, setGreetingPlayed] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Load mute preference
  useEffect(() => {
    const muteSetting = localStorage.getItem('voice_assistant_muted');
    if (muteSetting === 'true') {
      setAudioMuted(true);
    }
  }, []);
  
  // Get context-aware and mood-aware greeting message
  const getContextMessage = (path: string, mood?: MoodType) => {
    // Base greeting including user's name
    let baseGreeting = `Welcome to your dashboard, ${userName}.`;
    
    // Mood-specific additions
    if (mood) {
      switch(mood) {
        case MoodType.HAPPY:
          baseGreeting = `Great to see you looking happy today, ${userName}! Your positive energy will boost your learning.`;
          break;
        case MoodType.MOTIVATED:
          baseGreeting = `I can see you're feeling motivated today, ${userName}. Let's make the most of that energy!`;
          break;
        case MoodType.FOCUSED:
          baseGreeting = `You're in a focused state today, ${userName}. That's perfect for tackling challenging concepts.`;
          break;
        case MoodType.TIRED:
          baseGreeting = `I notice you're feeling tired today, ${userName}. We can focus on lighter review sessions to keep your progress going.`;
          break;
        case MoodType.STRESSED:
          baseGreeting = `I see you're feeling stressed, ${userName}. Let's work on some achievable goals today to build your confidence.`;
          break;
        case MoodType.ANXIOUS:
          baseGreeting = `I understand you're feeling anxious, ${userName}. We can start with some confidence-building exercises today.`;
          break;
        case MoodType.OVERWHELMED:
          baseGreeting = `Feeling overwhelmed is normal, ${userName}. Let's break things down into smaller, manageable steps today.`;
          break;
        default:
          // Use default greeting for other moods
          break;
      }
    }
    
    // Path-specific content
    if (path.includes('/analytics')) {
      return `${baseGreeting} Here in analytics, you can track your progress and identify areas that need attention.`;
    } else if (path.includes('/concepts')) {
      return `${baseGreeting} The concepts section helps you master key topics through interactive learning.`;
    } else if (path.includes('/study-plan')) {
      return `${baseGreeting} Your study plan is customized to optimize your learning efficiency and exam readiness.`;
    } else if (path.includes('/feel-good')) {
      return `${baseGreeting} Welcome to the Feel-Good Corner, where you can take breaks and recharge your mind.`;
    } else if (path.includes('/settings')) {
      return `${baseGreeting} Here you can customize your dashboard experience and update your preferences.`;
    } else if (path.includes('/exams')) {
      return `${baseGreeting} The exam section helps you practice with realistic questions and timing conditions.`;
    }
    
    // Default dashboard message with UN sustainability goal mention
    return `${baseGreeting} I'm Sakha AI, your personalized learning assistant. I'll help you prepare effectively while supporting UN Sustainability Goal 4 for inclusive and quality education. Use the microphone button anytime you need assistance.`;
  };
  
  useEffect(() => {
    const newPageGreeting = sessionStorage.getItem(`visited_${location.pathname}`);
    const shouldGreet = !newPageGreeting && !greetingPlayed;
    
    // Only play greeting if speech synthesis is supported and we're not muted
    if ('speechSynthesis' in window && shouldGreet && !audioMuted) {
      // Use a timeout to ensure the component is fully mounted
      const timer = setTimeout(() => {
        try {
          const message = getContextMessage(location.pathname, userMood);
          
          // Create speech synthesis utterance
          utteranceRef.current = new SpeechSynthesisUtterance();
          
          // Correct PREPZR pronunciation by using proper spelling in the text
          utteranceRef.current.text = message.replace(/PREPZR/gi, 'PREP-zer');
          utteranceRef.current.lang = language;
          utteranceRef.current.rate = 0.95; // Slightly slower for clarity
          utteranceRef.current.pitch = 1.05; // Slightly higher for a more vibrant tone
          utteranceRef.current.volume = 0.9;
          
          // Get available voices
          const voices = window.speechSynthesis.getVoices();
          
          // Try to find a clear, vibrant voice
          const preferredVoiceNames = ['Google US English Female', 'Microsoft Zira', 'Samantha', 'en-US'];
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
            utteranceRef.current.voice = selectedVoice;
          }
          
          // Handle events
          utteranceRef.current.onstart = () => console.log("Voice greeting started");
          utteranceRef.current.onend = () => {
            setGreetingPlayed(true);
            console.log("Voice greeting completed");
            
            // Mark this page as visited to avoid repeating the greeting
            sessionStorage.setItem(`visited_${location.pathname}`, 'true');
          };
          utteranceRef.current.onerror = (e) => {
            console.error("Speech synthesis error", e);
            setGreetingPlayed(true);
          };
          
          // Speak the message
          window.speechSynthesis.speak(utteranceRef.current);
          
          // Show toast notification
          toast({
            title: "Sakha AI Voice Assistant",
            description: "Voice guidance is active. Click the mic button for assistance.",
            duration: 3000,
          });
        } catch (error) {
          console.error("Error playing greeting:", error);
          setGreetingPlayed(true);
        }
      }, 1500);
      
      return () => clearTimeout(timer);
    }
    
    // Cleanup function to cancel any ongoing speech when component unmounts
    return () => {
      if ('speechSynthesis' in window && utteranceRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, [greetingPlayed, location.pathname, language, audioMuted, userMood, userName, toast]);
  
  // Listen for custom events to mute/unmute
  useEffect(() => {
    const handleMuteEvent = () => {
      setAudioMuted(true);
      localStorage.setItem('voice_assistant_muted', 'true');
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
    
    const handleUnmuteEvent = () => {
      setAudioMuted(false);
      localStorage.setItem('voice_assistant_muted', 'false');
    };
    
    document.addEventListener('voice-assistant-mute', handleMuteEvent);
    document.addEventListener('voice-assistant-unmute', handleUnmuteEvent);
    
    return () => {
      document.removeEventListener('voice-assistant-mute', handleMuteEvent);
      document.removeEventListener('voice-assistant-unmute', handleUnmuteEvent);
    };
  }, []);
  
  return null; // This component doesn't render any UI
};

export default DashboardVoiceAssistant;
