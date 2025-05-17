
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX, Settings } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from '@/components/ui/slider';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';

interface FloatingVoiceControlProps {
  userName?: string;
  defaultLanguage?: string;
  isHomepage?: boolean;
}

const FloatingVoiceControl: React.FC<FloatingVoiceControlProps> = ({
  userName,
  defaultLanguage = 'en-IN',
  isHomepage = false
}) => {
  const [isMicActive, setIsMicActive] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
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
    supportedLanguages
  } = useVoiceAnnouncer({
    userName,
    initialSettings: { language: defaultLanguage, enabled: true }
  });

  // Handle mic button click
  const toggleMic = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
    setIsMicActive(!isMicActive);
  };

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
  
  // Test voice with contextual message
  const testVoice = () => {
    const testMessage = isHomepage
      ? "Hello! I'm your Prep-zer assistant. I can tell you about our features and why we're better than competitors."
      : "Hello! I'm your Prep-zer dashboard assistant. I can help you navigate features, study plans, and track your progress.";
      
    speakMessage(testMessage, true);
  };

  // Don't render if voice isn't supported
  if (!isVoiceSupported) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
      <Sheet>
        <div className="flex space-x-2">
          <Button
            variant={voiceSettings.muted ? "outline" : "default"} 
            size="icon"
            className="rounded-full shadow-md"
            onClick={() => toggleMute()}
          >
            {voiceSettings.muted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className={`h-5 w-5 ${isSpeaking ? 'animate-pulse' : ''}`} />
            )}
          </Button>
          
          <Button
            variant={isListening ? "destructive" : "default"}
            size="icon"
            className={`rounded-full shadow-md ${isListening ? 'animate-pulse' : ''}`}
            onClick={toggleMic}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full shadow-md"
              onClick={() => setIsSettingsOpen(true)}
            >
              <Settings className="h-5 w-5" />
            </Button>
          </SheetTrigger>
        </div>
        
        <SheetContent className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Voice Assistant Settings</SheetTitle>
          </SheetHeader>
          
          <div className="py-6 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Volume</span>
                  <span className="text-sm text-muted-foreground">{Math.round(voiceSettings.volume * 100)}%</span>
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
                  <span>Speed</span>
                  <span className="text-sm text-muted-foreground">
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
                  <span>Pitch</span>
                  <span className="text-sm text-muted-foreground">
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
                <label htmlFor="language" className="block text-sm font-medium">Language</label>
                <select
                  id="language"
                  className="w-full p-2 border rounded-md text-sm bg-background"
                  value={voiceSettings.language}
                  onChange={handleLanguageChange}
                >
                  {supportedLanguages.map(lang => (
                    <option key={lang.value} value={lang.value}>{lang.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="pt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Voice enabled</span>
                  <Button
                    variant={voiceSettings.enabled ? "default" : "outline"}
                    size="sm"
                    onClick={toggleVoiceEnabled}
                  >
                    {voiceSettings.enabled ? 'On' : 'Off'}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Muted</span>
                  <Button
                    variant={voiceSettings.muted ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleMute()}
                  >
                    {voiceSettings.muted ? 'On' : 'Off'}
                  </Button>
                </div>
              </div>
              
              <div className="pt-4">
                <Button onClick={testVoice} className="w-full">
                  Test Voice
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FloatingVoiceControl;
