
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useVoiceContext } from "@/contexts/VoiceContext";
import { X } from 'lucide-react';

interface VoiceSettingsPanelProps {
  onClose: () => void;
}

const VoiceSettingsPanel: React.FC<VoiceSettingsPanelProps> = ({ onClose }) => {
  const { 
    voiceSettings, 
    updateVoiceSettings, 
    toggleVoiceEnabled, 
    availableVoices,
    setVoice
  } = useVoiceContext();

  // Filter for Indian English and Hindi voices
  const indianVoices = availableVoices.filter(voice => 
    voice.lang === 'en-IN' || 
    voice.lang === 'hi-IN' || 
    voice.name.includes('Indian') ||
    voice.name.includes('Hindi')
  );

  const allVoices = [
    ...indianVoices, 
    ...availableVoices.filter(voice => 
      voice.lang.startsWith('en') && 
      !indianVoices.includes(voice)
    )
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Voice Settings</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={18} />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Enable Voice</span>
          <Switch 
            checked={voiceSettings.enabled} 
            onCheckedChange={toggleVoiceEnabled}
          />
        </div>

        <div>
          <label className="text-sm block mb-2">Voice</label>
          <Select 
            value={voiceSettings.voice?.name || "default"}
            onValueChange={(value) => {
              const selectedVoice = allVoices.find(v => v.name === value);
              if (selectedVoice) setVoice(selectedVoice);
            }}
            disabled={!voiceSettings.enabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select voice" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default Voice</SelectItem>
              {allVoices.map((voice) => (
                <SelectItem key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm block mb-2">Volume: {Math.round(voiceSettings.volume * 100)}%</label>
          <Slider
            value={[voiceSettings.volume * 100]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => {
              updateVoiceSettings({ volume: value[0] / 100 });
            }}
            disabled={!voiceSettings.enabled}
          />
        </div>

        <div>
          <label className="text-sm block mb-2">Rate: {voiceSettings.rate.toFixed(1)}x</label>
          <Slider
            value={[voiceSettings.rate * 10]}
            min={5}
            max={20}
            step={1}
            onValueChange={(value) => {
              updateVoiceSettings({ rate: value[0] / 10 });
            }}
            disabled={!voiceSettings.enabled}
          />
        </div>

        <div>
          <label className="text-sm block mb-2">Pitch: {voiceSettings.pitch.toFixed(1)}</label>
          <Slider
            value={[voiceSettings.pitch * 10]}
            min={5}
            max={20}
            step={1}
            onValueChange={(value) => {
              updateVoiceSettings({ pitch: value[0] / 10 });
            }}
            disabled={!voiceSettings.enabled}
          />
        </div>

        <div className="pt-2">
          <Button 
            onClick={() => {
              updateVoiceSettings({
                volume: 1.0,
                rate: 1.0,
                pitch: 1.0
              });
            }}
            variant="outline"
            size="sm"
            className="w-full"
            disabled={!voiceSettings.enabled}
          >
            Reset to Default
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VoiceSettingsPanel;
