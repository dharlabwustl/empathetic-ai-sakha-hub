
import React, { useState, useEffect } from 'react';
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
  VolumeOff,
  Globe,
  Loader2,
  MicOff
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
import { LANGUAGE_OPTIONS } from '../voice/voiceUtils';
import { motion } from 'framer-motion';

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
  const [showLanguageDemo, setShowLanguageDemo] = useState(false);
  
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
    voiceInitialized,
    transcript
  } = useVoiceAnnouncer({ userName });

  // Get language label for display
  const getLanguageLabel = (langCode: string): string => {
    const language = LANGUAGE_OPTIONS.find(lang => lang.value === langCode);
    return language ? language.label : langCode;
  };
  
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

  // Handle language change with demo
  const handleLanguageChange = (value: string) => {
    updateVoiceSettings({ language: value });
    setShowLanguageDemo(true);

    // Speak a demo message in the selected language after a short delay
    setTimeout(() => {
      if (value === 'hi-IN') {
        speakMessage("अब मैं हिंदी में बात करूंगा। आप कैसे हैं?", true);
      } else if (value === 'en-IN') {
        speakMessage("I'll now speak in Indian English. How are you today?", true);
      } else if (value === 'en-US') {
        speakMessage("I'll now speak in American English. How are you today?", true);
      } else if (value === 'en-GB') {
        speakMessage("I'll now speak in British English. How are you today?", true);
      }
      setShowLanguageDemo(false);
    }, 500);
  };
  
  // Troubleshooting message for Chrome
  const chromeMessage = "Chrome requires a user interaction before audio can play. Click the test button to enable audio.";
  const isChrome = navigator.userAgent.indexOf("Chrome") > -1;
  
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {isSpeaking ? (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Volume2 size={20} className="text-blue-500" />
            </motion.div>
          ) : isListening ? (
            <motion.div
              animate={{ scale: [1, 1.2, 1], color: ['#ef4444', '#ef4444', '#ef4444'] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Mic size={20} className="text-red-500" />
            </motion.div>
          ) : voiceSettings.enabled ? (
            voiceSettings.muted ? <VolumeOff size={20} /> : <Volume2 size={20} />
          ) : (
            <VolumeX size={20} />
          )}
          <h3 className="font-medium">Voice Assistant</h3>
          
          {/* Language indicator badge */}
          <Badge variant="outline" className="ml-2 text-xs px-2 py-0 h-5 flex items-center gap-1">
            <Globe className="h-3 w-3" />
            {getLanguageLabel(voiceSettings.language)}
          </Badge>
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
          {voiceInitialized ? (
            <>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Voice system ready</span>
            </>
          ) : (
            <>
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-2 h-2 rounded-full bg-orange-500"
              ></motion.div>
              <span>Voice system initializing...</span>
            </>
          )}
        </div>
        
        {/* Speaking/Listening status */}
        {(isSpeaking || isListening) && (
          <div className="flex items-center gap-2 p-2 rounded-md bg-blue-50 dark:bg-blue-900/20 text-sm">
            {isSpeaking && (
              <>
                <motion.div
                  animate={{ 
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Volume2 size={16} className="text-blue-500" />
                </motion.div>
                <span>Speaking...</span>
              </>
            )}
            {isListening && (
              <>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <Mic size={16} className="text-red-500" />
                </motion.div>
                <span>Listening...</span>
              </>
            )}
          </div>
        )}
        
        {/* Transcript display when listening */}
        {transcript && (
          <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded text-sm border border-green-100 dark:border-green-800">
            <p className="font-medium text-xs text-green-600 mb-1">Transcript:</p>
            <p>{transcript}</p>
          </div>
        )}
        
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
        
        {/* Language selector */}
        <div className="mt-4">
          <Label className="mb-1 block text-sm">Voice Language</Label>
          <Select 
            value={voiceSettings.language} 
            onValueChange={handleLanguageChange}
            disabled={isSpeaking || showLanguageDemo}
          >
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>{getLanguageLabel(voiceSettings.language)}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              {LANGUAGE_OPTIONS.map(lang => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Language demo indicator */}
          {showLanguageDemo && (
            <div className="flex items-center gap-2 mt-2 text-xs text-blue-600">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>Changing language...</span>
            </div>
          )}
        </div>
        
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
        
        {/* Voice recognition controls */}
        <div className="mt-3 flex flex-col sm:flex-row gap-2">
          <Button
            onClick={isListening ? stopListening : startListening}
            variant={isListening ? "destructive" : "secondary"}
            className="flex-1 flex items-center justify-center gap-2"
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
                onValueChange={handleLanguageChange}
              >
                <SelectTrigger id="voice-language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGE_OPTIONS.map(lang => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
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

// Add Badge component
const Badge = ({ className, variant, children, ...props }: any) => {
  return (
    <div 
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors 
        ${variant === 'outline' ? 'border bg-background' : 'bg-primary text-primary-foreground'} 
        ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default VoiceTestPanel;
