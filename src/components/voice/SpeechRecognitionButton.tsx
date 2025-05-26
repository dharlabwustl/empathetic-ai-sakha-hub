
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import useVoiceAssistant from '@/hooks/useVoiceAssistant';
import VoiceSettingsPanel from './VoiceSettingsPanel';

interface SpeechRecognitionButtonProps {
  userName?: string;
  onCommand?: (command: string) => void;
  onNavigationCommand?: (route: string) => void;
  position?: 'fixed' | 'relative';
  className?: string;
}

const SpeechRecognitionButton: React.FC<SpeechRecognitionButtonProps> = ({
  userName = 'Student',
  onCommand,
  onNavigationCommand,
  position = 'fixed',
  className = ''
}) => {
  const { toast } = useToast();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const {
    settings,
    isListening,
    transcript,
    availableVoices,
    startListening,
    stopListening,
    processCommand,
    updateSettings
  } = useVoiceAssistant({
    userName,
    initialSettings: {
      language: 'en-US',
      volume: 0.8,
      rate: 1.0,
      pitch: 1.0,
      enabled: true,
      muted: false
    }
  });

  const handleMicrophoneClick = () => {
    if (isListening) {
      stopListening();
      setShowTranscript(false);
    } else {
      startListening();
      setShowTranscript(true);
      toast({
        title: "Listening...",
        description: "Speak your command now. Try 'show concepts' or 'dashboard'",
        duration: 3000
      });
    }
  };

  // Process voice commands
  useEffect(() => {
    if (transcript && transcript.length > 0) {
      const commands = {
        'show concepts': () => onNavigationCommand?.('/dashboard/student/concepts'),
        'open concepts': () => onNavigationCommand?.('/dashboard/student/concepts'),
        'concepts page': () => onNavigationCommand?.('/dashboard/student/concepts'),
        'flashcards': () => onNavigationCommand?.('/dashboard/student/flashcards'),
        'practice exam': () => onNavigationCommand?. ('/dashboard/student/practice-exam'),
        'practice test': () => onNavigationCommand?.('/dashboard/student/practice-exam'),
        'dashboard': () => onNavigationCommand?.('/dashboard/student'),
        'home': () => onNavigationCommand?.('/'),
        'today plan': () => onNavigationCommand?.('/dashboard/student/today'),
        'study plan': () => onNavigationCommand?.('/dashboard/student/today'),
        'sign up': () => onNavigationCommand?.('/signup'),
        'login': () => onNavigationCommand?.('/login'),
        'settings': () => setIsSettingsOpen(true),
        'stop listening': () => {
          stopListening();
          setShowTranscript(false);
        }
      };

      const processed = processCommand(commands, true);
      
      if (processed) {
        setShowTranscript(false);
        toast({
          title: "Command executed",
          description: `Processed: "${transcript}"`,
          duration: 2000
        });
      } else if (onCommand) {
        onCommand(transcript);
        setShowTranscript(false);
      }
    }
  }, [transcript, processCommand, onCommand, onNavigationCommand, stopListening, toast]);

  const baseClasses = `
    flex items-center gap-2 transition-all duration-300 
    ${isListening 
      ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg' 
      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg'
    }
    ${position === 'fixed' ? 'fixed bottom-6 left-6 z-50' : ''}
    ${className}
  `;

  return (
    <>
      <div className={position === 'fixed' ? 'fixed bottom-6 left-6 z-50' : 'relative'}>
        {/* Transcript Display */}
        <AnimatePresence>
          {showTranscript && transcript && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="mb-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-xs"
            >
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">You said:</div>
              <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                "{transcript}"
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Button Group */}
        <div className="flex items-center gap-2">
          {/* Main Microphone Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleMicrophoneClick}
              className={baseClasses}
              size="lg"
            >
              {isListening ? (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Mic className="h-5 w-5" />
                  </motion.div>
                  Listening...
                </>
              ) : (
                <>
                  <MicOff className="h-5 w-5" />
                  Speak
                </>
              )}
            </Button>
          </motion.div>

          {/* Settings Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => setIsSettingsOpen(true)}
              variant="outline"
              size="sm"
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        {/* Listening Animation */}
        {isListening && (
          <motion.div
            className="absolute -inset-2 bg-gradient-to-r from-red-500/20 to-pink-600/20 rounded-lg"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>

      {/* Voice Settings Panel */}
      <VoiceSettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingsChange={updateSettings}
        availableVoices={availableVoices}
        userName={userName}
      />
    </>
  );
};

export default SpeechRecognitionButton;
