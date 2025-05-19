
import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Mic, MicOff, Settings, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FloatingVoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigationCommand?: (route: string) => void;
  language?: string;
}

const FloatingVoiceAssistant: React.FC<FloatingVoiceAssistantProps> = ({
  isOpen,
  onClose,
  onNavigationCommand,
  language = 'en-IN'
}) => {
  const { toast } = useToast();
  const [command, setCommand] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('voice');
  const [settings, setSettings] = useState({
    volume: 0.8,
    rate: 1.0,
    pitch: 1.0
  });

  // Process voice or text command
  const processCommand = (text: string) => {
    setCommand(text);
    
    // Determine if this is a navigation command
    const lowerText = text.toLowerCase();
    
    // Handle navigation commands
    if (lowerText.includes('go to') || lowerText.includes('navigate to')) {
      handleNavigationCommand(lowerText);
      return;
    }
    
    // Handle information requests
    if (lowerText.includes('what is') || lowerText.includes('tell me about')) {
      handleInfoRequest(lowerText);
      return;
    }
    
    // Handle feature requests
    if (lowerText.includes('show me') || lowerText.includes('open')) {
      handleFeatureRequest(lowerText);
      return;
    }
    
    // Default response
    const defaultResponse = "I'm Sakha AI, PREPZR's core AI engine. I can help you navigate the platform, learn about our features, and support your exam preparation journey. Try asking about specific exams or features.";
    setResponse(defaultResponse);
    speakResponse(defaultResponse);
  };
  
  // Handle navigation requests
  const handleNavigationCommand = (command: string) => {
    let route = '/';
    
    if (command.includes('dashboard') || command.includes('home')) {
      route = '/dashboard/student';
      setResponse("Opening your student dashboard now.");
    } else if (command.includes('login') || command.includes('sign in')) {
      route = '/login';
      setResponse("Taking you to the login page.");
    } else if (command.includes('signup') || command.includes('register')) {
      route = '/signup';
      setResponse("Taking you to the signup page.");
    } else if (command.includes('exam') || command.includes('test')) {
      route = '/exam-readiness';
      setResponse("Opening our exam readiness analyzer.");
    } else if (command.includes('pricing') || command.includes('plans')) {
      route = '/pricing';
      setResponse("Let me show you our subscription plans.");
    } else if (command.includes('free') || command.includes('trial')) {
      route = '/free-trial';
      setResponse("Taking you to our free trial page.");
    } else {
      setResponse("I'm not sure where you want to go. Try asking for the dashboard, login, signup, or exam readiness page.");
      speakResponse("I'm not sure where you want to go. Try asking for the dashboard, login, signup, or exam readiness page.");
      return;
    }
    
    // Speak response before navigation
    speakResponse(response);
    
    // Navigate after speech or a short delay
    setTimeout(() => {
      if (onNavigationCommand) {
        onNavigationCommand(route);
      }
      onClose();
    }, 1500);
  };
  
  // Handle information requests
  const handleInfoRequest = (command: string) => {
    let infoResponse = "";
    
    if (command.includes('prepzr')) {
      infoResponse = "PREPZR is the world's first emotionally aware exam preparation platform. We adapt to your moods, learning style, and surroundings to create a hyper-personalized study experience. We support UN Sustainability goals by donating 5% of subscription revenue to help underprivileged students access quality education.";
    } else if (command.includes('voice') || command.includes('assistant')) {
      infoResponse = "I'm Sakha AI, your voice assistant. I can help you navigate the platform, answer questions about PREPZR features, and provide study guidance. Just ask me what you need!";
    } else if (command.includes('subscription') || command.includes('plan')) {
      infoResponse = "PREPZR offers flexible subscription plans to match your needs. Our plans include personalized study plans, AI-driven concept explanations, practice exams, and performance analytics. Plus, 5% of all subscription revenue helps fund education for underprivileged students.";
    } else if (command.includes('exam') || command.includes('test')) {
      infoResponse = "PREPZR helps you prepare for various competitive exams with personalized study plans, adaptive practice tests, and performance analytics. Our AI analyzes your learning patterns and adapts to your emotional state to optimize your study experience.";
    } else {
      infoResponse = "I don't have specific information about that topic yet. Try asking about PREPZR, our subscription plans, or how our voice assistant works.";
    }
    
    setResponse(infoResponse);
    speakResponse(infoResponse);
  };
  
  // Handle feature requests
  const handleFeatureRequest = (command: string) => {
    let featureResponse = "";
    
    if (command.includes('readiness') || command.includes('analyzer')) {
      featureResponse = "Our Exam Readiness Analyzer helps you understand your preparation level before an exam. It identifies knowledge gaps, recommends focus areas, and estimates your current performance level.";
      if (onNavigationCommand) {
        setTimeout(() => onNavigationCommand('/exam-readiness'), 2000);
      }
    } else if (command.includes('study plan') || command.includes('study schedule')) {
      featureResponse = "Our personalized study plans adapt to your learning pace, strengths, weaknesses, and emotional state. They optimize your study time and ensure you're prepared for your exams.";
      if (onNavigationCommand) {
        setTimeout(() => onNavigationCommand('/dashboard/student/today'), 2000);
      }
    } else if (command.includes('concept') || command.includes('topics')) {
      featureResponse = "Our concept cards break down complex topics into easy-to-understand chunks, with visual aids, examples, and practice questions tailored to your learning style.";
      if (onNavigationCommand) {
        setTimeout(() => onNavigationCommand('/dashboard/student/concepts'), 2000);
      }
    } else {
      featureResponse = "I'm not sure which feature you're asking about. Try asking about our exam readiness analyzer, personalized study plans, or concept cards.";
    }
    
    setResponse(featureResponse);
    speakResponse(featureResponse);
  };

  // Text input handling
  const handleSubmitText = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      processCommand(inputText);
      setInputText('');
    }
  };
  
  // Voice commands
  const startListening = () => {
    setIsListening(true);
    toast({
      title: "Voice Assistant Listening",
      description: "Say a command like 'Tell me about PREPZR'",
    });
    
    // Simulate speech recognition (in a real app, use the Web Speech API)
    setTimeout(() => {
      const simulatedCommands = [
        "Tell me about PREPZR",
        "What are your subscription plans?",
        "Show me the exam readiness analyzer",
        "Take me to the dashboard"
      ];
      const randomCommand = simulatedCommands[Math.floor(Math.random() * simulatedCommands.length)];
      setCommand(randomCommand);
      processCommand(randomCommand);
      setIsListening(false);
    }, 3000);
  };
  
  const stopListening = () => {
    setIsListening(false);
  };
  
  // Speech synthesis
  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window && !isMuted) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create speech synthesis utterance
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Apply voice settings
      utterance.volume = settings.volume;
      utterance.rate = settings.rate;
      utterance.pitch = settings.pitch;
      utterance.lang = language;
      
      // Get available voices
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find an Indian English voice
      const preferredVoiceNames = [
        'Google हिन्दी', 'Microsoft Kalpana', 'Google English India',
        'en-IN', 'hi-IN', 'Indian', 'India'
      ];
      
      // Find best matching voice
      let selectedVoice = null;
      for (const name of preferredVoiceNames) {
        const voice = voices.find(v => 
          v.name?.toLowerCase().includes(name.toLowerCase()) || 
          v.lang?.toLowerCase().includes(name.toLowerCase())
        );
        if (voice) {
          selectedVoice = voice;
          break;
        }
      }
      
      // If still no voice selected, use any available voice
      if (!selectedVoice && voices.length > 0) {
        selectedVoice = voices[0];
      }
      
      // Set the selected voice if found
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      // Handle events
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      // Speak
      window.speechSynthesis.speak(utterance);
    }
  };
  
  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
    
    if (!isMuted) {
      // If currently not muted and about to be muted, stop any speech
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    }
  };
  
  // Handle settings change
  const handleSettingsChange = (type: 'volume' | 'rate' | 'pitch', value: number) => {
    setSettings(prev => ({ ...prev, [type]: value }));
  };
  
  // Test voice with current settings
  const testVoice = () => {
    speakResponse("This is a test of the PREPZR voice assistant with your current settings.");
  };

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg max-h-[80vh] overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              {isSpeaking ? (
                <Volume2 className="h-5 w-5 animate-pulse" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
              Sakha AI Voice Assistant
              {isListening && (
                <Badge variant="outline" className="bg-red-500 text-white border-red-400 animate-pulse">
                  Listening
                </Badge>
              )}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mx-4 mt-4">
            <TabsTrigger value="voice">Voice</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <CardContent className="overflow-y-auto max-h-[50vh] p-4">
            <TabsContent value="voice" className="space-y-4 mt-2">
              <div className="flex flex-col items-center gap-4">
                <Button
                  onClick={isListening ? stopListening : startListening}
                  variant={isListening ? "destructive" : "default"}
                  className="w-40 h-40 rounded-full shadow-lg flex flex-col items-center justify-center gap-2 transition-all"
                  disabled={isSpeaking}
                >
                  {isListening ? (
                    <>
                      <MicOff className="h-12 w-12 mb-2" />
                      <span>Stop</span>
                    </>
                  ) : (
                    <>
                      <Mic className="h-12 w-12 mb-2" />
                      <span>Tap to Speak</span>
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={toggleMute}
                  className="flex items-center gap-2"
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="h-4 w-4" />
                      <span>Unmute</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-4 w-4" />
                      <span>Mute</span>
                    </>
                  )}
                </Button>
              </div>
              
              {command && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">You said:</p>
                  <p className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md mt-1">{command}</p>
                </div>
              )}
              
              {response && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Sakha AI response:</p>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md mt-1">
                    <p>{response}</p>
                  </div>
                </div>
              )}
              
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Try saying:</p>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <Button variant="ghost" size="sm" className="justify-start h-auto py-1" onClick={() => processCommand("Tell me about PREPZR")}>
                    "Tell me about PREPZR"
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start h-auto py-1" onClick={() => processCommand("Show me the exam readiness analyzer")}>
                    "Show me the exam readiness analyzer"
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start h-auto py-1" onClick={() => processCommand("What are your subscription plans?")}>
                    "What are your subscription plans?"
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start h-auto py-1" onClick={() => processCommand("Take me to the dashboard")}>
                    "Take me to the dashboard"
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="text" className="space-y-4 mt-2">
              <form onSubmit={handleSubmitText} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="text-input">Type your message:</Label>
                  <div className="flex gap-2">
                    <Input
                      id="text-input"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="e.g., Tell me about PREPZR"
                    />
                    <Button type="submit" disabled={!inputText.trim()}>
                      Send
                    </Button>
                  </div>
                </div>
              </form>
              
              {command && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">You asked:</p>
                  <p className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md mt-1">{command}</p>
                </div>
              )}
              
              {response && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Sakha AI response:</p>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md mt-1">
                    <p>{response}</p>
                  </div>
                </div>
              )}
              
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Suggested questions:</p>
                <div className="grid grid-cols-1 gap-2 mt-1">
                  <Button variant="ghost" size="sm" className="justify-start h-auto py-1" onClick={() => {
                    setInputText("Tell me about PREPZR");
                    processCommand("Tell me about PREPZR");
                  }}>
                    Tell me about PREPZR
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start h-auto py-1" onClick={() => {
                    setInputText("Show me the exam readiness analyzer");
                    processCommand("Show me the exam readiness analyzer");
                  }}>
                    Show me the exam readiness analyzer
                  </Button>
                  <Button variant="ghost" size="sm" className="justify-start h-auto py-1" onClick={() => {
                    setInputText("What are your subscription plans?");
                    processCommand("What are your subscription plans?");
                  }}>
                    What are your subscription plans?
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4 mt-2">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="volume-slider">Volume: {Math.round(settings.volume * 100)}%</Label>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={toggleMute}
                      className="h-7 text-xs"
                    >
                      {isMuted ? 'Unmute' : 'Mute'}
                    </Button>
                  </div>
                  <Slider
                    id="volume-slider"
                    min={0}
                    max={1}
                    step={0.05}
                    value={[settings.volume]}
                    onValueChange={([value]) => handleSettingsChange('volume', value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rate-slider">Speed: {settings.rate.toFixed(1)}x</Label>
                  <Slider
                    id="rate-slider"
                    min={0.5}
                    max={2}
                    step={0.1}
                    value={[settings.rate]}
                    onValueChange={([value]) => handleSettingsChange('rate', value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="pitch-slider">Pitch: {settings.pitch.toFixed(1)}</Label>
                  <Slider
                    id="pitch-slider"
                    min={0.5}
                    max={1.5}
                    step={0.1}
                    value={[settings.pitch]}
                    onValueChange={([value]) => handleSettingsChange('pitch', value)}
                  />
                </div>
                
                <Button className="w-full" onClick={testVoice}>
                  Test Voice Settings
                </Button>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
        
        <CardFooter className="flex justify-between bg-gray-50 dark:bg-gray-800/50 p-4">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Sakha AI - PREPZR's Core Intelligence
          </div>
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FloatingVoiceAssistant;
