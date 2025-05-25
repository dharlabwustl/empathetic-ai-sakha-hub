
import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

interface VoiceManagerContextType {
  speakMessage: (message: string, priority?: 'low' | 'medium' | 'high') => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  isEnabled: boolean;
  setEnabled: (enabled: boolean) => void;
  currentMessage?: string;
}

const VoiceManagerContext = createContext<VoiceManagerContextType | undefined>(undefined);

interface VoiceManagerProviderProps {
  children: React.ReactNode;
}

export const VoiceManagerProvider: React.FC<VoiceManagerProviderProps> = ({ children }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [currentMessage, setCurrentMessage] = useState<string>();
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const messageQueueRef = useRef<Array<{ message: string; priority: 'low' | 'medium' | 'high' }>>([]);

  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentMessage(undefined);
      currentUtteranceRef.current = null;
      messageQueueRef.current = [];
    }
  }, []);

  const processQueue = useCallback(() => {
    if (messageQueueRef.current.length === 0 || isSpeaking || !isEnabled) {
      return;
    }

    // Sort by priority (high -> medium -> low)
    messageQueueRef.current.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    const nextMessage = messageQueueRef.current.shift();
    if (!nextMessage) return;

    const utterance = new SpeechSynthesisUtterance();
    utterance.text = nextMessage.message.replace(/PREPZR/gi, 'PREP-zer');
    utterance.lang = 'en-IN';
    utterance.volume = 0.8;
    utterance.rate = 0.9;
    utterance.pitch = 1.1;

    // Get available voices and prefer female voice
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('female') || 
      (!voice.name.toLowerCase().includes('male') && voice.lang.includes('en'))
    );
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentMessage(nextMessage.message);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentMessage(undefined);
      currentUtteranceRef.current = null;
      // Process next message in queue
      setTimeout(processQueue, 100);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentMessage(undefined);
      currentUtteranceRef.current = null;
      setTimeout(processQueue, 100);
    };

    currentUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isSpeaking, isEnabled]);

  const speakMessage = useCallback((message: string, priority: 'low' | 'medium' | 'high' = 'medium') => {
    if (!isEnabled) return;

    // If it's a high priority message, stop current speech and clear queue
    if (priority === 'high') {
      stopSpeaking();
      messageQueueRef.current = [];
    }

    messageQueueRef.current.push({ message, priority });
    processQueue();
  }, [isEnabled, stopSpeaking, processQueue]);

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
    isEnabled,
    setEnabled,
    currentMessage
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
