
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { VolumeX, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface VoiceMuteButtonProps {
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  showLabel?: boolean;
}

export const VoiceMuteButton: React.FC<VoiceMuteButtonProps> = ({
  className = '',
  size = 'default',
  variant = 'outline',
  showLabel = false
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const { toast } = useToast();

  // Load mute state from localStorage
  useEffect(() => {
    const savedMuteState = localStorage.getItem('prepzr_voice_muted');
    if (savedMuteState) {
      setIsMuted(JSON.parse(savedMuteState));
    }
  }, []);

  // Save mute state and cancel any ongoing speech
  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    localStorage.setItem('prepzr_voice_muted', JSON.stringify(newMuteState));

    // Cancel any ongoing speech when muting
    if (newMuteState && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('voice-mute-changed', { 
      detail: { isMuted: newMuteState } 
    }));

    toast({
      title: newMuteState ? "Voice Assistant Muted" : "Voice Assistant Unmuted",
      description: newMuteState 
        ? "PREPZR AI voice is now silent" 
        : "PREPZR AI voice is now active",
      duration: 2000,
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant={variant}
        size={size}
        onClick={toggleMute}
        className={`${className} ${isMuted ? 'text-red-500 border-red-300' : 'text-blue-600 border-blue-300'}`}
        title={isMuted ? "Unmute PREPZR AI" : "Mute PREPZR AI"}
      >
        {isMuted ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
        {showLabel && (
          <span className="ml-2 text-sm">
            {isMuted ? 'Unmute AI' : 'Mute AI'}
          </span>
        )}
      </Button>
    </motion.div>
  );
};

export default VoiceMuteButton;
