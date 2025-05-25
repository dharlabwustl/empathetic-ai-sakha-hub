
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mic, MicOff, Volume2, VolumeX, Settings, X } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { useLocation } from 'react-router-dom';

interface VoiceAssistantSettings {
  voice: string;
  volume: number;
  speed: number;
  pitch: number;
  autoGreet: boolean;
  smartIntervention: boolean;
  enabled: boolean;
}

interface UnifiedVoiceAssistantProps {
  userName?: string;
  isHomePage?: boolean;
  onNavigationCommand?: (route: string) => void;
}

const UnifiedVoiceAssistant: React.FC<UnifiedVoiceAssistantProps> = ({
  userName = "User",
  isHomePage = false,
  onNavigationCommand
}) => {
  const { toast } = useToast();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const interventionTimerRef = useRef<number | null>(null);

  const [settings, setSettings] = useState<VoiceAssistantSettings>({
    voice: 'default',
    volume: 80,
    speed: 95,
    pitch: 110,
    autoGreet: true,
    smartIntervention: true,
    enabled: true
  });

  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };

    loadVoices();
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Initialize voice recognition
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const result = event.results[current];
      
      if (result.isFinal) {
        const finalTranscript = result[0].transcript.trim();
        setTranscript(finalTranscript);
        processVoiceCommand(finalTranscript);
      }
    };

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  // Auto-greet and smart interventions
  useEffect(() => {
    if (settings.enabled && settings.autoGreet && !hasGreeted) {
      const greetingDelay = isHomePage ? 2000 : 1000;
      
      setTimeout(() => {
        if (isHomePage) {
          speakHomePageGreeting();
        } else {
          speakDashboardGreeting();
        }
        setHasGreeted(true);
      }, greetingDelay);
    }

    // Smart interventions
    if (settings.smartIntervention && !isHomePage) {
      startSmartInterventions();
    }

    return () => {
      if (interventionTimerRef.current) {
        clearTimeout(interventionTimerRef.current);
      }
    };
  }, [settings.enabled, settings.autoGreet, settings.smartIntervention, hasGreeted, isHomePage]);

  // Stop speech when route changes
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, [location.pathname]);

  const speakHomePageGreeting = () => {
    const greetingMessage = `Welcome to PREPZR! I'm Sakha AI, your intelligent exam preparation companion. PREPZR is India's most advanced AI-powered learning platform, designed specifically for competitive exam aspirants like you. 

    We offer personalized study plans, adaptive learning paths, comprehensive concept explanations, interactive flashcards, realistic practice tests, and AI-powered academic guidance. Our platform has helped thousands of students achieve their dreams of cracking prestigious exams like IIT-JEE, NEET, UPSC, and many more.

    What makes PREPZR special? We use cutting-edge AI to understand your learning patterns, identify your strengths and weaknesses, and create a completely personalized learning experience. Our exam readiness analyzer gives you real-time insights into your preparation level.

    You can start with our free trial to explore our features, take the exam readiness analysis, or sign up to begin your personalized learning journey. I'm here to guide you through everything PREPZR has to offer. How can I help you today?`;

    speakMessage(greetingMessage);
  };

  const speakDashboardGreeting = () => {
    const contextMessage = getContextualMessage();
    speakMessage(contextMessage);
  };

  const getContextualMessage = () => {
    const path = location.pathname;
    
    if (path.includes('/dashboard/student')) {
      if (path.includes('/today')) {
        return `Welcome to your Today's Plan, ${userName}! This is your personalized daily study schedule. I can help you understand your tasks, track progress, and suggest optimal study strategies. You can ask me about any concept, get explanations, or request study tips.`;
      } else if (path.includes('/concepts')) {
        return `You're in the Concepts section, ${userName}! Here you can explore detailed explanations of all topics. I can help you understand difficult concepts, provide additional examples, or guide you to related practice materials.`;
      } else if (path.includes('/flashcards')) {
        return `Welcome to Flashcards, ${userName}! This is where you can practice and memorize key facts and formulas. I can help you create custom flashcards, explain difficult terms, or suggest effective memorization techniques.`;
      } else if (path.includes('/practice-exam')) {
        return `You're in the Practice Exam section, ${userName}! Here you can take mock tests and assess your preparation. I can help you understand questions, explain solutions, or suggest areas for improvement.`;
      } else if (path.includes('/academic')) {
        return `Welcome to your Academic Advisor, ${userName}! I'm here to provide personalized guidance on your study strategy, help you plan your preparation timeline, and answer any academic questions you have.`;
      } else {
        return `Welcome back to your dashboard, ${userName}! I'm Sakha AI, ready to assist you with your exam preparation. You can explore your study plan, concept cards, flashcards, practice exams, or ask me anything about your studies.`;
      }
    }
    
    return `Hello ${userName}! I'm Sakha AI, your learning companion. How can I help you with your exam preparation today?`;
  };

  const speakMessage = (text: string) => {
    if (!settings.enabled || !('speechSynthesis' in window)) return;

    // Stop any ongoing speech
    stopSpeaking();

    setIsSpeaking(true);
    
    // Correct PREPZR pronunciation
    const correctedText = text.replace(/PREPZR/gi, 'PREP-zer');
    
    const utterance = new SpeechSynthesisUtterance(correctedText);
    
    // Apply voice settings
    if (settings.voice !== 'default' && availableVoices.length > 0) {
      const selectedVoice = availableVoices.find(voice => voice.name === settings.voice);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }
    
    utterance.volume = settings.volume / 100;
    utterance.rate = settings.speed / 100;
    utterance.pitch = settings.pitch / 100;
    utterance.lang = 'en-US';
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    currentUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Homepage commands
    if (isHomePage) {
      if (lowerCommand.includes('sign up') || lowerCommand.includes('register')) {
        speakMessage("I'll take you to the sign-up page to create your PREPZR account.");
        onNavigationCommand?.('/signup');
        return;
      }
      
      if (lowerCommand.includes('login') || lowerCommand.includes('sign in')) {
        speakMessage("Opening the login page for you.");
        onNavigationCommand?.('/login');
        return;
      }
      
      if (lowerCommand.includes('exam readiness') || lowerCommand.includes('analysis')) {
        speakMessage("Let me open the exam readiness analyzer to assess your preparation level.");
        // Trigger exam analyzer
        window.dispatchEvent(new Event('open-exam-analyzer'));
        return;
      }
      
      if (lowerCommand.includes('features') || lowerCommand.includes('what can prepzr do')) {
        speakMessage("PREPZR offers personalized study plans, AI tutoring, concept explanations, interactive flashcards, practice tests, progress tracking, and much more. Would you like me to explain any specific feature?");
        return;
      }
    }
    
    // Dashboard commands
    else {
      if (lowerCommand.includes('today') || lowerCommand.includes('daily plan')) {
        speakMessage("Opening your today's study plan.");
        onNavigationCommand?.('/dashboard/student/today');
        return;
      }
      
      if (lowerCommand.includes('concepts') || lowerCommand.includes('topics')) {
        speakMessage("Taking you to the concepts section to explore study materials.");
        onNavigationCommand?.('/dashboard/student/concepts');
        return;
      }
      
      if (lowerCommand.includes('flashcards') || lowerCommand.includes('memorize')) {
        speakMessage("Opening flashcards for your practice session.");
        onNavigationCommand?.('/dashboard/student/flashcards');
        return;
      }
      
      if (lowerCommand.includes('practice') || lowerCommand.includes('test') || lowerCommand.includes('exam')) {
        speakMessage("Let's go to practice exams to test your knowledge.");
        onNavigationCommand?.('/dashboard/student/practice-exam');
        return;
      }
      
      if (lowerCommand.includes('academic advisor') || lowerCommand.includes('guidance')) {
        speakMessage("Connecting you with your AI academic advisor.");
        onNavigationCommand?. ('/dashboard/student/academic');
        return;
      }
    }
    
    // General commands
    if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      const helpMessage = isHomePage 
        ? "I can help you navigate PREPZR, explain features, start your free trial, or answer questions about exam preparation. Try saying 'show me features' or 'start free trial'."
        : "I can help you navigate the dashboard, explain study materials, provide academic guidance, or answer any questions about your preparation. Try saying 'open today's plan' or 'explain this concept'.";
      speakMessage(helpMessage);
      return;
    }
    
    // Default response
    speakMessage("I'm not sure how to help with that. Try asking about specific features or saying 'help' to see what I can do.");
  };

  const startSmartInterventions = () => {
    // Smart intervention after 30 seconds of inactivity
    interventionTimerRef.current = window.setTimeout(() => {
      if (!isSpeaking && settings.smartIntervention) {
        const interventions = [
          "I notice you're browsing the dashboard. Would you like me to explain any features or help you get started with your studies?",
          "Need help finding something? I can guide you to your study materials or explain how to use any feature.",
          "Remember to check your today's plan for your personalized study schedule. I can help you understand your tasks.",
          "If you have any questions about concepts or need study tips, just ask me. I'm here to help!"
        ];
        
        const randomIntervention = interventions[Math.floor(Math.random() * interventions.length)];
        speakMessage(randomIntervention);
      }
    }, 30000);
  };

  const updateSettings = (newSettings: Partial<VoiceAssistantSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <>
      {/* Floating Voice Icon */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          className={`rounded-full p-4 shadow-lg ${
            isSpeaking 
              ? 'bg-green-500 hover:bg-green-600 animate-pulse' 
              : isListening 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
          } text-white`}
          onClick={() => setIsOpen(true)}
        >
          {isSpeaking ? (
            <Volume2 className="h-6 w-6" />
          ) : isListening ? (
            <Mic className="h-6 w-6" />
          ) : (
            <Mic className="h-6 w-6" />
          )}
        </Button>
      </motion.div>

      {/* Voice Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 z-50"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="shadow-xl border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Sakha AI Assistant</CardTitle>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSettings(!showSettings)}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {isHomePage ? "Your PREPZR guide" : "Your study companion"}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Voice Controls */}
                <div className="flex gap-2">
                  <Button
                    variant={isListening ? "destructive" : "default"}
                    size="sm"
                    onClick={isListening ? stopListening : startListening}
                    className="flex-1"
                  >
                    {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                    {isListening ? 'Stop' : 'Listen'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={isSpeaking ? stopSpeaking : () => speakMessage("Hello! I'm ready to assist you.")}
                    className="flex-1"
                  >
                    {isSpeaking ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                    {isSpeaking ? 'Stop' : 'Test'}
                  </Button>
                </div>

                {/* Transcript */}
                {transcript && (
                  <div className="p-2 bg-muted rounded text-sm">
                    <p className="font-medium">You said:</p>
                    <p>"{transcript}"</p>
                  </div>
                )}

                {/* Quick Commands */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Try saying:</p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    {isHomePage ? (
                      <>
                        <p>• "Tell me about PREPZR features"</p>
                        <p>• "Start my free trial"</p>
                        <p>• "Show exam readiness analysis"</p>
                        <p>• "How is PREPZR better?"</p>
                      </>
                    ) : (
                      <>
                        <p>• "Open today's study plan"</p>
                        <p>• "Show me concepts"</p>
                        <p>• "Start practice test"</p>
                        <p>• "Help me with flashcards"</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Settings Panel */}
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 border-t pt-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Voice Assistant</Label>
                        <Switch
                          checked={settings.enabled}
                          onCheckedChange={(enabled) => updateSettings({ enabled })}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label>Auto Greet</Label>
                        <Switch
                          checked={settings.autoGreet}
                          onCheckedChange={(autoGreet) => updateSettings({ autoGreet })}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label>Smart Interventions</Label>
                        <Switch
                          checked={settings.smartIntervention}
                          onCheckedChange={(smartIntervention) => updateSettings({ smartIntervention })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Voice</Label>
                        <Select
                          value={settings.voice}
                          onValueChange={(voice) => updateSettings({ voice })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            {availableVoices.map((voice) => (
                              <SelectItem key={voice.name} value={voice.name}>
                                {voice.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Volume: {settings.volume}%</Label>
                        <Slider
                          value={[settings.volume]}
                          onValueChange={([volume]) => updateSettings({ volume })}
                          max={100}
                          step={1}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Speed: {settings.speed}%</Label>
                        <Slider
                          value={[settings.speed]}
                          onValueChange={([speed]) => updateSettings({ speed })}
                          min={50}
                          max={150}
                          step={1}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Pitch: {settings.pitch}%</Label>
                        <Slider
                          value={[settings.pitch]}
                          onValueChange={([pitch]) => updateSettings({ pitch })}
                          min={50}
                          max={150}
                          step={1}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UnifiedVoiceAssistant;
