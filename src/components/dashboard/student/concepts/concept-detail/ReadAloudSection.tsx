
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, Pause, Play, SkipForward, SkipBack, Volume, VolumeX, Settings } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface ReadAloudSectionProps {
  text: string;
  isActive: boolean;
  onStop: () => void;
}

const ReadAloudSection: React.FC<ReadAloudSectionProps> = ({ text, isActive, onStop }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [volume, setVolume] = useState(100);
  const [speed, setSpeed] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [currentSentence, setCurrentSentence] = useState(0);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Split text into sentences for navigation
  const sentences = text.split(/(?<=[.!?])\s+/);

  useEffect(() => {
    // Initialize speech synthesis
    if (isActive && 'speechSynthesis' in window) {
      speechSynthRef.current = new SpeechSynthesisUtterance(text);
      
      // Set voice (use a neutral voice if available)
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(voice => voice.lang.includes('en'));
      if (englishVoice) {
        speechSynthRef.current.voice = englishVoice;
      }

      // Set properties
      speechSynthRef.current.rate = speed;
      speechSynthRef.current.pitch = 1.0;
      speechSynthRef.current.volume = volume / 100;

      // Add event listener for when speech ends
      speechSynthRef.current.onend = () => {
        onStop();
      };
      
      // Add event for tracking progress
      speechSynthRef.current.onboundary = (event) => {
        if (event.name === 'sentence') {
          setCurrentSentence(prevSentence => 
            Math.min(prevSentence + 1, sentences.length - 1)
          );
        }
      };

      // Start speaking
      window.speechSynthesis.speak(speechSynthRef.current);
    }

    // Cleanup
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isActive, text, onStop, volume, speed]);

  const handlePause = () => {
    if ('speechSynthesis' in window) {
      if (isPaused) {
        window.speechSynthesis.resume();
      } else {
        window.speechSynthesis.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  const handleStop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      onStop();
    }
  };
  
  const handleVolumeChange = (newVolume: number[]) => {
    const volumeValue = newVolume[0];
    setVolume(volumeValue);
    
    if ('speechSynthesis' in window && speechSynthRef.current) {
      window.speechSynthesis.cancel();
      
      const currentText = sentences.slice(currentSentence).join(' ');
      speechSynthRef.current = new SpeechSynthesisUtterance(currentText);
      speechSynthRef.current.volume = volumeValue / 100;
      speechSynthRef.current.rate = speed;
      
      window.speechSynthesis.speak(speechSynthRef.current);
    }
  };
  
  const handleSpeedChange = (newSpeed: number[]) => {
    const speedValue = newSpeed[0];
    setSpeed(speedValue);
    
    if ('speechSynthesis' in window && speechSynthRef.current) {
      window.speechSynthesis.cancel();
      
      const currentText = sentences.slice(currentSentence).join(' ');
      speechSynthRef.current = new SpeechSynthesisUtterance(currentText);
      speechSynthRef.current.volume = volume / 100;
      speechSynthRef.current.rate = speedValue;
      
      window.speechSynthesis.speak(speechSynthRef.current);
    }
  };
  
  const skipForward = () => {
    if (currentSentence < sentences.length - 1) {
      setCurrentSentence(currentSentence + 1);
      
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        
        const nextText = sentences.slice(currentSentence + 1).join(' ');
        speechSynthRef.current = new SpeechSynthesisUtterance(nextText);
        speechSynthRef.current.volume = volume / 100;
        speechSynthRef.current.rate = speed;
        
        window.speechSynthesis.speak(speechSynthRef.current);
      }
    }
  };
  
  const skipBack = () => {
    if (currentSentence > 0) {
      setCurrentSentence(currentSentence - 1);
      
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        
        const prevText = sentences.slice(currentSentence - 1).join(' ');
        speechSynthRef.current = new SpeechSynthesisUtterance(prevText);
        speechSynthRef.current.volume = volume / 100;
        speechSynthRef.current.rate = speed;
        
        window.speechSynthesis.speak(speechSynthRef.current);
      }
    }
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/30 dark:to-blue-800/10 border border-blue-200 dark:border-blue-800 overflow-hidden shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Volume2 className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="text-sm font-medium">Text to Speech</span>
          </div>
          
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 w-8 p-0 rounded-full text-blue-700 dark:text-blue-400 hover:bg-blue-200/50 dark:hover:bg-blue-800/50" 
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Reading progress */}
        <div className="relative w-full h-1.5 bg-blue-200 dark:bg-blue-800/50 rounded-full mb-3">
          <div 
            className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
            style={{ width: `${(currentSentence / sentences.length) * 100}%` }}
          ></div>
        </div>
        
        {showSettings && (
          <div className="mb-4 space-y-3 p-3 bg-white/60 dark:bg-gray-800/30 rounded-lg backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium flex items-center">
                {volume === 0 ? <VolumeX className="h-3 w-3 mr-1" /> : <Volume className="h-3 w-3 mr-1" />} 
                Volume
              </span>
              <span className="text-xs">{volume}%</span>
            </div>
            <Slider
              defaultValue={[volume]}
              max={100}
              step={5}
              onValueChange={handleVolumeChange}
              className="w-full"
            />
            
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs font-medium">Speed</span>
              <span className="text-xs">{speed}x</span>
            </div>
            <Slider
              defaultValue={[speed]}
              min={0.5}
              max={2}
              step={0.1}
              onValueChange={handleSpeedChange}
              className="w-full"
            />
          </div>
        )}
        
        <div className="flex items-center justify-center gap-3">
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 w-8 p-0 rounded-full text-blue-700 dark:text-blue-400 hover:bg-blue-200/50 dark:hover:bg-blue-800/50" 
            onClick={skipBack}
            disabled={currentSentence === 0}
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          
          <Button 
            size="sm" 
            variant="default" 
            className="h-10 w-10 p-0 rounded-full bg-blue-600 hover:bg-blue-700" 
            onClick={handlePause}
          >
            {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
          </Button>
          
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 w-8 p-0 rounded-full text-blue-700 dark:text-blue-400 hover:bg-blue-200/50 dark:hover:bg-blue-800/50" 
            onClick={skipForward}
            disabled={currentSentence >= sentences.length - 1}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="ml-2 h-8 px-3 text-xs rounded-full border-blue-300 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30" 
            onClick={handleStop}
          >
            Stop
          </Button>
        </div>
        
        <div className="mt-3 text-xs text-center text-gray-500 dark:text-gray-400">
          Reading sentence {currentSentence + 1} of {sentences.length}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadAloudSection;
