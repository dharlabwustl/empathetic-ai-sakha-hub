import React, { createContext, useContext } from 'react';
import { useVoiceAnnouncer } from './useVoiceAnnouncer';

// Re-export all utilities from their respective files
export { getVoiceSettings, saveVoiceSettings, speakMessage, type VoiceSettings, defaultVoiceSettings } from './voiceUtils';

// Voice announcer context
const VoiceAnnouncerContext = React.createContext<ReturnType<typeof useVoiceAnnouncer> | undefined>(undefined);

export const VoiceAnnouncerProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const voiceAnnouncer = useVoiceAnnouncer();
  
  return (
    <VoiceAnnouncerContext.Provider value={voiceAnnouncer}>
      {children}
    </VoiceAnnouncerContext.Provider>
  );
};

export const useVoiceAnnouncerContext = () => {
  const context = useContext(VoiceAnnouncerContext);
  if (!context) {
    throw new Error('useVoiceAnnouncerContext must be used within a VoiceAnnouncerProvider');
  }
  return context;
};

// Helper functions for message generation - This will keep the basic functions available even if the import fails
export const getGreeting = (name?: string) => {
  const hour = new Date().getHours();
  let greeting = "Good evening";
  
  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  }
  
  return name ? `${greeting}, ${name}!` : greeting;
};

export const getTaskAnnouncement = (count: number) => {
  if (count === 0) return "You have no tasks for today. Enjoy your free time!";
  return `You have ${count} task${count === 1 ? '' : 's'} scheduled for today.`;
};

export const getReminderAnnouncement = (subject: string, time: string) => {
  return `Reminder: You have a ${subject} session scheduled at ${time}.`;
};
