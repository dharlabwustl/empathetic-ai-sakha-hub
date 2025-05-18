
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Mic, 
  MicOff, 
  Settings, 
  X, 
  VolumeX, 
  Volume2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger 
} from "@/components/ui/drawer";
import { Slider } from "@/components/ui/slider";
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FloatingVoiceAssistantProps {
  onCommand?: (command: string) => void;
}

const FloatingVoiceAssistant: React.FC<FloatingVoiceAssistantProps> = ({ onCommand }) => {
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState({
    enabled: true,
    volume: 80,
    rate: 1.0,
    pitch: 1.0,
    language: 'en-US',
    voice: 'en-US-Wavenet-F',
  });
  const { toast } = useToast();

  const toggleAssistant = () => {
    setIsActive(!isActive);
    if (!isActive) {
      toast({
        title: "Voice Assistant Activated",
        description: "How can I help you today?",
      });
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast({
        description: "Listening... Ask me anything about your studies",
      });
      
      // Simulate receiving a command after 3 seconds
      setTimeout(() => {
        handleVoiceCommand("Show me my exam readiness");
        setIsListening(false);
      }, 3000);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      description: isMuted ? "Voice assistant unmuted" : "Voice assistant muted",
    });
  };

  const handleVoiceCommand = (command: string) => {
    toast({
      title: "I heard you say:",
      description: command,
    });
    
    if (onCommand) {
      onCommand(command);
    }
  };

  const updateVoiceSetting = (key: keyof typeof voiceSettings, value: any) => {
    setVoiceSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isActive && (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg mb-2 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleMute}
              className="gap-1"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              {isMuted ? "Unmute" : "Mute"}
            </Button>
            
            <Button
              variant={isListening ? "destructive" : "default"}
              size="sm"
              onClick={toggleListening}
              className="gap-1"
            >
              {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              {isListening ? "Stop" : "Listen"}
            </Button>
            
            <Drawer open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings size={16} />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>Voice Assistant Settings</DrawerTitle>
                    <DrawerDescription>Configure how the voice assistant works</DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="voice-enabled">Enable voice responses</Label>
                        <Switch 
                          id="voice-enabled" 
                          checked={voiceSettings.enabled} 
                          onCheckedChange={(checked) => updateVoiceSetting('enabled', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Volume: {voiceSettings.volume}%</Label>
                      <Slider 
                        value={[voiceSettings.volume]} 
                        min={0} 
                        max={100} 
                        step={1}
                        onValueChange={(values) => updateVoiceSetting('volume', values[0])}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Speech Rate: {voiceSettings.rate.toFixed(1)}x</Label>
                      <Slider 
                        value={[voiceSettings.rate * 10]} 
                        min={5} 
                        max={20} 
                        step={1}
                        onValueChange={(values) => updateVoiceSetting('rate', values[0] / 10)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Pitch: {voiceSettings.pitch.toFixed(1)}</Label>
                      <Slider 
                        value={[voiceSettings.pitch * 10]} 
                        min={5} 
                        max={20} 
                        step={1}
                        onValueChange={(values) => updateVoiceSetting('pitch', values[0] / 10)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select 
                        value={voiceSettings.language}
                        onValueChange={(value) => updateVoiceSetting('language', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en-US">English (US)</SelectItem>
                          <SelectItem value="en-GB">English (UK)</SelectItem>
                          <SelectItem value="en-IN">English (India)</SelectItem>
                          <SelectItem value="hi-IN">Hindi</SelectItem>
                          <SelectItem value="es-ES">Spanish</SelectItem>
                          <SelectItem value="fr-FR">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DrawerFooter>
                    <Button onClick={() => setIsSettingsOpen(false)}>Apply Settings</Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsActive(false)}
              className="ml-auto"
            >
              <X size={16} />
            </Button>
          </div>
          
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1 italic">
            {isListening ? "Listening..." : "Try saying 'Show me my exam readiness'"}
          </div>
        </div>
      )}

      <Button
        size="icon"
        className={`h-12 w-12 rounded-full shadow-lg ${
          isActive ? 'bg-blue-600 hover:bg-blue-700' : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
        onClick={toggleAssistant}
      >
        {isActive ? <MicOff size={20} /> : <Mic size={20} />}
      </Button>
    </div>
  );
};

export default FloatingVoiceAssistant;
