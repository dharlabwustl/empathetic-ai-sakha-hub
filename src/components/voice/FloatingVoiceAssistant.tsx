
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Mic, MicOff, Volume2, VolumeX, X, Settings,
  RefreshCw, PauseCircle, Cog, MessageCircle,
  Maximize2, Minimize2, User, ChevronDown, ChevronUp, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { useVoiceContext } from '@/contexts/VoiceContext';

interface FloatingVoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  language?: string;
  onNavigationCommand?: (route: string) => void;
}

const avatars = [
  '/img/avatars/female-1.jpg', 
  '/img/avatars/female-2.jpg', 
  '/img/avatars/female-3.jpg', 
  '/img/avatars/male-1.jpg', 
  '/img/avatars/male-2.jpg'
];

const assistantNames = ['Riya', 'Priyanka', 'Aisha', 'Arjun', 'Vikram'];

const FloatingVoiceAssistant: React.FC<FloatingVoiceAssistantProps> = ({
  isOpen,
  onClose,
  language = 'en-US',
  onNavigationCommand
}) => {
  const [message, setMessage] = useState<string>('');
  const [botResponse, setBotResponse] = useState<string>('Hi! How can I help you today?');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [voiceVolume, setVoiceVolume] = useState<number>(80);
  const [voiceSpeed, setVoiceSpeed] = useState<number>(1);
  const [voicePitch, setVoicePitch] = useState<number>(1);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState<number>(0);
  const [expanded, setExpanded] = useState<boolean>(true);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [greeting, setGreeting] = useState<string>("How may I assist you today?");
  const [speakResponse, setSpeakResponse] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'chat' | 'settings'>('chat');
  
  const { voiceSettings, updateVoiceSettings, toggleVoiceEnabled } = useVoiceContext();

  const recognitionRef = useRef<any>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Set up speech recognition
  useEffect(() => {
    // Speech recognition setup
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language;
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        
        setMessage(transcript);
      };
      
      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current.start();
        }
      };
    }
    
    // Set up speech synthesis
    speechSynthesisRef.current = new SpeechSynthesisUtterance();
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [language]);

  // Update speech synthesis properties when they change
  useEffect(() => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.volume = voiceVolume / 100;
      speechSynthesisRef.current.rate = voiceSpeed;
      speechSynthesisRef.current.pitch = voicePitch;
      speechSynthesisRef.current.lang = language;
      
      // Select a voice - try to find Indian English voice
      const voices = window.speechSynthesis.getVoices();
      
      if (voices.length > 0) {
        // Try to find Indian English voice first
        const indianVoice = voices.find(voice => 
          voice.lang === 'en-IN' || 
          voice.lang === 'hi-IN' || 
          voice.name.includes('Indian') ||
          voice.name.includes('Hindi')
        );
        
        // Use the Indian voice if found, else use the selected voice
        speechSynthesisRef.current.voice = indianVoice || 
                                          voices[selectedVoiceIndex < voices.length ? selectedVoiceIndex : 0];
      }
    }
  }, [voiceVolume, voiceSpeed, voicePitch, selectedVoiceIndex, language]);

  // Scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [botResponse]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser');
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      handleSendMessage();
    } else {
      setMessage('');
      recognitionRef.current.start();
    }
    
    setIsListening(!isListening);
  };

  const speak = (text: string) => {
    if (!speakResponse || !speechSynthesisRef.current) return;
    
    // Cancel any ongoing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      
      // Set the text and speak
      speechSynthesisRef.current.text = text;
      window.speechSynthesis.speak(speechSynthesisRef.current);
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Process message (simple responses for demo)
    let response = "I'm here to help you with your exam preparation. What would you like to know?";
    
    const lowerMsg = message.toLowerCase();
    
    // Simple response logic - in a real app, this would connect to an API
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
      response = "Hello! How can I assist with your exam preparation today?";
    }
    else if (lowerMsg.includes('your name')) {
      response = `I'm ${assistantNames[selectedVoiceIndex]}, your PREPZR assistant.`;
    }
    else if (lowerMsg.includes('dashboard')) {
      response = "I can help you navigate to the dashboard. Let me take you there.";
      if (onNavigationCommand) {
        setTimeout(() => onNavigationCommand('/dashboard/student'), 1500);
      }
    }
    else if (lowerMsg.includes('topic') || lowerMsg.includes('concept')) {
      response = "I can help you understand difficult concepts. Which topic are you struggling with?";
    }
    else if (lowerMsg.includes('study plan') || lowerMsg.includes('schedule')) {
      response = "Your study plan is personalized based on your learning goals. I can help you optimize it if you tell me more about your priorities.";
    }
    else if (lowerMsg.includes('exam') || lowerMsg.includes('test')) {
      response = "I can help you prepare for your exams with personalized practice tests and revision strategies.";
    }
    
    setBotResponse(response);
    
    // Speak the response
    speak(response);
    
    // Reset message
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const voiceIcon = (
    <div className="relative">
      <Avatar className="h-12 w-12 border-2 border-primary shadow-glow">
        <AvatarImage src={avatars[selectedVoiceIndex]} alt="Assistant" />
        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white">
          {assistantNames[selectedVoiceIndex].substring(0, 2)}
        </AvatarFallback>
      </Avatar>
      
      <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-0.5 shadow-md">
        {isListening ? (
          <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center animate-pulse">
            <Mic size={12} className="text-white" />
          </div>
        ) : (
          <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
            <MessageCircle size={12} className="text-white" />
          </div>
        )}
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-24 right-6 z-50 flex flex-col items-end"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.2 }}
      >
        {!isMinimized ? (
          <Card className={cn(
            "shadow-lg border border-gray-200 dark:border-gray-800",
            "w-80 sm:w-96 overflow-hidden transition-all duration-300",
            expanded ? "h-[500px]" : "h-[300px]"
          )}>
            <header className="bg-primary text-primary-foreground flex items-center justify-between p-3 border-b">
              <div className="flex items-center gap-2">
                {voiceIcon}
                <div>
                  <h3 className="font-medium">{assistantNames[selectedVoiceIndex]}</h3>
                  <p className="text-xs opacity-90">PREPZR AI Voice Assistant</p>
                </div>
              </div>
              
              <div className="flex gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground" onClick={() => setIsMinimized(true)}>
                        <Minimize2 size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Minimize</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground" onClick={() => setExpanded(!expanded)}>
                        {expanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{expanded ? 'Shrink' : 'Expand'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10" onClick={onClose}>
                        <X size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Close</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </header>
            
            <div className="flex border-b">
              <Button 
                variant={activeTab === 'chat' ? 'default' : 'ghost'} 
                onClick={() => setActiveTab('chat')} 
                className="flex-1 rounded-none"
              >
                Chat
              </Button>
              <Button 
                variant={activeTab === 'settings' ? 'default' : 'ghost'} 
                onClick={() => setActiveTab('settings')} 
                className="flex-1 rounded-none"
              >
                <Cog size={16} className="mr-2" />
                Settings
              </Button>
            </div>
            
            {activeTab === 'chat' && (
              <>
                <div className={cn(
                  "p-4 overflow-y-auto",
                  expanded ? "h-[360px]" : "h-[160px]"
                )}>
                  {/* Bot initial greeting */}
                  <div className="flex items-start mb-4">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={avatars[selectedVoiceIndex]} />
                      <AvatarFallback>{assistantNames[selectedVoiceIndex].substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 max-w-[80%]">
                      <p className="text-sm">{botResponse}</p>
                    </div>
                  </div>
                  
                  {message && (
                    <div className="flex items-start justify-end mb-4">
                      <div className="bg-primary text-primary-foreground rounded-lg p-2 max-w-[80%]">
                        <p className="text-sm">{message}</p>
                      </div>
                      <Avatar className="h-8 w-8 ml-2">
                        <AvatarFallback><User size={16} /></AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
                
                <div className="p-3 border-t flex items-center gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-1"
                  />
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          size="icon" 
                          variant={isListening ? "destructive" : "default"}
                          onClick={toggleListening}
                        >
                          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isListening ? 'Stop Listening' : 'Start Listening'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <Button onClick={handleSendMessage} disabled={!message.trim()}>
                    Send
                  </Button>
                </div>
              </>
            )}
            
            {activeTab === 'settings' && (
              <div className={cn(
                "p-4 overflow-y-auto",
                expanded ? "h-[415px]" : "h-[215px]"
              )}>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Select Assistant</h3>
                    <div className="flex flex-wrap gap-2">
                      {avatars.map((avatar, index) => (
                        <div 
                          key={index} 
                          onClick={() => setSelectedVoiceIndex(index)}
                          className={cn(
                            "cursor-pointer transition-all",
                            selectedVoiceIndex === index 
                              ? "ring-2 ring-primary scale-105" 
                              : "opacity-70 hover:opacity-100"
                          )}
                        >
                          <Avatar>
                            <AvatarImage src={avatar} alt={assistantNames[index]} />
                            <AvatarFallback>{assistantNames[index].substring(0, 2)}</AvatarFallback>
                          </Avatar>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium mb-2">Voice Settings</h3>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="speak-responses">Speak Responses</Label>
                      <Switch 
                        id="speak-responses" 
                        checked={speakResponse}
                        onCheckedChange={setSpeakResponse}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="voice-volume">Volume</Label>
                        <span className="text-sm">{voiceVolume}%</span>
                      </div>
                      <Slider
                        id="voice-volume"
                        min={0}
                        max={100}
                        step={1}
                        value={[voiceVolume]}
                        onValueChange={(val) => setVoiceVolume(val[0])}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="voice-speed">Speed</Label>
                        <span className="text-sm">{voiceSpeed.toFixed(1)}x</span>
                      </div>
                      <Slider
                        id="voice-speed"
                        min={0.5}
                        max={2}
                        step={0.1}
                        value={[voiceSpeed]}
                        onValueChange={(val) => setVoiceSpeed(val[0])}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="voice-pitch">Pitch</Label>
                        <span className="text-sm">{voicePitch.toFixed(1)}</span>
                      </div>
                      <Slider
                        id="voice-pitch"
                        min={0.5}
                        max={2}
                        step={0.1}
                        value={[voicePitch]}
                        onValueChange={(val) => setVoicePitch(val[0])}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full" onClick={() => {
                      setVoiceVolume(80);
                      setVoiceSpeed(1);
                      setVoicePitch(1);
                    }}>
                      <RefreshCw size={14} className="mr-2" />
                      Reset to Defaults
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="flex"
          >
            <Button 
              variant="default"
              size="lg" 
              className="rounded-full shadow-lg gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() => setIsMinimized(false)}
            >
              {voiceIcon}
              <span className="ml-2">PREPZR Voice Assistant</span>
            </Button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingVoiceAssistant;
