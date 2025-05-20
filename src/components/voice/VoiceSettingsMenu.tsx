
import React, { useState } from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Volume2, Settings, Check, Globe, VolumeX } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import VoiceSelectionPanel from './VoiceSelectionPanel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface VoiceSettingsMenuProps {
  compact?: boolean;
}

const VoiceSettingsMenu: React.FC<VoiceSettingsMenuProps> = ({ compact = false }) => {
  const { toast } = useToast();
  const [showSettings, setShowSettings] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem('voice_assistant_muted') === 'true';
  });
  
  // Get current voice language from localStorage or default to British English
  const getCurrentVoice = (): string => {
    return localStorage.getItem('preferred_voice_language') || 'en-GB';
  };
  
  const getLanguageLabel = (code: string): string => {
    switch (code) {
      case 'en-US': return 'American English';
      case 'en-GB': return 'British English';
      case 'en-IN': return 'Indian English';
      default: return 'English';
    }
  };
  
  const handleSetVoiceLanguage = (language: string) => {
    localStorage.setItem('preferred_voice_language', language);
    
    toast({
      title: "Voice language changed",
      description: `Voice assistant will now speak in ${getLanguageLabel(language)}`,
    });
    
    // Reload to apply changes
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  
  const handleToggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem('voice_assistant_muted', newMuted.toString());
    
    if (newMuted) {
      document.dispatchEvent(new CustomEvent('voice-assistant-mute'));
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } else {
      document.dispatchEvent(new CustomEvent('voice-assistant-unmute'));
    }
    
    toast({
      title: newMuted ? "Voice assistant muted" : "Voice assistant unmuted",
      description: newMuted 
        ? "Voice responses are now disabled" 
        : "Voice responses are now enabled",
    });
  };
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size={compact ? "sm" : "default"} className="gap-2">
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            {!compact && <span>Voice</span>}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[200px]">
          <DropdownMenuLabel className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Voice Settings
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={handleToggleMute}>
            {isMuted ? (
              <>
                <Volume2 className="h-4 w-4 mr-2" />
                Unmute Voice Assistant
              </>
            ) : (
              <>
                <VolumeX className="h-4 w-4 mr-2" />
                Mute Voice Assistant
              </>
            )}
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Select Voice Language
          </DropdownMenuLabel>
          
          <DropdownMenuItem 
            onClick={() => handleSetVoiceLanguage('en-GB')}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              British English
            </div>
            {getCurrentVoice() === 'en-GB' && <Check className="h-4 w-4 text-green-500" />}
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={() => handleSetVoiceLanguage('en-IN')}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              Indian English
            </div>
            {getCurrentVoice() === 'en-IN' && <Check className="h-4 w-4 text-green-500" />}
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={() => handleSetVoiceLanguage('en-US')}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              American English
            </div>
            {getCurrentVoice() === 'en-US' && <Check className="h-4 w-4 text-green-500" />}
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowSettings(true)}>
            <Settings className="h-4 w-4 mr-2" />
            Advanced Voice Settings
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Voice Assistant Settings</DialogTitle>
            <DialogDescription>
              Customize your voice assistant preferences
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <VoiceSelectionPanel onClose={() => setShowSettings(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VoiceSettingsMenu;
