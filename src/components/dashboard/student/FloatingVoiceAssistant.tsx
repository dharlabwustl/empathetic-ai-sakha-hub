
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Volume2, Settings, Mic, MicOff, VolumeX } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FloatingVoiceAssistant: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const [voiceSettings, setVoiceSettings] = useState({
    volume: 0.8,
    rate: 1.0,
    pitch: 1.1,
    language: 'en-IN',
    enabled: true,
    muted: false,
    autoGreet: true
  });
  
  const handleVolumeChange = (value: number[]) => {
    setVoiceSettings({ ...voiceSettings, volume: value[0] });
  };
  
  const handleRateChange = (value: number[]) => {
    setVoiceSettings({ ...voiceSettings, rate: value[0] });
  };
  
  const handlePitchChange = (value: number[]) => {
    setVoiceSettings({ ...voiceSettings, pitch: value[0] });
  };
  
  const handleLanguageChange = (value: string) => {
    setVoiceSettings({ ...voiceSettings, language: value });
  };
  
  const toggleEnabled = () => {
    setVoiceSettings({ ...voiceSettings, enabled: !voiceSettings.enabled });
  };
  
  const toggleMute = () => {
    setVoiceSettings({ ...voiceSettings, muted: !voiceSettings.muted });
    setIsMuted(!isMuted);
  };
  
  const toggleAutoGreet = () => {
    setVoiceSettings({ ...voiceSettings, autoGreet: !voiceSettings.autoGreet });
  };
  
  const toggleListening = () => {
    setIsListening(!isListening);
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
      {/* Settings Panel */}
      <Popover open={isPanelOpen} onOpenChange={setIsPanelOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className={`h-12 w-12 rounded-full shadow-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-2 ${voiceSettings.enabled ? 'border-sky-500' : 'border-gray-300'}`}
          >
            <Settings className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            <span className="sr-only">Voice Assistant Settings</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Voice Assistant Settings</span>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="voice-enabled">Enabled</Label>
                  <Switch id="voice-enabled" checked={voiceSettings.enabled} onCheckedChange={toggleEnabled} />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Voice Language</Label>
                  <Select 
                    value={voiceSettings.language} 
                    onValueChange={handleLanguageChange}
                    disabled={!voiceSettings.enabled}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-IN">English (India)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="en-GB">English (UK)</SelectItem>
                      <SelectItem value="hi-IN">Hindi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Volume</Label>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={toggleMute}
                    disabled={!voiceSettings.enabled}
                  >
                    {voiceSettings.muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </Button>
                </div>
                <Slider 
                  value={[voiceSettings.volume]} 
                  min={0} 
                  max={1} 
                  step={0.1} 
                  onValueChange={handleVolumeChange} 
                  disabled={!voiceSettings.enabled || voiceSettings.muted}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Speaking Rate</Label>
                <Slider 
                  value={[voiceSettings.rate]} 
                  min={0.5} 
                  max={2} 
                  step={0.1} 
                  onValueChange={handleRateChange}
                  disabled={!voiceSettings.enabled}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Pitch</Label>
                <Slider 
                  value={[voiceSettings.pitch]} 
                  min={0.5} 
                  max={2} 
                  step={0.1} 
                  onValueChange={handlePitchChange}
                  disabled={!voiceSettings.enabled}
                />
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <Label htmlFor="auto-greet">Auto-greet on login</Label>
                <Switch 
                  id="auto-greet" 
                  checked={voiceSettings.autoGreet} 
                  onCheckedChange={toggleAutoGreet}
                  disabled={!voiceSettings.enabled}
                />
              </div>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
      
      {/* Voice Assistant Button */}
      <Button 
        variant={isListening ? "destructive" : "default"} 
        size="icon" 
        className="h-12 w-12 rounded-full shadow-lg"
        onClick={toggleListening}
        disabled={!voiceSettings.enabled || voiceSettings.muted}
      >
        {isListening ? 
          <MicOff className="h-5 w-5" /> : 
          <Mic className="h-5 w-5" />
        }
        <span className="sr-only">
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </span>
      </Button>
    </div>
  );
};

export default FloatingVoiceAssistant;
