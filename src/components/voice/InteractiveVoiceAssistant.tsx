
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useVoiceAssistant from '@/hooks/useVoiceAssistant';
import VoiceSettingsPanel from './VoiceSettingsPanel';
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  
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

  // Auto-greet when component mounts
  useEffect(() => {
    if (!hasGreeted && settings.enabled && !settings.muted) {
      const timer = setTimeout(() => {
        speakText(`Hello ${userName}! I'm Sakha AI, your intelligent study companion at PREPZR. You can speak to me directly or click to explore our features!`);
        setHasGreeted(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [hasGreeted, settings.enabled, settings.muted, speakText, userName]);

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      if (!isSpeaking) {
        speakText(`Hi ${userName}! I'm listening. You can ask me to navigate anywhere or help with your studies.`);
      }
    }
  };

  const handleMuteToggle = () => {
    updateSettings({ muted: !settings.muted });
    toast({
      title: settings.muted ? "Voice Assistant Unmuted" : "Voice Assistant Muted",
      description: settings.muted 
        ? "You will now hear voice responses" 
        : "Voice responses are now muted",
    });
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
        'sign up': () => onNavigationCommand?.('/signup'),
        'login': () => onNavigationCommand?.('/login'),
        'take me home': () => onNavigationCommand?.('/'),
        'help me study': () => {
          speakText('I can help you navigate to your study plan, concepts, practice exams, or flashcards. Just tell me what you need!');
        },
        'what can you do': () => {
          speakText('I can help you navigate PREPZR, answer questions about our features, and provide study guidance. Try saying "show concepts" or "open study plan".');
        },
        'open settings': () => setIsSettingsOpen(true),
        'stop listening': () => {
          stopListening();
          speakText('Voice recognition stopped. Click the microphone to start again.');
        }
      };

      const processed = processCommand(commands, true);
      
      if (processed) {
        // Reset transcript after processing
        // Note: transcript will be cleared by the hook automatically
      }
    }
  }, [transcript, processCommand, onNavigationCommand, speakText, stopListening]);

  const positionClasses = position === 'bottom-right' 
    ? 'bottom-6 right-6' 
    : 'bottom-6 left-6';

  return (
    <div className={`fixed ${positionClasses} z-50`}>
      <AnimatePresence>
        {(isExpanded || isListening || isSpeaking || transcript) && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 max-w-xs backdrop-blur-sm"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-sm font-medium">Sakha AI Assistant</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    onClick={handleMuteToggle}
                    variant="ghost"
                    size="sm"
                    className="p-1 h-6 w-6"
                  >
                    {settings.muted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                  </Button>
                  <Button
                    onClick={() => setIsSettingsOpen(true)}
                    variant="ghost"
                    size="sm"
                    className="p-1 h-6 w-6"
                  >
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              {isSpeaking && (
                <motion.div 
                  className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Volume2 className="h-3 w-3" />
                  Speaking...
                  <div className="flex space-x-1">
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
                  </div>
                </motion.div>
              )}
              
              {isListening && !isSpeaking && (
                <motion.div 
                  className="text-xs text-green-600 dark:text-green-400 flex items-center gap-2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  <Mic className="h-3 w-3" />
                  Listening... Try "show concepts" or "dashboard"
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1 h-3 bg-green-500 rounded-full"
                        animate={{
                          height: [8, 16, 8],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.15
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {transcript && !isSpeaking && (
                <motion.div 
                  className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-2 rounded"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <span className="font-medium">You said:</span> "{transcript}"
                </motion.div>
              )}
              
              {!isListening && !isSpeaking && !transcript && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Click the microphone to start voice interaction
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
            className={`h-16 w-16 rounded-full shadow-xl transition-all duration-300 relative overflow-hidden ${
              isListening
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                : isSpeaking
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 animate-pulse'
                : 'bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700'
            }`}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            
            {isListening ? (
              <Mic className="h-7 w-7 text-white relative z-10" />
            ) : isSpeaking ? (
              <Volume2 className="h-7 w-7 text-white relative z-10" />
            ) : (
              <Mic className="h-7 w-7 text-white relative z-10" />
            )}
            
            {/* Status indicator */}
            <motion.div
              className={`absolute top-1 right-1 h-4 w-4 rounded-full ${
                isListening ? 'bg-green-400' : isSpeaking ? 'bg-blue-400' : 'bg-purple-400'
              }`}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/30"
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
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
                className={`w-1 h-4 rounded-full ${
                  isListening ? 'bg-green-500' : 'bg-blue-500'
                }`}
                animate={{
                  height: [16, 24, 16],
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

      {/* Voice Settings Panel */}
      <VoiceSettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingsChange={updateSettings}
        availableVoices={availableVoices}
        userName={userName}
      />
    </div>
  );
};

export default InteractiveVoiceAssistant;
