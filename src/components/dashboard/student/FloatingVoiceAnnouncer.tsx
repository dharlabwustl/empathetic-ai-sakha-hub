
import React, { useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Volume } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { MoodType } from '@/types/user/base';

const moodMap = {
  "happy": MoodType.HAPPY,
  "motivated": MoodType.MOTIVATED,
  "focused": MoodType.FOCUSED,
  "tired": MoodType.TIRED,
  "exhausted": MoodType.TIRED,
  "stressed": MoodType.STRESSED,
  "anxious": MoodType.ANXIOUS,
  "okay": MoodType.OKAY,
  "alright": MoodType.OKAY,
  "so so": MoodType.OKAY,
  "overwhelmed": MoodType.OVERWHELMED,
  "swamped": MoodType.OVERWHELMED,
  "curious": MoodType.CURIOUS,
  "interested": MoodType.CURIOUS,
  "confused": MoodType.CONFUSED,
  "unsure": MoodType.CONFUSED
};

const FloatingVoiceAnnouncer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [command, setCommand] = useState<string>('');
  const [mood, setMood] = useState<MoodType | null>(null);
  const [isListeningMode, setIsListeningMode] = useState<boolean>(false);
  
  const { 
    voiceSettings, 
    toggleMute, 
    isVoiceSupported, 
    isSpeaking, 
    isListening, 
    startListening, 
    stopListening, 
    transcript, 
    processVoiceCommand 
  } = useVoiceAnnouncer();
  
  const handleClose = () => {
    onClose();
  };
  
  const handleMuteToggle = () => {
    toggleMute();
  };
  
  const handleStartListening = () => {
    startListening();
    setIsListeningMode(true);
  };
  
  const handleStopListening = () => {
    stopListening();
    setIsListeningMode(false);
  };
  
  // Process transcript when it changes and listening mode is active
  useEffect(() => {
    if (transcript && isListeningMode) {
      setCommand(transcript);
      processVoiceCommand(transcript);
      handleStopListening();
    }
  }, [transcript, isListeningMode, processVoiceCommand]);
  
  // Mood detection logic
  useEffect(() => {
    if (command) {
      const lowerCommand = command.toLowerCase();
      
      // Iterate through moodMap to find a matching mood
      for (const key in moodMap) {
        if (lowerCommand.includes(key)) {
          setMood(moodMap[key as keyof typeof moodMap]);
          toast({
            title: `Mood Detected: ${moodMap[key as keyof typeof moodMap]}`,
            description: `You seem ${key}.`,
          });
          break;
        }
      }
    }
  }, [command, toast]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-white border rounded-lg shadow-lg p-4 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Voice Assistant</h3>
        <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="mb-3">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {isVoiceSupported ? 'Voice commands are supported.' : 'Voice commands are not supported in this browser.'}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {isSpeaking ? 'Currently speaking...' : 'Ready for your command.'}
        </p>
      </div>
      
      <div className="flex items-center justify-between mb-3">
        <button 
          onClick={handleMuteToggle}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-sm transition-colors"
        >
          {voiceSettings.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          {voiceSettings.muted ? 'Unmute' : 'Mute'}
        </button>
        
        <button 
          onClick={isListening ? handleStopListening : handleStartListening}
          className={`px-4 py-2 rounded-md text-sm transition-colors ${isListening ? 'bg-red-500 hover:bg-red-700 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
          disabled={!isVoiceSupported}
        >
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
      </div>
      
      {command && (
        <div className="mb-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Last Command:</strong> {command}
          </p>
        </div>
      )}
      
      {mood && (
        <div className="mb-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Detected Mood:</strong> {mood}
          </p>
        </div>
      )}
    </div>
  );
};

export default FloatingVoiceAnnouncer;
