
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface EnhancedSpeechRecognitionProps {
  language?: string;
  continuous?: boolean;
  onCommand?: (command: string) => void;
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  className?: string;
}

const EnhancedSpeechRecognition: React.FC<EnhancedSpeechRecognitionProps> = ({
  language = 'en-US',
  continuous = false,
  onCommand,
  onSpeechStart,
  onSpeechEnd,
  className = ''
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // Check browser support
  useEffect(() => {
    const SpeechRecognition = window.webkitSpeechRecognition || (window as any).SpeechRecognition;
    setIsSupported(!!SpeechRecognition);
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = continuous;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language;
      
      recognitionRef.current.onstart = () => {
        setIsListening(true);
        if (onSpeechStart) onSpeechStart();
        console.log('🎙️ Speech recognition started');
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
        if (onSpeechEnd) onSpeechEnd();
        console.log('🎙️ Speech recognition ended');
      };
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim();
        console.log('🎙️ Speech recognized:', transcript);
        
        if (onCommand) {
          onCommand(transcript);
        }
        
        // Process common voice commands
        processVoiceCommand(transcript);
        
        // Auto-stop after getting result (for non-continuous mode)
        if (!continuous) {
          stopListening();
        }
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('🎙️ Speech recognition error:', event.error);
        setIsListening(false);
        
        if (event.error === 'not-allowed') {
          toast({
            title: "Microphone Access Denied",
            description: "Please allow microphone access to use voice commands.",
            variant: "destructive"
          });
        }
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language, continuous, onCommand, onSpeechStart, onSpeechEnd, toast]);

  const processVoiceCommand = useCallback((command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Stop any ongoing speech synthesis when user speaks
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      console.log('🔇 Speech synthesis stopped due to user voice input');
    }
    
    // Navigate to different pages based on voice commands
    if (lowerCommand.includes('study plan') || lowerCommand.includes('plan')) {
      window.location.href = '/dashboard/student/study-plan';
    } else if (lowerCommand.includes('concept') || lowerCommand.includes('concepts')) {
      window.location.href = '/dashboard/student/concepts';
    } else if (lowerCommand.includes('practice') || lowerCommand.includes('exam')) {
      window.location.href = '/dashboard/student/practice-exam';
    } else if (lowerCommand.includes('flashcard')) {
      window.location.href = '/dashboard/student/flashcards';
    } else if (lowerCommand.includes('academic') || lowerCommand.includes('advisor')) {
      window.location.href = '/dashboard/student/academic';
    } else if (lowerCommand.includes('dashboard') || lowerCommand.includes('overview')) {
      window.location.href = '/dashboard/student';
    } else if (lowerCommand.includes('stop') || lowerCommand.includes('quiet') || lowerCommand.includes('silence')) {
      // User wants to stop voice assistant
      window.dispatchEvent(new CustomEvent('disable-voice-assistant'));
    }
    
    // Dispatch custom event for other components to handle
    window.dispatchEvent(new CustomEvent('voice-command', { 
      detail: { command: command } 
    }));
  }, []);

  const startListening = useCallback(() => {
    if (!isSupported || !recognitionRef.current) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive"
      });
      return;
    }
    
    // Stop any ongoing speech synthesis first
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      console.log('🔇 Speech synthesis stopped before starting recognition');
    }
    
    try {
      recognitionRef.current.start();
      
      // Auto-stop after 10 seconds if continuous mode is off
      if (!continuous) {
        timeoutRef.current = setTimeout(() => {
          stopListening();
        }, 10000);
      }
    } catch (error) {
      console.error('🎙️ Error starting speech recognition:', error);
      toast({
        title: "Speech Recognition Error",
        description: "Failed to start speech recognition. Please try again.",
        variant: "destructive"
      });
    }
  }, [isSupported, continuous, toast]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [isListening]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // Listen for external events to stop voice assistant
  useEffect(() => {
    const handleDisableVoice = () => {
      stopListening();
    };
    
    window.addEventListener('disable-voice-assistant', handleDisableVoice);
    
    return () => {
      window.removeEventListener('disable-voice-assistant', handleDisableVoice);
    };
  }, [stopListening]);

  if (!isSupported) {
    return null;
  }

  return (
    <Button
      onClick={toggleListening}
      variant={isListening ? "destructive" : "outline"}
      size="sm"
      className={`${className} ${isListening ? 'animate-pulse' : ''}`}
    >
      {isListening ? (
        <>
          <MicOff className="h-4 w-4 mr-2" />
          Stop Listening
        </>
      ) : (
        <>
          <Mic className="h-4 w-4 mr-2" />
          Voice Command
        </>
      )}
    </Button>
  );
};

export default EnhancedSpeechRecognition;
