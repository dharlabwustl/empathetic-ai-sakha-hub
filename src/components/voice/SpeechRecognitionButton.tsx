
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpeechRecognitionButtonProps {
  position?: 'homepage' | 'dashboard';
  onCommand?: (command: string) => void;
  className?: string;
}

const SpeechRecognitionButton: React.FC<SpeechRecognitionButtonProps> = ({
  position = 'homepage',
  onCommand,
  className = ''
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onstart = () => {
        setIsListening(true);
        setShowTranscript(true);
      };
      
      recognitionInstance.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setCurrentTranscript(transcript);
        
        if (event.results[event.results.length - 1].isFinal) {
          handleCommand(transcript);
          setIsListening(false);
          setTimeout(() => {
            setShowTranscript(false);
            setCurrentTranscript('');
          }, 2000);
        }
      };
      
      recognitionInstance.onerror = () => {
        setIsListening(false);
        setShowTranscript(false);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, []);

  const speakMessage = (message: string) => {
    if (isMuted || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    setIsSpeaking(true);
    
    const speech = new SpeechSynthesisUtterance();
    speech.text = message.replace(/PREPZR/gi, 'PREP-zer');
    speech.lang = 'en-US';
    speech.rate = 0.9;
    speech.pitch = 1.0;
    speech.volume = 0.8;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.lang.includes('en') && 
      (voice.name.toLowerCase().includes('female') || !voice.name.toLowerCase().includes('male'))
    );
    
    if (preferredVoice) {
      speech.voice = preferredVoice;
    }

    speech.onend = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(speech);
  };

  const handleCommand = (command: string) => {
    if (onCommand) {
      onCommand(command);
    }
    
    // Process command based on position context
    const response = position === 'homepage' ? 
      processHomepageCommand(command) : 
      processDashboardCommand(command);
    
    speakMessage(response);
  };

  const processHomepageCommand = (command: string): string => {
    const lowerCommand = command.toLowerCase().trim();
    
    if (lowerCommand.includes('what is prepzr') || lowerCommand.includes('about')) {
      return 'PREPZR is India\'s most advanced AI-powered exam preparation platform for competitive exams like NEET and JEE.';
    }
    
    if (lowerCommand.includes('feature') || lowerCommand.includes('what can')) {
      return 'PREPZR offers personalized study plans, interactive concepts, smart flashcards, practice exams, and scholarship opportunities.';
    }
    
    if (lowerCommand.includes('free') || lowerCommand.includes('trial')) {
      return 'Yes! PREPZR offers a comprehensive free trial. Premium plans start at just 199 rupees per month.';
    }
    
    return 'Welcome to PREPZR! I can help you learn about our features, pricing, or guide you to sign up. What would you like to know?';
  };

  const processDashboardCommand = (command: string): string => {
    const lowerCommand = command.toLowerCase().trim();
    
    if (lowerCommand.includes('study plan')) {
      return 'Here\'s your personalized study plan optimized for your exam goals.';
    }
    
    if (lowerCommand.includes('today') || lowerCommand.includes('daily')) {
      return 'Let me show you today\'s optimized learning tasks and schedule.';
    }
    
    if (lowerCommand.includes('flashcard')) {
      return 'Flashcards are great for quick review and memory retention. Let\'s start your session.';
    }
    
    return 'I\'m here to help with your studies! Ask about study plans, today\'s tasks, concepts, or practice tests.';
  };

  const startListening = () => {
    if (recognition && !isListening) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence>
        {showTranscript && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-16 right-0 mb-2"
          >
            <Card className="w-64 shadow-lg border-2">
              <CardContent className="p-3">
                <div className="text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-gray-600 font-medium">Listening...</span>
                  </div>
                  <p className="text-gray-800">
                    {currentTranscript || 'Say something...'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={isListening ? stopListening : startListening}
            className={`w-12 h-12 rounded-full shadow-lg ${
              isListening 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={!recognition}
          >
            <div className="relative">
              {isListening ? (
                <MicOff className="h-5 w-5 text-white" />
              ) : (
                <Mic className="h-5 w-5 text-white" />
              )}
              {(isListening || isSpeaking) && (
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
              )}
            </div>
          </Button>
        </motion.div>

        <Button
          onClick={toggleMute}
          variant="outline"
          size="sm"
          className="w-10 h-10 rounded-full"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default SpeechRecognitionButton;
