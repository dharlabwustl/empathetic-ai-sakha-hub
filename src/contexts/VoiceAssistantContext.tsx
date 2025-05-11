
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { MoodType } from '@/types/user/base';
import { getGreeting, getStudyProgressInfo, getNextTaskInfo } from '@/components/dashboard/student/voice/voiceUtils';

interface VoiceAssistantContextType {
  isAssistantOpen: boolean;
  openAssistant: () => void;
  closeAssistant: () => void;
  toggleAssistant: () => void;
  currentMood?: MoodType;
  updateMood: (mood: MoodType) => void;
  voiceSettings: any;
  updateVoiceSettings: (settings: any) => void;
  speakMessage: (message: string, force?: boolean) => void;
  isSpeaking: boolean;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  transcript: string;
  userName?: string;
  announceDailyProgress: () => void;
  announceNextTask: () => void;
  toggleMute: (force?: boolean) => void;
}

const VoiceAssistantContext = createContext<VoiceAssistantContextType | undefined>(undefined);

export const VoiceAssistantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [currentMood, setCurrentMood] = useState<MoodType>();
  const [userName, setUserName] = useState<string>();
  
  // Initialize voice announcer
  const { 
    voiceSettings,
    updateVoiceSettings,
    speakMessage,
    isSpeaking, 
    isListening, 
    startListening, 
    stopListening,
    transcript,
    toggleMute
  } = useVoiceAnnouncer({
    userName
  });
  
  // Get user data on initial load
  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      try {
        const parsedData = JSON.parse(savedUserData);
        if (parsedData.name) {
          setUserName(parsedData.name);
        }
        if (parsedData.mood) {
          setCurrentMood(parsedData.mood);
        }
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    }
  }, []);
  
  // Assistant actions
  const openAssistant = () => setIsAssistantOpen(true);
  const closeAssistant = () => setIsAssistantOpen(false);
  const toggleAssistant = () => setIsAssistantOpen(prev => !prev);
  
  // Update mood
  const updateMood = (mood: MoodType) => {
    setCurrentMood(mood);
    
    // Update in local storage
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        parsedData.mood = mood;
        localStorage.setItem("userData", JSON.stringify(parsedData));
      } catch (err) {
        console.error("Error updating mood in localStorage:", err);
      }
    }
  };
  
  // Study information announcement functions
  const announceDailyProgress = () => {
    const progressMessage = getStudyProgressInfo(userName);
    speakMessage(progressMessage);
  };
  
  const announceNextTask = () => {
    const nextTaskMessage = getNextTaskInfo();
    speakMessage(nextTaskMessage);
  };
  
  // Context value
  const value = {
    isAssistantOpen,
    openAssistant,
    closeAssistant,
    toggleAssistant,
    currentMood,
    updateMood,
    voiceSettings,
    updateVoiceSettings,
    speakMessage,
    isSpeaking,
    isListening,
    startListening,
    stopListening,
    transcript,
    userName,
    announceDailyProgress,
    announceNextTask,
    toggleMute
  };
  
  return (
    <VoiceAssistantContext.Provider value={value}>
      {children}
    </VoiceAssistantContext.Provider>
  );
};

// Custom hook to use the context
export const useVoiceAssistant = () => {
  const context = useContext(VoiceAssistantContext);
  if (context === undefined) {
    throw new Error('useVoiceAssistant must be used within a VoiceAssistantProvider');
  }
  return context;
};
