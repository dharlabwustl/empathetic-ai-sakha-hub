
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const HomePageVoiceAssistant: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showTranscript, setShowTranscript] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Voice settings state
  const [voiceSettings, setVoiceSettings] = useState({
    volume: 1,
    rate: 1,
    pitch: 1,
    language: 'hi-IN', // Default to Hindi
    enabled: true,
    muted: false,
    autoGreet: true,
    gender: 'female'
  });
  
  // Speech recognition setup
  const [recognition, setRecognition] = useState<any>(null);
  
  // Initialize voice features
  useEffect(() => {
    // Load saved voice settings from localStorage
    const savedSettings = localStorage.getItem('voiceSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setVoiceSettings(prevSettings => ({...prevSettings, ...parsedSettings}));
      } catch (e) {
        console.error('Error parsing voice settings:', e);
      }
    }
    
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech Recognition not supported in this browser");
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = voiceSettings.language;

    recognitionInstance.onstart = () => {
      setIsListening(true);
    };

    recognitionInstance.onresult = (event: any) => {
      const currentTranscript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join(' ');
      
      setTranscript(currentTranscript);
      setShowTranscript(true);
      
      // Process the command
      processCommand(currentTranscript);
    };

    recognitionInstance.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
    };

    setRecognition(recognitionInstance);
    
    return () => {
      try {
        recognitionInstance.abort();
      } catch (e) {
        console.error("Error stopping recognition:", e);
      }
    };
  }, [voiceSettings.language]);

  // Process visitor voice commands
  const processCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    
    // Sign up commands
    if (lowerCommand.includes('sign up') || lowerCommand.includes('register') || lowerCommand.includes('create account')) {
      speakResponse("I'll help you sign up for PREPZR. Let me take you to the registration page.");
      navigate('/signup');
      return;
    }
    
    // Login commands
    if (lowerCommand.includes('log in') || lowerCommand.includes('login') || lowerCommand.includes('sign in')) {
      speakResponse("Taking you to the login page.");
      navigate('/login');
      return;
    }
    
    // Free trial commands
    if (lowerCommand.includes('free trial') || lowerCommand.includes('try for free')) {
      speakResponse("PREPZR offers a free trial so you can experience our platform. Let me take you to sign up for a free account.");
      navigate('/signup');
      return;
    }
    
    // Exam readiness commands
    if (lowerCommand.includes('exam readiness') || lowerCommand.includes('ready for exam') || lowerCommand.includes('check my readiness')) {
      speakResponse("Let me help you check your exam readiness with our analyzer tool.");
      const event = new Event('open-exam-analyzer');
      window.dispatchEvent(event);
      return;
    }
    
    // What is PREPZR commands
    if (lowerCommand.includes('what is prepzr') || lowerCommand.includes('explain prepzr') || lowerCommand.includes('about prepzr')) {
      speakResponse("Prep-zer is an AI-powered study companion that adapts to your learning style. It offers features like personalized study plans, concept cards, flashcards, practice exams, and a 24/7 AI tutor to help you achieve your academic goals and ace your exams.");
      return;
    }
    
    // Why PREPZR is best commands
    if (lowerCommand.includes('why prepzr') || lowerCommand.includes('best for exam') || lowerCommand.includes('advantages') || lowerCommand.includes('benefits')) {
      speakResponse("Prep-zer offers unique advantages for exam preparation: personalized AI-driven study plans, adaptive learning that responds to your mood and performance, comprehensive revision tools with flashcards and concept maps, realistic practice exams, and 24/7 AI tutoring support. Our platform is designed to optimize your study time and boost your exam performance.");
      return;
    }
    
    // Features commands
    if (lowerCommand.includes('features') || lowerCommand.includes('what can i do')) {
      speakResponse("Prep-zer offers comprehensive exam preparation features including personalized study plans, flashcards, concept cards, formula lab, practice exams, performance analytics, and a 24/7 AI tutor. Would you like to learn more about any specific feature?");
      return;
    }
    
    // Help or unknown commands
    speakResponse("Welcome to Prep-zer! I can help you learn about our platform, sign up for a free trial, check your exam readiness, or explore our features. What would you like to know?");
  };

  // Toggle listening state
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Start listening
  const startListening = () => {
    if (!recognition) return;
    
    try {
      recognition.lang = voiceSettings.language;
      recognition.start();
      toast({
        title: "Voice Assistant Activated",
        description: "I'm listening. How can I help you with PREPZR?",
      });
      setShowTranscript(true);
    } catch (error) {
      console.error("Error starting recognition:", error);
    }
  };

  // Stop listening
  const stopListening = () => {
    if (!recognition) return;
    
    try {
      recognition.stop();
      
      // Delay hiding the transcript
      setTimeout(() => {
        if (!transcript) {
          setShowTranscript(false);
        }
      }, 3000);
    } catch (error) {
      console.error("Error stopping recognition:", error);
    }
  };

  // Speak response with language support
  const speakResponse = (text: string) => {
    if (!voiceSettings.enabled || voiceSettings.muted) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Improve PREPZR pronunciation
    const processedText = text.replace(/PREPZR/gi, 'Prep-zer');
    utterance.text = processedText;
    
    // Set language based on settings
    utterance.lang = voiceSettings.language;
    
    // Try to use a good voice if available
    const voices = window.speechSynthesis.getVoices();
    let preferredVoice;
    
    // Get voice based on language and gender preference
    if (voiceSettings.language === 'hi-IN') {
      preferredVoice = voices.find(voice => 
        voice.lang.includes('hi') && 
        ((voiceSettings.gender === 'female' && voice.name.includes('Female')) || 
         (voiceSettings.gender === 'male' && voice.name.includes('Male')))
      );
    } else {
      preferredVoice = voices.find(voice => 
        voice.lang.includes(voiceSettings.language) && 
        ((voiceSettings.gender === 'female' && (voice.name.includes('Female') || voice.name.includes('Samantha'))) || 
         (voiceSettings.gender === 'male' && voice.name.includes('Male')))
      );
    }
    
    // If no specific gender/language match found, try general language match
    if (!preferredVoice) {
      preferredVoice = voices.find(voice => voice.lang.includes(voiceSettings.language.split('-')[0]));
    }
    
    // If still no match, use default
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    // Set voice parameters from settings
    utterance.volume = voiceSettings.volume;
    utterance.rate = voiceSettings.rate;
    utterance.pitch = voiceSettings.pitch;
    
    window.speechSynthesis.speak(utterance);
    
    // Also display as toast for accessibility
    toast({
      title: "PREPZR Assistant",
      description: processedText,
      duration: 5000,
    });
  };
  
  // Handle voice settings changes
  const handleSettingsChange = (setting: string, value: any) => {
    setVoiceSettings(prev => {
      const updated = { ...prev, [setting]: value };
      localStorage.setItem('voiceSettings', JSON.stringify(updated));
      return updated;
    });
  };

  // Test current voice settings
  const testVoice = () => {
    const testMessages = {
      'en-US': "Hello, I'm your Prep-zer voice assistant with American accent.",
      'en-GB': "Hello, I'm your Prep-zer voice assistant with British accent.",
      'en-IN': "Hello, I'm your Prep-zer voice assistant with Indian English accent.",
      'hi-IN': "नमस्ते, मैं आपका प्रेप-ज़र वॉइस असिस्टेंट हूँ।"
    };
    
    const message = testMessages[voiceSettings.language as keyof typeof testMessages] || testMessages['en-US'];
    speakResponse(message);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Transcript display */}
      {showTranscript && transcript && (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg max-w-xs md:max-w-md transition-all duration-300 mb-2 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {isListening ? "Listening..." : "I heard:"}
            </span>
            {isListening && (
              <span className="flex items-center">
                <span className="animate-pulse mr-1 h-2 w-2 bg-green-500 rounded-full inline-block"></span>
                <span className="animate-pulse delay-75 mr-1 h-2 w-2 bg-green-500 rounded-full inline-block"></span>
                <span className="animate-pulse delay-150 h-2 w-2 bg-green-500 rounded-full inline-block"></span>
              </span>
            )}
          </div>
          <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
            {transcript}
          </p>
        </div>
      )}
      
      {/* Voice assistant buttons */}
      <div className="flex items-center space-x-2">
        {/* Settings popover */}
        <Popover open={showSettings} onOpenChange={setShowSettings}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="icon"
              className="rounded-full shadow-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Settings className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h4 className="font-medium">Voice Assistant Settings</h4>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="voice-enabled" className="flex-1">Enable Voice Assistant</Label>
                  <Switch 
                    id="voice-enabled"
                    checked={voiceSettings.enabled}
                    onCheckedChange={(checked) => handleSettingsChange('enabled', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="voice-muted" className="flex-1">Mute Voice Responses</Label>
                  <Switch 
                    id="voice-muted"
                    checked={voiceSettings.muted}
                    onCheckedChange={(checked) => handleSettingsChange('muted', checked)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="voice-language">Language</Label>
                <Select 
                  value={voiceSettings.language}
                  onValueChange={(value) => handleSettingsChange('language', value)}
                >
                  <SelectTrigger id="voice-language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hi-IN">Hindi (हिंदी)</SelectItem>
                    <SelectItem value="en-IN">English (Indian)</SelectItem>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="en-GB">English (UK)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="voice-gender">Voice Gender</Label>
                <Select 
                  value={voiceSettings.gender}
                  onValueChange={(value) => handleSettingsChange('gender', value)}
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
                <Label htmlFor="voice-volume">Volume</Label>
                <Slider
                  id="voice-volume"
                  min={0}
                  max={1}
                  step={0.1}
                  value={[voiceSettings.volume]}
                  onValueChange={([value]) => handleSettingsChange('volume', value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="voice-rate">Speech Rate</Label>
                <Slider
                  id="voice-rate"
                  min={0.5}
                  max={2}
                  step={0.1}
                  value={[voiceSettings.rate]}
                  onValueChange={([value]) => handleSettingsChange('rate', value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="voice-pitch">Pitch</Label>
                <Slider
                  id="voice-pitch"
                  min={0.5}
                  max={2}
                  step={0.1}
                  value={[voiceSettings.pitch]}
                  onValueChange={([value]) => handleSettingsChange('pitch', value)}
                />
              </div>
              
              <Button 
                variant="outline" 
                onClick={testVoice}
                className="w-full mt-2"
              >
                <Volume2 className="h-4 w-4 mr-2" />
                Test Voice
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Main voice button */}
        <Button
          variant="default"
          size="icon"
          className={`h-12 w-12 rounded-full shadow-xl flex items-center justify-center ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
          onClick={toggleListening}
        >
          {isListening ? (
            <MicOff className="h-6 w-6 text-white" />
          ) : (
            <Mic className="h-6 w-6 text-white" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default HomePageVoiceAssistant;
