import React, { useState } from 'react';
import { Volume2, VolumeX, Mic, MicOff, Settings, X } from 'lucide-react';
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface FloatingVoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigationCommand?: (route: string) => void;
  language?: string;
  userName?: string;
}

const FloatingVoiceAssistant: React.FC<FloatingVoiceAssistantProps> = ({ 
  isOpen, 
  onClose, 
  onNavigationCommand,
  language = 'en-US',
  userName = "Student" 
}) => {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [speed, setSpeed] = useState(50);
  const [pitch, setPitch] = useState(50);
  const [voicePreference, setVoicePreference] = useState("female");
  
  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Voice Unmuted" : "Voice Muted",
      description: isMuted ? "You can now hear PREPZR AI responses" : "PREPZR AI voice responses are now muted",
    });
  };
  
  const handleToggleListening = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      toast({
        title: "PREPZR AI Listening...",
        description: `Hello ${userName}, what can I help you with today?`,
      });
      
      // Simulate stopping listening after 5 seconds
      setTimeout(() => {
        setIsListening(false);
        speakMessage("I'm sorry, I didn't catch that. Could you try again?");
      }, 5000);
    } else {
      // Stop listening
      toast({
        title: "Stopped Listening",
        description: "Voice recognition deactivated",
      });
    }
  };

  const speakMessage = (message: string) => {
    if (!isMuted && 'speechSynthesis' in window) {
      // Create speech synthesis utterance
      const speech = new SpeechSynthesisUtterance();
      
      // Correct PREPZR pronunciation 
      speech.text = message.replace(/PREPZR/gi, 'PREP-zer').replace(/Prepzr/g, 'PREP-zer').replace(/Sakha/gi, 'PREPZR');
      speech.lang = language;
      speech.volume = volume / 100;
      speech.rate = 0.85 + (speed / 100);
      speech.pitch = 0.75 + (pitch / 100) * 0.5;
      
      // Get available voices and prefer female voices
      const voices = window.speechSynthesis.getVoices();
      
      // Filter by gender preference if possible
      const preferredVoices = voices.filter(voice => {
        return voice.name.toLowerCase().includes("female") || 
               !voice.name.toLowerCase().includes("male");
      });
      
      if (preferredVoices.length > 0) {
        speech.voice = preferredVoices[0];
      }
      
      window.speechSynthesis.speak(speech);
    }
  };
  
  return (
    <>
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="max-w-md mx-auto">
          <DrawerHeader>
            <DrawerTitle className="text-xl font-bold">PREPZR AI Voice Assistant</DrawerTitle>
            <DrawerDescription>
              PREPZR's core AI engine to help you crack your exams.
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
                    min={0} 
                    max={100} 
                    step={1}
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
                    min={0} 
                    max={100} 
                    step={1}
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
            <Button variant="outline" onClick={onClose}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FloatingVoiceAssistant;
