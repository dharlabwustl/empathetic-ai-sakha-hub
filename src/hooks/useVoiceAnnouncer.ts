
import { useState, useCallback } from 'react';

export interface VoiceAnnouncerOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: string;
}

export const useVoiceAnnouncer = (options?: VoiceAnnouncerOptions) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const defaultOptions = {
    rate: 1,
    pitch: 1,
    volume: 1,
    lang: 'en-IN', // Default to Indian English
    ...options
  };

  const cancelSpeech = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  }, []);

  const pauseSpeech = useCallback(() => {
    if ('speechSynthesis' in window && isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isSpeaking, isPaused]);

  const resumeSpeech = useCallback(() => {
    if ('speechSynthesis' in window && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [isPaused]);

  const toggleMute = useCallback((forceState?: boolean) => {
    const newMutedState = forceState !== undefined ? forceState : !isMuted;
    
    setIsMuted(newMutedState);
    
    if (newMutedState) {
      cancelSpeech();
    }
    
    return newMutedState;
  }, [isMuted, cancelSpeech]);

  const speakMessage = useCallback((text: string, speakOptions?: VoiceAnnouncerOptions) => {
    if (!text || isMuted || !('speechSynthesis' in window)) {
      return false;
    }
    
    // Cancel any ongoing speech
    cancelSpeech();
    
    // Combine default options with any provided options
    const mergedOptions = {
      ...defaultOptions,
      ...speakOptions
    };
    
    // Create and configure the utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = mergedOptions.rate;
    utterance.pitch = mergedOptions.pitch;
    utterance.volume = mergedOptions.volume;
    utterance.lang = mergedOptions.lang;
    
    // Try to use an Indian female voice if available
    const voices = window.speechSynthesis.getVoices();
    const indianFemaleVoice = voices.find(v => 
      (v.name.includes('Indian') || v.lang === 'en-IN' || v.lang === 'hi-IN') && 
      (v.name.toLowerCase().includes('female') || v.name.includes('Kalpana') || v.name.includes('Kajal'))
    );
    
    if (indianFemaleVoice) {
      utterance.voice = indianFemaleVoice;
    }
    
    // Set event handlers
    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
      setIsPaused(false);
    };
    
    // Start speaking
    window.speechSynthesis.speak(utterance);
    return true;
  }, [isMuted, cancelSpeech, defaultOptions]);

  return {
    isSpeaking,
    isPaused,
    isMuted,
    speakMessage,
    cancelSpeech,
    pauseSpeech,
    resumeSpeech,
    toggleMute
  };
};

export default useVoiceAnnouncer;
