
import React, { createContext, useContext } from 'react';
import { useVoiceAnnouncer } from './useVoiceAnnouncer';

// Re-export all utilities from their respective files
export { 
  getVoiceSettings, 
  saveVoiceSettings, 
  speakMessage, 
  getGreeting,
  getTaskAnnouncement,
  getReminderAnnouncement,
  type VoiceSettings, 
  defaultVoiceSettings 
} from './voiceUtils';

// Re-export all message generators
export {
  getIdleTimeResponse,
  getFirstTimeUserGuidance,
  getDailyProgressUpdate,
  getSubjectProgressUpdate
} from './messageGenerators';

// Voice announcer context
const VoiceAnnouncerContext = createContext<ReturnType<typeof useVoiceAnnouncer> | undefined>(undefined);

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
