
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Settings, Volume2, VolumeX, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from 'framer-motion';
import useVoiceAssistant from '@/hooks/useVoiceAssistant';
import { useToast } from "@/hooks/use-toast";

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
  const [hasPlayedGreeting, setHasPlayedGreeting] = useState(false);

  const {
    settings,
    isListening,
    isSpeaking,
    transcript,
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

  // Play context-aware greeting when opened
  useEffect(() => {
    if (isOpen && !hasPlayedGreeting && !settings.muted) {
      const timer = setTimeout(() => {
        playGreeting();
        setHasPlayedGreeting(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, hasPlayedGreeting, settings.muted]);

  const playGreeting = () => {
    const greetings = {
      homepage: `Hello! I'm Sakha AI, your intelligent assistant for PREP ZER. I can help you explore our features, navigate the platform, or answer questions about exam preparation. How can I assist you today?`,
      dashboard: `Welcome back ${userName}! I'm here to help you navigate your dashboard and optimize your study sessions. What would you like to do?`,
      learning: `Hello ${userName}! I'm here to support your learning journey. I can explain concepts, help with practice, or answer study questions. What can I help you with?`
    };

    // Fix PREPZR pronunciation to "prep zer" with pause
    const message = greetings[context].replace(/PREP ZER/gi, 'prep, zer').replace(/PREPZR/gi, 'prep, zer');
    speakText(message);
  };

  // Process voice commands based on context
  useEffect(() => {
    if (transcript) {
      const commands = getContextCommands();
      const processed = processCommand(commands, true);
      
      if (processed) {
        stopListening();
      }
    }
  }, [transcript, context, processCommand, onNavigationCommand, speakText, stopListening]);

  const getContextCommands = () => {
    const baseCommands = {
      'hello': () => speakText(`Hello ${userName}! How can I help you today?`),
      'help': () => speakText('I can help you navigate, answer questions, or explain features. Just tell me what you need!'),
      'settings': () => setShowSettings(true),
      'close': () => onClose(),
    };

    if (context === 'homepage') {
      return {
        ...baseCommands,
        'start trial': () => onNavigationCommand?.('/signup'),
        'sign up': () => onNavigationCommand?.('/signup'),
        'login': () => onNavigationCommand?.('/login'),
        'dashboard': () => onNavigationCommand?.('/dashboard/student'),
        'features': () => speakText('PREP ZER offers AI-powered study plans, concept cards, practice exams, and personalized analytics to help you succeed in competitive exams.'),
        'what is prepzr': () => speakText('PREP ZER is India\'s first emotionally aware exam preparation platform, designed to understand your mindset and provide personalized learning paths for JEE, NEET, UPSC, CAT and other competitive exams.'),
      };
    }

    if (context === 'dashboard') {
      return {
        ...baseCommands,
        'study plan': () => onNavigationCommand?.('/dashboard/student/today'),
        'concepts': () => onNavigationCommand?.('/dashboard/student/concepts'),
        'practice exam': () => onNavigationCommand?.('/dashboard/student/practice-exam'),
        'flashcards': () => onNavigationCommand?.('/dashboard/student/flashcards'),
        'progress': () => speakText('Your progress is looking great! You can view detailed analytics in your dashboard.'),
      };
    }

    if (context === 'learning') {
      return {
        ...baseCommands,
        'explain': () => speakText('I can explain any concept you\'re studying. Just ask me about a specific topic!'),
        'practice': () => speakText('Let\'s practice! I can help you with problems or create custom questions.'),
        'flashcards': () => onNavigationCommand?.('/dashboard/student/flashcards'),
      };
    }

    return baseCommands;
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleVolumeChange = (value: number[]) => {
    updateSettings({ volume: value[0] / 100 });
  };

  const handleRateChange = (value: number[]) => {
    updateSettings({ rate: value[0] / 100 });
  };

  const handleMuteToggle = () => {
    updateSettings({ muted: !settings.muted });
    toast({
      title: settings.muted ? "Voice Unmuted" : "Voice Muted",
      description: settings.muted ? "You will now hear responses" : "Voice responses are muted",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white dark:bg-gray-900 shadow-2xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                  <Mic className="h-5 w-5 text-white" />
                </div>
                Sakha AI Assistant
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Settings Panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <h4 className="font-semibold text-sm">Voice Settings</h4>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mute Voice</span>
                    <Switch 
                      checked={settings.muted} 
                      onCheckedChange={handleMuteToggle}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm">Volume: {Math.round(settings.volume * 100)}%</label>
                    <Slider
                      value={[settings.volume * 100]}
                      onValueChange={handleVolumeChange}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm">Speech Rate: {Math.round(settings.rate * 100)}%</label>
                    <Slider
                      value={[settings.rate * 100]}
                      onValueChange={handleRateChange}
                      min={50}
                      max={200}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Status Indicators */}
            <div className="flex gap-2">
              {isSpeaking && (
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Speaking...
                </Badge>
              )}
              {isListening && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  Listening...
                </Badge>
              )}
              {!isSpeaking && !isListening && (
                <Badge variant="outline">Ready</Badge>
              )}
            </div>

            {/* Transcript Display */}
            {transcript && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm font-medium mb-1">You said:</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">"{transcript}"</p>
              </div>
            )}

            {/* Voice Control Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleVoiceToggle}
                size="lg"
                className={`h-16 w-16 rounded-full transition-all duration-300 ${
                  isListening
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
            </div>

            {/* Quick Commands */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Try saying:</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {context === 'homepage' && (
                  <>
                    <Badge variant="outline">"Start trial"</Badge>
                    <Badge variant="outline">"What is PREPZR"</Badge>
                    <Badge variant="outline">"Show features"</Badge>
                    <Badge variant="outline">"Go to dashboard"</Badge>
                  </>
                )}
                {context === 'dashboard' && (
                  <>
                    <Badge variant="outline">"Study plan"</Badge>
                    <Badge variant="outline">"Open concepts"</Badge>
                    <Badge variant="outline">"Practice exam"</Badge>
                    <Badge variant="outline">"Show progress"</Badge>
                  </>
                )}
                {context === 'learning' && (
                  <>
                    <Badge variant="outline">"Explain this"</Badge>
                    <Badge variant="outline">"Practice problems"</Badge>
                    <Badge variant="outline">"Create flashcard"</Badge>
                    <Badge variant="outline">"Help me study"</Badge>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default UnifiedVoiceAssistant;
