
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useVoiceAnnouncer } from './useVoiceAnnouncer';

// Re-export all utilities from their respective files
export { 
  getVoiceSettings, 
  saveVoiceSettings, 
  speakMessage, 
  getGreeting,
  type VoiceSettings, 
  defaultVoiceSettings 
} from './voiceUtils';

// Voice announcer context
const VoiceAnnouncerContext = createContext<ReturnType<typeof useVoiceAnnouncer> | undefined>(undefined);

interface VoiceAnnouncerProviderProps {
  children: React.ReactNode;
  delayInitialGreeting?: boolean;
}

export const VoiceAnnouncerProvider: React.FC<VoiceAnnouncerProviderProps> = ({ 
  children, 
  delayInitialGreeting = true 
}) => {
  const voiceAnnouncer = useVoiceAnnouncer();
  const [initialized, setInitialized] = useState(false);
  
  // Initialize voice system
  useEffect(() => {
    // Pre-load voices silently
    const silentTest = new SpeechSynthesisUtterance("");
    silentTest.volume = 0;
    silentTest.onend = () => {
      console.log("Voice system initialized");
      setInitialized(true);
    };
    silentTest.onerror = (e) => {
      console.error("Voice system initialization error:", e);
      setInitialized(true); // Set to true anyway to avoid blocking
    };
    
    try {
      window.speechSynthesis.speak(silentTest);
    } catch (err) {
      console.error("Speech synthesis error during initialization:", err);
      setInitialized(true); // Set to true anyway to avoid blocking
    }
    
    return () => {
      // Cancel any pending speech when unmounting
      try {
        window.speechSynthesis.cancel();
      } catch (err) {
        console.error("Error canceling speech:", err);
      }
    };
  }, []);
  
  return (
    <VoiceAnnouncerContext.Provider value={{
      ...voiceAnnouncer,
      initialized
    }}>
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

// Helper functions
export const getTaskAnnouncement = (count: number) => {
  if (count === 0) return "You have no tasks today. A good time to review previous topics.";
  return `You have ${count} ${count === 1 ? 'task' : 'tasks'} scheduled today. Focus on completing them for exam success.`;
};

export const getReminderAnnouncement = (subject: string, time: string) => {
  return `Reminder: ${subject} session at ${time}. Regular practice is key for exam success.`;
};

export const getExamAnnouncement = (daysLeft: number, examName: string) => {
  if (daysLeft > 30) {
    return `You have ${daysLeft} days until your ${examName}. Focus on building fundamentals.`;
  } else if (daysLeft > 7) {
    return `${daysLeft} days left for ${examName}. Increase your practice test frequency.`;
  } else {
    return `Important: Only ${daysLeft} days remaining for ${examName}. Focus on revision and mock tests.`;
  }
};
