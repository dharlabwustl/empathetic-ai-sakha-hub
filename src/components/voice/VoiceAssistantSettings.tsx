
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VoiceSettings } from '@/types/voice';
import { Volume2, Mic, Settings, X } from 'lucide-react';

interface VoiceAssistantSettingsProps {
  settings: VoiceSettings;
  onSettingsChange: (newSettings: Partial<VoiceSettings>) => void;
  onClose: () => void;
  availableVoices: SpeechSynthesisVoice[];
}

const VoiceAssistantSettings: React.FC<VoiceAssistantSettingsProps> = ({
  settings,
  onSettingsChange,
  onClose,
  availableVoices
}) => {
  return (
    <Card className="w-80">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Voice Assistant Settings
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Enable/Disable */}
        <div className="flex items-center justify-between">
          <Label htmlFor="voice-enabled">Enable Voice Assistant</Label>
          <Switch
            id="voice-enabled"
            checked={settings.enabled}
            onCheckedChange={(enabled) => onSettingsChange({ enabled })}
          />
        </div>

        {/* Mute */}
        <div className="flex items-center justify-between">
          <Label htmlFor="voice-muted">Mute Voice</Label>
          <Switch
            id="voice-muted"
            checked={settings.muted}
            onCheckedChange={(muted) => onSettingsChange({ muted })}
          />
        </div>

        {/* Volume */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Volume</Label>
            <span className="text-sm text-muted-foreground">{Math.round(settings.volume * 100)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            <Slider
              value={[settings.volume]}
              onValueChange={([volume]) => onSettingsChange({ volume })}
              max={1}
              min={0}
              step={0.1}
              className="flex-1"
            />
          </div>
        </div>

        {/* Speech Rate */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Speech Rate</Label>
            <span className="text-sm text-muted-foreground">{settings.rate}x</span>
          </div>
          <Slider
            value={[settings.rate]}
            onValueChange={([rate]) => onSettingsChange({ rate })}
            max={2}
            min={0.5}
            step={0.1}
            className="flex-1"
          />
        </div>

        {/* Voice Selection */}
        {availableVoices.length > 0 && (
          <div className="space-y-2">
            <Label>Voice</Label>
            <Select
              value={settings.voice?.name || ''}
              onValueChange={(voiceName) => {
                const selectedVoice = availableVoices.find(v => v.name === voiceName);
                if (selectedVoice) {
                  onSettingsChange({ voice: selectedVoice });
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent>
                {availableVoices.map((voice) => (
                  <SelectItem key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Language */}
        <div className="space-y-2">
          <Label>Language</Label>
          <Select
            value={settings.language}
            onValueChange={(language) => onSettingsChange({ language })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-US">English (US)</SelectItem>
              <SelectItem value="en-GB">English (UK)</SelectItem>
              <SelectItem value="en-IN">English (India)</SelectItem>
              <SelectItem value="hi-IN">Hindi (India)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Test Voice */}
        <Button
          onClick={() => {
            const utterance = new SpeechSynthesisUtterance("Hello! This is your PREP ZER voice assistant. How can I help you today?");
            if (settings.voice) utterance.voice = settings.voice;
            utterance.volume = settings.volume;
            utterance.rate = settings.rate;
            utterance.pitch = settings.pitch;
            speechSynthesis.speak(utterance);
          }}
          variant="outline"
          className="w-full"
          disabled={settings.muted}
        >
          <Mic className="h-4 w-4 mr-2" />
          Test Voice
        </Button>
      </CardContent>
    </Card>
  );
};

export default VoiceAssistantSettings;
