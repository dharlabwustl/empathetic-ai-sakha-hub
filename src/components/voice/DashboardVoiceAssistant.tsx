
import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { MoodType } from '@/types/user/base';

interface DashboardVoiceAssistantProps {
  userName?: string;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  isFirstTimeUser?: boolean;
}

const DashboardVoiceAssistant: React.FC<DashboardVoiceAssistantProps> = ({ 
  userName = 'Student',
  currentMood,
  onMoodChange,
  isFirstTimeUser = false
}) => {
  const [greeting, setGreeting] = useState<string>('');
  const [alreadySpoke, setAlreadySpoke] = useState<boolean>(false);
  const location = useLocation();
  const timerId = useRef<NodeJS.Timeout | null>(null);
  
  // A function to determine appropriate greeting based on pathname
  const getContextGreeting = (pathname: string): string => {
    if (isFirstTimeUser) {
      return `Welcome to your personalized dashboard, ${userName}! This is where your learning journey begins. You'll find your study plan, concepts to learn, flashcards for practice, and more. I'm your voice assistant and I'll help you navigate through the platform. Let's start by exploring your dashboard!`;
    }
    
    // Different greetings for different dashboard sections
    if (pathname.includes('/today')) {
      return `Welcome to your daily plan, ${userName}. Here you'll find a personalized schedule of concepts, flashcards, and practice tests for today. Your Exam Readiness Score is being tracked as you complete each task.`;
    } else if (pathname.includes('/concepts')) {
      return `This is your concepts section. All the subjects and topics you need to master are organized here. You can read concept cards, listen to audio explanations, and test your knowledge.`;
    } else if (pathname.includes('/flashcards')) {
      return `Welcome to the flashcards section. This is where you can review key facts and formulas using our spaced repetition system for better memory retention.`;
    } else if (pathname.includes('/practice-exam')) {
      return `In the practice exam section, you can take full and partial practice tests that simulate your actual exam experience. Detailed analytics will show your strengths and areas for improvement.`;
    } else if (pathname.includes('/analytics')) {
      return `Your analytics dashboard shows your Exam Readiness Score and other key performance indicators. Use this data to adjust your study plan and focus on areas that need improvement.`;
    } else {
      // Default greeting for main dashboard
      return `Welcome back to your dashboard, ${userName}! Your personalized study journey continues. Let me know if you need help with any of our platform features or have questions about your study plan.`;
    }
  };

  useEffect(() => {
    // Don't speak if we've already spoken on this page visit or if we're in certain paths
    if (alreadySpoke || location.pathname.includes('/settings') || location.pathname.includes('/profile')) {
      return;
    }
    
    // Clear any existing timers
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    
    // Set a delay before speaking to avoid interrupting other components
    timerId.current = setTimeout(() => {
      const newGreeting = getContextGreeting(location.pathname);
      setGreeting(newGreeting);
      
      // Only speak if we have a greeting and haven't spoken yet
      if (newGreeting && !alreadySpoke) {
        speakMessage(newGreeting);
        setAlreadySpoke(true);
        
        // Reset the spoken flag after a navigation
        setTimeout(() => {
          setAlreadySpoke(false);
        }, 60000); // Reset after 1 minute, so navigation within that time won't trigger voice again
      }
    }, 1500);
    
    // Clear timeout on unmount or route change
    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, [location.pathname, userName, isFirstTimeUser, alreadySpoke]);

  const speakMessage = (text: string) => {
    if (!text || !('speechSynthesis' in window)) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create utterance
    const correctedText = text.replace(/PREPZR/gi, 'Prep-zer');
    const utterance = new SpeechSynthesisUtterance(correctedText);
    
    // Get voices
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = null;
    
    // Try to find an Indian English voice
    const preferredVoiceNames = [
      'Google English India', 'Microsoft Kajal', 'en-IN',
      'Indian', 'India'
    ];
    
    // Try to find a preferred voice
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
    
    // If still no voice selected, try to find any female voice
    if (!selectedVoice) {
      selectedVoice = voices.find(v => 
        v.name?.toLowerCase().includes('female')
      );
    }
    
    // If still nothing, use any available voice
    if (!selectedVoice && voices.length > 0) {
      selectedVoice = voices[0];
    }
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    // Set properties
    utterance.lang = 'en-IN';
    utterance.rate = 1.0;
    utterance.pitch = 1.1; // Slightly higher for female voice
    utterance.volume = 0.8;
    
    // Speak
    window.speechSynthesis.speak(utterance);
  };

  // Invisible component
  return null;
};

export default DashboardVoiceAssistant;
