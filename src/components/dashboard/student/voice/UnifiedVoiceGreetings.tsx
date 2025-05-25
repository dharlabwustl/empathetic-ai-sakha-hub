
import React, { useEffect, useState } from 'react';

interface UnifiedVoiceGreetingsProps {
  userName?: string;
  isFirstTimeUser?: boolean;
  loginCount?: number;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  language?: string;
}

const UnifiedVoiceGreetings: React.FC<UnifiedVoiceGreetingsProps> = ({
  userName,
  isFirstTimeUser = false,
  loginCount = 0,
  lastActivity,
  suggestedNextAction,
  language = 'en-US'
}) => {
  const [greetingPlayed, setGreetingPlayed] = useState(false);

  const getGreetingMessage = () => {
    const name = userName || "Student";
    
    if (isFirstTimeUser || loginCount <= 1) {
      return `Congratulations ${name}! Welcome to PREPZR, your personalized exam preparation platform. I'm Sakha AI, your study companion. Let me help you understand our dashboard features: You have access to Academic Advisor for guidance, Daily Plan for structured study, Concept Cards for learning, Flashcards for revision, Practice Exams for testing, and Formula sections for quick reference. Would you like me to show you around?`;
    } else {
      let message = `Welcome back, ${name}! I'm here to help with your exam preparation. `;
      
      if (lastActivity) {
        message += `I see your last activity was ${lastActivity.description}. `;
      }
      
      if (suggestedNextAction) {
        message += `Today, I recommend: ${suggestedNextAction}. `;
      }
      
      message += `You can access your study plan, review concepts, practice with flashcards, or take mock exams. How can I assist you today?`;
      
      return message;
    }
  };

  const playGreeting = () => {
    if (greetingPlayed || !('speechSynthesis' in window)) {
      return;
    }

    try {
      const message = getGreetingMessage();
      const speech = new SpeechSynthesisUtterance(message);
      
      speech.lang = language;
      speech.rate = 0.95;
      speech.pitch = 1.1;
      speech.volume = 0.9;

      // Try to get a female voice
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') ||
        voice.name.toLowerCase().includes('zira') ||
        voice.name.toLowerCase().includes('samantha')
      );
      
      if (femaleVoice) {
        speech.voice = femaleVoice;
      }

      speech.onend = () => {
        setGreetingPlayed(true);
      };

      speech.onerror = () => {
        setGreetingPlayed(true);
      };

      window.speechSynthesis.speak(speech);
    } catch (error) {
      console.error('Error playing greeting:', error);
      setGreetingPlayed(true);
    }
  };

  useEffect(() => {
    // Play greeting after 2 seconds
    const timer = setTimeout(() => {
      playGreeting();
    }, 2000);

    return () => clearTimeout(timer);
  }, [userName, isFirstTimeUser, loginCount]);

  return null;
};

export default UnifiedVoiceGreetings;
