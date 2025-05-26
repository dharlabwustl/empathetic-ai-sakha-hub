
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Settings, Volume2, VolumeX, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import useVoiceAssistant from '@/hooks/useVoiceAssistant';

interface UnifiedVoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  language?: string;
  context?: 'homepage' | 'dashboard' | 'learning';
  onNavigationCommand?: (route: string) => void;
}

const UnifiedVoiceAssistant: React.FC<UnifiedVoiceAssistantProps> = ({
  isOpen,
  onClose,
  userName = 'Student',
  language = 'en-US',
  context = 'homepage',
  onNavigationCommand
}) => {
  const { toast } = useToast();
  const [showSettings, setShowSettings] = useState(false);
  
  const {
    settings,
    isListening,
    isSpeaking,
    transcript,
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
    } else {
      startListening();
      const greetings = {
        homepage: `Hello! I'm Sakha AI, your PREP ZER assistant. I can help you navigate our features, start your free trial, or analyze your exam readiness. What would you like to explore?`,
        dashboard: `Welcome back ${userName}! I can help you with your study plan, concepts, practice exams, or answer any questions. How can I assist you today?`,
        learning: `Hi ${userName}! I'm here to support your learning. I can explain concepts, help with practice, or answer study questions. What would you like to work on?`
      };
      speakText(greetings[context]);
    }
  };

  // Process voice commands
  useEffect(() => {
    if (transcript) {
      const commands = {
        'start free trial': () => onNavigationCommand?.('/signup'),
        'sign up': () => onNavigationCommand?.('/signup'),
        'login': () => onNavigationCommand?.('/login'),
        'exam readiness': () => {
          speakText('Opening exam readiness analyzer');
          // Trigger exam analyzer
          window.dispatchEvent(new CustomEvent('open-exam-analyzer'));
        },
        'show features': () => {
          speakText('Let me tell you about PREP ZER features. We offer personalized study plans, AI tutoring, practice exams, and emotional support.');
        },
        'dashboard': () => onNavigationCommand?.('/dashboard/student'),
        'study plan': () => onNavigationCommand?.('/dashboard/student/today'),
        'concepts': () => onNavigationCommand?.('/dashboard/student/concepts'),
        'practice exam': () => onNavigationCommand?.('/dashboard/student/practice-exam'),
        'flashcards': () => onNavigationCommand?.('/dashboard/student/flashcards'),
        'what is prepzr': () => {
          speakText('PREP ZER is India\'s first emotionally intelligent AI exam preparation platform. We understand your mindset, not just the exam, helping you prepare for JEE, NEET, UPSC, CAT and more.');
        },
        'help': () => {
          speakText('I can help you navigate PREP ZER, explain features, start your free trial, or analyze your exam readiness. Try saying "show features" or "start free trial".');
        }
      };

      const processed = processCommand(commands, true);
      
      if (processed) {
        setTimeout(() => {
          stopListening();
        }, 1000);
      }
    }
  }, [transcript, processCommand, onNavigationCommand, speakText, stopListening, context]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 w-full max-w-md"
          >
            <Card className="border-0 shadow-none">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                      <Mic className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Sakha AI Assistant</h3>
                      <p className="text-sm text-gray-500">Your intelligent study companion</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => setShowSettings(!showSettings)}
                      variant="ghost"
                      size="sm"
                      className="p-2"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={onClose}
                      variant="ghost"
                      size="sm"
                      className="p-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Settings Panel */}
                <AnimatePresence>
                  {showSettings && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border rounded-lg p-4 bg-gray-50 dark:bg-gray-800"
                    >
                      <h4 className="font-medium mb-3">Voice Settings</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Voice Enabled</span>
                          <Switch
                            checked={settings.enabled}
                            onCheckedChange={(enabled) => updateSettings({ enabled })}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Muted</span>
                          <Switch
                            checked={settings.muted}
                            onCheckedChange={toggleMute}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm">Volume: {Math.round(settings.volume * 100)}%</label>
                          <Slider
                            value={[settings.volume * 100]}
                            onValueChange={(value) => updateSettings({ volume: value[0] / 100 })}
                            max={100}
                            step={1}
                            className="w-full"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm">Speech Rate: {settings.rate}x</label>
                          <Slider
                            value={[settings.rate * 100]}
                            onValueChange={(value) => updateSettings({ rate: value[0] / 100 })}
                            min={50}
                            max={200}
                            step={10}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Voice Control */}
                <div className="text-center space-y-4">
                  <div className="relative">
                    <Button
                      onClick={handleVoiceToggle}
                      className={`w-20 h-20 rounded-full shadow-lg transition-all duration-300 ${
                        isListening
                          ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                          : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                      }`}
                    >
                      {isListening ? (
                        <MicOff className="h-8 w-8 text-white" />
                      ) : (
                        <Mic className="h-8 w-8 text-white" />
                      )}
                    </Button>
                    
                    {(isListening || isSpeaking) && (
                      <div className="absolute -inset-2 border-2 border-blue-500 rounded-full animate-ping" />
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Tap to start'}
                    </p>
                    
                    {transcript && (
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="text-sm font-medium text-blue-800 dark:text-blue-200">You said:</p>
                        <p className="text-sm text-blue-700 dark:text-blue-300">"{transcript}"</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Commands */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Try saying:
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {context === 'homepage' && [
                      "Start free trial",
                      "Show features", 
                      "What is PREPZR",
                      "Exam readiness"
                    ].map((command, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="justify-start text-xs"
                        onClick={() => {
                          speakText(command);
                          // Simulate the command
                          setTimeout(() => {
                            const commands = {
                              'Start free trial': () => onNavigationCommand?.('/signup'),
                              'Show features': () => speakText('PREP ZER offers personalized study plans, AI tutoring, and emotional support.'),
                              'What is PREPZR': () => speakText('PREP ZER is India\'s first emotionally intelligent exam prep platform.'),
                              'Exam readiness': () => window.dispatchEvent(new CustomEvent('open-exam-analyzer'))
                            };
                            commands[command as keyof typeof commands]?.();
                          }, 1000);
                        }}
                      >
                        "{command}"
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UnifiedVoiceAssistant;
