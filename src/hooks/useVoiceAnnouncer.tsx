
import { useState, useEffect, useCallback } from 'react';
import { SupportedLanguage } from '@/components/dashboard/student/voice/voiceUtils';

interface VoiceAnnouncerProps {
  language?: SupportedLanguage;
  autoplay?: boolean;
  rate?: number;
  pitch?: number;
  volume?: number;
}

const useVoiceAnnouncer = ({
  language = 'en-GB',
  autoplay = false,
  rate = 1.0,
  pitch = 1.0,
  volume = 0.8,
}: VoiceAnnouncerProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [voiceSettings, setVoiceSettings] = useState({
    language,
    rate,
    pitch,
    volume,
  });

  // Function to get the best available voice for the desired language
  const getBestVoice = useCallback((lang: string): SpeechSynthesisVoice | null => {
    if (!window.speechSynthesis) return null;
    
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;
    
    // First try to find a voice that exactly matches the language
    const exactMatch = voices.find(voice => voice.lang === lang);
    if (exactMatch) return exactMatch;
    
    // If no exact match, find a voice that starts with the language code
    const langMatch = voices.find(voice => voice.lang.startsWith(lang.split('-')[0]));
    if (langMatch) return langMatch;
    
    // Fallback to the first available voice
    return voices[0];
  }, []);

  // Initialize voices when the component mounts
  useEffect(() => {
    // Wait for voices to be loaded
    const handleVoicesChanged = () => {
      const bestVoice = getBestVoice(voiceSettings.language);
      if (bestVoice) {
        console.log("Voice loaded:", bestVoice.name);
      }
    };
    
    window.speechSynthesis?.addEventListener('voiceschanged', handleVoicesChanged);
    
    // Try to get voices immediately in case they're already loaded
    handleVoicesChanged();
    
    return () => {
      window.speechSynthesis?.removeEventListener('voiceschanged', handleVoicesChanged);
    };
  }, [voiceSettings.language, getBestVoice]);

  // Function to speak a message
  const speakMessage = useCallback((message: string): Promise<void> => {
    if (!window.speechSynthesis) {
      console.error("Speech synthesis not supported");
      return Promise.reject("Speech synthesis not supported");
    }
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    return new Promise((resolve, reject) => {
      try {
        const newUtterance = new SpeechSynthesisUtterance(message);
        
        // Set voice properties
        newUtterance.lang = voiceSettings.language;
        newUtterance.rate = voiceSettings.rate;
        newUtterance.pitch = voiceSettings.pitch;
        newUtterance.volume = voiceSettings.volume;
        
        // Try to set the best available voice
        const bestVoice = getBestVoice(voiceSettings.language);
        if (bestVoice) {
          newUtterance.voice = bestVoice;
        }
        
        // Set up event handlers
        newUtterance.onstart = () => setIsSpeaking(true);
        newUtterance.onend = () => {
          setIsSpeaking(false);
          resolve();
        };
        newUtterance.onerror = (event) => {
          console.error("Speech synthesis error:", event);
          setIsSpeaking(false);
          reject(event);
        };
        
        // Store the utterance in state so we can pause/resume it
        setUtterance(newUtterance);
        
        // Start speaking
        window.speechSynthesis.speak(newUtterance);
      } catch (error) {
        console.error("Error initializing speech:", error);
        reject(error);
      }
    });
  }, [getBestVoice, voiceSettings]);

  // Function to pause the current speech
  const pauseSpeech = useCallback(() => {
    if (window.speechSynthesis && isSpeaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isSpeaking]);

  // Function to resume the current speech
  const resumeSpeech = useCallback(() => {
    if (window.speechSynthesis && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [isPaused]);

  // Function to cancel the current speech
  const cancelSpeech = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  }, []);

  // Update voice settings
  const updateVoiceSettings = useCallback((settings: Partial<typeof voiceSettings>) => {
    setVoiceSettings(prev => ({
      ...prev,
      ...settings
    }));
  }, []);

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    speakMessage,
    pauseSpeech,
    resumeSpeech,
    cancelSpeech,
    updateVoiceSettings,
    isSpeaking,
    isPaused,
    voiceSettings,
  };
};

export default useVoiceAnnouncer;
