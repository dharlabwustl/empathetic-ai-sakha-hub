
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";

interface SpeechRecognitionButtonProps {
  onCommand?: (command: string) => void;
  position?: 'homepage' | 'dashboard';
  className?: string;
}

const SpeechRecognitionButton: React.FC<SpeechRecognitionButtonProps> = ({
  onCommand,
  position = 'homepage',
  className = ''
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        setIsSupported(true);
        
        try {
          const speechRecognition = new SpeechRecognition();
          speechRecognition.continuous = false;
          speechRecognition.interimResults = true;
          speechRecognition.lang = 'en-US';
          speechRecognition.maxAlternatives = 1;

          speechRecognition.onstart = () => {
            console.log('Speech recognition started');
            setIsListening(true);
            setTranscript('');
          };

          speechRecognition.onresult = (event: any) => {
            try {
              if (event.results && event.results.length > 0) {
                const current = event.resultIndex;
                const transcriptText = event.results[current][0].transcript.trim();
                setTranscript(transcriptText);
                
                if (event.results[current].isFinal && transcriptText) {
                  console.log('Final transcript:', transcriptText);
                  onCommand?.(transcriptText);
                  processCommand(transcriptText);
                  
                  // Clear transcript after processing
                  setTimeout(() => {
                    setTranscript('');
                  }, 2000);
                }
              }
            } catch (error) {
              console.error('Error processing speech result:', error);
              handleError('Error processing speech');
            }
          };

          speechRecognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
            setTranscript('');
            
            switch (event.error) {
              case 'not-allowed':
                setHasPermission(false);
                toast({
                  title: "Microphone Permission Denied",
                  description: "Please allow microphone access to use voice commands",
                  variant: "destructive"
                });
                break;
              case 'no-speech':
                toast({
                  title: "No Speech Detected",
                  description: "Please try speaking more clearly",
                  variant: "destructive"
                });
                break;
              case 'network':
                toast({
                  title: "Network Error",
                  description: "Please check your internet connection",
                  variant: "destructive"
                });
                break;
              case 'aborted':
                // User manually stopped, don't show error
                break;
              default:
                if (event.error !== 'aborted') {
                  toast({
                    title: "Speech Recognition Error",
                    description: "Please try again",
                    variant: "destructive"
                  });
                }
            }
          };

          speechRecognition.onend = () => {
            console.log('Speech recognition ended');
            setIsListening(false);
            
            // Clear any pending timeouts
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
          };

          setRecognition(speechRecognition);
          recognitionRef.current = speechRecognition;
        } catch (error) {
          console.error('Error initializing speech recognition:', error);
          setIsSupported(false);
        }
      } else {
        setIsSupported(false);
        console.warn('Speech recognition not supported in this browser');
      }
    }

    // Cleanup function
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (error) {
          console.error('Error cleaning up speech recognition:', error);
        }
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleError = (message: string) => {
    setIsListening(false);
    setTranscript('');
    console.error('Speech recognition error:', message);
  };

  const processCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    try {
      // Basic navigation commands
      if (lowerCommand.includes('go to') || lowerCommand.includes('open') || lowerCommand.includes('show')) {
        if (lowerCommand.includes('dashboard')) {
          window.location.href = '/dashboard/student';
          return;
        }
        if (lowerCommand.includes('concepts')) {
          window.location.href = '/dashboard/student/concepts';
          return;
        }
        if (lowerCommand.includes('flashcards')) {
          window.location.href = '/dashboard/student/flashcards';
          return;
        }
        if (lowerCommand.includes('practice') || lowerCommand.includes('exam')) {
          window.location.href = '/dashboard/student/practice-exam';
          return;
        }
        if (lowerCommand.includes('home')) {
          window.location.href = '/';
          return;
        }
      }

      // Exam-specific commands
      if (lowerCommand.includes('neet') && lowerCommand.includes('prep')) {
        window.location.href = '/signup?exam=neet';
        return;
      }

      if (lowerCommand.includes('start trial') || lowerCommand.includes('sign up')) {
        window.location.href = '/signup';
        return;
      }

      // Provide feedback for recognized but unprocessed commands
      toast({
        title: "Command Recognized",
        description: `You said: "${command}". Try commands like "go to dashboard" or "open concepts"`,
      });
    } catch (error) {
      console.error('Error processing command:', error);
      handleError('Error processing command');
    }
  };

  const requestMicrophonePermission = async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Stop the stream immediately
      setHasPermission(true);
      return true;
    } catch (error) {
      console.error('Microphone permission denied:', error);
      setHasPermission(false);
      return false;
    }
  };

  const toggleListening = async () => {
    if (!isSupported) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition. Try Chrome or Edge.",
        variant: "destructive"
      });
      return;
    }

    if (!recognition) {
      toast({
        title: "Speech Recognition Not Available",
        description: "Please refresh the page and try again",
        variant: "destructive"
      });
      return;
    }

    try {
      if (isListening) {
        // Stop listening
        recognition.abort();
        setIsListening(false);
        setTranscript('');
        
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      } else {
        // Check microphone permission first
        if (hasPermission === null) {
          const permissionGranted = await requestMicrophonePermission();
          if (!permissionGranted) {
            return;
          }
        } else if (hasPermission === false) {
          toast({
            title: "Microphone Permission Required",
            description: "Please allow microphone access to use voice commands",
            variant: "destructive"
          });
          return;
        }

        // Start listening
        setTranscript('');
        recognition.start();
        
        // Set a timeout to stop listening after 10 seconds
        timeoutRef.current = setTimeout(() => {
          if (recognition && isListening) {
            recognition.stop();
          }
        }, 10000);
      }
    } catch (error) {
      console.error('Error toggling speech recognition:', error);
      setIsListening(false);
      
      // Handle specific errors
      if (error instanceof Error) {
        if (error.message.includes('already started')) {
          // Recognition is already running, try to stop it
          try {
            recognition.abort();
          } catch (abortError) {
            console.error('Error aborting recognition:', abortError);
          }
        }
      }
      
      toast({
        title: "Speech Recognition Error",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  if (!isSupported) {
    return null; // Don't render if not supported
  }

  const positionStyles = position === 'homepage' 
    ? 'fixed bottom-20 left-6 z-50' 
    : 'fixed bottom-20 left-6 z-50';

  return (
    <div className={`${positionStyles} ${className}`}>
      <div className="flex flex-col items-center space-y-2">
        {/* Transcript Display */}
        <AnimatePresence>
          {transcript && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="mb-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border max-w-xs"
            >
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                Listening...
              </div>
              <div className="text-sm font-medium">
                "{transcript}"
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Speech Recognition Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={toggleListening}
            className={`h-12 w-12 rounded-full shadow-lg transition-all duration-300 ${
              isListening
                ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 animate-pulse'
                : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600'
            } text-white border-0`}
            disabled={!isSupported}
          >
            {isListening ? (
              <MicOff className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </Button>
        </motion.div>

        {/* Status Indicator */}
        {isListening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex space-x-1"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-3 bg-red-500 rounded-full"
                animate={{
                  height: [12, 20, 12],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Label */}
        <div className="text-xs text-center text-gray-600 dark:text-gray-400 max-w-20">
          {isListening ? 'Listening...' : 'Speech'}
        </div>
      </div>
    </div>
  );
};

export default SpeechRecognitionButton;
