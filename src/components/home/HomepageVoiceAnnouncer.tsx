
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Info, Mic, MicOff, HelpCircle, Settings as SettingsIcon, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { findBestVoice } from '@/components/dashboard/student/voice/voiceUtils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface HomepageVoiceAnnouncerProps {
  autoPlay?: boolean;
  delayStart?: number; // milliseconds
}

const HomepageVoiceAnnouncer: React.FC<HomepageVoiceAnnouncerProps> = ({
  autoPlay = true,
  delayStart = 5000, // Default delay of 5 seconds
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  
  // Voice settings
  const [voiceLanguage, setVoiceLanguage] = useState('hi-IN'); // Default to Hindi
  const [voiceGender, setVoiceGender] = useState('female');
  const [voiceRate, setVoiceRate] = useState(0.92);
  const [voicePitch, setVoicePitch] = useState(1.1);
  const [voiceVolume, setVoiceVolume] = useState(1);

  // Ref for speech synthesis utterance
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<number | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const messagesHistoryRef = useRef<string[]>([]);
  
  // Available language options
  const languageOptions = [
    { value: 'hi-IN', label: 'Hindi' },
    { value: 'en-IN', label: 'Indian English' },
    { value: 'en-US', label: 'US English' },
    { value: 'en-GB', label: 'British English' }
  ];
  
  // Welcome messages sequence - including NEET examination focus
  const welcomeMessages = [
    "Welcome to PREPZR. I'm your AI study assistant. How may I help you in preparing for NEET examination.",
    "PREPZR is designed specifically for students preparing for competitive exams like NEET and IIT-JEE.",
    "Our personalized study plans adapt to your learning style and pace, making NEET preparation more effective.",
    "Take our quick Exam Readiness Test to assess your current preparation level and get a customized study plan.",
    "Sign up for a free 7-day trial to access all our features including AI-powered practice tests and personalized feedback.",
    "Our premium plans offer advanced features like doubt resolution, detailed performance tracking, and specialized NEET tutoring.",
    "We've helped thousands of students achieve their dream scores in NEET. Let us help you too!",
    "Click 'Get Started' to begin your NEET preparation journey with PREPZR today!"
  ];

  // PREPZR feature descriptions for the assistant
  const prepzrFeatures = [
    "PREPZR adapts to your emotional state, providing personalized motivation when you feel anxious or tired.",
    "Our AI-powered study plans are tailored to your learning style and exam timeline.",
    "Practice with exam-like questions and get detailed performance analytics to track your progress.",
    "The voice assistant can answer your questions about NEET subjects and guide your study sessions.",
    "PREPZR has helped thousands of students improve their scores by 30% or more!",
    "Our champion methodology is based on years of research on how top scorers prepare for competitive exams."
  ];

  // Check if first visit
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('prepzrHasVisited');
    
    // Only show for first-time visitors
    if (hasVisitedBefore === 'true') {
      setIsVisible(false);
    } else {
      localStorage.setItem('prepzrHasVisited', 'true');
    }
  }, []);

  // Initialize speech synthesis
  useEffect(() => {
    // Don't initialize if not visible
    if (!isVisible) return;
    
    // Check if browser supports speech synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Create utterance object only once
      utteranceRef.current = new SpeechSynthesisUtterance();
      
      // Set voice characteristics based on settings
      updateVoiceSettings();
      
      // Auto-play after delay if enabled - ensuring it starts automatically
      if (autoPlay && isVisible) {
        const timer = setTimeout(() => {
          startAnnouncement();
        }, delayStart);
        
        return () => clearTimeout(timer);
      }
    }
    
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [autoPlay, delayStart, isVisible]);
  
  // Update voice settings whenever they change
  useEffect(() => {
    if (utteranceRef.current) {
      updateVoiceSettings();
    }
  }, [voiceLanguage, voiceGender, voiceRate, voicePitch, voiceVolume]);
  
  // Update the voice settings
  const updateVoiceSettings = () => {
    if (!utteranceRef.current) return;
    
    utteranceRef.current.rate = voiceRate;
    utteranceRef.current.pitch = voicePitch;
    utteranceRef.current.volume = voiceVolume;
    utteranceRef.current.lang = voiceLanguage;
    
    // Try to find the best matching voice
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      // First look for language + gender match
      let selectedVoice = voices.find(voice => 
        voice.lang.includes(voiceLanguage) && 
        ((voiceGender === 'female' && (voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('woman'))) ||
        (voiceGender === 'male' && (voice.name.toLowerCase().includes('male') || voice.name.toLowerCase().includes('man'))))
      );
      
      // If not found, fall back to just language match
      if (!selectedVoice) {
        selectedVoice = voices.find(voice => voice.lang.includes(voiceLanguage));
      }
      
      // If still not found, use any Indian voice for Hindi as fallback
      if (!selectedVoice && voiceLanguage === 'hi-IN') {
        selectedVoice = voices.find(voice => voice.lang.includes('en-IN'));
      }
      
      // If any voice found, use it
      if (selectedVoice) {
        utteranceRef.current.voice = selectedVoice;
        console.log('Using voice:', selectedVoice.name);
      }
    }
  };
  
  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = voiceLanguage; // Use same language as voice
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        handleVoiceInput(transcript);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [voiceLanguage]);
  
  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    // If logged in, show different first message and fewer messages
    if (isLoggedIn && welcomeMessages.length > 0) {
      welcomeMessages[0] = "Welcome back to PREPZR. Ready to continue your NEET preparation journey?";
      // Trim the welcome messages for returning users
      welcomeMessages.splice(3);
      welcomeMessages.push("Let's pick up where you left off with your NEET preparation!");
    }
  }, []);
  
  // Start announcement sequence
  const startAnnouncement = () => {
    if (isPlaying || !utteranceRef.current) return;
    
    setHasStarted(true);
    setIsPlaying(true);
    setCurrentMessageIndex(0);
    
    speakNextMessage();
  };
  
  // Speak the next message in sequence
  const speakNextMessage = () => {
    if (!utteranceRef.current || isMuted) {
      setIsPlaying(false);
      return;
    }
    
    if (currentMessageIndex < welcomeMessages.length) {
      const message = welcomeMessages[currentMessageIndex];
      utteranceRef.current.text = fixPrepzrPronunciation(message);
      
      // Set up events for current utterance
      utteranceRef.current.onstart = () => {
        // Dispatch event to signal speaking started
        document.dispatchEvent(new CustomEvent('voice-speaking-started', { detail: { message } }));
        setProgress(0);
      };
      
      utteranceRef.current.onend = () => {
        // Dispatch event to signal speaking ended
        document.dispatchEvent(new CustomEvent('voice-speaking-ended'));
        
        // Move to next message after a short pause
        setCurrentMessageIndex(prev => prev + 1);
        
        // Schedule next message with pause
        timerRef.current = window.setTimeout(() => {
          speakNextMessage();
        }, 1500);
      };
      
      // Update progress during speech
      utteranceRef.current.onboundary = (event) => {
        if (event.name === 'word' && utteranceRef.current) {
          const totalLength = utteranceRef.current.text.length;
          const progress = event.charIndex / totalLength * 100;
          setProgress(Math.min(progress, 100));
        }
      };
      
      // Start speaking
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      window.speechSynthesis.speak(utteranceRef.current);
    } else {
      // All messages spoken
      setIsPlaying(false);
      setProgress(100);
    }
  };
  
  // Fix PREPZR pronunciation
  const fixPrepzrPronunciation = (text: string) => {
    return text.replace(/PREPZR/gi, 'Prep, zer');
  };
  
  // Handle voice input from user
  const handleVoiceInput = (input: string) => {
    const lowerInput = input.toLowerCase();
    let response = "I'm sorry, I didn't understand that. How can I help you with your NEET preparation on PREPZR?";
    
    // Process common queries
    if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
      response = "Hello! Welcome to PREPZR. How can I assist you with your NEET preparation today?";
    } else if (lowerInput.includes("about") || lowerInput.includes("what is") || lowerInput.includes("tell me about")) {
      response = "PREPZR is an AI-powered study assistant designed to help students prepare for competitive exams like NEET. We offer personalized study plans, adaptive learning, and emotional intelligence to support your journey.";
    } else if (lowerInput.includes("sign up") || lowerInput.includes("register")) {
      response = "To sign up for PREPZR, click the sign up button at the top right of this page. We offer a free 7-day trial with full access to all features!";
    } else if (lowerInput.includes("free trial")) {
      response = "Yes, PREPZR offers a comprehensive 7-day free trial! You'll get access to all our premium features including concept cards, practice exams, and personalized study plans.";
    } else if (lowerInput.includes("exam readiness") || lowerInput.includes("check readiness")) {
      response = "Our Exam Readiness Test evaluates your current preparation level across all NEET subjects. It takes about 15 minutes and gives you a personalized roadmap for improvement. Would you like to take it now?";
    } else if (lowerInput.includes("advantage") || lowerInput.includes("better") || lowerInput.includes("why prepzr")) {
      response = "PREPZR stands out because we combine AI with emotional intelligence to adjust to your learning style. Our platform reduces stress by 40%, improves scores by up to 30%, and saves 60% of preparation time compared to traditional methods.";
    } else if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("subscription")) {
      response = "PREPZR offers flexible pricing plans starting at just ₹999 per month. Our most popular plan is the 6-month package at ₹4,999, which covers your full NEET preparation cycle.";
    } else if (lowerInput.includes("success") || lowerInput.includes("results")) {
      response = "Last year, 87% of PREPZR students scored above 550 in NEET. 35% of our students received admissions to top medical colleges. Our personalized approach makes all the difference!";
    }
    
    // Speak the response
    if (utteranceRef.current) {
      utteranceRef.current.text = fixPrepzrPronunciation(response);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utteranceRef.current);
      messagesHistoryRef.current.push(response);
    }
  };
  
  // Toggle mute
  const toggleMute = () => {
    if (isPlaying && !isMuted) {
      window.speechSynthesis.cancel();
    }
    setIsMuted(!isMuted);
  };
  
  // Toggle listening
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.lang = voiceLanguage;
          recognitionRef.current.start();
          setIsListening(true);
        } catch (e) {
          console.error("Error starting speech recognition:", e);
        }
      }
    }
  };
  
  // Toggle minimize
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  // Toggle subtitles
  const toggleSubtitles = () => {
    setShowSubtitles(!showSubtitles);
  };
  
  // Close assistant
  const closeAssistant = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
    }
    setIsVisible(false);
  };
  
  // Get current message
  const getCurrentMessage = () => {
    if (currentMessageIndex < welcomeMessages.length) {
      return welcomeMessages[currentMessageIndex];
    }
    return "";
  };
  
  // Apply settings
  const applySettings = () => {
    // Save settings to localStorage
    localStorage.setItem('voiceAssistantLanguage', voiceLanguage);
    localStorage.setItem('voiceAssistantGender', voiceGender);
    localStorage.setItem('voiceAssistantRate', voiceRate.toString());
    localStorage.setItem('voiceAssistantPitch', voicePitch.toString());
    localStorage.setItem('voiceAssistantVolume', voiceVolume.toString());
    
    // Update voice settings
    updateVoiceSettings();
    
    // Test the new voice settings
    if (utteranceRef.current) {
      const testMessage = "Hello, this is your PREPZR voice assistant with new settings.";
      utteranceRef.current.text = fixPrepzrPronunciation(testMessage);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utteranceRef.current);
    }
  };
  
  if (!isVisible) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className={`fixed bottom-24 right-6 z-50 flex flex-col ${isMinimized ? 'w-16' : 'w-80 sm:w-96'} 
          backdrop-blur-lg bg-gradient-to-br from-purple-500/90 to-purple-600/90 
          rounded-2xl shadow-xl border border-white/20`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-white/20">
          {!isMinimized && (
            <div className="flex items-center space-x-2">
              <Volume2 className="h-5 w-5 text-white" />
              <span className="font-medium text-white text-sm">PREPZR Assistant</span>
            </div>
          )}
          <div className="flex items-center space-x-2 ml-auto">
            {!isMinimized && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-7 w-7 bg-white/20 hover:bg-white/30">
                    <SettingsIcon className="h-4 w-4 text-white" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[300px]">
                  <SheetHeader>
                    <SheetTitle>Voice Assistant Settings</SheetTitle>
                  </SheetHeader>
                  <div className="py-6 space-y-6">
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select 
                        value={voiceLanguage} 
                        onValueChange={setVoiceLanguage}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                        <SelectContent>
                          {languageOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Voice Gender</Label>
                      <RadioGroup value={voiceGender} onValueChange={setVoiceGender} className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female">Female</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male">Male</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Speech Rate: {voiceRate.toFixed(2)}</Label>
                      </div>
                      <Slider 
                        value={[voiceRate]} 
                        onValueChange={(value) => setVoiceRate(value[0])} 
                        min={0.5} 
                        max={1.5} 
                        step={0.05}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Pitch: {voicePitch.toFixed(2)}</Label>
                      </div>
                      <Slider 
                        value={[voicePitch]} 
                        onValueChange={(value) => setVoicePitch(value[0])} 
                        min={0.8} 
                        max={1.5} 
                        step={0.05}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Volume: {Math.round(voiceVolume * 100)}%</Label>
                      </div>
                      <Slider 
                        value={[voiceVolume]} 
                        onValueChange={(value) => setVoiceVolume(value[0])} 
                        min={0.1} 
                        max={1} 
                        step={0.1}
                      />
                    </div>
                    
                    <Button onClick={applySettings} className="w-full">Apply Settings</Button>
                  </div>
                </SheetContent>
              </Sheet>
            )}
            <Button variant="ghost" size="icon" onClick={toggleMute} 
              className="rounded-full h-7 w-7 bg-white/20 hover:bg-white/30">
              {isMuted ? 
                <VolumeX className="h-4 w-4 text-white" /> : 
                <Volume2 className="h-4 w-4 text-white" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMinimize} 
              className="rounded-full h-7 w-7 bg-white/20 hover:bg-white/30">
              {isMinimized ? 
                <Info className="h-4 w-4 text-white" /> : 
                <Info className="h-4 w-4 text-white" />}
            </Button>
            {!isMinimized && (
              <Button variant="ghost" size="icon" onClick={closeAssistant} 
                className="rounded-full h-7 w-7 bg-white/20 hover:bg-white/30">
                <HelpCircle className="h-4 w-4 text-white" />
              </Button>
            )}
          </div>
        </div>
        
        {/* Content */}
        {!isMinimized && (
          <>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-64">
              {/* Current message */}
              {showSubtitles && isPlaying && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={currentMessageIndex}
                  className="p-3 rounded-lg bg-white/20 text-white text-sm"
                >
                  {getCurrentMessage()}
                </motion.div>
              )}
              
              {/* Progress */}
              {isPlaying && (
                <Progress value={progress} className="h-1" />
              )}
              
              {/* User input */}
              {isListening && (
                <div className="p-3 rounded-lg bg-white/10 text-white text-sm italic">
                  Listening... {userInput && `"${userInput}"`}
                </div>
              )}
              
              {/* Suggestions */}
              {!isPlaying && !isListening && (
                <div className="space-y-2">
                  <p className="text-sm text-white/80">Ask me about:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleVoiceInput("Tell me about PREPZR")}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      About PREPZR
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleVoiceInput("How to sign up")}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      Sign Up
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleVoiceInput("Tell me about the free trial")}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      Free Trial
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleVoiceInput("Why is PREPZR better")}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      Why PREPZR?
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="p-3 border-t border-white/20 flex justify-between items-center">
              {!hasStarted ? (
                <Button 
                  onClick={startAnnouncement} 
                  className="w-full bg-white/20 text-white hover:bg-white/30"
                >
                  Start Guide
                </Button>
              ) : (
                <>
                  {isPlaying ? (
                    <Button 
                      onClick={() => {
                        window.speechSynthesis.cancel();
                        setIsPlaying(false);
                      }} 
                      className="flex-1 bg-white/20 text-white hover:bg-white/30"
                    >
                      Stop
                    </Button>
                  ) : (
                    <Button 
                      onClick={startAnnouncement} 
                      className="flex-1 bg-white/20 text-white hover:bg-white/30"
                    >
                      Restart
                    </Button>
                  )}
                  <div className="w-4"></div>
                  <Button 
                    onClick={toggleListening} 
                    className={`flex-1 ${
                      isListening 
                        ? 'bg-red-500/80 text-white hover:bg-red-600/80' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {isListening ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
                    {isListening ? 'Stop' : 'Ask'}
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

// Fix PREPZR pronunciation for consistency across components
const fixPrepzrPronunciation = (text: string) => {
  return text.replace(/PREPZR/gi, 'Prep, zer');
};

export default HomepageVoiceAnnouncer;
