
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Volume2, VolumeX, Volume1, Play } from 'lucide-react';
import { useVoiceAnnouncerContext } from '../voice/VoiceAnnouncer';

const VoiceSettingsTab = () => {
  const { settings, updateSettings, testVoice, getAvailableVoices } = useVoiceAnnouncerContext();
  const voices = getAvailableVoices();
  
  // Filter voices to strictly prioritize female Indian voices first
  const femaleIndianVoices = voices.filter(voice => 
    voice.lang === 'en-IN' && 
    voice.name.toLowerCase().includes('female')
  );
  
  const otherIndianVoices = voices.filter(voice => 
    voice.lang === 'en-IN' && 
    !femaleIndianVoices.includes(voice)
  );
  
  const hindiVoices = voices.filter(voice =>
    voice.lang.startsWith('hi-') &&
    !femaleIndianVoices.includes(voice) &&
    !otherIndianVoices.includes(voice)
  );
  
  const englishFemaleVoices = voices.filter(voice => 
    voice.lang.startsWith('en') && 
    voice.name.toLowerCase().includes('female') &&
    !femaleIndianVoices.includes(voice) &&
    !otherIndianVoices.includes(voice)
  );
  
  // Combine them with strict priority order
  const prioritizedVoices = [
    ...femaleIndianVoices, 
    ...otherIndianVoices, 
    ...hindiVoices,
    ...englishFemaleVoices
  ];
  
  // Force test voice on first load to ensure voice is loaded
  useEffect(() => {
    // Small delay to allow voices to load
    const timer = setTimeout(() => {
      if (settings.enabled) {
        testVoice();
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Voice Announcer Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enable/disable voice */}
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base">Enable Voice Announcements</Label>
            <p className="text-sm text-muted-foreground">
              Turn voice announcements on or off
            </p>
          </div>
          <Switch 
            checked={settings.enabled} 
            onCheckedChange={(checked) => updateSettings({ enabled: checked })} 
          />
        </div>
        
        {/* Voice selection */}
        <div className="space-y-2">
          <Label htmlFor="voice-selection">Voice Selection</Label>
          <Select 
            value={settings.voice} 
            onValueChange={(value) => updateSettings({ voice: value })}
            disabled={!settings.enabled}
          >
            <SelectTrigger id="voice-selection" className="w-full">
              <SelectValue placeholder="Select voice" />
            </SelectTrigger>
            <SelectContent>
              {prioritizedVoices.length > 0 ? (
                prioritizedVoices.map((voice) => (
                  <SelectItem key={`${voice.name}-${voice.lang}`} value={voice.lang}>
                    {voice.name} ({voice.lang})
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="en-IN">English (India)</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        
        {/* Volume control */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="volume-slider">Volume</Label>
            <span className="text-muted-foreground">{Math.round(settings.volume * 100)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <VolumeX className="h-4 w-4 text-muted-foreground" />
            <Slider
              id="volume-slider"
              defaultValue={[settings.volume]} 
              max={1}
              step={0.05}
              disabled={!settings.enabled}
              onValueChange={([value]) => updateSettings({ volume: value })}
              className="flex-1"
            />
            <Volume2 className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        
        {/* Speed control */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="speed-slider">Speed</Label>
            <span className="text-muted-foreground">{settings.speed.toFixed(1)}x</span>
          </div>
          <div className="flex items-center gap-2">
            <Volume1 className="h-4 w-4 text-muted-foreground" />
            <Slider
              id="speed-slider"
              defaultValue={[settings.speed]} 
              min={0.5}
              max={2}
              step={0.1}
              disabled={!settings.enabled}
              onValueChange={([value]) => updateSettings({ speed: value })}
              className="flex-1"
            />
            <Play className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        
        {/* Announcement type toggles */}
        <div className="space-y-4">
          <h3 className="font-medium">Announcement Types</h3>
          <div className="flex items-center justify-between">
            <Label htmlFor="greetings-switch">Greetings</Label>
            <Switch 
              id="greetings-switch"
              checked={settings.announceGreetings} 
              disabled={!settings.enabled}
              onCheckedChange={(checked) => updateSettings({ announceGreetings: checked })} 
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="tasks-switch">Daily Tasks</Label>
            <Switch 
              id="tasks-switch"
              checked={settings.announceTasks} 
              disabled={!settings.enabled}
              onCheckedChange={(checked) => updateSettings({ announceTasks: checked })} 
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="reminders-switch">Reminders</Label>
            <Switch 
              id="reminders-switch"
              checked={settings.announceReminders} 
              disabled={!settings.enabled}
              onCheckedChange={(checked) => updateSettings({ announceReminders: checked })} 
            />
          </div>
        </div>
        
        {/* Test voice button */}
        <Button 
          onClick={testVoice} 
          disabled={!settings.enabled}
          className="w-full"
        >
          <Play className="mr-2 h-4 w-4" />
          Test Voice
        </Button>
      </CardContent>
    </Card>
  );
};

export default VoiceSettingsTab;
