
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Mic, MicOff, Volume2, VolumeX, Settings, Headphones, X, Check } from "lucide-react";
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { VoiceSettings } from '@/types/voice';
import { useToast } from '@/hooks/use-toast';

interface FloatingVoiceAssistantProps {
  userName?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const FloatingVoiceAssistant: React.FC<FloatingVoiceAssistantProps> = ({ 
  userName = 'Student', 
  position = 'bottom-right' 
}) => {
  const { speakMessage, voiceSettings, updateVoiceSettings } = useVoiceAnnouncer({
    userName,
    initialSettings: {
      enabled: true,
      muted: false,
      language: 'en-IN',
      pitch: 1.1,
      rate: 0.95,
      volume: 0.8
    }
  });
  
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [settings, setSettings] = useState<VoiceSettings>(voiceSettings);
  const previousVolume = useRef<number>(voiceSettings.volume || 0.8);

  // Position styles based on the position prop
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };
  
  // Update local state when voice settings change
  useEffect(() => {
    setSettings(voiceSettings);
  }, [voiceSettings]);
  
  // Handle mute toggle
  const handleMuteToggle = () => {
    if (settings.muted) {
      // Unmute: restore previous volume
      updateVoiceSettings({
        ...settings,
        muted: false,
        volume: previousVolume.current
      });
    } else {
      // Mute: save current volume and set to 0
      previousVolume.current = settings.volume;
      updateVoiceSettings({
        ...settings,
        muted: true,
        volume: 0
      });
    }
  };
  
  // Handle enable/disable toggle
  const handleEnableToggle = (enabled: boolean) => {
    updateVoiceSettings({
      ...settings,
      enabled
    });
    
    toast({
      title: enabled ? "Voice assistant enabled" : "Voice assistant disabled",
      description: enabled 
        ? "The voice assistant will now provide audio feedback" 
        : "Voice assistant is now silent",
    });
  };
  
  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const volume = value[0];
    updateVoiceSettings({
      ...settings,
      volume,
      muted: volume === 0
    });
  };
  
  // Handle speech rate change
  const handleRateChange = (value: number[]) => {
    updateVoiceSettings({
      ...settings,
      rate: value[0]
    });
  };
  
  // Handle pitch change
  const handlePitchChange = (value: number[]) => {
    updateVoiceSettings({
      ...settings,
      pitch: value[0]
    });
  };
  
  // Test voice
  const handleTestVoice = () => {
    setIsSpeaking(true);
    const testMessage = `Hello ${userName}! This is how I sound with the current settings.`;
    speakMessage(testMessage);
    
    // Simulate speaking for 3 seconds
    setTimeout(() => {
      setIsSpeaking(false);
    }, 3000);
  };
  
  return (
    <div className={`fixed z-50 ${positionClasses[position]}`}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            size="lg"
            className={`h-12 w-12 rounded-full shadow-lg ${
              settings.enabled ? 'bg-primary hover:bg-primary/90' : 'bg-gray-400 hover:bg-gray-500'
            } transition-all duration-200 hover:scale-105`}
          >
            {settings.muted ? (
              <MicOff className="h-6 w-6 text-white" />
            ) : (
              <Mic className="h-6 w-6 text-white" />
            )}
          </Button>
        </PopoverTrigger>
        
        <PopoverContent className="w-80 p-0 shadow-xl" side="top">
          <Card className="border-none shadow-none">
            <CardHeader className="bg-primary/10 pb-4">
              <CardTitle className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <Headphones className="h-5 w-5" />
                  Voice Assistant
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-normal">Enabled</span>
                  <Switch 
                    checked={settings.enabled} 
                    onCheckedChange={handleEnableToggle}
                  />
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4 pt-4">
              {/* Volume control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    {settings.muted || settings.volume === 0 ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                    Volume
                  </label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 px-2"
                    onClick={handleMuteToggle}
                  >
                    {settings.muted ? 'Unmute' : 'Mute'}
                  </Button>
                </div>
                <Slider 
                  defaultValue={[settings.volume]} 
                  max={1} 
                  step={0.05} 
                  value={[settings.volume]}
                  onValueChange={handleVolumeChange}
                  disabled={!settings.enabled}
                />
              </div>
              
              {/* Speech rate control */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Speech Rate</label>
                <div className="flex items-center gap-2">
                  <span className="text-xs">Slow</span>
                  <Slider 
                    defaultValue={[settings.rate]} 
                    min={0.5} 
                    max={1.5} 
                    step={0.05} 
                    value={[settings.rate]}
                    onValueChange={handleRateChange}
                    disabled={!settings.enabled}
                    className="flex-1"
                  />
                  <span className="text-xs">Fast</span>
                </div>
              </div>
              
              {/* Pitch control */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Voice Pitch</label>
                <div className="flex items-center gap-2">
                  <span className="text-xs">Low</span>
                  <Slider 
                    defaultValue={[settings.pitch]} 
                    min={0.8} 
                    max={1.5} 
                    step={0.05} 
                    value={[settings.pitch]}
                    onValueChange={handlePitchChange}
                    disabled={!settings.enabled}
                    className="flex-1"
                  />
                  <span className="text-xs">High</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between border-t pt-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setOpen(false)}
              >
                <X className="mr-2 h-4 w-4" />
                Close
              </Button>
              <Button 
                onClick={handleTestVoice} 
                size="sm" 
                disabled={!settings.enabled || isSpeaking}
              >
                {isSpeaking ? (
                  <>
                    <Headphones className="mr-2 h-4 w-4 animate-pulse" />
                    Speaking...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Test Voice
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FloatingVoiceAssistant;
