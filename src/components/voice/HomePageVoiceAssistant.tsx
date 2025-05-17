
import React, { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Mic, 
  MicOff, 
  Settings,
  Volume2,
  VolumeX,
  BookOpen,
  FileText,
  BarChart2,
  CalendarDays,
  Sparkles,
  Calculator
} from 'lucide-react';

interface HomePageVoiceAssistantProps {
  language?: string;
}

const HomePageVoiceAssistant: React.FC<HomePageVoiceAssistantProps> = ({ 
  language = 'en-IN' 
}) => {
  const { toast } = useToast();
  const location = useLocation();
  const welcomeMessagePlayed = useRef<boolean>(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState<boolean>(false);
  const [voiceSettings, setVoiceSettings] = useState({
    volume: 0.8,
    rate: 0.9,
    pitch: 1.1,
    muted: false,
    enabled: true,
    autoGreet: true
  });
  const [transcript, setTranscript] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const recognitionRef = useRef<any>(null);
  const isFirstVisit = useRef<boolean>(localStorage.getItem('first_visit') !== 'false');
  
  // Load voices when component mounts
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices);
        
        // Find a suitable Indian voice
        const preferredVoiceNames = [
          'Google हिन्दी', 'Microsoft Kalpana', 'Microsoft Kajal', 'Google English India'
        ];
        
        let voice = null;
        for (const name of preferredVoiceNames) {
          const foundVoice = voices.find(v => v.name.includes(name));
          if (foundVoice) {
            voice = foundVoice;
            break;
          }
        }
        
        // If no preferred voice found, try to find any English (India) voice
        if (!voice) {
          voice = voices.find(v => 
            v.lang === 'en-IN' || 
            v.lang === 'hi-IN' || 
            v.lang.includes('en') || 
            v.lang.includes('hi')
          );
        }
        
        if (voice) {
          setSelectedVoice(voice);
          console.log("Selected voice:", voice.name);
        }
      }
    };
    
    // Load voices right away in case they're already available
    loadVoices();
    
    // Also set up event for when voices are loaded asynchronously
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    // Check if SpeechRecognition is available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language;
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map(result => result.transcript)
          .join('');
        
        setTranscript(transcript);
        
        // Final result
        if (event.results[0].isFinal) {
          handleVoiceCommand(transcript);
        }
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [language]);

  // Play welcome message when component mounts or route changes to home
  useEffect(() => {
    // Only play welcome message on first visit to home page
    if (location.pathname === '/' && !welcomeMessagePlayed.current && voiceSettings.autoGreet) {
      // Short delay to ensure voices are loaded
      const timer = setTimeout(() => {
        speakWelcomeMessage(isFirstVisit.current);
        welcomeMessagePlayed.current = true;
        localStorage.setItem('first_visit', 'false');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, availableVoices, voiceSettings.autoGreet]);

  const speakWelcomeMessage = (isFirstTime: boolean) => {
    if ('speechSynthesis' in window && !voiceSettings.muted && voiceSettings.enabled) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create message based on whether it's the user's first visit
      const welcomeText = isFirstTime 
        ? "Namaste! Welcome to Prepzr. I'm your voice assistant with an Indian accent. I'm here to help you prepare for your exams. Click the voice assistant button in the bottom right to talk with me."
        : "Welcome back to Prepzr. I'm your voice assistant. How can I help you today?";
      
      speakMessage(welcomeText);
    }
  };
  
  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window && !voiceSettings.muted && voiceSettings.enabled) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create utterance
      const utterance = new SpeechSynthesisUtterance(text);
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      utterance.lang = language;
      utterance.rate = voiceSettings.rate;
      utterance.pitch = voiceSettings.pitch;
      utterance.volume = voiceSettings.volume;
      
      // Add event listeners to track when speaking starts and ends
      utterance.onstart = () => {
        document.dispatchEvent(new CustomEvent('voice-speaking-started', {
          detail: { message: text }
        }));
      };
      
      utterance.onend = () => {
        document.dispatchEvent(new Event('voice-speaking-ended'));
      };
      
      // Speak the message
      window.speechSynthesis.speak(utterance);
    }
  };
  
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setIsListening(true);
      setTranscript("");
    }
  };
  
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };
  
  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    console.log("Voice command received:", lowerCommand);
    
    // Handle exam readiness
    if (lowerCommand.includes('exam readiness') || lowerCommand.includes('test my readiness')) {
      speakMessage("Let me check your exam readiness. I'll help you analyze how prepared you are for your upcoming exams.");
      window.dispatchEvent(new Event('open-exam-analyzer'));
      return;
    }
    
    // Handle free trial
    if (lowerCommand.includes('free trial') || lowerCommand.includes('sign up') || lowerCommand.includes('register')) {
      speakMessage("Great! Let me help you sign up for our free trial. You'll get 7 days of full access to all our premium features.");
      window.location.href = '/signup';
      return;
    }
    
    // Handle NEET exam info
    if (lowerCommand.includes('neet') || lowerCommand.includes('medical exam')) {
      speakMessage("NEET is the National Eligibility cum Entrance Test for admission to medical colleges in India. Our platform offers comprehensive preparation for all NEET subjects including Biology, Physics, and Chemistry.");
      return;
    }
    
    // Handle study plan
    if (lowerCommand.includes('study plan') || lowerCommand.includes('how to study')) {
      speakMessage("Our AI-powered study plans are customized to your learning style and exam goals. They include daily tasks, concept cards, and practice tests optimized for your needs.");
      return;
    }
    
    // Handle general help
    if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      speakMessage("I can help you navigate Prepzr, answer questions about our features, assist with exam preparation, provide information about different exams like NEET, JEE, and more. Just ask me what you need!");
      return;
    }
    
    // Default response
    speakMessage("I heard you say: " + command + ". How can I help you with that?");
  };
  
  const toggleVoice = () => {
    const newSettings = { ...voiceSettings, enabled: !voiceSettings.enabled };
    setVoiceSettings(newSettings);
    
    toast({
      title: newSettings.enabled ? "Voice Assistant Enabled" : "Voice Assistant Disabled",
      description: newSettings.enabled 
        ? "I'm here to help with your exam preparation." 
        : "Voice features are now turned off.",
      duration: 3000,
    });
  };
  
  const toggleMute = () => {
    const newSettings = { ...voiceSettings, muted: !voiceSettings.muted };
    setVoiceSettings(newSettings);
    
    toast({
      title: newSettings.muted ? "Voice Output Muted" : "Voice Output Unmuted",
      description: newSettings.muted 
        ? "I won't speak out loud, but I'm still listening." 
        : "I'll speak responses out loud again.",
      duration: 3000,
    });
  };
  
  const handleVoiceChange = (voice: SpeechSynthesisVoice) => {
    setSelectedVoice(voice);
    
    toast({
      title: "Voice Changed",
      description: `Now using ${voice.name}`,
      duration: 3000,
    });
    
    // Test the new voice
    const utterance = new SpeechSynthesisUtterance("Hello, this is my new voice.");
    utterance.voice = voice;
    utterance.rate = voiceSettings.rate;
    utterance.pitch = voiceSettings.pitch;
    utterance.volume = voiceSettings.volume;
    window.speechSynthesis.speak(utterance);
  };
  
  const handleSettingChange = (
    setting: 'volume' | 'rate' | 'pitch' | 'autoGreet', 
    value: number | boolean
  ) => {
    setVoiceSettings({
      ...voiceSettings,
      [setting]: value
    });
  };
  
  const renderSuggestions = () => {
    const suggestions = [
      "Tell me about NEET exam",
      "How do I prepare for medical entrance?",
      "Create a study plan",
      "Test my exam readiness",
      "Start free trial",
      "What features do you offer?"
    ];
    
    return (
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-500 mb-2">Try asking:</p>
        <div className="grid grid-cols-1 gap-2">
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="justify-start h-auto py-1 text-left"
              onClick={() => {
                setTranscript(suggestion);
                handleVoiceCommand(suggestion);
              }}
            >
              "{suggestion}"
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
    if (!isDialogOpen) {
      setTranscript("");
    }
  };
  
  // Floating button that opens the voice assistant dialog
  return (
    <>
      {/* Floating Voice Assistant Button */}
      <div className="fixed bottom-24 right-6 z-40">
        <Button
          onClick={toggleDialog}
          className="rounded-full w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg p-0"
        >
          {isListening ? (
            <MicOff className="h-5 w-5 text-white animate-pulse" />
          ) : (
            <Mic className="h-5 w-5 text-white" />
          )}
        </Button>
      </div>
      
      {/* Voice Assistant Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              Prepzr Voice Assistant
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="assistant">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="assistant">Assistant</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="assistant" className="space-y-4 py-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  {isListening ? (
                    <span className="flex items-center text-sm text-green-600">
                      <span className="h-2 w-2 bg-green-600 rounded-full mr-2 animate-pulse"></span>
                      Listening...
                    </span>
                  ) : (
                    <span className="text-sm text-gray-500">How can I help you?</span>
                  )}
                </div>
                
                {transcript && (
                  <div className="bg-background rounded p-3 mb-4 shadow-sm">
                    <p className="text-sm font-medium mb-1">You said:</p>
                    <p className="italic">{transcript}</p>
                  </div>
                )}
                
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={isListening ? stopListening : startListening}
                    variant={isListening ? "destructive" : "default"}
                    className="flex-1"
                  >
                    {isListening ? (
                      <>
                        <MicOff className="h-4 w-4 mr-2" />
                        Stop Listening
                      </>
                    ) : (
                      <>
                        <Mic className="h-4 w-4 mr-2" />
                        Start Listening
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={toggleMute}
                    variant="outline"
                    className="flex-1"
                  >
                    {voiceSettings.muted ? (
                      <>
                        <VolumeX className="h-4 w-4 mr-2" />
                        Unmute
                      </>
                    ) : (
                      <>
                        <Volume2 className="h-4 w-4 mr-2" />
                        Mute
                      </>
                    )}
                  </Button>
                </div>
                
                {renderSuggestions()}
                
                {/* Feature information cards */}
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">I can help with:</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-center flex flex-col items-center">
                      <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400 mb-1" />
                      <span className="text-xs">Concept Cards</span>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center flex flex-col items-center">
                      <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 mb-1" />
                      <span className="text-xs">Study Plans</span>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center flex flex-col items-center">
                      <BarChart2 className="h-5 w-5 text-green-600 dark:text-green-400 mb-1" />
                      <span className="text-xs">Analytics</span>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg text-center flex flex-col items-center">
                      <CalendarDays className="h-5 w-5 text-amber-600 dark:text-amber-400 mb-1" />
                      <span className="text-xs">Today's Plan</span>
                    </div>
                    <div className="bg-pink-50 dark:bg-pink-900/20 p-3 rounded-lg text-center flex flex-col items-center">
                      <Calculator className="h-5 w-5 text-pink-600 dark:text-pink-400 mb-1" />
                      <span className="text-xs">Formula Lab</span>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg text-center flex flex-col items-center">
                      <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mb-1" />
                      <span className="text-xs">AI Tutor</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="voice-enabled">Enable Voice Assistant</Label>
                    <Switch 
                      id="voice-enabled" 
                      checked={voiceSettings.enabled}
                      onCheckedChange={(checked) => handleSettingChange('enabled', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-greet">Automatic Welcome Greeting</Label>
                    <Switch 
                      id="auto-greet" 
                      checked={voiceSettings.autoGreet}
                      onCheckedChange={(checked) => handleSettingChange('autoGreet', checked)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="voice-volume">Volume: {Math.round(voiceSettings.volume * 100)}%</Label>
                  <Slider 
                    id="voice-volume"
                    min={0} 
                    max={1} 
                    step={0.1} 
                    value={[voiceSettings.volume]}
                    onValueChange={(value) => handleSettingChange('volume', value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="voice-rate">Speaking Rate: {Math.round(voiceSettings.rate * 100)}%</Label>
                  <Slider 
                    id="voice-rate"
                    min={0.5} 
                    max={1.5} 
                    step={0.1} 
                    value={[voiceSettings.rate]}
                    onValueChange={(value) => handleSettingChange('rate', value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="voice-pitch">Pitch: {Math.round(voiceSettings.pitch * 100)}%</Label>
                  <Slider 
                    id="voice-pitch"
                    min={0.8} 
                    max={1.5} 
                    step={0.1} 
                    value={[voiceSettings.pitch]}
                    onValueChange={(value) => handleSettingChange('pitch', value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Voice Selection</Label>
                  <div className="max-h-40 overflow-y-auto border rounded-md p-2">
                    {availableVoices.map((voice, index) => (
                      <div 
                        key={`${voice.name}-${index}`} 
                        className={`flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer ${
                          selectedVoice && selectedVoice.name === voice.name ? "bg-muted" : ""
                        }`}
                        onClick={() => handleVoiceChange(voice)}
                      >
                        <div>
                          <p className="font-medium text-sm">{voice.name}</p>
                          <p className="text-xs text-muted-foreground">{voice.lang}</p>
                        </div>
                        {selectedVoice && selectedVoice.name === voice.name && (
                          <div className="h-2 w-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="secondary" onClick={toggleDialog}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HomePageVoiceAssistant;
