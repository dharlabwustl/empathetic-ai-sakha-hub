
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Settings, Volume2, VolumeX, X, Minimize2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
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
  const [isMinimized, setIsMinimized] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{
    type: 'user' | 'assistant';
    message: string;
    timestamp: Date;
  }>>([]);

  const {
    settings,
    isListening,
    isSpeaking,
    transcript,
    confidence,
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
      rate: 0.9,
      pitch: 1.1,
      enabled: true,
      muted: false
    }
  });

  // Context-specific greetings and commands
  const getContextualGreeting = () => {
    const greetings = {
      homepage: `Hello! I'm Sakha, your AI study companion at PREPZR. I can help you explore our features, start your free trial, or take an exam readiness test. What would you like to know?`,
      dashboard: `Welcome back ${userName}! I'm here to help you navigate your dashboard, check your study plan, or answer any questions about your progress. How can I assist you today?`,
      learning: `Hi ${userName}! I'm ready to support your learning session. I can explain concepts, help with practice problems, or guide you through your study materials. What would you like to work on?`
    };
    return greetings[context];
  };

  const getContextualCommands = () => {
    const commands = {
      homepage: {
        'start free trial': () => onNavigationCommand?.('/signup'),
        'sign up': () => onNavigationCommand?.('/signup'),
        'take readiness test': () => window.dispatchEvent(new Event('open-exam-analyzer')),
        'analyze my readiness': () => window.dispatchEvent(new Event('open-exam-analyzer')),
        'learn more about features': () => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }),
        'see pricing': () => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }),
        'contact us': () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      },
      dashboard: {
        'show study plan': () => onNavigationCommand?.('/dashboard/student/today'),
        'open concepts': () => onNavigationCommand?.('/dashboard/student/concepts'),
        'practice exam': () => onNavigationCommand?.('/dashboard/student/practice-exam'),
        'flashcards': () => onNavigationCommand?.('/dashboard/student/flashcards'),
        'academic advisor': () => onNavigationCommand?.('/dashboard/student/academic'),
        'check progress': () => speakText('Your current streak is 12 days! You have mastered 48 concepts and completed 3 practice exams this week. Keep up the great work!'),
        'how am i doing': () => speakText('You are doing excellent! Your study consistency is 85% and you have improved your weak subjects by 15% this month.')
      },
      learning: {
        'explain this concept': () => speakText('I can help explain any concept you are studying. Please tell me which specific topic you need help with.'),
        'help me practice': () => speakText('I can guide you through practice problems. What subject would you like to practice?'),
        'show formula': () => speakText('I can display and explain formulas. Which formula are you looking for?'),
        'take a break': () => speakText('Great idea! Taking regular breaks improves learning. Try the 25-5 method: study for 25 minutes, then take a 5-minute break.')
      }
    };
    return commands[context] || commands.homepage;
  };

  // Handle voice commands
  useEffect(() => {
    if (transcript && isOpen) {
      const commands = getContextualCommands();
      const processed = processCommand(commands, true);
      
      if (processed) {
        // Add to conversation history
        setConversationHistory(prev => [
          ...prev,
          {
            type: 'user',
            message: transcript,
            timestamp: new Date()
          }
        ]);
        
        // Clear transcript after processing
        setTimeout(() => {
          stopListening();
        }, 1000);
      } else if (transcript.length > 10) {
        // Handle unrecognized commands
        const response = `I heard "${transcript}" but I'm not sure how to help with that. Try asking about your study plan, concepts, or practice exams.`;
        speakText(response);
        
        setConversationHistory(prev => [
          ...prev,
          {
            type: 'user',
            message: transcript,
            timestamp: new Date()
          },
          {
            type: 'assistant',
            message: response,
            timestamp: new Date()
          }
        ]);
      }
    }
  }, [transcript, processCommand, speakText, stopListening, isOpen]);

  // Auto-greet when opening
  useEffect(() => {
    if (isOpen && !settings.muted) {
      const greeting = getContextualGreeting();
      setTimeout(() => {
        speakText(greeting);
        setConversationHistory([{
          type: 'assistant',
          message: greeting,
          timestamp: new Date()
        }]);
      }, 500);
    }
  }, [isOpen, settings.muted, speakText]);

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleVoiceChange = (voiceId: string) => {
    const voice = availableVoices.find(v => v.voiceURI === voiceId);
    if (voice) {
      updateSettings({ voice });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className={`bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden ${
            isMinimized ? 'w-80 h-16' : 'w-full max-w-2xl h-[600px]'
          } transition-all duration-300`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Volume2 className="h-4 w-4" />
                </div>
                {(isListening || isSpeaking) && (
                  <motion.div
                    className="absolute -inset-1 bg-white/30 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </div>
              <div>
                <h3 className="font-semibold">Sakha AI Assistant</h3>
                <p className="text-xs text-white/80 capitalize">{context} Mode</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Settings Panel */}
              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50"
                  >
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Volume</label>
                          <Slider
                            value={[settings.volume * 100]}
                            onValueChange={(value) => updateSettings({ volume: value[0] / 100 })}
                            max={100}
                            step={1}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Speed</label>
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
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Mute Assistant</span>
                        <Switch
                          checked={settings.muted}
                          onCheckedChange={toggleMute}
                        />
                      </div>
                      
                      {availableVoices.length > 0 && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Voice</label>
                          <select
                            value={settings.voice?.voiceURI || ''}
                            onChange={(e) => handleVoiceChange(e.target.value)}
                            className="w-full p-2 border rounded-md bg-background"
                          >
                            {availableVoices
                              .filter(voice => voice.lang.startsWith('en'))
                              .map((voice) => (
                                <option key={voice.voiceURI} value={voice.voiceURI}>
                                  {voice.name} ({voice.lang})
                                </option>
                              ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Status Bar */}
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {isListening && (
                      <Badge variant="secondary" className="bg-red-100 text-red-700 animate-pulse">
                        Listening...
                      </Badge>
                    )}
                    {isSpeaking && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Speaking...
                      </Badge>
                    )}
                    {!isListening && !isSpeaking && (
                      <Badge variant="outline">Ready</Badge>
                    )}
                  </div>
                  
                  {confidence > 0 && (
                    <div className="text-xs text-gray-500">
                      Confidence: {Math.round(confidence * 100)}%
                    </div>
                  )}
                </div>
                
                {transcript && (
                  <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md text-sm">
                    <strong>You said:</strong> "{transcript}"
                  </div>
                )}
              </div>

              {/* Conversation History */}
              <div className="flex-1 p-4 overflow-y-auto max-h-96">
                <div className="space-y-3">
                  {conversationHistory.map((entry, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${entry.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        entry.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                      }`}>
                        <p className="text-sm">{entry.message}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {entry.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Voice Controls */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    onClick={handleVoiceToggle}
                    size="lg"
                    className={`h-16 w-16 rounded-full ${
                      isListening
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                        : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
                    }`}
                  >
                    {isListening ? (
                      <MicOff className="h-6 w-6 text-white" />
                    ) : (
                      <Mic className="h-6 w-6 text-white" />
                    )}
                  </Button>
                  
                  <Button
                    onClick={toggleMute}
                    variant="outline"
                    size="lg"
                    className="h-12 w-12 rounded-full"
                  >
                    {settings.muted ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                
                <p className="text-center text-sm text-gray-500 mt-3">
                  {isListening ? 'Say a command...' : 'Click the microphone to start'}
                </p>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UnifiedVoiceAssistant;
