
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Mic, MicOff, Settings, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import useVoiceAnnouncer from '@/hooks/useVoiceAnnouncer';

interface HomePageVoiceAssistantProps {
  language?: string;
}

const HomePageVoiceAssistant: React.FC<HomePageVoiceAssistantProps> = ({ 
  language = 'en-IN' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('assistant');
  const { toast } = useToast();
  
  const {
    voiceSettings,
    updateVoiceSettings,
    toggleVoiceEnabled,
    toggleMute,
    speakMessage,
    testVoice,
    isVoiceSupported,
    isSpeaking,
    isListening,
    startListening,
    stopListening,
    transcript,
    supportedLanguages,
    processVoiceCommand
  } = useVoiceAnnouncer({
    initialSettings: { 
      language, 
      enabled: true,
      rate: 0.92,  // Slower rate for better understanding
      pitch: 1.1,  // Higher pitch for female voice
      volume: 1.0
    }
  });
  
  // Welcome messages for first-time visitors
  const welcomeMessages = [
    "Welcome to PREPZR, your AI study assistant for exam preparation.",
    "I can help you navigate the platform, answer questions about NEET exam preparation, and provide personalized guidance.",
    "Try our exam readiness analyzer to assess your current level of preparation.",
    "You can sign up for a free 7-day trial to access all our premium features."
  ];
  
  // Check if first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedHome');
    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem('hasVisitedHome', 'true');
      
      // Delay welcome message to ensure voice is initialized
      const timer = setTimeout(() => {
        speakMessage(welcomeMessages[0]);
        
        // Queue additional welcome messages with delays between them
        let messageIndex = 1;
        const messageInterval = setInterval(() => {
          if (messageIndex < welcomeMessages.length) {
            speakMessage(welcomeMessages[messageIndex]);
            messageIndex++;
          } else {
            clearInterval(messageInterval);
          }
        }, 8000); // 8 seconds between messages
      }, 2000);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, []);
  
  // Listen for button clicks to open assistant
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    document.addEventListener('open-voice-assistant', handleOpen);
    
    return () => {
      document.removeEventListener('open-voice-assistant', handleOpen);
    };
  }, []);
  
  // Show a floating button on the screen that opens the voice assistant
  const [isFloatingButtonVisible, setIsFloatingButtonVisible] = useState(false);
  
  useEffect(() => {
    // Show button after a short delay
    const timer = setTimeout(() => {
      setIsFloatingButtonVisible(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle message send with microphone
  const handleListen = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      toast({
        title: "Listening...",
        description: "Speak now and I'll try to help you."
      });
    }
  };
  
  // Process transcript when it changes
  useEffect(() => {
    if (transcript) {
      processVoiceCommand(transcript);
    }
  }, [transcript]);
  
  return (
    <>
      {/* Floating Voice Assistant Button */}
      <AnimatePresence>
        {isFloatingButtonVisible && !isOpen && (
          <motion.div 
            className="fixed bottom-6 right-6 z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <Button
              className={`rounded-full p-4 w-12 h-12 sm:w-auto sm:h-auto sm:px-6 sm:py-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl flex items-center gap-2 ${isSpeaking ? 'animate-pulse ring-2 ring-purple-400' : ''}`}
              onClick={() => setIsOpen(true)}
            >
              <Volume2 className="h-5 w-5" />
              <span className="hidden sm:inline">Voice Assistant</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Voice Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[450px] shadow-2xl rounded-xl border border-purple-200 dark:border-purple-900 bg-white dark:bg-gray-900"
          >
            <div className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-t-xl flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isSpeaking ? 'bg-green-400 animate-pulse' : 'bg-gray-300'}`}></div>
                <h3 className="font-medium text-white">PREPZR Voice Assistant</h3>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-white/20"
                  onClick={() => toggleMute()}
                >
                  {voiceSettings.muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={18} />
                </Button>
              </div>
            </div>
            
            <div className="p-4">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="assistant">Assistant</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="assistant" className="space-y-4">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 h-[250px] overflow-y-auto">
                    <p className="text-sm mb-3">
                      <span className="font-semibold">PREPZR Assistant:</span> I can help you with:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>NEET exam preparation guidance</li>
                      <li>Information about our study features</li>
                      <li>Navigating through our platform</li>
                      <li>How to get started with your exam preparation</li>
                      <li>Details about our subscription plans</li>
                    </ul>
                    
                    {transcript && (
                      <div className="mt-4 p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <p className="text-sm font-medium">You said:</p>
                        <p className="text-sm">{transcript}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      className={`flex-1 ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-600 hover:bg-purple-700'}`}
                      onClick={handleListen}
                    >
                      {isListening ? (
                        <>
                          <MicOff className="mr-2 h-4 w-4" /> Stop Listening
                        </>
                      ) : (
                        <>
                          <Mic className="mr-2 h-4 w-4" /> Ask Me Something
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => speakMessage("Let me help you prepare for your NEET exam. Our platform offers personalized study plans, comprehensive concept cards, and practice tests specifically designed for NEET aspirants.")}
                    >
                      Tell Me About NEET
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="features">
                  <div className="space-y-4">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 h-[250px] overflow-y-auto">
                      <h4 className="font-medium mb-3">Platform Features</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { name: "Study Plan", desc: "AI-powered personalized study schedules" },
                          { name: "Concept Cards", desc: "Visual learning aids for complex topics" },
                          { name: "Practice Exams", desc: "NEET pattern practice tests" },
                          { name: "Flashcards", desc: "Active recall learning tools" },
                          { name: "Analytics", desc: "Performance tracking and insights" },
                          { name: "Formula Practice", desc: "Interactive formula training" },
                          { name: "Academic Advisor", desc: "AI tutor for personalized help" },
                          { name: "Feel Good Corner", desc: "Mental wellness resources" }
                        ].map(feature => (
                          <Button 
                            key={feature.name}
                            variant="outline"
                            className="h-auto py-2 justify-start text-left"
                            onClick={() => speakMessage(`Our ${feature.name} feature provides ${feature.desc}. It's designed to help NEET aspirants master their exam preparation.`)}
                          >
                            <div>
                              <div className="font-medium">{feature.name}</div>
                              <div className="text-xs text-muted-foreground">{feature.desc}</div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full"
                      onClick={() => speakMessage("I can explain any feature in detail. Just ask me about study plans, concept cards, practice exams, or any other feature you're curious about.")}
                    >
                      Explore All Features
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings">
                  <div className="space-y-4">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                      <h4 className="font-medium mb-4">Voice Settings</h4>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="voice-enabled">Voice Assistant</Label>
                          <Switch 
                            id="voice-enabled"
                            checked={voiceSettings.enabled}
                            onCheckedChange={toggleVoiceEnabled}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="voice-muted">Mute</Label>
                          <Switch 
                            id="voice-muted"
                            checked={voiceSettings.muted}
                            onCheckedChange={() => toggleMute()}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Language</Label>
                          <Select 
                            value={voiceSettings.language} 
                            onValueChange={(value) => updateVoiceSettings({ language: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              {supportedLanguages.map(lang => (
                                <SelectItem key={lang.value} value={lang.value}>
                                  {lang.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="voice-rate">Speed</Label>
                            <span className="text-xs text-muted-foreground">{voiceSettings.rate.toFixed(1)}x</span>
                          </div>
                          <Slider
                            id="voice-rate"
                            min={0.5}
                            max={2.0}
                            step={0.1}
                            value={[voiceSettings.rate]}
                            onValueChange={([value]) => updateVoiceSettings({ rate: value })}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="voice-pitch">Pitch</Label>
                            <span className="text-xs text-muted-foreground">{voiceSettings.pitch.toFixed(1)}</span>
                          </div>
                          <Slider
                            id="voice-pitch"
                            min={0.5}
                            max={2.0}
                            step={0.1}
                            value={[voiceSettings.pitch]}
                            onValueChange={([value]) => updateVoiceSettings({ pitch: value })}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="voice-volume">Volume</Label>
                            <span className="text-xs text-muted-foreground">{voiceSettings.volume.toFixed(1) * 100}%</span>
                          </div>
                          <Slider
                            id="voice-volume"
                            min={0.1}
                            max={1.0}
                            step={0.1}
                            value={[voiceSettings.volume]}
                            onValueChange={([value]) => updateVoiceSettings({ volume: value })}
                          />
                        </div>
                        
                        <Button className="w-full" onClick={testVoice}>
                          Test Voice
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HomePageVoiceAssistant;
