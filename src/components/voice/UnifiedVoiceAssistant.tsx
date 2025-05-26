
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Mic, MicOff, Settings, X, MessageCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UnifiedVoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigationCommand?: (route: string) => void;
  language?: string;
  userName?: string;
  context?: 'homepage' | 'dashboard' | 'learning';
}

const UnifiedVoiceAssistant: React.FC<UnifiedVoiceAssistantProps> = ({ 
  isOpen, 
  onClose, 
  onNavigationCommand,
  language = 'en-US',
  userName = "Student",
  context = 'homepage'
}) => {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [speed, setSpeed] = useState(50);
  const [pitch, setPitch] = useState(50);
  const [voicePreference, setVoicePreference] = useState("female");
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<number | null>(null);
  
  // Context-aware greetings and responses
  const getContextualGreeting = () => {
    switch (context) {
      case 'homepage':
        return `Hello ${userName}! Welcome to PREPZR, India's most advanced AI-powered exam preparation platform. I'm Sakha AI, your personal learning assistant. How can I help you today?`;
      case 'dashboard':
        return `Welcome back ${userName}! I'm here to help you navigate your dashboard, track your progress, and optimize your study plan. What would you like to explore?`;
      case 'learning':
        return `Hi ${userName}! I'm here to support your learning journey. I can help you understand concepts, create flashcards, or answer any study-related questions.`;
      default:
        return `Hello ${userName}! I'm Sakha AI, your intelligent study companion. How can I assist you?`;
    }
  };

  const getContextualCommands = () => {
    const commonCommands = [
      "Tell me about PREPZR",
      "Help me with voice settings",
      "What can you help me with?"
    ];

    switch (context) {
      case 'homepage':
        return [
          ...commonCommands,
          "Start free trial",
          "Sign up for PREPZR",
          "Analyze exam readiness",
          "Show me features",
          "Why choose PREPZR?",
          "Login to dashboard"
        ];
      case 'dashboard':
        return [
          ...commonCommands,
          "Show my study plan",
          "Open concept cards",
          "Start practice exam",
          "Check my progress",
          "Open flashcards",
          "Go to today's plan",
          "Academic advisor",
          "Feel good corner",
          "Formula lab"
        ];
      case 'learning':
        return [
          ...commonCommands,
          "Explain this concept",
          "Create flashcard",
          "Test my knowledge",
          "Show related topics",
          "Get study tips"
        ];
      default:
        return commonCommands;
    }
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    localStorage.setItem('unified_voice_muted', (!isMuted).toString());
    
    toast({
      title: isMuted ? "Voice Unmuted" : "Voice Muted",
      description: isMuted ? "Sakha AI can now speak to you" : "Sakha AI voice responses are now muted",
    });
  };
  
  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive"
      });
      return;
    }

    try {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language;
      
      recognition.onstart = () => {
        setIsListening(true);
        toast({
          title: "Listening...",
          description: "Speak your command now",
        });
      };
      
      recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        setTranscript(result);
        setIsProcessing(true);
        processVoiceCommand(result);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Recognition Error",
          description: "Could not understand. Please try again.",
          variant: "destructive"
        });
      };
      
      recognition.onend = () => {
        setIsListening(false);
        setIsProcessing(false);
      };
      
      recognition.start();
      recognitionRef.current = recognition;
      
    } catch (error) {
      console.error('Error starting recognition:', error);
      toast({
        title: "Error",
        description: "Failed to start voice recognition",
        variant: "destructive"
      });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
  };

  const speakMessage = (message: string) => {
    if (!isMuted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const speech = new SpeechSynthesisUtterance();
      speech.text = message.replace(/PREPZR/gi, 'PREP-zer');
      speech.lang = language;
      speech.volume = volume / 100;
      speech.rate = 0.85 + (speed / 100) * 0.3;
      speech.pitch = 0.75 + (pitch / 100) * 0.5;
      
      const voices = window.speechSynthesis.getVoices();
      const preferredVoices = voices.filter(voice => {
        if (voicePreference === "female") {
          return voice.name.toLowerCase().includes("female") || 
                !voice.name.toLowerCase().includes("male");
        } else {
          return voice.name.toLowerCase().includes("male");
        }
      });
      
      if (preferredVoices.length > 0) {
        speech.voice = preferredVoices[0];
      }
      
      window.speechSynthesis.speak(speech);
    }
  };

  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Context-specific command processing
    if (context === 'homepage') {
      if (lowerCommand.includes('free trial') || lowerCommand.includes('trial')) {
        speakMessage("I'll help you start your free trial. Let me take you to the signup page.");
        onNavigationCommand?.('/signup');
        return;
      }
      
      if (lowerCommand.includes('sign up') || lowerCommand.includes('signup')) {
        speakMessage("Great choice! Let me take you to the signup page to get started with PREPZR.");
        onNavigationCommand?.('/signup');
        return;
      }
      
      if (lowerCommand.includes('exam readiness') || lowerCommand.includes('analyze')) {
        speakMessage("I'll open the exam readiness analyzer to evaluate your preparation level.");
        window.dispatchEvent(new Event('open-exam-analyzer'));
        return;
      }
      
      if (lowerCommand.includes('features') || lowerCommand.includes('what can prepzr do')) {
        speakMessage("PREPZR offers AI-powered personalized learning, emotional intelligence tracking, adaptive study plans, interactive concept cards, practice exams, and much more. Would you like me to show you specific features?");
        return;
      }
      
      if (lowerCommand.includes('why prepzr') || lowerCommand.includes('better')) {
        speakMessage("PREPZR is India's first emotionally intelligent exam prep platform. We adapt to your mood, learning style, and progress to create truly personalized study experiences. Our AI ensures you study smarter, not harder.");
        return;
      }
    }
    
    if (context === 'dashboard') {
      if (lowerCommand.includes('study plan')) {
        speakMessage("Opening your personalized study plan now.");
        // Trigger study plan
        return;
      }
      
      if (lowerCommand.includes('concept') || lowerCommand.includes('concepts')) {
        speakMessage("Taking you to concept cards where you can learn interactively.");
        onNavigationCommand?.('/dashboard/student/concepts');
        return;
      }
      
      if (lowerCommand.includes('flashcard') || lowerCommand.includes('flashcards')) {
        speakMessage("Opening your flashcards for quick revision.");
        onNavigationCommand?.('/dashboard/student/flashcards');
        return;
      }
      
      if (lowerCommand.includes('exam') || lowerCommand.includes('practice')) {
        speakMessage("Let's start a practice exam to test your knowledge.");
        onNavigationCommand?.('/dashboard/student/practice-exam');
        return;
      }
      
      if (lowerCommand.includes('today') || lowerCommand.includes('plan')) {
        speakMessage("Here's your personalized study plan for today.");
        onNavigationCommand?.('/dashboard/student/todays-plan');
        return;
      }
      
      if (lowerCommand.includes('feel good') || lowerCommand.includes('break') || lowerCommand.includes('stress')) {
        speakMessage("Taking you to the feel good corner for some relaxation and motivation.");
        onNavigationCommand?.('/dashboard/student/feel-good-corner');
        return;
      }
    }
    
    // Common commands for all contexts
    if (lowerCommand.includes('prepzr') || lowerCommand.includes('about')) {
      speakMessage("PREPZR is India's most advanced AI-powered exam preparation platform. We use emotional intelligence and adaptive learning to help students excel in competitive exams like NEET, JEE, and more.");
      return;
    }
    
    // Default response
    speakMessage("I'm not sure how to help with that. Try asking about PREPZR features, study plans, or use the suggested commands.");
  };

  // Load settings from localStorage
  useEffect(() => {
    const savedMuted = localStorage.getItem('unified_voice_muted');
    if (savedMuted) {
      setIsMuted(savedMuted === 'true');
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-purple-500" />
            Sakha AI Assistant
          </DialogTitle>
          <DialogDescription>
            Your intelligent companion for {context === 'homepage' ? 'exploring PREPZR' : context === 'dashboard' ? 'dashboard navigation' : 'learning support'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Current Status */}
          {(isListening || isProcessing) && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">
                    {isListening ? 'Listening...' : 'Processing...'}
                  </span>
                </div>
                {transcript && (
                  <p className="text-sm text-gray-600 mt-1">"{transcript}"</p>
                )}
              </CardContent>
            </Card>
          )}
          
          {/* Voice Controls */}
          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={handleToggleListening}
              variant={isListening ? "destructive" : "default"}
              className="h-12"
              disabled={isProcessing}
            >
              {isListening ? (
                <><MicOff className="mr-2 h-4 w-4" /> Stop</>
              ) : (
                <><Mic className="mr-2 h-4 w-4" /> Listen</>
              )}
            </Button>
            
            <Button 
              onClick={handleToggleMute}
              variant="outline"
              className="h-12"
            >
              {isMuted ? (
                <><VolumeX className="mr-2 h-4 w-4" /> Unmute</>
              ) : (
                <><Volume2 className="mr-2 h-4 w-4" /> Mute</>
              )}
            </Button>
          </div>
          
          {/* Voice Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Voice Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="voice-volume">Volume</Label>
                  <span className="text-sm text-muted-foreground">{volume}%</span>
                </div>
                <Slider 
                  id="voice-volume"
                  min={0} 
                  max={100} 
                  step={1}
                  value={[volume]}
                  onValueChange={(values) => setVolume(values[0])}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="voice-speed">Speed</Label>
                  <span className="text-sm text-muted-foreground">{speed}%</span>
                </div>
                <Slider 
                  id="voice-speed"
                  min={0} 
                  max={100} 
                  step={1}
                  value={[speed]}
                  onValueChange={(values) => setSpeed(values[0])}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Voice Type</Label>
                <Select value={voicePreference} onValueChange={setVoicePreference}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Female Voice</SelectItem>
                    <SelectItem value="male">Male Voice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          {/* Suggested Commands */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Try These Commands</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {getContextualCommands().slice(0, 6).map((command, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    size="sm"
                    className="justify-start text-left h-auto py-2 px-3"
                    onClick={() => {
                      speakMessage(command);
                      processVoiceCommand(command);
                    }}
                  >
                    "{command}"
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={() => speakMessage(getContextualGreeting())}>
            <Volume2 className="mr-2 h-4 w-4" />
            Play Greeting
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UnifiedVoiceAssistant;
