
import React, { useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Mic, MicOff, Settings, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from 'framer-motion';
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { MoodType } from '@/types/user/base';
import { Badge } from "@/components/ui/badge";

interface FloatingVoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  language?: string;
  onNavigationCommand?: (route: string) => void;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const FloatingVoiceAssistant: React.FC<FloatingVoiceAssistantProps> = ({ 
  isOpen, 
  onClose, 
  language = 'en-IN',
  onNavigationCommand,
  currentMood,
  onMoodChange
}) => {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [rate, setRate] = useState(0.9);
  const [pitch, setPitch] = useState(1.1);
  const [voiceMuted, setVoiceMuted] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState<number>(0);
  const [recognition, setRecognition] = useState<any>(null);

  // Load voices when component mounts
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices);
        
        // Try to find an Indian voice
        const preferredVoiceNames = [
          'Google हिन्दी', 'Microsoft Kalpana', 'Microsoft Kajal', 'Google English India'
        ];
        
        // Look for preferred voices first
        let selectedIdx = 0;
        for (const name of preferredVoiceNames) {
          const idx = voices.findIndex(v => v.name.includes(name));
          if (idx >= 0) {
            selectedIdx = idx;
            break;
          }
        }
        
        // If no preferred voice found, try to find any English (India) voice
        if (selectedIdx === 0) {
          const idx = voices.findIndex(v => 
            v.lang === 'en-IN' || 
            v.lang === 'hi-IN'
          );
          if (idx >= 0) {
            selectedIdx = idx;
          }
        }
        
        setSelectedVoiceIndex(selectedIdx);
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
    if (!recognition && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = language;
      
      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
        
        // Process the final transcript
        if (transcript) {
          processCommand(transcript);
        }
      };
      
      recognitionInstance.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        
        toast({
          title: "Voice Assistant",
          description: "Sorry, I couldn't hear you. Please try again.",
          variant: "destructive"
        });
      };
      
      setRecognition(recognitionInstance);
    }
  }, [language, toast]);

  const startListening = () => {
    if (recognition) {
      setTranscript("");
      setIsListening(true);
      recognition.start();
    } else {
      toast({
        title: "Voice Assistant",
        description: "Speech recognition is not supported in your browser.",
        variant: "destructive"
      });
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
    setIsListening(false);
  };

  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window && !voiceMuted) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set the selected voice
      if (availableVoices.length > 0) {
        utterance.voice = availableVoices[selectedVoiceIndex];
      }
      
      utterance.volume = volume;
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.lang = language;
      
      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      window.speechSynthesis.speak(utterance);
    }
  }, [availableVoices, selectedVoiceIndex, volume, rate, pitch, language, voiceMuted]);

  const toggleMute = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setVoiceMuted(!voiceMuted);
  };

  const processCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Navigation commands
    if (lowerCommand.includes('go to dashboard') || lowerCommand.includes('open dashboard')) {
      handleNavigate('/dashboard/student');
      speak("Opening dashboard");
    } 
    else if (lowerCommand.includes('go to profile') || lowerCommand.includes('open profile')) {
      handleNavigate('/dashboard/student/profile');
      speak("Opening your profile");
    } 
    else if (lowerCommand.includes('go to concepts') || lowerCommand.includes('open concepts')) {
      handleNavigate('/dashboard/student/concepts');
      speak("Opening concepts page");
    }
    else if (lowerCommand.includes('go to flashcards') || lowerCommand.includes('open flashcards')) {
      handleNavigate('/dashboard/student/flashcards');
      speak("Opening flashcards");
    }
    else if (lowerCommand.includes('go to practice exam') || lowerCommand.includes('open practice exam')) {
      handleNavigate('/dashboard/student/practice-exam');
      speak("Opening practice exams");
    }
    // Mood detection
    else if (lowerCommand.includes('i feel happy') || lowerCommand.includes('i am happy')) {
      handleMoodChange(MoodType.HAPPY);
      speak("I've updated your mood to happy. That's great to hear!");
    }
    else if (lowerCommand.includes('i feel motivated') || lowerCommand.includes('i am motivated')) {
      handleMoodChange(MoodType.MOTIVATED);
      speak("I've updated your mood to motivated. Let's make the most of it!");
    }
    else if (lowerCommand.includes('i feel tired') || lowerCommand.includes('i am tired')) {
      handleMoodChange(MoodType.TIRED);
      speak("I've updated your mood to tired. Remember to take breaks when needed.");
    }
    else if (lowerCommand.includes('i feel stressed') || lowerCommand.includes('i am stressed')) {
      handleMoodChange(MoodType.STRESSED);
      speak("I've updated your mood to stressed. Try some deep breathing exercises.");
    }
    // Default response
    else {
      speak(`I heard: ${command}. How can I help you with your exam preparation today?`);
    }
    
    // Update the UI to show the processed command
    toast({
      title: "Voice Assistant",
      description: `Command: "${command}"`,
      duration: 3000,
    });
  };

  const handleNavigate = (route: string) => {
    if (onNavigationCommand) {
      onNavigationCommand(route);
    } else {
      // Fallback to direct navigation
      window.location.href = route;
    }
  };

  const handleMoodChange = (mood: MoodType) => {
    if (onMoodChange) {
      onMoodChange(mood);
    }
  };

  // Small floating button version when not expanded
  if (!isOpen) {
    return (
      <motion.button
        className={`fixed bottom-6 right-6 z-50 rounded-full p-3 shadow-lg
          ${isListening ? 'bg-red-500 text-white' : 
            isSpeaking ? 'bg-blue-500 text-white' : 
            'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => !isListening && !isSpeaking ? startListening() : stopListening()}
      >
        {isListening ? (
          <Mic className="h-6 w-6 animate-pulse" />
        ) : isSpeaking ? (
          <Volume2 className="h-6 w-6 animate-pulse" />
        ) : (
          <Mic className="h-6 w-6" />
        )}
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-xs w-full overflow-hidden"
      >
        {/* Header */}
        <div className="bg-primary text-white p-4 flex items-center justify-between">
          <h3 className="font-medium flex items-center">
            <Volume2 className="mr-2 h-4 w-4" />
            Voice Assistant
          </h3>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowSettings(!showSettings)} 
              className="p-1 rounded-full hover:bg-primary-foreground/20 transition-colors"
            >
              <Settings className="h-4 w-4" />
            </button>
            <button 
              onClick={onClose} 
              className="p-1 rounded-full hover:bg-primary-foreground/20 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Current mood indicator if available */}
        {currentMood && (
          <div className="px-4 py-2 bg-muted/30 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Current Mood:</span>
            <Badge variant="outline" className="capitalize">{currentMood.toLowerCase()}</Badge>
          </div>
        )}
        
        {/* Settings panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 border-b dark:border-gray-700">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Voice</span>
                    <select 
                      className="text-xs bg-transparent border rounded p-1"
                      value={selectedVoiceIndex}
                      onChange={(e) => setSelectedVoiceIndex(Number(e.target.value))}
                    >
                      {availableVoices.map((voice, index) => (
                        <option key={index} value={index}>
                          {voice.name} ({voice.lang})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Volume</span>
                      <span className="text-xs text-muted-foreground">{Math.round(volume * 100)}%</span>
                    </div>
                    <Slider
                      value={[volume * 100]}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={(value) => setVolume(value[0] / 100)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Speed</span>
                      <span className="text-xs text-muted-foreground">{rate.toFixed(1)}x</span>
                    </div>
                    <Slider
                      value={[rate * 100]}
                      min={50}
                      max={200}
                      step={10}
                      onValueChange={(value) => setRate(value[0] / 100)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pitch</span>
                      <span className="text-xs text-muted-foreground">{pitch.toFixed(1)}</span>
                    </div>
                    <Slider
                      value={[pitch * 100]}
                      min={50}
                      max={150}
                      step={10}
                      onValueChange={(value) => setPitch(value[0] / 100)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Mute Voice</span>
                    <Switch
                      checked={voiceMuted}
                      onCheckedChange={toggleMute}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Transcript and status */}
        <div className="p-4">
          <div className="mb-4">
            <div className="text-sm font-medium mb-1">Status:</div>
            <div className="text-sm bg-muted/30 p-2 rounded flex items-center">
              {isListening ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span> 
                  <span>Listening...</span>
                </>
              ) : isSpeaking ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span> 
                  <span>Speaking...</span>
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span> 
                  <span>Ready</span>
                </>
              )}
            </div>
          </div>
          
          {transcript && (
            <div className="mb-4">
              <div className="text-sm font-medium mb-1">I heard:</div>
              <div className="text-sm bg-muted/30 p-2 rounded italic">
                "{transcript}"
              </div>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground mb-4">
            Try saying: "Go to dashboard", "Open flashcards", or "I feel motivated"
          </div>
          
          <div className="flex gap-2">
            {isListening ? (
              <Button 
                variant="destructive" 
                className="w-full flex items-center" 
                onClick={stopListening}
              >
                <MicOff className="mr-2 h-4 w-4" />
                Stop Listening
              </Button>
            ) : (
              <Button 
                className="w-full flex items-center" 
                onClick={startListening}
              >
                <Mic className="mr-2 h-4 w-4" />
                Start Listening
              </Button>
            )}
            
            <Button 
              variant="outline" 
              className="flex-shrink-0" 
              onClick={toggleMute}
            >
              {voiceMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingVoiceAssistant;
