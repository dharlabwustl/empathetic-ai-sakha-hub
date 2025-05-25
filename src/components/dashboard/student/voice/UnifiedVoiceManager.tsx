
import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

interface VoiceManagerContextType {
  speakMessage: (message: string, priority?: 'low' | 'medium' | 'high') => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  isEnabled: boolean;
  setEnabled: (enabled: boolean) => void;
  currentMessage?: string;
  voiceSettings: VoiceSettings;
  updateVoiceSettings: (settings: Partial<VoiceSettings>) => void;
}

interface VoiceSettings {
  enabled: boolean;
  muted: boolean;
  language: string;
  pitch: number;
  rate: number;
  volume: number;
  voiceType: 'female' | 'male' | 'auto';
}

const VoiceManagerContext = createContext<VoiceManagerContextType | undefined>(undefined);

interface VoiceManagerProviderProps {
  children: React.ReactNode;
}

export const VoiceManagerProvider: React.FC<VoiceManagerProviderProps> = ({ children }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    enabled: true,
    muted: false,
    language: 'en-IN',
    pitch: 1.1,
    rate: 0.9,
    volume: 0.8,
    voiceType: 'female'
  });
  const [currentMessage, setCurrentMessage] = useState<string>();
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const messageQueueRef = useRef<Array<{ message: string; priority: 'low' | 'medium' | 'high' }>>([]);
  const isProcessingRef = useRef(false);

  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentMessage(undefined);
      currentUtteranceRef.current = null;
      messageQueueRef.current = [];
      isProcessingRef.current = false;
    }
  }, []);

  const getPreferredVoice = useCallback(() => {
    const voices = window.speechSynthesis.getVoices();
    
    // Filter voices based on language preference
    const langVoices = voices.filter(voice => voice.lang.includes('en'));
    
    if (voiceSettings.voiceType === 'female') {
      return langVoices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('zira') ||
        voice.name.toLowerCase().includes('aria') ||
        (!voice.name.toLowerCase().includes('male') && voice.lang.includes('en'))
      ) || langVoices[0];
    } else if (voiceSettings.voiceType === 'male') {
      return langVoices.find(voice => 
        voice.name.toLowerCase().includes('male') ||
        voice.name.toLowerCase().includes('david') ||
        voice.name.toLowerCase().includes('mark')
      ) || langVoices[0];
    }
    
    return langVoices[0];
  }, [voiceSettings.voiceType]);

  const processQueue = useCallback(() => {
    if (messageQueueRef.current.length === 0 || isSpeaking || !voiceSettings.enabled || voiceSettings.muted || isProcessingRef.current) {
      return;
    }

    isProcessingRef.current = true;

    // Sort by priority (high -> medium -> low)
    messageQueueRef.current.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    const nextMessage = messageQueueRef.current.shift();
    if (!nextMessage) {
      isProcessingRef.current = false;
      return;
    }

    const utterance = new SpeechSynthesisUtterance();
    utterance.text = nextMessage.message.replace(/PREPZR/gi, 'PREP-zer');
    utterance.lang = voiceSettings.language;
    utterance.volume = voiceSettings.volume;
    utterance.rate = voiceSettings.rate;
    utterance.pitch = voiceSettings.pitch;

    const preferredVoice = getPreferredVoice();
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentMessage(nextMessage.message);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentMessage(undefined);
      currentUtteranceRef.current = null;
      isProcessingRef.current = false;
      // Process next message in queue after a short delay
      setTimeout(processQueue, 200);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentMessage(undefined);
      currentUtteranceRef.current = null;
      isProcessingRef.current = false;
      setTimeout(processQueue, 200);
    };

    currentUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isSpeaking, voiceSettings, getPreferredVoice]);

  const speakMessage = useCallback((message: string, priority: 'low' | 'medium' | 'high' = 'medium') => {
    if (!voiceSettings.enabled || voiceSettings.muted) return;

    // If it's a high priority message, stop current speech and clear queue
    if (priority === 'high') {
      stopSpeaking();
      messageQueueRef.current = [];
    }

    messageQueueRef.current.push({ message, priority });
    processQueue();
  }, [voiceSettings.enabled, voiceSettings.muted, stopSpeaking, processQueue]);

  const updateVoiceSettings = useCallback((newSettings: Partial<VoiceSettings>) => {
    setVoiceSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Stop speaking when component unmounts or page changes
  useEffect(() => {
    const handleBeforeUnload = () => {
      stopSpeaking();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopSpeaking();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopSpeaking();
    };
  }, [stopSpeaking]);

  const value: VoiceManagerContextType = {
    speakMessage,
    stopSpeaking,
    isSpeaking,
    isEnabled: voiceSettings.enabled,
    setEnabled: (enabled: boolean) => updateVoiceSettings({ enabled }),
    currentMessage,
    voiceSettings,
    updateVoiceSettings
  };

  return (
    <VoiceManagerContext.Provider value={value}>
      {children}
    </VoiceManagerContext.Provider>
  );
};

export const useUnifiedVoice = () => {
  const context = useContext(VoiceManagerContext);
  if (!context) {
    throw new Error('useUnifiedVoice must be used within a VoiceManagerProvider');
  }
  return context;
};
