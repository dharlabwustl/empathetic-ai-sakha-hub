import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Mic, MicOff, Volume2, VolumeX, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { MoodType } from '@/types/user/base';

interface DashboardVoiceAssistantProps {
  userName?: string;
  language?: string;
  userMood?: MoodType;
}

const DashboardVoiceAssistant: React.FC<DashboardVoiceAssistantProps> = ({
  userName = 'Student',
  language = 'en-US',
  userMood
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState<Array<{id: string, text: string, sender: 'user' | 'assistant'}>>([]);
  const recognitionRef = useRef<any>(null);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language;

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event: any) => {
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

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.warn('Speech Recognition API not supported in this browser.');
    }

    if ('speechSynthesis' in window) {
      speechSynthesisRef.current = window.speechSynthesis;
    } else {
      console.warn('Speech Synthesis API not supported in this browser.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
      }
    };
  }, [language]);

  useEffect(() => {
    if (transcript) {
      const userMessage = { id: Date.now().toString(), text: transcript, sender: 'user' }
      setMessages(prevMessages => [...prevMessages, userMessage]);
      processCommand(transcript);
      setTranscript('');
    }
  }, [transcript]);

  const processCommand = (command: string) => {
    let response = '';
    if (command.toLowerCase().includes('hello')) {
      response = `Hello ${userName}! How can I assist you today?`;
    } else if (command.toLowerCase().includes('how are you')) {
      response = `I'm doing great, thank you for asking! Ready to help with your studies.`;
    } else if (command.toLowerCase().includes('what is my mood')) {
      response = userMood ? `Your current mood is set to ${userMood}.` : `Your mood is not set.`;
    } else {
      response = `I'm still learning, but I heard you say: ${command}. I will forward this to the team to improve my understanding.`;
    }
    addAssistantMessage(response);
  };

  const addAssistantMessage = (text: string) => {
    const assistantMessage = { id: Date.now().toString(), text: text, sender: 'assistant' };
    setMessages(prevMessages => [...prevMessages, assistantMessage]);
    speak(text);
  };

  const speak = (text: string) => {
    if (!speechSynthesisRef.current || isMuted) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesisRef.current.speak(utterance);
  };

  const toggleListening = () => {
    if (isSpeaking) return;

    if (isListening) {
      recognitionRef.current.abort();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error("Error starting recognition:", error);
        setIsListening(false);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (speechSynthesisRef.current && isSpeaking) {
      speechSynthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4"
          >
            <Card className="w-80 max-h-96 shadow-lg border-2 border-purple-200 dark:border-purple-800">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    PREPZR AI
                    {userMood && (
                      <Badge variant="outline" className="text-xs">
                        {userMood} mode
                      </Badge>
                    )}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 max-h-48 overflow-y-auto mb-3">
                  {messages.length === 0 && (
                    <div className="text-center text-sm text-gray-500 py-4">
                      Hi {userName}! I'm PREPZR AI, your study companion. How can I help you today?
                    </div>
                  )}
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-2 rounded text-xs ${
                        message.sender === 'user'
                          ? 'bg-purple-100 dark:bg-purple-900 ml-4'
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
          className="rounded-full w-12 h-12 shadow-lg bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 border-2 border-white dark:border-gray-800"
          size="sm"
        >
          <MessageSquare className="h-5 w-5 text-white" />
        </Button>
      </motion.div>
    </div>
  );
};

export default DashboardVoiceAssistant;
