
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Mic, MicOff, Settings, Globe, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { MoodType } from '@/types/user/base';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_VOICE_SETTINGS } from './voiceUtils';

interface VoiceDashboardAssistantProps {
  userName?: string;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  onStudyPlanRequest?: () => void;
}

const VoiceDashboardAssistant: React.FC<VoiceDashboardAssistantProps> = ({
  userName,
  currentMood,
  onMoodChange,
  onStudyPlanRequest
}) => {
  const [expanded, setExpanded] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [voiceSettings, setVoiceSettings] = useState(DEFAULT_VOICE_SETTINGS);
  const [recognition, setRecognition] = useState<any>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const navigate = useNavigate();
  
  // Language options with support for Hindi
  const languageOptions = [
    { value: 'en-US', label: 'English (US)' },
    { value: 'en-GB', label: 'English (UK)' },
    { value: 'en-IN', label: 'English (India)' },
    { value: 'hi-IN', label: 'Hindi' },
    { value: 'es-ES', label: 'Spanish' },
    { value: 'fr-FR', label: 'French' },
    { value: 'de-DE', label: 'German' },
  ];
  
  // Initialize speech recognition and synthesis
  useEffect(() => {
    // Check for browser support
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      toast({
        title: "Voice Support Limited",
        description: "Your browser doesn't fully support voice features. For best experience, use Chrome.",
        variant: "warning"
      });
      return;
    }
    
    // Load voices
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };
    
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    loadVoices();
    
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = voiceSettings.language;
    
    recognitionInstance.onstart = () => {
      setListening(true);
    };
    
    recognitionInstance.onresult = (event: any) => {
      const currentTranscript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('');
      
      setTranscript(currentTranscript);
      processVoiceCommand(currentTranscript);
    };
    
    recognitionInstance.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setListening(false);
    };
    
    recognitionInstance.onend = () => {
      setListening(false);
    };
    
    setRecognition(recognitionInstance);
    
    // Load saved settings
    const savedSettings = localStorage.getItem('voiceSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        // Voice can't be serialized, so we need to find it again
        const voiceURI = parsedSettings.voice?.voiceURI;
        const matchedVoice = voiceURI 
          ? speechSynthesis.getVoices().find(v => v.voiceURI === voiceURI) 
          : null;
        
        setVoiceSettings({
          ...parsedSettings,
          voice: matchedVoice
        });
      } catch (e) {
        console.error('Error parsing voice settings:', e);
      }
    }
    
    return () => {
      if (recognitionInstance) {
        try {
          recognitionInstance.stop();
        } catch (e) {
          // Ignore errors when stopping recognition
        }
      }
    };
  }, []);
  
  // Process voice commands
  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Navigation commands
    if (lowerCommand.includes('go to dashboard') || lowerCommand.includes('show dashboard')) {
      speakResponse("Opening dashboard");
      navigate('/dashboard/student');
    }
    else if (lowerCommand.includes('go to concepts') || lowerCommand.includes('show concepts')) {
      speakResponse("Opening concept cards");
      navigate('/dashboard/student/concepts');
    }
    else if (lowerCommand.includes('go to flashcards') || lowerCommand.includes('show flashcards')) {
      speakResponse("Opening flashcards");
      navigate('/dashboard/student/flashcards');
    }
    else if (lowerCommand.includes('go to practice') || lowerCommand.includes('open practice')) {
      speakResponse("Opening practice exams");
      navigate('/dashboard/student/practice-exam');
    }
    else if (lowerCommand.includes('study plan') || lowerCommand.includes('show my plan')) {
      speakResponse("Opening your study plan");
      if (onStudyPlanRequest) onStudyPlanRequest();
    }
    // Mood tracking commands
    else if (lowerCommand.includes('i feel happy') || lowerCommand.includes('feeling happy')) {
      handleMoodChange(MoodType.HAPPY, "I'm glad you're feeling happy! This is a great time to tackle challenging topics.");
    }
    else if (lowerCommand.includes('i feel motivated') || lowerCommand.includes('feeling motivated')) {
      handleMoodChange(MoodType.MOTIVATED, "That's the spirit! Your motivation will help you accomplish great things today.");
    }
    else if (lowerCommand.includes('i feel tired') || lowerCommand.includes('feeling tired')) {
      handleMoodChange(MoodType.TIRED, "I understand you're feeling tired. Let me suggest some lighter study options.");
    }
    else if (lowerCommand.includes('i feel anxious') || lowerCommand.includes('feeling anxious')) {
      handleMoodChange(MoodType.ANXIOUS, "I can see you're feeling anxious. Let's focus on building confidence with topics you know well.");
    }
    else if (lowerCommand.includes('i feel stressed') || lowerCommand.includes('feeling stressed')) {
      handleMoodChange(MoodType.STRESSED, "Being stressed is normal during exam prep. Let's break things into smaller, manageable chunks.");
    }
    else if (lowerCommand.includes('i feel confused') || lowerCommand.includes('feeling confused')) {
      handleMoodChange(MoodType.CONFUSED, "If you're feeling confused, let's focus on clarifying the fundamentals first.");
    }
    // Pronunciation of PREPZR
    else if (lowerCommand.includes('say prepzr') || lowerCommand.includes('pronounce prepzr')) {
      speakWithPause("Prep", "zer", 100);
    }
    // Help command
    else if (lowerCommand.includes('what can you do') || lowerCommand.includes('help me')) {
      speakResponse("I can help you navigate the dashboard, track your mood, open your study plan, and provide study suggestions. Try asking me to go to concepts or update your mood.");
    }
    // Greeting
    else if (lowerCommand.includes('hello') || lowerCommand.includes('hi there')) {
      const greeting = userName ? `Hello ${userName}! How can I help you with your studies today?` : "Hello! How can I help you with your studies today?";
      speakResponse(greeting);
    }
  };
  
  const handleMoodChange = (mood: MoodType, response: string) => {
    if (onMoodChange) {
      onMoodChange(mood);
      speakResponse(response);
      
      toast({
        title: "Mood Updated",
        description: `Your mood has been set to ${mood}`,
      });
    }
  };
  
  // Start listening
  const startListening = () => {
    if (recognition) {
      try {
        recognition.lang = voiceSettings.language;
        recognition.start();
        setListening(true);
        
        toast({
          title: "Voice Assistant Activated",
          description: "I'm listening. What can I help you with?",
        });
      } catch (error) {
        console.error("Error starting speech recognition:", error);
      }
    }
  };
  
  // Stop listening
  const stopListening = () => {
    if (recognition) {
      try {
        recognition.stop();
        setListening(false);
      } catch (error) {
        console.error("Error stopping speech recognition:", error);
      }
    }
  };
  
  // Handle voice settings changes
  const handleSettingsChange = (setting: string, value: any) => {
    setVoiceSettings(prev => {
      const newSettings = { ...prev, [setting]: value };
      
      // Save to localStorage without voice object
      localStorage.setItem('voiceSettings', JSON.stringify({
        ...newSettings,
        voice: null // Voice object can't be serialized
      }));
      
      return newSettings;
    });
    
    // Update recognition language if that changed
    if (setting === 'language' && recognition) {
      recognition.lang = value;
    }
  };
  
  // Speak response
  const speakResponse = (text: string) => {
    if (!voiceSettings.enabled || voiceSettings.muted) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Apply voice settings
    utterance.volume = voiceSettings.volume;
    utterance.rate = voiceSettings.rate;
    utterance.pitch = voiceSettings.pitch;
    utterance.lang = voiceSettings.language;
    
    // Use selected voice if available
    if (voiceSettings.voice) {
      utterance.voice = voiceSettings.voice;
    }
    
    window.speechSynthesis.speak(utterance);
  };
  
  // Special pronunciation for PREPZR with pause
  const speakWithPause = (firstPart: string, secondPart: string, pauseDuration: number) => {
    if (!voiceSettings.enabled || voiceSettings.muted) return;
    
    const utterance1 = new SpeechSynthesisUtterance(firstPart);
    const utterance2 = new SpeechSynthesisUtterance(secondPart);
    
    // Apply voice settings
    utterance1.volume = utterance2.volume = voiceSettings.volume;
    utterance1.rate = utterance2.rate = voiceSettings.rate;
    utterance1.pitch = utterance2.pitch = voiceSettings.pitch;
    utterance1.lang = utterance2.lang = voiceSettings.language;
    
    // Use selected voice if available
    if (voiceSettings.voice) {
      utterance1.voice = utterance2.voice = voiceSettings.voice;
    }
    
    utterance1.onend = () => {
      setTimeout(() => {
        window.speechSynthesis.speak(utterance2);
      }, pauseDuration);
    };
    
    window.speechSynthesis.speak(utterance1);
  };
  
  // Handle voice selection
  const handleVoiceChange = (voiceURI: string) => {
    const selectedVoice = availableVoices.find(voice => voice.voiceURI === voiceURI) || null;
    handleSettingsChange('voice', selectedVoice);
  };
  
  // Get voices for selected language
  const getVoicesForCurrentLanguage = () => {
    const languagePrefix = voiceSettings.language.split('-')[0];
    return availableVoices.filter(voice => 
      voice.lang.startsWith(languagePrefix)
    );
  };
  
  // React to mood changes
  useEffect(() => {
    if (currentMood && voiceSettings.enabled && !voiceSettings.muted) {
      // Store the mood in local storage to prevent repeated announcements
      const lastAnnouncedMood = localStorage.getItem('last_announced_mood');
      
      if (lastAnnouncedMood !== currentMood) {
        // Wait a bit before speaking about the mood change
        setTimeout(() => {
          let response = '';
          
          switch (currentMood) {
            case MoodType.HAPPY:
              response = `I notice you're feeling happy! This is a perfect time to tackle challenging topics.`;
              break;
            case MoodType.MOTIVATED:
              response = `Your motivation is inspiring! Let's make the most of it with focused study sessions.`;
              break;
            case MoodType.TIRED:
              response = `I see you're feeling tired. How about focusing on lighter review sessions today?`;
              break;
            case MoodType.ANXIOUS:
              response = `It's okay to feel anxious about exams. Let's start with some confidence-building exercises.`;
              break;
            case MoodType.STRESSED:
              response = `When you're stressed, breaking tasks into smaller parts can help. Would you like me to suggest a manageable study plan?`;
              break;
            default:
              response = `I've noted your mood change. Let's adjust your study approach accordingly.`;
          }
          
          speakResponse(response);
          localStorage.setItem('last_announced_mood', String(currentMood));
        }, 2000);
      }
    }
  }, [currentMood, voiceSettings.enabled, voiceSettings.muted]);
  
  if (!expanded) {
    return (
      <Button
        onClick={() => setExpanded(true)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg"
      >
        <Mic className="h-5 w-5" />
      </Button>
    );
  }
  
  return (
    <Card className="w-80 shadow-xl">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            Voice Assistant
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(false)} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-2 pb-2 space-y-4">
        {transcript && (
          <div className="bg-muted p-2 rounded-md">
            <p className="text-xs font-medium mb-1">You said:</p>
            <p className="text-sm">{transcript}</p>
          </div>
        )}
        
        {/* Language Selection */}
        <div>
          <Label htmlFor="voice-language" className="text-xs block mb-1.5">Language</Label>
          <Select 
            value={voiceSettings.language} 
            onValueChange={(value) => handleSettingsChange('language', value)}
          >
            <SelectTrigger id="voice-language" className="w-full">
              <SelectValue placeholder="Select Language" />
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
        
        {/* Voice Selection */}
        <div>
          <Label htmlFor="voice-selection" className="text-xs block mb-1.5">Voice</Label>
          <Select 
            value={voiceSettings.voice?.voiceURI || ''} 
            onValueChange={handleVoiceChange}
          >
            <SelectTrigger id="voice-selection" className="w-full">
              <SelectValue placeholder="Default Voice" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Default Voice</SelectItem>
              {getVoicesForCurrentLanguage().map(voice => (
                <SelectItem key={voice.voiceURI} value={voice.voiceURI}>
                  {voice.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Voice Settings */}
        <div className="space-y-3">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="voice-volume" className="text-xs">Volume</Label>
              <span className="text-xs">{Math.round(voiceSettings.volume * 100)}%</span>
            </div>
            <Slider
              id="voice-volume"
              min={0}
              max={1}
              step={0.1}
              value={[voiceSettings.volume]}
              onValueChange={([value]) => handleSettingsChange('volume', value)}
            />
          </div>
          
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="voice-rate" className="text-xs">Speed</Label>
              <span className="text-xs">{voiceSettings.rate.toFixed(1)}x</span>
            </div>
            <Slider
              id="voice-rate"
              min={0.5}
              max={2}
              step={0.1}
              value={[voiceSettings.rate]}
              onValueChange={([value]) => handleSettingsChange('rate', value)}
            />
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <Label htmlFor="voice-muted" className="text-xs">Mute Voice</Label>
            <Switch 
              id="voice-muted"
              checked={voiceSettings.muted}
              onCheckedChange={(checked) => handleSettingsChange('muted', checked)}
            />
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button
          className="w-full"
          variant={listening ? "destructive" : "default"}
          onClick={listening ? stopListening : startListening}
        >
          {listening ? (
            <>
              <MicOff className="mr-2 h-4 w-4" />
              Stop Listening
            </>
          ) : (
            <>
              <Mic className="mr-2 h-4 w-4" />
              Start Listening
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VoiceDashboardAssistant;
