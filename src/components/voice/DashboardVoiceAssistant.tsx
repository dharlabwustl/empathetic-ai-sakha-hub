
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
    // Get user's first name only for more personal touch
    const firstName = userName.split(' ')[0];
    
    // Base greeting including user's name
    let baseGreeting = `Congratulations on joining PREPZR, ${firstName}! I'm Sakha AI, your personal learning assistant.`;
    
    // First-time user welcome
    if (localStorage.getItem('new_user_signup') === 'true') {
      baseGreeting = `Congratulations on joining PREPZR, ${firstName}! Welcome to your personalized learning journey. I'm Sakha AI, your intelligent learning companion.`;
    }
    
    // Mood-specific additions for returning users
    if (mood && !localStorage.getItem('new_user_signup')) {
      switch(mood) {
        case MoodType.HAPPY:
          baseGreeting = `It's great to see you looking happy today, ${firstName}! Your positive energy will boost your learning journey.`;
          break;
        case MoodType.MOTIVATED:
          baseGreeting = `I can see you're feeling motivated today, ${firstName}. That's excellent! Let's harness that energy for effective learning.`;
          break;
        case MoodType.FOCUSED:
          baseGreeting = `You're in a focused state today, ${firstName}. Perfect timing! Let's tackle those challenging concepts together.`;
          break;
        case MoodType.TIRED:
          baseGreeting = `I notice you're feeling tired today, ${firstName}. Let's focus on lighter, engaging content to maintain your progress.`;
          break;
        case MoodType.STRESSED:
          baseGreeting = `I see you're feeling stressed, ${firstName}. Don't worry, we'll break down complex topics into manageable steps today.`;
          break;
        case MoodType.ANXIOUS:
          baseGreeting = `I understand you're feeling anxious, ${firstName}. We'll start with confidence-building exercises to help you feel more prepared.`;
          break;
        case MoodType.OVERWHELMED:
          baseGreeting = `Feeling overwhelmed is completely normal during exam preparation, ${firstName}. Let's organize your study plan into smaller, achievable goals.`;
          break;
        default:
          // Use default greeting for other moods
          break;
      }
    }
    
    // Path-specific content with more engaging, supportive language
    if (path.includes('/analytics')) {
      return `${baseGreeting} You're now in your analytics dashboard, where you can track your progress and identify areas for improvement. I've analyzed your recent performance and highlighted key insights to help optimize your study strategy.`;
    } else if (path.includes('/concepts')) {
      return `${baseGreeting} Welcome to the concepts section, your interactive learning hub. I've curated personalized concept cards based on your learning style and recent performance. Explore each concept through multiple learning modalities for deeper understanding.`;
    } else if (path.includes('/study-plan')) {
      return `${baseGreeting} Your customized study plan is ready! I've optimized your schedule to balance different subjects and maximize your exam readiness. Each study session is designed to adapt to your learning pace and preferences.`;
    } else if (path.includes('/feel-good')) {
      return `${baseGreeting} Welcome to the Feel-Good Corner. This is your space to recharge and rejuvenate. I've selected motivational content and stress-relief activities specifically for you to maintain peak mental performance.`;
    } else if (path.includes('/settings')) {
      return `${baseGreeting} In settings, you can personalize your PREPZR experience. Adjust your learning preferences, notification settings, and voice assistant options to create your ideal learning environment.`;
    } else if (path.includes('/exams')) {
      return `${baseGreeting} In the exam section, you'll find realistic practice tests designed to boost your confidence and exam readiness. Each question targets specific concepts and provides detailed feedback to accelerate your learning.`;
    }
    
    // Default dashboard message with UN sustainability goal mention
    return `${baseGreeting} Your personalized dashboard is fully loaded with adaptive learning resources designed for your unique learning style. My AI-driven recommendations support UN Sustainability Goal 4 for quality education by making learning more accessible and effective. Use the microphone button anytime you need assistance with your studies.`;
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
          utteranceRef.current.rate = 0.98; // Slightly slower for clarity
          utteranceRef.current.pitch = 1.05; // Slightly higher for a more vibrant tone
          utteranceRef.current.volume = 0.9;
          
          // Get available voices
          const voices = window.speechSynthesis.getVoices();
          
          // Try to find a clear, confident voice
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
