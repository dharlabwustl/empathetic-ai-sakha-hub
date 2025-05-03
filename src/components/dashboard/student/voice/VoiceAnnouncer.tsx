
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
  volume: 1.0, // Loud voice by default
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
  
  // Add mood-specific additions with more energetic and calmer tone
  if (mood) {
    switch(mood) {
      case 'motivated':
        return `${timeGreeting}! I'm so excited to see your enthusiasm today! Let's make the most of your energy!`;
      case 'tired':
        return `${timeGreeting}. Don't worry about feeling tired. Let's take gentle steps together today with shorter, relaxed study sessions.`;
      case 'focused':
        return `${timeGreeting}! I'm happy to see you so focused today! Let's channel that concentration into wonderful learning!`;
      case 'anxious':
        return `${timeGreeting}. Let's take a calming breath together. I'm here to help you organize everything one step at a time.`;
      case 'stressed':
        return `${timeGreeting}. I notice you're feeling stressed. Let's work together calmly and organize your priorities to make things easier.`;
      default:
        return `${timeGreeting}! I'm so happy you're here! Ready for an amazing study session?`;
    }
  }
  
  return `${timeGreeting}! I'm so happy you're here! Ready for an amazing study session?`;
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
  
  // Priority for voice selection:
  // 1. Female Indian English voice
  // 2. Any voice with "Indian" in the name (preferring female)
  // 3. Any voice with "Hindi" in the name (preferring female)
  // 4. Any English voice (preferring female)
  const voices = window.speechSynthesis.getVoices();
  
  // First try: Find female Indian English voice
  const femaleIndianVoice = voices.find(voice => 
    (voice.lang === 'en-IN' || voice.lang.startsWith('hi-')) && 
    voice.name.toLowerCase().includes('female')
  );
  
  // Second try: Find any Indian English voice
  const indianVoice = voices.find(voice => 
    voice.lang === 'en-IN' ||
    voice.lang.startsWith('hi-')
  );
  
  // Third try: Find female voice with "Indian" in name
  const femaleVoiceWithIndian = voices.find(voice => 
    voice.name.toLowerCase().includes('indian') && 
    voice.name.toLowerCase().includes('female')
  );
  
  // Fourth try: Find any voice with "Indian" in name
  const voiceWithIndian = voices.find(voice => 
    voice.name.toLowerCase().includes('indian')
  );
  
  // Fifth try: Find female voice with "Hindi" in name
  const femaleVoiceWithHindi = voices.find(voice => 
    voice.name.toLowerCase().includes('hindi') && 
    voice.name.toLowerCase().includes('female')
  );
  
  // Sixth try: Find any voice with "Hindi" in name
  const voiceWithHindi = voices.find(voice => 
    voice.name.toLowerCase().includes('hindi')
  );
  
  // Seventh try: Find any female English voice
  const femaleEnglishVoice = voices.find(voice => 
    voice.lang.startsWith('en') && 
    voice.name.toLowerCase().includes('female')
  );
  
  // Set the appropriate voice
  if (femaleIndianVoice) {
    utterance.voice = femaleIndianVoice;
  } else if (indianVoice) {
    utterance.voice = indianVoice;
  } else if (femaleVoiceWithIndian) {
    utterance.voice = femaleVoiceWithIndian;
  } else if (voiceWithIndian) {
    utterance.voice = voiceWithIndian;
  } else if (femaleVoiceWithHindi) {
    utterance.voice = femaleVoiceWithHindi;
  } else if (voiceWithHindi) {
    utterance.voice = voiceWithHindi;
  } else if (femaleEnglishVoice) {
    utterance.voice = femaleEnglishVoice;
  } else {
    utterance.lang = settings.voice;
  }
  
  utterance.volume = settings.volume;
  utterance.rate = settings.speed;
  
  // Speak the message
  window.speechSynthesis.cancel(); // Cancel any ongoing speech
  window.speechSynthesis.speak(utterance);
};

// Generate a task announcement with more energetic and friendly tone
export const getTaskAnnouncement = (task: any): string => {
  const timeStr = task.timeEstimate ? `This will take about ${task.timeEstimate} minutes.` : '';
  
  if (task.priority === 'high') {
    return `You have an important task to complete: ${task.title}. ${timeStr} I believe you can do this wonderfully!`;
  }
  
  return `Your next exciting task is: ${task.title}. ${timeStr} I'm looking forward to seeing your progress!`;
};

// Generate a reminder announcement with a happier tone
export const getReminderAnnouncement = (event: any): string => {
  if (event.type === 'exam') {
    return `Friendly reminder: You have ${event.title} at ${event.time}. I'm sure you'll do amazingly well with your preparation!`;
  }
  
  return `You have ${event.title} scheduled for ${event.time}. I'm here to support you through it!`;
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
    speak("Hello! I'm your friendly study companion with an Indian accent. I'm here to make your learning experience joyful and energizing!", true);
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
