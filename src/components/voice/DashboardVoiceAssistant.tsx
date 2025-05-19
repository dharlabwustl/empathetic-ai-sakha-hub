
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Mic, MicOff, Settings } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { MoodType } from '@/types/user/base';
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
          window.speechSynthesis.cancel();
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
          speakText(`Hello ${userName}! I'm your voice assistant. Click my icon anytime you need help.`);
          localStorage.setItem('voice-welcomed', 'true');
        }, 2000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [isFirstTimeUser, selectedVoice, userName, hasSpeechSupport]);
  
  // Function to speak text
  const speakText = (text: string) => {
    if (!hasSpeechSupport || isMuted) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
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
        
        // Simulate response
        speakText("I heard you! Opening your study plan now.");
        
        // Navigate or perform action based on command
        // This would be replaced with actual speech recognition logic
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
  
  // Test voice with sample text
  const handleTestVoice = () => {
    const testText = currentMood 
      ? `Hello ${userName}! I notice you're feeling ${currentMood.toLowerCase()} today. Is there anything I can help with?`
      : `Hello ${userName}! How can I help you today?`;
      
    speakText(testText);
    
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
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Microphone</CardTitle>
                </CardHeader>
                <CardContent>
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
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Speaker</CardTitle>
                </CardHeader>
                <CardContent>
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
              <CardHeader>
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
              <CardHeader>
                <CardTitle className="text-sm">Voice Commands</CardTitle>
                <CardDescription>Try saying these phrases:</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>"Show me my study plan"</li>
                  <li>"Open concept cards"</li>
                  <li>"Start practice exam"</li>
                  <li>"What's my exam readiness score?"</li>
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
