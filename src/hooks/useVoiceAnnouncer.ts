
import { useState, useEffect, useRef, useCallback } from 'react';

interface VoiceAnnouncerOptions {
  userName?: string;
  autoStart?: boolean;
  onCommand?: (command: string) => void;
}

export const useVoiceAnnouncer = ({
  userName = 'Student',
  autoStart = true,
  onCommand
}: VoiceAnnouncerOptions = {}) => {
  const [isVoiceSupported, setIsVoiceSupported] = useState(false);
  const [voiceInitialized, setVoiceInitialized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [hasSpoken, setHasSpoken] = useState(false);

  const recognitionRef = useRef<any>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const lastMessageRef = useRef<string>('');

  // Initialize voices and select a consistent female voice
  useEffect(() => {
    const loadVoices = () => {
      if ('speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        
        // Look for consistent female voices across browsers
        const femaleVoicePreferences = [
          'Google UK English Female',
          'Microsoft Zira Desktop - English (United States)',
          'Samantha',
          'Victoria',
          'Karen',
          'Moira',
          'Tessa',
          'Veena'
        ];
        
        let selectedFemaleVoice = null;
        
        // Try to find preferred female voices
        for (const voiceName of femaleVoicePreferences) {
          const voice = voices.find(v => v.name === voiceName);
          if (voice) {
            selectedFemaleVoice = voice;
            break;
          }
        }
        
        // If no preferred voice found, look for any female voice
        if (!selectedFemaleVoice) {
          selectedFemaleVoice = voices.find(voice => 
            voice.name.toLowerCase().includes('female') ||
            voice.name.toLowerCase().includes('woman') ||
            (voice.gender && voice.gender === 'female')
          );
        }
        
        // If still no female voice found, use first English voice
        if (!selectedFemaleVoice) {
          selectedFemaleVoice = voices.find(voice => voice.lang.startsWith('en'));
        }
        
        // Fallback to first available voice
        if (!selectedFemaleVoice && voices.length > 0) {
          selectedFemaleVoice = voices[0];
        }
        
        setSelectedVoice(selectedFemaleVoice);
        setIsVoiceSupported(true);
        setVoiceInitialized(true);
      }
    };

    // Load voices immediately
    loadVoices();
    
    // Also load when voices change (Chrome behavior)
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if (!isVoiceSupported || !autoStart) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
      // Auto-restart after a short delay
      setTimeout(() => {
        if (autoStart) {
          try {
            recognition.start();
          } catch (error) {
            // Ignore errors on restart
          }
        }
      }, 1000);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const results = Array.from(event.results);
      const latestResult = results[results.length - 1];
      
      if (latestResult && latestResult.isFinal) {
        const command = latestResult[0].transcript.trim();
        setTranscript(command);
        
        if (onCommand && command) {
          onCommand(command);
        }
      }
    };

    recognitionRef.current = recognition;

    if (autoStart) {
      try {
        recognition.start();
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
      }
    }

    return () => {
      if (recognition) {
        try {
          recognition.stop();
        } catch (error) {
          // Ignore cleanup errors
        }
      }
    };
  }, [isVoiceSupported, autoStart, onCommand]);

  const speakMessage = useCallback((message: string, force: boolean = false) => {
    if (!isVoiceSupported || !selectedVoice) return;
    
    // Prevent repetitive messages unless forced
    if (!force && lastMessageRef.current === message) {
      return;
    }
    
    // Store the message to prevent repetition
    lastMessageRef.current = message;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create utterance with consistent settings
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.voice = selectedVoice;
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setHasSpoken(true);
    };
    utterance.onerror = () => setIsSpeaking(false);
    
    speechUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isVoiceSupported, selectedVoice]);

  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Failed to start listening:', error);
      }
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Failed to stop listening:', error);
      }
    }
  }, [isListening]);

  return {
    isVoiceSupported,
    voiceInitialized,
    isListening,
    isSpeaking,
    transcript,
    selectedVoice,
    hasSpoken,
    speakMessage,
    stopSpeaking,
    startListening,
    stopListening
  };
};
