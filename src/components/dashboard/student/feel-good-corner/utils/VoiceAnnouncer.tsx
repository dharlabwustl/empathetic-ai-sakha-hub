
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { VoiceAnnouncement } from "../types";
import { useToast } from "@/hooks/use-toast";

interface VoiceAnnouncerProps {
  announcement?: VoiceAnnouncement;
  autoPlay?: boolean;
}

export const useVoiceAnnouncer = () => {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const { toast } = useToast();
  
  const announce = (text: string) => {
    if (isMuted) return;
    
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      // Use a pleasant voice if available
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => voice.name.includes('female') || voice.name.includes('Female'));
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      utterance.rate = 0.9; // Slightly slower for better clarity
      utterance.pitch = 1.1; // Slightly higher pitch for a friendly tone
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Text-to-speech failed:", error);
      toast({
        title: "Voice announcement failed",
        description: "Your browser may not support text-to-speech.",
        variant: "destructive"
      });
    }
  };
  
  const stopAnnouncements = () => {
    window.speechSynthesis.cancel();
  };
  
  const toggleMute = () => {
    if (!isMuted) {
      stopAnnouncements();
    }
    setIsMuted(!isMuted);
    localStorage.setItem('voiceAnnouncerMuted', (!isMuted).toString());
  };
  
  // Load muted preference from localStorage
  useEffect(() => {
    const mutedPref = localStorage.getItem('voiceAnnouncerMuted');
    if (mutedPref !== null) {
      setIsMuted(mutedPref === 'true');
    }
  }, []);
  
  return {
    announce,
    stopAnnouncements,
    isMuted,
    toggleMute
  };
};

export const VoiceAnnouncerControl: React.FC = () => {
  const { isMuted, toggleMute } = useVoiceAnnouncer();
  
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleMute}
      title={isMuted ? "Unmute voice announcements" : "Mute voice announcements"}
      className="h-8 w-8"
    >
      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
    </Button>
  );
};

export const VoicePlayer: React.FC<VoiceAnnouncerProps> = ({ announcement, autoPlay = true }) => {
  const { announce, isMuted } = useVoiceAnnouncer();
  
  useEffect(() => {
    if (announcement && autoPlay && !isMuted) {
      announce(announcement.text);
    }
  }, [announcement, autoPlay, isMuted]);
  
  return null; // This component doesn't render anything
};
