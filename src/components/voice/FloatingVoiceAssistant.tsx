
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Mic, MicOff, Settings, Volume2, VolumeX, X, HelpCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { motion } from "framer-motion";
import { SUPPORTED_LANGUAGES } from '@/utils/voiceUtils';

interface FloatingVoiceAssistantProps {
  isOpen?: boolean;
  onClose?: () => void;
  language?: string;
  onNavigationCommand?: (route: string) => void;
  onMoodCommand?: (mood: string) => void;
  pronouncePrepzr?: boolean;
}

const FloatingVoiceAssistant: React.FC<FloatingVoiceAssistantProps> = ({
  isOpen = false,
  onClose,
  language = 'en-IN',
  onNavigationCommand,
  onMoodCommand,
  pronouncePrepzr = true
}) => {
  const [open, setOpen] = useState(isOpen);
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  const [assistantMode, setAssistantMode] = useState<'listening' | 'speaking' | 'idle'>('idle');
  const [showHelpPanel, setShowHelpPanel] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  
  const {
    voiceSettings,
    updateVoiceSettings,
    toggleVoiceEnabled,
    toggleMute,
    speakMessage,
    isVoiceSupported,
    isSpeaking,
    cancelSpeech,
  } = useVoiceAnnouncer({
    lang: language
  });

  // Update local open state when the isOpen prop changes
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  // Update the mode based on the voice announcer state
  useEffect(() => {
    if (isListening) {
      setAssistantMode('listening');
    } else if (isSpeaking) {
      setAssistantMode('speaking');
    } else {
      setAssistantMode('idle');
    }
  }, [isListening, isSpeaking]);

  const handleClose = () => {
    setOpen(false);
    stopListening();
    if (onClose) onClose();
  };

  const handleSettingsClick = () => {
    setIsSettingsPanelOpen(true);
  };

  const handleHelpClick = () => {
    setShowHelpPanel(true);
  };

  // Initialize speech recognition
  useEffect(() => {
    const initSpeechRecognition = () => {
      if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
        console.warn("Speech recognition not supported by this browser");
        return false;
      }
      
      // @ts-ignore - Need to use this because TypeScript doesn't have these types
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = voiceSettings.language;
      
      recognitionRef.current.onresult = (event: any) => {
        const result = event.results[0][0].transcript;
        console.log("Recognized speech:", result);
        setTranscript(result);
        processVoiceCommand(result);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };
      
      return true;
    };
    
    initSpeechRecognition();
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [voiceSettings.language]);

  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript('');
      recognitionRef.current.start();
      setIsListening(true);
    } else {
      console.error("Speech recognition not initialized");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    updateVoiceSettings({ volume: value[0] });
  };

  const handleRateChange = (value: number[]) => {
    updateVoiceSettings({ rate: value[0] });
  };

  const handlePitchChange = (value: number[]) => {
    updateVoiceSettings({ pitch: value[0] });
  };

  const handleLanguageChange = (value: string) => {
    updateVoiceSettings({ language: value });
  };

  // Process voice commands
  const processVoiceCommand = (command: string) => {
    if (!command) return;
    
    const lowerCommand = command.toLowerCase();
    
    // Helper function to speak responses
    const respond = (text: string) => {
      speakMessage(text);
    };
    
    // Navigation commands
    if (lowerCommand.includes('go to dashboard') || lowerCommand.includes('open dashboard')) {
      respond('Opening the dashboard for you.');
      if (onNavigationCommand) onNavigationCommand('/dashboard/student');
      return;
    }
    
    if (lowerCommand.includes('go to study plan') || lowerCommand.includes('open study plan')) {
      respond('Opening your study plan.');
      if (onNavigationCommand) onNavigationCommand('/dashboard/student/study-plan');
      return;
    }
    
    if (lowerCommand.includes('go to practice') || lowerCommand.includes('open practice tests') || lowerCommand.includes('practice test')) {
      respond('Opening practice tests for you.');
      if (onNavigationCommand) onNavigationCommand('/dashboard/student/practice');
      return;
    }
    
    if ((lowerCommand.includes('go to concept') || lowerCommand.includes('open concept')) || 
        lowerCommand.includes('concept card')) {
      respond('Opening the concepts section.');
      if (onNavigationCommand) onNavigationCommand('/dashboard/student/concepts');
      return;
    }
    
    if (lowerCommand.includes('analytics') || lowerCommand.includes('show analytics')) {
      respond('Opening your analytics dashboard.');
      if (onNavigationCommand) onNavigationCommand('/dashboard/student/analytics');
      return;
    }
    
    if (lowerCommand.includes('formula') || lowerCommand.includes('formulas')) {
      respond('Opening the formula section for you.');
      if (onNavigationCommand) onNavigationCommand('/dashboard/student/formulas');
      return;
    }
    
    if (lowerCommand.includes('flashcard') || lowerCommand.includes('flash card')) {
      respond('Opening the flashcards section.');
      if (onNavigationCommand) onNavigationCommand('/dashboard/student/flashcards');
      return;
    }
    
    if (lowerCommand.includes('today') || lowerCommand.includes('today\'s plan')) {
      respond('Opening your today\'s study plan.');
      if (onNavigationCommand) onNavigationCommand('/dashboard/student/todays-plan');
      return;
    }
    
    if (lowerCommand.includes('feel good') || lowerCommand.includes('feel-good corner')) {
      respond('Opening the feel good corner to boost your mood.');
      if (onNavigationCommand) onNavigationCommand('/dashboard/student/feel-good-corner');
      return;
    }
    
    if (lowerCommand.includes('academic advisor') || lowerCommand.includes('advisor')) {
      respond('Opening your academic advisor.');
      if (onNavigationCommand) onNavigationCommand('/dashboard/student/academic-advisor');
      return;
    }
    
    // Exam readiness test command
    if (lowerCommand.includes('exam readiness') || lowerCommand.includes('readiness test')) {
      respond('Opening the exam readiness test.');
      window.dispatchEvent(new Event('open-exam-analyzer'));
      return;
    }

    // Mood commands
    if (lowerCommand.includes('feeling') || lowerCommand.includes('mood')) {
      if (lowerCommand.includes('happy')) {
        respond("I'm glad you're feeling happy! That's a great state for productive studying.");
        if (onMoodCommand) onMoodCommand('happy');
      } else if (lowerCommand.includes('tired')) {
        respond("If you're feeling tired, consider taking a short break before continuing your studies.");
        if (onMoodCommand) onMoodCommand('tired');
      } else if (lowerCommand.includes('motivated')) {
        respond("Great to hear you're feeling motivated! This is the perfect time to tackle challenging topics.");
        if (onMoodCommand) onMoodCommand('motivated');
      } else if (lowerCommand.includes('stressed')) {
        respond("I understand you're feeling stressed. Let's focus on deep breathing and tackling one concept at a time.");
        if (onMoodCommand) onMoodCommand('stressed');
      } else if (lowerCommand.includes('confused')) {
        respond("If you're feeling confused, let's break down concepts into smaller, more manageable parts.");
        if (onMoodCommand) onMoodCommand('confused');
      }
      return;
    }
    
    // NEET exam specific commands
    if (lowerCommand.includes('neet')) {
      if (lowerCommand.includes('syllabus') || lowerCommand.includes('curriculum')) {
        respond("The NEET exam syllabus covers Physics, Chemistry, Botany, and Zoology from classes 11 and 12. Would you like me to show you the detailed syllabus?");
      } else if (lowerCommand.includes('date') || lowerCommand.includes('when')) {
        respond("The NEET exam is typically held in May. For the exact date of the upcoming exam, please check the official NTA website.");
      } else if (lowerCommand.includes('preparation') || lowerCommand.includes('prepare')) {
        respond("To prepare for NEET, you should focus on understanding concepts thoroughly, practicing with previous years' questions, and taking regular mock tests. Would you like to see our NEET preparation plan?");
      } else {
        respond("NEET is the National Eligibility cum Entrance Test for admission to medical courses in India. How can I help you with your NEET preparation?");
      }
      return;
    }
    
    // Generic responses for educational questions
    if (lowerCommand.includes('help with') || lowerCommand.includes('explain')) {
      if (lowerCommand.includes('physics')) {
        respond("I can help you with Physics concepts. Please check out our Physics concept cards and video explanations in the dashboard.");
      } else if (lowerCommand.includes('chemistry')) {
        respond("For Chemistry help, I recommend our interactive flashcards and concept breakdowns. Would you like me to show you those resources?");
      } else if (lowerCommand.includes('biology') || lowerCommand.includes('zoology') || lowerCommand.includes('botany')) {
        respond("Our Biology resources include detailed diagrams, concept cards, and practice questions. Let's explore those together.");
      } else {
        respond("I'd be happy to explain any concepts you're struggling with. Please check our concept cards section for detailed explanations.");
      }
      return;
    }
    
    // If no specific command is recognized
    respond("I heard you say: " + command + ". How can I help you with your exam preparation today?");
  };

  // Test voice with custom pronunciation handling
  const handleTestVoice = () => {
    if (voiceSettings.muted) {
      toggleMute(false);
    }
    speakMessage("Hello, I'm your PREPZR voice assistant. How can I help you today?");
  };

  // Example commands for the help panel
  const exampleCommands = [
    "Go to Dashboard",
    "Open Study Plan",
    "I'm feeling motivated today",
    "Show me my analytics",
    "Open practice tests",
    "What's my next exam?",
    "I need help with Chemistry",
  ];

  if (!isVoiceSupported) {
    return null;
  }

  return (
    <>
      {/* Main assistant interface */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md overflow-hidden py-0 px-0" onInteractOutside={(e) => {
          // Don't close when clicking outside to avoid accidental closures during voice interactions
          e.preventDefault();
        }}>
          <DialogHeader className="p-4 border-b">
            <div className="flex items-center justify-between w-full">
              <DialogTitle className="flex items-center gap-2">
                <span className="text-lg font-semibold">Voice Assistant</span>
                {assistantMode === 'listening' && (
                  <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full animate-pulse">Listening...</span>
                )}
                {assistantMode === 'speaking' && (
                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full animate-pulse">Speaking...</span>
                )}
              </DialogTitle>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={handleHelpClick}>
                  <HelpCircle className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleSettingsClick}>
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="p-4 h-[300px] overflow-y-auto space-y-4 bg-slate-50 dark:bg-slate-900">
            {transcript && (
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 animate-fade-in">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">You said:</p>
                <p className="text-sm text-blue-600 dark:text-blue-300">{transcript}</p>
              </div>
            )}
            
            <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3">
              <p className="text-sm font-medium text-green-800 dark:text-green-200">Assistant:</p>
              <p className="text-sm text-green-600 dark:text-green-300">
                How can I help you with PREPZR today? You can ask me to navigate to different parts of the app or provide study assistance.
              </p>
            </div>
            
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              <p>Try saying one of these commands:</p>
              <div className="mt-2 flex flex-wrap gap-2 justify-center">
                {exampleCommands.slice(0, 3).map((command, index) => (
                  <div 
                    key={index}
                    className="bg-white dark:bg-slate-800 px-2 py-1 rounded-md text-xs border border-gray-200 dark:border-gray-700"
                  >
                    "{command}"
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <CardFooter className="border-t p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between w-full">
              <Button
                variant="outline"
                size="sm"
                className={voiceSettings.muted ? "text-gray-400" : ""}
                onClick={() => toggleMute()}
              >
                {voiceSettings.muted ? <VolumeX className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />}
                {voiceSettings.muted ? "Unmute" : "Mute"}
              </Button>

              <div className="flex gap-2">
                <Button
                  variant={isListening ? "destructive" : "default"}
                  size="sm"
                  onClick={isListening ? stopListening : startListening}
                >
                  {isListening ? (
                    <>
                      <MicOff className="mr-2 h-4 w-4" /> Stop
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-4 w-4" /> Start Listening
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="w-full text-center">
              <Button 
                variant="link" 
                size="sm" 
                className="text-xs text-gray-500"
                onClick={handleClose}
              >
                Minimize Assistant
              </Button>
            </div>
          </CardFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Panel Dialog */}
      <Dialog open={isSettingsPanelOpen} onOpenChange={setIsSettingsPanelOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Voice Assistant Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="voice-enabled">Voice Assistant Enabled</Label>
              <Switch 
                id="voice-enabled" 
                checked={voiceSettings.enabled}
                onCheckedChange={(checked) => updateVoiceSettings({ enabled: checked })}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Assistant Voice Language</Label>
              <Select
                value={voiceSettings.language}
                onValueChange={handleLanguageChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="volume-slider">Volume: {voiceSettings.volume.toFixed(1)}</Label>
              </div>
              <Slider
                id="volume-slider"
                value={[voiceSettings.volume]}
                max={1}
                step={0.1}
                onValueChange={handleVolumeChange}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="rate-slider">Speech Rate: {voiceSettings.rate.toFixed(1)}x</Label>
              </div>
              <Slider
                id="rate-slider"
                value={[voiceSettings.rate]}
                min={0.5}
                max={2}
                step={0.1}
                onValueChange={handleRateChange}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="pitch-slider">Pitch: {voiceSettings.pitch.toFixed(1)}</Label>
              </div>
              <Slider
                id="pitch-slider"
                value={[voiceSettings.pitch]}
                min={0.5}
                max={2}
                step={0.1}
                onValueChange={handlePitchChange}
              />
            </div>
            
            <Button onClick={handleTestVoice} className="w-full">
              Test Voice
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Help Panel Dialog */}
      <Dialog open={showHelpPanel} onOpenChange={setShowHelpPanel}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Voice Assistant Help</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-sm text-muted-foreground">
              The voice assistant can help you navigate PREPZR and provide study assistance.
              Here are some commands you can try:
            </p>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Navigation Commands:</h4>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>"Go to Dashboard"</li>
                <li>"Open Study Plan"</li>
                <li>"Show me my Analytics"</li>
                <li>"Open Practice Tests"</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Mood Tracking:</h4>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>"I'm feeling motivated today"</li>
                <li>"I feel tired"</li>
                <li>"I'm stressed about my exam"</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Study Assistance:</h4>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>"What should I study today?"</li>
                <li>"Help me with Physics concepts"</li>
                <li>"Create a flashcard for [topic]"</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating button when assistant is minimized */}
      {!open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={() => setOpen(true)}
            size="lg"
            className={`rounded-full p-4 shadow-lg ${
              assistantMode === 'listening'
                ? 'bg-red-500 hover:bg-red-600'
                : assistantMode === 'speaking'
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
            }`}
          >
            {assistantMode === 'listening' ? (
              <Mic className="h-6 w-6 animate-pulse" />
            ) : assistantMode === 'speaking' ? (
              <Volume2 className="h-6 w-6 animate-pulse" />
            ) : (
              <Mic className="h-6 w-6" />
            )}
          </Button>
        </motion.div>
      )}
    </>
  );
};

export default FloatingVoiceAssistant;
