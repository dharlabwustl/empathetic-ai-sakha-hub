
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

interface VoiceGreetingProps {
  isFirstTimeUser: boolean;
  userName: string;
  language?: string;
  examGoal?: string;
  todaysTasks?: string[];
  currentMood?: string;
}

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({ 
  isFirstTimeUser, 
  userName, 
  language = 'en',
  examGoal = 'your exam',
  todaysTasks = [],
  currentMood
}) => {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioElement) {
      const audio = new Audio();
      setAudioElement(audio);
    }

    // Only play greeting for first time users or if explicitly requested
    if ((isFirstTimeUser || localStorage.getItem('force_greeting') === 'true') && !hasPlayed) {
      playGreeting();
      localStorage.removeItem('force_greeting'); // Clear the force flag after playing
    }
    
    return () => {
      // Clean up audio element when component unmounts
      if (audioElement) {
        audioElement.pause();
        audioElement.src = '';
      }
    };
  }, [isFirstTimeUser, userName, audioElement]);

  const getGreetingText = () => {
    // Time-based greeting
    const hour = new Date().getHours();
    let timeGreeting = 'Hello';
    
    if (hour < 12) {
      timeGreeting = 'Good morning';
    } else if (hour < 18) {
      timeGreeting = 'Good afternoon';
    } else {
      timeGreeting = 'Good evening';
    }
    
    let greetingText = '';
    
    if (isFirstTimeUser) {
      greetingText = `${timeGreeting} ${userName}! Welcome to your personalized learning dashboard. I'm your AI study assistant, ready to help you prepare for ${examGoal}. Take a moment to explore the dashboard. You can access your study plan, concept cards, practice tests, and more. If you need any help, just ask me.`;
    } else {
      // Returning user greeting with tasks and mood
      greetingText = `${timeGreeting} ${userName}! `;
      
      // Add mood-based message if available
      if (currentMood) {
        if (currentMood.toLowerCase() === 'stressed' || currentMood.toLowerCase() === 'tired') {
          greetingText += `I notice you're feeling ${currentMood}. Remember to take breaks between study sessions. `;
        } else if (currentMood.toLowerCase() === 'motivated' || currentMood.toLowerCase() === 'focused') {
          greetingText += `Great to see you're feeling ${currentMood} today! Let's make the most of your energy. `;
        }
      }
      
      // Add tasks if available
      if (todaysTasks && todaysTasks.length > 0) {
        greetingText += `For today, you should focus on: ${todaysTasks.slice(0, 3).join(', ')}. `;
      }
      
      greetingText += `Let's make progress on your ${examGoal} preparation today!`;
    }
    
    return greetingText;
  };

  const playGreeting = async () => {
    if (!audioElement) return;
    
    try {
      // This would normally call a Text-to-Speech API
      // For now, we're just simulating it
      const greetingText = getGreetingText();
      
      // In a real implementation, this would call an API like ElevenLabs
      // audioElement.src = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
      
      // For demo purposes, we'll just show the greeting as a toast
      toast({
        title: "Voice Assistant",
        description: greetingText,
        duration: 10000, // 10 seconds
      });
      
      // Simulate voice speaking time
      setTimeout(() => {
        setHasPlayed(true);
      }, 3000);
      
      // Mark that we've played the greeting
      setHasPlayed(true);
    } catch (error) {
      console.error("Error playing greeting:", error);
    }
  };

  // This component doesn't render anything visible
  return null;
};

export default VoiceGreeting;
