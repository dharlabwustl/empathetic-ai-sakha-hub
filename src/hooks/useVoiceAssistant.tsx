
import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

interface VoiceAssistantSettings {
  enabled: boolean;
  muted: boolean;
  volume: number;
  rate: number;
  pitch: number;
  voice: SpeechSynthesisVoice | null;
  continuous: boolean;
  language: string;
  autoRestart: boolean;
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
    continuous: true,
    language: 'en-US',
    autoRestart: true,
    ...initialSettings
  });

  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  
  const recognitionRef = useRef<any>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const restartTimerRef = useRef<number | null>(null);
  
  // Initialize speech synthesis and load available voices
  useEffect(() => {
    const loadVoices = () => {
      if ('speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        
        // Try to find a vibrant voice by default (US English preferred)
        const preferredVoiceTypes = ['Google US English Female', 'Microsoft Zira', 'Samantha', 'en-US', 'en-GB'];
        
        // Find best matching voice
        let selectedVoice: SpeechSynthesisVoice | null = null;
        
        for (const preferredType of preferredVoiceTypes) {
          const foundVoice = voices.find(voice => 
            voice.name?.toLowerCase().includes(preferredType.toLowerCase()) || 
            voice.lang?.toLowerCase().includes(preferredType.toLowerCase())
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
    
    // Initialize speech recognition if available
    if (settings.enabled && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      initSpeechRecognition();
    }
    
    // Stop any ongoing speech and recognition when the component unmounts
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.onvoiceschanged = null;
      }
      
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.error("Error stopping recognition:", error);
        }
      }
      
      if (restartTimerRef.current) {
        clearTimeout(restartTimerRef.current);
      }
    };
  }, []);
  
  // Stop voice when page changes (listening to route changes)
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
      
      // Restart speech recognition after route change
      if (settings.enabled && settings.autoRestart) {
        restartSpeechRecognition();
      }
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [settings.enabled, settings.autoRestart]);
  
  // Function to initialize speech recognition
  const initSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error("Speech recognition not supported in this browser");
      return;
    }
    
    try {
      // Create speech recognition object
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      // Configure recognition
      recognition.continuous = settings.continuous;
      recognition.interimResults = true;
      recognition.lang = settings.language;
      
      // Event handlers
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onend = () => {
        setIsListening(false);
        
        // Restart if enabled and autoRestart is true
        if (settings.enabled && settings.autoRestart && !settings.muted) {
          restartTimerRef.current = window.setTimeout(() => {
            startListening();
          }, 1000);
        }
      };
      
      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        
        // Restart on error if enabled and autoRestart is true
        if (settings.enabled && settings.autoRestart && !settings.muted) {
          restartTimerRef.current = window.setTimeout(() => {
            startListening();
          }, 3000);
        }
      };
      
      recognition.onresult = (event: any) => {
        const last = event.results.length - 1;
        const result = event.results[last];
        
        const currentTranscript = result[0].transcript.trim();
        const currentConfidence = result[0].confidence;
        
        setTranscript(currentTranscript);
        setConfidence(currentConfidence);
        
        // Call additional handler here if needed
      };
      
      recognitionRef.current = recognition;
    } catch (error) {
      console.error("Error initializing speech recognition:", error);
    }
  };
  
  // Function to restart speech recognition
  const restartSpeechRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        // Ignore errors when stopping
      }
      
      if (restartTimerRef.current) {
        clearTimeout(restartTimerRef.current);
      }
      
      restartTimerRef.current = window.setTimeout(() => {
        if (settings.enabled && !settings.muted) {
          startListening();
        }
      }, 1000);
    }
  };
  
  // Function to speak text
  const speakText = (text: string, options?: Partial<VoiceAssistantSettings>) => {
    if (!settings.enabled || settings.muted || !('speechSynthesis' in window)) {
      return null;
    }
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Always use "PREPZR" not "PREP-zer"
    const correctedText = text
      .replace(/PREP-zer/gi, 'PREPZR')
      .replace(/Prepzr/g, 'PREPZR')
      .replace(/prepzr/gi, 'PREPZR');
    
    const utterance = new SpeechSynthesisUtterance(correctedText);
    
    // Apply voice settings, with options override
    const currentSettings = { ...settings, ...options };
    
    if (currentSettings.voice) {
      utterance.voice = currentSettings.voice;
    }
    
    utterance.volume = currentSettings.volume;
    utterance.rate = currentSettings.rate;
    utterance.pitch = currentSettings.pitch;
    utterance.lang = currentSettings.language;
    
    // Set event handlers
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    // Store reference to current utterance
    utteranceRef.current = utterance;
    
    // Speak
    window.speechSynthesis.speak(utterance);
    
    return utterance;
  };
  
  // Function to start listening
  const startListening = () => {
    if (!settings.enabled || settings.muted) {
      return;
    }
    
    if (!recognitionRef.current) {
      initSpeechRecognition();
    }
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        
        // Reinitialize and try again
        initSpeechRecognition();
        try {
          if (recognitionRef.current) {
            recognitionRef.current.start();
          }
        } catch (error) {
          console.error("Failed to restart speech recognition:", error);
        }
      }
    }
  };
  
  // Function to stop listening
  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error("Error stopping speech recognition:", error);
      }
    }
    
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
  };
  
  // Function to stop speaking
  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };
  
  // Process a voice command with a map of commands and handlers
  const processCommand = (commandMap: Record<string, () => void>, fuzzyMatching: boolean = true) => {
    if (!transcript) return false;
    
    const lowerTranscript = transcript.toLowerCase();
    
    // Try direct match first
    for (const [command, handler] of Object.entries(commandMap)) {
      if (lowerTranscript === command.toLowerCase()) {
        handler();
        return true;
      }
    }
    
    // If fuzzy matching enabled, try partial match
    if (fuzzyMatching) {
      for (const [command, handler] of Object.entries(commandMap)) {
        if (lowerTranscript.includes(command.toLowerCase())) {
          handler();
          return true;
        }
      }
    }
    
    return false;
  };
  
  // Update settings
  const updateSettings = (newSettings: Partial<VoiceAssistantSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
    
    // If muting, stop any ongoing speech and recognition
    if (newSettings.muted && (isSpeaking || isListening)) {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
      
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.error("Error stopping recognition:", error);
        }
      }
      
      if (restartTimerRef.current) {
        clearTimeout(restartTimerRef.current);
        restartTimerRef.current = null;
      }
    }
    
    // If changing from muted to unmuted, restart recognition
    if (settings.muted && newSettings.muted === false && settings.enabled) {
      restartSpeechRecognition();
    }
    
    // If changing language, reinitialize recognition
    if (newSettings.language && newSettings.language !== settings.language) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          // Ignore errors when stopping
        }
        
        recognitionRef.current = null;
        initSpeechRecognition();
        
        if (settings.enabled && !settings.muted) {
          startListening();
        }
      }
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
    
    // If unmuting and enabled, restart listening
    if (!newMuted && settings.enabled) {
      restartSpeechRecognition();
    }
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
    
    if (newEnabled && !settings.muted) {
      restartSpeechRecognition();
    } else if (!newEnabled) {
      stopListening();
      stopSpeaking();
    }
  };
  
  return {
    settings,
    isListening,
    isSpeaking,
    transcript,
    confidence,
    availableVoices,
    speakText,
    startListening,
    stopListening,
    stopSpeaking,
    processCommand,
    updateSettings,
    toggleMute,
    toggleEnabled
  };
};

export default useVoiceAssistant;
