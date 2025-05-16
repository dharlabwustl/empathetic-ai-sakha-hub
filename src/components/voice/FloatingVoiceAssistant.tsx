
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Mic, MicOff, X, Volume, Volume2, VolumeX, Settings, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useVoiceContext } from '@/contexts/VoiceContext';
import { VoiceSettings } from '@/types/voice';

interface FloatingVoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  language?: string;
  onNavigationCommand?: (route: string) => void;
}

const FloatingVoiceAssistant: React.FC<FloatingVoiceAssistantProps> = ({ 
  isOpen, 
  onClose, 
  language = 'en-US',
  onNavigationCommand 
}) => {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('voice');
  const [showCommandsList, setShowCommandsList] = useState(false);
  
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    volume: 0.8,
    speed: 1.0,
    pitch: 1.0,
    language: language || 'en-IN', // Default to Indian English
    voice: 'Google हिन्दी',
    enabled: true,
    muted: false,
    gender: 'female', // Default to female voice
    greetUser: true,
    readNotifications: true,
    readPageContent: false
  });
  
  // Recognition for speech-to-text
  const recognitionRef = useRef<any>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Available voices
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [filteredVoices, setFilteredVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  // Available commands
  const availableCommands = [
    { command: "Go to dashboard", description: "Navigate to the dashboard" },
    { command: "Open profile", description: "Navigate to your profile page" },
    { command: "Show study plan", description: "Navigate to study plan" },
    { command: "Find concepts", description: "Search for concepts" },
    { command: "Change voice", description: "Open voice settings" },
    { command: "Adjust volume", description: "Change voice assistant volume" }
  ];

  // Effect to handle visibility change to stop listening when the page is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isListening) {
        stopListening();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isListening]);

  // Effect to load available voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices);
        filterVoicesByLanguageAndGender(voices, voiceSettings.language, voiceSettings.gender);
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
  
  // Effect to filter voices when language or gender changes
  useEffect(() => {
    filterVoicesByLanguageAndGender(availableVoices, voiceSettings.language, voiceSettings.gender);
  }, [voiceSettings.language, voiceSettings.gender, availableVoices]);
  
  // Initialize speech recognition when component mounts
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = voiceSettings.language;
      
      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
            // Process command immediately once finalized
            processVoiceCommand(transcript);
          } else {
            interimTranscript += transcript;
          }
        }
        
        setTranscript(finalTranscript || interimTranscript);
      };
      
      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current.start();
        } else {
          setIsListening(false);
        }
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'no-speech') {
          // Restart if no speech detected but still listening
          if (isListening && recognitionRef.current) {
            setTimeout(() => {
              if (isListening && recognitionRef.current) {
                recognitionRef.current.start();
              }
            }, 100);
          }
        } else {
          toast({
            title: 'Speech Recognition Error',
            description: `Error: ${event.error}. Please try again.`,
            variant: 'destructive',
          });
          setIsListening(false);
        }
      };
    } else {
      toast({
        title: 'Feature Not Available',
        description: 'Speech recognition is not supported in this browser.',
        variant: 'destructive',
      });
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (speechSynthesisRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  
  // Update recognition language when language setting changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = voiceSettings.language;
    }
  }, [voiceSettings.language]);

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setTranscript('');
        speak("I'm listening. How can I help you?");
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        // If already started, stop and restart
        recognitionRef.current.stop();
        setTimeout(() => startListening(), 100);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };
  
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const filterVoicesByLanguageAndGender = (
    voices: SpeechSynthesisVoice[], 
    language: string, 
    gender: string
  ) => {
    // First try to filter by exact language code
    let filtered = voices.filter(voice => {
      // Many Hindi/Indian voices have 'hi' or 'en-IN' in their lang property
      return voice.lang.includes(language.split('-')[0]) || 
             (language === 'en-IN' && voice.lang.includes('hi')) ||
             (language === 'hi-IN' && voice.lang.includes('hi'));
    });
    
    // If no matches, fallback to broader language match
    if (filtered.length === 0) {
      filtered = voices.filter(voice => 
        voice.lang.startsWith(language.split('-')[0])
      );
    }
    
    // If still no matches, use all voices
    if (filtered.length === 0) {
      filtered = voices;
    }
    
    // Attempt to filter by gender if we can identify it from the voice name
    if (gender) {
      const genderFiltered = filtered.filter(voice => {
        const name = voice.name.toLowerCase();
        if (gender === 'female') {
          return name.includes('female') || 
                 name.includes('woman') || 
                 name.includes('girl') ||
                 name.includes('f') ||
                 !name.includes('male');  // Default to female if unclear
        } else {
          return name.includes('male') || 
                 name.includes('man') || 
                 name.includes('boy');
        }
      });
      
      // Only use gender filter if it returned results
      if (genderFiltered.length > 0) {
        filtered = genderFiltered;
      }
    }
    
    // Sort voices: preferred voices first
    const preferredVoiceNames = [
      'Google हिन्दी', 'Microsoft Kalpana', 'Microsoft Kajal', 'Google UK English Female',
      'Microsoft Heera', 'Microsoft Zira', 'Google English India'
    ];
    
    filtered.sort((a, b) => {
      const aIndex = preferredVoiceNames.findIndex(name => a.name.includes(name));
      const bIndex = preferredVoiceNames.findIndex(name => b.name.includes(name));
      
      if (aIndex >= 0 && bIndex < 0) return -1;
      if (aIndex < 0 && bIndex >= 0) return 1;
      if (aIndex >= 0 && bIndex >= 0) return aIndex - bIndex;
      return a.name.localeCompare(b.name);
    });
    
    setFilteredVoices(filtered);
    
    // Select first available voice if current is not available
    if (filtered.length > 0 && !filtered.find(v => v.name === voiceSettings.voice)) {
      setVoiceSettings(prev => ({
        ...prev,
        voice: filtered[0].name
      }));
    }
  };

  const handleUpdateSettings = (newSettings: Partial<VoiceSettings>) => {
    setVoiceSettings(prev => ({ ...prev, ...newSettings }));
  };
  
  const speak = (text: string) => {
    if (!voiceSettings.enabled || voiceSettings.muted || !text) return;
    
    // Cancel any ongoing speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    
    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesisRef.current = utterance;
    
    // Set voice if available
    const voice = availableVoices.find(v => v.name === voiceSettings.voice);
    if (voice) {
      utterance.voice = voice;
    }
    
    // Set other properties
    utterance.volume = voiceSettings.volume;
    utterance.rate = voiceSettings.speed;
    utterance.pitch = voiceSettings.pitch;
    utterance.lang = voiceSettings.language;
    
    // Speak
    window.speechSynthesis.speak(utterance);
  };

  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    
    // Navigation commands
    if (lowerCommand.includes('go to dashboard') || lowerCommand.includes('open dashboard')) {
      speak("Going to dashboard");
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student');
      }
    }
    else if (lowerCommand.includes('go to profile') || lowerCommand.includes('open profile')) {
      speak("Opening profile");
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student/profile');
      }
    }
    else if (lowerCommand.includes('study plan') || lowerCommand.includes('open study plan')) {
      speak("Opening study plan");
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student/study-plan');
      }
    }
    else if (lowerCommand.includes('tutor') || lowerCommand.includes('open tutor')) {
      speak("Opening AI tutor");
      if (onNavigationCommand) {
        onNavigationCommand('/dashboard/student/tutor');
      }
    }
    // Settings commands
    else if (lowerCommand.includes('change voice') || lowerCommand.includes('voice settings')) {
      speak("Opening voice settings");
      setActiveTab('voice');
      setSettingsOpen(true);
    }
    else if (lowerCommand.includes('volume up') || lowerCommand.includes('increase volume')) {
      const newVolume = Math.min(voiceSettings.volume + 0.1, 1);
      handleUpdateSettings({ volume: newVolume });
      speak("Volume increased");
    }
    else if (lowerCommand.includes('volume down') || lowerCommand.includes('decrease volume')) {
      const newVolume = Math.max(voiceSettings.volume - 0.1, 0);
      handleUpdateSettings({ volume: newVolume });
      speak("Volume decreased");
    }
    else if (lowerCommand.includes('mute')) {
      handleUpdateSettings({ muted: true });
      speak("Voice muted");
    }
    else if (lowerCommand.includes('unmute')) {
      handleUpdateSettings({ muted: false });
      speak("Voice unmuted");
    }
    // Help commands
    else if (lowerCommand.includes('help') || lowerCommand.includes('what can you do') || lowerCommand.includes('commands')) {
      setShowCommandsList(true);
      speak("Here are some commands you can use.");
    }
    else if (lowerCommand.includes('close') || lowerCommand.includes('exit')) {
      speak("Closing voice assistant");
      onClose();
    }
    // Unknown command
    else if (lowerCommand) {
      speak("I didn't understand that command. Try asking for help to see available commands.");
    }
  };

  // Determine appropriate icon based on volume
  const VolumeIcon = voiceSettings.muted ? VolumeX : 
                     voiceSettings.volume > 0.5 ? Volume2 : 
                     voiceSettings.volume > 0 ? Volume : VolumeX;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Voice Assistant</span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline" 
                size="icon" 
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="h-8 w-8"
              >
                <Settings size={16} />
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                <X size={16} />
              </Button>
            </div>
          </DialogTitle>
          <DialogDescription>
            Your voice assistant with an Indian accent. Press the microphone to speak a command.
          </DialogDescription>
        </DialogHeader>
        
        <div className={cn(
          "transition-all duration-300",
          settingsOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="voice">Voice Settings</TabsTrigger>
              <TabsTrigger value="behavior">Behavior</TabsTrigger>
            </TabsList>
            
            <TabsContent value="voice" className="space-y-4 pt-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="voice-enabled">Enable Voice Assistant</Label>
                  <Switch
                    id="voice-enabled"
                    checked={voiceSettings.enabled}
                    onCheckedChange={(checked) => handleUpdateSettings({ enabled: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="voice-muted" className="flex items-center">
                    <VolumeIcon size={16} className="mr-2" />
                    Mute Voice
                  </Label>
                  <Switch
                    id="voice-muted"
                    checked={voiceSettings.muted}
                    onCheckedChange={(checked) => handleUpdateSettings({ muted: checked })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="voice-volume">Volume: {Math.round(voiceSettings.volume * 100)}%</Label>
                  <Slider
                    id="voice-volume"
                    min={0}
                    max={1}
                    step={0.05}
                    value={[voiceSettings.volume]}
                    onValueChange={(values) => handleUpdateSettings({ volume: values[0] })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="voice-speed">Speaking Rate: {voiceSettings.speed}x</Label>
                  <Slider
                    id="voice-speed"
                    min={0.5}
                    max={2}
                    step={0.1}
                    value={[voiceSettings.speed]}
                    onValueChange={(values) => handleUpdateSettings({ speed: values[0] })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="voice-pitch">Pitch: {voiceSettings.pitch}x</Label>
                  <Slider
                    id="voice-pitch"
                    min={0.5}
                    max={2}
                    step={0.1}
                    value={[voiceSettings.pitch]}
                    onValueChange={(values) => handleUpdateSettings({ pitch: values[0] })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="voice-language">Language</Label>
                  <Select 
                    value={voiceSettings.language}
                    onValueChange={(value) => handleUpdateSettings({ language: value })}
                  >
                    <SelectTrigger id="voice-language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="en-IN">English (India)</SelectItem>
                        <SelectItem value="hi-IN">Hindi</SelectItem>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="en-GB">English (UK)</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="voice-gender">Voice Gender</Label>
                  <Select 
                    value={voiceSettings.gender}
                    onValueChange={(value) => handleUpdateSettings({ gender: value })}
                  >
                    <SelectTrigger id="voice-gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="voice-selection">Select Voice</Label>
                  <Select 
                    value={voiceSettings.voice}
                    onValueChange={(value) => handleUpdateSettings({ voice: value })}
                  >
                    <SelectTrigger id="voice-selection">
                      <SelectValue placeholder="Select voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredVoices.map((voice) => (
                        <SelectItem key={voice.name} value={voice.name}>
                          {voice.name} ({voice.lang})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" size="sm" 
                    onClick={() => speak("Hello, I am your Indian voice assistant. How can I help you today?")}
                    className="mt-2"
                  >
                    Test Voice
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="behavior" className="space-y-4 pt-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="greet-user">Greet on Page Load</Label>
                  <Switch
                    id="greet-user"
                    checked={voiceSettings.greetUser}
                    onCheckedChange={(checked) => handleUpdateSettings({ greetUser: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="read-notifications">Read Notifications</Label>
                  <Switch
                    id="read-notifications"
                    checked={voiceSettings.readNotifications}
                    onCheckedChange={(checked) => handleUpdateSettings({ readNotifications: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="read-page-content">Read Page Content</Label>
                  <Switch
                    id="read-page-content"
                    checked={voiceSettings.readPageContent}
                    onCheckedChange={(checked) => handleUpdateSettings({ readPageContent: checked })}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-4">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-lg">Voice Commands</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn(
                "transition-all duration-300 space-y-2 text-center",
                isListening ? "" : "opacity-60"
              )}>
                <div className="text-lg font-medium">
                  {isListening ? "Listening..." : "Press the microphone to speak"}
                </div>
                
                {transcript && (
                  <div className="border rounded-md p-3 bg-muted/20">
                    <p className="text-sm font-mono">{transcript}</p>
                  </div>
                )}
                
                <Button
                  variant={isListening ? "destructive" : "default"}
                  className={cn(
                    "mx-auto mt-3 h-16 w-16 rounded-full transition-all duration-200",
                    isListening ? "bg-red-500 animate-pulse" : ""
                  )}
                  onClick={toggleListening}
                >
                  {isListening ? <MicOff size={24} /> : <Mic size={24} />}
                </Button>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Available Commands</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowCommandsList(!showCommandsList)}
                    className="h-7 p-1"
                  >
                    {showCommandsList ? 
                      <ChevronUp size={16} /> : 
                      <ChevronDown size={16} />
                    }
                  </Button>
                </div>
                
                {showCommandsList && (
                  <div className="mt-2 space-y-2 text-sm">
                    {availableCommands.map((cmd, idx) => (
                      <div key={idx} className="grid grid-cols-2 py-1 border-b border-gray-100 dark:border-gray-800">
                        <span className="font-medium">"{cmd.command}"</span>
                        <span className="text-muted-foreground">{cmd.description}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FloatingVoiceAssistant;
