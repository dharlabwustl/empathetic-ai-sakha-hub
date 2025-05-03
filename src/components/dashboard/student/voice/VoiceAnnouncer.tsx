
import React, { createContext, useContext, useEffect } from 'react';
import { useVoiceAnnouncer } from './useVoiceAnnouncer';
import { getVoiceSettings, saveVoiceSettings, speakMessage } from './voiceUtils';

// Re-export utilities for easier access
export { getVoiceSettings, saveVoiceSettings, speakMessage };

// Create the context with default values
const VoiceAnnouncerContext = createContext<ReturnType<typeof useVoiceAnnouncer> | null>(null);

export const useVoiceAnnouncerContext = () => {
  const context = useContext(VoiceAnnouncerContext);
  if (!context) {
    throw new Error('useVoiceAnnouncerContext must be used within a VoiceAnnouncerProvider');
  }
  return context;
};

interface VoiceAnnouncerProviderProps {
  children: React.ReactNode;
}

export const VoiceAnnouncerProvider: React.FC<VoiceAnnouncerProviderProps> = ({ children }) => {
  const voiceAnnouncer = useVoiceAnnouncer();
  
  // Initialize voices on first load
  useEffect(() => {
    // Pre-load and initialize voices (silent)
    const testUtterance = new SpeechSynthesisUtterance("");
    testUtterance.volume = 0; // Silent test
    window.speechSynthesis.speak(testUtterance);
    
    // Check for voice settings in localStorage and apply defaults if needed
    const settings = getVoiceSettings();
    const defaultSettings = {
      enabled: true,
      voiceName: "", // Will use the best available Indian female voice
      rate: 1,
      pitch: 1.1, // Slightly higher pitch for a more feminine voice
      volume: 0.9,
      announceGreetings: true,
      announceReminders: true,
      announceTasks: true,
      inactivityPrompts: true,
      proactiveSuggestions: true,
      helpTips: true
    };
    
    const updatedSettings = { ...defaultSettings, ...settings };
    saveVoiceSettings(updatedSettings);
    
    // Reminder about voice assistant feature after a short delay
    setTimeout(() => {
      voiceAnnouncer.remindAboutVoiceIcon();
    }, 60000); // After 1 minute
    
  }, [voiceAnnouncer]);
  
  return (
    <VoiceAnnouncerContext.Provider value={voiceAnnouncer}>
      {children}
    </VoiceAnnouncerContext.Provider>
  );
};
