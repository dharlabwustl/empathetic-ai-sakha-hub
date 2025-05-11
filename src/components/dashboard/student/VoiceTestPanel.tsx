
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Mic, MicOff, Volume2, VolumeX, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';

const VoiceTestPanel: React.FC = () => {
  const { toast } = useToast();
  const [customMessage, setCustomMessage] = useState('');
  
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
    supportedLanguages
  } = useVoiceAnnouncer({
    userName: 'Student',
    isFirstTimeUser: false
  });
  
  const handleCustomSpeak = () => {
    if (!customMessage.trim()) {
      toast({
        title: "Message required",
        description: "Please enter a message to speak",
        variant: "destructive"
      });
      return;
    }
    
    speakMessage(customMessage);
  };
  
  const updateVolume = (value: number[]) => {
    updateVoiceSettings({ volume: value[0] });
  };
  
  const updateRate = (value: number[]) => {
    updateVoiceSettings({ rate: value[0] });
  };
  
  const updatePitch = (value: number[]) => {
    updateVoiceSettings({ pitch: value[0] });
  };
  
  const updateLanguage = (value: string) => {
    updateVoiceSettings({ language: value });
  };
  
  if (!isVoiceSupported) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Voice Control</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-red-50 text-red-800 rounded-md">
            Your browser does not support speech synthesis.
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Voice Control</span>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className={`${voiceSettings.enabled ? 'bg-green-50 text-green-700 border-green-200' : ''}`}
              onClick={toggleVoiceEnabled}
            >
              {voiceSettings.enabled ? 'Enabled' : 'Disabled'}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className={`${voiceSettings.muted ? 'bg-red-50 text-red-700 border-red-200' : ''}`}
              onClick={() => toggleMute()}
            >
              {voiceSettings.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={voiceSettings.language} onValueChange={updateLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {supportedLanguages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Test Voice</Label>
              <Button onClick={testVoice} className="w-full">
                <Play className="h-4 w-4 mr-2" />
                Test Voice
              </Button>
            </div>
          </div>
          
          <div className="space-y-1">
            <Label>Volume: {Math.round(voiceSettings.volume * 100)}%</Label>
            <Slider
              value={[voiceSettings.volume]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={updateVolume}
            />
          </div>
          
          <div className="space-y-1">
            <Label>Rate: {voiceSettings.rate.toFixed(1)}x</Label>
            <Slider
              value={[voiceSettings.rate]}
              min={0.5}
              max={2}
              step={0.1}
              onValueChange={updateRate}
            />
          </div>
          
          <div className="space-y-1">
            <Label>Pitch: {voiceSettings.pitch.toFixed(1)}</Label>
            <Slider
              value={[voiceSettings.pitch]}
              min={0.5}
              max={2}
              step={0.1}
              onValueChange={updatePitch}
            />
          </div>
        </div>
        
        <div className="space-y-2 pt-2 border-t">
          <Label>Custom Message</Label>
          <div className="flex gap-2">
            <Input
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Enter text to speak"
              className="flex-1"
            />
            <Button onClick={handleCustomSpeak}>
              <Volume2 className="h-4 w-4 mr-2" />
              Speak
            </Button>
          </div>
        </div>
        
        <div className="space-y-2 pt-2 border-t">
          <Label className="flex items-center justify-between">
            <span>Voice Recognition</span>
            <Button 
              variant={isListening ? 'destructive' : 'outline'} 
              size="sm"
              onClick={isListening ? stopListening : startListening}
              className="flex items-center gap-1"
            >
              {isListening ? (
                <>
                  <MicOff className="h-4 w-4" />
                  <span>Stop</span>
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4" />
                  <span>Start</span>
                </>
              )}
            </Button>
          </Label>
          
          {isListening && (
            <div className="bg-blue-50 text-blue-800 p-3 rounded-md flex items-center gap-2">
              <Mic className="h-4 w-4 animate-pulse" />
              <span>Listening...</span>
            </div>
          )}
          
          {transcript && (
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="text-sm text-muted-foreground mb-1">Transcript:</div>
              <p>{transcript}</p>
            </div>
          )}
        </div>
        
        {isSpeaking && (
          <div className="bg-green-50 text-green-800 p-3 rounded-md flex items-center gap-2 animate-pulse">
            <Volume2 className="h-4 w-4" />
            <span>Speaking...</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceTestPanel;
