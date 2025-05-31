
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface VoiceChatInterfaceProps {
  onVoiceInput: (text: string) => void;
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
  selectedFeature: string;
}

const VoiceChatInterface: React.FC<VoiceChatInterfaceProps> = ({
  onVoiceInput,
  onSendMessage,
  isProcessing,
  selectedFeature
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [micPermission, setMicPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check microphone permission
    navigator.permissions?.query({ name: 'microphone' as PermissionName })
      .then(permissionStatus => {
        setMicPermission(permissionStatus.state as any);
        permissionStatus.onchange = () => {
          setMicPermission(permissionStatus.state as any);
        };
      })
      .catch(() => setMicPermission('prompt'));

    // Initialize speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';
        
        recognitionRef.current.onresult = (event) => {
          let finalTranscript = '';
          let interimTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcriptPart = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcriptPart;
            } else {
              interimTranscript += transcriptPart;
            }
          }
          
          setTranscript(finalTranscript + interimTranscript);
          
          if (finalTranscript) {
            onVoiceInput(finalTranscript);
            onSendMessage(finalTranscript);
            setTranscript('');
          }
        };
        
        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
        
        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          toast({
            title: "Voice Recognition Error",
            description: "Failed to recognize speech. Please try again.",
            variant: "destructive"
          });
        };
      }
    }
  }, [onVoiceInput, onSendMessage, toast]);

  const handleMicClick = async () => {
    if (micPermission === 'denied') {
      toast({
        title: "Microphone Access Denied",
        description: "Please enable microphone access in your browser settings.",
        variant: "destructive"
      });
      return;
    }

    if (micPermission === 'prompt') {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicPermission('granted');
      } catch (error) {
        setMicPermission('denied');
        toast({
          title: "Microphone Access Required",
          description: "Please allow microphone access to use voice features.",
          variant: "destructive"
        });
        return;
      }
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
        toast({
          title: "Listening...",
          description: "Speak now and I'll help you learn!"
        });
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        toast({
          title: "Voice Recognition Failed",
          description: "Unable to start voice recognition. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted && isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const getFeatureColor = (feature: string) => {
    const colors = {
      'chat': 'from-blue-500 to-cyan-500',
      'search': 'from-green-500 to-emerald-500',
      'insights': 'from-yellow-500 to-orange-500',
      '3d-models': 'from-purple-500 to-violet-500',
      'interactive-visuals': 'from-pink-500 to-rose-500',
      'advanced-analysis': 'from-indigo-500 to-purple-500'
    };
    return colors[feature as keyof typeof colors] || colors['chat'];
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Voice-Powered Chat</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Click the microphone to speak with your AI tutor
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            {/* Microphone Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleMicClick}
                disabled={isProcessing}
                className={`relative overflow-hidden h-16 w-16 rounded-full ${
                  isListening 
                    ? `bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600` 
                    : `bg-gradient-to-r ${getFeatureColor(selectedFeature)} hover:opacity-90`
                }`}
              >
                {/* Pulsing animation for active listening */}
                {isListening && (
                  <motion.div
                    className="absolute inset-0 bg-red-400 rounded-full opacity-30"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                
                <motion.div
                  animate={{ 
                    scale: isListening ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ 
                    duration: 0.8, 
                    repeat: isListening ? Infinity : 0,
                    ease: "easeInOut" 
                  }}
                >
                  {isProcessing ? (
                    <Loader2 className="h-6 w-6 animate-spin text-white" />
                  ) : isListening ? (
                    <Mic className="h-6 w-6 text-white" />
                  ) : (
                    <MicOff className="h-6 w-6 text-white" />
                  )}
                </motion.div>
              </Button>
            </motion.div>

            {/* Volume Control */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleToggleMute}
                variant="outline"
                className="h-12 w-12 rounded-full"
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5 text-gray-500" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
            </motion.div>
          </div>

          {/* Voice Status */}
          <AnimatePresence>
            {(isListening || transcript) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center"
              >
                {isListening && (
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <motion.div
                      className="w-2 h-2 bg-red-500 rounded-full"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span className="text-sm font-medium text-red-600 dark:text-red-400">
                      Listening...
                    </span>
                  </div>
                )}
                
                {transcript && (
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      "{transcript}"
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Instructions */}
          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            {micPermission === 'denied' 
              ? "Microphone access denied. Please enable in browser settings."
              : isListening 
              ? "Speak clearly and I'll help you learn!"
              : "Click the microphone to start voice chat"
            }
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceChatInterface;
