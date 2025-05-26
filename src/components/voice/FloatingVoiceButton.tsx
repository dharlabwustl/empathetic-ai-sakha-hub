
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useVoiceAssistant from '@/hooks/useVoiceAssistant';
import VoiceAssistantSettings from './VoiceAssistantSettings';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingVoiceButtonProps {
  userName?: string;
  language?: string;
  onNavigationCommand?: (route: string) => void;
  position?: 'bottom-right' | 'bottom-left';
}

const FloatingVoiceButton: React.FC<FloatingVoiceButtonProps> = ({
  userName = 'Student',
  language = 'en-US',
  onNavigationCommand,
  position = 'bottom-right'
}) => {
  const { toast } = useToast();
  const [showSettings, setShowSettings] = useState(false);
  
  const {
    settings,
    isListening,
    isSpeaking,
    transcript,
    availableVoices,
    speakText,
    startListening,
    stopListening,
    processCommand,
    updateSettings
  } = useVoiceAssistant({
    userName,
    initialSettings: {
      language,
      volume: 0.8,
      rate: 1.0,
      pitch: 1.0,
      enabled: true,
      muted: false
    }
  });

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      speakText(`Hello ${userName}, I'm your PREP ZER study assistant. How can I help you today?`);
    }
  };

  // Process voice commands
  useEffect(() => {
    if (transcript) {
      const commands = {
        'show study plan': () => onNavigationCommand?.('/dashboard/student/today'),
        'open concepts': () => onNavigationCommand?.('/dashboard/student/concepts'),
        'practice exam': () => onNavigationCommand?.('/dashboard/student/practice-exam'),
        'flashcards': () => onNavigationCommand?.('/dashboard/student/flashcards'),
        'dashboard': () => onNavigationCommand?.('/dashboard/student'),
        'help me study': () => {
          speakText('I can help you navigate to your study plan, concepts, practice exams, or flashcards. Just tell me what you need!');
        }
      };

      const processed = processCommand(commands, true);
      
      if (processed) {
        stopListening();
      }
    }
  }, [transcript, processCommand, onNavigationCommand, speakText, stopListening]);

  const positionClasses = position === 'bottom-right' 
    ? 'bottom-6 right-6' 
    : 'bottom-6 left-6';

  return (
    <div className={`fixed ${positionClasses} z-40 flex flex-col items-end gap-2`}>
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            <VoiceAssistantSettings
              settings={settings}
              onSettingsChange={updateSettings}
              onClose={() => setShowSettings(false)}
              availableVoices={availableVoices}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2">
        {/* Settings Button */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            onClick={() => setShowSettings(!showSettings)}
            variant="outline"
            size="sm"
            className="h-10 w-10 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Voice Button */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            onClick={handleVoiceToggle}
            className={`h-12 w-12 rounded-full shadow-lg transition-all duration-300 ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
            }`}
          >
            {isListening ? (
              <MicOff className="h-5 w-5 text-white" />
            ) : (
              <Mic className="h-5 w-5 text-white" />
            )}
          </Button>
        </motion.div>
      </div>
      
      {(isListening || isSpeaking) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex space-x-1 mr-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-3 bg-blue-500 rounded-full"
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
    </div>
  );
};

export default FloatingVoiceButton;
