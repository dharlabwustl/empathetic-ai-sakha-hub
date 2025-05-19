
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Mic, MicOff, Settings } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { MoodType } from '@/types/user/base';
import { useLocation } from 'react-router-dom';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardVoiceAssistantProps {
  userName?: string;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  isFirstTimeUser?: boolean;
}

const DashboardVoiceAssistant: React.FC<DashboardVoiceAssistantProps> = ({ 
  userName = "student",
  currentMood,
  onMoodChange,
  isFirstTimeUser = false
}) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [speed, setSpeed] = useState(50);
  const [pitch, setPitch] = useState(50);
  const [voicePreference, setVoicePreference] = useState("female");
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [lastSpokenContext, setLastSpokenContext] = useState<string | null>(null);
  const location = useLocation();
  
  // Context-aware welcome messages based on page URL
  const getContextMessage = () => {
    const path = location.pathname;
    
    if (path.includes('/dashboard/student/overview') || path === '/dashboard/student') {
      return `Welcome to your dashboard, ${userName}. Here you can see your overall progress and key metrics. Would you like a quick tour of your dashboard features?`;
    } 
    else if (path.includes('/dashboard/student/today')) {
      return `This is your daily study plan, ${userName}. I've organized concepts, flashcards, and practice tests based on your learning priorities. Which topic would you like to start with today?`;
    }
    else if (path.includes('/dashboard/student/concepts')) {
      return `This is your concept library, ${userName}. You can explore detailed explanations, take notes, and practice with related resources. Is there a specific concept you'd like to learn more about?`;
    }
    else if (path.includes('/dashboard/student/concept-study')) {
      return `Here you can deeply study this concept. You can read the explanations, watch video lessons, take notes, and practice with questions. Would you like me to read the content aloud for you?`;
    }
    else if (path.includes('/dashboard/student/flashcards')) {
      return `Welcome to your flashcards, ${userName}. Spaced repetition is one of the most effective study techniques. Would you like me to guide you through an effective flashcard session?`;
    }
    else if (path.includes('/dashboard/student/practice-exam')) {
      return `This is the practice exam section, ${userName}. Regular testing improves retention and reveals knowledge gaps. Would you like some tips for maximizing your practice exam effectiveness?`;
    }
    else if (path.includes('/dashboard/student/analytics')) {
      return `Here are your analytics, ${userName}. You can track your progress, understand your strengths and weaknesses, and see how your study habits affect your performance.`;
    }
    else if (path.includes('/dashboard/student/feel-good-corner')) {
      return `Welcome to the Feel Good Corner, ${userName}. Taking breaks and managing stress is important for effective learning. Would you like me to suggest a quick mindfulness exercise?`;
    }
    
    return `Hello ${userName}. I'm your Prep-zer voice assistant. How can I help you with your studies today?`;
  };
  
  // Check if browser supports speech synthesis
  const hasSpeechSupport = typeof window !== 'undefined' && 'speechSynthesis' in window;
  
  // Initialize speech synthesis and load available voices
  useEffect(() => {
    if (hasSpeechSupport) {
      // Load available voices
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        
        // Try to find a preferred voice
        let voice = null;
        
        if (voicePreference === "female") {
          voice = voices.find(v => 
            v.name.toLowerCase().includes('female') || 
            v.name.toLowerCase().includes('woman') ||
            v.name.toLowerCase().includes('girl') ||
            (v.name.toLowerCase().includes('google') && v.lang.includes('en'))
          );
        } else {
          voice = voices.find(v => 
            v.name.toLowerCase().includes('male') || 
            v.name.toLowerCase().includes('man') || 
            v.name.toLowerCase().includes('boy')
          );
        }
        
        if (!voice && voices.length > 0) {
          // Default to first English voice
          voice = voices.find(v => v.lang.startsWith('en')) || voices[0];
        }
        
        if (voice) {
          setSelectedVoice(voice);
        }
      };
      
      loadVoices();
      
      // Chrome loads voices asynchronously
      window.speechSynthesis.onvoiceschanged = loadVoices;
      
      // Clean up
      return () => {
        if (window.speechSynthesis) {
          window.speechSynthesis.onvoiceschanged = null;
        }
      };
    }
  }, [voicePreference, hasSpeechSupport]);
  
  // Welcome new users with voice assistant after they've seen the tour
  useEffect(() => {
    if (isFirstTimeUser && hasSpeechSupport) {
      const hasBeenWelcomed = localStorage.getItem('voice-welcomed');
      
      if (!hasBeenWelcomed && selectedVoice) {
        // Wait a bit after tour completes
        const timer = setTimeout(() => {
          const welcomeMessage = `Congratulations on joining Prep-zer, ${userName}! You've just taken the smartest step toward your success. Would you like a quick tour of your dashboard?`;
          speakText(welcomeMessage);
          localStorage.setItem('voice-welcomed', 'true');
        }, 2000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [isFirstTimeUser, selectedVoice, userName, hasSpeechSupport]);
  
  // Monitor location changes to provide context-aware assistance
  useEffect(() => {
    const currentPath = location.pathname;
    const currentContext = currentPath.split('/').pop() || 'dashboard';
    
    // Only speak when context changes and not on first render
    if (lastSpokenContext !== null && lastSpokenContext !== currentContext && !isMuted && hasSpeechSupport) {
      const contextMessage = getContextMessage();
      speakText(contextMessage);
    }
    
    setLastSpokenContext(currentContext);
  }, [location.pathname]);
  
  // Function to speak text with proper PREPZR pronunciation
  const speakText = (text: string) => {
    if (!hasSpeechSupport || isMuted) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Fix pronunciation for PREPZR
    const correctedText = text
      .replace(/PREPZR/gi, 'Prep-zer')
      .replace(/prepzr/gi, 'Prep-zer')
      .replace(/Prepzr/g, 'Prep-zer');
    
    const utterance = new SpeechSynthesisUtterance(correctedText);
    
    // Apply voice settings
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    utterance.volume = volume / 100;
    utterance.rate = speed / 50; // Convert to range 0.5-1.5
    utterance.pitch = pitch / 50; // Convert to range 0.5-1.5
    
    // Speak
    window.speechSynthesis.speak(utterance);
    
    // Show toast
    toast({
      title: "Voice Assistant Speaking",
      description: text.length > 50 ? `${text.substring(0, 50)}...` : text,
    });
  };
  
  // Function to start listening
  const handleToggleListening = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      toast({
        title: "Listening...",
        description: "Say a command like 'Show my study plan'",
      });
      
      // Simulate stopping listening after 5 seconds
      setTimeout(() => {
        setIsListening(false);
        
        // Simulate response based on current page context
        const contextResponse = location.pathname.includes('today') 
          ? "I heard you! Let me explain your study plan. It's designed based on your learning style and goals."
          : "I heard you! Opening your study plan now.";
          
        speakText(contextResponse);
      }, 5000);
    }
  };
  
  // Function to toggle mute
  const handleToggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    
    toast({
      title: newMuted ? "Voice Muted" : "Voice Unmuted",
      description: newMuted ? "Voice assistant will not speak" : "Voice assistant can speak now",
    });
    
    if (window.speechSynthesis && newMuted) {
      window.speechSynthesis.cancel();
    }
  };
  
  // Test voice with context-aware message
  const handleTestVoice = () => {
    const contextMessage = getContextMessage();
    speakText(contextMessage);
    
    // Mark as tested in localStorage
    localStorage.setItem('voice-tested', 'true');
  };
  
  return (
    <>
      {/* Floating button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="secondary"
              className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 z-50"
              onClick={() => setIsOpen(true)}
            >
              <Volume2 className="h-6 w-6 text-white" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open Voice Assistant</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Voice Assistant Drawer */}
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="max-w-md mx-auto">
          <DrawerHeader>
            <DrawerTitle className="text-xl font-bold">Voice Assistant</DrawerTitle>
            <DrawerDescription>
              Control your voice assistant settings and interactions.
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="px-4">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <Button 
                    onClick={handleToggleListening}
                    variant={isListening ? "destructive" : "secondary"}
                    className="w-full"
                  >
                    {isListening ? (
                      <><MicOff className="mr-2 h-4 w-4" /> Stop Listening</>
                    ) : (
                      <><Mic className="mr-2 h-4 w-4" /> Start Listening</>
                    )}
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <Button 
                    onClick={handleToggleMute}
                    variant="outline"
                    className="w-full"
                  >
                    {isMuted ? (
                      <><VolumeX className="mr-2 h-4 w-4" /> Unmute</>
                    ) : (
                      <><Volume2 className="mr-2 h-4 w-4" /> Mute</>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
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
                    <Label htmlFor="voice-speed">Speaking Speed</Label>
                    <span className="text-sm text-muted-foreground">{speed}%</span>
                  </div>
                  <Slider 
                    id="voice-speed"
                    min={25} 
                    max={200} 
                    step={5}
                    value={[speed]}
                    onValueChange={(values) => setSpeed(values[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="voice-pitch">Voice Pitch</Label>
                    <span className="text-sm text-muted-foreground">{pitch}%</span>
                  </div>
                  <Slider 
                    id="voice-pitch"
                    min={25} 
                    max={150} 
                    step={5}
                    value={[pitch]}
                    onValueChange={(values) => setPitch(values[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Voice Preference</Label>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="voice-male"
                        checked={voicePreference === "male"}
                        onCheckedChange={() => setVoicePreference("male")}
                      />
                      <Label htmlFor="voice-male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="voice-female"
                        checked={voicePreference === "female"}
                        onCheckedChange={() => setVoicePreference("female")}
                      />
                      <Label htmlFor="voice-female">Female</Label>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleTestVoice}
                  className="w-full mt-2"
                  variant="default"
                >
                  Test Voice
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <p className="font-medium mb-2">Try saying these phrases:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>"Show me my study plan"</li>
                  <li>"Open concept cards"</li>
                  <li>"Start practice exam"</li>
                  <li>"What's my exam readiness score?"</li>
                  <li>"Read this content aloud"</li>
                  <li>"I'm feeling stressed today"</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <DrawerFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DashboardVoiceAssistant;
