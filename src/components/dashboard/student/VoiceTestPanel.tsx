
import React, { useState } from 'react';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { 
  Volume2, 
  VolumeX, 
  Mic, 
  Settings, 
  MessageSquare,
  Info,
  VolumeOff
} from 'lucide-react';
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
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface VoiceTestPanelProps {
  userName?: string;
  showControls?: boolean;
}

export const VoiceTestPanel: React.FC<VoiceTestPanelProps> = ({ 
  userName = 'Student',
  showControls = true 
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [voiceTestResult, setVoiceTestResult] = useState<string | null>(null);
  
  const { 
    voiceSettings,
    toggleVoiceEnabled,
    toggleMute,
    updateVoiceSettings,
    testVoice,
    isVoiceSupported,
    isSpeaking,
    isListening,
    startListening,
    stopListening,
    speakMessage,
    voiceInitialized
  } = useVoiceAnnouncer({ userName });
  
  // Function to test the voice system
  const handleTestVoice = () => {
    if (isVoiceSupported) {
      testVoice();
      setVoiceTestResult('Voice test started...');
      
      // Clear the result message after a few seconds
      setTimeout(() => setVoiceTestResult(null), 5000);
    } else {
      setVoiceTestResult('Voice is not supported in your browser.');
    }
  };
  
  // Troubleshooting message for Chrome
  const chromeMessage = "Chrome requires a user interaction before audio can play. Click the test button to enable audio.";
  const isChrome = navigator.userAgent.indexOf("Chrome") > -1;
  
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {voiceSettings.enabled ? (
            voiceSettings.muted ? <VolumeOff size={20} /> : <Volume2 size={20} />
          ) : (
            <VolumeX size={20} />
          )}
          <h3 className="font-medium">Voice Assistant</h3>
        </div>
        
        {showControls && (
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setShowSettings(!showSettings)}
                  >
                    <Settings size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Voice settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Switch 
              checked={voiceSettings.enabled} 
              onCheckedChange={toggleVoiceEnabled} 
              aria-label="Toggle voice"
            />
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        {/* Status indicator */}
        <div className="flex items-center gap-2 text-sm">
          <div className={`w-2 h-2 rounded-full ${voiceInitialized ? 'bg-green-500' : 'bg-orange-500'}`}></div>
          <span>
            {voiceInitialized 
              ? 'Voice system ready' 
              : 'Voice system initializing...'}
          </span>
        </div>
        
        {/* Mute status indicator */}
        {voiceSettings.enabled && (
          <div className="flex items-center justify-between">
            <span className="text-sm">
              {voiceSettings.muted ? 'Voice is muted' : 'Voice is active'}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleMute()}
              className="flex gap-1 items-center"
            >
              {voiceSettings.muted ? (
                <>
                  <Volume2 className="h-4 w-4 mr-1" />
                  Unmute
                </>
              ) : (
                <>
                  <VolumeOff className="h-4 w-4 mr-1" />
                  Mute
                </>
              )}
            </Button>
          </div>
        )}
        
        {/* Chrome troubleshooting message */}
        {isChrome && (
          <div className="flex items-start gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-sm">
            <Info size={16} className="text-blue-500 mt-0.5" />
            <p>{chromeMessage}</p>
          </div>
        )}
        
        {/* Voice test result */}
        {voiceTestResult && (
          <div className="text-sm p-2 bg-gray-50 dark:bg-gray-700 rounded">
            {voiceTestResult}
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-2 mt-3">
          <Button 
            onClick={handleTestVoice}
            variant="default"
            className="flex-1"
            disabled={isSpeaking}
          >
            Test Voice
          </Button>
          
          <Button
            onClick={() => speakMessage("Hello! I'm your Prepzr AI assistant. How can I help you today?", true)}
            variant="outline"
            className="flex-1"
            disabled={isSpeaking}
          >
            Say Greeting
          </Button>
        </div>
      </div>
      
      {/* Voice settings dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Voice Assistant Settings</DialogTitle>
            <DialogDescription>
              Configure your voice assistant preferences
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="voice-enabled">Enable voice</Label>
              <Switch 
                id="voice-enabled"
                checked={voiceSettings.enabled} 
                onCheckedChange={toggleVoiceEnabled} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="voice-muted">Mute voice</Label>
              <Switch 
                id="voice-muted"
                checked={voiceSettings.muted} 
                onCheckedChange={toggleMute} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="voice-language">Voice Language</Label>
              <Select 
                value={voiceSettings.language} 
                onValueChange={(value) => updateVoiceSettings({ language: value })}
              >
                <SelectTrigger id="voice-language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="en-IN">English (Indian)</SelectItem>
                  <SelectItem value="hi-IN">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="voice-volume">Volume: {voiceSettings.volume.toFixed(1)}</Label>
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
              <Label htmlFor="voice-rate">Speed: {voiceSettings.rate.toFixed(1)}</Label>
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
                min={0.5}
                max={2}
                step={0.1}
                value={[voiceSettings.pitch]}
                onValueChange={([value]) => updateVoiceSettings({ pitch: value })}
              />
            </div>
            
            <div className="pt-4">
              <Button onClick={testVoice} className="w-full">
                Test These Settings
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VoiceTestPanel;
