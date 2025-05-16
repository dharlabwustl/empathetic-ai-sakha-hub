
import React, { useEffect, useRef } from 'react';

interface VoiceGreetingProps {
  isFirstTimeUser: boolean;
  userName: string;
  language?: string;
}

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({
  isFirstTimeUser,
  userName,
  language = 'en'
}) => {
  const hasSpokenRef = useRef(false);

  useEffect(() => {
    // Only speak if speech synthesis is available and we haven't spoken yet
    if ('speechSynthesis' in window && !hasSpokenRef.current) {
      // Short delay to ensure page has loaded
      const timer = setTimeout(() => {
        speakWelcome();
        hasSpokenRef.current = true;
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isFirstTimeUser, userName]);

  const speakWelcome = () => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create welcome message
    const welcomeText = isFirstTimeUser
      ? `Welcome to PREPZR, ${userName}! I'm your voice assistant. I'll guide you through your personalized dashboard. Click the voice assistant icon anytime you need help.`
      : `Welcome back ${userName}! It's good to see you again. Your dashboard is ready.`;
    
    // Create utterance object
    const utterance = new SpeechSynthesisUtterance(welcomeText);
    
    // Set properties for Indian English voice
    utterance.lang = language === 'en' ? 'en-IN' : language;
    utterance.rate = 0.9;  // Slightly slower for clearer pronunciation
    utterance.pitch = 1.1; // Slightly higher pitch for female voice
    utterance.volume = 0.8;
    
    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    
    // Try to find an Indian voice
    const preferredVoiceNames = [
      'Google हिन्दी', 'Microsoft Kalpana', 'Microsoft Kajal', 'Google English India'
    ];
    
    // Look for preferred voices first
    let selectedVoice = null;
    for (const name of preferredVoiceNames) {
      const voice = voices.find(v => v.name.includes(name));
      if (voice) {
        selectedVoice = voice;
        break;
      }
    }
    
    // If no preferred voice found, try to find any Indian voice
    if (!selectedVoice) {
      selectedVoice = voices.find(v => 
        v.lang === 'en-IN' || 
        v.lang === 'hi-IN' || 
        v.lang.includes('en') || 
        v.lang.includes('hi')
      );
    }
    
    // If found, use the selected voice
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    // Speak the greeting
    window.speechSynthesis.speak(utterance);
  };

  // This component doesn't render anything visually
  return null;
};

export default VoiceGreeting;
