
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Settings, Volume2, VolumeX, X, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';

interface VoiceButtonProps {
  userName?: string;
  language?: string;
  onNavigationCommand?: (route: string) => void;
}

const FloatingVoiceButton: React.FC<VoiceButtonProps> = ({
  userName = "Student",
  language = "en-US",
  onNavigationCommand
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [voiceVolume, setVoiceVolume] = useState(80);
  const [speechRate, setSpeechRate] = useState(1);
  const [voiceGender, setVoiceGender] = useState<'female' | 'male'>('female');
  const [autoReadContent, setAutoReadContent] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const { toast } = useToast();

  // Load available voices
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;
    
    // Initial load of voices
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices);
        // Set default voice preference
        const preferredVoice = voices.find(voice => 
          (voiceGender === 'female' && 
          (voice.name.toLowerCase().includes('female') || 
           voice.name.toLowerCase().includes('zira') || 
           voice.name.toLowerCase().includes('samantha'))) ||
          (voiceGender === 'male' && 
          (voice.name.toLowerCase().includes('male') || 
           voice.name.toLowerCase().includes('david')))
        );
        
        if (preferredVoice) {
          setSelectedVoice(preferredVoice.name);
        }
      }
    };

    loadVoices();
    
    // Chrome loads voices asynchronously
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [voiceGender]);

  // Toggle speech recognition
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Speech Recognition Unavailable",
        description: "Your browser doesn't support speech recognition. Try using Chrome or Edge.",
        variant: "destructive"
      });
      return;
    }
    
    setIsListening(true);
    
    // Create speech recognition instance
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = language;
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = () => {
      console.log("Voice recognition started");
      toast({
        title: "Listening...",
        description: "What can I help you with?",
      });
    };
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log("Voice command received:", transcript);
      
      // Process voice command
      processVoiceCommand(transcript);
    };
    
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };
    
    recognition.onend = () => {
      console.log("Voice recognition ended");
      setIsListening(false);
    };
    
    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    
    // Stop any active recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.stop();
    }
  };

  const processVoiceCommand = (command: string) => {
    console.log("Processing command:", command);
    
    // Navigation commands
    if (command.includes("go to dashboard") || command.includes("open dashboard")) {
      speakResponse("Navigating to dashboard");
      onNavigationCommand && onNavigationCommand('/dashboard/student');
      return;
    }
    
    if (command.includes("go to analytics") || command.includes("show analytics")) {
      speakResponse("Opening analytics page");
      onNavigationCommand && onNavigationCommand('/dashboard/student/analytics');
      return;
    }
    
    if (command.includes("go to concepts") || command.includes("show concepts")) {
      speakResponse("Opening concepts page");
      onNavigationCommand && onNavigationCommand('/dashboard/student/concepts');
      return;
    }
    
    if (command.includes("take exam") || command.includes("start test") || command.includes("exam readiness")) {
      speakResponse("Opening exam readiness analyzer");
      window.dispatchEvent(new CustomEvent('open-exam-analyzer'));
      return;
    }
    
    if (command.includes("sign up") || command.includes("free trial")) {
      speakResponse("Taking you to the sign up page");
      onNavigationCommand && onNavigationCommand('/signup');
      return;
    }
    
    // General commands
    if (command.includes("hello") || command.includes("hi")) {
      speakResponse(`Hello ${userName}! How can I help you today?`);
      return;
    }
    
    // If no command matched
    speakResponse("I'm sorry, I didn't understand that command. Please try again.");
  };

  const speakResponse = (text: string) => {
    if (isMuted || !('speechSynthesis' in window)) return;
    
    // Stop any current speech
    window.speechSynthesis.cancel();
    
    // Create a new speech instance
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.volume = voiceVolume / 100;
    speech.rate = speechRate;
    speech.lang = language;
    
    // Set the selected voice if available
    if (selectedVoice) {
      const voice = availableVoices.find(v => v.name === selectedVoice);
      if (voice) {
        speech.voice = voice;
      }
    }
    
    // Speak the response
    window.speechSynthesis.speak(speech);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    
    if (!isMuted) {
      // Cancel any ongoing speech when muting
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const handleVoiceChange = (voiceName: string) => {
    setSelectedVoice(voiceName);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const testVoice = () => {
    const testText = `Hello ${userName}, this is a test of your voice assistant settings.`;
    speakResponse(testText);
  };

  return (
    <>
      {/* Floating button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Settings panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="mb-4 w-[340px] sm:w-[400px]"
            >
              <Card className="border-2 border-indigo-200 dark:border-indigo-800/50 shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Voice Assistant Settings</CardTitle>
                    <Button variant="ghost" size="icon" onClick={toggleSettings}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <CardDescription>
                    Customize your voice assistant experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="voice">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="voice">Voice</TabsTrigger>
                      <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    </TabsList>
                    <TabsContent value="voice" className="space-y-4 pt-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Voice Volume</h4>
                            <p className="text-sm text-muted-foreground">
                              Adjust how loud the assistant speaks
                            </p>
                          </div>
                          <div className="w-1/2">
                            <Slider 
                              value={[voiceVolume]} 
                              min={0} 
                              max={100} 
                              step={5}
                              onValueChange={(value) => setVoiceVolume(value[0])} 
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Speech Rate</h4>
                            <p className="text-sm text-muted-foreground">
                              Control how fast the assistant speaks
                            </p>
                          </div>
                          <div className="w-1/2">
                            <Slider 
                              value={[speechRate * 50]} 
                              min={25} 
                              max={100} 
                              step={5}
                              onValueChange={(value) => setSpeechRate(value[0] / 50)} 
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium">Voice Selection</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Choose your preferred voice
                          </p>
                          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-1">
                            {availableVoices.length > 0 ? (
                              availableVoices
                                .filter(voice => voice.lang.startsWith(language.split('-')[0]))
                                .map(voice => (
                                  <Button
                                    key={voice.name}
                                    variant={selectedVoice === voice.name ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handleVoiceChange(voice.name)}
                                    className="justify-start overflow-hidden text-ellipsis whitespace-nowrap"
                                  >
                                    <span className="truncate text-xs">{voice.name}</span>
                                  </Button>
                                ))
                            ) : (
                              <p className="text-sm text-muted-foreground col-span-2">
                                No voices available for your language
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="preferences" className="space-y-4 pt-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between space-x-2">
                          <Label htmlFor="mute-toggle">
                            <div>
                              <h4 className="font-medium">Mute Assistant</h4>
                              <p className="text-sm text-muted-foreground">
                                Turn voice responses on/off
                              </p>
                            </div>
                          </Label>
                          <Switch
                            id="mute-toggle"
                            checked={isMuted}
                            onCheckedChange={toggleMute}
                          />
                        </div>

                        <div className="flex items-center justify-between space-x-2">
                          <Label htmlFor="auto-read">
                            <div>
                              <h4 className="font-medium">Auto-read Content</h4>
                              <p className="text-sm text-muted-foreground">
                                Automatically read page content
                              </p>
                            </div>
                          </Label>
                          <Switch
                            id="auto-read"
                            checked={autoReadContent}
                            onCheckedChange={setAutoReadContent}
                          />
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium">Voice Gender Preference</h4>
                          <div className="flex space-x-2">
                            <Button
                              variant={voiceGender === 'female' ? "default" : "outline"}
                              size="sm"
                              onClick={() => setVoiceGender('female')}
                              className="w-full"
                            >
                              Female
                            </Button>
                            <Button
                              variant={voiceGender === 'male' ? "default" : "outline"}
                              size="sm"
                              onClick={() => setVoiceGender('male')}
                              className="w-full"
                            >
                              Male
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium">Language</h4>
                          <div className="flex space-x-2">
                            <select 
                              className="w-full h-10 px-3 rounded-md border border-input bg-background"
                              value={language}
                              onChange={(e) => {
                                // In a real app, we would update the language here
                                console.log("Language selected:", e.target.value);
                              }}
                            >
                              <option value="en-US">English (US)</option>
                              <option value="en-GB">English (UK)</option>
                              <option value="en-IN">English (India)</option>
                              <option value="hi-IN">Hindi</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button onClick={testVoice} className="w-full">
                    <Volume2 className="mr-2 h-4 w-4" />
                    Test Voice
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons row */}
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleSettings}
            className="bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-800/40 text-purple-600 dark:text-purple-300 p-3 rounded-full shadow-md flex items-center justify-center"
          >
            <Settings size={20} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMute}
            className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-800/40 text-blue-600 dark:text-blue-300 p-3 rounded-full shadow-md flex items-center justify-center"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleListening}
            className={`${
              isListening
                ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
            } p-4 rounded-full shadow-lg flex items-center justify-center`}
          >
            {isListening ? <MicOff size={24} /> : <Mic size={24} />}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default FloatingVoiceButton;
