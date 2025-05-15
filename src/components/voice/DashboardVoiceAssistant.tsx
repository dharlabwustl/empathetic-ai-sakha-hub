
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, Settings } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MoodType } from '@/types/user/base';
import { useNavigate } from 'react-router-dom';

interface DashboardVoiceAssistantProps {
  userName?: string;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const DashboardVoiceAssistant: React.FC<DashboardVoiceAssistantProps> = ({
  userName = 'Student',
  currentMood,
  onMoodChange
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState({
    volume: 1,
    rate: 1,
    pitch: 1,
    language: 'en-US',
    enabled: true,
    muted: false,
    autoGreet: true
  });

  // Initialize speech recognition
  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition. Try using Chrome.",
        variant: "destructive"
      });
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = 'en-US';

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
      processVoiceCommand(currentTranscript);
    };

    recognitionInstance.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
    };

    setRecognition(recognitionInstance);

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
    
    return () => {
      try {
        recognitionInstance.abort();
      } catch (e) {
        console.error("Error stopping recognition:", e);
      }
    };
  }, [toast]);

  // Process voice commands with integration to dashboard features
  const processVoiceCommand = useCallback((command: string) => {
    const lowerCommand = command.toLowerCase().trim();
    
    // Helper function to speak responses
    const respond = (message: string) => {
      if (!voiceSettings.enabled || voiceSettings.muted) return;
      
      // Improve PREPZR pronunciation
      const processedText = message.replace(/PREPZR/gi, 'Prep-zer');
      
      const utterance = new SpeechSynthesisUtterance(processedText);
      utterance.volume = voiceSettings.volume;
      utterance.rate = voiceSettings.rate;
      utterance.pitch = voiceSettings.pitch;
      
      // Try to use a preferred voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google') || voice.name.includes('Female') || voice.name.includes('Samantha')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      window.speechSynthesis.speak(utterance);
      
      // Also display as toast
      toast({
        title: "PREPZR Assistant",
        description: processedText,
        duration: 5000,
      });
    };

    // Navigation commands
    if (lowerCommand.includes('go to dashboard') || lowerCommand.includes('open dashboard')) {
      respond('Opening the dashboard');
      navigate('/dashboard/student');
      return;
    }
    
    if (lowerCommand.includes('go to concepts') || lowerCommand.includes('show concepts')) {
      respond('Opening concept cards');
      navigate('/dashboard/student/concepts');
      return;
    }
    
    if (lowerCommand.includes('go to flashcards') || lowerCommand.includes('show flashcards')) {
      respond('Opening flashcards');
      navigate('/dashboard/student/flashcards');
      return;
    }
    
    if (lowerCommand.includes('study plan') || lowerCommand.includes('my plan')) {
      respond('Opening your study plan');
      navigate('/dashboard/student/study-plan');
      return;
    }
    
    if (lowerCommand.includes('practice exam') || lowerCommand.includes('practice test')) {
      respond('Opening practice exams');
      navigate('/dashboard/student/practice-exam');
      return;
    }
    
    // Study assistance commands
    if (lowerCommand.includes('help me study') || lowerCommand.includes('study tips')) {
      respond(`Here are some study tips: 1. Break down complex topics into smaller chunks. 2. Use active recall by testing yourself. 3. Take regular breaks using the Pomodoro technique. 4. Review material before bedtime for better retention. Would you like more specific tips for your current subject?`);
      return;
    }
    
    // Mood tracking commands
    if (lowerCommand.includes('feeling happy') || lowerCommand.includes('i am happy') || lowerCommand.includes('i feel happy')) {
      respond(`Great to hear you're feeling happy! I'll update your mood tracking.`);
      onMoodChange && onMoodChange(MoodType.HAPPY);
      return;
    }
    
    if (lowerCommand.includes('feeling tired') || lowerCommand.includes('i am tired') || lowerCommand.includes('i feel tired')) {
      respond(`I understand you're feeling tired. Let me suggest some lighter study activities for you. I'll update your mood tracker.`);
      onMoodChange && onMoodChange(MoodType.TIRED);
      return;
    }
    
    if (lowerCommand.includes('feeling stressed') || lowerCommand.includes('i am stressed') || lowerCommand.includes('i feel stressed')) {
      respond(`I'm sorry to hear you're feeling stressed. Consider taking a short break with some deep breathing exercises. I'll update your mood tracker and adapt your study suggestions.`);
      onMoodChange && onMoodChange(MoodType.STRESSED);
      return;
    }
    
    if (lowerCommand.includes('feeling motivated') || lowerCommand.includes('i am motivated') || lowerCommand.includes('i feel motivated')) {
      respond(`That's excellent! When you're feeling motivated, it's a great time to tackle more challenging topics. I'll update your mood tracker.`);
      onMoodChange && onMoodChange(MoodType.MOTIVATED);
      return;
    }
    
    if (lowerCommand.includes('feeling anxious') || lowerCommand.includes('i am anxious') || lowerCommand.includes('i feel anxious')) {
      respond(`I understand anxiety can be challenging, especially during exam preparation. Let's focus on building your confidence with some review of topics you know well. I'll update your mood tracker.`);
      onMoodChange && onMoodChange(MoodType.ANXIOUS);
      return;
    }
    
    if (lowerCommand.includes('feeling confused') || lowerCommand.includes('i am confused') || lowerCommand.includes('i feel confused')) {
      respond(`It's normal to feel confused when learning complex topics. Let's break down what you're studying into smaller parts. I'll update your mood and suggest some concept cards that might help clarify things.`);
      onMoodChange && onMoodChange(MoodType.CONFUSED);
      return;
    }
    
    // Help command
    if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      respond(`I'm your Prep-zer assistant. I can help you navigate the dashboard, update your mood, provide study tips, and explain features. Try saying "go to concepts", "I'm feeling tired", "help me study", or "explain flashcards".`);
      return;
    }
    
    // Explaining features
    if (lowerCommand.includes('explain concept cards') || lowerCommand.includes('what are concept cards')) {
      respond(`Concept cards in Prep-zer help you master key academic concepts with visual explanations, examples, and application scenarios. They break down complex topics into digestible chunks for better understanding and retention.`);
      return;
    }
    
    if (lowerCommand.includes('explain flashcards') || lowerCommand.includes('what are flashcards')) {
      respond(`Flashcards are bite-sized learning tools that help you memorize and recall information quickly. In Prep-zer, you can create your own flashcards or use our pre-made ones for effective active recall practice.`);
      return;
    }
    
    if (lowerCommand.includes('explain formula lab') || lowerCommand.includes('what is formula lab')) {
      respond(`The Formula Lab is where you can practice and master mathematical and scientific formulas. It provides interactive exercises with step-by-step solutions to help you apply formulas in different contexts.`);
      return;
    }
    
    if (lowerCommand.includes('explain practice exam') || lowerCommand.includes('what are practice exams')) {
      respond(`Practice exams simulate real test conditions to prepare you for your actual exams. They help identify knowledge gaps, reduce test anxiety, and improve time management. Prep-zer offers customizable practice tests with detailed performance analytics.`);
      return;
    }
    
    if (lowerCommand.includes('pronounce prepzr') || lowerCommand.includes('say prepzr')) {
      respond(`The name is pronounced as Prep-zer.`);
      return;
    }
    
    // Default response
    respond(`Hello ${userName}! How can I help with your studies today? You can ask me to navigate the dashboard, update your mood, provide study tips, or explain features.`);
  }, [voiceSettings, navigate, toast, userName, onMoodChange]);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    if (!recognition) return;
    
    try {
      recognition.start();
      setShowTranscript(true);
      toast({
        title: "Voice Assistant Activated",
        description: "I'm listening. What can I help you with?",
      });
    } catch (error) {
      console.error("Error starting recognition:", error);
    }
  };

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

  // Handle voice settings changes
  const handleSettingsChange = (setting: string, value: any) => {
    setVoiceSettings(prev => {
      const updated = { ...prev, [setting]: value };
      localStorage.setItem('voiceSettings', JSON.stringify(updated));
      return updated;
    });
  };

  const getMoodEmoji = (mood?: MoodType) => {
    switch (mood) {
      case MoodType.HAPPY: return '😊';
      case MoodType.MOTIVATED: return '💪';
      case MoodType.FOCUSED: return '🧠';
      case MoodType.TIRED: return '😴';
      case MoodType.STRESSED: return '😰';
      case MoodType.ANXIOUS: return '😟';
      case MoodType.OVERWHELMED: return '🥵';
      case MoodType.CONFUSED: return '🤔';
      default: return '😐';
    }
  };

  return (
    <div className="fixed bottom-24 right-6 md:bottom-6 md:right-6 z-40 flex flex-col items-end gap-3">
      {/* Transcript display */}
      {showTranscript && (
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
            {transcript || "Waiting for your command..."}
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
              <h4 className="font-medium text-sm">Voice Assistant Settings</h4>
              
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
              
              <div className="pt-2">
                <Alert>
                  <AlertTitle>Current Mood: {getMoodEmoji(currentMood)} {currentMood || 'Not set'}</AlertTitle>
                  <AlertDescription className="text-xs">
                    Update your mood by saying "I'm feeling tired" or "I feel motivated"
                  </AlertDescription>
                </Alert>
              </div>
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

export default DashboardVoiceAssistant;
