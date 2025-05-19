
import React, { useState, useEffect } from 'react';
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
  language = "en-US",
  userName = "student" 
}) => {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [volume, setVolume] = useState(80);
  const [speed, setSpeed] = useState(50);
  const [pitch, setPitch] = useState(50);
  const [voicePreference, setVoicePreference] = useState("female");
  const [showSettings, setShowSettings] = useState(false);
  
  // Initialize speech recognition if supported
  useEffect(() => {
    if (isOpen) {
      // Welcome message
      const welcomeMessage = `Hello ${userName}, I'm Sakha AI, your exam preparation assistant. I support UN Sustainability Goal 4 for inclusive and quality education for all. How can I help you today?`;
      speakText(welcomeMessage);
      setResponse(welcomeMessage);
    }
    
    return () => {
      // Cancel any ongoing speech when component unmounts
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isOpen, userName]);
  
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window) || isMuted) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    setIsSpeaking(true);
    
    // Create speech synthesis utterance
    const speech = new SpeechSynthesisUtterance();
    
    // Correct PREPZR pronunciation
    speech.text = text.replace(/PREPZR/gi, 'PREP-zer').replace(/Prepzr/g, 'PREP-zer');
    speech.lang = language;
    
    // Apply user settings
    speech.volume = volume / 100;
    speech.rate = 0.7 + (speed / 100) * 1.5; // Map 0-100 to 0.7-2.2
    speech.pitch = 0.7 + (pitch / 100) * 1.0; // Map 0-100 to 0.7-1.7
    
    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    
    // Select voice based on preference and language
    const preferredVoices = voices.filter(voice => {
      // Filter by language first
      const matchesLanguage = voice.lang.toLowerCase().includes(language.toLowerCase().substr(0, 2));
      
      // Then filter by gender preference if specified
      if (voicePreference === "female") {
        return matchesLanguage && (voice.name.toLowerCase().includes('female') || !voice.name.toLowerCase().includes('male'));
      } else if (voicePreference === "male") {
        return matchesLanguage && voice.name.toLowerCase().includes('male');
      }
      
      // If no gender preference, just return language matches
      return matchesLanguage;
    });
    
    // Use a preferred voice if available, otherwise use any voice
    if (preferredVoices.length > 0) {
      speech.voice = preferredVoices[0];
    } else if (voices.length > 0) {
      speech.voice = voices[0];
    }
    
    // Handle speech events
    speech.onend = () => {
      setIsSpeaking(false);
    };
    
    speech.onerror = (e) => {
      console.error("Speech synthesis error", e);
      setIsSpeaking(false);
    };
    
    // Speak the text
    window.speechSynthesis.speak(speech);
  };
  
  const handleToggleMute = () => {
    setIsMuted(!isMuted);
    
    if (!isMuted) {
      // If currently not muted and about to be muted, stop any speech
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    }
    
    toast({
      title: isMuted ? "Voice Unmuted" : "Voice Muted",
      description: isMuted ? "You can now hear Sakha AI responses" : "Sakha AI voice responses are now muted",
    });
  };
  
  const handleToggleListening = () => {
    if (!isListening) {
      setIsListening(true);
      setTranscript("");
      
      toast({
        title: "Sakha AI Listening...",
        description: "Say something like 'Show me my study plan'",
      });
      
      // Simulate recognition (in a real app, this would use the Web Speech API)
      setTimeout(() => {
        const mockCommands = [
          "Show me my study plan",
          "Take me to the dashboard",
          "What are my flashcards for today",
          "Tell me about UN sustainability goals"
        ];
        const randomCommand = mockCommands[Math.floor(Math.random() * mockCommands.length)];
        setTranscript(randomCommand);
        handleProcessCommand(randomCommand);
        setIsListening(false);
      }, 3000);
    } else {
      setIsListening(false);
      toast({
        title: "Listening stopped",
      });
    }
  };
  
  const handleProcessCommand = (command: string) => {
    console.log("Processing command:", command);
    let responseText = "";
    
    // Process common commands
    if (command.toLowerCase().includes("study plan")) {
      responseText = "I'll open your personalized study plan now. It has been optimized based on your learning style and upcoming exams.";
      if (onNavigationCommand) {
        setTimeout(() => onNavigationCommand("/dashboard/student/today"), 2000);
      }
    }
    else if (command.toLowerCase().includes("dashboard")) {
      responseText = "Taking you to your main dashboard where you can see your overall progress.";
      if (onNavigationCommand) {
        setTimeout(() => onNavigationCommand("/dashboard/student"), 2000);
      }
    }
    else if (command.toLowerCase().includes("flashcard")) {
      responseText = "Opening your flashcards for today. These have been selected based on your spaced repetition schedule.";
      if (onNavigationCommand) {
        setTimeout(() => onNavigationCommand("/dashboard/student/flashcards"), 2000);
      }
    }
    else if (command.toLowerCase().includes("concept") || command.toLowerCase().includes("learn")) {
      responseText = "Here are your concept cards. I've highlighted the ones you should focus on today based on your exam schedule.";
      if (onNavigationCommand) {
        setTimeout(() => onNavigationCommand("/dashboard/student/concepts"), 2000);
      }
    }
    else if (command.toLowerCase().includes("practice") || command.toLowerCase().includes("exam")) {
      responseText = "Opening the practice exams section. You have some adaptive tests waiting for you.";
      if (onNavigationCommand) {
        setTimeout(() => onNavigationCommand("/dashboard/student/practice-exam"), 2000);
      }
    }
    else if (command.toLowerCase().includes("sustainability") || command.toLowerCase().includes("un goal")) {
      responseText = "PREP-zer is committed to UN Sustainability Goal 4 - Quality Education. We believe in providing inclusive and equitable quality education for all students, regardless of their background or circumstances. Our platform is designed to adapt to individual learning needs and provide personalized support to help every student achieve their potential.";
    }
    else {
      responseText = "I'm not sure how to help with that specific request. You can ask me to show you your study plan, open flashcards, or navigate to different sections of the app.";
    }
    
    // Set response and speak it
    setResponse(responseText);
    speakText(responseText);
  };
  
  const handleSettingsToggle = () => {
    setShowSettings(!showSettings);
  };
  
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-w-md mx-auto">
        <DrawerHeader className="border-b">
          <DrawerTitle className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center mr-2">
              <Volume2 className="h-4 w-4 text-white" />
            </div>
            <span>Sakha AI Voice Assistant</span>
            
            {/* Settings button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-auto" 
              onClick={handleSettingsToggle}
            >
              {showSettings ? <X className="h-5 w-5" /> : <Settings className="h-5 w-5" />}
            </Button>
          </DrawerTitle>
          <DrawerDescription>
            Supporting UN Sustainability Goal 4: Quality Education for All
          </DrawerDescription>
        </DrawerHeader>
        
        {showSettings ? (
          <div className="p-4">
            <h4 className="font-medium mb-4">Voice Settings</h4>
            <div className="space-y-6">
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
                <Label className="block mb-1">Voice Preference</Label>
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
              
              <div className="space-y-2">
                <Label className="block mb-1">Language Preference</Label>
                <select 
                  className="w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                  value={language}
                  onChange={(e) => e.target.value}
                >
                  <option value="en-US">English (US)</option>
                  <option value="en-IN">English (India)</option>
                  <option value="en-GB">English (UK)</option>
                  <option value="hi-IN">Hindi</option>
                </select>
              </div>
            </div>
            
            <Button 
              className="w-full mt-6"
              onClick={handleSettingsToggle}
            >
              Save Settings
            </Button>
          </div>
        ) : (
          <>
            <CardContent className="p-4">
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
                      disabled={!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)}
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
                      disabled={!('speechSynthesis' in window)}
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
              
              {/* Assistant conversation UI */}
              <Card className="mb-6">
                <CardHeader className="py-3 border-b">
                  <CardTitle className="text-sm flex items-center">
                    <span className={`mr-2 w-2 h-2 rounded-full ${isSpeaking || isListening ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></span>
                    {isListening ? "Listening..." : (isSpeaking ? "Speaking..." : "Ready")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-64 overflow-y-auto p-4 space-y-4">
                    {/* User message */}
                    {transcript && (
                      <div className="flex justify-end">
                        <div className="bg-primary/10 text-primary-foreground rounded-lg py-2 px-3 max-w-[80%]">
                          <p className="text-sm">{transcript}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Assistant response */}
                    {response && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg py-2 px-3 max-w-[80%]">
                          <p className="text-sm">{response}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Initial empty state */}
                    {!transcript && !response && (
                      <div className="text-center py-8 text-sm text-gray-500">
                        <p>Ask me something to get started</p>
                        <p className="text-xs mt-1">For example, "Show me my study plan"</p>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-3 border-t">
                  <div className="flex w-full gap-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value) {
                          const command = e.currentTarget.value;
                          setTranscript(command);
                          e.currentTarget.value = '';
                          handleProcessCommand(command);
                        }
                      }}
                    />
                    <Button variant="default" size="icon">
                      <Mic className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Voice Commands Examples</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>"Show me my study plan"</li>
                    <li>"Take me to the dashboard"</li>
                    <li>"Open my flashcards"</li>
                    <li>"What are my concepts for today"</li>
                    <li>"Tell me about UN sustainability goals"</li>
                  </ul>
                </CardContent>
              </Card>
              
              {/* UN Sustainability Banner */}
              <div className="mt-6 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800">
                <p className="text-xs text-green-800 dark:text-green-300 text-center">
                  PREP-zer proudly supports UN Sustainability Goal 4: 
                  Quality Education for All
                </p>
              </div>
            </CardContent>
            
            <DrawerFooter>
              <Button variant="outline" onClick={onClose}>Close</Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default FloatingVoiceAssistant;
