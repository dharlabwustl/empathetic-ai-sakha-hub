
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Pause, Play, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface ReadAloudSectionProps {
  text: string;
  isActive: boolean;
  onStop: () => void;
}

const ReadAloudSection: React.FC<ReadAloudSectionProps> = ({
  text,
  isActive,
  onStop
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentSentence, setCurrentSentence] = useState(0);
  const [sentences, setSentences] = useState<string[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const intervalRef = useRef<number | null>(null);
  
  // Split text into sentences for better control
  useEffect(() => {
    // Simple sentence splitting (this could be improved)
    const sentenceArray = text
      .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
      .split("|")
      .filter(sentence => sentence.trim().length > 0);
    
    setSentences(sentenceArray);
  }, [text]);
  
  // Setup speech synthesis
  useEffect(() => {
    if (!isActive) return;
    
    const speech = new SpeechSynthesisUtterance();
    speech.text = sentences[currentSentence] || text;
    speech.rate = 0.95;
    speech.pitch = 1.0;
    speech.volume = volume / 100;
    
    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    const preferredVoiceNames = ['Google US English Female', 'Microsoft Zira', 'Samantha', 'Alex'];
    
    // Try to find a preferred voice
    let selectedVoice = null;
    for (const name of preferredVoiceNames) {
      const voice = voices.find(v => v.name?.includes(name));
      if (voice) {
        selectedVoice = voice;
        break;
      }
    }
    
    // If no preferred voice found, use the first available
    if (selectedVoice) {
      speech.voice = selectedVoice;
    } else if (voices.length > 0) {
      speech.voice = voices[0];
    }
    
    // Store current speech utterance
    speechRef.current = speech;
    
    // Handle speech events
    speech.onend = () => {
      if (currentSentence < sentences.length - 1) {
        setCurrentSentence(prev => prev + 1);
      } else {
        setProgress(100);
        onStop();
      }
    };
    
    speech.onerror = (e) => {
      console.error("Speech synthesis error", e);
      onStop();
    };
    
    // Start speaking if not paused
    if (!isPaused) {
      window.speechSynthesis.speak(speech);
      
      // Update progress every 100ms
      intervalRef.current = window.setInterval(() => {
        const progressValue = ((currentSentence + 1) / sentences.length) * 100;
        setProgress(progressValue > 100 ? 100 : progressValue);
      }, 100);
    }
    
    return () => {
      window.speechSynthesis.cancel();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, isPaused, currentSentence, sentences, volume, text]);
  
  // Handle component unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  // Handle play/pause
  const togglePlayPause = () => {
    if (isPaused) {
      setIsPaused(false);
      if (speechRef.current) {
        window.speechSynthesis.speak(speechRef.current);
      }
    } else {
      setIsPaused(true);
      window.speechSynthesis.pause();
    }
  };
  
  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setIsMuted(newVolume <= 0);
    
    if (speechRef.current) {
      speechRef.current.volume = newVolume / 100;
    }
  };
  
  // Toggle mute
  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(80);
      if (speechRef.current) {
        speechRef.current.volume = 0.8;
      }
    } else {
      setIsMuted(true);
      setVolume(0);
      if (speechRef.current) {
        speechRef.current.volume = 0;
      }
    }
  };
  
  // Skip to next sentence
  const skipNext = () => {
    if (currentSentence < sentences.length - 1) {
      window.speechSynthesis.cancel();
      setCurrentSentence(prev => prev + 1);
    }
  };
  
  // Skip to previous sentence
  const skipPrevious = () => {
    if (currentSentence > 0) {
      window.speechSynthesis.cancel();
      setCurrentSentence(prev => prev - 1);
    }
  };
  
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 rounded-full"
          onClick={skipPrevious}
          disabled={currentSentence === 0}
        >
          <SkipBack className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 w-8 p-0 rounded-full"
          onClick={togglePlayPause}
        >
          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 rounded-full"
          onClick={skipNext}
          disabled={currentSentence === sentences.length - 1}
        >
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 mx-4">
        <div className="text-xs text-gray-500 mb-1">
          {currentSentence + 1} of {sentences.length} sentences
        </div>
        <div className="bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 rounded-full"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
        
        <div className="w-24 hidden sm:block">
          <Slider 
            value={[volume]} 
            min={0} 
            max={100} 
            step={1}
            onValueChange={handleVolumeChange}
            className="w-full"
          />
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs"
          onClick={onStop}
        >
          Stop
        </Button>
      </div>
    </div>
  );
};

export default ReadAloudSection;
