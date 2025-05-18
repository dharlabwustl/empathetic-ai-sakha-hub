
import { useState, useEffect, useCallback, useRef } from 'react';
import { VoiceSettings } from '@/types/voice';

interface UseVoiceAnnouncerProps {
  userName?: string;
  initialSettings?: Partial<VoiceSettings>;
}

export function useVoiceAnnouncer({ 
  userName = 'Student', 
  initialSettings = {}
}: UseVoiceAnnouncerProps = {}) {
  // Initialize voice settings with defaults
  const defaultSettings: VoiceSettings = {
    volume: 0.8,
    rate: 1.0,
    pitch: 1.0,
    language: 'en-US',
    enabled: true,
    muted: false,
    voice: null,
    autoGreet: true,
  };

  // Get settings from localStorage or use defaults
  const getStoredSettings = (): VoiceSettings => {
    try {
      const stored = localStorage.getItem('voice_settings');
      return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    } catch (error) {
      console.error('Error parsing voice settings:', error);
      return defaultSettings;
    }
  };

  // Combine stored settings with initialSettings
  const initialState = { ...getStoredSettings(), ...initialSettings };
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>(initialState);
  const [available, setAvailable] = useState<boolean>(false);
  const [speaking, setSpeaking] = useState<boolean>(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== "undefined" && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      setAvailable(true);

      // Get available voices
      const getVoices = () => {
        const synth = synthRef.current;
        if (synth) {
          const voices = synth.getVoices();
          setAvailableVoices(voices);

          // Set default voice based on language preference
          if (voices.length > 0 && !voiceSettings.voice) {
            const preferredVoice = voices.find(v => v.lang === voiceSettings.language) || 
                                  voices.find(v => v.lang.startsWith(voiceSettings.language.split('-')[0])) || 
                                  voices[0];
            
            setVoiceSettings(prev => ({ 
              ...prev, 
              voice: preferredVoice 
            }));
          }
        }
      };

      // Chrome requires this event to get voices
      if (synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = getVoices;
      }

      getVoices(); // For browsers that don't have the event
      
      return () => {
        if (synthRef.current && synthRef.current.speaking) {
          synthRef.current.cancel();
        }
      };
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem('voice_settings', JSON.stringify(voiceSettings));
    } catch (error) {
      console.error('Error saving voice settings:', error);
    }
  }, [voiceSettings]);

  // Update voice settings
  const updateVoiceSettings = useCallback((newSettings: Partial<VoiceSettings>) => {
    setVoiceSettings(prev => {
      const updated = { ...prev, ...newSettings };
      return updated;
    });
  }, []);

  // Speak a message using current settings
  const speakMessage = useCallback((message: string) => {
    if (!available || !voiceSettings.enabled || voiceSettings.muted || !synthRef.current) {
      console.log('Voice output is disabled or unavailable');
      return;
    }

    // Cancel any ongoing speech
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
    }

    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(message);
    utteranceRef.current = utterance;

    // Apply settings
    utterance.volume = voiceSettings.volume;
    utterance.rate = voiceSettings.rate;
    utterance.pitch = voiceSettings.pitch;
    utterance.lang = voiceSettings.language;
    
    if (voiceSettings.voice) {
      utterance.voice = voiceSettings.voice;
    }

    // Setup event handlers
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setSpeaking(false);
    };

    // Speak the message
    synthRef.current.speak(utterance);

    // Dispatch custom event that other components can listen for
    const event = new CustomEvent('voice-speaking-started', { 
      detail: { message } 
    });
    document.dispatchEvent(event);
    
    return () => {
      if (synthRef.current && synthRef.current.speaking) {
        synthRef.current.cancel();
      }
    };
  }, [available, voiceSettings]);

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setSpeaking(false);
    }
  }, []);

  return {
    available,
    speaking,
    voiceSettings,
    availableVoices,
    updateVoiceSettings,
    speakMessage,
    stopSpeaking
  };
}
