
import React, { useState, useEffect } from 'react';
import { Volume2, Settings, Mic, MicOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import VoiceSettingsPanel from './VoiceSettingsPanel';
import { useToast } from "@/hooks/use-toast";

interface VoiceSettings {
  enabled: boolean;
  volume: number;
  rate: number;
  pitch: number;
  language: string;
  voice: string;
  autoGreeting: boolean;
  contextAware: boolean;
}

interface EnhancedVoiceAssistantProps {
  userName?: string;
  context?: string;
  onNavigationCommand?: (route: string) => void;
  position?: 'bottom-right' | 'bottom-left';
}

const EnhancedVoiceAssistant: React.FC<EnhancedVoiceAssistantProps> = ({
  userName = 'Student',
  context = 'general',
  onNavigationCommand,
  position = 'bottom-right'
}) => {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  
  const [settings, setSettings] = useState<VoiceSettings>({
    enabled: true,
    volume: 0.8,
    rate: 1.0,
    pitch: 1.0,
    language: 'en-US',
    voice: 'aria',
    autoGreeting: true,
    contextAware: true
  });

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = settings.language;
      
      recognitionInstance.onresult = (event) => {
        const current = event.resultIndex;
        const transcriptResult = event.results[current][0].transcript;
        setTranscript(transcriptResult);
        
        if (event.results[current].isFinal) {
          handleVoiceCommand(transcriptResult);
        }
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, [settings.language]);

  // Auto greeting on page load
  useEffect(() => {
    if (settings.enabled && settings.autoGreeting) {
      const timer = setTimeout(() => {
        playGreeting();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [context, settings.enabled, settings.autoGreeting]);

  const playGreeting = () => {
    const greetings = {
      general: `Hello ${userName}! I'm Sakha AI, your study companion. How can I help you today?`,
      concepts: `Welcome to concept mastery! I can help explain difficult topics or guide you through your study materials.`,
      flashcards: `Ready for some flashcard practice? I can help you review cards or suggest optimal study patterns.`,
      'practice-exam': `Time for practice exams! I can guide you through questions or help analyze your performance.`,
      'todays-plan': `Let's review your study plan for today. I can help optimize your schedule or answer any questions.`
    };
    
    speakText(greetings[context as keyof typeof greetings] || greetings.general);
  };

  const speakText = (text: string) => {
    if (!settings.enabled || !('speechSynthesis' in window)) return;
    
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = settings.volume;
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.lang = settings.language;
    
    // Try to use a female voice
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('female') || 
      voice.name.toLowerCase().includes('aria') ||
      voice.name.toLowerCase().includes('sarah') ||
      (!voice.name.toLowerCase().includes('male') && voice.lang.includes('en'))
    );
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    
    utterance.onend = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Navigation commands
    if (lowerCommand.includes('dashboard') || lowerCommand.includes('home')) {
      onNavigationCommand?.('/dashboard/student');
      speakText('Navigating to dashboard');
    } else if (lowerCommand.includes('study plan') || lowerCommand.includes('today')) {
      onNavigationCommand?.('/dashboard/student/today');
      speakText('Opening your study plan');
    } else if (lowerCommand.includes('concept')) {
      onNavigationCommand?.('/dashboard/student/concepts');
      speakText('Opening concept cards');
    } else if (lowerCommand.includes('flashcard')) {
      onNavigationCommand?.('/dashboard/student/flashcards');
      speakText('Opening flashcards');
    } else if (lowerCommand.includes('practice') || lowerCommand.includes('exam')) {
      onNavigationCommand?.('/dashboard/student/practice-exam');
      speakText('Opening practice exams');
    } else if (lowerCommand.includes('help')) {
      speakText('I can help you navigate PREPZR, explain concepts, or answer study-related questions. Try saying "show study plan" or "open concepts".');
    } else {
      speakText('I didn\'t understand that command. Try saying "help" to see what I can do.');
    }
    
    setTranscript('');
  };

  const toggleListening = () => {
    if (!settings.enabled) return;
    
    if (isListening) {
      recognition?.stop();
      setIsListening(false);
    } else {
      recognition?.start();
      setIsListening(true);
    }
  };

  const handleTestVoice = () => {
    speakText('Hello! This is Sakha AI. I\'m here to help you with your studies and make learning more engaging.');
  };

  const positionClasses = position === 'bottom-right' 
    ? 'bottom-6 right-6' 
    : 'bottom-6 left-6';

  if (!settings.enabled) return null;

  return (
    <>
      <div className={`fixed ${positionClasses} z-40 flex flex-col items-end gap-2`}>
        {/* Voice Activity Indicator */}
        <AnimatePresence>
          {(isListening || isSpeaking) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-3 max-w-xs"
            >
              <div className="flex items-center gap-2 text-sm">
                {isListening && (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 bg-red-500 rounded-full"
                    />
                    <span className="text-red-600">Listening...</span>
                  </>
                )}
                {isSpeaking && (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 bg-blue-500 rounded-full"
                    />
                    <span className="text-blue-600">Speaking...</span>
                  </>
                )}
              </div>
              
              {transcript && (
                <div className="mt-2 text-xs text-gray-600 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                  "{transcript}"
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Control Buttons */}
        <div className="flex gap-2">
          {/* Settings Button */}
          <Button
            onClick={() => setShowSettings(true)}
            variant="outline"
            size="icon"
            className="rounded-full shadow-lg"
          >
            <Settings className="h-4 w-4" />
          </Button>

          {/* Main Voice Button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              onClick={toggleListening}
              className={`h-14 w-14 rounded-full shadow-lg transition-all duration-300 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
              }`}
            >
              {isListening ? (
                <MicOff className="h-6 w-6 text-white" />
              ) : (
                <Volume2 className="h-6 w-6 text-white" />
              )}
            </Button>
          </motion.div>
        </div>

        {/* Ripple Effect */}
        {(isListening || isSpeaking) && (
          <motion.div
            className="absolute bottom-0 right-0 w-14 h-14 rounded-full border-2 border-white/30 pointer-events-none"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>

      {/* Settings Panel */}
      <VoiceSettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSettingsChange={setSettings}
        onTestVoice={handleTestVoice}
      />
    </>
  );
};

export default EnhancedVoiceAssistant;
