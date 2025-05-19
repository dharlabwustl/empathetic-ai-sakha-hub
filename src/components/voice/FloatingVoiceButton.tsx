
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Settings,
  X,
  ChevronRight,
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FloatingVoiceButtonProps {
  userName?: string;
  language?: string;
  onNavigationCommand?: (route: string) => void;
}

const FloatingVoiceButton: React.FC<FloatingVoiceButtonProps> = ({
  userName = "Student",
  language = "en-US",
  onNavigationCommand
}) => {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showControls, setShowControls] = useState(false);
  
  // Voice settings
  const [volume, setVolume] = useState(80);
  const [speed, setSpeed] = useState(50);
  const [pitch, setPitch] = useState(50);
  const [voicePreference, setVoicePreference] = useState("female");
  
  const handleToggleListen = () => {
    setIsListening(!isListening);
    setIsAnimating(true);
    
    if (!isListening) {
      // Start listening
      toast({
        title: "Voice Assistant Activated",
        description: `Listening for commands. How can I help you, ${userName}?`,
      });
      
      // Simulate stopping after 5 seconds (in a real app, this would be replaced by actual speech recognition)
      setTimeout(() => {
        setIsListening(false);
        setIsAnimating(false);
        speakResponse("I'm sorry, I didn't catch that. Could you try again?");
      }, 5000);
    } else {
      // Stop listening
      setIsAnimating(false);
      toast({
        title: "Voice Assistant Deactivated",
        description: "No longer listening for commands.",
      });
    }
  };
  
  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Voice Unmuted" : "Voice Muted",
      description: isMuted 
        ? "Voice responses are now enabled" 
        : "Voice responses are now muted"
    });
  };
  
  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };
  
  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
  };
  
  const speakResponse = (text: string) => {
    if (isMuted || !('speechSynthesis' in window)) return;
    
    try {
      // Create speech synthesis utterance
      const speech = new SpeechSynthesisUtterance();
      speech.text = text.replace(/PREPZR/gi, 'PREP-zer').replace(/Prepzr/g, 'PREP-zer');
      speech.volume = volume / 100;
      speech.rate = 0.85 + (speed / 100);
      speech.pitch = 0.75 + (pitch / 100) * 0.5;
      speech.lang = language;
      
      // Get available voices
      const voices = window.speechSynthesis.getVoices();
      
      // Filter by gender preference if possible
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
    } catch (error) {
      console.error("Error with speech synthesis:", error);
    }
  };
  
  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <TooltipProvider>
          <div className="relative">
            {/* Main Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowControls(!showControls)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
                    isAnimating
                      ? "animate-pulse bg-red-500"
                      : "bg-gradient-to-r from-purple-600 to-indigo-600"
                  } text-white`}
                >
                  <Volume2 size={24} />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Voice Assistant</p>
              </TooltipContent>
            </Tooltip>

            {/* Quick Action Buttons */}
            <AnimatePresence>
              {showControls && (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: -160 }}
                  exit={{ opacity: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="absolute bottom-0 right-0 space-y-3 items-end flex flex-col"
                >
                  {/* Settings Button */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleOpenSettings}
                          className="w-10 h-10 rounded-full shadow-md flex items-center justify-center bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                        >
                          <Settings size={18} />
                        </motion.button>
                      </TooltipTrigger>
                      <TooltipContent side="left">
                        <p>Voice Settings</p>
                      </TooltipContent>
                    </Tooltip>
                  </motion.div>

                  {/* Mute/Unmute Button */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleToggleMute}
                          className="w-10 h-10 rounded-full shadow-md flex items-center justify-center bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                        >
                          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </motion.button>
                      </TooltipTrigger>
                      <TooltipContent side="left">
                        <p>{isMuted ? "Unmute Voice" : "Mute Voice"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </motion.div>

                  {/* Microphone Button */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleToggleListen}
                          className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center ${
                            isListening
                              ? "bg-red-500 text-white"
                              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                        </motion.button>
                      </TooltipTrigger>
                      <TooltipContent side="left">
                        <p>{isListening ? "Stop Listening" : "Start Listening"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </motion.div>

                  {/* Close Controls Button */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setShowControls(false)}
                          className="w-10 h-10 rounded-full shadow-md flex items-center justify-center bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                        >
                          <X size={18} />
                        </motion.button>
                      </TooltipTrigger>
                      <TooltipContent side="left">
                        <p>Close Controls</p>
                      </TooltipContent>
                    </Tooltip>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </TooltipProvider>
      </div>

      {/* Voice Settings Drawer */}
      <Drawer open={isSettingsOpen} onOpenChange={handleCloseSettings}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Voice Assistant Settings</DrawerTitle>
            <DrawerDescription>
              Customize how your voice assistant sounds and behaves
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="px-4 py-2 space-y-6">
            <div className="space-y-4">
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
              
              <div className="pt-4">
                <h4 className="mb-2 text-sm font-medium">Voice Commands Examples</h4>
                <div className="bg-muted p-3 rounded-md">
                  <ul className="text-sm space-y-1.5">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-3 w-3 text-blue-500" />
                      "Show my study plan for today"
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-3 w-3 text-blue-500" />
                      "Open concept cards for physics"
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="h-3 w-3 text-blue-500" />
                      "What's my exam readiness score?"
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <DrawerFooter>
            <Button onClick={() => {
              // Test voice with current settings
              speakResponse(`Hello ${userName}, this is how I sound with your current settings. Is this okay?`);
            }}>
              Test Voice
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FloatingVoiceButton;
