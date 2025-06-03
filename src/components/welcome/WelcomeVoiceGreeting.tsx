
import React, { useEffect, useRef } from 'react';

interface WelcomeVoiceGreetingProps {
  userName: string;
  onComplete?: () => void;
}

const WelcomeVoiceGreeting: React.FC<WelcomeVoiceGreetingProps> = ({ 
  userName,
  onComplete
}) => {
  const hasSpokenRef = useRef(false);

  useEffect(() => {
    // Only speak once when component mounts
    if (hasSpokenRef.current || !userName || userName === 'Student') return;
    
    hasSpokenRef.current = true;
    
    // Delay slightly to ensure the welcome screen is rendered
    const timer = setTimeout(() => {
      speakWelcomeMessage();
    }, 1500);
    
    return () => {
      clearTimeout(timer);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [userName]);

  const speakWelcomeMessage = () => {
    if (!('speechSynthesis' in window)) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const message = `Congratulations ${userName}! Welcome to PREPZR. You've just taken the first step towards exam success. I'm excited to be part of your learning journey!`;
    
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
    
    utterance.onend = () => {
      console.log('🔊 Welcome voice greeting completed');
      if (onComplete) {
        onComplete();
      }
    };
    
    utterance.onerror = (error) => {
      console.error('🔊 Voice: Error speaking welcome message', error);
      if (onComplete) {
        onComplete();
      }
    };
    
    window.speechSynthesis.speak(utterance);
  };

  return null;
};

export default WelcomeVoiceGreeting;
