
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';
import { Mic, MicOff, Settings, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState<boolean>(false);
  const [voiceVolume, setVoiceVolume] = useState<number>(0.8);
  const [voiceRate, setVoiceRate] = useState<number>(0.9);
  const [voicePitch, setVoicePitch] = useState<number>(1.1);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [showUI, setShowUI] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");
  const [assistantResponse, setAssistantResponse] = useState<string>("");
  const recognitionRef = useRef<any>(null);
  
  // Load voices when component mounts
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices);
        console.log("Available voices loaded:", voices.length);
        
        // Find an Indian female voice
        const indianFemaleVoice = voices.find(v => 
          (v.name.includes('Indian') || v.lang === 'en-IN' || v.lang === 'hi-IN') && 
          (v.name.toLowerCase().includes('female') || v.name.includes('Kalpana') || v.name.includes('Kajal'))
        );
        
        if (indianFemaleVoice) {
          setSelectedVoice(indianFemaleVoice);
          console.log("Selected Indian female voice:", indianFemaleVoice.name);
        } else {
          // Fallback to any English voice
          const englishVoice = voices.find(v => v.lang.includes('en'));
          if (englishVoice) {
            setSelectedVoice(englishVoice);
            console.log("Fallback to English voice:", englishVoice.name);
          }
        }
      }
    };
    
    // Initialize speech recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = language;
        
        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setUserInput(transcript);
          handleUserSpeech(transcript);
        };
        
        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
    
    // Load voices right away in case they're already available
    loadVoices();
    
    // Also set up event for when voices are loaded asynchronously
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [language]);

  // Play welcome message when component mounts
  useEffect(() => {
    // Only play welcome message on first visit to home page
    if (location.pathname === '/' && !welcomeMessagePlayed.current) {
      const isFirstTime = localStorage.getItem('first_visit') !== 'false';
      
      if (isFirstTime) {
        // Short delay to ensure voices are loaded
        const timer = setTimeout(() => {
          speakWelcomeMessage(isFirstTime);
          welcomeMessagePlayed.current = true;
          localStorage.setItem('first_visit', 'false');
        }, 2000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [location.pathname, availableVoices]);

  const speakWelcomeMessage = (isFirstTime: boolean) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create message based on whether it's the user's first visit
      const welcomeText = isFirstTime 
        ? "Namaste! Welcome to Prepzr. I'm your voice assistant with an Indian accent. I'm here to help you prepare for your exams. Click the voice assistant button in the bottom right to talk with me."
        : "Welcome back to Prepzr. I'm your voice assistant. How can I help you today?";
      
      speakMessage(welcomeText);
      
      // Show a toast message
      toast({
        title: "Voice Assistant",
        description: isFirstTime ? 
          "Welcome! I'll be your guide on Prepzr." : 
          "Welcome back to Prepzr!",
        duration: 5000,
      });

      // Show the UI after a welcome message
      setTimeout(() => {
        setShowUI(true);
        setAssistantResponse(welcomeText);
      }, 1000);
    }
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create utterance
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set voice if available
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      // Set properties
      utterance.lang = language;
      utterance.rate = voiceRate;
      utterance.pitch = voicePitch;
      utterance.volume = voiceVolume;
      
      // Add event listeners
      utterance.onstart = () => {
        setIsSpeaking(true);
        document.dispatchEvent(new CustomEvent('voice-speaking-started', {
          detail: { message: text }
        }));
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
        document.dispatchEvent(new Event('voice-speaking-ended'));
      };
      
      // Speak the message
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
          setIsListening(true);
          toast({
            title: "Listening...",
            description: "Speak now. I'm here to help with your exam preparation.",
            duration: 3000,
          });
        } catch (error) {
          console.error("Error starting speech recognition:", error);
          toast({
            title: "Error",
            description: "Could not start listening. Please try again.",
            variant: "destructive",
            duration: 3000,
          });
        }
      } else {
        toast({
          title: "Not Supported",
          description: "Speech recognition is not supported on your browser.",
          variant: "destructive",
          duration: 3000,
        });
      }
    }
  };

  const handleUserSpeech = (speech: string) => {
    const lowerSpeech = speech.toLowerCase();
    let response = "";
    
    // Handle different types of queries
    if (lowerSpeech.includes("hello") || lowerSpeech.includes("hi") || lowerSpeech.includes("namaste")) {
      response = "Namaste! How can I help you with your exam preparation today?";
    } else if (lowerSpeech.includes("exam") && (lowerSpeech.includes("test") || lowerSpeech.includes("analyzer") || lowerSpeech.includes("readiness"))) {
      response = "Let me open the exam readiness analyzer for you to assess your preparation.";
      setTimeout(() => {
        const event = new Event('open-exam-analyzer');
        window.dispatchEvent(event);
      }, 1000);
    } else if (lowerSpeech.includes("trial") || lowerSpeech.includes("sign up") || lowerSpeech.includes("register")) {
      response = "Great! Let me help you sign up for a 7-day free trial. Click the sign-up button on the top right.";
    } else if (lowerSpeech.includes("neet") || lowerSpeech.includes("medical")) {
      response = "PREPZR offers specialized study plans for NEET preparation. Our AI-powered system breaks down complex medical concepts into manageable pieces and helps you track your progress.";
    } else if (lowerSpeech.includes("methodology") || lowerSpeech.includes("how it works")) {
      response = "Our Champion Methodology includes student assessment, hyper-personalization, smart study plans, byte-sized concept cards, and interactive flashcards. Scroll down to see our AI visualization.";
    } else if (lowerSpeech.includes("feature") || lowerSpeech.includes("what can you do")) {
      response = "I can help you navigate the platform, explain concepts, create study plans, and track your progress. I can also provide motivational support when you feel stressed or anxious about your exams.";
    } else {
      response = "I'm here to help with your exam preparation. You can ask me about NEET preparation, study plans, practice tests, or try our exam readiness analyzer.";
    }
    
    setAssistantResponse(response);
    speakMessage(response);
  };

  const toggleSettingsPanel = () => {
    setIsSettingsPanelOpen(!isSettingsPanelOpen);
  };

  const toggleUI = () => {
    setShowUI(!showUI);
    if (!showUI) {
      speakMessage("How can I help you with your exam preparation today?");
    }
  };

  return (
    <>
      {/* Floating button always visible */}
      <TooltipProvider>
        <motion.div 
          className="fixed bottom-6 right-6 z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className={`rounded-full p-4 flex items-center ${
                  isSpeaking 
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600' 
                    : isListening 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600' 
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
                } shadow-lg hover:shadow-xl`}
                onClick={toggleUI}
              >
                {isSpeaking ? (
                  <Volume2 className="mr-2 h-5 w-5" />
                ) : isListening ? (
                  <Mic className="mr-2 h-5 w-5" />
                ) : (
                  <Volume2 className="mr-2 h-5 w-5" />
                )}
                <span>Voice Assistant</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Ask me anything about your exam preparation</p>
            </TooltipContent>
          </Tooltip>
        </motion.div>
      </TooltipProvider>

      {/* Expanded UI when active */}
      <AnimatePresence>
        {showUI && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center">
                {isSpeaking ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Volume2 className="h-5 w-5 text-blue-500 mr-2" />
                  </motion.div>
                ) : isListening ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  >
                    <Mic className="h-5 w-5 text-red-500 mr-2" />
                  </motion.div>
                ) : (
                  <Volume2 className="h-5 w-5 text-gray-600 dark:text-gray-300 mr-2" />
                )}
                <span className="font-medium">PREPZR Voice Assistant</span>
              </div>
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon" onClick={toggleSettingsPanel}>
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleUI}>
                  <span>×</span>
                </Button>
              </div>
            </div>
            
            <div className="p-4 max-h-80 overflow-y-auto">
              {assistantResponse && (
                <div className="mb-4">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                    <p className="text-sm">{assistantResponse}</p>
                  </div>
                </div>
              )}
              
              {userInput && (
                <div className="mb-4">
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg ml-8">
                    <p className="text-sm">{userInput}</p>
                  </div>
                </div>
              )}
            </div>
            
            {isSettingsPanelOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-gray-200 dark:border-gray-700 p-4"
              >
                <h4 className="font-medium mb-3">Voice Settings</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-300 block mb-1">Voice</label>
                    <select 
                      className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
                      value={selectedVoice?.name || ""}
                      onChange={(e) => {
                        const voice = availableVoices.find(v => v.name === e.target.value);
                        if (voice) setSelectedVoice(voice);
                      }}
                    >
                      {availableVoices.map((voice, i) => (
                        <option key={i} value={voice.name}>
                          {voice.name} ({voice.lang})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-300 block mb-1">
                      Volume: {Math.round(voiceVolume * 100)}%
                    </label>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.1" 
                      value={voiceVolume}
                      onChange={(e) => setVoiceVolume(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-300 block mb-1">
                      Speed: {Math.round(voiceRate * 100)}%
                    </label>
                    <input 
                      type="range" 
                      min="0.5" 
                      max="1.5" 
                      step="0.1" 
                      value={voiceRate}
                      onChange={(e) => setVoiceRate(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-300 block mb-1">
                      Pitch: {Math.round(voicePitch * 100)}%
                    </label>
                    <input 
                      type="range" 
                      min="0.5" 
                      max="2" 
                      step="0.1" 
                      value={voicePitch}
                      onChange={(e) => setVoicePitch(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                className={`w-full ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                onClick={toggleListening}
              >
                {isListening ? (
                  <>
                    <MicOff className="mr-2 h-4 w-4" />
                    Stop Listening
                  </>
                ) : (
                  <>
                    <Mic className="mr-2 h-4 w-4" />
                    Start Speaking
                  </>
                )}
              </Button>
              
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
                Try asking about NEET preparation, exam readiness, or free trial
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HomePageVoiceAssistant;
