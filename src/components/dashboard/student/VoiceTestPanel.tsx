
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Mic, MicOff, Volume2, VolumeX, Play, Pause, Settings, CheckCircle } from 'lucide-react';
import { getVoiceSettings, saveVoiceSettings, VoiceSettings, supportedLanguages } from './voice/voiceUtils';

interface LanguageOption {
  code: string;
  name: string;
}

const VoiceTestPanel: React.FC = () => {
  const [settings, setSettings] = useState<VoiceSettings>(getVoiceSettings());
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [testText, setTestText] = useState("Hello! This is a test of the voice synthesis system. How does this sound?");
  const [recognizedText, setRecognizedText] = useState("");
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    // Load available voices
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const languageOptions: LanguageOption[] = supportedLanguages.map(lang => ({
    code: lang.code,
    name: lang.name
  }));

  const handleSettingChange = (key: keyof VoiceSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveVoiceSettings(newSettings);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = settings.language;

    recognition.onstart = () => {
      setIsListening(true);
      setRecognizedText("");
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setRecognizedText(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const speakText = (text: string) => {
    if (!settings.enabled) return;

    // Stop any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Find matching voice for selected language
    const selectedVoice = availableVoices.find(voice => 
      voice.lang.startsWith(settings.language.split('-')[0]) ||
      voice.lang === settings.language
    );

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.rate = settings.speed;
    utterance.pitch = settings.pitch;
    utterance.volume = settings.volume;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const getFilteredVoices = () => {
    return availableVoices.filter(voice => 
      voice.lang.startsWith(settings.language.split('-')[0])
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5" />
          Voice & Speech Settings
          <Badge variant={settings.enabled ? "default" : "secondary"}>
            {settings.enabled ? "Enabled" : "Disabled"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Enable/Disable Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div>
            <h3 className="font-medium">Enable Voice Features</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Turn on voice synthesis and speech recognition
            </p>
          </div>
          <Switch
            checked={settings.enabled}
            onCheckedChange={(checked) => handleSettingChange('enabled', checked)}
          />
        </div>

        {settings.enabled && (
          <>
            {/* Language Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Language</label>
              <Select 
                value={settings.language} 
                onValueChange={(value) => handleSettingChange('language', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Voice Testing */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h3 className="font-medium flex items-center gap-2">
                <Play className="h-4 w-4" />
                Test Voice Output
              </h3>
              
              <textarea
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                className="w-full p-2 border rounded-md resize-none h-20"
                placeholder="Enter text to test voice synthesis..."
              />
              
              <div className="flex gap-2">
                <Button
                  onClick={() => speakText(testText)}
                  disabled={isSpeaking || !testText.trim()}
                  className="flex items-center gap-2"
                >
                  {isSpeaking ? (
                    <>
                      <Pause className="h-4 w-4" />
                      Speaking...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Test Speech
                    </>
                  )}
                </Button>
                
                {isSpeaking && (
                  <Button
                    onClick={stopSpeaking}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <VolumeX className="h-4 w-4" />
                    Stop
                  </Button>
                )}
              </div>
            </div>

            {/* Speech Recognition Testing */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h3 className="font-medium flex items-center gap-2">
                <Mic className="h-4 w-4" />
                Test Speech Recognition
              </h3>
              
              <div className="flex gap-2">
                <Button
                  onClick={isListening ? stopListening : startListening}
                  variant={isListening ? "destructive" : "default"}
                  className="flex items-center gap-2"
                >
                  {isListening ? (
                    <>
                      <MicOff className="h-4 w-4" />
                      Stop Listening
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4" />
                      Start Listening
                    </>
                  )}
                </Button>
              </div>
              
              {recognizedText && (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">
                      Recognized:
                    </span>
                  </div>
                  <p className="text-sm">{recognizedText}</p>
                </div>
              )}
            </div>

            {/* Advanced Settings */}
            <div className="space-y-4">
              <Button
                variant="outline"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                {showAdvanced ? 'Hide' : 'Show'} Advanced Settings
              </Button>

              {showAdvanced && (
                <div className="space-y-4 p-4 border rounded-lg">
                  {/* Voice Selection */}
                  {getFilteredVoices().length > 0 && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Voice</label>
                      <Select 
                        value={settings.voice} 
                        onValueChange={(value) => handleSettingChange('voice', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select voice" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          {getFilteredVoices().map((voice, index) => (
                            <SelectItem key={index} value={voice.name}>
                              {voice.name} ({voice.lang})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Speed Control */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Speech Speed: {settings.speed.toFixed(1)}x
                    </label>
                    <Slider
                      value={[settings.speed]}
                      onValueChange={([value]) => handleSettingChange('speed', value)}
                      min={0.5}
                      max={2}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  {/* Pitch Control */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Pitch: {settings.pitch.toFixed(1)}
                    </label>
                    <Slider
                      value={[settings.pitch]}
                      onValueChange={([value]) => handleSettingChange('pitch', value)}
                      min={0.5}
                      max={2}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  {/* Volume Control */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Volume: {Math.round(settings.volume * 100)}%
                    </label>
                    <Slider
                      value={[settings.volume]}
                      onValueChange={([value]) => handleSettingChange('volume', value)}
                      min={0}
                      max={1}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceTestPanel;
