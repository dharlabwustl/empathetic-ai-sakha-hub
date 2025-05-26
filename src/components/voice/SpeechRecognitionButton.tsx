
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SpeechRecognitionButtonProps {
  onCommand?: (command: string) => void;
  className?: string;
  context?: 'homepage' | 'dashboard' | 'concept';
}

const SpeechRecognitionButton: React.FC<SpeechRecognitionButtonProps> = ({
  onCommand,
  className = '',
  context = 'homepage'
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showTranscript, setShowTranscript] = useState(false);
  const { toast } = useToast();
  
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<number | null>(null);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive"
      });
      return;
    }

    try {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
        setShowTranscript(true);
        setTranscript('Listening...');
      };
      
      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcriptResult = event.results[current][0].transcript;
        setTranscript(transcriptResult);
        
        if (event.results[current].isFinal) {
          handleCommand(transcriptResult);
        }
      };
      
      recognition.onend = () => {
        setIsListening(false);
        // Hide transcript after 3 seconds
        timeoutRef.current = window.setTimeout(() => {
          setShowTranscript(false);
          setTranscript('');
        }, 3000);
      };
      
      recognition.onerror = (event) => {
        setIsListening(false);
        setShowTranscript(false);
        console.error('Speech recognition error:', event.error);
      };
      
      recognition.start();
      recognitionRef.current = recognition;
      
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      toast({
        title: "Recognition Error",
        description: "Failed to start speech recognition.",
        variant: "destructive"
      });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setShowTranscript(false);
  };

  const handleCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    
    // Context-aware command handling
    if (context === 'homepage') {
      if (lowerCommand.includes('sign up') || lowerCommand.includes('register')) {
        window.location.href = '/signup';
      } else if (lowerCommand.includes('login')) {
        window.location.href = '/login';
      } else if (lowerCommand.includes('demo')) {
        window.location.href = '/login';
      } else if (lowerCommand.includes('analyze') || lowerCommand.includes('readiness')) {
        window.dispatchEvent(new Event('open-exam-analyzer'));
      } else if (lowerCommand.includes('neet')) {
        window.location.href = '/signup?exam=neet';
      }
    } else if (context === 'dashboard') {
      if (lowerCommand.includes('concept') || lowerCommand.includes('study')) {
        window.location.href = '/dashboard/student/concepts';
      } else if (lowerCommand.includes('exam') || lowerCommand.includes('practice')) {
        window.location.href = '/dashboard/student/practice-exams';
      } else if (lowerCommand.includes('flashcard')) {
        window.location.href = '/dashboard/student/flashcards';
      }
    } else if (context === 'concept') {
      if (lowerCommand.includes('explain') || lowerCommand.includes('help')) {
        // Trigger concept explanation
        const explanation = `This concept focuses on understanding the key principles and applications. Let me know if you need specific help with any part.`;
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(explanation);
          window.speechSynthesis.speak(utterance);
        }
      }
    }
    
    if (onCommand) {
      onCommand(lowerCommand);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={isListening ? stopListening : startListening}
              className={`bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 shadow-lg ${isListening ? 'animate-pulse' : ''} ${className}`}
            >
              {isListening ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{isListening ? 'Stop listening' : 'Voice Commands'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {/* Real-time transcript display */}
      {showTranscript && transcript && (
        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-50 min-w-[200px] text-center">
          {transcript}
        </div>
      )}
    </div>
  );
};

export default SpeechRecognitionButton;
