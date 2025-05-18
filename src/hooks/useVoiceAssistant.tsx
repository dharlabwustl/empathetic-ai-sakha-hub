
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface VoiceAssistantSettings {
  enabled: boolean;
  muted: boolean;
  volume: number;
  rate: number;
  pitch: number;
  voice: SpeechSynthesisVoice | null;
}

interface UseVoiceAssistantProps {
  userName?: string;
  initialSettings?: Partial<VoiceAssistantSettings>;
}

export const useVoiceAssistant = ({ userName = 'student', initialSettings = {} }: UseVoiceAssistantProps) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<VoiceAssistantSettings>({
    enabled: true,
    muted: false,
    volume: 0.8,
    rate: 1.0,
    pitch: 1.0,
    voice: null,
    ...initialSettings
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
        
        // Try to find an Indian English voice by default
        const preferredVoiceTypes = ['en-IN', 'hi-IN', 'female', 'Google', 'Microsoft'];
        
        // Find best matching voice
        let selectedVoice: SpeechSynthesisVoice | null = null;
        
        for (const preferredType of preferredVoiceTypes) {
          const foundVoice = voices.find(voice => 
            voice.lang?.includes(preferredType) || 
            voice.name?.includes(preferredType)
          );
          
          if (foundVoice) {
            selectedVoice = foundVoice;
            break;
          }
        }
        
        // If no preferred voice is found, use the first available voice
        if (!selectedVoice && voices.length > 0) {
          selectedVoice = voices[0];
        }
        
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
  }, []);
  
  // Function to speak text
  const speakText = (text: string) => {
    if (!settings.enabled || settings.muted || !('speechSynthesis' in window)) {
      return;
    }
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Apply voice settings
    if (settings.voice) {
      utterance.voice = settings.voice;
    }
    
    utterance.volume = settings.volume;
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    
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
  const updateSettings = (newSettings: Partial<VoiceAssistantSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
    
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
