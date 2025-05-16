
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Settings, Volume2, VolumeX, X, Globe, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { MoodType } from '@/types/user/base';

interface EnhancedVoiceAssistantProps {
  userName?: string;
  language?: string;
  onMoodChange?: (mood: MoodType) => void;
  onNavigate?: (route: string) => void;
  isFloating?: boolean;
  hideFloatingButton?: boolean;
  autoGreet?: boolean;
}

export const EnhancedVoiceAssistant: React.FC<EnhancedVoiceAssistantProps> = ({
  userName = 'Student',
  language = 'en-IN',
  onMoodChange,
  onNavigate,
  isFloating = true,
  hideFloatingButton = false,
  autoGreet = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [rate, setRate] = useState(0.9);
  const [pitch, setPitch] = useState(1.1);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [voiceMuted, setVoiceMuted] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<string>(language);
  const [suggestions] = useState([
    "Change my mood to motivated",
    "Take me to my dashboard",
    "Show me my study plan",
    "What's on my schedule today?",
    "Open formula practice",
    "Tell me about PREPZR"
  ]);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      // @ts-ignore - TypeScript doesn't know about webkitSpeechRecognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = currentLanguage;

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setTranscript(transcript);
        
        // Process final results
        if (event.results[0].isFinal) {
          processVoiceCommand(transcript);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: `Error: ${event.error}. Please try again.`,
          variant: "destructive"
        });
      };
    }

    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    // Cleanup
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        stopListening();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [currentLanguage]);

  // Auto-greeting effect
  useEffect(() => {
    if (autoGreet && voiceEnabled && !voiceMuted) {
      const timer = setTimeout(() => {
        const greeting = getTimeBasedGreeting();
        const message = `${greeting}, ${userName}! Welcome to PREPZR. I'm your voice assistant. How can I help you today?`;
        speakMessage(message);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [autoGreet, userName, voiceEnabled, voiceMuted]);

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setTranscript('');
      } catch (error) {
        console.error('Error starting recognition:', error);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
        setIsListening(false);
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
    }
  };

  const speakMessage = (text: string) => {
    if (!synthRef.current || voiceMuted || !voiceEnabled) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language
    utterance.lang = currentLanguage;
    
    // Set other properties
    utterance.volume = volume;
    utterance.rate = rate;
    utterance.pitch = pitch;
    
    // Find an appropriate voice based on the language
    const voices = synthRef.current.getVoices();
    const preferredVoices = voices.filter(voice => voice.lang.includes(currentLanguage.split('-')[0]));
    
    // For Indian English (en-IN), find a female voice if available
    if (currentLanguage === 'en-IN') {
      const indianVoice = voices.find(v => 
        v.name.includes('Indian') || 
        v.name.includes('Hindi') ||
        v.lang === 'hi-IN' ||
        v.lang === 'en-IN'
      );
      
      if (indianVoice) {
        utterance.voice = indianVoice;
      } else if (preferredVoices.length) {
        utterance.voice = preferredVoices[0];
      }
    } else if (preferredVoices.length) {
      // Try to use a voice matching the requested language
      utterance.voice = preferredVoices[0];
    }
    
    // Event handlers
    utterance.onstart = () => {
      setIsSpeaking(true);
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error', event);
      setIsSpeaking(false);
    };
    
    // Speak the message
    synthRef.current.speak(utterance);
  };

  const toggleMute = () => {
    setVoiceMuted(!voiceMuted);
    if (isSpeaking && !voiceMuted && synthRef.current) {
      synthRef.current.cancel();
    }
  };

  const toggleVoiceEnabled = () => {
    setVoiceEnabled(!voiceEnabled);
    if (isSpeaking && synthRef.current) {
      synthRef.current.cancel();
    }
  };

  const handleLanguageChange = (newLang: string) => {
    setCurrentLanguage(newLang);
    if (recognitionRef.current) {
      recognitionRef.current.lang = newLang;
    }
    
    // When changing to Hindi, play a greeting in Hindi
    if (newLang === 'hi-IN') {
      speakMessage("नमस्ते! मैं आपका वॉइस असिस्टेंट हूँ। मैं अब हिंदी में बात करूंगा।");
    } else if (newLang === 'en-IN') {
      speakMessage("Hello! I'm your voice assistant with an Indian accent.");
    } else {
      speakMessage(`Language changed to ${getLanguageLabel(newLang)}.`);
    }
  };

  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Mood related commands
    if (lowerCommand.includes('mood') || lowerCommand.includes('feeling')) {
      processMoodCommand(lowerCommand);
    }
    // Navigation commands
    else if (lowerCommand.includes('dashboard') || lowerCommand.includes('take me')) {
      processNavigationCommand(lowerCommand);
    }
    // Study plan commands
    else if (lowerCommand.includes('study plan') || lowerCommand.includes('schedule')) {
      if (onNavigate) {
        speakMessage("Opening your study plan now");
        onNavigate('/dashboard/student/study-plan');
      }
    }
    // Help command
    else if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      speakMessage("I can help you navigate the app, change your mood, check your study plan, and provide information about PREPZR. Try saying 'Take me to my dashboard' or 'Change my mood to motivated'.");
    }
    // About PREPZR command
    else if (lowerCommand.includes('about prepzr') || lowerCommand.includes('tell me about prepzr')) {
      speakMessage("PREPZR is your personalized exam preparation assistant. We use smart data analysis to customize your study plan and help you prepare effectively for your exams.");
    }
    // Fallback response
    else {
      speakMessage("I'm not sure how to help with that. Try asking about your mood, study plan, or navigation.");
    }
  };

  const processMoodCommand = (command: string) => {
    if (!onMoodChange) return;
    
    const moodMap: Record<string, MoodType> = {
      'happy': MoodType.HAPPY,
      'sad': MoodType.SAD,
      'tired': MoodType.TIRED,
      'energized': MoodType.MOTIVATED,
      'motivated': MoodType.MOTIVATED,
      'focused': MoodType.FOCUSED,
      'calm': MoodType.CALM,
      'anxious': MoodType.ANXIOUS,
      'stressed': MoodType.STRESSED,
      'confused': MoodType.CONFUSED,
      'overwhelmed': MoodType.OVERWHELMED
    };
    
    for (const [keyword, mood] of Object.entries(moodMap)) {
      if (command.includes(keyword)) {
        onMoodChange(mood);
        speakMessage(`I've updated your mood to ${keyword}.`);
        return;
      }
    }
    
    speakMessage("I didn't catch what mood you'd like to set. Try saying something like 'I'm feeling motivated'.");
  };

  const processNavigationCommand = (command: string) => {
    if (!onNavigate) return;
    
    const routeMap: Record<string, string> = {
      'dashboard': '/dashboard/student',
      'study plan': '/dashboard/student/study-plan',
      'formula': '/dashboard/student/formula-practice',
      'practice': '/dashboard/student/practice-exam',
      'concept': '/dashboard/student/concepts',
      'flashcard': '/dashboard/student/flashcards',
      'profile': '/dashboard/student/profile'
    };
    
    for (const [keyword, route] of Object.entries(routeMap)) {
      if (command.includes(keyword)) {
        speakMessage(`Taking you to ${keyword}.`);
        onNavigate(route);
        return;
      }
    }
    
    speakMessage("I'm not sure where you'd like to go. Try saying something like 'Take me to my dashboard'.");
  };

  const getTimeBasedGreeting = (): string => {
    const hour = new Date().getHours();
    
    if (hour < 12) {
      return "Good morning";
    } else if (hour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  const getLanguageLabel = (langCode: string): string => {
    const languages: Record<string, string> = {
      'en-US': 'English (US)',
      'en-GB': 'English (UK)',
      'en-IN': 'English (India)',
      'hi-IN': 'Hindi',
      'es-ES': 'Spanish',
      'fr-FR': 'French',
      'de-DE': 'German'
    };
    
    return languages[langCode] || langCode;
  };

  const handleTrySuggestion = (suggestion: string) => {
    setTranscript(suggestion);
    processVoiceCommand(suggestion);
  };

  const handleTestVoice = () => {
    const testMessage = currentLanguage === 'hi-IN'
      ? "नमस्ते! मैं आपका सहायक हूँ। मैं आपकी मदद के लिए यहां हूँ।"
      : `Hello ${userName}! I'm your PREPZR assistant. I'm here to help you prepare for your exams.`;
      
    speakMessage(testMessage);
  };

  // Floating button for voice assistant
  const floatingButton = (
    <motion.button
      className={`${hideFloatingButton ? 'hidden' : 'flex'} items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleAssistant}
      aria-label="Voice Assistant"
    >
      {isSpeaking ? (
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1 }}>
          <Volume2 size={22} />
        </motion.div>
      ) : isListening ? (
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <Mic size={22} className="text-red-100" />
        </motion.div>
      ) : (
        <MessageSquare size={22} />
      )}
      <span className="font-medium">Assistant</span>
    </motion.button>
  );

  // Voice assistant panel content
  const assistantPanel = (
    <Card className="w-80 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Globe size={16} />
          <span>Voice Assistant</span>
          <Badge variant="outline" className="text-xs">
            {getLanguageLabel(currentLanguage)}
          </Badge>
        </CardTitle>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setSettingsOpen(true)}>
            <Settings size={14} />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleAssistant}>
            <X size={16} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pb-4">
        {/* Transcript display */}
        {transcript && (
          <div className="bg-muted p-2 rounded-md text-sm">
            <p className="text-sm font-semibold">You said:</p>
            <p>{transcript}</p>
          </div>
        )}
        
        {/* Voice status indicators */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Voice Assistant</span>
            <Switch
              checked={voiceEnabled}
              onCheckedChange={toggleVoiceEnabled}
              aria-label="Toggle voice assistant"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Mute Voice</span>
            <Switch
              checked={voiceMuted}
              onCheckedChange={toggleMute}
              aria-label="Mute voice"
              disabled={!voiceEnabled}
            />
          </div>
        </div>
        
        {/* Voice controls */}
        <div className="flex gap-2">
          <Button 
            onClick={startListening}
            disabled={isListening || !voiceEnabled}
            className="flex-1"
            variant={isListening ? "secondary" : "default"}
          >
            <Mic size={16} className="mr-2" />
            Listen
          </Button>
          
          <Button
            onClick={stopListening}
            disabled={!isListening}
            variant="destructive"
            className="flex-1"
          >
            <MicOff size={16} className="mr-2" />
            Stop
          </Button>
        </div>
        
        {/* Language selector */}
        <div className="space-y-1">
          <Label className="text-xs">Language</Label>
          <Select 
            value={currentLanguage}
            onValueChange={handleLanguageChange}
            disabled={isSpeaking}
          >
            <SelectTrigger className="w-full h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-IN">English (India)</SelectItem>
              <SelectItem value="hi-IN">Hindi</SelectItem>
              <SelectItem value="en-US">English (US)</SelectItem>
              <SelectItem value="en-GB">English (UK)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Suggested commands */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">Try saying:</p>
          <div className="grid grid-cols-2 gap-2">
            {suggestions.slice(0, 4).map((suggestion, index) => (
              <Button 
                key={index}
                variant="ghost"
                size="sm"
                className="h-auto py-1 text-xs justify-start font-normal text-left"
                onClick={() => handleTrySuggestion(suggestion)}
              >
                "{suggestion}"
              </Button>
            ))}
          </div>
        </div>
        
        <Button onClick={handleTestVoice} className="w-full">Test Voice</Button>
      </CardContent>
    </Card>
  );

  // Settings dialog content
  const settingsDialog = (
    <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Voice Assistant Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="voice-volume">Volume: {volume.toFixed(1)}</Label>
            <Slider
              id="voice-volume"
              min={0}
              max={1}
              step={0.1}
              value={[volume]}
              onValueChange={([v]) => setVolume(v)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="voice-rate">Speed: {rate.toFixed(1)}</Label>
            <Slider
              id="voice-rate"
              min={0.5}
              max={2}
              step={0.1}
              value={[rate]}
              onValueChange={([r]) => setRate(r)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="voice-pitch">Pitch: {pitch.toFixed(1)}</Label>
            <Slider
              id="voice-pitch"
              min={0.5}
              max={2}
              step={0.1}
              value={[pitch]}
              onValueChange={([p]) => setPitch(p)}
            />
          </div>
          
          <Button onClick={handleTestVoice} className="w-full">
            Test These Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  // If not floating, just return the content
  if (!isFloating) {
    return (
      <>
        {assistantPanel}
        {settingsDialog}
      </>
    );
  }

  // For floating mode, handle the animation and positioning
  return (
    <>
      <div className={`fixed ${isOpen ? 'bottom-24' : 'bottom-6'} right-6 z-50`}>
        {!hideFloatingButton && floatingButton}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed bottom-24 right-6 z-50"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            {assistantPanel}
          </motion.div>
        )}
      </AnimatePresence>
      
      {settingsDialog}
    </>
  );
};

export default EnhancedVoiceAssistant;
