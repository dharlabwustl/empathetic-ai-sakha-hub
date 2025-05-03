
import { useState, useCallback, useEffect } from 'react';
import { getVoiceSettings, saveVoiceSettings, speakMessage } from './voiceUtils';
import type { VoiceSettings } from './voiceUtils';

// React hook for voice announcer
export const useVoiceAnnouncer = () => {
  const [settings, setSettings] = useState<VoiceSettings>(getVoiceSettings);
  
  // Update settings locally and in storage
  const updateSettings = useCallback((newSettings: Partial<VoiceSettings>) => {
    setSettings(current => {
      const updated = { ...current, ...newSettings };
      saveVoiceSettings(updated);
      return updated;
    });
  }, []);
  
  // Initialize voices when component mounts
  useEffect(() => {
    // Load voices
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    
    loadVoices();
    
    // Some browsers need this event to get voices
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);
  
  // Speak with current settings
  const speak = useCallback((message: string, force: boolean = false) => {
    speakMessage(message, force);
  }, []);
  
  // Test the current voice settings with a pleasant, energetic Indian voice message
  const testVoice = useCallback(() => {
    speak("Namaste! I'm your friendly study companion with a pleasant Indian female voice. I'm here to make your learning journey joyful and successful!", true);
  }, [speak]);
  
  return {
    settings,
    updateSettings,
    speak,
    testVoice,
    getAvailableVoices: () => window.speechSynthesis.getVoices(),
  };
};
