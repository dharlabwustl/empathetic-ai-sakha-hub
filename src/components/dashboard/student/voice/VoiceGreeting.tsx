
import React, { useEffect, useRef } from 'react';

interface VoiceGreetingProps {
  isFirstTimeUser: boolean;
  userName: string;
  isReturningUser?: boolean;
  lastActivity?: string;
  pendingTasks?: string[];
}

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({ 
  isFirstTimeUser, 
  userName,
  isReturningUser = false,
  lastActivity,
  pendingTasks = []
}) => {
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    // Prevent multiple initialization
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;
    
    console.log('🔊 Voice Greeting: Initialized for', userName);
    
    // Simple voice greeting for new users after signup
    if (isFirstTimeUser && userName && userName !== 'Student') {
      setTimeout(() => {
        speakWelcomeMessage();
      }, 2000); // Wait 2 seconds before speaking
    }
    
    // Clean up speech synthesis on unmount
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [userName, isFirstTimeUser]);

  const speakWelcomeMessage = () => {
    if (!('speechSynthesis' in window)) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const message = `Congratulations ${userName}! Welcome to PREPZR. I'm here to help you succeed in your studies. Let's make your exam preparation journey amazing!`;
    
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = message;
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    utterance.lang = 'en-US';
    
    // Try to get a pleasant female voice
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('female') || 
      voice.name.toLowerCase().includes('zira') ||
      voice.name.toLowerCase().includes('samantha')
    );
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    
    utterance.onstart = () => {
      console.log('🔊 Voice: Welcome message started');
    };
    
    utterance.onend = () => {
      console.log('🔊 Voice: Welcome message completed');
    };
    
    utterance.onerror = (error) => {
      console.error('🔊 Voice: Error speaking welcome message', error);
    };
    
    window.speechSynthesis.speak(utterance);
  };

  // This component doesn't render anything visible - voice is handled internally
  return null;
};

export default VoiceGreeting;
