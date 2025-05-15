
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Settings, X } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

const HomePageVoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showPromptDialog, setShowPromptDialog] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState({
    language: 'hi', // Hindi by default
    voice: 'female',
    pitch: 1.0,
    rate: 1.0,
    volume: 1.0
  });
  const { toast } = useToast();

  useEffect(() => {
    // Load saved voice settings from localStorage if available
    const savedSettings = localStorage.getItem('voiceSettings');
    if (savedSettings) {
      try {
        setVoiceSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Error parsing voice settings:', e);
      }
    }
  }, []);

  useEffect(() => {
    // Save voice settings to localStorage when changed
    localStorage.setItem('voiceSettings', JSON.stringify(voiceSettings));
  }, [voiceSettings]);

  const toggleListening = () => {
    if (!isListening) {
      startListening();
    } else {
      stopListening();
    }
  };

  const startListening = () => {
    setIsListening(true);
    setTranscript('');

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        console.log('Voice recognition started');
        toast({
          title: "I'm listening",
          description: "Ask me anything about PREPZR!",
        });
      };

      recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        setTranscript(speechResult);
        console.log('Voice command received:', speechResult);
        
        // Process the voice command
        processVoiceCommand(speechResult.toLowerCase());
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        toast({
          title: "Oops!",
          description: "I couldn't hear you clearly. Please try again.",
          variant: "destructive"
        });
        setIsListening(false);
      };

      recognition.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
      };

      try {
        recognition.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        toast({
          title: "Error",
          description: "Could not start voice recognition. Please try again.",
          variant: "destructive"
        });
        setIsListening(false);
      }
    } else {
      toast({
        title: "Not Supported",
        description: "Voice recognition is not supported in your browser.",
        variant: "destructive"
      });
      setIsListening(false);
    }
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const processVoiceCommand = (command: string) => {
    // Show what was recognized
    toast({
      title: "I heard",
      description: command,
    });

    // Process common website commands
    if (command.includes('explain') && command.includes('prepzr')) {
      speak("PREPZR, pronounced as Prep-zer, is an AI-powered study companion that helps students prepare for exams more effectively. It adapts to your learning style and provides personalized guidance.");
    } 
    else if (command.includes('sign up') || command.includes('register')) {
      speak("To sign up, click the Sign Up button in the top right corner. Registration takes just a minute and you'll get a 7-day free trial to explore all premium features.");
      // Could also trigger navigation
      setTimeout(() => window.location.href = '/signup', 3000);
    }
    else if (command.includes('login') || command.includes('sign in')) {
      speak("To log in, click the Login button in the top right corner. Enter your credentials to access your personalized dashboard.");
      setTimeout(() => window.location.href = '/login', 3000);
    }
    else if (command.includes('free trial')) {
      speak("PREPZR offers a 7-day free trial with full access to all premium features. You can sign up by clicking the Free Trial button.");
    }
    else if (command.includes('exam readiness')) {
      speak("The Exam Readiness Analyzer helps you evaluate how prepared you are for upcoming exams. It provides detailed insights on strengths and areas that need improvement.");
      const event = new Event('open-exam-analyzer');
      window.dispatchEvent(event);
    }
    else if (command.includes('feature') || command.includes('what can you do')) {
      speak("PREPZR offers personalized study plans, concept cards, interactive flashcards, practice exams, and AI-powered study assistance. We help reduce stress and improve exam performance through adaptive learning.");
    }
    else if (command.includes('help')) {
      setShowPromptDialog(true);
      speak("I can help you navigate the website, explain PREPZR features, help with signup or login, and answer questions about exam preparation. Ask me anything!");
    }
    else {
      speak("I didn't quite catch that. You can ask me about PREPZR features, exam readiness, how to sign up, or request a demonstration.");
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Get available voices
      const voices = window.speechSynthesis.getVoices();
      
      // Set language from settings
      utterance.lang = voiceSettings.language;
      
      // Try to find a voice that matches our preferences
      const preferredVoice = voices.find(voice => 
        voice.lang.startsWith(voiceSettings.language) && 
        (voiceSettings.voice === 'female' ? voice.name.includes('Female') || voice.name.includes('female') : 
         voiceSettings.voice === 'male' ? voice.name.includes('Male') || voice.name.includes('male') : true)
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      // Apply other voice settings
      utterance.pitch = voiceSettings.pitch;
      utterance.rate = voiceSettings.rate;
      utterance.volume = voiceSettings.volume;
      
      window.speechSynthesis.speak(utterance);
    } else {
      console.error('Speech synthesis not supported');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              size="lg"
              className={`rounded-full p-3 shadow-lg ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-600 hover:bg-purple-700'}`}
              onClick={toggleListening}
            >
              {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isListening ? "Stop Listening" : "Ask me about PREPZR"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Settings button next to mic */}
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full p-3 shadow-lg ml-2 bg-gray-100 dark:bg-gray-800 border-purple-300"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Voice Assistant Settings</SheetTitle>
          </SheetHeader>
          <div className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select 
                value={voiceSettings.language}
                onValueChange={(value) => setVoiceSettings({...voiceSettings, language: value})}
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="en-IN">English (Indian)</SelectItem>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="en-GB">English (UK)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="voice">Voice Type</Label>
              <Select 
                value={voiceSettings.voice}
                onValueChange={(value) => setVoiceSettings({...voiceSettings, voice: value})}
              >
                <SelectTrigger id="voice">
                  <SelectValue placeholder="Select Voice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pitch">Pitch: {voiceSettings.pitch.toFixed(1)}</Label>
              <Slider 
                id="pitch"
                min={0.1} 
                max={2} 
                step={0.1} 
                value={[voiceSettings.pitch]}
                onValueChange={([value]) => setVoiceSettings({...voiceSettings, pitch: value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rate">Speed: {voiceSettings.rate.toFixed(1)}</Label>
              <Slider 
                id="rate"
                min={0.1} 
                max={2} 
                step={0.1} 
                value={[voiceSettings.rate]}
                onValueChange={([value]) => setVoiceSettings({...voiceSettings, rate: value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="volume">Volume: {voiceSettings.volume.toFixed(1)}</Label>
              <Slider 
                id="volume"
                min={0} 
                max={1} 
                step={0.1} 
                value={[voiceSettings.volume]}
                onValueChange={([value]) => setVoiceSettings({...voiceSettings, volume: value})}
              />
            </div>
            
            <Button 
              className="w-full" 
              onClick={() => {
                speak("This is a test of your current voice settings. You can adjust the settings to your preference.");
              }}
            >
              Test Voice
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <Dialog open={showPromptDialog} onOpenChange={setShowPromptDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>How can I help you?</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowPromptDialog(false)}
                className="h-8 w-8 p-0 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Try saying one of these phrases:
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4">
            <Button variant="outline" onClick={() => {
              speak("PREPZR, pronounced as Prep-zer, is an AI-powered study companion that helps students prepare for exams more effectively.");
              setShowPromptDialog(false);
            }}>
              "Explain what is PREPZR"
            </Button>
            
            <Button variant="outline" onClick={() => {
              speak("PREPZR offers personalized study plans, concept cards, interactive flashcards, practice exams, and AI-powered study assistance.");
              setShowPromptDialog(false);
            }}>
              "What features does PREPZR have?"
            </Button>
            
            <Button variant="outline" onClick={() => {
              speak("To sign up, click the Sign Up button in the top right corner. Registration takes just a minute and you'll get access to all features.");
              setTimeout(() => window.location.href = '/signup', 3000);
              setShowPromptDialog(false);
            }}>
              "How do I sign up?"
            </Button>
            
            <Button variant="outline" onClick={() => {
              const event = new Event('open-exam-analyzer');
              window.dispatchEvent(event);
              speak("Opening the Exam Readiness Analyzer to help you evaluate your preparation level.");
              setShowPromptDialog(false);
            }}>
              "Open Exam Readiness Analyzer"
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomePageVoiceAssistant;
