
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Mic, MicOff, Volume2, VolumeX, Settings, X } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';

interface FloatingVoiceAssistantProps {
  isOpen?: boolean;
  onClose?: () => void;
  onNavigationCommand?: (route: string) => void;
  onMoodCommand?: (mood: string) => void;
  userName?: string;
  currentMood?: string;
  pronouncePrepzr?: boolean;
  language?: string;
}

const FloatingVoiceAssistant: React.FC<FloatingVoiceAssistantProps> = ({
  isOpen: propIsOpen,
  onClose,
  onNavigationCommand,
  onMoodCommand,
  userName,
  currentMood,
  pronouncePrepzr = true,
  language = 'en-IN'
}) => {
  const [isOpen, setIsOpen] = useState(propIsOpen || false);
  const [showSettings, setShowSettings] = useState(false);
  const [suggestedCommands] = useState([
    "Take me to my dashboard",
    "Open concept cards",
    "I'm feeling tired today",
    "Show my progress",
    "Take me to practice exams",
    "Open the Feel Good Corner"
  ]);
  
  const {
    voiceSettings,
    updateVoiceSettings,
    toggleVoiceEnabled,
    toggleMute,
    speakMessage,
    isVoiceSupported,
    isSpeaking,
    isListening,
    startListening,
    stopListening,
    transcript,
    supportedLanguages
  } = useVoiceAnnouncer({
    userName,
    initialSettings: { language, enabled: true }
  });
  
  const micButtonRef = useRef<HTMLButtonElement>(null);
  
  // Handle controlled component state
  useEffect(() => {
    if (propIsOpen !== undefined) {
      setIsOpen(propIsOpen);
    }
  }, [propIsOpen]);
  
  // Process transcript when it changes
  useEffect(() => {
    if (!transcript) return;
    
    const processCommand = (text: string) => {
      const lowerText = text.toLowerCase();
      
      // Handle navigation commands
      if (lowerText.includes('dashboard') || lowerText.includes('home')) {
        onNavigationCommand?.('/dashboard/student');
      } else if (lowerText.includes('concept')) {
        onNavigationCommand?.('/dashboard/student/concepts');
      } else if (lowerText.includes('practice') || lowerText.includes('exam')) {
        onNavigationCommand?.('/dashboard/student/practice-exam');
      } else if (lowerText.includes('feel good') || lowerText.includes('relax')) {
        onNavigationCommand?.('/dashboard/student/feel-good-corner');
      } else if (lowerText.includes('flashcards')) {
        onNavigationCommand?.('/dashboard/student/flashcards');
      } else if (lowerText.includes('study plan')) {
        onNavigationCommand?.('/dashboard/student/study-plan');
      }
      
      // Handle mood commands
      if (lowerText.includes('happy') || lowerText.includes('good mood')) {
        onMoodCommand?.('HAPPY');
      } else if (lowerText.includes('tired') || lowerText.includes('exhausted')) {
        onMoodCommand?.('TIRED');
      } else if (lowerText.includes('stressed')) {
        onMoodCommand?.('STRESSED');
      } else if (lowerText.includes('motivated')) {
        onMoodCommand?.('MOTIVATED');
      } else if (lowerText.includes('anxious')) {
        onMoodCommand?.('ANXIOUS');
      } else if (lowerText.includes('focused')) {
        onMoodCommand?.('FOCUSED');
      } else if (lowerText.includes('confused')) {
        onMoodCommand?.('CONFUSED');
      }
    };
    
    processCommand(transcript);
  }, [transcript, onNavigationCommand, onMoodCommand]);
  
  const handleToggleMute = () => {
    toggleMute();
  };
  
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setIsOpen(false);
    }
  };
  
  const handleSuggestedCommand = (command: string) => {
    speakMessage(`I'll help you with: ${command}`);
    
    setTimeout(() => {
      // Process the command after speaking the confirmation
      if (command.toLowerCase().includes('dashboard')) {
        onNavigationCommand?.('/dashboard/student');
      } else if (command.toLowerCase().includes('concept cards')) {
        onNavigationCommand?.('/dashboard/student/concepts');
      } else if (command.toLowerCase().includes('practice exams')) {
        onNavigationCommand?.('/dashboard/student/practice-exam');
      } else if (command.toLowerCase().includes('feel good corner')) {
        onNavigationCommand?.('/dashboard/student/feel-good-corner');
      } else if (command.toLowerCase().includes('tired')) {
        onMoodCommand?.('TIRED');
      } else if (command.toLowerCase().includes('progress')) {
        onNavigationCommand?.('/dashboard/student/analytics');
      }
    }, 2000);
  };
  
  if (!isVoiceSupported) {
    return null;
  }
  
  const handleVolumeChange = (value: number[]) => {
    updateVoiceSettings({ volume: value[0] });
  };
  
  const handleRateChange = (value: number[]) => {
    updateVoiceSettings({ rate: value[0] });
  };
  
  const handlePitchChange = (value: number[]) => {
    updateVoiceSettings({ pitch: value[0] });
  };
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateVoiceSettings({ language: e.target.value });
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
      {/* Settings panel */}
      {showSettings && (
        <Card className="p-4 w-72 shadow-lg animate-fade-in mb-3">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Voice Settings</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowSettings(false)} className="h-7 w-7 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Volume</span>
                <span className="text-xs text-muted-foreground">{Math.round(voiceSettings.volume * 100)}%</span>
              </div>
              <Slider
                defaultValue={[voiceSettings.volume]}
                max={1}
                step={0.1}
                onValueChange={handleVolumeChange}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Speed</span>
                <span className="text-xs text-muted-foreground">
                  {voiceSettings.rate < 1 ? 'Slow' : voiceSettings.rate === 1 ? 'Normal' : 'Fast'}
                </span>
              </div>
              <Slider
                defaultValue={[voiceSettings.rate]}
                min={0.5}
                max={1.5}
                step={0.1}
                onValueChange={handleRateChange}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Pitch</span>
                <span className="text-xs text-muted-foreground">
                  {voiceSettings.pitch < 1 ? 'Low' : voiceSettings.pitch === 1 ? 'Normal' : 'High'}
                </span>
              </div>
              <Slider
                defaultValue={[voiceSettings.pitch]}
                min={0.8}
                max={1.2}
                step={0.1}
                onValueChange={handlePitchChange}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="language" className="text-sm">Language</label>
              <select
                id="language"
                className="w-full p-2 border rounded-md text-sm"
                value={voiceSettings.language}
                onChange={handleLanguageChange}
              >
                {supportedLanguages.map(lang => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-between pt-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={toggleVoiceEnabled}
              >
                {voiceSettings.enabled ? 'Disable Voice' : 'Enable Voice'}
              </Button>
              
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  speakMessage("Testing voice with current settings", true);
                }}
              >
                Test Voice
              </Button>
            </div>
          </div>
        </Card>
      )}
      
      {/* Main assistant panel */}
      {isOpen && (
        <Card className="p-4 w-80 shadow-lg animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Prep-zer Voice Assistant</h3>
            <div className="flex items-center space-x-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowSettings(!showSettings)}
                className="h-7 w-7 p-0"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClose}
                className="h-7 w-7 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {transcript && (
            <div className="bg-muted p-3 rounded-md mb-4">
              <p className="text-xs text-muted-foreground">You said:</p>
              <p className="text-sm">{transcript}</p>
            </div>
          )}
          
          <div className="flex justify-center mb-4 space-x-2">
            <Button
              ref={micButtonRef}
              variant={isListening ? "destructive" : "default"}
              className={`rounded-full p-6 ${isListening ? 'animate-pulse' : ''}`}
              onClick={isListening ? stopListening : startListening}
            >
              {isListening ? (
                <MicOff className="h-6 w-6" />
              ) : (
                <Mic className="h-6 w-6" />
              )}
            </Button>
            
            <Button
              variant="outline"
              className="rounded-full p-5"
              onClick={handleToggleMute}
            >
              {voiceSettings.muted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className={`h-5 w-5 ${isSpeaking ? 'text-primary animate-pulse' : ''}`} />
              )}
            </Button>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Try saying:</h4>
            <div className="grid grid-cols-2 gap-2">
              {suggestedCommands.map((command, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="h-auto py-1 px-2 justify-start text-xs font-normal text-left"
                  onClick={() => handleSuggestedCommand(command)}
                >
                  "{command}"
                </Button>
              ))}
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
            {currentMood ? (
              <p>Current mood: {currentMood}</p>
            ) : (
              <p>Try: "I'm feeling motivated today"</p>
            )}
          </div>
        </Card>
      )}
      
      {/* Floating mic button when panel is closed */}
      {!isOpen && (
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              className="rounded-full shadow-lg p-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              {isListening ? (
                <MicOff className="h-5 w-5 animate-pulse" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium">Voice Controls</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0"
                onClick={() => setIsOpen(true)}
              >
                <span className="text-xs">Expand</span>
              </Button>
            </div>
            
            <div className="flex justify-center space-x-2 mt-2">
              <Button
                size="sm"
                variant={isListening ? "destructive" : "default"}
                className={isListening ? 'animate-pulse' : ''}
                onClick={isListening ? stopListening : startListening}
              >
                {isListening ? "Stop" : "Speak"}
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={handleToggleMute}
              >
                {voiceSettings.muted ? "Unmute" : "Mute"}
              </Button>
              
              <Button 
                size="sm"
                variant="outline"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="h-3 w-3" />
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default FloatingVoiceAssistant;
