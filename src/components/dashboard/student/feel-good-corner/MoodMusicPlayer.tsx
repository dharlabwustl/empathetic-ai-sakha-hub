
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";
import { MoodType } from '@/types/user/base';
import { useIsMobile } from '@/hooks/use-mobile';

export interface MoodMusicPlayerProps {
  currentMood: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const MoodMusicPlayer: React.FC<MoodMusicPlayerProps> = ({ 
  currentMood, 
  onMoodChange = () => {} 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [currentTrack, setCurrentTrack] = useState(0);
  const isMobile = useIsMobile();
  
  // Mock tracks based on mood
  const moodTracks = {
    [MoodType.HAPPY]: [
      { title: "Happy Day", artist: "Joy Band", duration: "3:24" },
      { title: "Sunshine Melody", artist: "Bright Notes", duration: "4:15" },
    ],
    [MoodType.MOTIVATED]: [
      { title: "Power Up", artist: "Motivation Squad", duration: "3:45" },
      { title: "Achievement Unlocked", artist: "Success Team", duration: "3:12" },
    ],
    [MoodType.OKAY]: [
      { title: "Balanced Mind", artist: "Centered Vibes", duration: "4:02" },
      { title: "Steady Flow", artist: "Even Keel", duration: "3:56" },
    ],
    [MoodType.STRESSED]: [
      { title: "Calm Waters", artist: "Stress Relief", duration: "5:30" },
      { title: "Deep Breath", artist: "Tension Release", duration: "6:10" },
    ],
    [MoodType.TIRED]: [
      { title: "Energy Boost", artist: "Revitalize", duration: "4:45" },
      { title: "Second Wind", artist: "Refreshed", duration: "3:50" },
    ],
    [MoodType.FOCUSED]: [
      { title: "Concentration", artist: "Deep Focus", duration: "7:15" },
      { title: "Flow State", artist: "Mind Lock", duration: "8:20" },
    ],
    [MoodType.CONFUSED]: [
      { title: "Clarity", artist: "Mind Cleanse", duration: "5:05" },
      { title: "Direction", artist: "Path Finder", duration: "4:30" },
    ],
    [MoodType.BORED]: [
      { title: "Inspiration", artist: "Spark", duration: "3:40" },
      { title: "New Horizons", artist: "Curiosity", duration: "4:25" },
    ],
    [MoodType.EXCITED]: [
      { title: "Channel Energy", artist: "Focus Flow", duration: "3:15" },
      { title: "Balanced Excitement", artist: "Controlled Fire", duration: "4:05" },
    ],
    [MoodType.CALM]: [
      { title: "Peaceful Mind", artist: "Tranquil", duration: "6:30" },
      { title: "Serene Waters", artist: "Still Lake", duration: "5:45" },
    ],
    [MoodType.SAD]: [
      { title: "Gentle Comfort", artist: "Soft Touch", duration: "4:50" },
      { title: "Warm Embrace", artist: "Light Through", duration: "5:20" },
    ]
  };

  const tracks = moodTracks[currentMood] || moodTracks[MoodType.OKAY];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const handlePrev = () => {
    setCurrentTrack((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
  };

  const handleMoodSelection = (mood: MoodType) => {
    onMoodChange(mood);
    setCurrentTrack(0);
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold mb-2">Music for your mood</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Listen to music that complements how you're feeling right now
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {Object.values(MoodType).map((mood) => (
          <Button
            key={mood}
            variant={currentMood === mood ? "default" : "outline"}
            size="sm"
            onClick={() => handleMoodSelection(mood)}
            className="text-xs capitalize"
          >
            {mood.toLowerCase()}
          </Button>
        ))}
      </div>
      
      <Card className="p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">{tracks[currentTrack].title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">{tracks[currentTrack].artist}</p>
            </div>
            <div className="text-sm">{tracks[currentTrack].duration}</div>
          </div>
          
          <div className="bg-gray-200 dark:bg-gray-700 h-1 w-full rounded-full overflow-hidden">
            <div 
              className="bg-primary h-full rounded-full" 
              style={{ width: isPlaying ? '45%' : '0%', transition: 'width 1s linear' }}
            ></div>
          </div>
          
          <div className="flex justify-center items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={handlePrev}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button onClick={handlePlayPause} className="w-10 h-10 rounded-full">
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleNext}>
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Volume2 className="h-4 w-4 text-gray-500" />
            <Slider
              value={[volume]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => setVolume(value[0])}
              className="w-full"
            />
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        <Card className="p-3 bg-green-50 dark:bg-green-900/20">
          <h4 className="font-medium text-sm">Benefits of Music</h4>
          <ul className="text-xs mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Reduces stress and anxiety</li>
            <li>Improves focus and concentration</li>
            <li>Enhances memory and learning</li>
          </ul>
        </Card>
        <Card className="p-3 bg-blue-50 dark:bg-blue-900/20">
          <h4 className="font-medium text-sm">Music & Study Tips</h4>
          <ul className="text-xs mt-2 space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Instrumental music is best for studying</li>
            <li>Maintain consistent volume levels</li>
            <li>Match music to your task type</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default MoodMusicPlayer;
