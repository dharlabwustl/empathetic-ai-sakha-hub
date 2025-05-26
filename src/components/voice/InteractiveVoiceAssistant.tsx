
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useVoiceAssistant from '@/hooks/useVoiceAssistant';
import VoiceAssistantSettings from './VoiceAssistantSettings';
import { motion, AnimatePresence } from 'framer-motion';

interface InteractiveVoiceAssistantProps {
  userName?: string;
  language?: string;
  onNavigationCommand?: (route: string) => void;
  position?: 'bottom-right' | 'bottom-left';
}

const InteractiveVoiceAssistant: React.FC<InteractiveVoiceAssistantProps> = ({
  userName = 'Student',
  language = 'en-US',
  onNavigationCommand,
  position = 'bottom-right'
}) => {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
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
    toggleMute,
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
      setIsActive(false);
    } else {
      startListening();
      setIsActive(true);
      speakText(`Hello ${userName}, I'm your PREP ZER assistant. How can I help you today?`);
    }
  };

  const handleMuteToggle = () => {
    toggleMute();
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
        'home': () => onNavigationCommand?.('/'),
        'help me study': () => {
          speakText('I can help you navigate to your study plan, concepts, practice exams, or flashcards. Just tell me what you need!');
        },
        'what can you do': () => {
          speakText('I can help you navigate PREP ZER, answer questions about your study plan, and provide study guidance. Try saying "show study plan" or "open concepts".');
        }
      };

      const processed = processCommand(commands, true);
      
      if (processed) {
        setIsActive(false);
        stopListening();
      }
    }
  }, [transcript, processCommand, onNavigationCommand, speakText, stopListening]);

  const positionClasses = position === 'bottom-right' 
    ? 'bottom-6 right-6' 
    : 'bottom-6 left-6';

  return (
    <div className={`fixed ${positionClasses} z-50`}>
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4"
          >
            <VoiceAssistantSettings
              settings={settings}
              onSettingsChange={updateSettings}
              onClose={() => setShowSettings(false)}
              availableVoices={availableVoices}
            />
          </motion.div>
        )}

        {isExpanded && !showSettings && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border max-w-xs"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Voice Assistant</span>
                <div className="flex gap-1">
                  <Button
                    onClick={() => setShowSettings(true)}
                    variant="ghost"
                    size="sm"
                    className="p-1 h-6 w-6"
                  >
                    <Settings className="h-3 w-3" />
                  </Button>
                  <Button
                    onClick={handleMuteToggle}
                    variant="ghost"
                    size="sm"
                    className="p-1 h-6 w-6"
                  >
                    {settings.muted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                  </Button>
                </div>
              </div>
              
              {isListening && (
                <div className="text-xs text-blue-600 dark:text-blue-400">
                  Listening... Say "show study plan" or "open concepts"
                </div>
              )}
              
              {transcript && (
                <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                  "{transcript}"
                </div>
              )}
              
              {isSpeaking && (
                <div className="text-xs text-green-600 dark:text-green-400">
                  Speaking...
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex flex-col items-center space-y-2">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={handleVoiceToggle}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            className={`h-14 w-14 rounded-full shadow-lg transition-all duration-300 ${
              isActive || isListening
                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
            }`}
          >
            {isListening ? (
              <MicOff className="h-6 w-6 text-white" />
            ) : (
              <Mic className="h-6 w-6 text-white" />
            )}
          </Button>
        </motion.div>
        
        {(isListening || isSpeaking) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex space-x-1"
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
    </div>
  );
};

export default InteractiveVoiceAssistant;
