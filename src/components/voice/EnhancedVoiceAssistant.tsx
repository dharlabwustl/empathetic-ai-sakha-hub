
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Settings,
  X,
  MessageSquare, 
  Play,
  Pause,
  HelpCircle,
  Menu
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import TourGuide from '@/components/dashboard/student/tour/TourGuide';
import { 
  LANGUAGE_OPTIONS, 
  SupportedLanguage,
  getPreferredAccent,
  savePreferredAccent,
  getVoiceAssistantMessages
} from '@/components/dashboard/student/voice/voiceUtils';

interface EnhancedVoiceAssistantProps {
  userName?: string;
  currentScreen?: string;
  onNavigationCommand?: (route: string) => void;
}

const EnhancedVoiceAssistant: React.FC<EnhancedVoiceAssistantProps> = ({ 
  userName = "Student", 
  currentScreen = "dashboard", 
  onNavigationCommand 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [volume, setVolume] = useState(80);
  const [pitch, setPitch] = useState(50);
  const [rate, setRate] = useState(50);
  const [showTourGuide, setShowTourGuide] = useState(false);
  const [language, setLanguage] = useState<SupportedLanguage>(getPreferredAccent());
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [suggestions] = useState([
    "What's on my study plan today?",
    "Show me concepts for Physics",
    "Take me to practice exams",
    "What's my progress in Chemistry?",
    "How to use flashcards?",
    "Take me to the formula lab",
    "Show me my exam schedule",
    "What should I focus on today?",
    "How do I improve in Biology?"
  ]);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const recognitionRef = useRef<any>(null);
  const synth = window.speechSynthesis;
  
  // On component mount, initialize speech synthesis
  useEffect(() => {
    // Load available voices
    const loadVoices = () => {
      const voices = synth.getVoices();
      setAvailableVoices(voices);
      
      // Try to find a matching voice for the selected language
      const langVoices = voices.filter(voice => voice.lang.startsWith(language));
      if (langVoices.length > 0) {
        setSelectedVoice(langVoices[0]);
      }
    };
    
    // Check if voices are already available
    if (synth.getVoices().length > 0) {
      loadVoices();
    }
    
    // Chrome loads voices asynchronously
    synth.onvoiceschanged = loadVoices;
    
    // Cleanup
    return () => {
      synth.onvoiceschanged = null;
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);
  
  // When language changes, find matching voices
  useEffect(() => {
    if (availableVoices.length > 0) {
      const langVoices = availableVoices.filter(voice => voice.lang.startsWith(language));
      if (langVoices.length > 0) {
        setSelectedVoice(langVoices[0]);
      } else {
        setSelectedVoice(null);
      }
    }
    
    // Save language preference
    savePreferredAccent(language);
  }, [language, availableVoices]);
  
  // Initialize speech recognition
  const initializeSpeechRecognition = () => {
    // Check if the browser supports Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition. Try Chrome or Edge.",
        variant: "destructive"
      });
      return false;
    }
    
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = language;
    
    recognition.onstart = () => {
      setIsListening(true);
      setTranscript("");
    };
    
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map(result => result.transcript)
        .join('');
      
      setTranscript(transcript);
      
      // If this is a final result
      if (event.results[0].isFinal) {
        processVoiceCommand(transcript);
      }
    };
    
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      
      toast({
        title: "Voice Recognition Error",
        description: `Error: ${event.error}. Please try again.`,
        variant: "destructive"
      });
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognitionRef.current = recognition;
    return true;
  };
  
  // Start listening for voice commands
  const startListening = () => {
    if (!recognitionRef.current) {
      if (!initializeSpeechRecognition()) {
        return;
      }
    }
    
    try {
      recognitionRef.current.start();
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      toast({
        title: "Failed to Start Listening",
        description: "There was an error starting voice recognition. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Stop listening
  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Failed to stop speech recognition:', error);
      }
    }
    setIsListening(false);
  };
  
  // Process the voice command
  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Check for tour guide request
    if (lowerCommand.includes('tour') || lowerCommand.includes('guide') || lowerCommand.includes('show me around')) {
      respondToCommand("Opening the tour guide...");
      setShowTourGuide(true);
      return;
    }
    
    // Check for navigation requests
    if (lowerCommand.includes('take me to') || lowerCommand.includes('go to') || lowerCommand.includes('open') || lowerCommand.includes('show me')) {
      handleNavigationCommand(lowerCommand);
      return;
    }
    
    // Check for help requests
    if (lowerCommand.includes('help') || lowerCommand.includes('how to')) {
      handleHelpCommand(lowerCommand);
      return;
    }
    
    // Check for study plan requests
    if (lowerCommand.includes('study plan') || lowerCommand.includes('today\'s plan') || lowerCommand.includes('schedule')) {
      respondToCommand("Let me check your study plan for today...");
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student/today');
      }
      return;
    }
    
    // Generic response for unrecognized commands
    respondToCommand(`I heard: "${command}". How can I help you with that?`);
  };
  
  // Handle navigation commands
  const handleNavigationCommand = (command: string) => {
    if (!onNavigationCommand) return;
    
    // Check for different sections
    if (command.includes('dashboard') || command.includes('home')) {
      respondToCommand("Taking you to your dashboard...");
      onNavigationCommand('/dashboard/student');
      return;
    }
    
    if (command.includes('concept') || command.includes('topics')) {
      respondToCommand("Opening concept cards for you...");
      onNavigationCommand('/dashboard/student/concepts');
      return;
    }
    
    if (command.includes('flashcard')) {
      respondToCommand("Taking you to flashcards section...");
      onNavigationCommand('/dashboard/student/flashcards');
      return;
    }
    
    if (command.includes('practice') || command.includes('exam') || command.includes('test')) {
      respondToCommand("Opening practice exams...");
      onNavigationCommand('/dashboard/student/practice-exam');
      return;
    }
    
    if (command.includes('today') || command.includes('plan') || command.includes('schedule')) {
      respondToCommand("Here's your study plan for today...");
      onNavigationCommand('/dashboard/student/today');
      return;
    }
    
    if (command.includes('formula') || command.includes('lab')) {
      respondToCommand("Opening the formula lab...");
      onNavigationCommand('/dashboard/student/formula-lab');
      return;
    }
    
    if (command.includes('community') || command.includes('chat')) {
      respondToCommand("Taking you to the student community...");
      onNavigationCommand('/dashboard/student/community');
      return;
    }
    
    // Generic navigation response
    respondToCommand("I'm not sure where you want to go. Could you be more specific?");
  };
  
  // Handle help commands
  const handleHelpCommand = (command: string) => {
    if (command.includes('flashcard')) {
      respondToCommand("Flashcards help you memorize key concepts. You can create your own or use the pre-made ones. Swipe right if you know the answer, left if you need more practice.");
      return;
    }
    
    if (command.includes('practice exam') || command.includes('test')) {
      respondToCommand("Practice exams simulate real test conditions. Choose a subject or take a full exam, and get detailed performance analytics afterward.");
      return;
    }
    
    if (command.includes('formula') || command.includes('lab')) {
      respondToCommand("The Formula Lab helps you master complex formulas with interactive tools and step-by-step solutions.");
      return;
    }
    
    // Generic help response
    respondToCommand("I can help you navigate the platform, explain features, or provide study tips. What specifically do you need help with?");
  };
  
  // Respond to the user's command
  const respondToCommand = (message: string) => {
    setResponse(message);
    
    // Speak the response unless muted
    if (!isMuted) {
      speakText(message);
    }
  };
  
  // Speak text using selected voice and settings
  const speakText = (text: string) => {
    // Cancel any ongoing speech
    synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Apply selected voice and settings
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    utterance.volume = volume / 100;
    utterance.pitch = 0.8 + (pitch / 100) * 0.4; // Convert 0-100 to 0.8-1.2
    utterance.rate = 0.8 + (rate / 100) * 0.4; // Convert 0-100 to 0.8-1.2
    utterance.lang = language;
    
    // Events
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synth.speak(utterance);
  };
  
  // Toggle mute state
  const toggleMute = () => {
    // If currently speaking and toggling to muted, stop speech
    if (isSpeaking && !isMuted) {
      synth.cancel();
    }
    
    setIsMuted(!isMuted);
    
    toast({
      title: isMuted ? "Voice Unmuted" : "Voice Muted",
      description: isMuted ? "You will now hear voice responses" : "Voice responses are now muted"
    });
  };
  
  // Speak a welcome message when opening the assistant
  const speakWelcome = () => {
    const welcomeMessage = getVoiceAssistantMessages(currentScreen, language);
    speakText(welcomeMessage);
  };
  
  // Handle the suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setTranscript(suggestion);
    processVoiceCommand(suggestion);
  };
  
  // Handle language change
  const handleLanguageChange = (value: string) => {
    setLanguage(value as SupportedLanguage);
    
    toast({
      title: "Language Changed",
      description: `Voice assistant language set to ${
        LANGUAGE_OPTIONS.find(option => option.value === value)?.label || value
      }`
    });
  };
  
  // Open the assistant
  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      speakWelcome();
    }, 300);
  };
  
  // Close the assistant
  const handleClose = () => {
    // Stop any ongoing speech and recognition
    synth.cancel();
    if (recognitionRef.current && isListening) {
      stopListening();
    }
    
    setIsOpen(false);
  };
  
  // Open the tour guide
  const handleOpenTourGuide = () => {
    setShowTourGuide(true);
    setIsOpen(false);
  };
  
  const renderContent = () => (
    <div className="space-y-6">
      {/* Voice Response Area */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-muted-foreground">Sakha AI Assistant</p>
          {isSpeaking && (
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse mr-1"></div>
              <span className="text-xs text-blue-500">Speaking...</span>
            </div>
          )}
        </div>
        
        <div className="mb-3">
          {response ? (
            <p className="text-base">{response}</p>
          ) : (
            <p className="text-muted-foreground italic">
              {isListening 
                ? "Listening..." 
                : "How can I help you today?"}
            </p>
          )}
        </div>
        
        {transcript && (
          <div className="text-sm bg-muted p-2 rounded border border-border">
            <p className="font-medium text-xs text-muted-foreground">You said:</p>
            <p>{transcript}</p>
          </div>
        )}
      </div>
      
      {/* Quick Actions */}
      <div>
        <h3 className="text-sm font-medium mb-2">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Button 
            variant="outline" 
            className="justify-start" 
            onClick={() => onNavigationCommand && onNavigationCommand('/dashboard/student/today')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Today's Plan
          </Button>
          <Button 
            variant="outline"
            className="justify-start"
            onClick={() => onNavigationCommand && onNavigationCommand('/dashboard/student/concepts')}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Concepts
          </Button>
          <Button 
            variant="outline"
            className="justify-start"
            onClick={handleOpenTourGuide}
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Tour Guide
          </Button>
          <Button 
            variant="outline"
            className="justify-start"
            onClick={() => speakText("How can I help you today? You can ask me to navigate to different sections or get help with specific features.")}
          >
            <Play className="w-4 h-4 mr-2" />
            Voice Help
          </Button>
        </div>
      </div>
      
      {/* Voice Control Buttons */}
      <div className="flex space-x-2">
        <Button 
          className={`flex-1 ${isListening ? 'bg-red-500 hover:bg-red-600' : ''}`} 
          onClick={isListening ? stopListening : startListening}
        >
          {isListening ? (
            <><MicOff className="mr-2 h-4 w-4" /> Stop Listening</>
          ) : (
            <><Mic className="mr-2 h-4 w-4" /> Start Listening</>
          )}
        </Button>
        
        <Button variant="outline" onClick={toggleMute} className="flex-1">
          {isMuted ? (
            <><VolumeX className="mr-2 h-4 w-4" /> Unmute</>
          ) : (
            <><Volume2 className="mr-2 h-4 w-4" /> Mute</>
          )}
        </Button>
      </div>
      
      {/* Suggestions */}
      <div>
        <h3 className="text-sm font-medium mb-2">Try saying...</h3>
        <div className="grid grid-cols-1 gap-2">
          {suggestions.slice(0, 5).map((suggestion, index) => (
            <Button 
              key={index}
              variant="ghost"
              className="justify-start h-auto py-1.5 text-sm font-normal"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              "{suggestion}"
            </Button>
          ))}
        </div>
      </div>
      
      {/* Language Selection */}
      <div className="space-y-2">
        <Label htmlFor="voice-language">Voice Language</Label>
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger id="voice-language">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGE_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="text-xs text-muted-foreground mt-1">
          Voice language will be saved for future sessions
        </div>
      </div>
      
      {/* Voice Settings */}
      <div>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="voice-volume">Volume</Label>
              <span className="text-sm text-muted-foreground">{volume}%</span>
            </div>
            <Slider 
              id="voice-volume" 
              min={0} 
              max={100} 
              step={1}
              value={[volume]}
              onValueChange={(val) => setVolume(val[0])}
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="voice-pitch">Pitch</Label>
              <span className="text-sm text-muted-foreground">{pitch}%</span>
            </div>
            <Slider 
              id="voice-pitch" 
              min={0} 
              max={100} 
              step={1}
              value={[pitch]}
              onValueChange={(val) => setPitch(val[0])}
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="voice-rate">Speaking Rate</Label>
              <span className="text-sm text-muted-foreground">{rate}%</span>
            </div>
            <Slider 
              id="voice-rate" 
              min={0} 
              max={100} 
              step={1}
              value={[rate]}
              onValueChange={(val) => setRate(val[0])}
            />
          </div>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => speakText("This is a test of the voice settings. How does this sound?")}
            disabled={isSpeaking}
          >
            Test Voice Settings
          </Button>
        </div>
      </div>
    </div>
  );
  
  return (
    <>
      {/* Floating Action Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 p-3 text-white shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="mr-1 text-sm font-medium">Voice Assistant</span>
            </motion.button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ask Sakha AI for help</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {/* Voice Assistant Dialog or Drawer based on screen size */}
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={handleClose}>
          <DrawerContent className="max-h-[90vh]">
            <DrawerHeader className="flex items-center justify-between">
              <div>
                <DrawerTitle>Voice Assistant</DrawerTitle>
                <DrawerDescription>Ask Sakha AI for help with your studies</DrawerDescription>
              </div>
              <Button variant="ghost" size="sm" className="rounded-full p-0 w-8 h-8" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>
            </DrawerHeader>
            <div className="px-4 pb-4 overflow-y-auto">
              {renderContent()}
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isOpen} onOpenChange={handleClose}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Voice Assistant</DialogTitle>
              <DialogDescription>Ask Sakha AI for help with your studies</DialogDescription>
            </DialogHeader>
            {renderContent()}
          </DialogContent>
        </Dialog>
      )}
      
      {/* Tour Guide Dialog */}
      <TourGuide isOpen={showTourGuide} onClose={() => setShowTourGuide(false)} />
    </>
  );
};

export default EnhancedVoiceAssistant;
