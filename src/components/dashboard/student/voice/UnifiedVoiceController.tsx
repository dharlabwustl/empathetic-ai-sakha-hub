
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface UnifiedVoiceControllerProps {
  userName?: string;
  language?: string;
}

const UnifiedVoiceController: React.FC<UnifiedVoiceControllerProps> = ({
  userName = 'Student',
  language = 'en-US'
}) => {
  const location = useLocation();
  const currentSpeechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isActiveRef = useRef(false);

  // Stop any ongoing speech when route changes
  useEffect(() => {
    if (window.speechSynthesis && currentSpeechRef.current) {
      window.speechSynthesis.cancel();
      currentSpeechRef.current = null;
      isActiveRef.current = false;
    }
  }, [location.pathname]);

  // Global speech function that ensures only one voice speaks at a time
  useEffect(() => {
    const handleGlobalSpeak = (event: CustomEvent) => {
      const { message, priority = 'normal' } = event.detail;
      
      // Stop current speech if new message has high priority or is different
      if (window.speechSynthesis && (priority === 'high' || currentSpeechRef.current)) {
        window.speechSynthesis.cancel();
        currentSpeechRef.current = null;
      }

      if (!message || isActiveRef.current) return;

      const speech = new SpeechSynthesisUtterance(message);
      speech.lang = language;
      speech.rate = 1.0;
      speech.pitch = 1.1;
      speech.volume = 0.9;

      // Get female voice preference
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.name?.toLowerCase().includes('female') ||
        voice.name?.toLowerCase().includes('zira')
      );
      
      if (femaleVoice) {
        speech.voice = femaleVoice;
      }

      speech.onstart = () => {
        isActiveRef.current = true;
        currentSpeechRef.current = speech;
      };
      
      speech.onend = () => {
        isActiveRef.current = false;
        currentSpeechRef.current = null;
      };
      
      speech.onerror = () => {
        isActiveRef.current = false;
        currentSpeechRef.current = null;
      };

      window.speechSynthesis.speak(speech);
    };

    // Listen for global speak events
    window.addEventListener('unified-voice-speak', handleGlobalSpeak as EventListener);

    return () => {
      window.removeEventListener('unified-voice-speak', handleGlobalSpeak as EventListener);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [language]);

  return null;
};

export default UnifiedVoiceController;
