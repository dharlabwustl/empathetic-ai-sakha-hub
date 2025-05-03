
import React, { useState, useEffect, useCallback } from 'react';
import { MoodType } from '@/types/user/base';

// Voice settings type
export interface VoiceSettings {
  enabled: boolean;
  volume: number;
  speed: number;
  voice: string;
  announceGreetings: boolean;
  announceReminders: boolean;
  announceTasks: boolean;
}

// Default voice settings
export const defaultVoiceSettings: VoiceSettings = {
  enabled: true,
  volume: 0.8,
  speed: 1.0,
  voice: 'en-IN',
  announceGreetings: true,
  announceReminders: true,
  announceTasks: true,
};

// Cache for already spoken messages to avoid repetition
let spokenMessages: Set<string> = new Set();

// Get voice settings from local storage or use defaults
export const getVoiceSettings = (): VoiceSettings => {
  const savedSettings = localStorage.getItem('voiceSettings');
  if (savedSettings) {
    try {
      return JSON.parse(savedSettings);
    } catch (e) {
      console.error('Error parsing voice settings:', e);
      return defaultVoiceSettings;
    }
  }
  return defaultVoiceSettings;
};

// Save voice settings to local storage
export const saveVoiceSettings = (settings: VoiceSettings): void => {
  localStorage.setItem('voiceSettings', JSON.stringify(settings));
};

// Helper to get greeting based on time of day and mood
export const getGreeting = (mood?: MoodType): string => {
  const hour = new Date().getHours();
  let timeGreeting = 'Hello';
  
  if (hour < 12) {
    timeGreeting = 'Good morning';
  } else if (hour < 17) {
    timeGreeting = 'Good afternoon';
  } else {
    timeGreeting = 'Good evening';
  }
  
  // Add mood-specific additions
  if (mood) {
    switch(mood) {
      case 'motivated':
        return `${timeGreeting}! You're looking energetic today! Ready to learn something new?`;
      case 'tired':
        return `${timeGreeting}. Let's take it easy today with shorter study sessions.`;
      case 'focused':
        return `${timeGreeting}! You seem focused. Let's make the most of your concentration.`;
      case 'anxious':
        return `${timeGreeting}. Take a deep breath. We'll manage your tasks together.`;
      case 'stressed':
        return `${timeGreeting}. I notice you're stressed. Let's organize your priorities.`;
      case 'confident':
        return `${timeGreeting}! Your confidence is inspiring. Let's tackle some challenges!`;
      default:
        return `${timeGreeting}! Ready for your study session?`;
    }
  }
  
  return `${timeGreeting}! Ready for your study session?`;
};

// Function to speak a message with current settings
export const speakMessage = (message: string, forceSpeak: boolean = false): void => {
  const settings = getVoiceSettings();
  
  // Return early if voice is disabled or we've already spoken this message
  if (!settings.enabled || (!forceSpeak && spokenMessages.has(message))) {
    return;
  }
  
  // Only store non-forced messages in cache
  if (!forceSpeak) {
    spokenMessages.add(message);
  }
  
  // Clear cache if it gets too big
  if (spokenMessages.size > 50) {
    spokenMessages.clear();
  }
  
  // Create and configure speech synthesis utterance
  const utterance = new SpeechSynthesisUtterance(message);
  
  // Find the Indian English voice if available
  const voices = window.speechSynthesis.getVoices();
  const indianVoice = voices.find(voice => 
    voice.lang.includes('en-IN') || 
    voice.name.includes('Indian') ||
    voice.name.includes('Hindi')
  );
  
  if (indianVoice) {
    utterance.voice = indianVoice;
  } else {
    utterance.lang = settings.voice;
  }
  
  utterance.volume = settings.volume;
  utterance.rate = settings.speed;
  
  // Speak the message
  window.speechSynthesis.cancel(); // Cancel any ongoing speech
  window.speechSynthesis.speak(utterance);
};

// Generate a task announcement
export const getTaskAnnouncement = (task: any): string => {
  const timeStr = task.timeEstimate ? `This will take about ${task.timeEstimate} minutes.` : '';
  
  if (task.priority === 'high') {
    return `You have a high priority task: ${task.title}. ${timeStr} I recommend completing this soon.`;
  }
  
  return `Your next task is: ${task.title}. ${timeStr}`;
};

// Generate a reminder announcement
export const getReminderAnnouncement = (event: any): string => {
  if (event.type === 'exam') {
    return `Reminder: You have a ${event.title} at ${event.time}. Make sure to prepare well!`;
  }
  
  return `You have ${event.title} scheduled for ${event.time}.`;
};

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
  
  // Test the current voice settings
  const testVoice = useCallback(() => {
    speak("Hello! This is a test of your voice settings. Is this working properly?", true);
  }, [speak]);
  
  return {
    settings,
    updateSettings,
    speak,
    testVoice,
    getAvailableVoices: () => window.speechSynthesis.getVoices(),
  };
};

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
  const context = React.useContext(VoiceAnnouncerContext);
  if (!context) {
    throw new Error('useVoiceAnnouncerContext must be used within a VoiceAnnouncerProvider');
  }
  return context;
};
