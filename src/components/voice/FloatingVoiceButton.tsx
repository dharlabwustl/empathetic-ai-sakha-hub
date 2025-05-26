import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Settings, Volume2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import UnifiedVoiceAssistant from './UnifiedVoiceAssistant';
import VoiceSettingsPanel from './VoiceSettingsPanel';
import { useLocation, useNavigate } from 'react-router-dom';
import useVoiceAssistant from '@/hooks/useVoiceAssistant';
import { Badge } from '@/components/ui/badge';

interface FloatingVoiceButtonProps {
  userName?: string;
  language?: string;
}

const FloatingVoiceButton: React.FC<FloatingVoiceButtonProps> = ({
  userName = 'Student',
  language = 'en-US'
}) => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [hasPlayedGreeting, setHasPlayedGreeting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  // Determine context based on current route
  const getContext = () => {
    if (location.pathname === '/') return 'homepage';
    if (location.pathname.includes('/dashboard')) return 'dashboard';
    if (location.pathname.includes('/concepts') || 
        location.pathname.includes('/flashcards') || 
        location.pathname.includes('/practice-exam')) return 'learning';
    return 'homepage';
  };

  // Auto-play intelligent greeting on page load
  useEffect(() => {
    const context = getContext();
    const hasSeenGreeting = sessionStorage.getItem(`voice_greeting_${context}`);
    
    if (!hasSeenGreeting && !hasPlayedGreeting && settings.enabled) {
      const timer = setTimeout(() => {
        playContextualGreeting(context);
        sessionStorage.setItem(`voice_greeting_${context}`, 'true');
        setHasPlayedGreeting(true);
      }, 2000); // Wait 2 seconds after page load
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, hasPlayedGreeting, settings.enabled]);

  const playContextualGreeting = (context: string) => {
    const messages = {
      homepage: `Welcome to PREPZR! I'm Sakha AI, your intelligent study companion. PREPZR is India's first emotionally aware exam preparation platform. We offer personalized learning paths, adaptive study plans, and advanced AI tutoring. You can speak to me directly or click to explore our features!`,
      dashboard: `Welcome back ${userName}! I'm here to help you navigate your dashboard and optimize your study sessions. You can ask me about your study plan, concept cards, practice exams, and more. Just speak naturally!`,
      learning: `Hello ${userName}! I'm here to support your learning journey. You can ask me to explain concepts, create flashcards, or answer any study-related questions. What would you like to explore?`
    };

    speakText(messages[context] || messages.homepage);
  };

  // Process voice commands
  useEffect(() => {
    if (transcript) {
      const commands = {
        'open study plan': () => navigate('/dashboard/student/today'),
        'show concepts': () => navigate('/dashboard/student/concepts'),
        'open flashcards': () => navigate('/dashboard/student/flashcards'),
        'practice exam': () => navigate('/dashboard/student/practice-exam'),
        'go to dashboard': () => navigate('/dashboard/student'),
        'take me home': () => navigate('/'),
        'help me study': () => {
          speakText('I can help you navigate to your study plan, concepts, practice exams, or flashcards. Just tell me what you need!');
        },
        'what can you do': () => {
          speakText('I can help you navigate PREPZR, answer questions about your study plan, and provide study guidance. Try saying "show concepts" or "open study plan".');
        },
        'open settings': () => setIsSettingsOpen(true),
        'stop listening': () => {
          stopListening();
          speakText('Voice recognition stopped. Click the microphone to start again.');
        }
      };

      const processed = processCommand(commands, true);
      
      if (processed) {
        // Don't stop listening after processing a command
        // This keeps the conversation flowing
      }
    }
  }, [transcript, processCommand, navigate, speakText]);

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      if (!hasPlayedGreeting) {
        speakText(`Hi ${userName}! I'm listening. You can ask me to navigate anywhere or help with your studies.`);
      }
    }
  };

  const handleNavigationCommand = (route: string) => {
    navigate(route);
  };

  // Don't show on auth pages
  if (location.pathname.includes('/login') || 
      location.pathname.includes('/signup') || 
      location.pathname.includes('/admin')) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
      >
        <div className="flex flex-col items-end space-y-2">
          {/* Voice status indicator */}
          <AnimatePresence>
            {(isListening || isSpeaking || transcript) && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-3 max-w-xs"
              >
                {isSpeaking && (
                  <div className="flex items-center gap-2 text-blue-600">
                    <Volume2 className="h-4 w-4" />
                    <span className="text-sm">Speaking...</span>
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
                  </div>
                )}
                
                {isListening && !isSpeaking && (
                  <div className="flex items-center gap-2 text-green-600">
                    <Mic className="h-4 w-4" />
                    <span className="text-sm">Listening...</span>
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
                  </div>
                )}

                {transcript && !isSpeaking && (
                  <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-2 rounded mt-2">
                    "{transcript}"
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Control buttons */}
          <div className="flex items-center space-x-2">
            {/* Settings button */}
            <Button
              onClick={() => setIsSettingsOpen(true)}
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700"
            >
              <Settings className="h-4 w-4" />
            </Button>

            {/* Main voice button */}
            <Button
              onClick={handleVoiceToggle}
              className={`h-14 w-14 rounded-full shadow-lg border-0 relative overflow-hidden group transition-all duration-300 ${
                isListening 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700' 
                  : isSpeaking
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
                  : 'bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700'
              } text-white`}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              
              {isListening ? (
                <Mic className="h-6 w-6 relative z-10" />
              ) : isSpeaking ? (
                <Volume2 className="h-6 w-6 relative z-10" />
              ) : (
                <Mic className="h-6 w-6 relative z-10" />
              )}
              
              {/* Status indicator */}
              <motion.div
                className={`absolute top-1 right-1 h-3 w-3 rounded-full ${
                  isListening ? 'bg-green-400' : isSpeaking ? 'bg-blue-400' : 'bg-purple-400'
                }`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Ripple effect */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white/30"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Voice Settings Panel */}
      <VoiceSettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingsChange={updateSettings}
        availableVoices={availableVoices}
        userName={userName}
      />

      {/* Unified Voice Assistant */}
      <UnifiedVoiceAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        userName={userName}
        language={language}
        context={getContext()}
        onNavigationCommand={handleNavigationCommand}
      />
    </>
  );
};

export default FloatingVoiceButton;
