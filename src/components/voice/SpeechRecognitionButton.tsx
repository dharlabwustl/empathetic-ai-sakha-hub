
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface SpeechRecognitionButtonProps {
  onCommand?: (command: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  position?: 'inline' | 'floating';
  userName?: string;
}

export const SpeechRecognitionButton: React.FC<SpeechRecognitionButtonProps> = ({
  onCommand,
  className,
  size = 'md',
  position = 'inline',
  userName = 'Student'
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const { toast } = useToast();

  const recognition = React.useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognition.current = new SpeechRecognition();
      
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onstart = () => {
        setIsListening(true);
        speakResponse(`Yes ${userName}, I'm listening. How can I help you?`);
      };

      recognition.current.onresult = (event: any) => {
        const result = event.results[0][0].transcript;
        setTranscript(result);
        setIsProcessing(true);
        
        // Process the command
        setTimeout(() => {
          processVoiceCommand(result);
          setIsProcessing(false);
        }, 500);
      };

      recognition.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setIsProcessing(false);
        
        toast({
          title: "Voice Recognition Error",
          description: "Please try again or check your microphone permissions.",
          variant: "destructive"
        });
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
    };
  }, [userName]);

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Command processing logic
    if (lowerCommand.includes('dashboard') || lowerCommand.includes('home')) {
      speakResponse("Navigating to your dashboard now.");
      if (onCommand) onCommand('/dashboard/student');
    } else if (lowerCommand.includes('concept') || lowerCommand.includes('learn')) {
      speakResponse("Opening concept cards for you.");
      if (onCommand) onCommand('/dashboard/student/concepts');
    } else if (lowerCommand.includes('flashcard') || lowerCommand.includes('review')) {
      speakResponse("Let's review some flashcards!");
      if (onCommand) onCommand('/dashboard/student/flashcards');
    } else if (lowerCommand.includes('practice') || lowerCommand.includes('exam') || lowerCommand.includes('test')) {
      speakResponse("Opening practice exams. Good luck!");
      if (onCommand) onCommand('/dashboard/student/practice-exam');
    } else if (lowerCommand.includes('help') || lowerCommand.includes('assist')) {
      speakResponse("I'm here to help! You can ask me to navigate to different sections, start practice sessions, or get study recommendations.");
    } else {
      speakResponse(`I heard "${command}". I can help you navigate to concepts, flashcards, practice exams, or your dashboard. What would you like to do?`);
    }

    toast({
      title: "Voice Command Processed",
      description: `Command: "${command}"`,
    });
  };

  const startListening = () => {
    if (recognition.current) {
      setTranscript('');
      recognition.current.start();
    } else {
      toast({
        title: "Voice Recognition Not Available",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive"
      });
    }
  };

  const stopListening = () => {
    if (recognition.current) {
      recognition.current.stop();
    }
    setIsListening(false);
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'h-8 w-8';
      case 'lg': return 'h-14 w-14';
      default: return 'h-10 w-10';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm': return 'h-4 w-4';
      case 'lg': return 'h-6 w-6';
      default: return 'h-5 w-5';
    }
  };

  if (position === 'floating') {
    return (
      <motion.div
        className={cn(
          "fixed bottom-24 right-4 z-50",
          className
        )}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={isListening ? stopListening : startListening}
          disabled={isProcessing}
          className={cn(
            "rounded-full shadow-lg hover:shadow-xl transition-all duration-300",
            getSizeClasses(),
            isListening 
              ? "bg-red-500 hover:bg-red-600 animate-pulse" 
              : "bg-blue-500 hover:bg-blue-600",
            isProcessing && "bg-yellow-500"
          )}
        >
          <AnimatePresence mode="wait">
            {isProcessing ? (
              <motion.div
                key="processing"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Volume2 className={cn(getIconSize(), "animate-pulse")} />
              </motion.div>
            ) : isListening ? (
              <motion.div
                key="listening"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <MicOff className={getIconSize()} />
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Mic className={getIconSize()} />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>

        {/* Status indicator */}
        <AnimatePresence>
          {(isListening || isProcessing || transcript) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full right-0 mb-2 bg-black/80 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap"
            >
              {isProcessing 
                ? "Processing..." 
                : isListening 
                  ? "Listening..." 
                  : transcript 
                    ? `"${transcript}"` 
                    : "Tap to speak"}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <Button
      onClick={isListening ? stopListening : startListening}
      disabled={isProcessing}
      variant="outline"
      className={cn(
        "transition-all duration-300",
        getSizeClasses(),
        isListening 
          ? "border-red-500 text-red-500 hover:bg-red-50 animate-pulse" 
          : "border-blue-500 text-blue-500 hover:bg-blue-50",
        isProcessing && "border-yellow-500 text-yellow-500",
        className
      )}
    >
      <AnimatePresence mode="wait">
        {isProcessing ? (
          <motion.div
            key="processing"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Volume2 className={cn(getIconSize(), "animate-pulse")} />
          </motion.div>
        ) : isListening ? (
          <motion.div
            key="listening"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <MicOff className={getIconSize()} />
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Mic className={getIconSize()} />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
};

export default SpeechRecognitionButton;
