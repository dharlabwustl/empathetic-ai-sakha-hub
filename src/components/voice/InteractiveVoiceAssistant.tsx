import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

interface InteractiveVoiceAssistantProps {
  userName?: string;
  language?: string;
  onNavigationCommand?: (route: string) => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
  assistantName?: string;
}

const InteractiveVoiceAssistant: React.FC<InteractiveVoiceAssistantProps> = ({
  userName = 'Student',
  language = 'en-US',
  onNavigationCommand,
  position = 'bottom-right',
  className = '',
  assistantName = 'PREPZR AI'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState<Array<{id: string, text: string, sender: 'user' | 'assistant'}>>([]);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.log('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          setTranscript(event.results[i][0].transcript);
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript(interimTranscript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [language]);

  useEffect(() => {
    if (transcript) {
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          text: transcript,
          sender: 'user'
        }
      ]);

      // Basic command processing
      if (transcript.toLowerCase().includes('go to')) {
        const route = transcript.toLowerCase().split('go to')[1].trim();
        if (onNavigationCommand) {
          onNavigationCommand(route);
        }
      }

      // Simulate assistant response
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          {
            id: Date.now().toString(),
            text: `Okay, I heard: ${transcript}`,
            sender: 'assistant'
          }
        ]);
        speak(`Okay, I heard: ${transcript}`);
      }, 1000);
    }
  }, [transcript, userName, onNavigationCommand]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      console.log('Text-to-speech not supported in this browser.');
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'top-right':
        return 'top-6 right-6';
      case 'top-left':
        return 'top-6 left-6';
      default:
        return 'bottom-6 right-6';
    }
  };

  return (
    <div className={`fixed ${getPositionClasses()} z-40 ${className}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4"
          >
            <Card className="w-80 max-h-96 shadow-lg border-2 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-medium text-sm">{assistantName}</span>
                    {isSpeaking && (
                      <Badge variant="outline" className="text-xs">
                        Speaking...
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto mb-3">
                  {messages.length === 0 && (
                    <div className="text-center text-sm text-gray-500 py-4">
                      Hi {userName}! I'm {assistantName}. Ask me anything about your studies!
                    </div>
                  )}
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-2 rounded text-xs ${
                        message.sender === 'user'
                          ? 'bg-blue-100 dark:bg-blue-900 ml-4'
                          : 'bg-gray-100 dark:bg-gray-800 mr-4'
                      }`}
                    >
                      {message.text}
                    </div>
                  ))}
                </div>

                {transcript && (
                  <div className="mb-2 p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded text-xs">
                    Listening: {transcript}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    variant={isListening ? "destructive" : "default"}
                    size="sm"
                    onClick={toggleListening}
                    className="flex-1"
                    disabled={isSpeaking}
                  >
                    {isListening ? <MicOff className="h-3 w-3 mr-1" /> : <Mic className="h-3 w-3 mr-1" />}
                    {isListening ? 'Stop' : 'Talk'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleMute}
                    className="px-2"
                  >
                    {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-12 h-12 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-2 border-white dark:border-gray-800"
          size="sm"
        >
          <MessageSquare className="h-5 w-5 text-white" />
        </Button>
      </motion.div>
    </div>
  );

  function toggleListening() {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
      setTranscript('');
    }
  }

  function toggleMute() {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      // You might want to add some visual feedback or state
      // to indicate that the assistant is "unmuted" and ready to speak
    }
  }
};

export default InteractiveVoiceAssistant;
