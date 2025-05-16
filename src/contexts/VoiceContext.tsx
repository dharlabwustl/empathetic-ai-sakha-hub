
import React, { createContext, useContext, useState, useEffect } from 'react';

interface VoiceSettings {
  enabled: boolean;
  muted: boolean;
  volume: number;
  rate: number;
  pitch: number;
  voice: SpeechSynthesisVoice | null;
  language: string;
}

interface VoiceContextType {
  voiceSettings: VoiceSettings;
  updateVoiceSettings: (newSettings: Partial<VoiceSettings>) => void;
  toggleVoiceEnabled: () => void;
  toggleMute: (force?: boolean) => void;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  isVoiceEnabled: boolean;
  availableVoices: SpeechSynthesisVoice[];
  setVoice: (voice: SpeechSynthesisVoice) => void;
  setLanguage: (language: string) => void;
  lastSpokenText: string | null;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  recognizedText: string;
  processVoiceCommand: (command: string) => void;
}

const defaultVoiceSettings: VoiceSettings = {
  enabled: true,
  muted: false,
  volume: 1.0,
  rate: 1.0,
  pitch: 1.0,
  voice: null,
  language: 'en-IN'
};

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export const VoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>(defaultVoiceSettings);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastSpokenText, setLastSpokenText] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Load saved settings
    const savedSettings = localStorage.getItem('voice_settings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setVoiceSettings(prev => ({
          ...prev,
          enabled: parsedSettings.enabled ?? true,
          muted: parsedSettings.muted ?? false,
          volume: parsedSettings.volume ?? 1.0,
          rate: parsedSettings.rate ?? 1.0,
          pitch: parsedSettings.pitch ?? 1.0,
          language: parsedSettings.language ?? 'en-IN'
        }));
      } catch (e) {
        console.error("Failed to parse saved voice settings:", e);
      }
    }

    // Initialize speech synthesis and get available voices
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);

      // Try to find an Indian English voice
      const indianVoice = voices.find(voice => 
        voice.lang.includes('en-IN') || 
        voice.name.includes('Indian') || 
        voice.name.includes('Hindi')
      );

      if (indianVoice) {
        setVoiceSettings(prev => ({ ...prev, voice: indianVoice }));
      }
    };

    if (window.speechSynthesis) {
      if (window.speechSynthesis.getVoices().length > 0) {
        loadVoices();
      }
      
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Initialize speech recognition if available
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = voiceSettings.language;
      
      recognitionInstance.onstart = () => {
        setIsListening(true);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setRecognizedText(transcript);
        processVoiceCommand(transcript);
      };
      
      setRecognition(recognitionInstance);
    }

    // Cleanup
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (recognition) {
        recognition.abort();
      }
    };
  }, []);

  // Update local storage when settings change
  useEffect(() => {
    localStorage.setItem('voice_settings', JSON.stringify({
      enabled: voiceSettings.enabled,
      muted: voiceSettings.muted,
      volume: voiceSettings.volume,
      rate: voiceSettings.rate,
      pitch: voiceSettings.pitch,
      language: voiceSettings.language
    }));
  }, [voiceSettings]);

  const updateVoiceSettings = (newSettings: Partial<VoiceSettings>) => {
    setVoiceSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  const toggleVoiceEnabled = () => {
    setVoiceSettings(prev => ({
      ...prev,
      enabled: !prev.enabled
    }));
    
    // If disabling, ensure we stop any current speech
    if (voiceSettings.enabled) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleMute = (force?: boolean) => {
    setVoiceSettings(prev => ({
      ...prev,
      muted: force !== undefined ? force : !prev.muted
    }));
    
    // If muting, ensure we stop any current speech
    if (!voiceSettings.muted || force) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    }
  };

  const speakText = (text: string) => {
    if (!voiceSettings.enabled || voiceSettings.muted || !text || !window.speechSynthesis) {
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Apply current settings
    utterance.volume = voiceSettings.volume;
    utterance.rate = voiceSettings.rate;
    utterance.pitch = voiceSettings.pitch;
    utterance.lang = voiceSettings.language;
    
    if (voiceSettings.voice) {
      utterance.voice = voiceSettings.voice;
    }
    
    utterance.onstart = () => {
      setIsSpeaking(true);
      setLastSpokenText(text);
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
    };
    
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const setVoice = (voice: SpeechSynthesisVoice) => {
    setVoiceSettings(prev => ({
      ...prev,
      voice
    }));
  };

  const setLanguage = (language: string) => {
    setVoiceSettings(prev => ({
      ...prev,
      language
    }));
    
    // Also update recognition language if active
    if (recognition) {
      recognition.lang = language;
    }
  };

  const startListening = () => {
    if (recognition && !isListening) {
      try {
        setRecognizedText('');
        recognition.start();
      } catch (error) {
        console.error("Error starting speech recognition:", error);
      }
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  const processVoiceCommand = (command: string) => {
    if (!command) return;
    
    const normalizedCommand = command.toLowerCase();
    
    // Simple command processing
    if (normalizedCommand.includes('stop') || normalizedCommand.includes('cancel')) {
      stopSpeaking();
    }
  };

  return (
    <VoiceContext.Provider value={{
      voiceSettings,
      updateVoiceSettings,
      toggleVoiceEnabled,
      toggleMute,
      speakText,
      stopSpeaking,
      isSpeaking,
      isVoiceEnabled: voiceSettings.enabled && !voiceSettings.muted,
      availableVoices,
      setVoice,
      setLanguage,
      lastSpokenText,
      isListening,
      startListening,
      stopListening,
      recognizedText,
      processVoiceCommand
    }}>
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoiceContext = () => {
  const context = useContext(VoiceContext);
  if (context === undefined) {
    throw new Error('useVoiceContext must be used within a VoiceProvider');
  }
  return context;
};
