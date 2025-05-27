
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Volume2, VolumeX, MessageCircle, X, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface InteractiveVoiceAssistantProps {
  userName: string;
  language: string;
  onNavigationCommand?: (route: string) => void;
  position?: 'bottom-left' | 'bottom-right';
  className?: string;
  assistantName?: string;
}

const InteractiveVoiceAssistant: React.FC<InteractiveVoiceAssistantProps> = ({
  userName,
  language = 'en-US',
  onNavigationCommand,
  position = 'bottom-right',
  className = '',
  assistantName = 'PREPZR AI'
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [responses, setResponses] = useState<Array<{type: 'user' | 'assistant', text: string}>>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Check for speech recognition support
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    const speechSynthesis = window.speechSynthesis;
    
    if (SpeechRecognition && speechSynthesis) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = language;

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onresult = (event) => {
        const current = event.resultIndex;
        const transcriptResult = event.results[current][0].transcript;
        
        if (event.results[current].isFinal) {
          setTranscript(transcriptResult);
          handleVoiceCommand(transcriptResult);
          setResponses(prev => [...prev, { type: 'user', text: transcriptResult }]);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        if (event.error === 'not-allowed') {
          toast({
            title: "Microphone Access Denied",
            description: "Please allow microphone access to use voice features.",
            variant: "destructive"
          });
        }
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
      setSynthesis(speechSynthesis);
      setIsSupported(true);
    } else {
      setIsSupported(false);
      toast({
        title: "Voice Features Unavailable",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive"
      });
    }

    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, [language, toast]);

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    let response = '';

    // Navigation commands
    if (lowerCommand.includes('dashboard') || lowerCommand.includes('home')) {
      onNavigationCommand?.('/dashboard/student');
      response = 'Taking you to the dashboard.';
    } else if (lowerCommand.includes('today') || lowerCommand.includes('plan')) {
      onNavigationCommand?.('/dashboard/student/today');
      response = 'Opening today\'s study plan.';
    } else if (lowerCommand.includes('concept') || lowerCommand.includes('study')) {
      onNavigationCommand?.('/dashboard/student/concepts');
      response = 'Opening concepts section.';
    } else if (lowerCommand.includes('flashcard')) {
      onNavigationCommand?.('/dashboard/student/flashcards');
      response = 'Opening flashcards.';
    } else if (lowerCommand.includes('exam') || lowerCommand.includes('test')) {
      onNavigationCommand?.('/dashboard/student/practice-exam');
      response = 'Opening practice exams.';
    } else if (lowerCommand.includes('progress')) {
      onNavigationCommand?.('/dashboard/student/progress');
      response = 'Showing your progress.';
    } else {
      // General responses
      if (lowerCommand.includes('hello') || lowerCommand.includes('hi')) {
        response = `Hello ${userName}! I'm ${assistantName}, your AI study assistant. How can I help you today?`;
      } else if (lowerCommand.includes('help')) {
        response = 'I can help you navigate the dashboard, check your progress, or answer study-related questions. Try saying "show dashboard" or "open today\'s plan".';
      } else if (lowerCommand.includes('motivation') || lowerCommand.includes('encourage')) {
        response = 'You\'re doing great! Remember, every small step counts towards your exam success. Keep up the excellent work!';
      } else {
        response = 'I\'m here to help with your studies. Try asking me to navigate to different sections or ask for study guidance.';
      }
    }

    speakResponse(response);
    setResponses(prev => [...prev, { type: 'assistant', text: response }]);
  };

  const speakResponse = (text: string) => {
    if (synthesis && text) {
      // Cancel any ongoing speech
      synthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 0.8;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognition && !isListening) {
      try {
        recognition.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        toast({
          title: "Voice Recognition Error",
          description: "Unable to start voice recognition. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  const toggleSpeaking = () => {
    if (synthesis) {
      if (isSpeaking) {
        synthesis.cancel();
        setIsSpeaking(false);
      }
    }
  };

  const clearConversation = () => {
    setResponses([]);
    setTranscript('');
  };

  const positionClasses = {
    'bottom-left': 'bottom-6 left-6',
    'bottom-right': 'bottom-6 right-6'
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-40 ${className}`}>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4"
          >
            <Card className="w-80 max-h-96 shadow-xl border-2 border-purple-200 dark:border-purple-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-purple-700 dark:text-purple-300">
                    {assistantName}
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={clearConversation}
                      className="h-6 w-6 p-0"
                    >
                      <Settings className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsExpanded(false)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="max-h-40 overflow-y-auto space-y-2 mb-4 text-sm">
                  {responses.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">
                      Hi {userName}! I'm {assistantName}. Click the mic to start talking.
                    </p>
                  ) : (
                    responses.map((response, index) => (
                      <div
                        key={index}
                        className={`p-2 rounded-lg ${
                          response.type === 'user'
                            ? 'bg-blue-100 dark:bg-blue-900 ml-4'
                            : 'bg-purple-100 dark:bg-purple-900 mr-4'
                        }`}
                      >
                        <span className="text-xs font-medium">
                          {response.type === 'user' ? 'You' : assistantName}:
                        </span>
                        <p className="mt-1">{response.text}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={isListening ? stopListening : startListening}
                    disabled={isSpeaking}
                    className={`flex-1 ${
                      isListening 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'bg-purple-500 hover:bg-purple-600'
                    }`}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    {isListening ? 'Stop' : 'Talk'}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={toggleSpeaking}
                    disabled={!isSpeaking}
                  >
                    {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>

                {isListening && (
                  <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                    Listening... {transcript && <span className="text-blue-600">"{transcript}"</span>}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main assistant button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`rounded-full h-12 w-12 shadow-lg ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
              : isSpeaking
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-purple-500 hover:bg-purple-600'
          }`}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  );
};

export default InteractiveVoiceAssistant;
