
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface SpeechRecognitionButtonProps {
  onCommand?: (command: string, confidence: number) => void;
  context?: string;
  className?: string;
}

const SpeechRecognitionButton: React.FC<SpeechRecognitionButtonProps> = ({
  onCommand,
  context = 'general',
  className = ''
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setTranscript('');
      };
      
      recognitionRef.current.onresult = (event: any) => {
        const last = event.results.length - 1;
        const result = event.results[last];
        
        if (result.isFinal) {
          const finalTranscript = result[0].transcript.trim();
          const finalConfidence = result[0].confidence;
          
          setTranscript(finalTranscript);
          setConfidence(finalConfidence);
          
          if (onCommand) {
            onCommand(finalTranscript, finalConfidence);
          }
          
          // Auto-stop after processing
          setTimeout(() => {
            setIsListening(false);
            setTranscript('');
          }, 2000);
        } else {
          setTranscript(result[0].transcript);
        }
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
  }, [onCommand, toast]);

  const handleClick = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        toast({
          title: "Could not start voice recognition",
          description: "Please try again or check your microphone permissions.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        onClick={handleClick}
        variant="outline"
        size="icon"
        className={`relative transition-all duration-300 ${
          isListening 
            ? 'bg-orange-500 text-white border-orange-500 animate-pulse shadow-lg shadow-orange-200' 
            : 'bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100'
        }`}
      >
        {isListening ? (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Mic className="h-4 w-4" />
          </motion.div>
        ) : (
          <Mic className="h-4 w-4" />
        )}
        
        {isListening && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </Button>

      {/* Real-time transcript feedback */}
      <AnimatePresence>
        {transcript && isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 shadow-lg min-w-48 max-w-64"
          >
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Listening...</p>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 break-words">
              {transcript}
            </p>
            {confidence > 0 && (
              <div className="mt-1 flex items-center gap-1">
                <div className="text-xs text-gray-500">Confidence:</div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-1">
                  <div 
                    className="bg-orange-500 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${confidence * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{Math.round(confidence * 100)}%</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpeechRecognitionButton;
