
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Mic, 
  MicOff, 
  X, 
  Settings, 
  Volume2, 
  VolumeX,
  Sliders,
  HelpCircle,
  Music,
  Wand2
} from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Slider
} from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface FloatingVoiceButtonProps {
  userName?: string;
  language?: string;
  onNavigationCommand?: (route: string) => void;
}

const FloatingVoiceButton: React.FC<FloatingVoiceButtonProps> = ({
  userName = 'Student',
  language = 'en-US',
  onNavigationCommand
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(80);
  const [rate, setRate] = useState(50);
  const [pitch, setPitch] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);

  // Load saved settings
  React.useEffect(() => {
    const savedVolume = localStorage.getItem('voice_assistant_volume');
    const savedRate = localStorage.getItem('voice_assistant_rate');
    const savedPitch = localStorage.getItem('voice_assistant_pitch');
    const savedMuted = localStorage.getItem('voice_assistant_muted');
    const savedEnabled = localStorage.getItem('voice_assistant_enabled');
    
    if (savedVolume) setVolume(parseInt(savedVolume));
    if (savedRate) setRate(parseInt(savedRate));
    if (savedPitch) setPitch(parseInt(savedPitch));
    if (savedMuted) setIsMuted(savedMuted === 'true');
    if (savedEnabled) setIsEnabled(savedEnabled === 'true');
  }, []);

  // Save settings when they change
  const saveSettings = (setting: string, value: number | boolean) => {
    localStorage.setItem(`voice_assistant_${setting}`, value.toString());
  };

  const toggleListening = () => {
    if (!isEnabled) {
      toast({
        title: "Voice Assistant Disabled",
        description: "Please enable the voice assistant in settings to use this feature.",
        variant: "destructive",
      });
      return;
    }
    
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }
    
    // @ts-ignore - SpeechRecognition is not in the TypeScript types
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = language;
    
    recognitionRef.current.onstart = () => {
      setIsListening(true);
      toast({
        title: "Listening...",
        description: "Speak now to ask a question or give a command.",
      });
    };
    
    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      processVoiceCommand(transcript);
    };
    
    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error", event);
      setIsListening(false);
      toast({
        title: "Error",
        description: "Could not recognize speech. Please try again.",
        variant: "destructive",
      });
    };
    
    recognitionRef.current.onend = () => {
      setIsListening(false);
    };
    
    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    toast({
      title: "Received Command",
      description: command,
    });
    
    // Handle navigation commands
    if (lowerCommand.includes('go to') || lowerCommand.includes('navigate to') || lowerCommand.includes('open')) {
      if (lowerCommand.includes('dashboard') || lowerCommand.includes('home')) {
        onNavigationCommand && onNavigationCommand('/dashboard/student');
      } else if (lowerCommand.includes('analytics')) {
        onNavigationCommand && onNavigationCommand('/dashboard/student/analytics');
      } else if (lowerCommand.includes('concepts')) {
        onNavigationCommand && onNavigationCommand('/dashboard/student/concepts');
      } else if (lowerCommand.includes('exam')) {
        onNavigationCommand && onNavigationCommand('/dashboard/student/exams');
      } else if (lowerCommand.includes('settings')) {
        onNavigationCommand && onNavigationCommand('/dashboard/student/settings');
      } else if (lowerCommand.includes('feel good') || lowerCommand.includes('feelgood')) {
        onNavigationCommand && onNavigationCommand('/dashboard/student/feel-good');
      }
    }
    
    // Handle other commands like explaining or helping
    else if (lowerCommand.includes('explain') || lowerCommand.includes('what is') || lowerCommand.includes('how to')) {
      speakResponse(`I'll help explain that. ${command.replace('explain', '')} is an important concept. You can find more details in the concepts section.`);
    }
    // Add more command handlers here
    else {
      speakResponse("I'm sorry, I didn't understand that command. You can ask me to navigate to different sections or explain concepts.");
    }
  };

  const speakResponse = (text: string) => {
    if (!isEnabled || isMuted) return;
    
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = volume / 100;
      utterance.rate = 0.5 + (rate / 100) * 1.5; // Range 0.5 to 2
      utterance.pitch = 0.5 + (pitch / 100) * 1.5; // Range 0.5 to 2
      utterance.lang = language;
      
      // Get available voices
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find a preferred voice
      const preferredVoiceNames = ['Google US English Female', 'Microsoft Zira', 'Samantha', 'en-US'];
      let selectedVoice = voices.find(v => 
        preferredVoiceNames.some(name => 
          v.name?.toLowerCase().includes(name.toLowerCase()) || 
          v.lang?.toLowerCase().includes(name.toLowerCase())
        )
      );
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    saveSettings('muted', newMutedState);
    
    // Dispatch custom event for other voice components
    if (newMutedState) {
      document.dispatchEvent(new CustomEvent('voice-assistant-mute'));
    } else {
      document.dispatchEvent(new CustomEvent('voice-assistant-unmute'));
    }
    
    toast({
      title: newMutedState ? "Voice Assistant Muted" : "Voice Assistant Unmuted",
      description: newMutedState ? 
        "Voice announcements are now muted" : 
        "Voice announcements are now active",
    });
  };

  const toggleEnabled = () => {
    const newEnabledState = !isEnabled;
    setIsEnabled(newEnabledState);
    saveSettings('enabled', newEnabledState);
    
    if (!newEnabledState) {
      setIsListening(false);
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    }
    
    toast({
      title: newEnabledState ? "Voice Assistant Enabled" : "Voice Assistant Disabled",
      description: newEnabledState ? 
        "You can now use voice commands" : 
        "Voice assistant features are now disabled",
    });
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-20 right-6 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            style={{ width: showSettings ? 300 : 250, maxWidth: '90vw' }}
          >
            <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-medium flex items-center">
                {showSettings ? (
                  <>
                    <Sliders className="w-4 h-4 mr-2" />
                    Voice Settings
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 mr-2" />
                    Voice Assistant
                  </>
                )}
              </h3>
              
              <div className="flex space-x-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  {showSettings ? <Mic className="h-4 w-4" /> : <Settings className="h-4 w-4" />}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {showSettings ? (
              <div className="p-4 space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enable-voice" className="flex items-center space-x-2">
                      <Wand2 className="h-4 w-4" />
                      <span>Enable Voice Assistant</span>
                    </Label>
                    <Switch 
                      id="enable-voice"
                      checked={isEnabled}
                      onCheckedChange={(checked) => {
                        toggleEnabled();
                      }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="mute-voice" className="flex items-center space-x-2">
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      <span>Mute Voice</span>
                    </Label>
                    <Switch 
                      id="mute-voice"
                      checked={isMuted}
                      onCheckedChange={(checked) => {
                        toggleMute();
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="volume-slider" className="flex items-center justify-between">
                      <span>Volume</span>
                      <span className="text-sm text-muted-foreground">{volume}%</span>
                    </Label>
                    <Slider 
                      id="volume-slider"
                      value={[volume]}
                      min={0} 
                      max={100} 
                      step={5}
                      onValueChange={(value) => {
                        setVolume(value[0]);
                        saveSettings('volume', value[0]);
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rate-slider" className="flex items-center justify-between">
                      <span>Speaking Rate</span>
                      <span className="text-sm text-muted-foreground">{rate < 50 ? 'Slower' : rate > 50 ? 'Faster' : 'Normal'}</span>
                    </Label>
                    <Slider 
                      id="rate-slider"
                      value={[rate]}
                      min={0} 
                      max={100} 
                      step={5}
                      onValueChange={(value) => {
                        setRate(value[0]);
                        saveSettings('rate', value[0]);
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pitch-slider" className="flex items-center justify-between">
                      <span>Voice Pitch</span>
                      <span className="text-sm text-muted-foreground">{pitch < 50 ? 'Lower' : pitch > 50 ? 'Higher' : 'Normal'}</span>
                    </Label>
                    <Slider 
                      id="pitch-slider"
                      value={[pitch]}
                      min={0} 
                      max={100} 
                      step={5}
                      onValueChange={(value) => {
                        setPitch(value[0]);
                        saveSettings('pitch', value[0]);
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <div className="text-center mb-4">
                  <motion.div
                    animate={isListening ? { 
                      scale: [1, 1.2, 1], 
                      opacity: [0.7, 1, 0.7] 
                    } : {}}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="inline-flex items-center justify-center p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30"
                  >
                    {isListening ? (
                      <Mic className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    ) : (
                      <HelpCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    )}
                  </motion.div>
                  
                  <h4 className="font-medium mt-3">
                    {isListening ? "Listening..." : "How can I help you?"}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground mt-1">
                    {isListening 
                      ? "Speak clearly into your microphone" 
                      : "Press the button and ask a question"}
                  </p>
                </div>
                
                <div className="text-sm text-muted-foreground mb-3">
                  <p>Try saying:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-1">
                    <li>"Go to concepts"</li>
                    <li>"Navigate to analytics"</li>
                    <li>"Explain this concept"</li>
                  </ul>
                </div>
                
                <Button 
                  className="w-full flex items-center justify-center gap-2"
                  variant={isListening ? "destructive" : "default"}
                  onClick={toggleListening}
                  disabled={!isEnabled}
                >
                  {isListening ? (
                    <>
                      <MicOff className="h-4 w-4" />
                      Stop Listening
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4" />
                      Start Listening
                    </>
                  )}
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Floating button */}
      <motion.div 
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring" }}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="icon"
              className={`rounded-full h-12 w-12 shadow-lg flex items-center justify-center ${
                isListening 
                  ? "bg-red-500 hover:bg-red-600 animate-pulse" 
                  : isOpen 
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <motion.div
                animate={isListening ? { scale: [1, 1.2, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                {isListening ? (
                  <Mic className="h-5 w-5 text-white" />
                ) : (
                  <Volume2 className="h-5 w-5 text-white" />
                )}
              </motion.div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60" align="end">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Voice Assistant</h4>
                <p className="text-xs text-muted-foreground">Click the button to activate the voice assistant.</p>
              </div>
              <div className="flex items-center">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                >
                  {isOpen ? "Close Assistant" : "Open Assistant"}
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </motion.div>
    </>
  );
};

export default FloatingVoiceButton;
