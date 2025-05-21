
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getPreferredAccent, DEFAULT_VOICE_SETTINGS, getBestVoiceForLanguage } from '@/components/dashboard/student/voice/voiceUtils';
import type { VoiceSettings, SupportedLanguage } from '@/components/dashboard/student/voice/voiceUtils';

interface UseVoiceAssistantProps {
  userName?: string;
  initialSettings?: Partial<VoiceSettings>;
}

export const useVoiceAssistant = ({ userName = 'student', initialSettings = {} }: UseVoiceAssistantProps) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<VoiceSettings>({
    ...DEFAULT_VOICE_SETTINGS,
    ...initialSettings,
    language: initialSettings.language || getPreferredAccent()
  });

  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  // Initialize speech synthesis and load available voices
  useEffect(() => {
    const loadVoices = () => {
      if ('speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        
        // Find best matching voice for the selected language
        const selectedVoice = getBestVoiceForLanguage(voices, settings.language);
        
        if (selectedVoice) {
          setSettings(prev => ({ ...prev, voice: selectedVoice }));
        }
      }
    };
    
    // Load voices
    loadVoices();
    
    // Chrome loads voices asynchronously
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [settings.language]);
  
  // Function to speak text
  const speakText = (text: string) => {
    if (!settings.enabled || settings.muted || !('speechSynthesis' in window)) {
      return;
    }
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Use clear syllable break for PREPZR pronunciation
    const correctedText = text
      .replace(/PREPZR/gi, 'PREP-zer')
      .replace(/prepzr/gi, 'PREP-zer')
      .replace(/Prepzr/g, 'PREP-zer');
    
    const utterance = new SpeechSynthesisUtterance(correctedText);
    
    // Apply voice settings
    if (settings.voice) {
      utterance.voice = settings.voice;
    }
    
    utterance.volume = settings.volume;
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.lang = settings.language;
    
    // Set event handlers
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    // Speak
    window.speechSynthesis.speak(utterance);
  };
  
  // Function to start listening
  const startListening = () => {
    if (!settings.enabled) {
      return;
    }
    
    setIsListening(true);
    
    // In a real implementation, this would use the Web Speech API
    // For now, we'll simulate listening with a toast
    toast({
      title: "Listening...",
      description: "Say a command like 'Open my study plan'",
    });
    
    // Simulate end of listening after 5 seconds
    setTimeout(() => {
      setIsListening(false);
      
      // Simulate recognition result
      toast({
        title: "Voice command received",
        description: "Opening your study plan...",
      });
    }, 5000);
  };
  
  // Function to stop listening
  const stopListening = () => {
    setIsListening(false);
  };
  
  // Update settings
  const updateSettings = (newSettings: Partial<VoiceSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
    
    // If language changed, we need to find a new voice
    if (newSettings.language && newSettings.language !== settings.language) {
      const newVoice = getBestVoiceForLanguage(availableVoices, newSettings.language);
      if (newVoice) {
        setSettings(prev => ({ ...prev, voice: newVoice }));
      }
      
      // Save preferred accent to localStorage
      localStorage.setItem('preferred_voice_accent', newSettings.language);
    }
    
    // If muting, stop any ongoing speech
    if (newSettings.muted && isSpeaking && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };
  
  // Toggle mute
  const toggleMute = () => {
    const newMuted = !settings.muted;
    updateSettings({ muted: newMuted });
    
    toast({
      title: newMuted ? "Voice Assistant Muted" : "Voice Assistant Unmuted",
      description: newMuted 
        ? "You won't hear voice responses anymore" 
        : "You will now hear voice responses",
    });
  };
  
  // Toggle enabled state
  const toggleEnabled = () => {
    const newEnabled = !settings.enabled;
    updateSettings({ enabled: newEnabled });
    
    toast({
      title: newEnabled ? "Voice Assistant Enabled" : "Voice Assistant Disabled",
      description: newEnabled 
        ? "Voice assistant is now active" 
        : "Voice assistant has been turned off",
    });
  };
  
  return {
    settings,
    isListening,
    isSpeaking,
    availableVoices,
    speakText,
    startListening,
    stopListening,
    updateSettings,
    toggleMute,
    toggleEnabled
  };
};

export default useVoiceAssistant;
