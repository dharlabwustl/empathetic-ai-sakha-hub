
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useVoiceAnnouncerContext } from '../voice/VoiceAnnouncer';
import { Volume2, Volume, VolumeX, PlayCircle, Mic, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const VoiceSettingsTab = () => {
  const { 
    settings, 
    updateSettings, 
    testVoice, 
    stopSpeaking, 
    isSpeaking, 
    processQuery,
    voiceSystemReady,
    fixVoiceSystem,
    getAvailableVoices
  } = useVoiceAnnouncerContext();
  
  const [testQuery, setTestQuery] = React.useState("");
  const [responseText, setResponseText] = React.useState("Response will appear here");
  const [availableVoices, setAvailableVoices] = React.useState<SpeechSynthesisVoice[]>([]);
  const [lastTestTime, setLastTestTime] = React.useState(0);
  
  // Check for available voices on component mount
  useEffect(() => {
    const checkVoices = () => {
      const voices = getAvailableVoices();
      setAvailableVoices(voices);
      console.log("Available voices in settings:", voices.length, voices.map(v => v.name));
    };
    
    // Initial check
    checkVoices();
    
    // Check again in 2 seconds (some browsers load voices asynchronously)
    const timer = setTimeout(checkVoices, 2000);
    
    // Listen for voice changes
    if (window.speechSynthesis) {
      window.speechSynthesis.addEventListener('voiceschanged', checkVoices);
    }
    
    return () => {
      clearTimeout(timer);
      if (window.speechSynthesis) {
        window.speechSynthesis.removeEventListener('voiceschanged', checkVoices);
      }
    };
  }, [getAvailableVoices]);
  
  const handleQuerySubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!testQuery.trim()) return;
    
    // Process the query and get a response
    const response = processQuery(testQuery);
    setResponseText(response);
    
    // Speak the response with force=true to ensure it's spoken
    updateSettings({ enabled: true }); // Temporarily enable if disabled
    stopSpeaking();
    
    // Speak the response after a short delay
    setTimeout(() => {
      const announcer = useVoiceAnnouncerContext();
      announcer.speak(response, true);
    }, 300);
    
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
    setLastTestTime(Date.now());
    const message = testVoice();
    setResponseText(message || "Testing voice...");
  };
  
  const handleFixVoice = () => {
    fixVoiceSystem();
    setLastTestTime(Date.now());
    setResponseText("Attempting to fix voice system... Please check if you can hear me now.");
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Indian Voice Assistant</h2>
      <p className="text-muted-foreground">
        Customize how your energetic Indian female voice assistant works in the PREP-EH-ZER platform
      </p>
      
      {(!voiceSystemReady || availableVoices.length === 0) && (
        <Alert variant="warning" className="bg-yellow-50 text-yellow-800 border-yellow-300">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Voice System Issue Detected</AlertTitle>
          <AlertDescription>
            Your browser may not have properly initialized the voice system.
            Try clicking the "Fix Voice" button below, or check your browser's audio settings.
            {availableVoices.length === 0 && (
              <p className="mt-2 font-medium">No voices available. This usually means your browser is still loading them or lacks permission.</p>
            )}
          </AlertDescription>
        </Alert>
      )}
      
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
              />
            </div>
            
            <div className="pt-2 flex gap-2">
              <Button 
                onClick={handleTestVoice}
                variant="outline" 
                className="flex-1"
                disabled={isSpeaking}
              >
                <PlayCircle className="h-4 w-4 mr-2" /> 
                Test Voice
              </Button>
              
              <Button
                onClick={handleFixVoice}
                variant="outline"
                className="flex-1"
                disabled={isSpeaking}
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Fix Voice
              </Button>
            </div>
            
            {Date.now() - lastTestTime < 10000 && (
              <div className="text-xs text-muted-foreground mt-1">
                <p>
                  If you can't hear the voice, check your device volume and ensure your browser allows audio playback.
                  Some browsers may require you to interact with the page first before audio can play.
                </p>
              </div>
            )}
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
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="announce-reminders" className="text-sm">Tasks & Reminders</Label>
                <Switch 
                  id="announce-reminders"
                  checked={settings.announceReminders} 
                  onCheckedChange={(checked) => updateSettings({ announceReminders: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="announce-tasks" className="text-sm">Task Completions</Label>
                <Switch 
                  id="announce-tasks"
                  checked={settings.announceTasks} 
                  onCheckedChange={(checked) => updateSettings({ announceTasks: checked })}
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
                {responseText}
              </p>
            </div>
            
            <div className="text-xs text-muted-foreground">
              <p>Try asking:</p>
              <ul className="list-disc pl-4 space-y-1 mt-1">
                <li className="cursor-pointer hover:text-primary" onClick={() => setTestQuery("Can't hear your voice")}>
                  "Can't hear your voice"
                </li>
                <li className="cursor-pointer hover:text-primary" onClick={() => setTestQuery("Tell me about NEET preparation")}>
                  "Tell me about NEET preparation"
                </li>
                <li className="cursor-pointer hover:text-primary" onClick={() => setTestQuery("How to improve my Physics score?")}>
                  "How to improve my Physics score?"
                </li>
                <li className="cursor-pointer hover:text-primary" onClick={() => setTestQuery("What can you help me with?")}>
                  "What can you help me with?"
                </li>
              </ul>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {availableVoices.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Available Voices</CardTitle>
            <CardDescription>
              These are the voices available on your device
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-40 overflow-auto text-xs space-y-1">
              {availableVoices.map((voice, index) => (
                <div key={index} className="flex justify-between">
                  <span>{voice.name}</span>
                  <span className="text-muted-foreground">{voice.lang}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VoiceSettingsTab;
