
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Volume2, Play } from "lucide-react";
import { useVoiceAnnouncer } from "./utils/VoiceAnnouncer";

const VoiceAnnouncementSettings: React.FC = () => {
  const [enableAnnouncements, setEnableAnnouncements] = useState(true);
  const [enableGreetings, setEnableGreetings] = useState(true);
  const [enableTaskReminders, setEnableTaskReminders] = useState(true);
  const [enableEventReminders, setEnableEventReminders] = useState(true);
  const [voiceVolume, setVoiceVolume] = useState(80);
  const [voiceRate, setVoiceRate] = useState(10); // 10 = normal speed
  const [selectedVoice, setSelectedVoice] = useState("");
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  const { toast } = useToast();
  const { announce } = useVoiceAnnouncer();

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedMuted = localStorage.getItem('voiceAnnouncerMuted');
    if (savedMuted !== null) {
      setEnableAnnouncements(savedMuted === 'false');
    }
    
    const savedGreetings = localStorage.getItem('enableGreetings');
    if (savedGreetings !== null) {
      setEnableGreetings(savedGreetings === 'true');
    }
    
    const savedTasks = localStorage.getItem('announceTasks');
    if (savedTasks !== null) {
      setEnableTaskReminders(savedTasks === 'true');
    }
    
    const savedEvents = localStorage.getItem('announceEvents');
    if (savedEvents !== null) {
      setEnableEventReminders(savedEvents === 'true');
    }
    
    const savedVolume = localStorage.getItem('voiceVolume');
    if (savedVolume !== null) {
      setVoiceVolume(parseInt(savedVolume));
    }
    
    const savedRate = localStorage.getItem('voiceRate');
    if (savedRate !== null) {
      setVoiceRate(parseInt(savedRate));
    }
    
    const savedVoice = localStorage.getItem('selectedVoice');
    if (savedVoice !== null) {
      setSelectedVoice(savedVoice);
    }
    
    // Get available voices
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    
    if (voices.length > 0) {
      setAvailableVoices(voices);
    } else {
      // Voice list might not be loaded immediately in some browsers
      const voicesChangedHandler = () => {
        setAvailableVoices(synth.getVoices());
      };
      
      synth.addEventListener('voiceschanged', voicesChangedHandler);
      
      return () => {
        synth.removeEventListener('voiceschanged', voicesChangedHandler);
      };
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('voiceAnnouncerMuted', (!enableAnnouncements).toString());
    localStorage.setItem('enableGreetings', enableGreetings.toString());
    localStorage.setItem('announceTasks', enableTaskReminders.toString());
    localStorage.setItem('announceEvents', enableEventReminders.toString());
    localStorage.setItem('voiceVolume', voiceVolume.toString());
    localStorage.setItem('voiceRate', voiceRate.toString());
    
    if (selectedVoice) {
      localStorage.setItem('selectedVoice', selectedVoice);
    }
  }, [
    enableAnnouncements, 
    enableGreetings, 
    enableTaskReminders, 
    enableEventReminders,
    voiceVolume,
    voiceRate,
    selectedVoice
  ]);

  const handleTestVoice = () => {
    const testMessage = "This is a test of your voice announcement settings. How does this sound?";
    
    try {
      const utterance = new SpeechSynthesisUtterance(testMessage);
      
      // Set voice if selected
      if (selectedVoice) {
        const voice = availableVoices.find(v => v.name === selectedVoice);
        if (voice) {
          utterance.voice = voice;
        }
      }
      
      // Set rate (convert from 0-20 slider to 0.5-1.5 speech rate)
      utterance.rate = (voiceRate / 10) * 0.5 + 0.5;
      
      // Set volume (convert from 0-100 slider to 0-1 volume)
      utterance.volume = voiceVolume / 100;
      
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Voice test failed:", error);
      toast({
        title: "Voice Test Failed",
        description: "Your browser may not support text-to-speech fully.",
        variant: "destructive"
      });
    }
  };

  const handleSaveSettings = () => {
    // Settings are auto-saved with useEffect
    toast({
      title: "Settings Saved",
      description: "Your voice announcement preferences have been updated."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5" />
          Voice Announcement Settings
        </CardTitle>
        <CardDescription>
          Configure how and when voice announcements are played
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable-announcements" className="text-base">
                Enable Voice Announcements
              </Label>
              <p className="text-sm text-muted-foreground">
                Toggle all voice announcements on or off
              </p>
            </div>
            <Switch 
              id="enable-announcements" 
              checked={enableAnnouncements}
              onCheckedChange={setEnableAnnouncements}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable-greetings" className="text-base">
                Daily Greetings
              </Label>
              <p className="text-sm text-muted-foreground">
                Hear a personalized greeting when you login
              </p>
            </div>
            <Switch 
              id="enable-greetings" 
              checked={enableGreetings}
              onCheckedChange={setEnableGreetings}
              disabled={!enableAnnouncements}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable-tasks" className="text-base">
                Daily Tasks Reminders
              </Label>
              <p className="text-sm text-muted-foreground">
                Announce your pending tasks for the day
              </p>
            </div>
            <Switch 
              id="enable-tasks" 
              checked={enableTaskReminders}
              onCheckedChange={setEnableTaskReminders}
              disabled={!enableAnnouncements}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable-events" className="text-base">
                Event Reminders
              </Label>
              <p className="text-sm text-muted-foreground">
                Announce upcoming events and deadlines
              </p>
            </div>
            <Switch 
              id="enable-events" 
              checked={enableEventReminders}
              onCheckedChange={setEnableEventReminders}
              disabled={!enableAnnouncements}
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-sm font-medium">Voice Settings</h3>
          
          <div className="space-y-2">
            <Label htmlFor="voice-selection">Voice</Label>
            <Select 
              value={selectedVoice} 
              onValueChange={setSelectedVoice}
              disabled={!enableAnnouncements || availableVoices.length === 0}
            >
              <SelectTrigger id="voice-selection">
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent>
                {availableVoices.map((voice, index) => (
                  <SelectItem key={index} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="volume-slider">Volume: {voiceVolume}%</Label>
            </div>
            <Slider
              id="volume-slider"
              min={0}
              max={100}
              step={5}
              value={[voiceVolume]}
              onValueChange={(value) => setVoiceVolume(value[0])}
              disabled={!enableAnnouncements}
              className="py-2"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="rate-slider">
                Speed: {voiceRate < 10 ? 'Slower' : voiceRate > 10 ? 'Faster' : 'Normal'}
              </Label>
            </div>
            <Slider
              id="rate-slider"
              min={0}
              max={20}
              step={1}
              value={[voiceRate]}
              onValueChange={(value) => setVoiceRate(value[0])}
              disabled={!enableAnnouncements}
              className="py-2"
            />
          </div>
          
          <div className="pt-2">
            <Button 
              variant="outline" 
              onClick={handleTestVoice}
              disabled={!enableAnnouncements}
              className="gap-2"
            >
              <Play className="h-4 w-4" /> Test Voice
            </Button>
          </div>
        </div>
        
        <div className="flex justify-end pt-4 border-t">
          <Button onClick={handleSaveSettings}>
            Save Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceAnnouncementSettings;
