
import { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { VoiceSettings } from '@/types/voice';

interface UseVoiceAnnouncerProps {
  userName?: string;
  language?: string;
  autoInit?: boolean;
}

const useVoiceAnnouncer = ({
  userName = '',
  language = 'en-IN',
  autoInit = true
}: UseVoiceAnnouncerProps = {}) => {
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    volume: 0.8,
    rate: 0.9,
    pitch: 1.1,
    language: language,
    enabled: true,
    muted: false,
    voice: null,
    autoGreet: true
  });
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isVoiceSupported, setIsVoiceSupported] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [voiceInitialized, setVoiceInitialized] = useState<boolean>(false);
  
  const recognitionRef = useRef<any>(null);
  const speakingRef = useRef<boolean>(false);
  
  // Initialize voice support
  useEffect(() => {
    const hasSpeechSupport = 'speechSynthesis' in window;
    setIsVoiceSupported(hasSpeechSupport);
    
    if (hasSpeechSupport && autoInit) {
      initializeVoices();
    }
    
    // Initialize speech recognition if available
    if (('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) && autoInit) {
      initializeSpeechRecognition();
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [autoInit]);
  
  const initializeVoices = useCallback(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices);
        
        // Try to find an Indian voice or female voice as default
        const preferredVoiceNames = [
          'Google हिन्दी',
          'Microsoft Kalpana',
          'Microsoft Kajal',
          'Google English India',
          'Samantha',
          'Karen',
          'Veena',
          'Tessa'
        ];
        
        let selectedVoice = null;
        
        // First, try to get a specific preferred voice
        for (const name of preferredVoiceNames) {
          const voice = voices.find(v => v.name.includes(name));
          if (voice) {
            selectedVoice = voice;
            break;
          }
        }
        
        // If no preferred voice, try to get an Indian English voice
        if (!selectedVoice) {
          selectedVoice = voices.find(v => v.lang === 'en-IN' || v.lang === 'hi-IN');
        }
        
        // If still no voice, try to get any female voice
        if (!selectedVoice) {
          selectedVoice = voices.find(v => v.name.includes('female') || v.name.includes('woman'));
        }
        
        // If still no voice, use the first English voice
        if (!selectedVoice) {
          selectedVoice = voices.find(v => v.lang.startsWith('en'));
        }
        
        // Last resort - just use the first voice
        if (!selectedVoice && voices.length > 0) {
          selectedVoice = voices[0];
        }
        
        if (selectedVoice) {
          setVoiceSettings(prev => ({...prev, voice: selectedVoice}));
          console.log("Voice selected:", selectedVoice.name);
        }
        
        setVoiceInitialized(true);
      }
    };
    
    // Load voices immediately in case they're already available
    loadVoices();
    
    // Setup event for async voice loading
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);
  
  const initializeSpeechRecognition = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = voiceSettings.language;
    
    recognitionRef.current.onstart = () => {
      setIsListening(true);
    };
    
    recognitionRef.current.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map(result => result.transcript)
        .join('');
      
      setTranscript(transcript);
    };
    
    recognitionRef.current.onend = () => {
      setIsListening(false);
    };
    
    recognitionRef.current.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      if (event.error === 'not-allowed') {
        toast({
          title: "Microphone Access Denied",
          description: "Please allow microphone access to use voice commands",
          variant: "destructive"
        });
      }
    };
  }, [voiceSettings.language]);
  
  const speakMessage = useCallback((text: string) => {
    if (!isVoiceSupported || !voiceSettings.enabled || voiceSettings.muted) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (voiceSettings.voice) {
      utterance.voice = voiceSettings.voice;
    }
    
    utterance.lang = voiceSettings.language;
    utterance.volume = voiceSettings.volume;
    utterance.rate = voiceSettings.rate;
    utterance.pitch = voiceSettings.pitch;
    
    utterance.onstart = () => {
      setIsSpeaking(true);
      speakingRef.current = true;
      
      document.dispatchEvent(new CustomEvent('voice-speaking-started', {
        detail: { message: text }
      }));
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      speakingRef.current = false;
      
      document.dispatchEvent(new Event('voice-speaking-ended'));
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
      speakingRef.current = false;
    };
    
    window.speechSynthesis.speak(utterance);
  }, [isVoiceSupported, voiceSettings]);
  
  const updateVoiceSettings = useCallback((newSettings: Partial<VoiceSettings>) => {
    setVoiceSettings(prev => ({...prev, ...newSettings}));
    
    // Save settings to localStorage for persistence
    try {
      localStorage.setItem('voice_settings', JSON.stringify({
        ...voiceSettings,
        ...newSettings,
        voice: null // Can't stringify the voice object
      }));
    } catch (err) {
      console.error('Error saving voice settings:', err);
    }
  }, [voiceSettings]);
  
  const toggleVoiceEnabled = useCallback(() => {
    const newEnabled = !voiceSettings.enabled;
    updateVoiceSettings({ enabled: newEnabled });
    
    toast({
      title: newEnabled ? "Voice Assistant Enabled" : "Voice Assistant Disabled",
      description: newEnabled
        ? "Voice assistance is now active."
        : "Voice assistance is now inactive.",
    });
    
    if (!newEnabled && isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [voiceSettings.enabled, isSpeaking, updateVoiceSettings]);
  
  const toggleMute = useCallback(() => {
    const newMuted = !voiceSettings.muted;
    updateVoiceSettings({ muted: newMuted });
    
    toast({
      title: newMuted ? "Voice Output Muted" : "Voice Output Unmuted",
      description: newMuted
        ? "I won't speak out loud anymore."
        : "I'll speak responses out loud again.",
    });
    
    if (newMuted && isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [voiceSettings.muted, isSpeaking, updateVoiceSettings]);
  
  const startListening = useCallback(() => {
    if (!recognitionRef.current || isListening) return;
    
    try {
      recognitionRef.current.start();
      setTranscript('');
    } catch (err) {
      console.error('Error starting speech recognition:', err);
    }
  }, [isListening]);
  
  const stopListening = useCallback(() => {
    if (!recognitionRef.current || !isListening) return;
    
    try {
      recognitionRef.current.stop();
    } catch (err) {
      console.error('Error stopping speech recognition:', err);
    }
  }, [isListening]);
  
  const changeVoice = useCallback((voice: SpeechSynthesisVoice) => {
    updateVoiceSettings({ voice });
    
    toast({
      title: "Voice Changed",
      description: `Now using ${voice.name}`,
    });
  }, [updateVoiceSettings]);
  
  const testVoice = useCallback(() => {
    const greetingText = userName
      ? `Hello ${userName}, this is how I will sound when speaking to you.`
      : "Hello, this is how I will sound when speaking to you.";
      
    speakMessage(greetingText);
  }, [speakMessage, userName]);

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('voice_settings');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        // Don't override the voice object from localStorage
        const { voice, ...rest } = parsedSettings;
        setVoiceSettings(prev => ({...prev, ...rest}));
      }
    } catch (err) {
      console.error('Error loading voice settings:', err);
    }
  }, []);

  return {
    voiceSettings,
    updateVoiceSettings,
    toggleVoiceEnabled,
    toggleMute,
    speakMessage,
    availableVoices,
    isVoiceSupported,
    isSpeaking,
    isListening,
    startListening,
    stopListening,
    transcript,
    setTranscript,
    changeVoice,
    testVoice,
    voiceInitialized
  };
};

export default useVoiceAnnouncer;
