
import { useState, useEffect, useCallback } from 'react';
import { MoodType } from '@/types/user/base';
import { VoiceSettings } from '@/types/voice';
import { useToast } from "@/hooks/use-toast";

// Default voice settings
const defaultVoiceSettings: VoiceSettings = {
  volume: 0.8,
  rate: 1.0,
  pitch: 1.0,
  language: 'en-IN',
  enabled: true,
  muted: false,
  voice: null,
  autoGreet: true
};

interface UseVoiceAnnouncerProps {
  userName?: string;
  initialSettings?: Partial<VoiceSettings>;
}

export function useVoiceAnnouncer(props?: UseVoiceAnnouncerProps) {
  const { userName, initialSettings } = props || {};
  
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    ...defaultVoiceSettings,
    ...(initialSettings || {})
  });
  const [isVoiceSupported, setIsVoiceSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const [voiceInitialized, setVoiceInitialized] = useState(false);
  const { toast } = useToast();

  // Check if speech synthesis is supported
  useEffect(() => {
    if ('speechSynthesis' in window) {
      setIsVoiceSupported(true);
      setVoiceInitialized(true);
      
      // Load voices if needed
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          setVoiceInitialized(true);
        };
      }
    } else {
      setIsVoiceSupported(false);
      console.warn("Speech synthesis not supported in this browser.");
    }
    
    // Initialize speech recognition if supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = voiceSettings.language;
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event);
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: `Error: ${event.error}`,
          variant: "destructive"
        });
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognition);
    }
    
    return () => {
      // Clean up
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      if (recognition) {
        recognition.abort();
      }
    };
  }, [voiceSettings.language]);
  
  // Update voice settings
  const updateVoiceSettings = useCallback((newSettings: Partial<VoiceSettings>) => {
    setVoiceSettings(prev => ({ ...prev, ...newSettings }));
  }, []);
  
  // Toggle voice enabled
  const toggleVoiceEnabled = useCallback(() => {
    setVoiceSettings(prev => ({ ...prev, enabled: !prev.enabled }));
  }, []);
  
  // Toggle mute
  const toggleMute = useCallback((force?: boolean) => {
    setVoiceSettings(prev => ({ 
      ...prev, 
      muted: force !== undefined ? force : !prev.muted 
    }));
    
    // If muting, stop any ongoing speech
    if (force !== false && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);
  
  // Speak a message
  const speakMessage = useCallback((text: string) => {
    if (!isVoiceSupported || !voiceSettings.enabled || voiceSettings.muted) return;
    
    // Cancel any ongoing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set properties from settings
    utterance.volume = voiceSettings.volume;
    utterance.rate = voiceSettings.rate;
    utterance.pitch = voiceSettings.pitch;
    utterance.lang = voiceSettings.language;
    
    // Try to get the stored voice
    if (voiceSettings.voice) {
      utterance.voice = voiceSettings.voice;
    } else {
      // Try to find a suitable voice
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang === voiceSettings.language);
      if (voice) {
        utterance.voice = voice;
      }
    }
    
    utterance.onstart = () => {
      setIsSpeaking(true);
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error', event);
      setIsSpeaking(false);
    };
    
    window.speechSynthesis.speak(utterance);
  }, [isVoiceSupported, voiceSettings]);
  
  // Start listening for voice commands
  const startListening = useCallback(() => {
    if (recognition) {
      try {
        recognition.start();
        setIsListening(true);
        setTranscript('');
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setIsListening(false);
      }
    }
  }, [recognition]);
  
  // Stop listening
  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition]);
  
  // Test voice functionality
  const testVoice = useCallback(() => {
    const testMessage = userName 
      ? `Hello ${userName}, this is a test of the voice system.` 
      : "Hello, this is a test of the voice system.";
      
    speakMessage(testMessage);
  }, [userName, speakMessage]);
  
  // Process voice commands
  const processVoiceCommand = useCallback((command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Process mood-related commands
    if (lowerCommand.includes('feeling')) {
      let detectedMood: MoodType | null = null;
      
      if (lowerCommand.includes('happy') || lowerCommand.includes('great')) {
        detectedMood = MoodType.HAPPY;
      } else if (lowerCommand.includes('sad') || lowerCommand.includes('unhappy')) {
        detectedMood = MoodType.SAD;
      } else if (lowerCommand.includes('anxious') || lowerCommand.includes('nervous')) {
        detectedMood = MoodType.ANXIOUS;
      } else if (lowerCommand.includes('tired') || lowerCommand.includes('exhausted')) {
        detectedMood = MoodType.TIRED;
      } else if (lowerCommand.includes('motivated') || lowerCommand.includes('energetic')) {
        detectedMood = MoodType.MOTIVATED;
      } else if (lowerCommand.includes('stressed')) {
        detectedMood = MoodType.STRESSED;
      }
      
      if (detectedMood) {
        speakMessage(`I've detected that you're feeling ${detectedMood.toLowerCase()}. I'll adjust your experience accordingly.`);
        return { type: 'mood', mood: detectedMood };
      }
    }
    
    // Process help commands
    if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      speakMessage("I can help you navigate the platform, provide information about concepts, and assist with your study plan. Just tell me what you need help with.");
      return { type: 'help' };
    }
    
    // Process navigation commands
    if (lowerCommand.includes('go to') || lowerCommand.includes('open')) {
      let destination = null;
      
      if (lowerCommand.includes('dashboard') || lowerCommand.includes('home')) {
        destination = 'dashboard';
      } else if (lowerCommand.includes('concept')) {
        destination = 'concepts';
      } else if (lowerCommand.includes('flashcard')) {
        destination = 'flashcards';
      } else if (lowerCommand.includes('exam') || lowerCommand.includes('practice')) {
        destination = 'practice-exam';
      }
      
      if (destination) {
        speakMessage(`Navigating to ${destination}`);
        return { type: 'navigation', destination };
      }
    }
    
    // Default response for unrecognized commands
    speakMessage("I'm sorry, I didn't understand that command. Try asking for help to see what I can do.");
    return { type: 'unknown', command };
  }, [speakMessage]);

  return {
    voiceSettings,
    updateVoiceSettings,
    toggleVoiceEnabled,
    toggleMute,
    isVoiceSupported,
    isSpeaking,
    isListening,
    transcript,
    startListening,
    stopListening,
    testVoice,
    voiceInitialized,
    processVoiceCommand,
    speakMessage
  };
}

export default useVoiceAnnouncer;
