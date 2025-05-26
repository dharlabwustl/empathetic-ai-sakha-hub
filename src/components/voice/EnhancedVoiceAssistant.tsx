
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Settings, Volume2, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useVoiceAssistant from '@/hooks/useVoiceAssistant';
import VoiceAssistantSettings from './VoiceAssistantSettings';
import { motion, AnimatePresence } from 'framer-motion';

interface EnhancedVoiceAssistantProps {
  userName?: string;
  language?: string;
  onNavigationCommand?: (route: string) => void;
  position?: 'bottom-right' | 'bottom-left';
  size?: 'small' | 'medium' | 'large';
  page?: string;
}

const EnhancedVoiceAssistant: React.FC<EnhancedVoiceAssistantProps> = ({
  userName = 'Student',
  language = 'en-US',
  onNavigationCommand,
  position = 'bottom-right',
  size = 'medium',
  page = 'home'
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
    updateSettings,
    toggleMute
  } = useVoiceAssistant({
    userName,
    initialSettings: {
      language,
      volume: 0.8,
      rate: 1.0,
      pitch: 1.0,
      enabled: true,
      muted: false,
      autoRestart: false
    }
  });

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
      setIsActive(false);
    } else {
      startListening();
      setIsActive(true);
      
      // Page-specific greetings
      const greetings = {
        home: `Hello ${userName}, I'm your prep, zer assistant. How can I help you today?`,
        dashboard: `Welcome back ${userName}! I can help you navigate your dashboard or answer study questions.`,
        'todays-plan': `Hi ${userName}! I can help you with your study plan. Ask me about tasks, subjects, or time management.`,
        concepts: `Hello ${userName}! I'm here to help you understand concepts better. Ask me to explain anything!`,
        flashcards: `Hi ${userName}! I can help you practice with flashcards. Ask me to quiz you or explain topics.`,
        'academic-advisor': `Hello ${userName}! I'm your AI academic advisor. Ask me about study strategies or exam preparation.`,
        'formula-practice': `Hi ${userName}! I can help you practice formulas. Ask me about any physics, chemistry, or math formulas.`
      };
      
      speakText(greetings[page as keyof typeof greetings] || greetings.home);
    }
  };

  // Process voice commands based on current page
  useEffect(() => {
    if (transcript) {
      const commands = getPageSpecificCommands();
      const processed = processCommand(commands, true);
      
      if (processed) {
        setIsActive(false);
        stopListening();
      }
    }
  }, [transcript, page, processCommand, onNavigationCommand, speakText, stopListening]);

  const getPageSpecificCommands = () => {
    const baseCommands = {
      'go to dashboard': () => {
        speakText('Opening your dashboard');
        onNavigationCommand?.('/dashboard/student');
      },
      'show study plan': () => {
        speakText('Opening your study plan');
        onNavigationCommand?.('/dashboard/student/today');
      },
      'open concepts': () => {
        speakText('Opening concepts section');
        onNavigationCommand?.('/dashboard/student/concepts');
      },
      'practice exam': () => {
        speakText('Opening practice exams');
        onNavigationCommand?.('/dashboard/student/practice-exam');
      },
      'flashcards': () => {
        speakText('Opening flashcards');
        onNavigationCommand?.('/dashboard/student/flashcards');
      },
      'go home': () => {
        speakText('Going to home page');
        onNavigationCommand?.('/');
      },
      'help me': () => {
        speakText('I can help you navigate prep, zer, answer study questions, and provide guidance. What would you like to do?');
      }
    };

    // Add page-specific commands
    const pageCommands: Record<string, Record<string, () => void>> = {
      'todays-plan': {
        'show physics tasks': () => speakText('Here are your physics tasks for today'),
        'how much time left': () => speakText('You have 4 hours and 30 minutes left for today'),
        'mark task complete': () => speakText('Which task would you like to mark as complete?')
      },
      concepts: {
        'explain this concept': () => speakText('I can explain any concept. Please specify which one you need help with.'),
        'show examples': () => speakText('Let me show you some examples for this concept.')
      },
      flashcards: {
        'start quiz': () => speakText('Starting flashcard quiz mode. I will ask you questions.'),
        'flip card': () => speakText('Flipping the card to show the answer.')
      }
    };

    return { ...baseCommands, ...(pageCommands[page] || {}) };
  };

  const getSizeClasses = () => {
    const sizes = {
      small: 'h-12 w-12',
      medium: 'h-14 w-14',
      large: 'h-16 w-16'
    };
    return sizes[size];
  };

  const positionClasses = position === 'bottom-right' 
    ? 'bottom-6 right-6' 
    : 'bottom-6 left-6';

  return (
    <>
      <div className={`fixed ${positionClasses} z-40`}>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border max-w-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">PREPZR AI Assistant</span>
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
                      onClick={toggleMute}
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
                    Listening... Try saying "show study plan" or "help me"
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

                <div className="text-xs text-gray-500">
                  Page: {page} • Voice: {settings.enabled ? 'On' : 'Off'}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex flex-col items-center space-y-2">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onHoverStart={() => setIsExpanded(true)}
            onHoverEnd={() => setIsExpanded(false)}
          >
            <Button
              onClick={handleVoiceToggle}
              className={`${getSizeClasses()} rounded-full shadow-lg transition-all duration-300 ${
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

      {/* Voice Assistant Settings Modal */}
      <VoiceAssistantSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSettingsChange={updateSettings}
        availableVoices={availableVoices}
      />
    </>
  );
};

export default EnhancedVoiceAssistant;
