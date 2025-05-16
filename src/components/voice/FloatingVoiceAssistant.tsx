
import React, { useState, useEffect } from 'react';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Settings,
  X,
  Globe,
  HelpCircle
} from 'lucide-react';
import { LANGUAGE_OPTIONS } from '@/hooks/useVoiceAnnouncer';
import { toast } from '@/hooks/use-toast';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface FloatingVoiceAssistantProps {
  language?: string;
}

const FloatingVoiceAssistant: React.FC<FloatingVoiceAssistantProps> = ({ 
  language = 'en-IN' // Default to Indian English
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
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
    processVoiceCommand
  } = useVoiceAnnouncer({
    initialSettings: { 
      language,
      enabled: true,
      muted: false
    }
  });

  // Set Indian English as the default language
  useEffect(() => {
    if (isVoiceSupported) {
      updateVoiceSettings({ 
        language: 'en-IN',
        enabled: true
      });
    }
  }, [isVoiceSupported, updateVoiceSettings]);
  
  // Handle voice commands from transcript
  useEffect(() => {
    if (transcript && isListening) {
      processVoiceCommand(transcript);
      stopListening();
    }
  }, [transcript, isListening, processVoiceCommand, stopListening]);
  
  const handleOpenAssistant = () => {
    setIsOpen(true);
  };
  
  const handleCloseAssistant = () => {
    setIsOpen(false);
  };
  
  const handleGetHelp = () => {
    const helpMessage = "I can help you explore the PREPZR platform. Try asking me about NEET preparation, our features, or how to get started with your exam readiness assessment.";
    speakMessage(helpMessage);
  };
  
  const handleTestVoice = () => {
    testVoice();
    toast({
      title: "Voice Test",
      description: "Testing voice with current settings",
    });
  };
  
  // Sample commands to demonstrate
  const sampleCommands = [
    "Tell me about NEET exam",
    "How to prepare for NEET?",
    "What features does PREPZR offer?",
    "Test my exam readiness"
  ];
  
  const handleSampleCommand = (command: string) => {
    processVoiceCommand(command);
  };
  
  if (!isVoiceSupported) return null;
  
  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {isOpen && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-[300px] border border-gray-200 dark:border-gray-700 mb-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Voice Assistant</h3>
              <div className="flex items-center gap-1">
                <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Voice Settings</SheetTitle>
                      <SheetDescription>
                        Customize your PREPZR voice assistant
                      </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-4 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="voice-enabled">Enable Voice</Label>
                          <p className="text-xs text-gray-500">Turn voice assistant on/off</p>
                        </div>
                        <Switch 
                          id="voice-enabled" 
                          checked={voiceSettings.enabled} 
                          onCheckedChange={toggleVoiceEnabled} 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="voice-muted">Mute Voice</Label>
                          <p className="text-xs text-gray-500">Temporarily silence the assistant</p>
                        </div>
                        <Switch 
                          id="voice-muted" 
                          checked={voiceSettings.muted} 
                          onCheckedChange={toggleMute} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="voice-language">Language</Label>
                        <Select 
                          value={voiceSettings.language} 
                          onValueChange={(value) => updateVoiceSettings({ language: value })}
                        >
                          <SelectTrigger id="voice-language">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            {LANGUAGE_OPTIONS.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="voice-volume">Volume: {Math.round(voiceSettings.volume * 100)}%</Label>
                        <Slider
                          id="voice-volume"
                          min={0}
                          max={1}
                          step={0.1}
                          value={[voiceSettings.volume]}
                          onValueChange={([value]) => updateVoiceSettings({ volume: value })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="voice-rate">Speed: {voiceSettings.rate.toFixed(1)}x</Label>
                        <Slider
                          id="voice-rate"
                          min={0.5}
                          max={2}
                          step={0.1}
                          value={[voiceSettings.rate]}
                          onValueChange={([value]) => updateVoiceSettings({ rate: value })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="voice-pitch">Pitch: {voiceSettings.pitch.toFixed(1)}</Label>
                        <Slider
                          id="voice-pitch"
                          min={0.8}
                          max={1.5}
                          step={0.1}
                          value={[voiceSettings.pitch]}
                          onValueChange={([value]) => updateVoiceSettings({ pitch: value })}
                        />
                      </div>
                      
                      <Button 
                        onClick={handleTestVoice} 
                        className="w-full mt-4"
                        disabled={isSpeaking}
                      >
                        {isSpeaking ? "Speaking..." : "Test Voice"}
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
                
                <Button variant="ghost" size="icon" onClick={handleCloseAssistant} className="h-7 w-7">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Voice controls */}
              <div className="flex justify-between gap-2">
                <Button 
                  variant={voiceSettings.muted ? "outline" : "default"}
                  size="sm"
                  onClick={toggleMute}
                  className="flex-1"
                >
                  {voiceSettings.muted ? (
                    <>
                      <VolumeX className="h-4 w-4 mr-1" />
                      Unmute
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-4 w-4 mr-1" />
                      Mute
                    </>
                  )}
                </Button>
                
                <Button 
                  variant={isListening ? "destructive" : "outline"}
                  size="sm"
                  onClick={isListening ? stopListening : startListening}
                  className="flex-1"
                  disabled={isSpeaking}
                >
                  {isListening ? (
                    <>
                      <MicOff className="h-4 w-4 mr-1" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4 mr-1" />
                      Speak
                    </>
                  )}
                </Button>
              </div>
              
              {/* Language indicator */}
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Globe className="h-3 w-3 mr-1" />
                {LANGUAGE_OPTIONS.find(opt => opt.value === voiceSettings.language)?.label || "Indian English"}
              </div>
              
              {/* Transcript display */}
              {transcript && (
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md text-sm">
                  <p className="font-medium text-xs">You said:</p>
                  <p>{transcript}</p>
                </div>
              )}
              
              {/* Sample commands */}
              <div>
                <p className="text-xs font-medium mb-2">Try saying:</p>
                <div className="grid grid-cols-1 gap-1">
                  {sampleCommands.map((command, index) => (
                    <Button 
                      key={index} 
                      variant="ghost" 
                      size="sm" 
                      className="justify-start h-auto py-1 text-xs"
                      onClick={() => handleSampleCommand(command)}
                    >
                      "{command}"
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-xs p-0"
                  onClick={handleGetHelp}
                >
                  <HelpCircle className="h-3 w-3 mr-1" />
                  What can you do?
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Main button */}
        <Button
          onClick={isOpen ? handleCloseAssistant : handleOpenAssistant}
          className={`rounded-full h-12 w-12 p-0 ${
            isOpen 
              ? "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600" 
              : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
          }`}
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : isSpeaking ? (
            <Volume2 className="h-5 w-5 animate-pulse" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </Button>
      </div>
    </>
  );
};

export default FloatingVoiceAssistant;
