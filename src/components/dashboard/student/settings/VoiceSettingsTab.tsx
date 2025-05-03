
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useVoiceAnnouncerContext } from '../voice/VoiceAnnouncer';
import { Volume2, Volume, VolumeX, PlayCircle, Mic } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const VoiceSettingsTab = () => {
  const { settings, updateSettings, testVoice, stopSpeaking, isSpeaking, processQuery, voicesLoaded } = useVoiceAnnouncerContext();
  const [testQuery, setTestQuery] = React.useState("");
  const { toast } = useToast();

  // Check if voice synthesis is available
  useEffect(() => {
    if (!window.speechSynthesis) {
      toast({
        title: "Voice System Unavailable",
        description: "Your browser doesn't support speech synthesis. Voice features will not work.",
        variant: "destructive",
      });
    } else if (!voicesLoaded) {
      // Force preload voices
      try {
        window.speechSynthesis.getVoices();
      } catch (error) {
        console.error("Error getting voices:", error);
      }
    }
  }, []);
  
  const handleQuerySubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!testQuery.trim()) return;
    
    try {
      // Process the query and get a response
      const response = processQuery(testQuery);
      console.log("Query:", testQuery);
      console.log("Response:", response);
      
      // Speak the response with force=true to ensure it's spoken
      updateSettings({ enabled: true }); // Temporarily enable if disabled
      stopSpeaking();
      
      // Update UI with response
      const element = document.getElementById("voice-response");
      if (element) {
        element.textContent = response;
      }
      
      // Speak the response with a slight delay
      setTimeout(() => {
        const announcer = useVoiceAnnouncerContext();
        announcer.speak(response, true);
      }, 200);
    } catch (error) {
      console.error("Error processing voice query:", error);
      toast({
        title: "Voice Error",
        description: "There was a problem processing your voice request.",
        variant: "destructive",
      });
    }
    
    setTestQuery("");
  };
  
  const handleVolumeChange = (value: number[]) => {
    updateSettings({ volume: value[0] });
  };
  
  const handleSpeedChange = (value: number[]) => {
    updateSettings({ speed: value[0] });
  };
  
  const getVolumeIcon = () => {
    if (settings.volume === 0) return <VolumeX className="h-4 w-4" />;
    if (settings.volume < 0.5) return <Volume className="h-4 w-4" />;
    return <Volume2 className="h-4 w-4" />;
  };

  const handleTestVoice = () => {
    try {
      testVoice();
    } catch (error) {
      console.error("Error testing voice:", error);
      toast({
        title: "Voice Test Failed",
        description: "There was a problem testing the voice. Please try refreshing the page.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Indian Voice Assistant</h2>
      <p className="text-muted-foreground">
        Customize how your energetic Indian female voice assistant works in the PREP-EH-ZER platform
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Voice Announcer</span>
            <Switch 
              checked={settings.enabled} 
              onCheckedChange={(checked) => updateSettings({ enabled: checked })}
              aria-label="Toggle voice announcer"
            />
          </CardTitle>
          <CardDescription>
            Enable or disable the energetic Indian female voice assistant throughout the app
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="voice-volume">Volume</Label>
                <span className="text-sm text-muted-foreground">{Math.round(settings.volume * 100)}%</span>
              </div>
              <div className="flex items-center gap-2">
                {getVolumeIcon()}
                <Slider 
                  id="voice-volume"
                  min={0} 
                  max={1} 
                  step={0.05} 
                  value={[settings.volume]} 
                  onValueChange={handleVolumeChange} 
                  className="flex-1"
                  disabled={!settings.enabled}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="voice-speed">Speaking Speed</Label>
                <span className="text-sm text-muted-foreground">×{settings.speed.toFixed(1)}</span>
              </div>
              <Slider 
                id="voice-speed"
                min={0.5} 
                max={2} 
                step={0.1} 
                value={[settings.speed]} 
                onValueChange={handleSpeedChange} 
                className="flex-1"
                disabled={!settings.enabled}
              />
            </div>
            
            <div className="pt-2">
              <Button 
                onClick={handleTestVoice} 
                variant="outline" 
                className="w-full"
                disabled={!settings.enabled || isSpeaking}
              >
                <PlayCircle className="h-4 w-4 mr-2" /> 
                Test Voice
              </Button>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium mb-2">Announcement Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="announce-greetings" className="text-sm">Energetic Greetings & Welcomes</Label>
                <Switch 
                  id="announce-greetings"
                  checked={settings.announceGreetings} 
                  onCheckedChange={(checked) => updateSettings({ announceGreetings: checked })}
                  disabled={!settings.enabled}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="announce-reminders" className="text-sm">Tasks & Reminders</Label>
                <Switch 
                  id="announce-reminders"
                  checked={settings.announceReminders} 
                  onCheckedChange={(checked) => updateSettings({ announceReminders: checked })}
                  disabled={!settings.enabled}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="announce-tasks" className="text-sm">Task Completions</Label>
                <Switch 
                  id="announce-tasks"
                  checked={settings.announceTasks} 
                  onCheckedChange={(checked) => updateSettings({ announceTasks: checked })}
                  disabled={!settings.enabled}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Test Voice Assistant</CardTitle>
          <CardDescription>
            Ask a question to test your energetic Indian female voice assistant
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleQuerySubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything..."
                value={testQuery}
                onChange={(e) => setTestQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={!testQuery.trim() || isSpeaking}>
                <Mic className="h-4 w-4 mr-2" />
                Ask
              </Button>
            </div>
            
            <div className="p-3 bg-muted/50 rounded-md min-h-[60px]">
              <p className="text-sm text-muted-foreground" id="voice-response">
                Response will appear here
              </p>
            </div>
            
            <div className="text-xs text-muted-foreground">
              <p>Try asking:</p>
              <ul className="list-disc pl-4 space-y-1 mt-1">
                <li>"What is PREPZR?"</li>
                <li>"Tell me a joke"</li>
                <li>"Motivate me"</li>
                <li>"What can you do?"</li>
              </ul>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceSettingsTab;
